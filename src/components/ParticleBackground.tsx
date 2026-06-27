import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseOpacity: number;
  opacity: number;
  speedOfTwinkle: number;
  twinkleDirection: number;
  drift: number;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const initParticles = (w: number, h: number) => {
      const count = Math.max(18, Math.min(Math.floor((w * h) / 18000), 90));
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const isOrange = Math.random() > 0.68;
        const baseOpacity = randomRange(0.14, 0.4);
        newParticles.push({
          x: randomRange(0, w),
          y: randomRange(0, h),
          vx: randomRange(-0.16, 0.16),
          vy: randomRange(-0.16, 0.16),
          radius: randomRange(0.8, 2.6),
          color: isOrange ? '255, 138, 0' : '255, 255, 255',
          baseOpacity,
          opacity: baseOpacity,
          speedOfTwinkle: randomRange(0.0025, 0.009),
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
          drift: randomRange(0.08, 0.24),
        });
      }

      particles = newParticles;
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width = w;
        height = h;
        canvas.width = w * window.devicePixelRatio;
        canvas.height = h * window.devicePixelRatio;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        initParticles(w, h);
      }
    });

    resizeObserver.observe(container);

    const drawGlow = (p: Particle) => {
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 7);
      gradient.addColorStop(0, `rgba(${p.color}, ${p.opacity * 1.4})`);
      gradient.addColorStop(0.4, `rgba(${p.color}, ${p.opacity * 0.24})`);
      gradient.addColorStop(1, `rgba(${p.color}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 7, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawConnections = () => {
      const threshold = 96;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * 0.14;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      const driftStrength = Math.sin(frame * 0.0025) * 0.05;

      for (const p of particles) {
        p.x += p.vx + Math.sin(p.y * 0.01 + frame * 0.002) * p.drift + driftStrength;
        p.y += p.vy + Math.cos(p.x * 0.01 + frame * 0.002) * p.drift * 0.45;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        p.opacity += p.twinkleDirection * p.speedOfTwinkle;
        if (p.opacity > p.baseOpacity * 1.35) {
          p.opacity = p.baseOpacity * 1.35;
          p.twinkleDirection = -1;
        } else if (p.opacity < p.baseOpacity * 0.25) {
          p.opacity = p.baseOpacity * 0.25;
          p.twinkleDirection = 1;
        }

        drawGlow(p);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      id="particle-container"
    >
      <canvas ref={canvasRef} className="block w-full h-full" id="particle-canvas" />
    </div>
  );
}
