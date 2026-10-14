import React from 'react';

/**
 * Elegant, luxury line-art Diya SVG icon.
 * Stroke-only or subtle dual-tone (champagne lamp with marigold flame).
 */
export const DiyaIcon = ({
  className = "w-4 h-4",
  fillLamp = "#C6A15B",
  fillFlame = "#E8A33D",
  stroke = "currentColor",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Flame */}
      <path
        d="M12 2C12 2 9.5 5.5 9.5 7.5C9.5 9.15685 10.6193 10.5 12 10.5C13.3807 10.5 14.5 9.15685 14.5 7.5C14.5 5.5 12 2 12 2Z"
        fill={fillFlame}
        opacity="0.95"
      />
      {/* Inner flame light spark */}
      <circle cx="12" cy="7.5" r="1" fill="#FAF7F0" />
      {/* Diya Base / Oil Lamp */}
      <path
        d="M3 13C3 13 4 18 12 18C20 18 21 13 21 13C21 13 20 14 12 14C4 14 3 13 3 13Z"
        fill={fillLamp}
      />
      <path
        d="M3 13C4.5 18.5 12 19 12 19C12 19 19.5 18.5 21 13C17 14.5 12 14.5 3 13Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Delicate pedestal base */}
      <path
        d="M9.5 19H14.5C14.5 19 14 21 12 21C10 21 9.5 19 9.5 19Z"
        fill={fillLamp}
        stroke={stroke}
        strokeWidth="1"
      />
    </svg>
  );
};
