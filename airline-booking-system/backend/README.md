# Airline Booking System — FastAPI Backend

## Setup Instructions

### 1. Prerequisites
- Python 3.10+
- PostgreSQL 13+
- pip (Python package manager)

### 2. Create Virtual Environment
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
```bash
cp .env.example .env
# Edit .env with your database credentials and API keys
```

### 5. Initialize Database
```bash
# Create PostgreSQL database first:
createdb airline_booking

# Run migrations (if using Alembic)
alembic upgrade head

# Or manually create tables:
python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

### 6. Run the Server
```bash
uvicorn app.main:app --reload
```

The API will be available at: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs` (Swagger UI)
- Alternative Docs: `http://localhost:8000/redoc` (ReDoc)

---

## API Endpoints

### Authentication
- `POST /api/users/register` — Register new user
- `POST /api/users/login` — Login and get JWT tokens
- `GET /api/users/profile` — Get current user profile
- `PUT /api/users/profile` — Update profile

### Flights
- `GET /api/flights/` — List all flights
- `GET /api/flights/{flight_id}` — Get flight details
- `POST /api/flights/search` — Search flights
- `GET /api/flights/by-route/popular` — Get popular routes

### Bookings
- `POST /api/bookings/` — Create booking
- `GET /api/bookings/` — Get user's bookings
- `GET /api/bookings/{booking_id}` — Get booking details
- `POST /api/bookings/{booking_id}/cancel` — Cancel booking

### Payments
- `POST /api/payments/process` — Process payment
- `POST /api/payments/stripe` — Process Stripe payment
- `GET /api/payments/{booking_id}` — Get payment details

### Admin
- `POST /api/admin/flights` — Create flight
- `PUT /api/admin/flights/{flight_id}` — Update flight
- `DELETE /api/admin/flights/{flight_id}` — Delete flight
- `GET /api/admin/users` — List all users
- `PUT /api/admin/users/{user_id}/admin` — Promote to admin
- `GET /api/admin/bookings` — List all bookings
- `GET /api/admin/statistics` — System statistics

### Notifications
- `GET /api/notifications/` — Get notifications
- `POST /api/notifications/{notification_id}/mark-read` — Mark as read
- `GET /api/notifications/unread-count` — Get unread count

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── config.py            # Settings/config
│   ├── database.py          # Database setup
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── security.py          # JWT, password hashing
│   └── routes/
│       ├── users.py         # Authentication
│       ├── flights.py       # Flight search
│       ├── bookings.py      # Flight bookings
│       ├── payments.py      # Payment processing
│       ├── admin.py         # Admin management
│       └── notifications.py # User notifications
├── requirements.txt         # Python dependencies
├── .env.example            # Environment template
└── README.md               # This file
```

---

## Database Schema

### Users Table
- id, email (unique), username (unique), hashed_password, full_name, phone, is_admin, is_active, timestamps

### Flights Table
- id, flight_number (unique), airline, departure_city, arrival_city, departure_time, arrival_time, price, available_seats, total_seats, aircraft_type, is_active

### Bookings Table
- id, booking_reference (unique), user_id (FK), flight_id (FK), status, number_of_passengers, total_price, passenger_names, seat_numbers, booking_date

### Payments Table
- id, booking_id (FK), amount, status, payment_method, stripe_payment_id, transaction_id (unique), payment_date

### Notifications Table
- id, user_id (FK), notification_type, title, message, is_read, created_at

---

## Testing

Run tests with pytest:
```bash
pytest
pytest -v  # Verbose
pytest --cov  # With coverage
```

---

## Deployment

### Using Gunicorn (Production)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app.main:app
```

### Using Docker
```bash
docker build -t airline-booking-api .
docker run -p 8000:8000 airline-booking-api
```

---

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET_KEY` — Secret key for JWT tokens (generate a stronger one!)
- `STRIPE_SECRET_KEY` — Stripe API key for payments
- `CORS_ORIGINS` — Allowed frontend URLs

---

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Verify database exists: `createdb airline_booking`

### Port Already in Use
```bash
# Change port in uvicorn command:
uvicorn app.main:app --reload --port 8001
```

### JWT Errors
- Ensure `JWT_SECRET_KEY` is set in `.env`
- Tokens expire after `ACCESS_TOKEN_EXPIRE_MINUTES`
- Use refresh token to get new access token

---

## Support

For issues or questions:
1. Check the API docs at `/docs`
2. Review error messages in terminal
3. Check database connection
4. Verify `.env` configuration

