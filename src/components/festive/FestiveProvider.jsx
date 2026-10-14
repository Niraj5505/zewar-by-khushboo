import React, { createContext, useContext, useEffect } from 'react';
import { useFestiveMode } from '../../hooks/useFestiveMode';
import { WarmVignette } from './ambient/WarmVignette';
import { DiwaliConfettiBurst } from './overlays/DiwaliConfettiBurst';
import { FestiveAmbience } from './audio/FestiveAmbience';

const FestiveContext = createContext(null);

export const useFestive = () => {
  const context = useContext(FestiveContext);
  if (!context) {
    throw new Error('useFestive must be used within a FestiveProvider');
  }
  return context;
};

export const FestiveProvider = ({ children }) => {
  const festiveMode = useFestiveMode();
  const { isActive } = festiveMode;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isActive) {
      document.body.setAttribute('data-festive', 'true');
      document.documentElement.style.setProperty('--festive-accent', '#E8A33D');
      document.documentElement.style.setProperty('--festive-deep', '#B33A2B');
      document.documentElement.style.setProperty('--festive-glow', 'rgba(198, 161, 91, 0.35)');
    } else {
      document.body.removeAttribute('data-festive');
    }

    return () => {
      document.body.removeAttribute('data-festive');
    };
  }, [isActive]);

  return (
    <FestiveContext.Provider value={festiveMode}>
      {children}
      {/* Global Ambient Viewport Vignette */}
      <WarmVignette />
      {/* One-shot Confetti Burst Canvas */}
      <DiwaliConfettiBurst />
      {/* Optional Acoustic Tanpura Drone */}
      <FestiveAmbience />
    </FestiveContext.Provider>
  );
};
