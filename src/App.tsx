import React, { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { LiquidGlassFilter } from '@/components/glass/LiquidGlassFilter';
import { Navbar } from '@/components/sections/Navbar';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionTopFade } from '@/components/ui/SectionTopFade';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { WhyNow } from '@/components/sections/WhyNow';
import { Solution } from '@/components/sections/Solution';
import { ProductMvp } from '@/components/sections/ProductMvp';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { TrustAndTech } from '@/components/sections/TrustAndTech';
import { Market } from '@/components/sections/Market';
import { Comparison } from '@/components/sections/Comparison';
import { BusinessModel } from '@/components/sections/BusinessModel';
import { Roadmap } from '@/components/sections/Roadmap';
import { Moat } from '@/components/sections/Moat';
import { RisksAndMitigants } from '@/components/sections/RisksAndMitigants';
import { Team } from '@/components/sections/Team';
import { Waitlist } from '@/components/sections/Waitlist';
import { Footer } from '@/components/sections/Footer';
import { TalkModal } from '@/components/ui/TalkModal';

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll
  useLenis();

  // Readiness values passed from Hero quick-action bar to Waitlist form
  const [readinessPrefill, setReadinessPrefill] = useState({
    from: 'IND',
    to: 'UAE',
    persona: 'traveler',
  });

  // Investor / Partner dialog state
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);

  const handleCheckReadiness = (from: string, to: string, persona: string) => {
    setReadinessPrefill({ from, to, persona });
  };

  return (
    <div className="relative min-h-screen bg-transparent text-[var(--ink)]">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] px-4 py-2 bg-[var(--brand)] text-white rounded-full font-semibold text-sm shadow-xl focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Liquid glass SVG filter definition */}
      <LiquidGlassFilter />

      {/* Drifting ambient orbs & subtle noise texture */}
      <AmbientBackground />

      {/* Floating Glass Navbar (persistent motion morph between Pill and Left Rail) */}
      <Navbar onOpenTalkModal={() => setIsTalkModalOpen(true)} />

      {/* Main Content Landmark - full-bleed, zero wrapper padding */}
      <main id="main-content" className="w-full">
        {/* ======================================================== */}
        {/* HERO SECTION (#home)                                     */}
        {/* ======================================================== */}
        <Hero onCheckReadiness={handleCheckReadiness} />

        {/* ======================================================== */}
        {/* 01 WHY IT MATTERS (#why): Problem + Why Now              */}
        {/* ======================================================== */}
        <section
          id="why"
          data-theme="why"
          className="relative pt-[80px] md:pt-[104px] pb-10 md:pb-14 transition-colors duration-500 overflow-hidden"
        >
          <SectionTopFade from="home" to="why" desktopHeight={80} mobileHeight={56} />
          <div className="page-container relative z-10">
            <PageHeader
              pageNumber="01"
              kicker="01 / WHY IT MATTERS"
              title="The Medical Fragmentation Gap"
              subtitle="Healthcare records stop at national borders and institutional firewalls, leaving emergency responders blind when seconds matter most."
              tone="light"
            />
            <Problem />
            <WhyNow />
          </div>
        </section>

        {/* ======================================================== */}
        {/* 02 SOLUTION (#solution): Solution layers + Product/MVP    */}
        {/* ======================================================== */}
        <section
          id="solution"
          data-theme="solution"
          className="relative pt-[80px] md:pt-[104px] pb-10 md:pb-14 transition-colors duration-500 overflow-hidden"
        >
          <SectionTopFade from="why" to="solution" desktopHeight={80} mobileHeight={56} />
          <div className="page-container relative z-10">
            <PageHeader
              pageNumber="02"
              kicker="02 / THE SOLUTION LAYER"
              title="The Sovereign Continuity Layer"
              subtitle="A federated edge-first architecture that bridges sovereign health systems without centralizing or commodifying patient records."
              tone="light"
            />
            <Solution />
            <ProductMvp />
          </div>
        </section>

        {/* ======================================================== */}
        {/* 03 HOW IT WORKS (#how): 6-step emergency flow + liability */}
        {/* ======================================================== */}
        <section
          id="how"
          data-theme="how"
          className="relative pt-[124px] md:pt-[184px] pb-10 md:pb-14 transition-colors duration-500 overflow-hidden"
        >
          <SectionTopFade from="solution" to="how" desktopHeight={160} mobileHeight={100} />
          <div className="page-container relative z-10">
            <PageHeader
              pageNumber="03"
              kicker="03 / EMERGENCY WORKFLOW"
              title="6-Step Emergency Response Lifecycle"
              subtitle="Zero-delay clinical handover with immutable liability boundaries and cryptographic verification across jurisdictions."
              tone="dark"
            />
            <HowItWorks />
          </div>
        </section>

        {/* ======================================================== */}
        {/* 04 TRUST & TECH (#trust): federated architecture + chips  */}
        {/* ======================================================== */}
        <section
          id="trust"
          data-theme="trust"
          className="relative pt-[96px] md:pt-[124px] pb-10 md:pb-14 transition-colors duration-500 overflow-hidden"
        >
          <SectionTopFade from="how" to="trust" desktopHeight={100} mobileHeight={72} />
          <div className="page-container relative z-10">
            <PageHeader
              pageNumber="04"
              kicker="04 / TRUST & FEDERATED TECH"
              title="Zero-Knowledge Sovereign Federated Architecture"
              subtitle="Data stays sovereign in the patient's home jurisdiction. Only cryptographically authorized context leaves, satisfying HIPAA, GDPR, ABDM, and NABIDH."
              tone="dark"
            />
            <TrustAndTech />
          </div>
        </section>

        {/* ======================================================== */}
        {/* 05 MARKET (#market): counters + comparison + business    */}
        {/* ======================================================== */}
        <section
          id="market"
          data-theme="market"
          className="relative pt-[124px] md:pt-[184px] pb-10 md:pb-14 transition-colors duration-500 overflow-hidden"
        >
          <SectionTopFade from="trust" to="market" desktopHeight={160} mobileHeight={100} />
          <div className="page-container relative z-10">
            <PageHeader
              pageNumber="05"
              kicker="05 / MARKET OPPORTUNITY"
              title="A $14.2B Beachhead in Global Healthcare Mobility"
              subtitle="Capturing the high-growth intersection of medical travel, expat health coverage, and high-volume sovereign travel corridors."
              tone="light"
            />
            <Market />
            <Comparison />
            <BusinessModel />
          </div>
        </section>

        {/* ======================================================== */}
        {/* 06 ROADMAP (#roadmap): roadmap/GTM + moat + risks + team */}
        {/* ======================================================== */}
        <section
          id="roadmap"
          data-theme="roadmap"
          className="relative pt-[80px] md:pt-[104px] pb-10 md:pb-14 transition-colors duration-500 overflow-hidden"
        >
          <SectionTopFade from="market" to="roadmap" desktopHeight={80} mobileHeight={56} />
          <div className="page-container relative z-10">
            <PageHeader
              pageNumber="06"
              kicker="06 / ROADMAP & GOVERNANCE"
              title="Execution Phasing, Defensible Moat & Team"
              subtitle="From the India-UAE pilot corridor to global healthcare continuity standard, backed by top clinical and institutional advisory."
              tone="light"
            />
            <Roadmap />
            <Moat />
            <RisksAndMitigants />
            <Team />
          </div>
        </section>

        {/* ======================================================== */}
        {/* JOIN THE PILOT (#waitlist) + FOOTER                      */}
        {/* ======================================================== */}
        <div className="relative w-full">
          <Waitlist
            initialFromCountry={readinessPrefill.from}
            initialToCountry={readinessPrefill.to}
            initialPersona={readinessPrefill.persona}
            onOpenTalkModal={() => setIsTalkModalOpen(true)}
          />
          <Footer />
        </div>
      </main>

      {/* Investor & Partner Modal */}
      <TalkModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
      />
    </div>
  );
};

export default App;
