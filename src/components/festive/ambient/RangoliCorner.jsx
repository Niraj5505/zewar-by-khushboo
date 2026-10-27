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
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
        style={{
          animation: canShowAnimations ? 'rangoliRotate 60s linear infinite' : 'none',
        }}
      >
        {/* Outer concentric ring */}
        <circle cx="100" cy="100" r="92" stroke="#C6A15B" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="82" stroke="#C6A15B" strokeWidth="0.8" />
        {/* 8 Petal Lotus Geometry */}
        <g stroke="#C6A15B" strokeWidth="1.2" fill="none">
          <path d="M100 18 Q120 60 100 100 Q80 60 100 18Z" />
          <path d="M100 182 Q120 140 100 100 Q80 140 100 182Z" />
          <path d="M18 100 Q60 120 100 100 Q60 80 18 100Z" />
          <path d="M182 100 Q140 120 100 100 Q140 80 182 100Z" />
          {/* Diagonal petals */}
          <path d="M42 42 Q80 50 100 100 Q50 80 42 42Z" />
          <path d="M158 42 Q150 80 100 100 Q120 50 158 42Z" />
          <path d="M42 158 Q50 120 100 100 Q80 150 42 158Z" />
          <path d="M158 158 Q120 150 100 100 Q150 120 158 158Z" />
        </g>
        {/* Inner Ring & Bindu Dot */}
        <circle cx="100" cy="100" r="32" stroke="#C6A15B" strokeWidth="1" strokeDasharray="4 2" />
        <circle cx="100" cy="100" r="14" fill="#C6A15B" fillOpacity="0.25" stroke="#C6A15B" strokeWidth="1" />
        <circle cx="100" cy="100" r="4" fill="#E8A33D" />
        {/* Accent Dots on 8 axes */}
        <circle cx="100" cy="28" r="2.5" fill="#E8A33D" />
        <circle cx="100" cy="172" r="2.5" fill="#E8A33D" />
        <circle cx="28" cy="100" r="2.5" fill="#E8A33D" />
        <circle cx="172" cy="100" r="2.5" fill="#E8A33D" />
        <circle cx="49" cy="49" r="2" fill="#E8A33D" />
        <circle cx="151" cy="49" r="2" fill="#E8A33D" />
        <circle cx="49" cy="151" r="2" fill="#E8A33D" />
        <circle cx="151" cy="151" r="2" fill="#E8A33D" />
      </svg>
    </div>
  );
};
