import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ClassesPage from './pages/ClassesPage';
import LoginPage from './pages/LoginPage';
import MyBookingsPage from './pages/MyBookingsPage';

// Task 2 Requirement: Lazy-loaded route for Admin Panel using React.lazy + Suspense
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Suspense fallback={<div className="alert alert-info">Loading Admin Panel...</div>}>
              <Routes>
                {/* Public Route */}
                <Route path="/" element={<LoginPage />} />

                {/* Protected Routes */}
                <Route 
                  path="/classes" 
                  element={
                    <ProtectedRoute>
                      <ClassesPage />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/my-bookings" 
                  element={
                    <ProtectedRoute>
                      <MyBookingsPage />
                    </ProtectedRoute>
                  } 
                />

                {/* Protected Lazy-loaded Route */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
