import React from 'react';
import { FloatingDiyas } from '../ambient/FloatingDiyas';
import { SparkleCanvas } from '../ambient/SparkleCanvas';
import { CornerTorans } from '../ambient/CornerTorans';
import { RangoliCorner } from '../ambient/RangoliCorner';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const DiwaliHeroScene = ({ children }) => {
  const { canShowHeroScene, deviceTier } = useFestiveMode();

  if (!canShowHeroScene) return <>{children}</>;

  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Ambient Warm Glow Radial Backdrop */}
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full opacity-35 blur-3xl pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(198,161,91,0.25) 0%, rgba(232,163,61,0.12) 45%, transparent 70%)',
        }}
      />

      {/* 2. Slow-Rising Floating Diyas */}
      <FloatingDiyas />

      {/* 3. Gold Sparkle Particles */}
      <SparkleCanvas />

      {/* 4. Torans (Top-Left & Top-Right) */}
      <CornerTorans />

      {/* 5. Rangoli (Bottom-Right) */}
      <RangoliCorner />

      {/* 6. Children / Actual Hero Content */}
      <div className="relative z-20">
        {children}
      </div>

      {/* Bottom vignette gradient for contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ivory to-transparent pointer-events-none z-10"
      />
    </div>
  );
};
