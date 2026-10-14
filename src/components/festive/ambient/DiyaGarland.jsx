import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFestiveMode } from '../../../hooks/useFestiveMode';
import garlandUrl from '../../../assets/festive/marigold-garland.svg';

export const DiyaGarland = () => {
  const location = useLocation();
  const { canShowAmbient, canShowAnimations } = useFestiveMode();

  // Only render on homepage and collection/shop pages
  const isEligiblePage = ['/', '/shop', '/collections'].includes(location.pathname);
  if (!canShowAmbient || !isEligiblePage) return null;

  return (
    <div
      aria-hidden="true"
      className="hidden sm:block absolute top-full left-0 right-0 h-7 overflow-hidden pointer-events-none z-30 select-none opacity-90"
    >
      <div
        className="w-full h-full flex items-center justify-between"
        style={{
          backgroundImage: `url("${garlandUrl}")`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center top',
          backgroundSize: '240px 28px',
          animation: canShowAnimations ? 'garlandSway 6s ease-in-out infinite alternate' : 'none',
        }}
      />
    </div>
  );
};
