import { useEffect } from 'react';

/**
 * Adaptive rem grid runtime hook for ultra-wide displays (> 1920px).
 * Scales root font size smoothly based on viewport expansion.
 */
export function useAdaptiveGrid(): void {
  useEffect(() => {
    const handleResize = () => {
      const FONT_BASE = 16;
      const baseWidth = 1920;
      const coef = 0.6666;
      const w = window.innerWidth;
      const reduction = ((baseWidth - w) / baseWidth) * 100;
      const size = FONT_BASE - (FONT_BASE * (reduction * coef)) / 100;

      if (size > FONT_BASE) {
        document.documentElement.style.fontSize = `${size}px`;
      } else {
        document.documentElement.style.removeProperty('font-size');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.removeProperty('font-size');
    };
  }, []);
}
