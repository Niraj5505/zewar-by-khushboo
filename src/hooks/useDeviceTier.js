import { useState, useEffect } from 'react';

/**
 * Categorizes the client hardware into 'low' | 'mid' | 'high' tier.
 * Used for adaptive particle density scaling and conditional 3D loading.
 */
export const useDeviceTier = () => {
  const [deviceTier, setDeviceTier] = useState(() => {
    if (typeof window === 'undefined') return 'mid';

    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const isMobile = window.innerWidth < 640;

    if (cores < 4 || memory < 4 || (isMobile && cores <= 4)) {
      return 'low';
    }
    if (cores >= 8 && memory >= 6 && !isMobile) {
      return 'high';
    }
    return 'mid';
  });

  useEffect(() => {
    const handleResize = () => {
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      const isMobile = window.innerWidth < 640;

      if (cores < 4 || memory < 4 || (isMobile && cores <= 4)) {
        setDeviceTier('low');
      } else if (cores >= 8 && memory >= 6 && !isMobile) {
        setDeviceTier('high');
      } else {
        setDeviceTier('mid');
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceTier;
};
