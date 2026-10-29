import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { stopScroll, startScroll } from '@/hooks/useLenis';

interface PageLoaderProps {
  onIntroReady: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onIntroReady }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check sessionStorage
    try {
      const alreadyShown = sessionStorage.getItem('ayusha_loader_shown') === 'true';
      if (alreadyShown || prefersReducedMotion) {
        setVisible(false);
        onIntroReady();
        return;
      }
    } catch {
      // sessionStorage unavailable, proceed with normal loader
    }

    // Lock scroll during intro
    stopScroll();

    const duration = 1300;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // easeInOutCubic
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const currentVal = Math.floor(ease * 100);
      setProgress(currentVal);

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        setProgress(100);
        try {
          sessionStorage.setItem('ayusha_loader_shown', 'true');
        } catch {
          // ignore
        }
        setTimeout(() => {
          setVisible(false);
          startScroll();
          onIntroReady();
        }, 150);
      }
    };

    const animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      startScroll();
    };
  }, [onIntroReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', opacity: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 30,
            mass: 0.8,
          }}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[var(--ink)] text-[var(--on-dark)] select-none rounded-b-[var(--radius-card)] overflow-hidden shadow-2xl"
          style={{ willChange: 'transform' }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center text-center max-w-xs w-full px-6">
            {/* Logo Mark */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] flex items-center justify-center text-white font-bold text-xl shadow-lg mb-4">
              A
            </div>

            {/* Existing Wordmark & Label */}
            <div className="flex flex-col items-center mb-8">
              <span className="font-semibold tracking-tight text-2xl text-[var(--on-dark)] leading-none">
                AYUSHA
              </span>
              <span className="text-[0.6875rem] text-[var(--on-dark-muted)] font-medium tracking-widest uppercase mt-1">
                CONTINUITY LAYER
              </span>
            </div>

            {/* 1px Progress Track */}
            <div className="w-full h-[1px] bg-white/15 relative overflow-hidden mb-4">
              <div
                className="h-full bg-[var(--accent-soft)] transition-all duration-75 ease-out shadow-[0_0_8px_var(--accent-soft)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Tabular 3-digit counter: 000 -> 100 */}
            <div className="font-mono text-sm tracking-widest text-[var(--on-dark-muted)] tabular-nums">
              {String(progress).padStart(3, '0')}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
