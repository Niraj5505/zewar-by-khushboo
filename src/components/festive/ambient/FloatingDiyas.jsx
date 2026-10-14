import React, { useEffect, useRef, useState } from 'react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';
import { DiyaIcon } from '../DiyaIcon';

export const FloatingDiyas = () => {
  const { canShowAmbient, canShowAnimations, deviceTier } = useFestiveMode();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // IntersectionObserver to pause off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0]?.isIntersecting ?? true);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const handleVisibility = () => {
      if (document.hidden) setIsVisible(false);
      else setIsVisible(true);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  if (!canShowAmbient) return null;

  // 4 to 6 diyas on desktop/tablet, 2 on low/mobile
  const count = deviceTier === 'low' ? 2 : 5;
  const diyas = [
    { left: '12%', size: 48, duration: 28, delay: 0 },
    { left: '32%', size: 64, duration: 34, delay: 6 },
    { left: '68%', size: 52, duration: 30, delay: 12 },
    { left: '86%', size: 42, duration: 26, delay: 3 },
    { left: '50%', size: 58, duration: 38, delay: 18 },
  ].slice(0, count);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {diyas.map((d, i) => (
        <div
          key={i}
          className="absolute bottom-[-80px] pointer-events-none opacity-35"
          style={{
            left: d.left,
            width: `${d.size}px`,
            height: `${d.size}px`,
            filter: 'blur(1px)',
            animation:
              canShowAnimations && isVisible
                ? `floatDiyaRise ${d.duration}s linear infinite`
                : 'none',
            animationDelay: `${d.delay}s`,
          }}
        >
          <DiyaIcon className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(242,184,75,0.4)]" />
        </div>
      ))}
    </div>
  );
};
