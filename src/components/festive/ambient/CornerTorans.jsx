import React, { useState, useEffect } from 'react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

const ToranSVG = () => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <path d="M0 6 H160" stroke="#C6A15B" strokeWidth="2" strokeLinecap="round" />
    <path d="M0 6 Q40 38 80 6 Q120 38 160 6" stroke="#A8843F" strokeWidth="1.2" fill="none" />
    <path d="M0 6 Q40 52 80 6 Q120 52 160 6" stroke="#C6A15B" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
    <path d="M40 24 L40 68 Q40 82 35 92 Q40 82 45 68 L45 24 Z" fill="#2E5A36" fillOpacity="0.85" stroke="#C6A15B" strokeWidth="0.8" />
    <circle cx="40" cy="24" r="5" fill="#E8A33D" />
    <circle cx="40" cy="98" r="3" fill="#C6A15B" />
    <path d="M80 6 L80 80 Q80 96 75 106 Q80 96 85 80 L85 6 Z" fill="#2E5A36" fillOpacity="0.85" stroke="#C6A15B" strokeWidth="0.8" />
    <circle cx="80" cy="20" r="6" fill="#E8A33D" />
    <circle cx="80" cy="34" r="4" fill="#B33A2B" />
    <circle cx="80" cy="112" r="3.5" fill="#C6A15B" />
    <path d="M120 24 L120 68 Q120 82 115 92 Q120 82 125 68 L125 24 Z" fill="#2E5A36" fillOpacity="0.85" stroke="#C6A15B" strokeWidth="0.8" />
    <circle cx="120" cy="24" r="5" fill="#E8A33D" />
    <circle cx="120" cy="98" r="3" fill="#C6A15B" />
    <circle cx="12" cy="16" r="2.5" fill="#C6A15B" />
    <circle cx="148" cy="16" r="2.5" fill="#C6A15B" />
  </svg>
);

export const CornerTorans = () => {
  const { canShowAmbient, canShowAnimations, reducedMotion } = useFestiveMode();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion || !canShowAnimations || window.innerWidth < 768) return;

    let rafId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const normX = (e.clientX / window.innerWidth) - 0.5;
        const normY = (e.clientY / window.innerHeight) - 0.5;
        // Shift 4-6px opposite cursor
        setOffset({ x: -normX * 8, y: -normY * 6 });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [reducedMotion, canShowAnimations]);

  if (!canShowAmbient) return null;

  return (
    <>
      {/* Top-Left Toran */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-24 sm:w-36 md:w-44 pointer-events-none select-none z-10 transition-transform duration-300 ease-out opacity-60 sm:opacity-85"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        <ToranSVG />
      </div>

      {/* Top-Right Toran (Horizontally mirrored) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-24 sm:w-36 md:w-44 pointer-events-none select-none z-10 transition-transform duration-300 ease-out opacity-60 sm:opacity-85"
        style={{
          transform: `translate3d(${-offset.x}px, ${offset.y}px, 0) scaleX(-1)`,
        }}
      >
        <ToranSVG />
      </div>
    </>
  );
};
