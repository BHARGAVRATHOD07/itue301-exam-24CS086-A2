import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { member, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-icon">⚡</span> <span className="neon-text">FITZONE</span>
      </NavLink>

      <ul className="nav-links">
        {!token ? (
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Login
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/classes" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Admin Panel
              </NavLink>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginLeft: '1rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neon-cyan)', fontFamily: 'Rajdhani, sans-serif' }}>
                👤 {member?.name || 'Member'}
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
