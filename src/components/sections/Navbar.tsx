import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { CONTENT } from '@/data/content';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { stopScroll, startScroll, scrollToTarget } from '@/hooks/useLenis';
import { PillButton } from '@/components/ui/PillButton';
import { LayoutGrid, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenTalkModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTalkModal }) => {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const navIds = ['#why', '#solution', '#how', '#trust', '#market', '#roadmap'];
  const activeNav = useScrollSpy(navIds);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      // Transition to fixed glass bar after 480px (scrolled into main content)
      setIsScrolledPastHero(latest > 480);
    });
  }, [scrollY]);

  const toggleMenu = (open: boolean) => {
    setMenuOpen(open);
    if (open) {
      stopScroll();
    } else {
      startScroll();
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        toggleMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    toggleMenu(false);
    scrollToTarget(href);
  };

  return (
    <>
      {/* ====================================================================
          HEADER (Absolute over hero -> Fixed soft glass bar after hero)
          ==================================================================== */}
      <header
        className={`w-full transition-all duration-300 z-50 ${
          isScrolledPastHero
            ? 'fixed top-3 left-0 right-0 px-3 sm:px-6'
            : 'absolute top-0 left-0 right-0 px-4 sm:px-8 pt-4 sm:pt-6'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-300 relative overflow-hidden ${
            isScrolledPastHero
              ? 'max-w-6xl rounded-[var(--radius-control)] bg-white/75 backdrop-blur-md border border-[var(--line)] shadow-[0_0.5rem_2rem_rgba(31,41,42,0.08)] py-2 px-3 sm:px-5'
              : 'max-w-7xl py-2 px-0'
          }`}
        >
          {/* Header Row: CSS Grid auto / 1fr / auto */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
            {/* Left: Logo Mark + AYUSHA + CONTINUITY LAYER */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group select-none outline-none shrink-0"
              aria-label="AYUSHA Home"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] flex items-center justify-center text-white font-bold text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
                A
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold tracking-tight text-lg sm:text-xl text-[var(--fg)] leading-none">
                  {CONTENT.brand.name}
                </span>
                <span className="text-[0.625rem] font-mono tracking-widest text-[var(--muted)] uppercase hidden min-[1100px]:inline-block">
                  CONTINUITY LAYER
                </span>
              </div>
            </a>

            {/* Center: Desktop Navigation Links (>=1024px) */}
            <nav
              className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 px-2"
              aria-label="Main Navigation"
            >
              {CONTENT.nav.map((item) => {
                const isActive = activeNav === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-colors duration-200 rounded-full hover-lift-link ${
                      isActive
                        ? 'text-[var(--accent)] font-semibold'
                        : 'text-[var(--muted)] hover:text-[var(--fg)]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLozenge"
                        className="absolute inset-0 bg-[var(--accent)]/12 rounded-full border border-[var(--accent)]/20 shadow-xs"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right: Join the pilot CTA + Menu Button (<1024px) */}
            <div className="flex items-center gap-2.5 justify-end shrink-0">
              <PillButton
                variant="dark"
                withArrow={true}
                href="#waitlist"
                onClick={(e) => handleNavClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, '#waitlist')}
                className="hidden sm:inline-flex text-xs py-1"
              >
                Join the pilot
              </PillButton>

              {/* Menu Button (<1024px) */}
              <button
                type="button"
                onClick={() => toggleMenu(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-white/70 hover:bg-white text-[var(--fg)] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                aria-label="Open Navigation Menu"
                aria-expanded={menuOpen}
              >
                <LayoutGrid className="w-4 h-4 text-[var(--accent)]" />
                <span className="hidden sm:inline">Menu</span>
              </button>
            </div>
          </div>

          {/* 2px accent progress line along the bottom edge showing overall scroll progress */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/5 overflow-hidden">
            <motion.div
              className="h-full bg-[var(--accent)] origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </header>

      {/* ====================================================================
          FULL-SCREEN MENU OVERLAY (<1024px & Desktop Drawer)
          ==================================================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[110] bg-[var(--ink)] text-[var(--on-dark)] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
          >
            {/* Top Bar: Logo + Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 w-full max-w-4xl mx-auto">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-from)] to-[var(--accent-to)] flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <span className="font-semibold tracking-tight text-xl text-[var(--on-dark)]">
                  {CONTENT.brand.name}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleMenu(false)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[var(--on-dark)] text-xs font-semibold transition-colors cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Large Numbered Links (01..06 + Join link) */}
            <nav className="my-auto py-8 w-full max-w-4xl mx-auto flex flex-col gap-3 sm:gap-5">
              {CONTENT.nav.map((item, index) => {
                const numStr = `0${index + 1}`;
                const isActive = activeNav === item.href;

                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.045,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group flex items-baseline gap-4 sm:gap-6 py-1.5 transition-colors"
                  >
                    <span className="font-mono text-sm sm:text-base text-[var(--on-dark-muted)] group-hover:text-[var(--accent-soft)] transition-colors">
                      {numStr}
                    </span>

                    <span
                      className={`text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight transition-colors ${
                        isActive
                          ? 'text-white border-b-2 border-[var(--accent-soft)] pb-0.5'
                          : 'text-[var(--on-dark-muted)] group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>

                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--accent-soft)] transition-all" />
                  </motion.a>
                );
              })}

              {/* Waitlist / Join Link */}
              <motion.a
                href="#waitlist"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.45,
                  delay: CONTENT.nav.length * 0.045,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={(e) => handleNavClick(e, '#waitlist')}
                className="group flex items-baseline gap-4 sm:gap-6 py-1.5 transition-colors mt-2"
              >
                <span className="font-mono text-sm sm:text-base text-[var(--accent-soft)]">
                  07
                </span>
                <span className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--accent-soft)] group-hover:text-white transition-colors">
                  Join the pilot
                </span>
                <ArrowUpRight className="w-5 h-5 text-[var(--accent-soft)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            </nav>

            {/* Bottom Footer Info inside Overlay */}
            <div className="pt-6 border-t border-white/10 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--on-dark-muted)]">
              <p>{CONTENT.brand.pillarsMotto}</p>
              {onOpenTalkModal && (
                <button
                  type="button"
                  onClick={() => {
                    toggleMenu(false);
                    onOpenTalkModal();
                  }}
                  className="text-white hover:text-[var(--accent-soft)] underline underline-offset-4 cursor-pointer"
                >
                  Investor & Partner Inquiries
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
