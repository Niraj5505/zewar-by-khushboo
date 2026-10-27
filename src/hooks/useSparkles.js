import { useEffect, useRef } from 'react';

/**
 * Adaptive canvas particle simulation hook for gold Diwali sparkles.
 * Density dynamically scales with deviceTier:
 *   - low: 20 particles
 *   - mid: 40 particles
 *   - high: 75 particles
 * Automatically pauses when off-screen or when tab is blurred.
 */
export const useSparkles = (canvasRef, containerRef, isEnabled = true, deviceTier = 'mid', fullScreen = false) => {
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);
  const isTabActiveRef = useRef(true);

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale particle count based on device tier
    let particleCount = 40;
    if (deviceTier === 'low') particleCount = 20;
    if (deviceTier === 'high') particleCount = fullScreen ? 80 : 65;

    let particles = [];
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const createParticle = (spawnAtBottom = false) => {
      const duration = 4000 + Math.random() * 4000; // 4-8s lifespan
      return {
        x: Math.random() * width,
        y: spawnAtBottom ? height + Math.random() * 20 : Math.random() * height,
        baseX: Math.random() * width,
        size: 2 + Math.random() * 1.5, // 2-3.5px
        speedY: 0.5 + Math.random() * 0.8, // Slow gentle upward drift
        swaySpeed: 0.0018 + Math.random() * 0.0025,
        swayAmp: 14 + Math.random() * 18,
        time: Math.random() * 1000,
        birthTime: performance.now(),
        duration,
        color: Math.random() > 0.4 ? '#C6A15B' : Math.random() > 0.5 ? '#E8A33D' : '#F2B84B',
        maxAlpha: 0.35 + Math.random() * 0.35,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(false));
    }

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = (now) => {
      animFrameRef.current = requestAnimationFrame(render);

      if (!isVisibleRef.current || !isTabActiveRef.current) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const age = now - p.birthTime;

        if (age > p.duration || p.y < -15) {
          particles[i] = createParticle(true);
          continue;
        }

        let alpha = p.maxAlpha;
        if (age < 600) {
          alpha = (age / 600) * p.maxAlpha;
        } else if (age > p.duration - 1000) {
          alpha = ((p.duration - age) / 1000) * p.maxAlpha;
        }
        alpha = Math.max(0, Math.min(p.maxAlpha, alpha));

        p.time += 16;
        p.y -= p.speedY;
        p.x = p.baseX + Math.sin(p.time * p.swaySpeed) * p.swayAmp;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();

        // Delicate starburst glint
        if (p.size > 2.8 && alpha > 0.45) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 1.3, p.y);
          ctx.lineTo(p.x + p.size * 1.3, p.y);
          ctx.moveTo(p.x, p.y - p.size * 1.3);
          ctx.lineTo(p.x, p.y + p.size * 1.3);
          ctx.stroke();
        }

        ctx.restore();
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [isEnabled, canvasRef, containerRef, deviceTier, fullScreen]);
};
