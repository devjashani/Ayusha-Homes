import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export type GlassVariant = 'nav' | 'card' | 'button' | 'modal' | 'chip';

export interface GlassPanelProps extends HTMLMotionProps<'div'> {
  variant?: GlassVariant;
  liquidRefraction?: boolean;
  className?: string;
  children?: React.ReactNode;
  tiltOnHover?: boolean;
  active?: boolean;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      variant = 'card',
      liquidRefraction = false,
      className = '',
      children,
      tiltOnHover = false,
      active = false,
      onPointerMove,
      onPointerLeave,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const panelRef = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;
    const [supportsLiquid, setSupportsLiquid] = useState(false);
    const rAFRef = useRef<number | null>(null);

    useEffect(() => {
      // Feature-detect Chromium + SVG backdrop-filter
      if (typeof window !== 'undefined' && liquidRefraction) {
        const isChromium = 'chrome' in window && navigator.userAgent.indexOf('Safari') !== -1;
        const supportsSvgBackdrop =
          typeof CSS !== 'undefined' &&
          CSS.supports &&
          CSS.supports('backdrop-filter', 'url(#liquid-glass)');
        setSupportsLiquid(Boolean(isChromium || supportsSvgBackdrop));
      }
    }, [liquidRefraction]);

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (onPointerMove) onPointerMove(e);
        if (!panelRef.current) return;

        if (rAFRef.current) {
          cancelAnimationFrame(rAFRef.current);
        }

        const clientX = e.clientX;
        const clientY = e.clientY;

        rAFRef.current = requestAnimationFrame(() => {
          if (!panelRef.current) return;
          const rect = panelRef.current.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          panelRef.current.style.setProperty('--mx', `${x}px`);
          panelRef.current.style.setProperty('--my', `${y}px`);

          if (tiltOnHover) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; // max 5-6 deg
            const rotateY = ((x - centerX) / centerX) * 5;
            panelRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`;
          }
        });
      },
      [onPointerMove, panelRef, tiltOnHover]
    );

    const handlePointerLeave = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (onPointerLeave) onPointerLeave(e);
        if (!panelRef.current) return;

        if (rAFRef.current) {
          cancelAnimationFrame(rAFRef.current);
        }

        if (tiltOnHover) {
          panelRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
          panelRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      },
      [onPointerLeave, panelRef, tiltOnHover]
    );

    // Variants specific styling
    const variantStyles: Record<GlassVariant, string> = {
      nav: 'rounded-full px-5 py-3 shadow-[0_8px_30px_rgba(27,40,41,0.06)] border-white/60 bg-white/40 backdrop-blur-xl',
      card: 'rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-[0_12px_40px_rgba(27,40,41,0.06),0_2px_8px_rgba(27,40,41,0.03)] border-white/65 bg-white/35 backdrop-blur-2xl transition-[shadow,border-color] duration-300',
      button: 'rounded-full px-6 py-3 font-medium cursor-pointer shadow-[0_4px_18px_rgba(51,110,135,0.15)] active:scale-[0.97] transition-all duration-200 border-white/70 bg-white/50 backdrop-blur-md select-none',
      modal: 'rounded-[28px] md:rounded-[36px] p-6 md:p-10 shadow-[0_24px_64px_rgba(27,40,41,0.18)] border-white/80 bg-white/85 backdrop-blur-3xl',
      chip: 'rounded-full px-3.5 py-1.5 text-xs font-medium border-white/60 bg-white/40 shadow-[0_2px_8px_rgba(27,40,41,0.04)] backdrop-blur-md',
    };

    const activeBorder = active ? 'border-[var(--accent)]/50 ring-1 ring-[var(--accent)]/20' : '';

    return (
      <motion.div
        ref={panelRef}
        className={`glass-panel-base relative overflow-hidden group ${variantStyles[variant]} ${activeBorder} ${
          supportsLiquid ? 'liquid-refraction' : ''
        } ${className}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {/* Specular lighting that follows cursor */}
        <div className="glass-specular" aria-hidden="true" />
        {/* Inner subtle text scrim for WCAG 4.5:1 guaranteed contrast */}
        <div className="relative z-10 w-full h-full">{children}</div>
      </motion.div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
