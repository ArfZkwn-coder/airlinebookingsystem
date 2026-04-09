"""
Admin routes for managing flights, users, and bookings
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Flight, Booking, User
from app.schemas import FlightCreate, FlightResponse, BookingResponse, UserResponse
from app.security import get_admin_user
from typing import List

router = APIRouter()

# Flight Management
@router.post("/flights", response_model=FlightResponse)
def create_flight(
    flight_data: FlightCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """Create a new flight (admin only)"""
    # Calculate duration
    duration = (flight_data.arrival_time - flight_data.departure_time).total_seconds() // 60
    
    db_flight = Flight(
        flight_number=flight_data.flight_number,
        airline=flight_data.airline,
        departure_city=flight_data.departure_city,
        arrival_city=flight_data.arrival_city,
        departure_time=flight_data.departure_time,
        arrival_time=flight_data.arrival_time,
        duration_minutes=int(duration),
        price=flight_data.price,
        available_seats=flight_data.total_seats,
        total_seats=flight_data.total_seats,
        aircraft_type=flight_data.aircraft_type
    )
    
    db.add(db_flight)
    db.commit()
    db.refresh(db_flight)
    
    return db_flight

@router.put("/flights/{flight_id}", response_model=FlightResponse)
def update_flight(
    flight_id: int,
    flight_data: FlightCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """Update flight details (admin only)"""
    flight = db.query(Flight).filter(Flight.id == flight_id).first()
    
    if not flight:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flight not found"
        )
    
    flight.flight_number = flight_data.flight_number
    flight.airline = flight_data.airline
    flight.departure_city = flight_data.departure_city
    flight.arrival_city = flight_data.arrival_city
    flight.departure_time = flight_data.departure_time
    flight.arrival_time = flight_data.arrival_time
    flight.price = flight_data.price
    flight.aircraft_type = flight_data.aircraft_type
    
    # Calculate duration
    duration = (flight_data.arrival_time - flight_data.departure_time).total_seconds() // 60
    flight.duration_minutes = int(duration)
    
    db.commit()
    db.refresh(flight)
    
    return flight

@router.delete("/flights/{flight_id}")
def delete_flight(
    flight_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """Delete a flight (admin only)"""
    flight = db.query(Flight).filter(Flight.id == flight_id).first()
    
    if not flight:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flight not found"
        )
    
    flight.is_active = False
    db.commit()
    
    return {"message": "Flight deleted successfully"}

# User Management
@router.get("/users", response_model=List[UserResponse])
def get_all_users(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
    skip: int = 0,
    limit: int = 10
):
    """Get all users (admin only)"""
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.put("/users/{user_id}/admin")
def promote_to_admin(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """Promote user to admin (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.is_admin = True
    db.commit()
    
    return {"message": f"User {user.username} promoted to admin"}

@router.put("/users/{user_id}/deactivate")
def deactivate_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """Deactivate a user (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user.is_active = False
    db.commit()
    
    return {"message": f"User {user.username} deactivated"}

# Booking Management
@router.get("/bookings", response_model=List[BookingResponse])
def get_all_bookings(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
    skip: int = 0,
    limit: int = 10
):
    """Get all bookings (admin only)"""
    bookings = db.query(Booking).offset(skip).limit(limit).all()
    return bookings

@router.get("/bookings/user/{user_id}", response_model=List[BookingResponse])
def get_user_bookings(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """Get all bookings for a specific user (admin only)"""
    bookings = db.query(Booking).filter(Booking.user_id == user_id).all()
    return bookings

# Statistics
@router.get("/statistics")
def get_statistics(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """Get system statistics (admin only)"""
    total_users = db.query(User).count()
    total_flights = db.query(Flight).count()
    total_bookings = db.query(Booking).count()
    
    return {
        "total_users": total_users,
        "total_flights": total_flights,
        "total_bookings": total_bookings
    }
