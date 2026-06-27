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

    // Helper to generate a random number in a range
    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // Initialize particles
    const initParticles = (w: number, h: number) => {
      // Density based on canvas area: a balanced minimal count
      const density = Math.min(Math.floor((w * h) / 32000), 45);
      const count = Math.max(12, density);
      
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const isOrange = Math.random() > 0.65; // ~35% orange, ~65% white
        const baseOpacity = randomRange(0.12, 0.42);
        newParticles.push({
          x: randomRange(0, w),
          y: randomRange(0, h),
          vx: randomRange(-0.12, 0.12),
          vy: randomRange(-0.12, 0.12),
          radius: randomRange(0.8, 2.0),
          color: isOrange ? '255, 138, 0' : '255, 255, 255',
          baseOpacity,
          opacity: baseOpacity,
          speedOfTwinkle: randomRange(0.003, 0.012),
          twinkleDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }
      particles = newParticles;
    };

    // Resize handler using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width = w;
        height = h;
        canvas.width = w;
        canvas.height = h;
        initParticles(w, h);
      }
    });

    resizeObserver.observe(container);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Twinkle (slow opacity oscillation)
        p.opacity += p.twinkleDirection * p.speedOfTwinkle;
        if (p.opacity > p.baseOpacity * 1.3) {
          p.opacity = p.baseOpacity * 1.3;
          p.twinkleDirection = -1;
        } else if (p.opacity < p.baseOpacity * 0.3) {
          p.opacity = p.baseOpacity * 0.3;
          p.twinkleDirection = 1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      }

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
