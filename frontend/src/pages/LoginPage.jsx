import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('24cs086@charusat.edu.in');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store member & JWT token in AuthContext
      login(data.member, data.token, 'Member');
      navigate('/classes');
    } catch (err) {
      setError(err.message || 'Server connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2 className="page-title" style={{ textAlign: 'center' }}>Member Login</h2>
      <p className="page-subtitle" style={{ textAlign: 'center' }}>Access FitZone classes & schedule</p>
      
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            className="form-input" 
            placeholder="member@fitzone.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="form-input" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Authenticating...' : 'Sign In & Access System'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
