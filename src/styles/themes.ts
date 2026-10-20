export type Tone = 'light' | 'dark';

export interface SectionTheme {
  id: string;
  number?: string;
  name: string;
  kicker: string;
  bgGradient: string;
  bgColor: string;
  bgFrom: string;
  bgTo: string;
  accent: string;
  accentText: string;
  accentGradient?: string;
  tone: Tone;
}

export const PALETTE = {
  skyBlue: '#4391C6',
  softAzure: '#63A4CE',
  deepLake: '#336E87',
  turquoiseTeal: '#549A98',
  sageGreen: '#7EA294',
  graniteGrey: '#B5BEBA',
  charcoalSlate: '#344546',
} as const;

export const GLOBAL_TOKENS = {
  ink: '#1B2829',
  muted: '#4F6264',
  line: 'rgba(52, 69, 70, 0.14)',
  onDark: '#EEF3F2',
  onDarkMuted: '#B5BEBA',
  brand: '#336E87',
  brandHover: '#2D6177',
  brandSoft: '#4391C6',
} as const;

export const THEMES: Record<string, SectionTheme> = {
  home: {
    id: 'home',
    name: 'Hero',
    kicker: 'CONTINUITY LAYER',
    bgGradient: 'linear-gradient(180deg, #ECF4F9 0%, #D0E4F0 100%)',
    bgColor: '#ECF4F9',
    bgFrom: '#ECF4F9',
    bgTo: '#D0E4F0',
    accent: '#4391C6',
    accentText: 'color-mix(in oklab, #4391C6 70%, #0F1A1B)',
    accentGradient: 'linear-gradient(135deg, #4391C6 0%, #63A4CE 100%)',
    tone: 'light',
  },
  why: {
    id: 'why',
    number: '01',
    name: 'Why it matters',
    kicker: '01 / WHY IT MATTERS',
    bgGradient: 'linear-gradient(180deg, #F4F6F5 0%, #E6EAE8 100%)',
    bgColor: '#F4F6F5',
    bgFrom: '#F4F6F5',
    bgTo: '#E6EAE8',
    accent: '#336E87',
    accentText: 'color-mix(in oklab, #336E87 70%, #0F1A1B)',
    accentGradient: 'linear-gradient(135deg, #336E87 0%, #4391C6 100%)',
    tone: 'light',
  },
  solution: {
    id: 'solution',
    number: '02',
    name: 'Solution',
    kicker: '02 / ARCHITECTURE & PRODUCT',
    bgGradient: 'linear-gradient(180deg, #EEF4F1 0%, #DCE8E3 100%)',
    bgColor: '#EEF4F1',
    bgFrom: '#EEF4F1',
    bgTo: '#DCE8E3',
    accent: '#549A98',
    accentText: 'color-mix(in oklab, #549A98 70%, #0F1A1B)',
    accentGradient: 'linear-gradient(135deg, #549A98 0%, #7EA294 100%)',
    tone: 'light',
  },
  how: {
    id: 'how',
    number: '03',
    name: 'How it works',
    kicker: '03 / EMERGENCY WORKFLOW',
    bgGradient: 'linear-gradient(180deg, #1F292A 0%, #263538 100%)',
    bgColor: '#1F292A',
    bgFrom: '#1F292A',
    bgTo: '#263538',
    accent: '#63A4CE',
    accentText: '#63A4CE',
    accentGradient: 'linear-gradient(135deg, #63A4CE 0%, #4391C6 100%)',
    tone: 'dark',
  },
  trust: {
    id: 'trust',
    number: '04',
    name: 'Trust & Tech',
    kicker: '04 / FEDERATED & COMPLIANT',
    bgGradient: 'linear-gradient(180deg, #1A3744 0%, #1F4251 100%)',
    bgColor: '#1A3744',
    bgFrom: '#1A3744',
    bgTo: '#1F4251',
    accent: '#7EA294',
    accentText: '#7EA294',
    accentGradient: 'linear-gradient(135deg, #7EA294 0%, #549A98 100%)',
    tone: 'dark',
  },
  market: {
    id: 'market',
    number: '05',
    name: 'Market',
    kicker: '05 / MARKET & OPPORTUNITY',
    bgGradient: 'linear-gradient(180deg, #E9F3F2 0%, #D3E6E5 100%)',
    bgColor: '#E9F3F2',
    bgFrom: '#E9F3F2',
    bgTo: '#D3E6E5',
    accent: '#549A98',
    accentText: 'color-mix(in oklab, #549A98 70%, #0F1A1B)',
    accentGradient: 'linear-gradient(135deg, #549A98 0%, #4391C6 100%)',
    tone: 'light',
  },
  roadmap: {
    id: 'roadmap',
    number: '06',
    name: 'Roadmap',
    kicker: '06 / ROADMAP & TRACTION',
    bgGradient: 'linear-gradient(180deg, #DCEAF5 0%, #BFD8EB 100%)',
    bgColor: '#DCEAF5',
    bgFrom: '#DCEAF5',
    bgTo: '#BFD8EB',
    accent: '#336E87',
    accentText: 'color-mix(in oklab, #336E87 70%, #0F1A1B)',
    accentGradient: 'linear-gradient(135deg, #336E87 0%, #63A4CE 100%)',
    tone: 'light',
  },
  waitlist: {
    id: 'waitlist',
    name: 'Join the pilot',
    kicker: 'JOIN THE PILOT',
    bgGradient: 'linear-gradient(135deg, #2D6177 0%, #336E87 45%, #3E8793 100%)',
    bgColor: '#2D6177',
    bgFrom: '#2D6177',
    bgTo: '#3E8793',
    accent: '#B5BEBA',
    accentText: '#B5BEBA',
    accentGradient: 'linear-gradient(135deg, #2D6177 0%, #336E87 100%)',
    tone: 'dark',
  },
};

// Convenient alias so THEMES.hero maps to THEMES.home
THEMES.hero = THEMES.home;
