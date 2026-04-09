# Airline Booking System

A full-stack flight booking application built with React + Vite (Frontend) and Python FastAPI (Backend), featuring user authentication, flight search, booking management, payments, and admin dashboard.

## 🎯 Quick Start

### Prerequisites
- **Backend:** Python 3.10+, PostgreSQL
- **Frontend:** Node.js 16+, npm/yarn

### Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure .env
cp .env.example .env
# Edit .env with your database credentials and API keys

# Initialize database
python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"

# Run server
uvicorn app.main:app --reload
```

Backend runs on: `http://localhost:8000`  
API docs: `http://localhost:8000/docs`

### Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📁 Project Structure

```
airline-booking-system/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── security.py       # JWT, auth
│   │   ├── config.py         # Settings
│   │   ├── database.py       # DB setup
│   │   └── routes/           # API endpoints
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── api.js            # API client
│   │   ├── store.js          # Zustand state
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── styles/           # CSS files
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── database/
├── README.md (this file)
└── .gitignore
```

---

## 🚀 Features

### ✅ Implemented

**User Authentication**
- Registration with email, username, password, full name, phone
- Login with JWT tokens (access + refresh)
- Profile management
- Protected routes
- Admin role system

**Flight Management**
- List all available flights
- Search flights by city & date
- Sort by price, duration
- View detailed flight information
- Real-time seat availability

**Bookings**
- Create new bookings with passenger details
- Assign seat numbers to passengers
- View all personal bookings
- Cancel bookings
- Booking confirmation notifications

**Payments** (UI Ready)
- Checkout page with order summary
- Stripe integration (backend ready)
- Payment status tracking
- Transaction history

**Admin Dashboard**
- System statistics dashboard
- Add new flights
- Update flight details
- Delete flights
- Manage users
- View all bookings

**Notifications**
- In-app notifications
- Mark as read / unread
- Email notifications (backend ready)
- Real-time updates

---

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/profile`
- `PUT /api/users/profile`

### Flights
- `GET /api/flights/` — List flights
- `POST /api/flights/search` — Search flights
- `GET /api/flights/{id}` — Flight details

### Bookings
- `POST /api/bookings/` — Create booking
- `GET /api/bookings/` — User's bookings
- `POST /api/bookings/{id}/cancel` — Cancel booking

### Payments
- `POST /api/payments/process` — Process payment
- `POST /api/payments/stripe` — Stripe payment

### Admin
- `POST /api/admin/flights` — Add flight
- `PUT /api/admin/flights/{id}` — Update flight
- `DELETE /api/admin/flights/{id}` — Delete flight
- `GET /api/admin/statistics` — System stats

### Notifications
- `GET /api/notifications/` — Get notifications
- `POST /api/notifications/{id}/mark-read` — Mark read
- `GET /api/notifications/unread-count` — Unread count

---

## 💡 Tech Stack

### Backend
- **Framework:** FastAPI (Python)
- **Database:** PostgreSQL + SQLAlchemy ORM
- **Authentication:** JWT (python-jose) + bcrypt
- **Validation:** Pydantic
- **Payments:** Stripe API
- **Server:** Uvicorn

### Frontend
- **Framework:** React 18 + Vite
- **Routing:** React Router 6
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Styling:** Vanilla CSS3
- **Build:** Vite

---

## 🔐 Security

- Passwords hashed with bcrypt
- JWT token-based authentication
- Secure session management
- Input validation (frontend & backend)
- CORS protection
- Admin-only endpoints
- SQL injection prevention (Sqlalchemy ORM)

---

## 📋 Database Schema

### Users
- id, email (unique), username (unique), hashed_password
- full_name, phone, is_admin, is_active
- Timestamps: created_at, updated_at

### Flights
- id, flight_number (unique), airline
- departure_city, arrival_city
- departure_time, arrival_time, duration_minutes
- price, available_seats, total_seats, aircraft_type
- is_active, created_at

### Bookings
- id, booking_reference (unique)
- user_id (FK), flight_id (FK)
- status (pending/confirmed/cancelled/completed)
- number_of_passengers, total_price
- passenger_names, seat_numbers (JSON)
- booking_date

### Payments
- id, booking_id (FK)
- amount, status (pending/completed/failed/refunded)
- payment_method, stripe_payment_id
- transaction_id (unique), payment_date

### Notifications
- id, user_id (FK)
- notification_type, title, message
- is_read, created_at

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
pytest -v --cov
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:cov
```

---

## 🚢 Deployment

### Backend (FastAPI + Gunicorn)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
```

### Frontend (Static Hosting)
```bash
npm run build
# Deploy dist/ folder to Vercel, Netlify, GitHub Pages, or S3
```

### Environment Variables
Update `.env` files for production:
- `DATABASE_URL` → Production DB
- `JWT_SECRET_KEY` → Strong random key
- `STRIPE_SECRET_KEY` → Production Stripe key
- `CORS_ORIGINS` → Production domains
- `API_URL` → Backend URL (frontend)

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Ensure PostgreSQL is running
# Update DATABASE_URL in backend/.env
# Create database: createdb airline_booking
```

### API CORS Errors
```bash
# Add frontend URL to CORS_ORIGINS in backend/.env
CORS_ORIGINS=http://localhost:5173,https://yourdomain.com
```

### Frontend API Calls Failing
```bash
# Verify backend URL in frontend/src/api.js
# Ensure backend is running on http://localhost:8000
```

### JWT Token Expired
```bash
# Tokens expire after ACCESS_TOKEN_EXPIRE_MINUTES
# Use refresh token to get new access token
```

---

## 📸 Screenshots

Coming soon...

---

## 📚 Documentation

- [Backend README](backend/README.md) — FastAPI setup, API details
- [Frontend README](frontend/README.md) — React setup, component guide
- API Documentation: `http://localhost:8000/docs` (Interactive Swagger UI)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add my feature'`)
4. Push to branch (`git push origin feature/my-feature`)
5. Open a pull request

---

## 📝 License

MIT License - feel free to use this project for learning and commercial purposes.

---

## 💬 Support

For questions or issues:
1. Check the READMEs in backend/ and frontend/ folders
2. Review API documentation at `/api/docs`
3. Check git issues (when available)
4. Open a new issue with details and reproductions steps

---

**Created:** April 2026  
**Status:** ✅ v1.0.0 Complete  
**Next Phase:** Advanced features (real-time notifications, booking modifications, refunds)
