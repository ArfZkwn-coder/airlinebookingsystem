"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.models import BookingStatus, PaymentStatus

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: str
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    phone: Optional[str]
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

# Flight Schemas
class FlightCreate(BaseModel):
    flight_number: str
    airline: str
    departure_city: str
    arrival_city: str
    departure_time: datetime
    arrival_time: datetime
    price: float
    total_seats: int
    aircraft_type: str

class FlightResponse(BaseModel):
    id: int
    flight_number: str
    airline: str
    departure_city: str
    arrival_city: str
    departure_time: datetime
    arrival_time: datetime
    duration_minutes: int
    price: float
    available_seats: int
    total_seats: int
    aircraft_type: str
    is_active: bool
    
    class Config:
        from_attributes = True

class FlightSearch(BaseModel):
    departure_city: str
    arrival_city: str
    departure_date: datetime
    return_date: Optional[datetime] = None
    passengers: int = 1

# Booking Schemas
class BookingCreate(BaseModel):
    flight_id: int
    number_of_passengers: int
    passenger_names: List[str]
    seat_numbers: List[str]

class BookingResponse(BaseModel):
    id: int
    booking_reference: str
    flight_id: int
    status: str
    number_of_passengers: int
    total_price: float
    booking_date: datetime
    
    class Config:
        from_attributes = True

class BookingWithFlightResponse(BookingResponse):
    flight: FlightResponse

# Payment Schemas
class PaymentCreate(BaseModel):
    booking_id: int
    amount: float
    payment_method: str

class PaymentResponse(BaseModel):
    id: int
    booking_id: int
    amount: float
    status: str
    payment_method: str
    transaction_id: str
    payment_date: datetime
    
    class Config:
        from_attributes = True

class StripePaymentCreate(BaseModel):
    booking_id: int
    token: str

# Notification Schemas
class NotificationResponse(BaseModel):
    id: int
    notification_type: str
    title: str
    message: str
    is_read: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
