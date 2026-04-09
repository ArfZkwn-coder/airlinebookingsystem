# Airline Booking System — React + Vite Frontend

## Setup Instructions

### 1. Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Backend API running on `http://localhost:8000`

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### 5. Preview Production Build
```bash
npm run preview
```

---

## Project Structure

```
frontend/
├── src/
│   ├── api.js              # API client and endpoints
│   ├── store.js            # Zustand state management
│   ├── App.jsx             # Main app component
│   ├── App.css             # Global styles
│   ├── main.jsx            # Entry point
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── BookingPage.jsx
│   │   ├── MyBookingsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AdminPage.jsx
│   │   └── NotFound.jsx
│   ├── components/         # Reusable components
│   │   └── Navbar.jsx
│   └── styles/             # Component-specific styles
│       ├── Auth.css
│       ├── Home.css
│       ├── Search.css
│       ├── Bookings.css
│       ├── Booking.css
│       ├── Admin.css
│       ├── Profile.css
│       ├── Navbar.css
│       └── NotFound.css
├── index.html              # HTML entry point
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

---

## Key Technologies

- **React 18** — UI library
- **React Router 6** — Client-side routing
- **Zustand** — State management (lightweight alternative to Redux)
- **Axios** — HTTP client for API calls
- **Vite** — Fast build tool and dev server
- **CSS3** — Styling (no framework, vanilla CSS for simplicity)

---

## Features

### Authentication
- User registration with email, username, password, full name, phone
- Login with JWT tokens
- Profile management
- Protected routes (login required to book)
- Admin-only routes

### Flight Management
- Browse all available flights
- Search flights by:
  - Departure city
  - Arrival city
  - Departure date
- Sort results by price, duration, departure time
- View detailed flight information

### Bookings
- Create new bookings with passenger details
- Assign seat numbers
- View all personal bookings
- Cancel bookings
- Real-time seat availability updates

### Payments
- Checkout page (UI ready for Stripe integration)
- Display booking summary and pricing
- Payment confirmation

### Admin Dashboard
- System statistics (users, flights, bookings counts)
- Add new flights with all details
- Update existing flights
- Delete flights
- View all bookings
- Manage users

### Notifications
- Real-time notifications for:
  - Booking confirmation
  - Payment success
  - Booking cancellation
- Mark notifications as read
- Unread count badge

---

## API Integration

All API calls are managed through `/src/api.js` which uses Axios to communicate with the FastAPI backend.

### API Endpoints Used

**Authentication:**
- `POST /api/users/register` — Create new user
- `POST /api/users/login` — User login
- `GET /api/users/profile` — Get user profile
- `PUT /api/users/profile` — Update profile

**Flights:**
- `GET /api/flights/` — List all flights
- `GET /api/flights/{id}` — Get flight details
- `POST /api/flights/search` — Search flights
- `GET /api/flights/by-route/popular` — Popular routes

**Bookings:**
- `POST /api/bookings/` — Create booking
- `GET /api/bookings/` — Get user's bookings
- `POST /api/bookings/{id}/cancel` — Cancel booking

**Payments:**
- `POST /api/payments/process` — Process payment
- `POST /api/payments/stripe` — Stripe payment

**Admin:**
- `POST /api/admin/flights` — Add flight
- `PUT /api/admin/flights/{id}` — Update flight
- `DELETE /api/admin/flights/{id}` — Delete flight
- `GET /api/admin/statistics` — System stats

---

## State Management (Zustand)

### `useAuthStore`
- `user` — Current user data
- `isAuthenticated` — Auth status
- `register()` — User registration
- `login()` — User login
- `logout()` — Clear auth
- `updateProfile()` — Update user profile

### `useBookingStore`
- `bookings` — User's bookings
- `setBookings()` — Update bookings list

### `useNotificationStore`
- `notifications` — List of notifications
- `unreadCount` — Unread notification count

---

## Styling

The frontend uses vanilla CSS for simplicity and customization. All styles are organized by page/component:

- `App.css` — Global styles (buttons, forms, messages, loading)
- `styles/*.css` — Page and component-specific styles

### Color Scheme
- Primary: `#0066cc` (Blue)
- Secondary: `#0052a3` (Dark Blue)
- Success: `#155724` (Green)
- Danger: `#dc3545` (Red)
- Background: `#f5f5f5` (Light Gray)
- Text: `#333` (Dark)

---

## Environment Configuration

The API base URL is configured in `src/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000/api'
```

For production, update this to your deployed API URL.

---

## Common Tasks

### Add a New Page
1. Create `src/pages/MyNewPage.jsx`
2. Add route in `App.jsx`
3. Create styles in `src/styles/MyNewPage.css`

### Add a New Component
1. Create `src/components/MyComponent.jsx`
2. Import in pages that need it
3. Add component-specific styles

### Update State
Use Zustand hooks from `store.js`:
```javascript
import { useAuthStore } from '../store'

const MyComponent = () => {
  const { user, logout } = useAuthStore()
  // ...
}
```

### Call API
Use methods from `api.js`:
```javascript
import { flightsAPI } from '../api'

const flights = await flightsAPI.searchFlights(params)
```

---

## Troubleshooting

### API Calls Failing
1. Ensure backend is running on `http://localhost:8000`
2. Check CORS configuration in FastAPI backend
3. Verify token is being sent with requests (JWT)
4. Check browser console for error messages

### Login Not Working
1. Verify user account was created in database
2. Check credentials are correct (email and password)
3. Review error message in browser console
4. Ensure backend is responding

### Styles Not Loading
1. Check that CSS files are imported correctly
2. Verify file paths in imports
3. Clear browser cache (`Ctrl+Shift+Delete`)
4. Restart dev server (`npm run dev`)

### State Not Updating
1. Verify Zustand store is imported correctly
2. Check that you're calling the right store action
3. Add console.log to debug store updates
4. Ensure async operations complete before re-rendering

---

## Performance Tips

- Image optimization: Use modern formats (WebP)
- Code splitting: Use React.lazy() for routes
- Bundle analysis: Run `npm run build` and check dist size
- Network: Use browser DevTools to monitor API calls
- Caching: Implement request caching in api.js

---

## Security Considerations

- Store JWT tokens in localStorage (or sessionStorage for better security)
- Always validate input on both client and server
- Use HTTPS in production
- Set secure CORS policies
- Never commit `.env` files with sensitive data
- Validate all API responses

---

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag & drop dist/ folder to Netlify
```

### Environment Variables for Production
Update `API_BASE_URL` in `src/api.js` or use environment variables:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
```

Create `.env.production`:
```
VITE_API_URL=https://your-api-domain.com/api
```

---

## Support

For issues or questions:
1. Check the [Backend README](../backend/README.md)
2. Review error messages in browser DevTools
3. Check [Vite Documentation](https://vitejs.dev)
4. Check [React Documentation](https://react.dev)

