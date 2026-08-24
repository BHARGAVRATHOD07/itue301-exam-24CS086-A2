# PDF Report Creation Guide
## FitZone Gym & Class Booking System - Exam Submission

**File Name:** `24CS086_SetB_Report.pdf`  
**Student:** Bhargav Rathod | **Roll No:** 24CS086 | **Batch:** A2  
**Date:** 2026-08-24

---

## 📊 PDF Report Structure

Your PDF report must contain **exactly 3 screenshots** with captions. Below are step-by-step instructions to capture each screenshot.

---

## 📸 Screenshot 1: ClassesPage with Trainer Cards

**Purpose:** Demonstrate React Component Architecture, API Consumption, and UI

### Steps to Capture:

1. **Start both servers** (if not already running):
   ```bash
   # Terminal 1: Backend
   cd backend
   npm start
   
   # Terminal 2: Frontend  
   cd frontend
   npm run dev
   ```

2. **Open browser** and go to: `http://localhost:5174`

3. **Login** with credentials:
   - Email: `24cs086@charusat.edu.in`
   - Password: `password123`
   - Click "Sign In & Access System"

4. **Navigate to Classes page** (automatically redirected or click "Classes" in navbar)

5. **Verify page elements** (before taking screenshot):
   - ✅ Trainer cards displayed with data from API
   - ✅ Each card shows: Trainer name, specialization, availability status
   - ✅ Availability badges show "Available" or "Fully Booked" with different colors
   - ✅ Search box visible at top right
   - ✅ Booking form visible below trainers
   - ✅ Form fields: Trainer dropdown, Class Name, Date, Time Slot

6. **Optional: Test search filter**
   - Type "HIIT" in search box
   - Verify trainers are filtered by specialization without page reload

7. **Take screenshot** showing:
   - Full page with trainer cards
   - Search filter functionality
   - Booking form with fields filled
   - Make it large and clear (1920x1080 minimum)

8. **Save screenshot** as: `screenshot_1_classes_page.png`

**What the examiner looks for:**
- ✅ Trainers fetched from API (not hardcoded)
- ✅ TrainerCard component reused
- ✅ Props correctly passed (name, specialization, available)
- ✅ Dynamic availability display (CSS classes for different states)
- ✅ Search/filter working client-side
- ✅ Professional UI layout

---

## 🚀 Screenshot 2: Postman - POST /api/v1/bookings with HTTP 201 Response

**Purpose:** Demonstrate Express REST API, Protected Routes, Status Codes, and MongoDB Integration

### Prerequisites:
- Download Postman: https://www.postman.com/downloads/
- OR use Thunder Client extension in VS Code
- Have backend running on http://localhost:5000
- Have valid JWT token (from login endpoint)

### Steps to Capture:

1. **Get JWT Token:**
   ```bash
   # Use login endpoint to get token
   curl -X POST http://localhost:5000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"24cs086@charusat.edu.in","password":"password123"}'
   ```
   - Copy the `token` value from response
   - Keep it ready for next step

2. **Open Postman** (or Thunder Client)

3. **Create new POST request:**
   - **Method:** POST
   - **URL:** `http://localhost:5000/api/v1/bookings`

4. **Add Headers:**
   ```
   Content-Type: application/json
   Authorization: Bearer <PASTE_YOUR_TOKEN_HERE>
   ```

5. **Add Request Body (JSON):**
   ```json
   {
     "trainerId": "66c8f2000000000000000001",
     "className": "Morning HIIT Cardio Blast",
     "date": "2026-08-25",
     "timeSlot": "07:00 AM - 08:00 AM"
   }
   ```

6. **Click Send** button

7. **Verify Response:**
   - **Status Code:** Should show `201 Created` (green highlight)
   - **Response Body:** Should show:
     ```json
     {
       "success": true,
       "message": "Class booking created successfully",
       "data": {
         "_id": "...",
         "memberId": { "name": "...", "email": "..." },
         "trainerId": { "name": "...", "specialization": "..." },
         "className": "Morning HIIT Cardio Blast",
         "date": "2026-08-25",
         "timeSlot": "07:00 AM - 08:00 AM",
         "status": "booked"
       }
     }
     ```

8. **Take screenshot** showing:
   - Request URL: `http://localhost:5000/api/v1/bookings`
   - Request method: POST
   - Headers with Authorization Bearer token
   - Request body JSON
   - Response status: **201 Created** (prominently visible)
   - Response JSON with all booking details
   - Member and trainer data populated

9. **Save screenshot** as: `screenshot_2_postman_201.png`

**What the examiner looks for:**
- ✅ HTTP Status Code 201 (Created) clearly visible
- ✅ Bearer token in Authorization header
- ✅ Request body with all required fields
- ✅ Response includes booking ID
- ✅ memberId and trainerId populated with referenced data
- ✅ Demonstrates protected route with authentication
- ✅ Schema validation successful

