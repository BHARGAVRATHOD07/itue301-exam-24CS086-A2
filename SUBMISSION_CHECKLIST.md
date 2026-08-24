# FitZone Exam Submission Checklist

**Student:** Bhargav Rathod | **Roll No:** 24CS086 | **Batch:** A2

---

## ✅ PROJECT COMPLETION STATUS

### TASK 1: React Component Architecture ✅

- [x] LoginPage component created
- [x] ClassesPage component created
- [x] MyBookingsPage component created
- [x] TrainerCard component accepts props (name, specialization, available)
- [x] TrainerCard displays availability with dynamic CSS classes
- [x] Reusable components in /components folder
- [x] Props used correctly to pass data

**Files:**

- [frontend/src/pages/LoginPage.jsx](../frontend/src/pages/LoginPage.jsx)
- [frontend/src/pages/ClassesPage.jsx](../frontend/src/pages/ClassesPage.jsx)
- [frontend/src/pages/MyBookingsPage.jsx](../frontend/src/pages/MyBookingsPage.jsx)
- [frontend/src/components/TrainerCard.jsx](../frontend/src/components/TrainerCard.jsx)

---

### TASK 2: React Routing & State Management ✅

- [x] Route `/` → LoginPage
- [x] Route `/classes` → ClassesPage (protected)
- [x] Route `/my-bookings` → MyBookingsPage (protected)
- [x] Route `/admin` → AdminPanel (lazy-loaded)
- [x] Navigation component with Router links
- [x] Navbar component with logout functionality
- [x] ClassesPage form manages 2+ states (selectedTrainer, timeSlot, etc.)
- [x] AuthContext implemented with { member, token, role, login, logout }
- [x] ProtectedRoute redirects unauthenticated users to /
- [x] Lazy-loaded AdminPanel with React.lazy + Suspense

**Files:**

- [frontend/src/App.jsx](../frontend/src/App.jsx)
- [frontend/src/context/AuthContext.jsx](../frontend/src/context/AuthContext.jsx)
- [frontend/src/components/ProtectedRoute.jsx](../frontend/src/components/ProtectedRoute.jsx)
- [frontend/src/components/Navbar.jsx](../frontend/src/components/Navbar.jsx)

---

### TASK 3: Express REST API + Middleware ✅

- [x] POST `/api/v1/auth/login` - Authenticate & issue token
- [x] GET `/api/v1/trainers` - Public trainers endpoint
- [x] POST `/api/v1/bookings` - Create booking (protected)
- [x] GET `/api/v1/bookings/my` - Get user's bookings (protected)
- [x] PATCH `/api/v1/bookings/:id/status` - Update booking status (protected)
- [x] requestLogger middleware logs [METHOD] [PATH] [STATUS] [ms] globally
- [x] authGuard middleware validates Bearer token on protected routes
- [x] errorHandler middleware catches and formats errors globally
- [x] Proper HTTP status codes: 200, 201, 400, 401, 500

**Files:**

- [backend/server.js](../backend/server.js)
- [backend/routes/authRoutes.js](../backend/routes/authRoutes.js)
- [backend/routes/trainerRoutes.js](../backend/routes/trainerRoutes.js)
- [backend/routes/bookingRoutes.js](../backend/routes/bookingRoutes.js)
- [backend/middleware/requestLogger.js](../backend/middleware/requestLogger.js)
- [backend/middleware/authGuard.js](../backend/middleware/authGuard.js)
- [backend/middleware/errorHandler.js](../backend/middleware/errorHandler.js)

---

### TASK 4: REST API Consumption in React ✅

- [x] ClassesPage fetches trainers via GET `/api/v1/trainers`
- [x] useEffect() triggers API request on mount
- [x] Three states managed: trainers, loading, error
- [x] Loading message displayed during request
- [x] Error message displayed on failure
- [x] Trainers rendered via TrainerCard after success
- [x] TrainerCard displays name, specialization, availability from API
- [x] Data is NOT hardcoded (fetched from backend)
- [x] Client-side search filters trainers by specialization
- [x] Search uses .filter() without new API call

