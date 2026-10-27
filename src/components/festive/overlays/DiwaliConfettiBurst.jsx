import React, { useEffect, useRef } from 'react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

// Global event bus for triggering one-shot confetti bursts
const CONFETTI_EVENT = 'zewar:festive-confetti';

export const triggerFestiveConfetti = (originX, originY) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(CONFETTI_EVENT, {
      detail: { x: originX, y: originY },
    })
  );
};

export const DiwaliConfettiBurst = () => {
  const { canShowConfetti, deviceTier } = useFestiveMode();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canShowConfetti) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let activeParticles = [];
    let rafId;

    const handleBurst = (e) => {
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      // Default origin is top-right (cart area) or passed coordinates
      const originX = e.detail?.x || width - 60;
      const originY = e.detail?.y || 60;

      const colors = ['#C6A15B', '#E8A33D', '#B33A2B', '#F2B84B', '#FAF7F0'];
      const count = deviceTier === 'low' ? 30 : 60;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 3 + Math.random() * 7;
        activeParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 2, // initial upward lift
          gravity: 0.22,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2.5 + Math.random() * 3,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.2,
          alpha: 1,
          decay: 0.016 + Math.random() * 0.014,
        });
      }

      if (!rafId) {
        animate();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > canvas.height) {
          activeParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Render diamond confetti flake
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.8, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.8, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      if (activeParticles.length > 0) {
        rafId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rafId = null;
      }
    };

    window.addEventListener(CONFETTI_EVENT, handleBurst);

    return () => {
      window.removeEventListener(CONFETTI_EVENT, handleBurst);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [canShowConfetti, deviceTier]);

  if (!canShowConfetti) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 select-none"
    />
  );
};
