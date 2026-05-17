"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Briefcase, Phone, Send } from "lucide-react";

export default function Contact() {
  const pills = [
    { icon: <MapPin size={12} />, label: "Sharjah, UAE", title: "Location" },
    { icon: <Clock size={12} />, label: "Immediate", title: "Availability" },
    { icon: <Briefcase size={12} />, label: "Junior Refrigeration Engineer", title: "Target Role" },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-gradient-to-b from-nearblack to-navy border-t border-gold/10 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* Grid line patterns */}
      <div className="absolute inset-0 bg-size-[80px_80px] bg-[linear-gradient(to_right,rgba(201,168,76,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,168,76,0.015)_1px,transparent_1px)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 mb-12"
        >
          <span className="font-mono text-xs text-gold uppercase tracking-[0.25em] block mb-2">
            05 · Let&apos;s Collaborate
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-offwhite font-bold leading-tight">
            Let&apos;s Build <span className="font-serif italic font-normal text-gold">Something Together</span>
          </h2>
          <p className="text-offwhite/60 font-sans text-sm md:text-base max-w-xl mx-auto">
            Available for Junior Refrigeration Engineer opportunities in the UAE — immediate availability. Let&apos;s discuss mechanical design or custom system requirements.
          </p>
        </motion.div>

        {/* Dynamic Status Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          {pills.map((pill, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2 border border-gold/10 bg-navy/20 font-mono text-[10px] text-offwhite/70 uppercase tracking-widest"
            >
              <div className="text-gold">{pill.icon}</div>
              <span className="text-offwhite/40 font-mono mr-1">{pill.title}:</span>
              <span className="text-offwhite font-sans normal-case tracking-normal">{pill.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Large Gold Interactive Email Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-6"
        >
          <a
            href="mailto:aadilshaoffshore@gmail.com"
            className="inline-block text-2xl md:text-4xl lg:text-5xl font-serif font-black tracking-tight text-gold hover:text-gold-light select-all cursor-pointer break-all border-b border-dashed border-gold hover:border-solid transition-colors duration-300 py-2"
          >
            aadilshaoffshore@gmail.com
          </a>

          {/* Secondary phone detail */}
          <div className="flex items-center justify-center gap-2 text-offwhite/50 font-mono text-xs tracking-wider">
            <Phone size={12} className="text-gold" />
            <span>UAE Call / WhatsApp:</span>
            <a href="tel:+971508277121" className="text-offwhite hover:text-gold transition-colors duration-300 font-sans">
              +971 508277121
            </a>
          </div>
        </motion.div>

        {/* Dynamic inquiry helper CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-gold/10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-left">
            <span className="font-mono text-[9px] uppercase tracking-widest text-offwhite/30 block">
              Inquiry Dispatcher
            </span>
            <span className="font-sans text-xs text-offwhite/50 block mt-1">
              Direct connection to client mail servers. No tracking databases.
            </span>
          </div>

          <a
            href="mailto:aadilshaoffshore@gmail.com?subject=Inquiry from Portfolio website"
            className="flex items-center gap-2 px-5 py-3 border border-gold text-gold font-mono text-xs tracking-wider uppercase bg-gold/5 hover:bg-gold hover:text-nearblack transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Send size={12} />
            Quick Dispatch
          </a>
        </motion.div>

      </div>
    </section>
  );
}
