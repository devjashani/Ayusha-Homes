export type MaskType = 'radial' | 'fade-left' | 'fade-right' | 'fade-bottom' | 'fade-top' | 'none';
export type BlendMode = 'normal' | 'multiply' | 'screen' | 'soft-light';

export interface ImageTuneConfig {
  opacity: number;
  blend?: BlendMode;
  mask?: MaskType;
  dualMask?: string;
  parallax?: number;
  float?: boolean;
  hideBelow?: number;
}

export const imageTuning: Record<string, ImageTuneConfig> = {
  heroBgLight: {
    opacity: 1,
  },
  heroBgDark: {
    opacity: 0.85,
  },
  heroPassport: {
    opacity: 0.55,
    blend: 'multiply',
    mask: 'radial',
    parallax: 18,
    float: true,
    hideBelow: 1024,
  },
  problemBorder: {
    opacity: 0.38,
    blend: 'normal',
    mask: 'radial',
    dualMask: 'linear-gradient(to right, transparent 0%, #000 38%), linear-gradient(to bottom, #000 55%, transparent 100%)',
    parallax: 14,
    hideBelow: 1024,
  },
  howPhone: {
    opacity: 0.62,
    blend: 'screen',
    mask: 'radial',
    dualMask:
      'radial-gradient(ellipse 70% 70% at 55% 50%, #000 40%, transparent 100%), linear-gradient(to right, transparent 0%, #000 30%, #000 85%, transparent 100%)',
    parallax: 20,
    float: true,
    hideBelow: 1024,
  },
  trustNetwork: {
    opacity: 0.42,
    blend: 'screen',
    mask: 'radial',
    parallax: 16,
    hideBelow: 1024,
  },
  roadmapPath: {
    opacity: 0.5,
    blend: 'normal',
    mask: 'fade-bottom',
    dualMask: 'linear-gradient(to bottom, #000 55%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)',
    parallax: 12,
    hideBelow: 1024,
  },
  waitlistBg: {
    opacity: 0.4,
  },
};
