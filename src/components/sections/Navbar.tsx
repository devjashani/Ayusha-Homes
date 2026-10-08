import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenTalkModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTalkModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { scrollY, scrollYProgress } = useScroll();
  const navIds = CONTENT.nav.map((item) => item.href);
  const activeNav = useScrollSpy(navIds);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastScrollY;
    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide when scrolling down fast past 180px, reveal when scrolling up
    if (latest > 180 && diff > 8) {
      setIsVisible(false);
    } else if (diff < -6) {
      setIsVisible(true);
    }

    setLastScrollY(latest);
  });

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 90;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center transition-transform duration-300 px-4 md:px-6 pt-3 md:pt-4 pointer-events-none ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          <GlassPanel
            variant="nav"
            liquidRefraction={true}
            className={`pointer-events-auto flex items-center justify-between transition-all duration-300 w-full ${
              isScrolled
                ? 'py-2.5 px-4 md:px-6 shadow-[0_12px_36px_rgba(21,32,43,0.12)] bg-white/70'
                : 'py-3.5 px-5 md:px-8 bg-white/45'
            }`}
          >
            {/* Brand Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group select-none outline-none"
              aria-label="AYUSHA Home"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E6FA8] to-[#4FA8E0] flex items-center justify-center text-white font-bold text-lg shadow-[0_2px_10px_rgba(30,111,168,0.25)] group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-semibold tracking-tight text-lg text-[#15202B] leading-none font-sans">
                  {CONTENT.brand.name}
                </span>
                <span className="text-[10px] text-[#5B6B76] font-medium tracking-wide uppercase mt-0.5">
                  Continuity Layer
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
              {CONTENT.nav.map((item) => {
                const isActive = activeNav === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative px-3.5 py-1.5 text-sm font-medium text-[#15202B]/85 hover:text-[#1E6FA8] transition-colors rounded-full"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLozenge"
                        className="absolute inset-0 bg-[#1E6FA8]/10 rounded-full border border-[#1E6FA8]/20 shadow-sm"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2.5">
              <a
                href="#waitlist"
                onClick={(e) => handleNavClick(e, '#waitlist')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 md:px-5 py-2 text-xs md:text-sm font-semibold rounded-full bg-[#1E6FA8] text-white shadow-[0_4px_16px_rgba(30,111,168,0.25)] hover:bg-[#185986] active:scale-95 transition-all duration-200"
              >
                <span>Join the pilot</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* Mobile hamburger button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-[#15202B] hover:bg-black/5 transition-colors focus:ring-2 focus:ring-[#1E6FA8]"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </GlassPanel>

          {/* Thin scroll-linked progress bar */}
          <div className="w-[94%] max-w-5xl h-[2.5px] bg-transparent overflow-hidden rounded-full mt-1.5 opacity-80 pointer-events-none">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1E6FA8] via-[#4FA8E0] to-[#6FC7C9] origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Glass overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#15202B]/40 backdrop-blur-md md:hidden flex flex-col justify-end p-4 pb-8"
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
              <GlassPanel
                variant="modal"
                className="w-full flex flex-col gap-4 p-6 shadow-2xl border-white/80 bg-white/90"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#D8E2E7]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#1E6FA8]" />
                    <span className="font-semibold text-sm text-[#15202B]">
                      {CONTENT.brand.name} Menu
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full text-[#5B6B76] hover:bg-black/5"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5 py-2">
                  {CONTENT.nav.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="px-4 py-3 rounded-xl text-base font-medium text-[#15202B] hover:bg-[#1E6FA8]/10 hover:text-[#1E6FA8] transition-colors"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#D8E2E7] flex flex-col gap-2.5">
                  <a
                    href="#waitlist"
                    onClick={(e) => handleNavClick(e, '#waitlist')}
                    className="w-full text-center py-3 px-5 rounded-full font-semibold text-sm bg-[#1E6FA8] text-white shadow-md active:scale-95 transition-all"
                  >
                    Join the Pilot Corridor
                  </a>
                  {onOpenTalkModal && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenTalkModal();
                      }}
                      className="w-full text-center py-2.5 px-5 rounded-full font-medium text-xs text-[#5B6B76] hover:text-[#15202B] hover:bg-black/5 transition-all"
                    >
                      Investor & Partner Inquiries
                    </button>
                  )}
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
