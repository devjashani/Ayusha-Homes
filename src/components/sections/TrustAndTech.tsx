import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { CONTENT } from '@/data/content';
import {
  ShieldCheck,
  FileCheck2,
  Lock,
  ArrowRightLeft,
  Server,
  Building,
  CheckCircle,
} from 'lucide-react';

export const TrustAndTech: React.FC = () => {
  return (
    <section id="trust" className="py-24 md:py-32 px-4 md:px-8 relative">
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-3"
          >
            <span className="text-xs md:text-sm font-semibold tracking-wider text-[#1E6FA8] uppercase bg-[#1E6FA8]/10 px-3.5 py-1.5 rounded-full border border-[#1E6FA8]/20">
              {CONTENT.trustAndTech.tag}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-headline mb-4"
          >
            {CONTENT.trustAndTech.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-[#5B6B76] font-normal"
          >
            {CONTENT.trustAndTech.subhead}
          </motion.p>
        </div>

        {/* Animated Federated Bridge Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <GlassPanel
            variant="card"
            className="p-6 md:p-10 bg-white/55 border-white/80 shadow-[0_20px_50px_rgba(21,32,43,0.06)] overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
              {/* Home Country Zone */}
              <div className="md:col-span-2 p-5 rounded-2xl bg-white/70 border border-white/80 shadow-xs flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-[#1E6FA8]/10 text-[#1E6FA8] flex items-center justify-center mb-3">
                  <Building className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-sm md:text-base text-[#15202B]">
                  Home Country Zone
                </h4>
                <p className="text-xs text-[#5B6B76] mt-1">
                  National EHR, ABHA, Hospital Repositories. Data remains securely resident at source.
                </p>
                <span className="mt-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 text-[#5B6B76]">
                  Data Custodian
                </span>
              </div>

              {/* Data Flow Pulse Left */}
              <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
                <div className="w-full h-1 bg-[#D8E2E7] relative overflow-hidden rounded-full">
                  <motion.div
                    className="w-1/3 h-full bg-[#1E6FA8] rounded-full shadow-[0_0_8px_#1E6FA8]"
                    animate={{ x: ['-100%', '300%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#5B6B76] mt-1 flex items-center gap-1">
                  <ArrowRightLeft className="w-3 h-3 text-[#1E6FA8]" />
                  Authorized Read
                </span>
              </div>

              {/* AYUSHA Interoperability Layer (Center Hub) */}
              <div className="md:col-span-1 p-5 rounded-2xl bg-[#15202B] text-white shadow-xl flex flex-col items-center text-center relative border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#1E6FA8] text-white flex items-center justify-center mb-3 shadow-md">
                  <Server className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-xs md:text-sm text-white">
                  AYUSHA Layer
                </h4>
                <p className="text-[11px] text-gray-300 mt-1 leading-snug">
                  Federated Interoperability & Routing
                </p>
                <div className="mt-2 flex items-center gap-1 text-[9px] font-bold text-[#6FC7C9] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6FC7C9] animate-ping" />
                  Zero Warehouse
                </div>
              </div>

              {/* Data Flow Pulse Right */}
              <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
                <div className="w-full h-1 bg-[#D8E2E7] relative overflow-hidden rounded-full">
                  <motion.div
                    className="w-1/3 h-full bg-[#4FA8E0] rounded-full shadow-[0_0_8px_#4FA8E0]"
                    animate={{ x: ['-100%', '300%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 1 }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#5B6B76] mt-1 flex items-center gap-1">
                  <ArrowRightLeft className="w-3 h-3 text-[#4FA8E0]" />
                  Context Delivery
                </span>
              </div>

              {/* Receiving Country Zone */}
              <div className="md:col-span-2 p-5 rounded-2xl bg-white/70 border border-white/80 shadow-xs flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-sm md:text-base text-[#15202B]">
                  Receiving Country Zone
                </h4>
                <p className="text-xs text-[#5B6B76] mt-1">
                  Emergency Department, Accredited Clinic. Receives only temporary, minimum authorized summary.
                </p>
                <span className="mt-3 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Verified Triage
                </span>
              </div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* 3 Core Architecture Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CONTENT.trustAndTech.principles.map((p, idx) => {
            const icons = [FileCheck2, ShieldCheck, Lock];
            const Icon = icons[idx];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
              >
                <GlassPanel
                  variant="card"
                  tiltOnHover={true}
                  className="h-full p-6 md:p-7 bg-white/45 border-white/70"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1E6FA8]/10 text-[#1E6FA8] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg text-[#15202B] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#5B6B76] leading-relaxed">
                    {p.description}
                  </p>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>

        {/* Compliance Chips Grid (designed to align with, not certified) */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#5B6B76] block text-center mb-4">
            Sovereign Data Governance & Architecture Alignment
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT.trustAndTech.complianceChips.map((chip, idx) => (
              <GlassPanel
                key={idx}
                variant="chip"
                className="p-3.5 flex items-start gap-2.5 bg-white/50 border-white/80"
              >
                <CheckCircle className="w-4 h-4 text-[#1E6FA8] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#15202B]">{chip.name}</h4>
                  <p className="text-[11px] text-[#5B6B76] leading-tight mt-0.5">{chip.note}</p>
                </div>
              </GlassPanel>
            ))}
          </div>
          <p className="text-center text-[11px] text-[#5B6B76] mt-3 italic">
            *AYUSHA core systems are designed to align with DPDP, GDPR, and HIPAA specifications from inception.
          </p>
        </div>
      </div>
    </section>
  );
};
