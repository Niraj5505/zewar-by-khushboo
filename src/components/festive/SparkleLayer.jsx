import React, { useRef } from 'react';
import { useSparkles } from '../../hooks/useSparkles';
import { useFestiveMode } from '../../hooks/useFestiveMode';

export const SparkleLayer = ({ className = "" }) => {
  const { isActive, reducedMotion } = useFestiveMode();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Hook handles particle animation, off-screen pause, visibility changes, and cleanup
  useSparkles(canvasRef, containerRef, isActive && !reducedMotion);

  if (!isActive || reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden z-10 ${className}`}
    >
      {/* Subtle soft gold ambient glow behind hero typography (Pure CSS, 0 CPU) */}
      <div
        className="absolute -top-16 left-1/4 w-96 h-96 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(198,161,91,0.18) 0%, rgba(232,163,61,0.06) 50%, transparent 70%)',
        }}
      />

      {/* Lightweight canvas particle layer */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
