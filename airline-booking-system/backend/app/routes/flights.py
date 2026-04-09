"""
Flight search and listing routes
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime, timedelta
from app.database import get_db
from app.models import Flight
from app.schemas import FlightResponse, FlightSearch
from typing import List

router = APIRouter()

@router.get("/", response_model=List[FlightResponse])
def list_flights(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    """List all available flights"""
    flights = db.query(Flight).filter(Flight.is_active == True).offset(skip).limit(limit).all()
    return flights

@router.get("/{flight_id}", response_model=FlightResponse)
def get_flight(flight_id: int, db: Session = Depends(get_db)):
    """Get flight details"""
    flight = db.query(Flight).filter(Flight.id == flight_id).first()
    if not flight:
        from fastapi import HTTPException, status
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flight not found"
        )
    return flight

@router.post("/search", response_model=List[FlightResponse])
def search_flights(
    search: FlightSearch,
    db: Session = Depends(get_db)
):
    """Search for flights by departure/arrival cities and date"""
    # Create date range (same day)
    departure_start = search.departure_date.replace(hour=0, minute=0, second=0)
    departure_end = search.departure_date.replace(hour=23, minute=59, second=59)
    
    # Query flights
    query = db.query(Flight).filter(
        and_(
            Flight.departure_city == search.departure_city,
            Flight.arrival_city == search.arrival_city,
            Flight.departure_time >= departure_start,
            Flight.departure_time <= departure_end,
            Flight.available_seats >= search.passengers,
            Flight.is_active == True
        )
    )
    
    flights = query.all()
    return flights

@router.get("/by-route/popular", response_model=List[FlightResponse])
def get_popular_routes(
    db: Session = Depends(get_db),
    limit: int = Query(5, ge=1, le=20)
):
    """Get popular flight routes"""
    flights = db.query(Flight).filter(Flight.is_active == True).limit(limit).all()
    return flights
