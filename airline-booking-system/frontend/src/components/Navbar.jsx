import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store'
import '../styles/Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/">✈️ Airline Booking</a>
        </div>
        
        <ul className="navbar-menu">
          <li><a href="/">Home</a></li>
          <li><a href="/search">Search</a></li>
          <li><a href="/my-bookings">My Bookings</a></li>
          {user?.is_admin && <li><a href="/admin">Admin</a></li>}
          <li><a href="/profile">{user?.username}</a></li>
          <li><button onClick={handleLogout} className="btn btn-outline">Logout</button></li>
        </ul>
      </div>
    </nav>
  )
}
