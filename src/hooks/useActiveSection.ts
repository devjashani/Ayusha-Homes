import { useState, useEffect } from 'react';
import { THEMES, SectionTheme } from '@/styles/themes';

const SECTIONS = ['home', 'why', 'solution', 'how', 'trust', 'market', 'roadmap', 'waitlist'];

export interface ActiveSectionData {
  activeSection: string;
  activeTheme: SectionTheme;
  pageProgress: number;
  isHero: boolean;
  scrollToSection: (id: string) => void;
}

export function useActiveSection(): ActiveSectionData {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [pageProgress, setPageProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const vhCenter = window.innerHeight / 2;
      let foundSection = 'home';
      let progress = 0;

      for (const secId of SECTIONS) {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= vhCenter && rect.bottom > vhCenter) {
            foundSection = secId;
            progress = (vhCenter - rect.top) / Math.max(1, rect.height);
            break;
          }
        }
      }

      // Edge case 1: Top of page (within hero)
      if (window.scrollY < 80) {
        foundSection = 'home';
        const homeEl = document.getElementById('home');
        const homeH = homeEl ? homeEl.offsetHeight : window.innerHeight;
        progress = Math.max(0, Math.min(1, window.scrollY / Math.max(1, homeH)));
      } else {
        // Edge case 2: Scrolled into waitlist / footer
        const waitlistEl = document.getElementById('waitlist');
        if (waitlistEl) {
          const rect = waitlistEl.getBoundingClientRect();
          if (rect.top <= vhCenter) {
            foundSection = 'waitlist';
            progress = (vhCenter - rect.top) / Math.max(1, rect.height);
          }
        }
      }

      setActiveSection(foundSection);
      setPageProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const cleanId = id.replace('#', '');
    const target = document.getElementById(cleanId);
    if (target) {
      const winWithLenis = window as unknown as {
        lenis?: { scrollTo: (target: HTMLElement | string, options?: unknown) => void };
      };
      if (winWithLenis.lenis) {
        winWithLenis.lenis.scrollTo(target, {
          duration: 0.9,
          offset: 0,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    }
  };

  const activeTheme = THEMES[activeSection] || THEMES.home;
  const isHero = activeSection === 'home';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-active-section', activeSection);
      document.documentElement.setAttribute('data-active-tone', activeTheme.tone);
      document.documentElement.style.setProperty('--accent', activeTheme.accent);
    }
  }, [activeSection, activeTheme]);

  return {
    activeSection,
    activeTheme,
    pageProgress,
    isHero,
    scrollToSection,
  };
}
