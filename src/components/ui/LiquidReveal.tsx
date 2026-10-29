import React, { useRef, useEffect } from 'react';

/**
 * LiquidReveal Background Canvas (Hero Section Only)
 * Base layer: Soft Azure / Sky Blue / Granite blobs on #ECF4F9.
 * Interactive top layer: Subtle dark deep lake & turquoise revealed smoothly along cursor trail.
 */
export const LiquidReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const baseCanvas = baseCanvasRef.current;
    const trailCanvas = trailCanvasRef.current;
    if (!container || !baseCanvas || !trailCanvas) return;

    const baseCtx = baseCanvas.getContext('2d');
    const trailCtx = trailCanvas.getContext('2d');
    if (!baseCtx || !trailCtx) return;

    // Detect capabilities
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isInteractive = !prefersReducedMotion && hasFinePointer;

    const brushRadius = 143;
    const decay = 0.013;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    // Offscreen cover canvas (Subtle Dark Lake / Oceanic Turquoise)
    const coverCanvas = document.createElement('canvas');
    const coverCtx = coverCanvas.getContext('2d');

    // Offscreen mask canvas for cursor trail
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');

    // Offscreen stamp brush canvas with smooth Gaussian-like radial falloff
    const brushCanvas = document.createElement('canvas');
    const brushCtx = brushCanvas.getContext('2d');

    const prepareBrush = () => {
      brushCanvas.width = brushRadius * 2 * dpr;
      brushCanvas.height = brushRadius * 2 * dpr;
      if (!brushCtx) return;

      const center = brushRadius * dpr;
      const radGrad = brushCtx.createRadialGradient(center, center, 0, center, center, brushRadius * dpr);
      // Feathered, silky falloff for ultra-smooth edge blending
      radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
      radGrad.addColorStop(0.22, 'rgba(255, 255, 255, 0.48)');
      radGrad.addColorStop(0.48, 'rgba(255, 255, 255, 0.24)');
      radGrad.addColorStop(0.75, 'rgba(255, 255, 255, 0.08)');
      radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      brushCtx.clearRect(0, 0, brushCanvas.width, brushCanvas.height);
      brushCtx.fillStyle = radGrad;
      brushCtx.beginPath();
      brushCtx.arc(center, center, brushRadius * dpr, 0, Math.PI * 2);
      brushCtx.fill();
    };

    const paintBaseLayer = () => {
      if (!baseCtx) return;
      baseCtx.fillStyle = '#ECF4F9';
      baseCtx.fillRect(0, 0, width * dpr, height * dpr);

      // Soft Azure blob
      const g1 = baseCtx.createRadialGradient(width * 0.25 * dpr, height * 0.35 * dpr, 0, width * 0.25 * dpr, height * 0.35 * dpr, width * 0.6 * dpr);
      g1.addColorStop(0, 'rgba(99, 164, 206, 0.45)');
      g1.addColorStop(1, 'rgba(99, 164, 206, 0)');
      baseCtx.fillStyle = g1;
      baseCtx.fillRect(0, 0, width * dpr, height * dpr);

      // Sky Blue blob
      const g2 = baseCtx.createRadialGradient(width * 0.75 * dpr, height * 0.5 * dpr, 0, width * 0.75 * dpr, height * 0.5 * dpr, width * 0.55 * dpr);
      g2.addColorStop(0, 'rgba(67, 145, 198, 0.35)');
      g2.addColorStop(1, 'rgba(67, 145, 198, 0)');
      baseCtx.fillStyle = g2;
      baseCtx.fillRect(0, 0, width * dpr, height * dpr);

      // Granite Grey soft wash
      const g3 = baseCtx.createRadialGradient(width * 0.5 * dpr, height * 0.85 * dpr, 0, width * 0.5 * dpr, height * 0.85 * dpr, width * 0.7 * dpr);
      g3.addColorStop(0, 'rgba(181, 190, 186, 0.3)');
      g3.addColorStop(1, 'rgba(181, 190, 186, 0)');
      baseCtx.fillStyle = g3;
      baseCtx.fillRect(0, 0, width * dpr, height * dpr);
    };

    const paintCoverLayer = () => {
      if (!coverCtx) return;
      // Refined subtle dark lake tint (rich teal-slate, not harsh black)
      coverCtx.fillStyle = 'rgba(38, 53, 56, 0.72)';
      coverCtx.fillRect(0, 0, width * dpr, height * dpr);

      // Deep Lake subtle gradient
      const c1 = coverCtx.createRadialGradient(width * 0.3 * dpr, height * 0.4 * dpr, 0, width * 0.3 * dpr, height * 0.4 * dpr, width * 0.65 * dpr);
      c1.addColorStop(0, 'rgba(51, 110, 135, 0.68)');
      c1.addColorStop(1, 'rgba(51, 110, 135, 0)');
      coverCtx.fillStyle = c1;
      coverCtx.fillRect(0, 0, width * dpr, height * dpr);

      // Turquoise Teal soft glow
      const c2 = coverCtx.createRadialGradient(width * 0.7 * dpr, height * 0.65 * dpr, 0, width * 0.7 * dpr, height * 0.65 * dpr, width * 0.55 * dpr);
      c2.addColorStop(0, 'rgba(84, 154, 152, 0.62)');
      c2.addColorStop(1, 'rgba(84, 154, 152, 0)');
      coverCtx.fillStyle = c2;
      coverCtx.fillRect(0, 0, width * dpr, height * dpr);

      // Gentle Oceanic Depth
      const c3 = coverCtx.createRadialGradient(width * 0.5 * dpr, height * 0.15 * dpr, 0, width * 0.5 * dpr, height * 0.15 * dpr, width * 0.55 * dpr);
      c3.addColorStop(0, 'rgba(45, 97, 119, 0.68)');
      c3.addColorStop(1, 'rgba(45, 97, 119, 0)');
      coverCtx.fillStyle = c3;
      coverCtx.fillRect(0, 0, width * dpr, height * dpr);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(400, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      [baseCanvas, trailCanvas, coverCanvas, maskCanvas].forEach((c) => {
        c.width = width * dpr;
        c.height = height * dpr;
      });

      prepareBrush();
      paintBaseLayer();
      if (isInteractive) {
        paintCoverLayer();
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    if (!isInteractive) {
      return () => resizeObserver.disconnect();
    }

    // Interactive mechanics
    const pointQueue: { x: number; y: number }[] = [];
    let lastPoint: { x: number; y: number } | null = null;
    let isDrawing = false;
    let idleFrames = 0;
    let rafId: number | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Ignore points > radius outside canvas
      if (
        x < -brushRadius ||
        x > width + brushRadius ||
        y < -brushRadius ||
        y > height + brushRadius
      ) {
        return;
      }

      isDrawing = true;
      idleFrames = 0;

      if (!lastPoint) {
        pointQueue.push({ x, y });
        lastPoint = { x, y };
      } else {
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        const dist = Math.hypot(dx, dy);
        // Tighter step (~16px) for silky smooth ribbon connection without scalloping
        const step = Math.max(brushRadius * 0.12, 12);

        if (dist >= step) {
          const count = Math.min(Math.floor(dist / step), 24);
          for (let i = 1; i <= count; i++) {
            if (pointQueue.length >= 90) break;
            const t = i / count;
            pointQueue.push({
              x: lastPoint.x + dx * t,
              y: lastPoint.y + dy * t,
            });
          }
          lastPoint = { x, y };
        }
      }

      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      if (!maskCtx || !trailCtx) return;

      const currentFade = isDrawing ? decay : Math.min(decay + idleFrames * 0.003, 0.38);

      // Fade mask canvas
      maskCtx.globalCompositeOperation = 'destination-out';
      maskCtx.fillStyle = `rgba(0, 0, 0, ${currentFade})`;
      maskCtx.fillRect(0, 0, width * dpr, height * dpr);

      // Stamp queued points with smooth feathered brush
      maskCtx.globalCompositeOperation = 'source-over';
      while (pointQueue.length > 0) {
        const pt = pointQueue.shift()!;
        maskCtx.drawImage(
          brushCanvas,
          (pt.x - brushRadius) * dpr,
          (pt.y - brushRadius) * dpr
        );
      }

      isDrawing = false;
      idleFrames++;

      // Composite onto visible trail canvas
      trailCtx.clearRect(0, 0, width * dpr, height * dpr);
      trailCtx.globalCompositeOperation = 'source-over';
      trailCtx.drawImage(coverCanvas, 0, 0);
      trailCtx.globalCompositeOperation = 'destination-in';
      trailCtx.drawImage(maskCanvas, 0, 0);

      // Hard-clear after 120 idle frames and stop the loop
      if (idleFrames > 120) {
        maskCtx.clearRect(0, 0, width * dpr, height * dpr);
        trailCtx.clearRect(0, 0, width * dpr, height * dpr);
        lastPoint = null;
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base Canvas */}
      <canvas ref={baseCanvasRef} className="absolute inset-0 w-full h-full" />
      {/* Interactive Cursor Trail Canvas with subtle opacity & smooth blending */}
      <canvas
        ref={trailCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.72 }}
      />
    </div>
  );
};
