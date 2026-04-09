import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { flightsAPI } from '../api'
import '../styles/Home.css'

export default function HomePage() {
  const [flights, setFlights] = useState([])
  const [searchParams, setSearchParams] = useState({
    departure: '',
    arrival: '',
    departureDate: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchPopularFlights()
  }, [])
  
  const fetchPopularFlights = async () => {
    try {
      const response = await flightsAPI.getPopularRoutes(6)
      setFlights(response.data)
    } catch (error) {
      console.error('Error fetching flights:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/search', { state: searchParams })
  }
  
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Book Your Flight Today</h1>
        <p>Find and book flights to your favorite destinations</p>
      </div>
      
      <div className="search-card">
        <form onSubmit={handleSearch}>
          <div className="form-row">
            <div className="form-group">
              <label>From</label>
              <input
                type="text"
                placeholder="Departure City"
                value={searchParams.departure}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, departure: e.target.value })
                }
              />
            </div>
            
            <div className="form-group">
              <label>To</label>
              <input
                type="text"
                placeholder="Arrival City"
                value={searchParams.arrival}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, arrival: e.target.value })
                }
              />
            </div>
            
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={searchParams.departureDate}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, departureDate: e.target.value })
                }
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Search Flights
            </button>
          </div>
        </form>
      </div>
      
      <div className="popular-flights">
        <h2>Popular Flights</h2>
        {isLoading ? (
          <p>Loading flights...</p>
        ) : (
          <div className="flights-grid">
            {flights.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div className="flight-header">
                  <h3>{flight.flight_number}</h3>
                  <span className="airline">{flight.airline}</span>
                </div>
                <div className="flight-route">
                  <div className="city">{flight.departure_city}</div>
                  <div className="arrow">→</div>
                  <div className="city">{flight.arrival_city}</div>
                </div>
                <div className="flight-price">
                  <span className="price">${flight.price}</span>
                  <span className="seats">{flight.available_seats} seats left</span>
                </div>
                <button className="btn btn-outline">View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
