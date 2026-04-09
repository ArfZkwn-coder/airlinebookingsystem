"""
Payment processing routes with Stripe integration
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import stripe
import uuid
from app.database import get_db
from app.models import Payment, Booking, PaymentStatus, User
from app.schemas import PaymentCreate, StripePaymentCreate, PaymentResponse
from app.security import get_current_user
from app.config import settings

# Configure Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

router = APIRouter()

@router.post("/process", response_model=PaymentResponse)
def process_payment(
    payment_data: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Process a payment for a booking"""
    # Get booking
    booking = db.query(Booking).filter(
        Booking.id == payment_data.booking_id,
        Booking.user_id == current_user.id
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    # Check if payment already exists
    existing_payment = db.query(Payment).filter(
        Payment.booking_id == payment_data.booking_id,
        Payment.status == PaymentStatus.COMPLETED.value
    ).first()
    
    if existing_payment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment already completed for this booking"
        )
    
    # Create payment record
    transaction_id = f"TXN-{uuid.uuid4().hex[:12].upper()}"
    
    db_payment = Payment(
        booking_id=payment_data.booking_id,
        amount=payment_data.amount,
        status=PaymentStatus.COMPLETED.value,
        payment_method=payment_data.payment_method,
        transaction_id=transaction_id
    )
    
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    
    return db_payment

@router.post("/stripe", response_model=PaymentResponse)
def process_stripe_payment(
    payment_data: StripePaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Process payment via Stripe"""
    # Get booking
    booking = db.query(Booking).filter(
        Booking.id == payment_data.booking_id,
        Booking.user_id == current_user.id
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    try:
        # Create Stripe charge
        charge = stripe.Charge.create(
            amount=int(booking.total_price * 100),  # Amount in cents
            currency="usd",
            source=payment_data.token,
            description=f"Booking {booking.booking_reference}"
        )
        
        # Create payment record
        db_payment = Payment(
            booking_id=payment_data.booking_id,
            amount=booking.total_price,
            status=PaymentStatus.COMPLETED.value,
            payment_method="stripe",
            stripe_payment_id=charge.id,
            transaction_id=charge.id
        )
        
        db.add(db_payment)
        db.commit()
        db.refresh(db_payment)
        
        return db_payment
        
    except stripe.error.CardError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Payment failed: {e.user_message}"
        )
    except stripe.error.StripeException as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment processing error"
        )

@router.get("/{booking_id}", response_model=PaymentResponse)
def get_payment(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get payment details for a booking"""
    # Verify booking belongs to user
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == current_user.id
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    # Get payment
    payment = db.query(Payment).filter(Payment.booking_id == booking_id).first()
    
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    
    return payment
