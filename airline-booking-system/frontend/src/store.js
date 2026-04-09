import { create } from 'zustand'
import { authAPI, notificationsAPI } from './api'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Load user from localStorage on init
  init: async () => {
    const token = localStorage.getItem('access_token')
    if (token) {
      try {
        const response = await authAPI.getProfile()
        set({ user: response.data, isAuthenticated: true })
      } catch (error) {
        localStorage.clear()
      }
    }
  },
  
  register: async (email, username, password, fullName, phone) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authAPI.register({
        email,
        username,
        password,
        full_name: fullName,
        phone
      })
      set({ user: response.data, isLoading: false })
      return response.data
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Registration failed'
      set({ error: errorMsg, isLoading: false })
      throw error
    }
  },
  
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authAPI.login({ email, password })
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      
      const userResponse = await authAPI.getProfile()
      set({ user: userResponse.data, isAuthenticated: true, isLoading: false })
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Login failed'
      set({ error: errorMsg, isLoading: false })
      throw error
    }
  },
  
  logout: () => {
    localStorage.clear()
    set({ user: null, isAuthenticated: false, error: null })
  },
  
  updateProfile: async (fullName, phone) => {
    try {
      const response = await authAPI.updateProfile({
        full_name: fullName,
        phone,
        email: this.user.email,
        username: this.user.username,
        password: ''
      })
      set({ user: response.data })
      return response.data
    } catch (error) {
      set({ error: error.response?.data?.detail || 'Update failed' })
      throw error
    }
  }
}))

export const useBookingStore = create((set) => ({
  bookings: [],
  isLoading: false,
  error: null,
  
  setBookings: (bookings) => set({ bookings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error })
}))

export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  
  setNotifications: (notifications) => set({ notifications }),
  setUnreadCount: (count) => set({ unreadCount: count }),
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
    unreadCount: state.unreadCount + 1
  }))
}))
