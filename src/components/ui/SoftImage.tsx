import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { MaskType, BlendMode } from '@/data/imageTuning';

export interface SoftImageProps {
  src: string;
  width: number;
  height: number;
  mask?: MaskType;
  dualMask?: string;
  opacity?: number;
  blend?: BlendMode;
  parallax?: number;
  float?: boolean;
  priority?: boolean;
  scrim?: string;
  className?: string;
  imgClassName?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
  hideBelow?: number;
}

const getMaskStyle = (mask: MaskType = 'none', dualMask?: string): React.CSSProperties => {
  if (dualMask) {
    return {
      maskImage: dualMask,
      WebkitMaskImage: dualMask,
      maskComposite: 'intersect',
      WebkitMaskComposite: 'source-in',
    };
  }

  switch (mask) {
    case 'radial': {
      const val = 'radial-gradient(ellipse 72% 72% at 50% 50%, #000 38%, transparent 100%)';
      return { maskImage: val, WebkitMaskImage: val };
    }
    case 'fade-left': {
      const val = 'linear-gradient(to right, transparent 0%, #000 38%)';
      return { maskImage: val, WebkitMaskImage: val };
    }
    case 'fade-right': {
      const val = 'linear-gradient(to left, transparent 0%, #000 38%)';
      return { maskImage: val, WebkitMaskImage: val };
    }
    case 'fade-bottom': {
      const val = 'linear-gradient(to bottom, #000 55%, transparent 100%)';
      return { maskImage: val, WebkitMaskImage: val };
    }
    case 'fade-top': {
      const val = 'linear-gradient(to top, #000 55%, transparent 100%)';
      return { maskImage: val, WebkitMaskImage: val };
    }
    case 'none':
    default:
      return {};
  }
};

export const SoftImage: React.FC<SoftImageProps> = ({
  src,
  width,
  height,
  mask = 'none',
  dualMask,
  opacity = 1,
  blend = 'normal',
  parallax = 0,
  float = false,
  priority = false,
  scrim,
  className = '',
  imgClassName = '',
  objectFit = 'cover',
  objectPosition,
  hideBelow,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || !parallax ? [0, 0] : [-parallax, parallax]
  );

  const maskStyles = getMaskStyle(mask, dualMask);

  // Responsive display class
  let responsiveClass = '';
  if (hideBelow === 1024) {
    responsiveClass = 'hidden lg:block';
  } else if (hideBelow === 768) {
    responsiveClass = 'hidden md:block';
  } else if (hideBelow === 640) {
    responsiveClass = 'hidden sm:block';
  }

  return (
    <div
      ref={containerRef}
      className={`absolute pointer-events-none select-none z-0 overflow-hidden ${responsiveClass} ${className}`}
      aria-hidden="true"
      style={{
        mixBlendMode: blend,
        maxWidth: '100%',
        ...maskStyles,
      }}
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity } : { opacity: 0, scale: 1.04 }}
        whileInView={prefersReducedMotion ? { opacity } : { opacity, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          y: yParallax,
          width: '100%',
          height: '100%',
          willChange: 'transform, opacity',
        }}
      >
        <motion.div
          animate={
            float && !prefersReducedMotion
              ? { y: [0, -8, 0] }
              : undefined
          }
          transition={
            float && !prefersReducedMotion
              ? { repeat: Infinity, duration: 7, ease: 'easeInOut' }
              : undefined
          }
          className="w-full h-full relative"
        >
          <img
            src={src}
            alt=""
            width={width}
            height={height}
            decoding="async"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            draggable={false}
            className={`w-full h-full ${
              objectFit === 'contain' ? 'object-contain' : 'object-cover'
            } ${imgClassName}`}
            style={{
              filter: 'saturate(0.88) contrast(0.96)',
              ...(objectPosition ? { objectPosition } : {}),
            }}
          />

          {/* Optional Dissolve Scrim */}
          {scrim && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: scrim }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
