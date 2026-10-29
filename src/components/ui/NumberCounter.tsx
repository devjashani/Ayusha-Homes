import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface NumberCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1800,
  className = '',
}) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrent(target);
      return;
    }

    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const easeVal = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const nextVal = target * easeVal;

        setCurrent(nextVal);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrent(target);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  const formatted = current.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
