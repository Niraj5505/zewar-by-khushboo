import React, { useRef, useState, useEffect } from 'react';
import { useSparkles } from '../../../hooks/useSparkles';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const SparkleCanvas = ({ fullScreen = false, className = "" }) => {
  const { canShowParticles, deviceTier } = useFestiveMode();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Mount non-blocking after paint (requestIdleCallback or defer)
  useEffect(() => {
    if (!canShowParticles) return;

    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(() => setMounted(true));
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setMounted(true), 120);
      return () => clearTimeout(timer);
    }
  }, [canShowParticles]);

  useSparkles(canvasRef, containerRef, canShowParticles && mounted, deviceTier, fullScreen);

  if (!canShowParticles) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`${
        fullScreen ? 'fixed inset-0 z-10' : 'absolute inset-0 z-10'
      } pointer-events-none overflow-hidden select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block filter blur-[0.4px]"
      />
    </div>
  );
};
