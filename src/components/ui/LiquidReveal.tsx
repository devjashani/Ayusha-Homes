import React, { useRef, useEffect } from 'react';

/**
 * LiquidReveal Background Canvas (Hero Section)
 * Base layer: hero-bg-light.webp (object-fit cover, always visible).
 * Cursor-trail cover layer: hero-bg-dark.webp (revealed along cursor trail).
 * Brush mechanics: brushRadius 143, decay 0.016, dpr min 2.
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
    const decay = 0.016;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    // Image assets
    const lightImg = new Image();
    lightImg.src = '/images/hero-bg-light.webp';
    let lightLoaded = false;

    const darkImg = new Image();
    darkImg.src = '/images/hero-bg-dark.webp';
    let darkLoaded = false;

    // Offscreen cover canvas
    const coverCanvas = document.createElement('canvas');
    const coverCtx = coverCanvas.getContext('2d');

    // Offscreen mask canvas for cursor trail
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');

    // Offscreen stamp brush canvas with smooth radial gradient
    const brushCanvas = document.createElement('canvas');
    const brushCtx = brushCanvas.getContext('2d');

    const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) => {
      if (!img.naturalWidth || !img.naturalHeight) return;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let renderW = w;
      let renderH = h;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        renderH = w / imgRatio;
        offsetY = (h - renderH) / 2;
      } else {
        renderW = h * imgRatio;
        offsetX = (w - renderW) / 2;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    };

    const prepareBrush = () => {
      brushCanvas.width = brushRadius * 2 * dpr;
      brushCanvas.height = brushRadius * 2 * dpr;
      if (!brushCtx) return;

      const center = brushRadius * dpr;
      const radGrad = brushCtx.createRadialGradient(center, center, 0, center, center, brushRadius * dpr);
      radGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      radGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.5)');
      radGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.22)');
      radGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0.06)');
      radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      brushCtx.clearRect(0, 0, brushCanvas.width, brushCanvas.height);
      brushCtx.fillStyle = radGrad;
      brushCtx.beginPath();
      brushCtx.arc(center, center, brushRadius * dpr, 0, Math.PI * 2);
      brushCtx.fill();
    };

    const redraw = () => {
      if (width <= 0 || height <= 0) return;
      const w = width * dpr;
      const h = height * dpr;

      if (lightLoaded && baseCtx) {
        drawCover(baseCtx, lightImg, w, h);
      }
      if (isInteractive && darkLoaded && coverCtx) {
        drawCover(coverCtx, darkImg, w, h);
      }
    };

    lightImg.onload = () => {
      lightLoaded = true;
      redraw();
    };
    darkImg.onload = () => {
      darkLoaded = true;
      redraw();
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
      redraw();
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

      const currentFade = isDrawing ? decay : Math.min(decay + idleFrames * 0.003, 0.4);

      // Fade mask canvas
      maskCtx.globalCompositeOperation = 'destination-out';
      maskCtx.fillStyle = `rgba(0, 0, 0, ${currentFade})`;
      maskCtx.fillRect(0, 0, width * dpr, height * dpr);

      // Stamp queued points
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
      {/* Base Canvas: hero-bg-light.webp */}
      <canvas ref={baseCanvasRef} className="absolute inset-0 w-full h-full" />
      {/* Interactive Cursor Trail Canvas: hero-bg-dark.webp */}
      <canvas
        ref={trailCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.85 }}
      />
    </div>
  );
};
