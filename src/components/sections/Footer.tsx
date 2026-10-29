import React from 'react';
import { CONTENT } from '@/data/content';
import { ArrowUp, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if ((window as unknown as { lenis?: { scrollTo: (target: number) => void } }).lenis) {
      (window as unknown as { lenis: { scrollTo: (target: number) => void } }).lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-80 bg-[var(--ink)] text-[var(--on-dark)] rounded-t-[2rem] -mt-8 pt-16 md:pt-20 pb-16 overflow-hidden border-t border-white/10">
      <div className="shell relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-[var(--ink)] font-bold text-sm shadow-sm">
                A
              </div>
              <span className="font-semibold text-2xl tracking-tight text-white">
                {CONTENT.brand.name}
              </span>
            </div>
            <p className="text-lg text-[var(--on-dark)] italic mb-3">
              "{CONTENT.brand.tagline}"
            </p>
            <p className="text-xs text-[var(--on-dark-muted)] max-w-md leading-relaxed mb-4">
              {CONTENT.brand.pillarsMotto}
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-[var(--on-dark)] border border-white/15">
                {CONTENT.footer.confidentiality}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-[var(--accent-soft)] border border-white/15">
                Founder: {CONTENT.team.founder.name}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--on-dark-muted)] mb-4 font-mono">
              Platform Overview
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--on-dark-muted)]">
              {CONTENT.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[var(--on-dark-muted)] hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#waitlist" className="text-[var(--on-dark-muted)] hover:text-white transition-colors">
                  Pilot Waitlist
                </a>
              </li>
            </ul>
          </div>

          {/* Safety & Jurisdiction */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--on-dark-muted)] mb-4 font-mono">
              Governance
            </h4>
            <ul className="space-y-2 text-xs text-[var(--on-dark-muted)]">
              <li>Federated Zero-Warehouse Architecture</li>
              <li>DPDP Act (India) Alignment</li>
              <li>GDPR Sovereign Processing</li>
              <li>HIPAA Safe Harbor Infrastructure</li>
              <li>FHIR Terminology Standard</li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal & Clinical Safety Disclaimer */}
        <div className="py-6 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center gap-4 text-xs text-[var(--on-dark-muted)]">
          <div className="p-2 rounded-lg bg-white/5 text-[var(--accent-soft)] shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <p className="leading-relaxed">
            <strong className="text-white font-semibold">Clinical Boundary Notice:</strong>{' '}
            {CONTENT.footer.disclaimer}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--on-dark-muted)]">
          <p>{CONTENT.footer.copyright}</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[var(--on-dark)] transition-all cursor-pointer"
            aria-label="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Decorative "AYUSHA" watermark at bottom */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center select-none pointer-events-none font-bold text-white/[0.04] leading-none whitespace-nowrap overflow-hidden z-0"
        style={{ fontSize: 'clamp(4rem, 18vw, 13rem)' }}
        aria-hidden="true"
      >
        AYUSHA
      </div>
    </footer>
  );
};
