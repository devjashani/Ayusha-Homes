import React from 'react';
import { motion } from 'motion/react';
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
    <div className="w-full">
      {/* Animated Federated Bridge Diagram (Scalable container) */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <div className="p-6 sm:p-10 rounded-[var(--radius-card)] bg-white/5 border border-white/10 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            {/* Home Country Zone */}
            <div className="md:col-span-2 p-5 rounded-[var(--radius-card-sm)] bg-white/5 border border-white/10 shadow-xs flex flex-col items-center text-center">
              <div className="w-11 h-11 rounded-xl bg-white/10 text-[var(--accent-soft)] flex items-center justify-center mb-3">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm sm:text-base text-[var(--on-dark)]">
                Home Country Zone
              </h4>
              <p className="text-xs text-[var(--on-dark-muted)] mt-1 leading-relaxed">
                National EHR, ABHA, Hospital Repositories. Data remains securely resident at source.
              </p>
              <span className="mt-3 text-[0.625rem] font-mono px-2 py-0.5 rounded bg-white/10 text-[var(--on-dark-muted)]">
                Data Custodian
              </span>
            </div>

            {/* Data Flow Pulse Left */}
            <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
              <div className="w-full h-[1px] bg-white/20 relative overflow-hidden rounded-full">
                <motion.div
                  className="w-1/3 h-full bg-[var(--accent-soft)] rounded-full shadow-[0_0_8px_var(--accent-soft)]"
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                />
              </div>
              <span className="text-[0.625rem] font-mono text-[var(--on-dark-muted)] mt-1.5 flex items-center gap-1">
                <ArrowRightLeft className="w-3 h-3 text-[var(--accent-soft)]" />
                Authorized Read
              </span>
            </div>

            {/* AYUSHA Interoperability Layer (Center Hub) */}
            <div className="md:col-span-1 p-5 rounded-[var(--radius-card-sm)] bg-[var(--ink)] text-white shadow-xl flex flex-col items-center text-center relative border border-white/20">
              <div className="w-11 h-11 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center mb-3 shadow-md">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-xs sm:text-sm text-white">
                AYUSHA Layer
              </h4>
              <p className="text-[0.6875rem] text-[var(--on-dark-muted)] mt-1 leading-snug">
                Federated Interoperability
              </p>
              <div className="mt-2.5 flex items-center gap-1 text-[0.5625rem] font-bold text-[var(--good)] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--good)] animate-ping" />
                Zero Warehouse
              </div>
            </div>

            {/* Data Flow Pulse Right */}
            <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
              <div className="w-full h-[1px] bg-white/20 relative overflow-hidden rounded-full">
                <motion.div
                  className="w-1/3 h-full bg-[var(--good)] rounded-full shadow-[0_0_8px_var(--good)]"
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', delay: 1.1 }}
                />
              </div>
              <span className="text-[0.625rem] font-mono text-[var(--on-dark-muted)] mt-1.5 flex items-center gap-1">
                <ArrowRightLeft className="w-3 h-3 text-[var(--good)]" />
                Context Delivery
              </span>
            </div>

            {/* Receiving Country Zone */}
            <div className="md:col-span-2 p-5 rounded-[var(--radius-card-sm)] bg-white/5 border border-white/10 shadow-xs flex flex-col items-center text-center">
              <div className="w-11 h-11 rounded-xl bg-[var(--good)]/15 text-[var(--good)] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm sm:text-base text-[var(--on-dark)]">
                Receiving Country Zone
              </h4>
              <p className="text-xs text-[var(--on-dark-muted)] mt-1 leading-relaxed">
                Emergency Department, Accredited Clinic. Receives only temporary, minimum authorized summary.
              </p>
              <span className="mt-3 text-[0.625rem] font-mono px-2 py-0.5 rounded bg-[var(--good)]/20 text-emerald-200 border border-[var(--good)]/30">
                Verified Triage
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3 Core Architecture Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {CONTENT.trustAndTech.principles.map((p, idx) => {
          const icons = [FileCheck2, ShieldCheck, Lock];
          const Icon = icons[idx];
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="hover-spring-card"
            >
              <div className="h-full p-6 sm:p-7 rounded-[var(--radius-card)] bg-white/5 border border-white/10 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-[var(--accent-soft)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg text-[var(--on-dark)] mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--on-dark-muted)] leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Compliance Chips Grid (designed to align with, not certified) */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--on-dark-muted)] block text-center mb-5 font-mono">
          Sovereign Data Governance & Architecture Alignment
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTENT.trustAndTech.complianceChips.map((chip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-[var(--radius-pill)] flex items-start gap-3 bg-white/5 border border-[var(--accent-soft)]/25 shadow-xs"
            >
              <CheckCircle className="w-4 h-4 text-[var(--good)] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[var(--on-dark)]">{chip.name}</h4>
                <p className="text-[0.6875rem] text-[var(--on-dark-muted)] leading-tight mt-0.5">
                  {chip.note}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[0.6875rem] text-[var(--on-dark-muted)] mt-4 italic">
          *AYUSHA core systems are designed to align with DPDP, GDPR, and HIPAA specifications from inception.
        </p>
      </div>
    </div>
  );
};
