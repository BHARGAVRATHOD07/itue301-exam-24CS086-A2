import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, Dumbbell, User, CheckCircle2, AlertCircle, Loader2, XCircle } from 'lucide-react';

const MyBookingsPage = () => {
  const { token, member } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/v1/bookings/my', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setBookings(data.data || []);
      } else {
        throw new Error(data.error || 'Failed to fetch bookings');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMyBookings();
    }
  }, [token]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/v1/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'cancelled' })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        fetchMyBookings();
      } else {
        alert(data.error || 'Failed to cancel booking');
      }
    } catch (err) {
      alert('Error cancelling booking: ' + err.message);
    }
  };

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <h1 className="page-title">My Bookings</h1>
        <p className="page-subtitle">Manage your upcoming training sessions.</p>
      </div>

      {loading && (
        <div className="alert alert-info">
          <Loader2 size={18} className="animate-spin" />
          <span>Loading your training schedule...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>Error: {error}</span>
        </div>
      )}

      {!loading && !error && (
        <>
          {bookings.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--brand-blue-subtle)', color: 'var(--brand-blue)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Calendar size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.35rem' }}>No Upcoming Bookings</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                You haven't reserved any training sessions yet.
              </p>
              <a href="/classes" className="btn-primary" style={{ textDecoration: 'none' }}>
                Browse Classes & Reserve
              </a>
            </div>
          ) : (
            <div className="trainer-grid">
              {bookings.map((b) => (
                <div key={b._id} className="trainer-card">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0F172A' }}>{b.className}</h3>
                      <span className={`status-badge ${b.status}`}>
                        {b.status === 'attended' ? <CheckCircle2 size={13} /> : b.status === 'cancelled' ? <XCircle size={13} /> : <Clock size={13} />}
                        {b.status.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: '#475569', margin: '1rem 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <User size={15} color="#64748B" />
                        <span><strong>Trainer:</strong> {b.trainerId?.name || 'Assigned Trainer'} ({b.trainerId?.specialization || 'Fitness'})</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={15} color="#2563EB" />
                        <span><strong>Date:</strong> {b.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Clock size={15} color="#2563EB" />
                        <span><strong>Time Slot:</strong> {b.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  {b.status === 'booked' && (
                    <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
                      <button 
                        onClick={() => handleCancelBooking(b._id)} 
                        className="btn-secondary" 
                        style={{ width: '100%', color: '#DC2626', borderColor: '#FECACA' }}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyBookingsPage;
