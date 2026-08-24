import React from 'react';

/**
 * Task 1 Component: TrainerCard
 * Accepts props: name, specialization, available
 * Dynamic availability display using object map & Cyberpunk theme styling
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

  return (
    <div className="trainer-card">
      <div>
        <h3 className="trainer-name">{name}</h3>
        <p className="trainer-spec">
          <span>⚡</span> {specialization}
        </p>
      </div>
      <div>
        <span className={`status-badge ${statusClassMap[isAvailableKey]}`}>
          {isAvailableKey ? '●' : '✖'} {statusTextMap[isAvailableKey]}
        </span>
      </div>
    </div>
  );
};

export default TrainerCard;
