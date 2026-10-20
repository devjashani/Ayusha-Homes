export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source: string;
}

export interface ProblemCard {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
}

export interface WhyNowCard {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface SolutionPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface ProductMvpCard {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  iconName: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  domain: 'AYUSHA' | 'CLINICAL';
  badge: string;
}

export interface ComparisonRow {
  name: string;
  gap: string;
  verifiedIdentity: boolean;
  longitudinalContext: boolean;
  emergencyWorkflow: boolean;
  crossBorderRouting: boolean;
  isAyusha?: boolean;
}

export interface BusinessModelCard {
  stakeholder: string;
  category: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface RoadmapPhase {
  timeframe: string;
  title: string;
  description: string;
  isCurrent?: boolean;
}

export interface MoatStage {
  step: number;
  title: string;
  description: string;
}

export interface RiskMitigant {
  title: string;
  risk: string;
  mitigant: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  summary: string;
  experiencePoints: string[];
}

export interface OpenRole {
  code: string;
  title: string;
  focus: string;
}

export const CONTENT = {
  brand: {
    name: "AYUSHA",
    tagline: "Health that travels with you.",
    conceptBadge: "Investor concept – pilot opening soon",
    heroBadge: "Investor concept – Pilot opening in one city",
    heroHeadline: "Your health record shouldn't stop at the border.",
    heroSubcopy: "The health-continuity layer for a world where patients, providers, and medical context move across cities, systems, and borders. Carry critical allergies, medicines, conditions, and key reports with zero friction.",
    pillarsMotto: "ONE HEALTH IDENTITY • ONE TRUSTED HEALTH CONTEXT • WHEREVER CARE HAPPENS",
    legalBoundary: "AYUSHA supports identification, information, routing, and notification. Qualified clinicians and local emergency services make all medical decisions. Steps 1–5 are AYUSHA's domain — step 6 sits outside our system by design.",
    liabilitySummary: "AYUSHA is an interoperability and continuity layer, not a healthcare provider. Qualified clinicians make every medical decision.",
    goldenRule: "Golden Rule: monetize the infrastructure and the workflow — AYUSHA never sells identifiable patient data.",
    milestoneNotice: "The Milestone: capital targets 1,000+ users and 10–20 providers to validate the core emergency workflow.",
  },

  nav: [
    { label: "Why it matters", href: "#why" },
    { label: "Solution", href: "#solution" },
    { label: "How it works", href: "#how" },
    { label: "Trust & Tech", href: "#trust" },
    { label: "Market", href: "#market" },
    { label: "Roadmap", href: "#roadmap" },
  ] as NavItem[],

  heroPassportMock: {
    holderName: "Alex Rivera",
    bloodGroup: "O+",
    allergies: ["Penicillin", "Sulfonamides"],
    medications: ["Atorvastatin 20mg", "Salbutamol Inhaler (PRN)"],
    conditions: ["Type 2 Diabetes (Managed)", "Mild Asthma"],
    emergencyContact: "Elena Rivera (+1 555-0192)",
    shareStatus: "Secure share: time-limited token active (12m left)",
  },

  quickActionDefault: {
    fromCountries: [
      { code: "IND", name: "India (New Delhi / Mumbai)" },
      { code: "UAE", name: "United Arab Emirates (Dubai / Abu Dhabi)" },
      { code: "USA", name: "United States (New York / SF)" },
      { code: "GBR", name: "United Kingdom (London)" },
      { code: "SGP", name: "Singapore" },
      { code: "DEU", name: "Germany (Frankfurt / Berlin)" },
      { code: "AUS", name: "Australia (Sydney / Melbourne)" },
      { code: "CAN", name: "Canada (Toronto / Vancouver)" },
    ],
    toCountries: [
      { code: "UAE", name: "United Arab Emirates (Dubai / Abu Dhabi)" },
      { code: "IND", name: "India (New Delhi / Mumbai)" },
      { code: "USA", name: "United States (New York / SF)" },
      { code: "GBR", name: "United Kingdom (London)" },
      { code: "SGP", name: "Singapore" },
      { code: "THA", name: "Thailand (Bangkok)" },
      { code: "MYS", name: "Malaysia (Kuala Lumpur)" },
      { code: "DEU", name: "Germany (Frankfurt / Berlin)" },
    ],
    personaOptions: [
      { id: "traveler", label: "Frequent Traveler" },
      { id: "expat", label: "Expat Resident" },
      { id: "student", label: "International Student" },
      { id: "family", label: "Family with Medical History" },
    ],
  },

  problem: {
    tag: "THE PROBLEM",
    headline: "Care is local. History isn't.",
    subhead: "The gap opens exactly when it matters most.",
    cards: [
      {
        id: "local-care",
        stepNumber: "01",
        title: "Care is local; history is not",
        description: "Patients cross borders instantly. Their critical medical context stays trapped behind, in another system.",
      },
      {
        id: "fragmented",
        stepNumber: "02",
        title: "Records are fragmented",
        description: "Scans and medical history sit across diverse, unlinked systems with no common thread connecting them.",
      },
      {
        id: "disappears",
        stepNumber: "03",
        title: "Context disappears",
        description: "In a stressful emergency, patients cannot advocate for themselves — and care teams act on incomplete context.",
      },
    ] as ProblemCard[],
    callout: "Result: care teams operate on incomplete context — exactly when decisions matter most. The infrastructure exists in pieces; the missing link is continuous context across providers, locations, and borders.",
  },

  stats: [
    {
      value: "1.4B",
      numericValue: 1.4,
      suffix: "B",
      label: "international trips taken in 2024 — a record, up 11% YoY",
      source: "UN Tourism (UNWTO), World Tourism Barometer, 2024",
    },
    {
      value: "304M",
      numericValue: 304,
      suffix: "M",
      label: "people live outside their country of birth, nearly double 1990",
      source: "UN DESA, International Migrant Stock, 2024",
    },
    {
      value: "~23.6%",
      numericValue: 23.6,
      prefix: "~",
      suffix: "%",
      label: "CAGR projected for global medical tourism through 2034",
      source: "Fortune Business Insights, 2025",
    },
  ] as StatItem[],

  whyNow: {
    tag: "WHY NOW",
    headline: "Four forces are converging to make continuity infrastructure possible — for the first time.",
    cards: [
      {
        id: "force-1",
        number: "01",
        title: "Mobility is structurally higher",
        description: "304M people now live outside their home country and 1.4B international trips happen every year — both at record highs.",
      },
      {
        id: "force-2",
        number: "02",
        title: "Digital health rails now exist",
        description: "Maturing FHIR interoperability standards and national digital-health IDs (e.g., India's ABHA/ABDM) give AYUSHA a base layer to connect above.",
      },
      {
        id: "force-3",
        number: "03",
        title: "Regulatory clarity is emerging",
        description: "India's DPDP Act, GDPR, and HIPAA now give clear rules to design inside — not around — for identification, information, and routing.",
      },
      {
        id: "force-4",
        number: "04",
        title: "Payers want a differentiated benefit",
        description: "Insurers and employers are actively seeking travel-health benefits that prove their value at the exact moment of crisis.",
      },
    ] as WhyNowCard[],
  },

  solution: {
    tag: "THE SOLUTION",
    headline: "AYUSHA is the active coordination layer around the record — not another record locker.",
    subhead: "We build the missing bridge above existing hospital silos.",
    pillars: [
      {
        id: "identity",
        number: "01",
        title: "Identity",
        subtitle: "Verified & Federated",
        description: "Securely verify the person — without creating a risky, centralized global medical-data warehouse.",
        details: [
          "Zero-knowledge person verification",
          "Decentralized identifiers mapped to regional rails",
          "Biometrics never stored as raw medical keys",
        ],
      },
      {
        id: "information",
        number: "02",
        title: "Information",
        subtitle: "Minimum Necessary Context",
        description: "Deliver only the critical, authorized medical context strictly required for urgent care.",
        details: [
          "Curated emergency summary: allergies, meds, conditions",
          "Granular consent-driven scopes",
          "Automated translation & FHIR terminology mapping",
        ],
      },
      {
        id: "access",
        number: "03",
        title: "Access",
        subtitle: "Intelligent Routing",
        description: "Actively connect the patient to the right provider, emergency pathway, or care destination.",
        details: [
          "Network matching by clinical capability & accreditation",
          "Instant time-limited OTP/token provider handoff",
          "Automated next-of-kin and insurer alerting",
        ],
      },
    ] as SolutionPillar[],
    baseLayerText: "Base Infrastructure: Disparate Global Health Systems & Hospitals",
    continuityLayerText: "AYUSHA — The Continuity Layer: a unified patient experience built on top of the systems that already exist, not a replacement for them.",
  },

  productMvp: {
    tag: "PRODUCT & BEACHHEAD",
    headline: "Enter through the sharpest wedge: emergency continuity for people who move.",
    subhead: "Build less. Make the first version indispensable — the MVP:",
    targetText: "Frequent international travelers, expats, international students, and families managing significant medical histories.",
    firstChannelText: "Travel insurers, international hospitals, universities, employers, and travel-health partners.",
    cards: [
      {
        id: "health-passport",
        number: "01",
        title: "Health Passport",
        tag: "CORE BASELINE",
        description: "Allergies, medicines, conditions, surgeries, key reports, and emergency contacts.",
        iconName: "ShieldAlert",
      },
      {
        id: "emergency-profile",
        number: "02",
        title: "Emergency Profile",
        tag: "URGENCY OPTIMIZED",
        description: "Minimal, high-signal information designed strictly for rapid urgent-care decisions.",
        iconName: "Zap",
      },
      {
        id: "secure-share",
        number: "03",
        title: "Secure Share",
        tag: "CONTROLLED ACCESS",
        description: "Purpose-specific, time-limited access keys for an authorized receiving provider.",
        iconName: "KeyRound",
      },
      {
        id: "care-route",
        number: "04",
        title: "Care Route",
        tag: "INTELLIGENT CONNECTION",
        description: "Participating-provider matching based on clinical capability, location, and availability.",
        iconName: "Navigation",
      },
    ] as ProductMvpCard[],
    notInMvpNote: "Not in the MVP: family profiles, complex medical-tourism journeys, full national-system integrations, or governed research infrastructure. We prove the core first.",
  },

  howItWorks: {
    tag: "HOW IT WORKS",
    headline: "The workflow is the differentiator — not static record storage.",
    subhead: "From collapse to coordinated care, in six steps.",
    steps: [
      {
        step: 1,
        title: "Trigger",
        description: "Initiated via approved workflow, bystander, or responder.",
        domain: "AYUSHA",
        badge: "Step 1 • AYUSHA Domain",
      },
      {
        step: 2,
        title: "Identify",
        description: "Securely verify patient identity.",
        domain: "AYUSHA",
        badge: "Step 2 • AYUSHA Domain",
      },
      {
        step: 3,
        title: "Retrieve",
        description: "Pull minimum necessary emergency context.",
        domain: "AYUSHA",
        badge: "Step 3 • AYUSHA Domain",
      },
      {
        step: 4,
        title: "Route",
        description: "Match to the appropriate participating facility.",
        domain: "AYUSHA",
        badge: "Step 4 • AYUSHA Domain",
      },
      {
        step: 5,
        title: "Notify",
        description: "Alert configured contacts and institutional partners.",
        domain: "AYUSHA",
        badge: "Step 5 • AYUSHA Domain",
      },
      {
        step: 6,
        title: "Treat",
        description: "Clinicians make actual medical decisions.",
        domain: "CLINICAL",
        badge: "Step 6 • Clinical Safety Boundary",
      },
    ] as HowItWorksStep[],
    boundaryText: "CLINICAL SAFETY BOUNDARY: Steps 1–5 are AYUSHA's domain — step 6 sits outside our system by design. Qualified clinicians and local emergency services make all medical decisions.",
  },

  trustAndTech: {
    tag: "TECHNOLOGY & TRUST",
    headline: "Federated by design: we connect systems, we never become the warehouse.",
    subhead: "The Federated Bridge — connects systems; never creates a global warehouse of citizens' medical records.",
    zones: {
      source: "Home Country Zone (National EHR, ABHA, Hospital Repositories)",
      bridge: "AYUSHA Interoperability & Orchestration Layer",
      target: "Receiving Country Zone (Emergency Department, Participating Clinic)",
    },
    principles: [
      {
        title: "Minimum Necessary",
        description: "Only relevant context is pulled, based on consent and strict emergency rules.",
      },
      {
        title: "Audit Trail",
        description: "Immutable record of who accessed what, when, and exactly why.",
      },
      {
        title: "Secure Identity",
        description: "Strong verification ensures raw biometrics are never used as the direct medical-data key.",
      },
    ],
    complianceChips: [
      { name: "DPDP-Aligned Architecture", note: "India Digital Personal Data Protection Act compliance designed in from day one" },
      { name: "GDPR-Aligned Architecture", note: "Strict data minimization, purpose limitation, and sovereign processing principles" },
      { name: "HIPAA-Aligned Architecture", note: "Designed to meet US administrative, physical, and technical safeguard specifications" },
      { name: "FHIR Interoperability", note: "Standardized HL7 Fast Healthcare Interoperability Resources data pipelines" },
    ],
  },

  market: {
    tag: "MARKET OPPORTUNITY",
    headline: "The addressable population is large, growing, and already paying for travel-health trust.",
    funnel: [
      {
        layer: "World's Mobile Population",
        metric: "1.4B+ Trips",
        description: "Everyone who crosses a border for travel, work, study, or care.",
      },
      {
        layer: "High-Mobility, High-Consequence Segment",
        metric: "304M+ Expats & Families",
        description: "Expats, international students, frequent travelers, and families managing significant medical histories.",
      },
      {
        layer: "AYUSHA's Initial Wedge",
        metric: "Target Corridor Pilot",
        description: "Reached first through travel insurers, international hospitals, universities, and employers — partners with a clear willingness to pay for trusted assistance.",
      },
    ],
  },

  comparison: {
    tag: "COMPETITIVE LANDSCAPE",
    headline: "The pieces already exist. AYUSHA is the only one that connects all of them.",
    closingStatement: "We are the exclusive cross-border + emergency continuity layer.",
    columns: [
      "Solution Model",
      "Gap AYUSHA Closes",
      "Verified Identity",
      "Longitudinal Context",
      "Emergency Workflow",
      "Cross-Border Routing",
    ],
    rows: [
      {
        name: "National Health Infra (e.g., ABHA/ABDM)",
        gap: "Lacks cross-border & consumer journey",
        verifiedIdentity: true,
        longitudinalContext: false,
        emergencyWorkflow: false,
        crossBorderRouting: false,
      },
      {
        name: "Patient-Owned Records (e.g., StoryMD)",
        gap: "Lacks emergency workflow & intl. routing",
        verifiedIdentity: false,
        longitudinalContext: true,
        emergencyWorkflow: false,
        crossBorderRouting: false,
      },
      {
        name: "Traveler Care Apps (e.g., Air Doctor)",
        gap: "Lacks medical context continuity",
        verifiedIdentity: false,
        longitudinalContext: false,
        emergencyWorkflow: false,
        crossBorderRouting: true,
      },
      {
        name: "Device OS Safety (e.g., Apple/Google)",
        gap: "Lacks provider interoperability",
        verifiedIdentity: false,
        longitudinalContext: false,
        emergencyWorkflow: true,
        crossBorderRouting: false,
      },
      {
        name: "AYUSHA",
        gap: "The exclusive cross-border + emergency layer",
        verifiedIdentity: true,
        longitudinalContext: true,
        emergencyWorkflow: true,
        crossBorderRouting: true,
        isAyusha: true,
      },
    ] as ComparisonRow[],
  },

  businessModel: {
    tag: "BUSINESS MODEL",
    headline: "Every stakeholder pays for a different piece of coordination — never for patient data.",
    cards: [
      {
        stakeholder: "Patients",
        category: "Travelers, Expats",
        title: "Assessment Fee",
        description: "One-time ₹500 fee — an acquisition tool, not the revenue engine.",
      },
      {
        stakeholder: "Patients",
        category: "Travelers, Expats",
        title: "Premium Consumer",
        description: "Subscriptions for family management, digitization, and continuous travel convenience.",
      },
      {
        stakeholder: "Payers",
        category: "Insurers, Employers",
        title: "B2B2C Activation",
        description: "Per-member activation fees embedding AYUSHA in insurer & employer journeys.",
      },
      {
        stakeholder: "Payers",
        category: "Insurers, Employers",
        title: "Enterprise / Gov",
        description: "Multi-year interoperability and infrastructure contracts for global mobility fleets.",
      },
      {
        stakeholder: "Providers",
        category: "Hospitals, Labs",
        title: "Provider SaaS",
        description: "Recurring routing, workflow, and integration fees, usage-based.",
      },
      {
        stakeholder: "Providers",
        category: "Hospitals, Labs",
        title: "Research Licensing",
        description: "Future: consent-gated licensing of de-identified insights — never raw records.",
      },
    ] as BusinessModelCard[],
  },

  roadmap: {
    tag: "GO-TO-MARKET & ROADMAP",
    headline: "Start narrow. Prove trust. Scale the network — in that order.",
    phases: [
      {
        timeframe: "0–6 MOS",
        title: "Pilot",
        description: "Target: 1 city, 10–20 providers, 1,000+ users. Validate provider economics and the emergency workflow.",
        isCurrent: true,
      },
      {
        timeframe: "6–12 MOS",
        title: "Prove Corridor",
        description: "Establish one complete India ↔ International corridor with insurer and provider partners.",
      },
      {
        timeframe: "12–24 MOS",
        title: "Scale",
        description: "Additional countries and system integrations, backed by recurring enterprise contracts.",
      },
      {
        timeframe: "24–48 MOS",
        title: "Expand",
        description: "Deepen national infrastructure and intelligence-layer partnerships across high-traffic corridors.",
      },
    ] as RoadmapPhase[],
    metrics: [
      { title: "Activation", target: "% completing a highly usable emergency profile." },
      { title: "Provider Adoption", target: "% completing the workflow at intake." },
      { title: "Time to Context", target: "Time from authorized request to relevant summary delivery." },
      { title: "Trust & Integrity", target: "Audit accuracy and zero security incidents." },
    ],
    closingStatement: "Success is not 'documents uploaded.' Success is faster access to relevant context when it matters most.",
  },

  moat: {
    tag: "MOAT & PATH TO SCALE",
    headline: "The moat compounds with every provider, corridor, and partner added.",
    subhead: "As verified providers, country-standard integrations, and distribution partners grow, the trusted network around the data becomes irreplaceable.",
    summary: "Enter through a narrow wedge; progressively become a global health-continuity platform.",
    stages: [
      { step: 1, title: "Emergency + Travel", description: "Travelers, secure share, provider network." },
      { step: 2, title: "Insurance + Education", description: "Travel insurance, universities, student onboarding." },
      { step: 3, title: "Healthcare Networks", description: "Hospitals, pre-arrival context, medical tourism." },
      { step: 4, title: "Enterprise", description: "Global workforces, expats, family benefits." },
      { step: 5, title: "National Infrastructure", description: "Government, cross-border exchange above existing infra." },
      { step: 6, title: "Intelligence", description: "Consented research, privacy-preserving secondary use." },
    ] as MoatStage[],
  },

  risks: {
    tag: "RISKS & MITIGANTS",
    headline: "We've stress-tested where this could break — and designed around it early.",
    items: [
      {
        title: "Execution Risk",
        risk: "Pre-launch, no live users yet; growth depends on provider and insurer partnerships.",
        mitigant: "A narrow, single-city pilot with explicit, measurable milestones before any expansion.",
      },
      {
        title: "Trust & Regulatory Risk",
        risk: "Cross-border data regulation is still evolving; one trust incident would be damaging early on.",
        mitigant: "Federated model by design — minimum-necessary access, full audit trails, and DPDP/GDPR/HIPAA-aligned architecture from day one.",
      },
      {
        title: "Platform Risk",
        risk: "Device-OS players or national health systems could expand into this layer over time.",
        mitigant: "Sit above existing infrastructure as a connective layer, not a competitor — and move first on distribution partnerships.",
      },
    ] as RiskMitigant[],
  },

  team: {
    tag: "TEAM & CAPITAL PLAN",
    headline: "Founder-led. Specialist-executed.",
    subhead: "Raise to prove the wedge — not to build the world.",
    founder: {
      name: "Shobhit Nandwana",
      role: "Founder / CEO",
      initials: "SN",
      summary: "Strategy, product thesis, partnerships. Investment-professional background bringing pattern-recognition across hundreds of healthcare and mobility businesses.",
      experiencePoints: [
        "As an investment professional at a US family office, Shobhit reviews pitch decks and investment opportunities daily — developing a trained eye for where healthcare and travel businesses typically break.",
        "MBA in Finance from IMT Ghaziabad and Dubai — a business education built across two markets from day one.",
        "Career spanning US companies, based in Dubai with roots in India — the exact three-market triangle (US capital, Gulf mobility corridor, India healthcare delivery) AYUSHA's first corridor depends on.",
        "AYUSHA isn't a pivot from the day job — it's the pattern he kept noticing in every other founder's deck, built by the person who saw it first.",
      ],
    } as TeamMember,
    rolesBeingBuilt: [
      { code: "PC", title: "Product & Cyber", focus: "Secure sharing, threat modeling, identity encryption." },
      { code: "CA", title: "Clinical Advisor", focus: "Emergency medicine and hospital operations validation." },
      { code: "CT", title: "CTO / Security", focus: "FHIR / interoperability, privacy engineering." },
      { code: "GOV", title: "Governance & Integrations", focus: "Clinical safety protocols, provider APIs, routing." },
      { code: "RG", title: "Pilot Ops & Regulatory", focus: "City launch, corridor legal architecture, hospital/insurer distribution." },
    ] as OpenRole[],
  },

  waitlist: {
    tag: "JOIN THE PILOT",
    headline: "Be first to travel with continuous health context.",
    subhead: "We are accepting applications for our inaugural single-city pilot corridor (1,000+ travelers, 10–20 accredited providers).",
    consentText: "I agree to AYUSHA contacting me regarding the pilot program. I understand AYUSHA is an interoperability service and not a medical provider.",
    modalContactTitle: "Investor & Partner Inquiries",
    modalContactEmail: "shobhit@ayusha.health",
    modalContactDescription: "For hospital network partnerships, insurer distribution pilots, or seed round investor discussions.",
  },

  footer: {
    disclaimer: "AYUSHA handles identification, information, routing and notification. Qualified clinicians and local emergency services make every medical decision.",
    confidentiality: "Investor Concept • Strictly Confidential",
    copyright: "© 2026 AYUSHA Health Technologies. All rights reserved.",
  },
};
