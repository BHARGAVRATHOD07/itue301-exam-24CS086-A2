import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { token } = useAuth();
  const [allBookings, setAllBookings] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all bookings
      const bookingsRes = await fetch('http://localhost:5000/api/v1/bookings/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const bookingsData = await bookingsRes.json();

      // Fetch all trainers
      const trainersRes = await fetch('http://localhost:5000/api/v1/trainers');
      const trainersData = await trainersRes.json();

      if (bookingsRes.ok && bookingsData.success) {
        setAllBookings(bookingsData.data || []);
      }
      if (trainersRes.ok && trainersData.success) {
        setTrainers(trainersData.data || []);
      }
    } catch (err) {
      setError(err.message || 'Error fetching admin roster');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token]);

  // Update status handler for Admin
  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Refresh roster
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  return (
    <div>
      <h1 className="page-title">⚙️ FitZone Admin Panel</h1>
      <p className="page-subtitle">Roster management and class booking administration (Lazy-Loaded Route)</p>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="form-card" style={{ margin: 0, padding: '1.25rem' }}>
          <h4 style={{ color: 'var(--text-muted)' }}>Total Active Trainers</h4>
          <h2 style={{ fontSize: '2rem', color: 'var(--accent)', marginTop: '0.25rem' }}>{trainers.length}</h2>
        </div>

        <div className="form-card" style={{ margin: 0, padding: '1.25rem' }}>
          <h4 style={{ color: 'var(--text-muted)' }}>Total Booked Classes</h4>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginTop: '0.25rem' }}>{allBookings.length}</h2>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading admin roster from database...</div>}
      {error && <div className="alert alert-error">Error: {error}</div>}

      {!loading && !error && (
        <div>
          <h2>Gym Operations Class Roster ({allBookings.length} Entries)</h2>

          {allBookings.length === 0 ? (
            <div className="alert alert-info" style={{ marginTop: '1rem' }}>
              No class bookings found in the database system.
            </div>
          ) : (
            <div className="trainer-grid" style={{ marginTop: '1rem' }}>
              {allBookings.map((b) => (
                <div key={b._id} className="trainer-card">
                  <div>
                    <h3 className="trainer-name">{b.className}</h3>
                    <p className="trainer-spec" style={{ color: 'var(--accent)' }}>
                      👤 Member: {b.memberId?.name || 'Member'} ({b.memberId?.email || 'N/A'})
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                      🏋️ Trainer: {b.trainerId?.name || 'Trainer'}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>📅 Date: {b.date}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>⏰ Slot: {b.timeSlot}</p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span className={`status-badge ${b.status === 'attended' ? 'available' : b.status === 'cancelled' ? 'fully-booked' : 'available'}`}>
                      Status: {b.status.toUpperCase()}
                    </span>

                    {/* Admin Status Update Dropdown */}
                    <div className="form-group" style={{ margin: 0 }}>
                      <label style={{ fontSize: '0.75rem' }}>Change Status:</label>
                      <select 
                        className="form-select"
                        style={{ padding: '0.35rem 0.5rem', fontSize: '0.85rem' }}
                        value={b.status}
                        onChange={(e) => handleStatusUpdate(b._id, e.target.value)}
                      >
                        <option value="booked">BOOKED</option>
                        <option value="attended">ATTENDED</option>
                        <option value="cancelled">CANCELLED</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
