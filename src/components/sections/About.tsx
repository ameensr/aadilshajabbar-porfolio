"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings, ClipboardCheck, Snowflake, Lightbulb, FileText, Globe } from "lucide-react";

export default function About() {
  const skills = [
    {
      icon: <Settings className="text-gold" size={24} />,
      title: "Mechanical Engineering",
      desc: "Offshore construction & industrial projects.",
    },
    {
      icon: <ClipboardCheck className="text-gold" size={24} />,
      title: "QA/QC Coordination",
      desc: "Inspection, punch lists, and system handover docs.",
    },
    {
      icon: <Snowflake className="text-gold" size={24} />,
      title: "Refrigeration Systems",
      desc: "Active learner — fundamentals to applied thermodynamics.",
    },
    {
      icon: <Lightbulb className="text-gold" size={24} />,
      title: "Product Innovation",
      desc: "Concept → prototype → manufacture → commercial market.",
    },
    {
      icon: <FileText className="text-gold" size={24} />,
      title: "Technical Documentation",
      desc: "Engineering reports, drawing reviews, and layout compliance.",
    },
    {
      icon: <Globe className="text-gold" size={24} />,
      title: "GCC Market Knowledge",
      desc: "UAE operations, specialized onshore/offshore ADNOC projects.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-nearblack border-t border-gold/10 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Decorative background grid and geometric shapes */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/2 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <span className="font-mono text-xs text-gold uppercase tracking-[0.25em] block mb-2">
            01 · Core Profile
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-offwhite font-bold leading-tight">
            Engineering Precision, <span className="font-serif italic font-normal text-gold">Innovator Mindset</span>
          </h2>
          <div className="w-20 h-[1px] bg-gold mt-4" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Bio Column (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="text-2xl font-serif italic text-gold font-normal">
              &ldquo;Beyond professional guidelines, I bring ideas to market.&rdquo;
            </h3>
            
            <p className="font-sans text-base md:text-lg text-offwhite/85 leading-relaxed">
              I am a Mechanical Engineer with UAE-based experience in QA/QC coordination, technical documentation, and system handover on major <span className="text-gold font-semibold">ADNOC projects</span>. 
            </p>

            <p className="font-sans text-sm md:text-base text-offwhite/60 leading-relaxed">
              Beyond my professional roles, I independently designed, manufactured, and commercially sold two products — demonstrating full product-cycle thinking from concept to market. I hold a patent application for the <span className="text-gold">Dynamic Electro Scooter (No: 381521001)</span>.
            </p>

            <p className="font-sans text-sm md:text-base text-offwhite/60 leading-relaxed">
              I am now committing to <span className="text-gold font-medium">refrigeration engineering</span> as my specialist path — combining mechanical expertise, an innovation mindset, and deep UAE market knowledge to design high-efficiency, sustainable thermal systems.
            </p>

            {/* Quote details block */}
            <div className="border-l-2 border-gold/40 pl-4 py-1 mt-6">
              <span className="font-mono text-xs text-offwhite/40 uppercase tracking-widest block">
                Focus Alignment
              </span>
              <p className="font-serif italic text-sm text-offwhite/75 mt-1">
                Thermodynamics · Refrigeration · Quality Assurance · Clean Tech
              </p>
            </div>
          </motion.div>

          {/* Skills Grid Column (Right) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(201,168,76,0.4)" }}
                className="bg-navy/15 border border-gold/10 p-6 flex flex-col justify-between transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-navy/40 border border-gold/5 rounded-none group-hover:bg-gold/10 group-hover:border-gold/30 transition-all duration-300">
                    {skill.icon}
                  </div>
                  <h4 className="font-serif text-lg text-offwhite group-hover:text-gold transition-colors duration-300 font-semibold">
                    {skill.title}
                  </h4>
                </div>
                
                <p className="font-sans text-xs text-offwhite/50 leading-relaxed">
                  {skill.desc}
                </p>

                {/* Aesthetic accent slide-in from left line */}
                <div className="w-0 h-[1px] bg-gold mt-4 group-hover:w-full transition-all duration-500 ease-out" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
