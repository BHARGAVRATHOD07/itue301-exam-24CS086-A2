import React, { useState, useEffect } from 'react';
import TrainerCard from '../components/TrainerCard';
import { useAuth } from '../context/AuthContext';
import { Search, Calendar, Clock, Dumbbell, UserCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

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
        message: `Booking confirmed successfully! Reserved "${data.data.className}" on ${data.data.date} (${data.data.timeSlot}).`
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
    <div className="page-fade-in">
      <div className="page-header">
        <h1 className="page-title">Classes & Booking</h1>
        <p className="page-subtitle">Reserve trainer-led sessions and build your fitness schedule.</p>
      </div>

      {/* Compact Professional Booking Form */}
      <div className="form-card" style={{ maxWidth: '720px', margin: '0 0 2.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent-orange-subtle)', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0F172A' }}>Book a Training Session</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Select your trainer, date, and preferred time slot.</p>
          </div>
        </div>

        {bookingStatusMsg.message && (
          <div className={`alert ${bookingStatusMsg.type === 'error' ? 'alert-error' : 'alert-success'}`}>
            {bookingStatusMsg.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span>{bookingStatusMsg.message}</span>
          </div>
        )}

        <form onSubmit={handleBookingSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Trainer</label>
              <select 
                className="form-select"
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
                required
              >
                <option value="">Select a trainer</option>
                {trainers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} ({t.specialization})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Class Name</label>
              <input 
                type="text"
                className="form-input"
                placeholder="e.g. Morning HIIT Cardio"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
            </div>
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
                <option value="">Select time slot</option>
                <option value="07:00 AM - 08:00 AM">07:00 AM - 08:00 AM</option>
                <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
              </select>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem', color: '#475569' }}>
            <strong>Selected:</strong> Trainer ID: <code style={{ color: 'var(--brand-blue)' }}>{selectedTrainer || 'None'}</code> | Time Slot: <code style={{ color: 'var(--brand-blue)' }}>{timeSlot || 'None'}</code>
          </div>

          <button type="submit" className="btn-primary btn-cta" style={{ width: '100%' }} disabled={bookingSubmitting}>
            {bookingSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Confirming...</span>
              </>
            ) : (
              <span>Confirm Booking</span>
            )}
          </button>
        </form>
      </div>

      {/* Directory & Client-Side Search Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#0F172A' }}>Available Trainers</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Showing {filteredTrainers.length} certified fitness specialists</p>
        </div>

        <div className="search-box-wrapper">
          <Search size={16} className="search-box-icon" />
          <input 
            type="text"
            className="form-input search-box-input"
            placeholder="Search by specialization or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="alert alert-info">
          <Loader2 size={18} />
          <span>Loading available trainers...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>Error loading trainers: {error}</span>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredTrainers.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              No trainers found matching "{searchTerm}".
            </div>
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
