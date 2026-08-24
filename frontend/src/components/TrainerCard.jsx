import React from 'react';

/**
 * Task 1 Component: TrainerCard
 * Accepts props: name, specialization, available
 * Dynamic availability display using object map
 */
const TrainerCard = ({ name, specialization, available }) => {
  // Object map for text display as hinted in exam task
  const statusTextMap = {
    true: 'Available',
    false: 'Fully Booked'
  };

  // Object map for dynamic CSS classes
  const statusClassMap = {
    true: 'available',
    false: 'fully-booked'
  };

  const isAvailableKey = Boolean(available);

  return (
    <div className="trainer-card">
      <div>
        <h3 className="trainer-name">{name}</h3>
        <p className="trainer-spec">Specialization: {specialization}</p>
      </div>
      <div>
        <span className={`status-badge ${statusClassMap[isAvailableKey]}`}>
          {statusTextMap[isAvailableKey]}
        </span>
      </div>
    </div>
  );
};

export default TrainerCard;
