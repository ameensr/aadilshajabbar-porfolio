"use client";

import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Cpu, FolderGit2, Sparkles } from "lucide-react";

export default function SkillsCertifications() {
  const skillCategories = [
    {
      title: "QA/QC & Documentation",
      skills: ["ITP", "MIR", "Punch Lists", "HCS", "NCR", "P&ID Review"],
    },
    {
      title: "Engineering Software",
      skills: ["AutoCAD", "Fusion 360", "SolidWorks", "Inventor", "Navisworks"],
    },
    {
      title: "Project & Planning",
      skills: ["Primavera P6", "MS Project", "Power BI", "MS Excel"],
    },
    {
      title: "Design Tools",
      skills: ["Photoshop", "Illustrator", "Figma"],
    },
    {
      title: "AI Tools",
      skills: ["Claude AI Prompt Engineering", "Advanced LLM Workflows"],
    },
  ];

  const certifications = [
    { name: "Product Design & Development", issuer: "NPTEL, IIT Roorkee" },
    { name: "MEPF Drafting Diploma", issuer: "Tritech Design Academy" },
    { name: "Oracle Primavera P6", issuer: "Udemy" },
    { name: "Prompt Engineering", issuer: "Coursera" },
    { name: "Digital Marketing", issuer: "Google & Skill India" },
    { name: "Best Paper Award", issuer: "NCRAIMTME 2022" },
  ];

  const languages = ["English", "Hindi", "Tamil", "Malayalam"];

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 bg-gradient-to-b from-navy/30 to-nearblack border-t border-gold/10 px-6 md:px-12 lg:px-24"
    >
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-gold/1 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.25em] block mb-2">
            04 · Skills & Accreditations
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-offwhite font-bold leading-tight">
            Capabilities & <span className="font-serif italic font-normal text-gold">Certifications</span>
          </h2>
          <div className="w-20 h-[1px] bg-gold mt-4" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-16">
          
          {/* Technical Skills Category list (Left - 7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-serif text-2xl italic font-normal text-gold border-b border-gold/10 pb-4 mb-6">
              Technical Skillset
            </h3>
            
            <div className="space-y-6">
              {skillCategories.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="space-y-3"
                >
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-offwhite/50 flex items-center gap-2">
                    <Cpu size={12} className="text-gold" />
                    {category.title}
                  </h4>
                  
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-4 py-2 bg-navy/20 border border-gold/10 hover:border-gold/30 text-offwhite/80 hover:text-gold font-sans text-xs md:text-sm transition-all duration-300 rounded-none cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications (Right - 5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="font-serif text-2xl italic font-normal text-gold border-b border-gold/10 pb-4 mb-6">
              Certifications & Awards
            </h3>

            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.01, borderColor: "rgba(201,168,76,0.3)" }}
                  className="bg-navy/10 border border-gold/10 border-l-2 border-l-gold p-4 flex justify-between items-center transition-all duration-300"
                >
                  <div>
                    <h4 className="font-sans text-xs md:text-sm font-bold text-offwhite leading-tight">
                      {cert.name}
                    </h4>
                    <span className="font-mono text-[10px] text-offwhite/40 block mt-1">
                      {cert.issuer}
                    </span>
                  </div>
                  
                  <BadgeCheck size={18} className="text-gold/60 flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Languages Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-gold animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-offwhite/50">
              Multilingual Scope
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {languages.map((lang, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 border border-gold/10 font-serif text-sm italic text-offwhite/70 bg-nearblack rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
