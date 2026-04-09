import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { flightsAPI, bookingsAPI, paymentsAPI } from '../api'
import '../styles/Booking.css'

export default function BookingPage() {
  const { flightId } = useParams()
  const [flight, setFlight] = useState(null)
  const [step, setStep] = useState('passengers')
  const [passengers, setPassengers] = useState([{ name: '', seatNumber: '' }])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchFlight()
  }, [flightId])
  
  const fetchFlight = async () => {
    try {
      const response = await flightsAPI.getFlightDetails(flightId)
      setFlight(response.data)
    } catch (error) {
      console.error('Error fetching flight:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const addPassenger = () => {
    setPassengers([...passengers, { name: '', seatNumber: '' }])
  }
  
  const updatePassenger = (index, field, value) => {
    const updated = [...passengers]
    updated[index][field] = value
    setPassengers(updated)
  }
  
  const handleSubmitBooking = async () => {
    if (passengers.some(p => !p.name || !p.seatNumber)) {
      alert('Please fill in all passenger details')
      return
    }
    
    setIsSubmitting(true)
    try {
      const response = await bookingsAPI.createBooking({
        flight_id: parseInt(flightId),
        number_of_passengers: passengers.length,
        passenger_names: passengers.map(p => p.name),
        seat_numbers: passengers.map(p => p.seatNumber)
      })
      
      // Process payment
      setStep('payment')
    } catch (error) {
      alert('Error creating booking')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isLoading) return <p>Loading flight details...</p>
  if (!flight) return <p>Flight not found</p>
  
  return (
    <div className="booking-page">
      <h1>Book Your Flight</h1>
      
      <div className="booking-steps">
        <div className={`step ${step === 'passengers' ? 'active' : ''}`}>1. Passengers</div>
        <div className={`step ${step === 'payment' ? 'active' : ''}`}>2. Payment</div>
        <div className={`step ${step === 'confirmation' ? 'active' : ''}`}>3. Confirmation</div>
      </div>
      
      {step === 'passengers' && (
        <div className="step-content">
          <div className="flight-summary">
            <h3>{flight.flight_number}</h3>
            <p>{flight.departure_city} → {flight.arrival_city}</p>
            <p>${flight.price} per passenger</p>
          </div>
          
          <div className="passengers-form">
            <h3>Passenger Details</h3>
            {passengers.map((p, index) => (
              <div key={index} className="passenger-input">
                <input
                  placeholder="Full Name"
                  value={p.name}
                  onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                />
                <input
                  placeholder="Seat Number"
                  value={p.seatNumber}
                  onChange={(e) => updatePassenger(index, 'seatNumber', e.target.value)}
                />
              </div>
            ))}
            
            <button type="button" onClick={addPassenger} className="btn btn-outline">
              + Add Passenger
            </button>
          </div>
          
          <button
            onClick={handleSubmitBooking}
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? 'Processing...' : 'Continue to Payment'}
          </button>
        </div>
      )}
      
      {step === 'payment' && (
        <div className="step-content">
          <h3>Payment Information</h3>
          <p>Total: ${flight.price * passengers.length}</p>
          <button className="btn btn-primary">Process Payment</button>
        </div>
      )}
    </div>
  )
}
