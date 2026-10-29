import React, { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useAdaptiveGrid } from '@/hooks/useAdaptiveGrid';
import { PageLoader } from '@/components/ui/PageLoader';
import { Navbar } from '@/components/sections/Navbar';
import { SectionHeader } from '@/components/ui/SectionHeader';
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
import { SoftImage } from '@/components/ui/SoftImage';
import { imageTuning } from '@/data/imageTuning';

export const App: React.FC = () => {
  // Mount adaptive rem grid scaling for displays > 1920px
  useAdaptiveGrid();

  // Initialize Lenis smooth scroll
  useLenis();

  // Track intro animation readiness from PageLoader
  const [introReady, setIntroReady] = useState(false);

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
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--ink)] overflow-x-hidden">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] px-4 py-2 bg-[var(--ink)] text-white rounded-full font-semibold text-sm shadow-xl focus:ring-2 focus:ring-[var(--accent)]"
      >
        Skip to main content
      </a>

      {/* Page Loader (runs once per session, 000 -> 100 tabular counter) */}
      <PageLoader onIntroReady={() => setIntroReady(true)} />

      {/* Header & Glass Navigation Bar */}
      <Navbar onOpenTalkModal={() => setIsTalkModalOpen(true)} />

      {/* Main Content Landmark */}
      <main id="main-content" className="w-full">
        {/* ======================================================== */}
        {/* HERO SECTION (#home) - Liquid Canvas Mesh                */}
        {/* ======================================================== */}
        <Hero
          introReady={introReady}
          onCheckReadiness={handleCheckReadiness}
        />

        {/* ======================================================== */}
        {/* 01 WHY IT MATTERS (#why): Problem + Why Now              */}
        {/* ======================================================== */}
        <section
          id="why"
          data-theme="why"
          style={{ '--accent': '#336E87' } as React.CSSProperties}
          className="relative z-10 rounded-t-[2rem] -mt-8 pt-20 md:pt-24 pb-20 md:pb-24 bg-[var(--bg)] overflow-hidden"
        >
          {/* Backwards-compatibility anchor for #problem */}
          <div id="problem" className="sr-only" aria-hidden="true" />

          {/* Decorative background visual */}
          <SoftImage
            src="/images/problem-border.webp"
            width={1600}
            height={900}
            opacity={imageTuning.problemBorder.opacity}
            blend={imageTuning.problemBorder.blend}
            mask={imageTuning.problemBorder.mask}
            dualMask={imageTuning.problemBorder.dualMask}
            parallax={imageTuning.problemBorder.parallax}
            hideBelow={imageTuning.problemBorder.hideBelow}
            className="top-2 right-0 w-[46%] max-w-[40rem] h-auto pointer-events-none z-0"
          />

          <div className="shell relative z-10">
            <SectionHeader
              pageNumber="01"
              kicker="01 / WHY IT MATTERS"
              title="The Medical Fragmentation Gap"
              subtitle="Healthcare records stop at national borders and institutional firewalls, leaving emergency responders blind when seconds matter most."
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
          style={{ '--accent': '#549A98' } as React.CSSProperties}
          className="relative z-20 rounded-t-[2rem] -mt-8 pt-20 md:pt-24 pb-20 md:pb-24 bg-[var(--surface)] overflow-hidden"
        >
          <div className="shell relative z-10">
            <SectionHeader
              pageNumber="02"
              kicker="02 / THE SOLUTION LAYER"
              title="The Sovereign Continuity Layer"
              subtitle="A federated edge-first architecture that bridges sovereign health systems without centralizing or commodifying patient records."
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
          style={{ '--accent': '#63A4CE' } as React.CSSProperties}
          className="relative z-30 rounded-t-[2rem] -mt-8 pt-20 md:pt-24 pb-20 md:pb-24 bg-[var(--ink)] text-[var(--on-dark)] overflow-hidden"
        >
          {/* Backwards-compatibility anchor for #how-it-works */}
          <div id="how-it-works" className="sr-only" aria-hidden="true" />

          <div className="shell relative z-10">
            {/* Header Area: Two-column row on lg (>=1024px) */}
            <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12">
              {/* Left Column (existing text block, ~58% width on lg) */}
              <div className="w-full lg:w-[58%]">
                <SectionHeader
                  pageNumber="03"
                  kicker="03 / EMERGENCY WORKFLOW"
                  title="6-Step Emergency Response Lifecycle"
                  subtitle="Zero-delay clinical handover with immutable liability boundaries and cryptographic verification across jurisdictions."
                  dark={true}
                  className="!mb-0 max-w-none"
                />
              </div>

              {/* Right Column (~42% width, self-stretch, height equals left text block, hidden < 1024px) */}
              <div
                className="hidden lg:block relative w-full lg:w-[42%] self-stretch min-h-[18rem] max-h-[24rem] [overflow:clip] pointer-events-none z-0"
                aria-hidden="true"
              >
                <SoftImage
                  src="/images/how-phone.webp"
                  width={1600}
                  height={900}
                  opacity={imageTuning.howPhone.opacity}
                  blend={imageTuning.howPhone.blend}
                  mask={imageTuning.howPhone.mask}
                  dualMask={imageTuning.howPhone.dualMask}
                  parallax={imageTuning.howPhone.parallax}
                  float={imageTuning.howPhone.float}
                  hideBelow={imageTuning.howPhone.hideBelow}
                  objectFit="contain"
                  objectPosition="right center"
                  imgClassName="-translate-y-4"
                  className="inset-0 w-full h-full pointer-events-none"
                />
              </div>
            </div>

            {/* Stepper: In its own row BELOW the header row with normal flow spacing (margin-top 3rem) */}
            <div className="relative z-10 mt-12">
              <HowItWorks />
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 04 TRUST & TECH (#trust): federated architecture + chips  */}
        {/* ======================================================== */}
        <section
          id="trust"
          data-theme="trust"
          style={{ '--accent': '#7EA294' } as React.CSSProperties}
          className="relative z-40 rounded-t-[2rem] -mt-8 pt-20 md:pt-24 pb-20 md:pb-24 bg-[var(--ink-2)] text-[var(--on-dark)] overflow-hidden"
        >
          {/* Decorative background visual behind federated diagram */}
          <SoftImage
            src="/images/trust-network.webp"
            width={1600}
            height={900}
            opacity={imageTuning.trustNetwork.opacity}
            blend={imageTuning.trustNetwork.blend}
            mask={imageTuning.trustNetwork.mask}
            parallax={imageTuning.trustNetwork.parallax}
            hideBelow={imageTuning.trustNetwork.hideBelow}
            className="top-12 right-0 w-[48%] max-w-[42rem] h-auto pointer-events-none z-0"
          />

          <div className="shell relative z-10">
            <SectionHeader
              pageNumber="04"
              kicker="04 / TRUST & FEDERATED TECH"
              title="Zero-Knowledge Sovereign Federated Architecture"
              subtitle="Data stays sovereign in the patient's home jurisdiction. Only cryptographically authorized context leaves, satisfying HIPAA, GDPR, ABDM, and NABIDH."
              dark={true}
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
          style={{ '--accent': '#336E87' } as React.CSSProperties}
          className="relative z-50 rounded-t-[2rem] -mt-8 pt-20 md:pt-24 pb-20 md:pb-24 bg-[var(--bg)] overflow-hidden"
        >
          <div className="shell relative z-10">
            <SectionHeader
              pageNumber="05"
              kicker="05 / MARKET OPPORTUNITY"
              title="A $14.2B Beachhead in Global Healthcare Mobility"
              subtitle="Capturing the high-growth intersection of medical travel, expat health coverage, and high-volume sovereign travel corridors."
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
          style={{ '--accent': '#4391C6' } as React.CSSProperties}
          className="relative z-60 rounded-t-[2rem] -mt-8 pt-20 md:pt-24 pb-20 md:pb-24 bg-[var(--surface)] overflow-hidden"
        >
          {/* Decorative background visual across header */}
          <SoftImage
            src="/images/roadmap-path.webp"
            width={1600}
            height={900}
            opacity={imageTuning.roadmapPath.opacity}
            blend={imageTuning.roadmapPath.blend}
            mask={imageTuning.roadmapPath.mask}
            dualMask={imageTuning.roadmapPath.dualMask}
            parallax={imageTuning.roadmapPath.parallax}
            hideBelow={imageTuning.roadmapPath.hideBelow}
            className="top-0 left-0 right-0 w-full h-[20rem] pointer-events-none z-0"
          />

          <div className="shell relative z-10">
            <SectionHeader
              pageNumber="06"
              kicker="06 / ROADMAP & GOVERNANCE"
              title="Execution Phasing, Defensible Moat & Team"
              subtitle="From the India-UAE pilot corridor to global healthcare continuity standard, backed by top clinical and institutional advisory."
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
