"""
Flight booking routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import json
import uuid
from app.database import get_db
from app.models import Booking, Flight, BookingStatus, User, Notification
from app.schemas import BookingCreate, BookingResponse, BookingWithFlightResponse
from app.security import get_current_user
from typing import List

router = APIRouter()

@router.post("/", response_model=BookingResponse)
def create_booking(
    booking_data: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new flight booking"""
    # Get flight
    flight = db.query(Flight).filter(Flight.id == booking_data.flight_id).first()
    if not flight:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flight not found"
        )
    
    # Check seat availability
    if flight.available_seats < booking_data.number_of_passengers:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Not enough seats available"
        )
    
    # Create booking
    booking_reference = f"ABS-{uuid.uuid4().hex[:8].upper()}"
    total_price = flight.price * booking_data.number_of_passengers
    
    db_booking = Booking(
        booking_reference=booking_reference,
        user_id=current_user.id,
        flight_id=booking_data.flight_id,
        status=BookingStatus.CONFIRMED.value,
        number_of_passengers=booking_data.number_of_passengers,
        total_price=total_price,
        passenger_names=json.dumps(booking_data.passenger_names),
        seat_numbers=json.dumps(booking_data.seat_numbers)
    )
    
    # Update flight available seats
    flight.available_seats -= booking_data.number_of_passengers
    
    # Create notification
    notification = Notification(
        user_id=current_user.id,
        notification_type="booking_confirmed",
        title=f"Booking Confirmed - {flight.flight_number}",
        message=f"Your booking {booking_reference} for {flight.departure_city} to {flight.arrival_city} is confirmed!"
    )
    
    db.add(db_booking)
    db.add(notification)
    db.commit()
    db.refresh(db_booking)
    
    return db_booking

@router.get("/", response_model=List[BookingWithFlightResponse])
def get_my_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all bookings for the current user"""
    bookings = db.query(Booking).filter(Booking.user_id == current_user.id).all()
    return bookings

@router.get("/{booking_id}", response_model=BookingWithFlightResponse)
def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get booking details"""
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == current_user.id
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    return booking

@router.post("/{booking_id}/cancel")
def cancel_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cancel a booking"""
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == current_user.id
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking.status == BookingStatus.CANCELLED.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking already cancelled"
        )
    
    # Update booking status
    booking.status = BookingStatus.CANCELLED.value
    
    # Restore flight seats
    flight = db.query(Flight).filter(Flight.id == booking.flight_id).first()
    flight.available_seats += booking.number_of_passengers
    
    # Create notification
    notification = Notification(
        user_id=current_user.id,
        notification_type="booking_cancelled",
        title=f"Booking Cancelled - {booking.booking_reference}",
        message=f"Your booking {booking.booking_reference} has been cancelled."
    )
    
    db.add(notification)
    db.commit()
    
    return {"message": "Booking cancelled successfully"}
