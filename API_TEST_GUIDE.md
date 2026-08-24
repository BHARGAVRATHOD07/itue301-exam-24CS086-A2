# FitZone API Testing Guide

**Exam Submission Reference Document**

---

## Server URLs

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5174

---

## API Endpoints Testing

### 1. POST `/api/v1/auth/login` (Public)

**Purpose:** Authenticate member and issue JWT token

**Request:**

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"24cs086@charusat.edu.in","password":"password123"}'
```

**Expected Response (Status: 200):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "member": {
    "id": "66c8f1000000000000000001",
    "name": "Bhargav Rathod",
    "email": "24cs086@charusat.edu.in",
    "membershipType": "platinum"
  }
}
```

---

### 2. GET `/api/v1/trainers` (Public)

**Purpose:** Retrieve all available trainers

**Request:**

```bash
curl -X GET http://localhost:5000/api/v1/trainers
```

**Expected Response (Status: 200):**

```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "66c8f2000000000000000001",
      "name": "John Doe",
      "specialization": "HIIT & Cardio",
      "available": true
    },
    {
      "_id": "66c8f2000000000000000002",
      "name": "Sarah Smith",
      "specialization": "Yoga & Pilates",
      "available": false
    }
  ]
}
```

---

### 3. POST `/api/v1/bookings` (Protected - Requires Auth Token)

**Purpose:** Create a new class booking

**Request:**

```bash
curl -X POST http://localhost:5000/api/v1/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "trainerId": "66c8f2000000000000000001",
    "className": "Morning HIIT Cardio",
    "date": "2026-08-25",
    "timeSlot": "07:00 AM - 08:00 AM"
  }'
```

**Expected Response (Status: 201 Created):**

```json
{
  "success": true,
  "message": "Class booking created successfully",
  "data": {
    "_id": "66c8f3000000000000000001",
    "memberId": {
      "_id": "66c8f1000000000000000001",
      "name": "Bhargav Rathod",
      "email": "24cs086@charusat.edu.in"
    },
    "trainerId": {
      "_id": "66c8f2000000000000000001",
      "name": "John Doe",
      "specialization": "HIIT & Cardio"
    },
    "className": "Morning HIIT Cardio",
    "date": "2026-08-25",
    "timeSlot": "07:00 AM - 08:00 AM",
    "status": "booked",
    "createdAt": "2026-08-24T10:30:00.000Z"
  }
}
```

---

### 4. GET `/api/v1/bookings/my` (Protected)

**Purpose:** Retrieve logged-in member's bookings

**Request:**

```bash
curl -X GET http://localhost:5000/api/v1/bookings/my \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response (Status: 200):**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "66c8f3000000000000000001",
      "memberId": {
        "_id": "66c8f1000000000000000001",
        "name": "Bhargav Rathod",
        "email": "24cs086@charusat.edu.in"
      },
      "trainerId": {
        "_id": "66c8f2000000000000000001",
        "name": "John Doe",
        "specialization": "HIIT & Cardio"
      },
      "className": "Morning HIIT Cardio",
      "date": "2026-08-25",
      "timeSlot": "07:00 AM - 08:00 AM",
      "status": "booked"
    }
  ]
}
```

---

### 5. PATCH `/api/v1/bookings/:id/status` (Protected)

**Purpose:** Update booking status

**Request:**

```bash
curl -X PATCH http://localhost:5000/api/v1/bookings/66c8f3000000000000000001/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"status":"attended"}'
```

**Valid Statuses:** `booked`, `attended`, `cancelled`

**Expected Response (Status: 200):**

```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "data": {
    "_id": "66c8f3000000000000000001",
    "status": "attended",
    "className": "Morning HIIT Cardio",
    "date": "2026-08-25"
  }
}
```

---

## Middleware Verification

### ✅ requestLogger Middleware

Every request logs: `[METHOD] [PATH] [STATUS] [RESPONSE-TIME ms]`

**Console Output Example:**

```
[POST] /api/v1/auth/login [200] [45ms]
[GET] /api/v1/trainers [200] [12ms]
[POST] /api/v1/bookings [201] [78ms]
[PATCH] /api/v1/bookings/:id/status [200] [34ms]
```

### ✅ authGuard Middleware

Protected routes validate Bearer token. Invalid token returns:

