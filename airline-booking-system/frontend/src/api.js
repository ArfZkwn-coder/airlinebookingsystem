import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data)
}

export const flightsAPI = {
  listFlights: (skip = 0, limit = 10) => api.get('/flights', { params: { skip, limit } }),
  getFlightDetails: (id) => api.get(`/flights/${id}`),
  searchFlights: (data) => api.post('/flights/search', data),
  getPopularRoutes: (limit = 5) => api.get('/flights/by-route/popular', { params: { limit } })
}

export const bookingsAPI = {
  createBooking: (data) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings'),
  getBookingDetails: (id) => api.get(`/bookings/${id}`),
  cancelBooking: (id) => api.post(`/bookings/${id}/cancel`)
}

export const paymentsAPI = {
  processPayment: (data) => api.post('/payments/process', data),
  processStripePayment: (data) => api.post('/payments/stripe', data),
  getPaymentDetails: (bookingId) => api.get(`/payments/${bookingId}`)
}

export const notificationsAPI = {
  getNotifications: (unreadOnly = false) => api.get('/notifications', { params: { unread_only: unreadOnly } }),
  markAsRead: (id) => api.post(`/notifications/${id}/mark-read`),
  markAllAsRead: () => api.post('/notifications/mark-all-read'),
  getUnreadCount: () => api.get('/notifications/unread-count')
}

export const adminAPI = {
  // Flights
  createFlight: (data) => api.post('/admin/flights', data),
  updateFlight: (id, data) => api.put(`/admin/flights/${id}`, data),
  deleteFlight: (id) => api.delete(`/admin/flights/${id}`),
  
  // Users
  getAllUsers: (skip = 0, limit = 10) => api.get('/admin/users', { params: { skip, limit } }),
  promoteToAdmin: (id) => api.put(`/admin/users/${id}/admin`),
  deactivateUser: (id) => api.put(`/admin/users/${id}/deactivate`),
  
  // Bookings
  getAllBookings: (skip = 0, limit = 10) => api.get('/admin/bookings', { params: { skip, limit } }),
  getUserBookings: (userId) => api.get(`/admin/bookings/user/${userId}`),
  
  // Statistics
  getStatistics: () => api.get('/admin/statistics')
}

export default api