---

## 🗄️ Screenshot 3: MongoDB Document

**Purpose:** Demonstrate MongoDB Integration, Schema Design, and Data Persistence

### Prerequisites:
- MongoDB Atlas account (free tier is fine)
- Database connected and contains data from running the application

### Steps to Capture:

1. **Go to MongoDB Atlas:** https://cloud.mongodb.com

2. **Login** with your MongoDB credentials

3. **Select your Cluster:**
   - Click on "Clusters" or "Database" section
   - Find your `fitzone` cluster/database

4. **Navigate to Collections:**
   - Click on "Collections" tab
   - Or: Database → Browse Collections

5. **Find and Open ClassBooking Collection:**
   - Look for `fitzone` database
   - Open `classbookings` collection
   - You should see at least one document

6. **Click on a Document** to view details
   - Preferably one created during your testing
   - Should contain all booking data

7. **Verify Document Contains:**
   - `_id`: MongoDB ObjectId
   - `memberId`: Reference to Member (showing name, email via populate)
   - `trainerId`: Reference to Trainer (showing name, specialization via populate)
   - `className`: String value
   - `date`: Date string (e.g., "2026-08-25")
   - `timeSlot`: String value (e.g., "07:00 AM - 08:00 AM")
   - `status`: Enum value (e.g., "booked")
   - `createdAt`: Timestamp
   - `updatedAt`: Timestamp

8. **Take screenshot** showing:
   - Database name: `fitzone`
   - Collection name: `classbookings`
   - Full document JSON with all fields visible
   - Member reference details (name, email)
   - Trainer reference details (name, specialization)
   - All enum validation working (status is one of: booked, attended, cancelled)

9. **Alternative - Show Multiple Collections:**
   - Show `members` collection with at least one member document
   - Show `trainers` collection with at least one trainer document
   - Show `classbookings` collection with the booking document
   - Take separate screenshots and include all 3 in PDF

10. **Save screenshot** as: `screenshot_3_mongodb_document.png`

**What the examiner looks for:**
- ✅ MongoDB database `fitzone` visible
- ✅ ClassBooking document with all required fields
- ✅ Schema validation applied (required fields present)
- ✅ References populated (memberId shows member details, trainerId shows trainer details)
- ✅ Enum validation (status is valid value)
- ✅ Data persistence (booking saved and retrieved successfully)
- ✅ Timestamps present (createdAt, updatedAt)

---

## 📄 Creating the PDF Report

### Option 1: Using Microsoft Word (Recommended)

1. **Create new Word document**

2. **Add Title Page:**
   ```
   FitZone Gym & Class Booking System
   Advanced Web Development Frameworks - ITUE301
   Open-Book Practical Examination Report
   
   Student Name: Bhargav Rathod
   Roll Number: 24CS086
   Batch: A2
   Date: 2026-08-24
   Repository: itue301-exam-24cs086-a2
   ```

3. **Add Screenshot 1:**
   - Insert → Pictures → Choose `screenshot_1_classes_page.png`
   - Add caption:
     ```
     Figure 1: ClassesPage Component
     Demonstrates React component architecture with TrainerCard reusable component.
     Shows trainer data fetched from GET /api/v1/trainers API endpoint.
     Dynamic availability status badges (Available/Fully Booked) with different CSS styling.
     Client-side search filter enables users to find trainers by specialization without new API call.
     Booking form with useState state management for trainer selection, date, and time slot.
     ```

4. **Add Screenshot 2:**
   - Insert → Pictures → Choose `screenshot_2_postman_201.png`
   - Add caption:
     ```
     Figure 2: POST /api/v1/bookings Endpoint with HTTP 201 Status
     Demonstrates Express.js REST API with proper HTTP status code (201 Created).
     Protected route using authGuard middleware validates Bearer token.
     Request body includes all required fields: trainerId, className, date, timeSlot.
     Response shows booking successfully created in MongoDB.
     Populated member and trainer details confirm schema references working correctly.
     ```

5. **Add Screenshot 3:**
   - Insert → Pictures → Choose `screenshot_3_mongodb_document.png`
   - Add caption:
     ```
     Figure 3: MongoDB ClassBooking Document
     Shows persisted booking document in fitzone.classbookings collection.
     Demonstrates schema design with required fields (memberId, trainerId, date, timeSlot).
     Enum validation applied on status field (values: booked, attended, cancelled).
     Mongoose references properly populated showing member name/email and trainer name/specialization.
     Timestamps (createdAt, updatedAt) confirm data persistence layer working correctly.
     ```

