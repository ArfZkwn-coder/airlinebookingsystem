import React, { useState } from 'react'
import { useAuthStore } from '../store'
import '../styles/Profile.css'

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore()
  const [formData, setFormData] = useState({
    fullName: user?.full_name || '',
    phone: user?.phone || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await updateProfile(formData.fullName, formData.phone)
      setMessage('Profile updated successfully!')
    } catch (error) {
      setMessage('Error updating profile')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>
        
        <div className="profile-info">
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Account Type:</strong> {user?.is_admin ? 'Administrator' : 'Regular User'}</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {message && <p className="message">{message}</p>}
          
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" disabled={isLoading} className="btn btn-primary">
            {isLoading ? 'Saving...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}
