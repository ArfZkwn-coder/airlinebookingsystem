import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { flightsAPI } from '../api'
import '../styles/Search.css'

export default function SearchPage() {
  const location = useLocation()
  const [flights, setFlights] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState('price')
  
  React.useEffect(() => {
    if (location.state) {
      handleSearch(location.state)
    }
  }, [location])
  
  const handleSearch = async (params) => {
    setIsLoading(true)
    try {
      const response = await flightsAPI.searchFlights({
        departure_city: params.departure,
        arrival_city: params.arrival,
        departure_date: params.departureDate,
        passengers: 1
      })
      
      let sorted = [...response.data]
      if (sortBy === 'price') {
        sorted.sort((a, b) => a.price - b.price)
      } else if (sortBy === 'duration') {
        sorted.sort((a, b) => a.duration_minutes - b.duration_minutes)
      }
      
      setFlights(sorted)
    } catch (error) {
      console.error('Error searching flights:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Results</h1>
        <div className="sort-controls">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">Sort by Price</option>
            <option value="duration">Sort by Duration</option>
            <option value="departure">Sort by Departure</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <p className="loading">Searching flights...</p>
      ) : flights.length === 0 ? (
        <p className="no-results">No flights found. Try a different search.</p>
      ) : (
        <div className="flights-list">
          {flights.map((flight) => (
            <div key={flight.id} className="flight-item">
              <div className="flight-info">
                <h3>{flight.flight_number}</h3>
                <p>{flight.departure_city} → {flight.arrival_city}</p>
                <span className="duration">{flight.duration_minutes} min</span>
              </div>
              
              <div className="flight-times">
                <div>
                  <p className="time">{new Date(flight.departure_time).toLocaleTimeString()}</p>
                  <p className="city">{flight.departure_city}</p>
                </div>
                <div className="arrow">→</div>
                <div>
                  <p className="time">{new Date(flight.arrival_time).toLocaleTimeString()}</p>
                  <p className="city">{flight.arrival_city}</p>
                </div>
              </div>
              
              <div className="flight-booking">
                <div className="price">${flight.price}</div>
                <div className="seats">{flight.available_seats} available</div>
                <button className="btn btn-primary">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
