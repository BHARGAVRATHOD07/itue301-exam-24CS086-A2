import React, { useState, useEffect } from 'react';
import TrainerCard from '../components/TrainerCard';
import { useAuth } from '../context/AuthContext';

const ClassesPage = () => {
  const { token } = useAuth();

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [className, setClassName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingStatusMsg, setBookingStatusMsg] = useState({ type: '', message: '' });

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

  const filteredTrainers = trainers.filter(trainer => 
    trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <h1 className="page-title">
        FitZone <span className="neon-text">Classes & Booking</span>
      </h1>
      <p className="page-subtitle">Reserve trainer-led sessions and elevate your fitness schedule</p>

      {/* Class Booking Form */}
      <div className="form-card" style={{ maxWidth: '650px', margin: '0 0 3rem 0' }}>
        <h2 style={{ marginBottom: '0.25rem' }}>Reserve a Trainer Session</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
          Select an available trainer and lock in your session slot.
        </p>

        {bookingStatusMsg.message && (
          <div className={`alert ${bookingStatusMsg.type === 'error' ? 'alert-error' : 'alert-info'}`}>
            {bookingStatusMsg.message}
          </div>
        )}

        <form onSubmit={handleBookingSubmit}>
          <div className="form-group">
            <label>Select Trainer</label>
            <select 
              className="form-select"
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              required
            >
              <option value="">-- Choose an Expert Trainer --</option>
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
              placeholder="e.g. Morning HIIT Blast"
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

          <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.25)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
            <strong>Live State Summary:</strong> Trainer ID: <code style={{ color: 'var(--neon-cyan)' }}>{selectedTrainer || 'None'}</code> | Slot: <code style={{ color: 'var(--neon-cyan)' }}>{timeSlot || 'None'}</code>
          </div>

          <button type="submit" className="btn-primary" disabled={bookingSubmitting}>
            {bookingSubmitting ? 'Creating Booking...' : '⚡ Confirm Class Booking'}
          </button>
        </form>
      </div>

      {/* Directory & Client-Side Search Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <h2>Available Trainers ({filteredTrainers.length})</h2>

        <input 
          type="text"
          className="form-input search-box"
          placeholder="🔍 Filter specialization (e.g. Yoga, HIIT)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '340px', margin: 0 }}
        />
      </div>

      {loading && (
        <div className="alert alert-info">
          ⌛ Fetching certified trainers from REST API...
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          ⚠️ Error loading trainers: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredTrainers.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No trainers match your filter "{searchTerm}".</p>
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
