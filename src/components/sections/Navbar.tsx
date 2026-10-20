import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTENT } from '@/data/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import {
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  Layers,
  Activity,
  TrendingUp,
  Compass,
} from 'lucide-react';

interface NavbarProps {
  onOpenTalkModal?: () => void;
}

export const NAV_ITEMS = [
  { id: 'why', number: '01', label: 'Why it matters', href: '#why', icon: AlertCircle },
  { id: 'solution', number: '02', label: 'Solution', href: '#solution', icon: Layers },
  { id: 'how', number: '03', label: 'How it works', href: '#how', icon: Activity },
  { id: 'trust', number: '04', label: 'Trust & Tech', href: '#trust', icon: ShieldCheck },
  { id: 'market', number: '05', label: 'Market', href: '#market', icon: TrendingUp },
  { id: 'roadmap', number: '06', label: 'Roadmap', href: '#roadmap', icon: Compass },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenTalkModal }) => {
  const { activeSection, pageProgress, scrollToSection } = useActiveSection();
  const [navMode, setNavMode] = useState<'pill' | 'rail'>('pill');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRailHovered, setIsRailHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Hysteresis scroll detection:
  // Switch to "rail" when hero's bottom edge passes 35% of the viewport height.
  // Switch back to "pill" only when it returns above 55%.
  useEffect(() => {
    const handleScrollHysteresis = () => {
      const hero = document.getElementById('home');
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.bottom < vh * 0.35) {
        setNavMode((prev) => (prev !== 'rail' ? 'rail' : prev));
      } else if (rect.bottom > vh * 0.55) {
        setNavMode((prev) => (prev !== 'pill' ? 'pill' : prev));
      }
    };

    window.addEventListener('scroll', handleScrollHysteresis, { passive: true });
    window.addEventListener('resize', handleScrollHysteresis, { passive: true });
    handleScrollHysteresis();

    return () => {
      window.removeEventListener('scroll', handleScrollHysteresis);
      window.removeEventListener('resize', handleScrollHysteresis);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Close menu on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  // Find active item info for floating mobile chip
  const currentNavItem = NAV_ITEMS.find((item) => item.id === activeSection);
  const mobileChipText = currentNavItem
    ? `${currentNavItem.number} · ${currentNavItem.label}`
    : activeSection === 'waitlist'
    ? 'Join the pilot'
    : 'Ayusha';

  const springTransition = isReducedMotion
    ? { duration: 0.2 }
    : { type: 'spring' as const, stiffness: 170, damping: 24, mass: 0.9 };

  return (
    <>
      {/* ============================================================ */}
      {/* 1. MOBILE TOP PROGRESS LINE (< 1024px)                       */}
      {/* ============================================================ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[2.5px] z-50 overflow-hidden pointer-events-none">
        <div
          className="h-full bg-[var(--accent)] origin-left transition-all duration-200"
          style={{ width: `${Math.round(pageProgress * 100)}%` }}
        />
      </div>

      {/* ============================================================ */}
      {/* 2. MOBILE TOP GLASS BAR (< 1024px)                          */}
      {/* ============================================================ */}
      <div className="lg:hidden fixed top-3 left-4 right-4 z-40">
        <div className="w-full h-14 px-4 flex items-center justify-between rounded-full backdrop-blur-xl shadow-[0_8px_24px_rgba(27,40,41,0.08)] bg-white/75 border border-white/80">
          {/* Logo on Left */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-2 group select-none outline-none"
            aria-label="AYUSHA Home"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-soft)] flex items-center justify-center text-white font-bold text-sm shadow-xs">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-sm text-[var(--ink)] leading-none">
                AYUSHA
              </span>
              <span className="text-[9px] text-[var(--muted)] font-medium tracking-wider uppercase mt-0.5">
                Continuity Layer
              </span>
            </div>
          </a>

          {/* Right Controls: CTA button (on sm:) + Hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="#waitlist"
              onClick={(e) => handleNavClick(e, 'waitlist')}
              className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white shadow-xs"
            >
              <span>Join pilot</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[var(--ink)] hover:bg-black/5 transition-colors focus:ring-2 focus:ring-[var(--accent)]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MOBILE FLOATING GLASS CHIP (< 1024px, when past hero)    */}
      {/* ============================================================ */}
      <AnimatePresence>
        {navMode === 'rail' && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed top-[74px] left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          >
            <div className="px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xl shadow-md border border-white/70 bg-white/85 text-[var(--ink)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={mobileChipText}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium text-[11px]"
                >
                  {mobileChipText}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 4. DESKTOP >= 1024px: SINGLE PERSISTENT MORPHING NAVIGATION  */}
      {/* ============================================================ */}
      <div
        className={`hidden lg:flex fixed inset-0 z-50 pointer-events-none transition-[padding] duration-0 ${
          navMode === 'pill'
            ? 'items-start justify-center pt-5'
            : 'items-center justify-start pl-5'
        }`}
      >
        <motion.nav
          layout
          transition={springTransition}
          onMouseEnter={() => {
            if (navMode === 'rail') setIsRailHovered(true);
          }}
          onMouseLeave={() => {
            if (navMode === 'rail') setIsRailHovered(false);
          }}
          onFocus={() => {
            if (navMode === 'rail') setIsRailHovered(true);
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsRailHovered(false);
            }
          }}
          className={`pointer-events-auto relative select-none ${
            navMode === 'pill'
              ? 'grid grid-cols-[auto_1fr_auto] items-center gap-6 h-[68px] px-4'
              : 'flex flex-col items-center py-4 px-2.5 gap-2'
          }`}
          style={{
            width:
              navMode === 'pill'
                ? 'min(1200px, calc(100vw - 48px))'
                : isRailHovered
                ? '220px'
                : '72px',
            borderRadius: navMode === 'pill' ? 9999 : 36,
            transition: isReducedMotion
              ? 'opacity 0.2s'
              : 'width 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          aria-label="Ayusha Global Navigation"
        >
          {/* Glass blur / border background child with overflow-hidden (Pill container has NO overflow-hidden) */}
          <div
            className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none transition-all duration-600"
            style={{
              background:
                navMode === 'pill'
                  ? 'rgba(255, 255, 255, 0.78)'
                  : 'rgba(15, 30, 46, 0.72)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:
                navMode === 'pill'
                  ? '1px solid rgba(255, 255, 255, 0.85)'
                  : '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow:
                navMode === 'pill'
                  ? '0 12px 36px rgba(21, 32, 43, 0.08), 0 2px 6px rgba(21, 32, 43, 0.04)'
                  : '0 20px 50px rgba(0, 0, 0, 0.45), 0 0 24px rgba(79, 168, 224, 0.15)',
            }}
          />

          {/* -------------------------------------------------------- */}
          {/* LEFT CELL (Pill) / TOP CELL (Rail): Logo + Wordmark      */}
          {/* -------------------------------------------------------- */}
          <motion.div
            layout="position"
            className={`relative z-10 flex items-center shrink-0 ${
              navMode === 'pill'
                ? 'gap-3 whitespace-nowrap'
                : 'flex-col gap-1 w-full justify-center mb-1'
            }`}
          >
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-3 group select-none outline-none"
              aria-label="AYUSHA Home"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--brand-soft)] flex items-center justify-center text-white font-bold text-base shadow-[0_2px_10px_rgba(51,110,135,0.25)] group-hover:scale-105 transition-transform shrink-0">
                A
              </div>
              {navMode === 'pill' ? (
                <div className="flex flex-col">
                  <span className="font-semibold tracking-tight text-[18px] text-[var(--ink)] leading-none font-sans">
                    {CONTENT.brand.name}
                  </span>
                  <span className="text-[10px] text-[var(--muted)] font-medium tracking-[0.14em] uppercase mt-0.5 whitespace-nowrap hidden min-[1100px]:block">
                    Continuity Layer
                  </span>
                </div>
              ) : (
                isRailHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs font-semibold text-[var(--on-dark)] whitespace-nowrap"
                  >
                    {CONTENT.brand.name}
                  </motion.span>
                )
              )}
            </a>
          </motion.div>

          {/* -------------------------------------------------------- */}
          {/* CENTER CELL (Pill) / MIDDLE CELL (Rail): Nav Links       */}
          {/* -------------------------------------------------------- */}
          {navMode === 'rail' && (
            <div
              className="w-[2px] h-8 rounded-full overflow-hidden my-1 bg-white/15 shrink-0"
              aria-hidden="true"
            >
              <div
                className="w-full bg-[var(--accent)] origin-top transition-all duration-150"
                style={{ height: `${Math.round(pageProgress * 100)}%` }}
              />
            </div>
          )}

          <motion.ul
            layout="position"
            className={`relative z-10 list-none m-0 p-0 flex ${
              navMode === 'pill'
                ? 'flex-nowrap items-center justify-center gap-1'
                : 'flex-col items-start gap-1 w-full px-1'
            }`}
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              if (navMode === 'pill') {
                return (
                  <li key={item.id} className="inline-flex">
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`relative px-3 min-[1100px]:px-4 py-2 text-sm leading-none whitespace-nowrap rounded-full font-medium transition-colors outline-none ${
                        isActive
                          ? 'text-[var(--accent-text)] font-semibold'
                          : 'text-[var(--ink)]/85 hover:text-[var(--accent-text)]'
                      }`}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavLozenge"
                          className="absolute inset-0 bg-[var(--accent)]/10 rounded-full border border-[var(--accent)]/20 shadow-xs"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  </li>
                );
              }

              // Rail Mode Item
              return (
                <li key={item.id} className="w-full">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`relative flex items-center h-10 rounded-xl px-2.5 transition-all duration-200 outline-none w-full ${
                      isActive ? 'font-semibold text-[var(--on-dark)]' : 'text-[var(--on-dark-muted)]/75 hover:text-[var(--on-dark)]'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLozenge"
                        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
                        transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                      >
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundColor: 'var(--accent)',
                            opacity: 0.18,
                          }}
                        />
                        <div className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[var(--accent)] rounded-r" />
                      </motion.div>
                    )}

                    <div className="flex items-center gap-2.5 shrink-0 relative z-10">
                      <span
                        className={`font-mono text-[11px] font-bold w-5 text-center ${
                          isActive ? 'text-[var(--accent)]' : 'text-[var(--on-dark-muted)]/60'
                        }`}
                      >
                        {item.number}
                      </span>
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive ? 'text-[var(--accent)] scale-110' : ''
                        }`}
                      />
                    </div>

                    <span
                      className={`ml-3 text-xs whitespace-nowrap overflow-hidden transition-all duration-300 relative z-10 ${
                        isRailHovered
                          ? 'opacity-100 max-w-[130px]'
                          : 'opacity-0 max-w-0 pointer-events-none'
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </motion.ul>

          {/* -------------------------------------------------------- */}
          {/* RIGHT CELL (Pill) / BOTTOM CELL (Rail): Join Button      */}
          {/* -------------------------------------------------------- */}
          <motion.div
            layout="position"
            className={`relative z-10 shrink-0 flex items-center ${
              navMode === 'pill'
                ? ''
                : 'mt-2 pt-2 border-t border-white/10 w-full justify-center'
            }`}
          >
            <a
              href="#waitlist"
              onClick={(e) => handleNavClick(e, 'waitlist')}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-semibold shadow-sm transition-all outline-none active:scale-95 ${
                navMode === 'pill'
                  ? 'h-11 px-5 text-sm gap-2'
                  : isRailHovered
                  ? 'w-full h-11 px-4 text-xs gap-2'
                  : 'w-11 h-11 p-0'
              }`}
              title="Join the pilot"
              aria-label="Join the pilot"
            >
              {navMode === 'pill' ? (
                <>
                  <span>Join the pilot</span>
                  <ArrowUpRight className="w-4 h-4 opacity-90" />
                </>
              ) : (
                <>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                  {isRailHovered && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-xs font-semibold whitespace-nowrap overflow-hidden"
                    >
                      Join pilot
                    </motion.span>
                  )}
                </>
              )}
            </a>
          </motion.div>
        </motion.nav>
      </div>

      {/* ============================================================ */}
      {/* 5. MOBILE DRAWER (Glass modal overlay)                      */}
      {/* ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[var(--ink)]/40 backdrop-blur-md lg:hidden flex flex-col justify-end p-4 pb-8"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: 80, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 60, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full flex flex-col gap-4 p-6 shadow-2xl rounded-3xl border border-white/80 bg-white/95">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[var(--brand)]" />
                    <span className="font-semibold text-sm text-[var(--ink)]">
                      {CONTENT.brand.name} Menu
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full text-[var(--muted)] hover:bg-black/5"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5 py-2">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;
                    return (
                      <motion.a
                        key={item.id}
                        href={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-[var(--accent)]/15 text-[var(--accent-text)] font-semibold'
                            : 'text-[var(--ink)] hover:bg-black/5'
                        }`}
                      >
                        <span className="font-mono text-xs font-bold text-[var(--muted)]">
                          {item.number}
                        </span>
                        <Icon className="w-4 h-4 text-[var(--brand)]" />
                        <span>{item.label}</span>
                      </motion.a>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-[var(--line)] flex flex-col gap-2.5">
                  <a
                    href="#waitlist"
                    onClick={(e) => handleNavClick(e, '#waitlist')}
                    className="w-full text-center py-3 px-5 rounded-full font-semibold text-sm bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Join the Pilot Corridor</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  {onOpenTalkModal && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenTalkModal();
                      }}
                      className="w-full text-center py-2.5 px-5 rounded-full font-medium text-xs text-[var(--muted)] hover:text-[var(--ink)] hover:bg-black/5 transition-all"
                    >
                      Investor & Partner Inquiries
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
