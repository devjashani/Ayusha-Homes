import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let globalLenis: Lenis | null = null;
let lockCount = 0;

export function stopScroll(): void {
  lockCount++;
  if (globalLenis) {
    globalLenis.stop();
  }
  document.documentElement.classList.add('overflow-hidden');
  document.body.classList.add('overflow-hidden');
}

export function startScroll(): void {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    if (globalLenis) {
      globalLenis.start();
    }
    document.documentElement.classList.remove('overflow-hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

/**
 * Universal smooth scroll helper compatible with Lenis and native fallbacks.
 * Correctly calculates true document offsets without relying on parent-relative element.offsetTop.
 */
export function scrollToTarget(target: string | number | HTMLElement, offset: number = -40): void {
  if (globalLenis) {
    if (typeof target === 'number') {
      globalLenis.scrollTo(target);
    } else {
      globalLenis.scrollTo(target, { offset });
    }
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Reset scroll to top on initial page load
    window.scrollTo(0, 0);

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;
    globalLenis = lenis;
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    lenis.scrollTo(0, { immediate: true });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      globalLenis = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}
