import React from 'react';

export const LiquidGlassFilter: React.FC = () => {
  return (
    <svg
      className="sr-only"
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id="liquid-glass" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.028 0.028"
            numOctaves="2"
            result="liquidNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="liquidNoise"
            scale="4.5"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.3" result="smoothed" />
        </filter>
      </defs>
    </svg>
  );
};
