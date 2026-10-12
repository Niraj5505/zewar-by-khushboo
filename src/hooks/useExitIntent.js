import { useEffect, useRef } from 'react';

export function useExitIntent(onExit, enabled = true) {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!enabled || hasTriggeredRef.current) return;

    // Desktop: detect mouse cursor leaving top of viewport
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        onExit();
      }
    };

    // Mobile: detect back button / popstate
    const handlePopState = () => {
      if (!hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        onExit();
      }
    };

    // Mobile/Fallback: detect 60s inactivity dwell
    let inactivityTimer;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          onExit();
        }
      }, 60000);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('touchstart', resetTimer, { passive: true });
    window.addEventListener('scroll', resetTimer, { passive: true });
    resetTimer();

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      clearTimeout(inactivityTimer);
    };
  }, [onExit, enabled]);
}
