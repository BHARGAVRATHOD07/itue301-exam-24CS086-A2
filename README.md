# FitZone Gym & Class Booking System (Set B)

**Course:** ITUE301: Advanced Web Development Frameworks  
**Open-Book Practical Examination | AY 2026–27**  
**Institution:** Chandubhai S. Patel Institute of Technology (CSPIT), CHARUSAT  
**Student Name:** Bhargav Rathod  
**Roll Number:** 24CS086  
**Batch:** A2  
**Repository Name:** `itue301-exam-24cs086-a2`  
**PDF Report Name:** `24CS086_SetB_Report.pdf`  

---

## 📌 Project Overview
FitZone Gym currently books trainer-led classes via WhatsApp. This project is a full-stack booking web application built with **React (Vite)**, **Express.js**, and **MongoDB (Mongoose)** where:
- Members reserve trainer-led fitness classes.
- Trainers display specializations and live availability status badges.
- Admins inspect the roster via a lazy-loaded route (`React.lazy` + `Suspense`).

---

## 📁 Repository Structure
```
itue301-exam-24cs086-a2/
├── backend/
│   ├── config/              # MongoDB connection configuration
│   ├── middleware/          # requestLogger, authGuard, errorHandler
│   ├── models/              # Member, Trainer, ClassBooking Mongoose Schemas
│   ├── routes/              # Auth, Trainer, and Booking REST routes
│   ├── .env.example         # Environment template
│   ├── package.json
│   ├── seed.js              # Database seeder script
│   └── server.js            # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, ProtectedRoute, TrainerCard
│   │   ├── context/         # AuthContext (member, token, role, login, logout)
│   │   ├── pages/           # LoginPage, ClassesPage, MyBookingsPage, AdminPanel (lazy)
│   │   ├── App.jsx          # React Router v6 & Suspense
│   │   ├── index.css        # FitZone styling system
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## ⚙️ Setup & Execution Instructions

### 1. Backend Setup (Express + MongoDB)
```bash
cd backend
npm install

# Copy .env.example to .env
cp .env.example .env

# Seed initial database records (Members, Trainers, ClassBookings)
npm run seed

# Start Express backend server
npm start
```
*Backend runs on:* `http://localhost:5000`

### 2. Frontend Setup (React + Vite)
```bash
cd frontend
npm install

# Start Vite React development server
npm run dev
```
*Frontend runs on:* `http://localhost:5173`

---

## 🔌 REST API Endpoints (`/api/v1/`)

| Method | Endpoint | Auth | Purpose |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/auth/login` | Public | Authenticate member & return JWT Bearer token |
| **GET** | `/api/v1/trainers` | Public | Return list of all gym trainers |
| **POST** | `/api/v1/bookings` | Protected | Reserve a new trainer class (`201 Created`) |
| **GET** | `/api/v1/bookings/my` | Protected | Return logged-in member's class bookings with populated details |
| **PATCH** | `/api/v1/bookings/:id/status` | Protected | Update booking status (`booked` \| `attended` \| `cancelled`) |

---

## 🛠️ Verification & Testing

- **Client-Side Search:** Type in the specialization search bar on `/classes` to instantly filter trainers without triggering additional API calls.
- **Lazy Loading:** `AdminPanel` is code-split and lazy-loaded via `React.lazy()` and `Suspense`.
- **Validation Failure:** Sending invalid enums or missing fields returns structured HTTP `400` validation errors mapped from Mongoose `ValidationError`.
