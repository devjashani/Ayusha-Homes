import React, { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { LiquidGlassFilter } from '@/components/glass/LiquidGlassFilter';
import { Navbar } from '@/components/sections/Navbar';
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
    <div className="relative min-h-screen bg-transparent text-[#15202B]">
      {/* Liquid glass SVG filter definition */}
      <LiquidGlassFilter />

      {/* Drifting ambient orbs & subtle noise texture */}
      <AmbientBackground />

      {/* 1. Floating Glass Navbar */}
      <Navbar onOpenTalkModal={() => setIsTalkModalOpen(true)} />

      {/* Main Content Landmark with Skip-Link anchor */}
      <main id="main-content">
        {/* 2. Hero Section */}
        <Hero onCheckReadiness={handleCheckReadiness} />

        {/* 3. Problem Section */}
        <Problem />

        {/* 4. Why Now Section */}
        <WhyNow />

        {/* 5. Solution Section */}
        <Solution />

        {/* 6. Product / MVP Section */}
        <ProductMvp />

        {/* 7. How It Works Section */}
        <HowItWorks />

        {/* 8. Trust & Tech Section */}
        <TrustAndTech />

        {/* 9. Market Section */}
        <Market />

        {/* 10. Comparison Section */}
        <Comparison />

        {/* 11. Business Model Section */}
        <BusinessModel />

        {/* 12. Roadmap & GTM Section */}
        <Roadmap />

        {/* 13. Moat Section */}
        <Moat />

        {/* 14. Risks & Mitigants Section */}
        <RisksAndMitigants />

        {/* 15. Team & Capital Plan Section */}
        <Team />

        {/* 16. Join The Pilot (Waitlist) Section */}
        <Waitlist
          initialFromCountry={readinessPrefill.from}
          initialToCountry={readinessPrefill.to}
          initialPersona={readinessPrefill.persona}
          onOpenTalkModal={() => setIsTalkModalOpen(true)}
        />
      </main>

      {/* 17. Footer Section */}
      <Footer />

      {/* Investor & Partner Modal */}
      <TalkModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
      />
    </div>
  );
};

export default App;