6. **Save as PDF:**
   - File → Save As
   - Name: `24CS086_SetB_Report.pdf`
   - Format: PDF Document (.pdf)
   - Location: `c:\Users\Bhargav Rathod\Downloads\AWDF_Practical_Exam\`

### Option 2: Using Google Docs

1. Go to https://docs.google.com

2. Create new document

3. Add text and images as above

4. Download as PDF

### Option 3: Using Notion or Canva

1. Create document/design
2. Export as PDF
3. Download

---

## 📋 PDF Content Checklist

Before submitting, verify PDF contains:

- [x] Title page with student info (Name: Bhargav Rathod, Roll: 24CS086, Batch: A2)
- [x] Screenshot 1: ClassesPage with trainer cards, search, and booking form
- [x] Screenshot 1 caption explaining React components and API consumption
- [x] Screenshot 2: Postman POST /bookings with HTTP 201 status
- [x] Screenshot 2 caption explaining protected route and API response
- [x] Screenshot 3: MongoDB ClassBooking document with all fields
- [x] Screenshot 3 caption explaining schema and data persistence
- [x] Clear, readable images (not blurry or cut off)
- [x] Professional formatting with proper spacing
- [x] File name exactly: `24CS086_SetB_Report.pdf`
- [x] File size reasonable (< 10MB)

---

## 🎯 FINAL SUBMISSION CHECKLIST

### Item 1: GitHub Repository Information ✅
```
Repository URL: https://github.com/BHARGAVRATHOD07/itue301-exam-24cs086-a2
Final Commit SHA: d9e1579
Branch: main
```

### Item 2: PDF Report ✅
```
File Name: 24CS086_SetB_Report.pdf
Location: Ready in project root
Contains: 3 screenshots with captions
File Size: < 10MB
Format: PDF (not Word, not images)
```

---

## 📤 SUBMISSION TO GOOGLE FORM

1. **Fill out Google Form** with:
   - Student Name: Bhargav Rathod
   - Roll Number: 24CS086
   - Batch: A2
   - Repository Link: `https://github.com/BHARGAVRATHOD07/itue301-exam-24cs086-a2`
   - Final Commit SHA: `d9e1579`
   - Upload PDF: `24CS086_SetB_Report.pdf`

2. **Verify before submitting:**
   - ✅ All fields filled correctly
   - ✅ PDF file is attached and file name is correct
   - ✅ Repository is public and accessible
   - ✅ Commit SHA is correct

3. **Submit BEFORE exam window closes** (5-minute grace period)

---

## ⚠️ COMMON ISSUES & SOLUTIONS

### Issue: Screenshots are blurry
**Solution:** 
- Take screenshots at native resolution (1920x1080 or higher)
- Use Print Screen or built-in screenshot tool
- Don't scale down images

### Issue: Postman shows 400 error instead of 201
**Solution:**
- Verify token is valid (login first and copy token)
- Check request body JSON is properly formatted
- Ensure all required fields present: trainerId, className, date, timeSlot
- Check server is running on port 5000

### Issue: MongoDB shows no documents
**Solution:**
- Run the application and create at least one booking via web interface
- Or run: `node backend/seed.js` to seed sample data
- Verify MONGO_URI in .env is correct

### Issue: PDF won't open
**Solution:**
- Save in proper PDF format (not Word doc)
- Use File → Save As → PDF
- Don't use Print to PDF (quality issues)
- Use reputable PDF creator or Word export

---

## ✅ VERIFICATION

Before final submission, run through this checklist:

**Code Quality:**
- [x] All 5 tasks implemented correctly
- [x] No console errors in browser dev tools
- [x] No error messages in terminal
- [x] Code follows exam requirements

**API Testing:**
- [x] Login endpoint returns token (HTTP 200)
- [x] Get trainers returns trainer list (HTTP 200)
- [x] Create booking returns HTTP 201 with populated data
- [x] Get my bookings returns user's bookings with populated data
- [x] Update booking status works (HTTP 200)

**Database:**
- [x] MongoDB connected successfully
- [x] Collections exist: members, trainers, classbookings
- [x] Documents have required fields and valid values
- [x] References are properly populated

**Frontend:**
- [x] Login page functional
- [x] Protected routes redirect unauthenticated users
- [x] ClassesPage fetches and displays trainers
- [x] Search filter works without API call
- [x] Booking form submits successfully
- [x] MyBookings page shows user's bookings
- [x] AdminPanel loads lazily without errors

**Submission Materials:**
- [x] GitHub repo is public and has correct name
- [x] README.md has setup instructions
- [x] .env.example is committed, real .env is excluded
- [x] Final commit SHA obtained: d9e1579
- [x] PDF report created with 3 screenshots
- [x] PDF file name is correct: 24CS086_SetB_Report.pdf
- [x] Both submission items ready

---

**Status:** ✅ READY FOR FINAL SUBMISSION

**Deadline:** 2026-08-24 (Same day as exam)
