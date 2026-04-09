import React, { useState, useEffect } from 'react'
import { bookingsAPI } from '../api'
import { useAuthStore } from '../store'
import '../styles/Bookings.css'

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuthStore()
  
  useEffect(() => {
    fetchBookings()
  }, [])
  
  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getMyBookings()
      setBookings(response.data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingsAPI.cancelBooking(bookingId)
        fetchBookings()
        alert('Booking cancelled successfully')
      } catch (error) {
        alert('Error cancelling booking')
      }
    }
  }
  
  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>
      
      {isLoading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="no-bookings">You haven't booked any flights yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <h3>Booking #{booking.booking_reference}</h3>
                <span className={`status ${booking.status}`}>{booking.status}</span>
              </div>
              
              <div className="booking-details">
                <p><strong>Flight:</strong> {booking.flight.flight_number}</p>
                <p><strong>Route:</strong> {booking.flight.departure_city} → {booking.flight.arrival_city}</p>
                <p><strong>Passengers:</strong> {booking.number_of_passengers}</p>
                <p><strong>Total Price:</strong> ${booking.total_price}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
              </div>
              
              {booking.status === 'confirmed' && (
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="btn btn-danger"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
