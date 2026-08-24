import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Dumbbell, CalendarCheck, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

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
      const bookingsRes = await fetch('http://localhost:5000/api/v1/bookings/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const bookingsData = await bookingsRes.json();

      const trainersRes = await fetch('http://localhost:5000/api/v1/trainers');
      const trainersData = await trainersRes.json();

      if (bookingsRes.ok && bookingsData.success) {
        setAllBookings(bookingsData.data || []);
      }
      if (trainersRes.ok && trainersData.success) {
        setTrainers(trainersData.data || []);
      }
    } catch (err) {
      setError(err.message || 'Error fetching admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token]);

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
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Manage trainers, classes, and member bookings.</p>
      </div>

      {/* 4 Professional SaaS Statistic Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#EFF6FF', color: '#2563EB' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="stat-value">{trainers.length}</div>
            <div className="stat-label">Active Trainers</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#FFF7ED', color: '#F97316' }}>
            <Dumbbell size={24} />
          </div>
          <div>
            <div className="stat-value">12</div>
            <div className="stat-label">Total Classes</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#ECFDF5', color: '#059669' }}>
            <CalendarCheck size={24} />
          </div>
          <div>
            <div className="stat-value">{allBookings.length}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#F3E8FF', color: '#9333EA' }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="stat-value">6</div>
            <div className="stat-label">Today's Sessions</div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="alert alert-info">
          <Loader2 size={18} className="animate-spin" />
          <span>Loading admin dashboard metrics and class roster...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>Error loading admin panel: {error}</span>
        </div>
      )}

      {!loading && !error && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A' }}>Class Roster Management</h2>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Showing {allBookings.length} total entries</span>
          </div>

          {allBookings.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              No class bookings registered in the system yet.
            </div>
          ) : (
            <div className="saas-table-container">
              <table className="saas-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Class Name</th>
                    <th>Trainer</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allBookings.map((b) => (
                    <tr key={b._id}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#0F172A' }}>{b.memberId?.name || 'Member'}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{b.memberId?.email || 'N/A'}</div>
                      </td>
                      <td style={{ fontWeight: 500, color: '#1E293B' }}>{b.className}</td>
                      <td>{b.trainerId?.name || 'Trainer'}</td>
                      <td>{b.date}</td>
                      <td>{b.timeSlot}</td>
                      <td>
                        <span className={`status-badge ${b.status}`}>
                          {b.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="form-select"
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.82rem', width: 'auto' }}
                          value={b.status}
                          onChange={(e) => handleStatusUpdate(b._id, e.target.value)}
                        >
                          <option value="booked">Booked</option>
                          <option value="attended">Attended</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