**File:**

- [frontend/src/pages/ClassesPage.jsx](../frontend/src/pages/ClassesPage.jsx)

---

### TASK 5: MongoDB + Mongoose Schema Design ✅

- [x] Member schema: name (required), email (required, unique), membershipType (enum: basic/premium/platinum, default: basic)
- [x] Trainer schema: name (required), specialization (required), available (Boolean, default: true)
- [x] ClassBooking schema: memberId (ref Member), trainerId (ref Trainer), className (required), date (required), timeSlot (required), status (enum: booked/attended/cancelled, default: booked)
- [x] Mongoose references used correctly for memberId → Member, trainerId → Trainer
- [x] POST /bookings validates request body and saves to MongoDB with status 201
- [x] GET /bookings/my uses .populate() for member details and trainer details
- [x] MongoDB connection via MONGO_URI in .env
- [x] Validation errors caught and returned as formatted JSON (not raw errors)
- [x] Schema-level validation (required, enum, unique, min) on all models

**Files:**

- [backend/models/Member.js](../backend/models/Member.js)
- [backend/models/Trainer.js](../backend/models/Trainer.js)
- [backend/models/ClassBooking.js](../backend/models/ClassBooking.js)

---

## ✅ ENVIRONMENT CONFIGURATION

- [x] .env file created with PORT, MONGO_URI, JWT_SECRET
- [x] .env.example created (no credentials)
- [x] .gitignore configured to exclude .env
- [x] .env.example committed to GitHub

**Files:**

- [backend/.env](../backend/.env)
- [backend/.env.example](../backend/.env.example)

---

## ✅ PROJECT STRUCTURE

```
itue301-exam-24cs086-a2/
├── backend/
│   ├── models/
│   │   ├── Member.js ✅
│   │   ├── Trainer.js ✅
│   │   └── ClassBooking.js ✅
│   ├── routes/
│   │   ├── authRoutes.js ✅
│   │   ├── trainerRoutes.js ✅
│   │   └── bookingRoutes.js ✅
│   ├── middleware/
│   │   ├── requestLogger.js ✅
│   │   ├── authGuard.js ✅
│   │   └── errorHandler.js ✅
│   ├── server.js ✅
│   ├── seed.js ✅
│   ├── package.json ✅
│   ├── .env ✅
│   └── .env.example ✅
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx ✅
│   │   │   ├── ClassesPage.jsx ✅
│   │   │   ├── MyBookingsPage.jsx ✅
│   │   │   └── AdminPanel.jsx ✅
│   │   ├── components/
│   │   │   ├── Navbar.jsx ✅
│   │   │   ├── ProtectedRoute.jsx ✅
│   │   │   └── TrainerCard.jsx ✅
│   │   ├── context/
│   │   │   └── AuthContext.jsx ✅
│   │   ├── App.jsx ✅
│   │   ├── main.jsx ✅
│   │   ├── App.css ✅
│   │   └── index.css ✅
│   ├── package.json ✅
│   ├── vite.config.js ✅
│   ├── index.html ✅
│   └── public/
├── README.md ✅
├── .gitignore ✅
└── .env.example ✅
```

---

## 🚀 SERVER STATUS

**Backend Server:** Running on http://localhost:5000

```
✅ Express.js server started
✅ MongoDB connected
✅ All routes registered
✅ Middleware applied globally
```

**Frontend Server:** Running on http://localhost:5174

```
✅ Vite development server running
✅ React components loaded
✅ Router configured
✅ API calls working
```

---

## 📋 BEFORE FINAL SUBMISSION

### Step 1: Test All Endpoints

```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend
cd frontend
npm run dev

# Terminal 3: Test API (using curl or Postman)
# See API_TEST_GUIDE.md for curl commands
```

### Step 2: Create PDF Report `24CS086_SetB_Report.pdf`

**Screenshot 1: ClassesPage with Trainer Cards**

