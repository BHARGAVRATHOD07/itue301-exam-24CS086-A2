import React from 'react';

const AdminPanel = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1 className="page-title">⚙️ Admin Panel</h1>
      <p className="page-subtitle">Roster management and trainer assignments (Lazy-Loaded Route)</p>
      
      <div className="form-card" style={{ maxWidth: '100%', margin: '1rem 0' }}>
        <h3>Gym Operations Roster</h3>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Total Active Trainers: 3 | Total Booked Classes: 5
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
