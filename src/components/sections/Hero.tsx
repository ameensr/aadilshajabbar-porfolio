"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoveDown } from "lucide-react";

interface HeroProps {
  innovationsCount?: number;
}

export default function Hero({ innovationsCount = 5 }: HeroProps) {
  const stats = [
    { value: innovationsCount, label: "Innovations" },
    { value: 2, label: "Products Sold" },
    { value: 3, label: "Yrs UAE Experience" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-navy to-nearblack overflow-hidden pt-20 px-6 md:px-12 lg:px-24"
    >
      {/* Background Fine Grid Lines */}
      <div className="absolute inset-0 bg-size-[80px_80px] bg-[linear-gradient(to_right,rgba(201,168,76,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,168,76,0.015)_1px,transparent_1px)] pointer-events-none" />

      {/* Aesthetic layout helper lines */}
      <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-gold/5 pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-gold/5 pointer-events-none" />
      <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gold/5 pointer-events-none" />
      <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-gold/5 pointer-events-none" />

      {/* Rotating Circular Orbit Rings behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Ring 1 - Large */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="relative w-[320px] h-[320px] md:w-[600px] md:h-[600px] border border-gold/15 rounded-full flex items-center justify-center"
        >
          {/* Gold Orbiting Dot */}
          <div className="absolute top-0 left-1/2 -ml-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_12px_#C9A84C]" />
        </motion.div>

        {/* Ring 2 - Medium (Opposite spin) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute w-[240px] h-[240px] md:w-[420px] md:h-[420px] border border-dashed border-gold/10 rounded-full"
        >
          {/* Smaller Secondary Dot */}
          <div className="absolute bottom-0 right-1/2 -mr-1 w-2 h-2 bg-gold/40 rounded-full" />
        </motion.div>
      </div>

      <div className="relative max-w-5xl text-center z-10">
        {/* Editorial Sub-Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="font-mono text-xs md:text-sm tracking-[0.4em] text-gold uppercase bg-gold/5 px-4 py-2 border border-gold/10 rounded-full">
            Mechanical Engineer · Product Innovator · UAE
          </span>
        </motion.div>

        {/* Hero Editorial Display Name */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl lg:text-[7.5rem] font-serif font-black tracking-tight text-offwhite uppercase leading-none"
          >
            Aadil Sha <span className="font-serif italic text-gold font-normal font-playfair lowercase">Jabbar</span>
          </motion.h1>
        </div>

        {/* Large Bold Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif italic text-xl md:text-3xl text-offwhite/85 max-w-3xl mx-auto mb-12 tracking-wide leading-relaxed"
        >
          &ldquo;I don&apos;t wait to be given a problem. <span className="text-gold font-semibold not-italic">I build.</span>&rdquo;
        </motion.p>

        {/* Animated Stat Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-16 border-y border-gold/10 py-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-serif text-3xl md:text-4xl text-gold font-bold">
                {stat.value}
                {stat.label.includes("UAE") ? "+" : ""}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-offwhite/50 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {/* Main CTA */}
          <a
            href="#innovations"
            className="w-full sm:w-auto px-8 py-4 border border-gold bg-gold text-nearblack font-mono text-xs tracking-widest uppercase font-bold hover:bg-transparent hover:text-gold transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.25)] hover:shadow-none"
          >
            View Innovations
          </a>

          {/* Secondary CTA */}
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 border border-gold/40 text-offwhite font-mono text-xs tracking-widest uppercase hover:border-gold hover:bg-gold/5 transition-all duration-300"
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator with animated line */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10">
        <span className="font-mono text-[9px] tracking-[0.25em] text-offwhite/30 uppercase">
          Scroll to Inspect
        </span>
        <div className="w-[1px] h-12 bg-gold/10 relative overflow-hidden">
          <motion.div
            animate={{ top: ["0%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute top-0 w-full h-1/2 bg-gold"
          />
        </div>
      </div>
    </section>
  );
}
