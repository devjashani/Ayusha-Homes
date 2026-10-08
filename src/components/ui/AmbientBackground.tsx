import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <>
      {/* Film grain noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Floating ambient color orbs to give glass cards depth to refract */}
      <div className="orb-layer" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
    </>
  );
};
