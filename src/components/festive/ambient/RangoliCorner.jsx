import React from 'react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const RangoliCorner = () => {
  const { canShowAmbient, canShowAnimations, reducedMotion } = useFestiveMode();

  if (!canShowAmbient || reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="hidden md:block absolute -bottom-16 -right-16 w-44 h-44 pointer-events-none select-none z-0 opacity-25"
    >
      <img
        src="/src/assets/festive/rangoli.svg"
        alt=""
        className="w-full h-full object-contain"
        style={{
          animation: canShowAnimations ? 'rangoliRotate 60s linear infinite' : 'none',
        }}
      />
    </div>
  );
};
