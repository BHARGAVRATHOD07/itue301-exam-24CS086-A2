import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { member, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Extract initials for user avatar badge
  const getInitials = (name) => {
    if (!name) return 'M';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-icon">
          <Zap size={24} fill="#F97316" color="#F97316" />
        </span>
        <span>FITZONE</span>
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
          </>
        )}
      </ul>

      {token && (
        <div className="user-profile-badge">
          <div className="avatar-circle">
            {getInitials(member?.name)}
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E293B' }}>
            {member?.name || 'Member'}
          </span>
          <button onClick={handleLogout} className="btn-logout" title="Logout">
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
