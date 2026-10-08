import React from 'react';
import { CONTENT } from '@/data/content';
import { ArrowUp, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-20 pb-12 px-4 md:px-8 bg-[#15202B] text-white relative z-20 border-t border-white/10">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-14 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E6FA8] to-[#4FA8E0] flex items-center justify-center text-white font-bold text-lg shadow-md">
                A
              </div>
              <span className="font-sans font-bold text-2xl tracking-tight text-white">
                {CONTENT.brand.name}
              </span>
            </div>
            <p className="font-display text-lg text-gray-300 italic mb-4">
              "{CONTENT.brand.tagline}"
            </p>
            <p className="text-xs text-gray-400 max-w-md leading-relaxed mb-4">
              {CONTENT.brand.pillarsMotto}
            </p>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-gray-200 border border-white/15">
                {CONTENT.footer.confidentiality}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#1E6FA8]/30 text-[#4FA8E0] border border-[#4FA8E0]/30">
                Founder: {CONTENT.team.founder.name}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Platform Overview
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              {CONTENT.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-[#4FA8E0] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#waitlist" className="hover:text-[#4FA8E0] transition-colors">
                  Pilot Waitlist
                </a>
              </li>
            </ul>
          </div>

          {/* Safety & Jurisdiction */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Governance
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>Federated Zero-Warehouse Architecture</li>
              <li>DPDP Act (India) Alignment</li>
              <li>GDPR Sovereign Processing</li>
              <li>HIPAA Safe Harbor Infrastructure</li>
              <li>FHIR Terminology Standard</li>
            </ul>
          </div>
        </div>

        {/* Mandatory Legal & Clinical Safety Disclaimer */}
        <div className="py-8 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center gap-4 text-xs text-gray-400">
          <div className="p-2 rounded-lg bg-white/5 text-amber-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <p className="leading-relaxed">
            <strong className="text-gray-200 font-semibold">Clinical Boundary Notice:</strong>{' '}
            {CONTENT.footer.disclaimer}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>{CONTENT.footer.copyright}</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