1. Open http://localhost:5174
2. Login with: `24cs086@charusat.edu.in` | password: `password123`
3. Navigate to `/classes`
4. Take screenshot showing:
   - Trainer cards with names and specializations
   - Available/Fully Booked status badges
   - Search/filter functionality
   - Booking form with selected values

**Screenshot 2: Postman - POST Booking (HTTP 201)**

1. Open Postman
2. Create POST request to `http://localhost:5000/api/v1/bookings`
3. Headers:
   ```
   Content-Type: application/json
   Authorization: Bearer <YOUR_TOKEN>
   ```
4. Body:
   ```json
   {
     "trainerId": "66c8f2000000000000000001",
     "className": "Morning HIIT Cardio",
     "date": "2026-08-25",
     "timeSlot": "07:00 AM - 08:00 AM"
   }
   ```
5. Send request
6. Take screenshot showing:
   - Response Status: 201 Created
   - Response JSON with booking ID
   - Populated member and trainer details

**Screenshot 3: MongoDB Document**

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Select your cluster and database
3. Navigate to Collections
4. Open `fitzone.classbookings` collection
5. Click on a document to view details
6. Take screenshot showing:
   - ClassBooking document with all fields
   - memberId reference with name and email
   - trainerId reference with name and specialization
   - className, date, timeSlot, status fields

### Step 3: Create PDF

- Use Word/Google Docs/Notion to create PDF report
- Title: FitZone Gym Booking System - Practical Exam Report
- Include student info, 3 screenshots with captions
- Save as: `24CS086_SetB_Report.pdf`

### Step 4: Verify .env and .gitignore

```bash
# Check that real .env is NOT committed
git status

# Verify .env.example exists and is committed
git log --oneline backend/.env.example
```

### Step 5: Final Commit

```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "Final submission: All 5 tasks completed with API tests and documentation"

# Push to GitHub
git push origin main
```

### Step 6: Get Final Commit SHA

```bash
git log --oneline -1
# Copy the SHA (first 7-8 characters)
# Example: abc1234
```

---

## 📤 FINAL SUBMISSION (Google Form)

You need to submit TWO items before exam window closes:

### Item 1: GitHub Repository Link + Commit SHA

```
Repository: https://github.com/BHARGAVRATHOD07/itue301-exam-24cs086-a2
Commit SHA: [Get from: git log --oneline -1]
```

### Item 2: PDF Report File

```
File: 24CS086_SetB_Report.pdf
Upload to: Google Classroom / Microsoft Teams / Assignment Link
```

---

## ⚠️ IMPORTANT REMINDERS

- ✅ Do NOT commit real `.env` file (only `.env.example`)
- ✅ All 5 tasks must be complete
- ✅ All endpoints tested and working
- ✅ MongoDB connection verified
- ✅ Both servers running without errors
- ✅ PDF report with 3 required screenshots
- ✅ README.md with setup instructions
- ✅ Both submission items ready (repo link + SHA, PDF file)

---

## 🎯 Exam Requirements Met

- ✅ React frontend with 3+ distinct pages
- ✅ Client-side routing with protected routes
- ✅ Reusable TrainerCard component with props
- ✅ Global auth state via AuthContext (useState/useContext)
- ✅ Express backend with 5+ REST endpoints at /api/v1/
- ✅ All protected routes use authGuard middleware
- ✅ Global requestLogger applied to every request
- ✅ MongoDB collections with Mongoose schemas
- ✅ Schema-level validation (required, enum, min)
- ✅ Lazy-loaded route (AdminPanel with React.lazy + Suspense)
- ✅ API calls from React using fetch with loading/error states
- ✅ Client-side search filter without new API request
- ✅ Proper HTTP status codes (200, 201, 400, 401, 500)
- ✅ Public GitHub repository with correct naming convention
- ✅ .env.example committed, real .env excluded
- ✅ Backend starts with: npm start or node server.js
- ✅ README.md with setup and MongoDB instructions

---

**Last Updated:** 2026-08-24  
**Status:** ✅ READY FOR SUBMISSION