```json
{
  "success": false,
  "error": "Authentication failed: Invalid or expired token"
}
```

### ✅ errorHandler Middleware

Validation errors return formatted JSON (not raw error stack):

```json
{
  "success": false,
  "error": "Validation Error: Member ID reference is required, Trainer ID reference is required"
}
```

---

## MongoDB Schema Validation

### Member Schema

- ✅ `name`: required
- ✅ `email`: required, unique
- ✅ `membershipType`: enum (basic, premium, platinum), default: basic

### Trainer Schema

- ✅ `name`: required
- ✅ `specialization`: required
- ✅ `available`: Boolean, default: true

### ClassBooking Schema

- ✅ `memberId`: references Member (populated with name, email)
- ✅ `trainerId`: references Trainer (populated with name, specialization)
- ✅ `className`: required
- ✅ `date`: required
- ✅ `timeSlot`: required
- ✅ `status`: enum (booked, attended, cancelled), default: booked

---

## Task Completion Checklist

| Task                       | Status | Evidence                                                       |
| -------------------------- | ------ | -------------------------------------------------------------- |
| 1. React Components        | ✅     | LoginPage, ClassesPage, MyBookingsPage, TrainerCard with props |
| 2. React Routing           | ✅     | Routes /, /classes, /my-bookings, /admin with ProtectedRoute   |
| 3. State Management        | ✅     | AuthContext with { member, token, login, logout }              |
| 4. Express API             | ✅     | 5 endpoints at /api/v1/ (login, trainers, bookings CRUD)       |
| 5. Middleware              | ✅     | requestLogger, authGuard, errorHandler                         |
| 6. HTTP Status Codes       | ✅     | 200 GET, 201 POST, 400 validation, 401 auth, 500 error         |
| 7. MongoDB Schemas         | ✅     | Member, Trainer, ClassBooking with validation                  |
| 8. Schema Validation       | ✅     | Required fields, enum values, unique constraints               |
| 9. API Consumption         | ✅     | ClassesPage fetches & renders trainers from API                |
| 10. Loading & Error States | ✅     | Implemented in ClassesPage, MyBookingsPage, AdminPanel         |
| 11. Client-side Search     | ✅     | Filter trainers by specialization without new API call         |
| 12. Lazy-loaded Route      | ✅     | AdminPanel with React.lazy + Suspense                          |
| 13. Populate References    | ✅     | GET /bookings/my uses .populate() for member & trainer         |

---

## How to Test Manually

### Option 1: Using Postman/Thunder Client

1. Download Postman: https://www.postman.com/downloads/
2. Create a request to POST `/api/v1/auth/login`
3. Copy the token from response
4. Use token in Authorization header for protected endpoints
5. Take screenshot of POST `/api/v1/bookings` with Status 201

### Option 2: Using Browser DevTools

1. Open http://localhost:5174
2. Login with: `24cs086@charusat.edu.in` (any password)
3. Navigate to Classes page
4. See trainers fetched from API
5. Create a booking
6. Check Network tab for API calls and responses

### Option 3: Using PowerShell/Terminal

Run the curl commands provided above and verify responses.

---

## Exam Submission Requirements

### PDF Report: `24CS086_SetB_Report.pdf` Must Include:

**1. Screenshot 1: ClassesPage with Trainer Cards**

- Show trainer name, specialization, and availability status
- Display search filter functionality
- Show booking form with selected values

**2. Screenshot 2: Postman - POST Booking (HTTP 201)**

- Show POST /api/v1/bookings endpoint
- Display request body with trainerId, className, date, timeSlot
- Show Authorization header with Bearer token
- Highlight response Status: 201 Created
- Display response JSON with booking ID and populated data

**3. Screenshot 3: MongoDB Document**

- Login to MongoDB Atlas: https://cloud.mongodb.com
- Navigate to Database → Collections
- Show fitzone.classbookings collection
- Display a saved ClassBooking document with:
  - memberId reference (populated showing name, email)
  - trainerId reference (populated showing name, specialization)
  - className, date, timeSlot, status

---

## Notes

- All 5 exam tasks are fully implemented
- All endpoints are tested and working
- MongoDB connection is established
- Both servers run concurrently on ports 5000 (backend) and 5174 (frontend)
- Error handling catches ValidationError and returns formatted JSON
