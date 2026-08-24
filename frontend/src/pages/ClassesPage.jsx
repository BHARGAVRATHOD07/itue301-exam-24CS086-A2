import React, { useState, useEffect } from 'react';
import TrainerCard from '../components/TrainerCard';
import { useAuth } from '../context/AuthContext';

const ClassesPage = () => {
  const { token } = useAuth();

  // Task 4 Mandatory States: trainers, loading, and error
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Client-side search state for filtering by specialization
  const [searchTerm, setSearchTerm] = useState('');

  // Booking form states
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [className, setClassName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingStatusMsg, setBookingStatusMsg] = useState({ type: '', message: '' });

  // Task 4 Requirement: Fetch trainers inside useEffect on component mount
  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/v1/trainers');
        if (!response.ok) {
          throw new Error(`Failed to fetch trainers (HTTP Status ${response.status})`);
        }
        const data = await response.json();
        if (data.success) {
          setTrainers(data.data || []);
        } else {
          throw new Error(data.error || 'Unable to load trainers');
        }
      } catch (err) {
        setError(err.message || 'Network error fetching trainer data');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  // Task 4 Requirement: Derive filtered array by specialization at render time using .filter()
  const filteredTrainers = trainers.filter(trainer => 
    trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Booking Creation API POST /api/v1/bookings
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTrainer || !className || !bookingDate || !timeSlot) {
      setBookingStatusMsg({ type: 'error', message: 'Please fill out all booking fields' });
      return;
    }

    setBookingSubmitting(true);
    setBookingStatusMsg({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          trainerId: selectedTrainer,
          className,
          date: bookingDate,
          timeSlot
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create booking');
      }

      setBookingStatusMsg({
        type: 'success',
        message: `🎉 Booking Confirmed! Class "${data.data.className}" reserved for ${data.data.date} at ${data.data.timeSlot}.`
      });

      // Clear form
      setClassName('');
      setBookingDate('');
      setTimeSlot('');
    } catch (err) {
      setBookingStatusMsg({ type: 'error', message: err.message });
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">FitZone Classes & Booking</h1>
      <p className="page-subtitle">Reserve trainer-led classes and manage your fitness schedule</p>

      {/* Class Booking Form */}
      <div className="form-card" style={{ maxWidth: '600px', margin: '0 0 2.5rem 0' }}>
        <h2>Reserve a Trainer Session</h2>
        
        {bookingStatusMsg.message && (
          <div className={`alert ${bookingStatusMsg.type === 'error' ? 'alert-error' : 'alert-info'}`}>
            {bookingStatusMsg.message}
          </div>
        )}

        <form onSubmit={handleBookingSubmit} style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label>Select Trainer</label>
            <select 
              className="form-select"
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              required
            >
              <option value="">-- Select Trainer from API --</option>
              {trainers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name} ({t.specialization}) - {t.available ? 'Available' : 'Fully Booked'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Class Name</label>
            <input 
              type="text"
              className="form-input"
              placeholder="e.g. HIIT Strength & Conditioning"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date"
                className="form-input"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Time Slot</label>
              <select 
                className="form-select"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
              >
                <option value="">-- Choose Slot --</option>
                <option value="07:00 AM - 08:00 AM">07:00 AM - 08:00 AM</option>
                <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
              </select>
            </div>
          </div>

          {/* Meaningful state display */}
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <strong>Live State Summary:</strong> Trainer ID: <code>{selectedTrainer || 'None'}</code> | Slot: <code>{timeSlot || 'None'}</code>
          </div>

          <button type="submit" className="btn-primary" disabled={bookingSubmitting}>
            {bookingSubmitting ? 'Creating Booking...' : 'Book Class Now'}
          </button>
        </form>
      </div>

      {/* Trainer Directory Header & Task 4 Client-Side Search Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <h2>Available Trainers ({filteredTrainers.length})</h2>

        {/* Task 4 Requirement: Client-side search input filtering by specialization without re-fetching */}
        <input 
          type="text"
          className="form-input search-box"
          placeholder="🔍 Filter by specialization (e.g. Yoga, HIIT)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '320px', margin: 0 }}
        />
      </div>

      {/* Task 4 Requirement 1: Loading State */}
      {loading && (
        <div className="alert alert-info">
          ⏳ Loading trainer data from REST API...
        </div>
      )}

      {/* Task 4 Requirement 2: Error State */}
      {error && (
        <div className="alert alert-error">
          ⚠️ Error loading trainers: {error}
        </div>
      )}

      {/* Task 4 Requirement 3: Render Trainer Data via TrainerCard after successful request */}
      {!loading && !error && (
        <>
          {filteredTrainers.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No trainers found matching specialization "{searchTerm}".</p>
          ) : (
            <div className="trainer-grid">
              {filteredTrainers.map((t) => (
                <TrainerCard 
                  key={t._id} 
                  name={t.name} 
                  specialization={t.specialization} 
                  available={t.available} 
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClassesPage;
