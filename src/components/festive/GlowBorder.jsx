import React from 'react';
import { useFestiveMode } from '../../hooks/useFestiveMode';

export const GlowBorder = ({ children, className = "" }) => {
  const { isActive, reducedMotion } = useFestiveMode();

  if (!isActive || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`relative rounded-[4px] transition-shadow duration-1000 ${className}`}
      style={{
        boxShadow: '0 0 0 1px #C6A15B, 0 0 24px rgba(198,161,91,0.35)',
        animation: 'festiveGlowPulse 4s ease-in-out infinite alternate',
      }}
    >
      {children}
    </div>
  );
};
