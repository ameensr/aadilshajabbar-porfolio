"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Award } from "lucide-react";

export default function Timeline() {
  const experiences = [
    {
      date: "Aug 2025 – Mar 2026",
      role: "Mechanical Engineer — Procurement & Coordination",
      company: "Medcentra Trading LLC, UAE",
      description: "HVAC materials procurement, RFQ management, vendor selection, technical evaluation, and international standard compliance.",
      highlight: "HVAC & Procurement Specialist"
    },
    {
      date: "Oct 2023 – Aug 2025",
      role: "Technical Engineer QA/QC",
      company: "Target Engineering Construction Co. LLC, UAE",
      project: "ADNOC Project — IGD Expansion Phase 2, Das Island",
      description: "Managed 40,000+ punch list items. Supervised HVAC and mechanical installations. Executed system handover documentation via HCS. Coordinated directly with Tecnicas Reunidas.",
      highlight: "ADNOC Offshore System Handover"
    },
    {
      date: "Mar 2021 – Mar 2023",
      role: "Founder — Product Design & Development",
      company: "Ohleven Endeavours OPC Pvt Ltd, India",
      description: "Independently designed, commercially manufactured, and sold SANFOOT and TRIFY products. Managed full product cycle: design → production → market.",
      highlight: "Concept to Market Commercialization"
    },
    {
      date: "Aug 2022 – Aug 2023",
      role: "Business Development Officer",
      company: "Torc Infotech Pvt Ltd, India",
      description: "Client acquisition, engineering business development, and market scoping.",
      highlight: "Market Growth Coordination"
    },
    {
      date: "Aug 2023",
      role: "QA/QC Intern — Piping Engineering",
      company: "Armstech Engineers Pvt Ltd, India",
      description: "Supervised piping fabrication checks, NDT inspection review, and P&ID drawings conformance checks.",
      highlight: "QA/QC Fundamentals"
    },
  ];

  const valueCards = [
    {
      title: "Why Refrigeration?",
      text: "My thermal engineering work on OSTOV and HVAC exposure at ADNOC led me to refrigeration as my specialist path. It combines mechanical precision, energy management, and quality control — everything I am drawn to.",
    },
    {
      title: "What I Bring Beyond the CV",
      text: "I have proven I can take an idea from sketch to manufactured product to paying customer — alone, with no team or budget. That resourcefulness is what I bring into every role.",
    },
    {
      title: "6-Year Commitment Vision",
      text: "I am not looking for a job. I am looking for a company I can grow into — mastering every department and eventually contributing at a strategic level.",
    },
  ];

  return (
    <section
      id="history"
      className="relative py-24 md:py-32 bg-nearblack border-t border-gold/10 px-6 md:px-12 lg:px-24"
    >
      {/* Decorative blurred background orb */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.25em] block mb-2">
            03 · Professional Background
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-offwhite font-bold leading-tight">
            Timeline of <span className="font-serif italic font-normal text-gold">Milestones</span>
          </h2>
          <div className="w-20 h-[1px] bg-gold mt-4" />
        </div>

        {/* 2-Column Grid (Left: Timeline, Right: Value Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* Timeline Column (Left - 7 Columns) */}
          <div className="lg:col-span-7 relative border-l border-gold/25 ml-4 md:ml-6 space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-10 group"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute left-0 top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-gold bg-nearblack group-hover:bg-gold shadow-[0_0_8px_rgba(201,168,76,0.3)] transition-colors duration-300" />
                
                {/* Time & Title Row */}
                <div className="flex flex-wrap items-center gap-x-4 mb-2">
                  <span className="font-mono text-xs text-gold tracking-widest uppercase flex items-center gap-1.5 bg-gold/5 border border-gold/15 px-3 py-1 rounded-full">
                    <Calendar size={12} />
                    {exp.date}
                  </span>
                  
                  {exp.project && (
                    <span className="font-mono text-[9px] text-emerald tracking-widest uppercase bg-emerald/5 border border-emerald/20 px-2 py-0.5 mt-1 sm:mt-0">
                      ADNOC Offshore
                    </span>
                  )}
                </div>

                {/* Role and Organization */}
                <h3 className="font-serif text-xl font-bold text-offwhite group-hover:text-gold transition-colors duration-300 leading-tight mb-1">
                  {exp.role}
                </h3>
                
                <h4 className="font-sans text-xs text-offwhite/50 font-medium mb-3">
                  {exp.company}
                </h4>

                {/* Content */}
                <p className="font-sans text-xs md:text-sm text-offwhite/60 leading-relaxed max-w-2xl">
                  {exp.description}
                </p>

                {/* Subtag / Achievement Detail */}
                <div className="mt-2 text-[10px] font-mono text-gold/60 uppercase tracking-widest">
                  Key: {exp.highlight}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Value Cards Column (Right - 5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="font-serif text-2xl italic font-normal text-gold mb-6 border-b border-gold/10 pb-4">
              Value Proposition
            </h3>
            
            {valueCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ x: 4, borderColor: "rgba(201,168,76,0.3)" }}
                className="bg-navy/15 border-l-2 border border-gold/10 border-l-gold p-6 flex flex-col justify-between transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Award size={16} className="text-gold" />
                  <h4 className="font-serif text-lg font-bold text-offwhite uppercase tracking-wider">
                    {card.title}
                  </h4>
                </div>

                <p className="font-sans text-xs md:text-sm text-offwhite/75 leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
