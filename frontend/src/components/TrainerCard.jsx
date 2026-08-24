import React from 'react';
import { Dumbbell, CheckCircle2, XCircle } from 'lucide-react';

/**
 * Task 1 Component: TrainerCard
 * Accepts props: name, specialization, available
 * Dynamic availability display using object map & SaaS fitness aesthetic
 */
const TrainerCard = ({ name, specialization, available }) => {
  const statusTextMap = {
    true: 'Available',
    false: 'Fully Booked'
  };

  const statusClassMap = {
    true: 'available',
    false: 'fully-booked'
  };

  const isAvailableKey = Boolean(available);

  // Generate initials for clean avatar badge
  const getInitials = (str) => {
    if (!str) return 'TR';
    const parts = str.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return str.substring(0, 2).toUpperCase();
  };

  return (
    <div className="trainer-card">
      <div>
        <div className="trainer-card-header">
          <div className="trainer-avatar">
            {getInitials(name)}
          </div>
          <div>
            <h3 className="trainer-name">{name}</h3>
            <p className="trainer-spec">
              <Dumbbell size={14} color="#2563EB" />
              <span>{specialization}</span>
            </p>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
        <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 500 }}>Status</span>
        <span className={`status-badge ${statusClassMap[isAvailableKey]}`}>
          {isAvailableKey ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
          {statusTextMap[isAvailableKey]}
        </span>
      </div>
    </div>
  );
};

export default TrainerCard;
