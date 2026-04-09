import React, { useState, useEffect } from 'react'
import { adminAPI, flightsAPI } from '../api'
import '../styles/Admin.css'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('flights')
  const [statistics, setStatistics] = useState(null)
  const [flights, setFlights] = useState([])
  const [newFlight, setNewFlight] = useState({
    flight_number: '',
    airline: '',
    departure_city: '',
    arrival_city: '',
    departure_time: '',
    arrival_time: '',
    price: '',
    total_seats: '',
    aircraft_type: ''
  })
  
  useEffect(() => {
    fetchStatistics()
    if (activeTab === 'flights') {
      fetchFlights()
    }
  }, [activeTab])
  
  const fetchStatistics = async () => {
    try {
      const response = await adminAPI.getStatistics()
      setStatistics(response.data)
    } catch (error) {
      console.error('Error fetching statistics:', error)
    }
  }
  
  const fetchFlights = async () => {
    try {
      const response = await flightsAPI.listFlights()
      setFlights(response.data)
    } catch (error) {
      console.error('Error fetching flights:', error)
    }
  }
  
  const handleAddFlight = async (e) => {
    e.preventDefault()
    try {
      await adminAPI.createFlight(newFlight)
      setNewFlight({
        flight_number: '',
        airline: '',
        departure_city: '',
        arrival_city: '',
        departure_time: '',
        arrival_time: '',
        price: '',
        total_seats: '',
        aircraft_type: ''
      })
      fetchFlights()
      alert('Flight added successfully!')
    } catch (error) {
      alert('Error adding flight')
    }
  }
  
  const handleDeleteFlight = async (flightId) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        await adminAPI.deleteFlight(flightId)
        fetchFlights()
        alert('Flight deleted successfully!')
      } catch (error) {
        alert('Error deleting flight')
      }
    }
  }
  
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      
      {statistics && (
        <div className="statistics">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{statistics.total_users}</p>
          </div>
          <div className="stat-card">
            <h3>Total Flights</h3>
            <p className="stat-number">{statistics.total_flights}</p>
          </div>
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p className="stat-number">{statistics.total_bookings}</p>
          </div>
        </div>
      )}
      
      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'flights' ? 'active' : ''}`}
          onClick={() => setActiveTab('flights')}
        >
          Manage Flights
        </button>
        <button
          className={`tab ${activeTab === 'add-flight' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-flight')}
        >
          Add Flight
        </button>
      </div>
      
      {activeTab === 'flights' && (
        <div className="tab-content">
          <h2>All Flights</h2>
          <div className="flights-table">
            {flights.map((flight) => (
              <div key={flight.id} className="flight-row">
                <div>{flight.flight_number}</div>
                <div>{flight.departure_city} → {flight.arrival_city}</div>
                <div>${flight.price}</div>
                <div>{flight.available_seats}/{flight.total_seats} seats</div>
                <button
                  onClick={() => handleDeleteFlight(flight.id)}
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'add-flight' && (
        <div className="tab-content">
          <h2>Add New Flight</h2>
          <form onSubmit={handleAddFlight} className="flight-form">
            <div className="form-row">
              <div className="form-group">
                <label>Flight Number</label>
                <input
                  value={newFlight.flight_number}
                  onChange={(e) => setNewFlight({ ...newFlight, flight_number: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Airline</label>
                <input
                  value={newFlight.airline}
                  onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Departure City</label>
                <input
                  value={newFlight.departure_city}
                  onChange={(e) => setNewFlight({ ...newFlight, departure_city: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Arrival City</label>
                <input
                  value={newFlight.arrival_city}
                  onChange={(e) => setNewFlight({ ...newFlight, arrival_city: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Departure Time</label>
                <input
                  type="datetime-local"
                  value={newFlight.departure_time}
                  onChange={(e) => setNewFlight({ ...newFlight, departure_time: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Arrival Time</label>
                <input
                  type="datetime-local"
                  value={newFlight.arrival_time}
                  onChange={(e) => setNewFlight({ ...newFlight, arrival_time: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={newFlight.price}
                  onChange={(e) => setNewFlight({ ...newFlight, price: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Total Seats</label>
                <input
                  type="number"
                  value={newFlight.total_seats}
                  onChange={(e) => setNewFlight({ ...newFlight, total_seats: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Aircraft Type</label>
                <input
                  value={newFlight.aircraft_type}
                  onChange={(e) => setNewFlight({ ...newFlight, aircraft_type: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary">Add Flight</button>
          </form>
        </div>
      )}
    </div>
  )
}
