import React, { useState, useEffect } from 'react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

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
        <img
          src="/src/assets/festive/toran.svg"
          alt=""
          className="w-full h-auto"
        />
      </div>

      {/* Top-Right Toran (Horizontally mirrored) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-24 sm:w-36 md:w-44 pointer-events-none select-none z-10 transition-transform duration-300 ease-out opacity-60 sm:opacity-85"
        style={{
          transform: `translate3d(${-offset.x}px, ${offset.y}px, 0) scaleX(-1)`,
        }}
      >
        <img
          src="/src/assets/festive/toran.svg"
          alt=""
          className="w-full h-auto"
        />
      </div>
    </>
  );
};
