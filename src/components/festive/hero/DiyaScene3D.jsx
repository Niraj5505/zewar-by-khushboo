import React, { useRef, useEffect } from 'react';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

/**
 * Procedural WebGL/Canvas 3D Diya with clay bowl geometry, specular highlights,
 * and realistic 2Hz sine-wave flame flicker.
 * Only rendered on deviceTier === 'high' and when heroScene pref is enabled.
 */
export const DiyaScene3D = ({ className = "" }) => {
  const { canShowHeroScene, deviceTier, canShowAnimations } = useFestiveMode();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!canShowHeroScene || deviceTier !== 'high') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId;
    let time = 0;
    const width = (canvas.width = 120);
    const height = (canvas.height = 120);

    const render = () => {
      rafId = requestAnimationFrame(render);
      time += 0.035;

      // ~2Hz flicker with 0.15 amplitude
      const flicker = canShowAnimations ? Math.sin(time * 12.5) * 0.15 + Math.sin(time * 7.2) * 0.08 : 0;
      const flameHeight = 28 + flicker * 10;
      const flameWidth = 14 + flicker * 4;
      const glowAlpha = 0.35 + flicker * 0.15;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.68;

      // 1. Soft Warm Point Light Glow
      const radial = ctx.createRadialGradient(cx, cy - flameHeight / 2, 2, cx, cy - flameHeight / 2, 45);
      radial.addColorStop(0, `rgba(242, 184, 75, ${glowAlpha})`);
      radial.addColorStop(0.5, `rgba(232, 163, 61, ${glowAlpha * 0.5})`);
      radial.addColorStop(1, 'rgba(198, 161, 91, 0)');
      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(cx, cy - flameHeight / 2, 45, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Terracotta / Brass Bowl Rim & Body (Elliptical projection)
      // Base shadow
      ctx.fillStyle = 'rgba(48, 37, 31, 0.25)';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 18, 30, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Outer Bowl Body
      const bodyGrad = ctx.createLinearGradient(cx - 32, cy, cx + 32, cy + 16);
      bodyGrad.addColorStop(0, '#8E5B23');
      bodyGrad.addColorStop(0.3, '#C6A15B');
      bodyGrad.addColorStop(0.7, '#A8843F');
      bodyGrad.addColorStop(1, '#5C3813');

      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.moveTo(cx - 32, cy);
      ctx.bezierCurveTo(cx - 32, cy + 22, cx + 32, cy + 22, cx + 32, cy);
      ctx.closePath();
      ctx.fill();

      // Pedestal Base
      ctx.fillStyle = '#8E5B23';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 14, 14, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Inner Oil Pool
      const poolGrad = ctx.createLinearGradient(cx - 28, cy - 4, cx + 28, cy + 4);
      poolGrad.addColorStop(0, '#42240E');
      poolGrad.addColorStop(0.5, '#784318');
      poolGrad.addColorStop(1, '#3B1F0A');
      ctx.fillStyle = poolGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 28, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Golden Rim Highlight
      ctx.strokeStyle = '#D9BC85';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 28, 7, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Flame Sprite (Teardrop curve)
      const flameBaseY = cy - 2;
      const flameTipY = flameBaseY - flameHeight;
      const tipOffset = canShowAnimations ? Math.sin(time * 6) * 1.5 : 0;

      // Outer Orange Flame
      const outerFlameGrad = ctx.createLinearGradient(cx, flameBaseY, cx, flameTipY);
      outerFlameGrad.addColorStop(0, '#E8A33D');
      outerFlameGrad.addColorStop(0.5, '#F2B84B');
      outerFlameGrad.addColorStop(1, '#B33A2B');

      ctx.fillStyle = outerFlameGrad;
      ctx.beginPath();
      ctx.moveTo(cx, flameTipY);
      ctx.bezierCurveTo(cx + flameWidth, flameBaseY - flameHeight * 0.4, cx + flameWidth * 0.6, flameBaseY, cx, flameBaseY);
      ctx.bezierCurveTo(cx - flameWidth * 0.6, flameBaseY, cx - flameWidth, flameBaseY - flameHeight * 0.4, cx + tipOffset, flameTipY);
      ctx.closePath();
      ctx.fill();

      // Inner Golden Core
      const innerFlameGrad = ctx.createLinearGradient(cx, flameBaseY, cx, flameTipY + 8);
      innerFlameGrad.addColorStop(0, '#FAF7F0');
      innerFlameGrad.addColorStop(0.7, '#F2B84B');
      innerFlameGrad.addColorStop(1, '#E8A33D');

      ctx.fillStyle = innerFlameGrad;
      ctx.beginPath();
      ctx.moveTo(cx, flameTipY + 8);
      ctx.bezierCurveTo(cx + flameWidth * 0.5, flameBaseY - flameHeight * 0.3, cx + flameWidth * 0.3, flameBaseY, cx, flameBaseY);
      ctx.bezierCurveTo(cx - flameWidth * 0.3, flameBaseY, cx - flameWidth * 0.5, flameBaseY - flameHeight * 0.3, cx, flameTipY + 8);
      ctx.closePath();
      ctx.fill();

      // Micro White Spark at Wick
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, flameBaseY - 3, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [canShowHeroScene, deviceTier, canShowAnimations]);

  if (!canShowHeroScene || deviceTier !== 'high') return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`inline-block pointer-events-none select-none ${className}`}
      title="Illuminated Festive Diya"
    >
      <canvas
        ref={canvasRef}
        width={120}
        height={120}
        className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md"
      />
    </div>
  );
};
