import React from 'react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const GlowBorder = ({ children, className = "" }) => {
  const { isActive, reducedMotion, canShowAnimations } = useFestiveMode();

  if (!isActive || reducedMotion || !canShowAnimations) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`relative rounded-[4px] transition-shadow duration-700 ${className}`}
      style={{
        boxShadow: '0 0 0 1px #C6A15B, 0 0 20px rgba(198,161,91,0.32)',
        animation: 'festiveGlowPulse 4s ease-in-out infinite alternate',
      }}
    >
      {children}
    </div>
  );
};
