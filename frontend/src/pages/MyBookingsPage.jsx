import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const MyBookingsPage = () => {
  const { token, member } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    if (token) {
      fetchMyBookings();
    }
  }, [token]);

  return (
    <div>
      <h1 className="page-title">My Class Bookings</h1>
      <p className="page-subtitle">Reserved sessions for {member?.name || 'Member'}</p>

      {loading && <div className="alert alert-info">Loading your bookings...</div>}
      {error && <div className="alert alert-error">Error: {error}</div>}

      {!loading && !error && (
        <>
          {bookings.length === 0 ? (
            <div className="alert alert-info">
              No active class bookings found. Visit the Classes page to reserve a session!
            </div>
          ) : (
            <div className="trainer-grid">
              {bookings.map((b) => (
                <div key={b._id} className="trainer-card">
                  <div>
                    <h3 className="trainer-name">{b.className}</h3>
                    <p className="trainer-spec">
                      Trainer: {b.trainerId?.name || 'Assigned Trainer'} ({b.trainerId?.specialization || 'Fitness'})
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>📅 Date: {b.date}</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>⏰ Slot: {b.timeSlot}</p>
                  </div>
                  <div>
                    <span className={`status-badge ${b.status === 'attended' ? 'available' : b.status === 'cancelled' ? 'fully-booked' : 'available'}`}>
                      Status: {b.status.toUpperCase()}
                    </span>
                  </div>
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
