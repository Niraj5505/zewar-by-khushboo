import React from 'react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const WarmVignette = () => {
  const { canShowAmbient } = useFestiveMode();

  if (!canShowAmbient) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] select-none"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(232,163,61,0.08) 100%)',
      }}
    />
  );
};
