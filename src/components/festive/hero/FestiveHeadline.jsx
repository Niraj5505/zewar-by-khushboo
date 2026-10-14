import React from 'react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const FestiveHeadline = ({ children, className = "" }) => {
  const { canShowAnimations } = useFestiveMode();

  if (!canShowAnimations) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        backgroundImage: 'linear-gradient(110deg, #30251F 20%, #C6A15B 45%, #FFFFFF 50%, #C6A15B 55%, #30251F 80%)',
        backgroundSize: '250% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'goldShimmer 8s ease-in-out infinite',
      }}
    >
      {children}
    </span>
  );
};
