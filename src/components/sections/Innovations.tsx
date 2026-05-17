"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Innovation } from "@/types";

interface InnovationsProps {
  innovations: Innovation[];
  onOpenAdmin: () => void;
  onSelectProject: (project: Innovation) => void;
}

export default function Innovations({
  innovations,
  onOpenAdmin,
  onSelectProject,
}: InnovationsProps) {
  // Status Badge style generator
  const getBadgeStyle = (status: Innovation["status"]) => {
    switch (status) {
      case "Commercially Sold":
        return "bg-emerald text-offwhite border-emerald/20";
      case "Prototype Built":
        return "bg-gold text-nearblack border-gold/20 font-bold";
      case "In Development":
        return "bg-luxegrey text-offwhite/80 border-luxegrey/30";
      default:
        return "bg-luxegrey/40 text-offwhite/60 border-luxegrey/10";
    }
  };

  return (
    <section
      id="innovations"
      className="relative py-24 md:py-32 bg-gradient-to-b from-nearblack to-navy/30 border-t border-gold/10 px-6 md:px-12 lg:px-24"
    >
      {/* Structural layout helper lines */}
      <div className="absolute inset-0 bg-size-[80px_80px] bg-[linear-gradient(to_right,rgba(201,168,76,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,168,76,0.015)_1px,transparent_1px)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-gold uppercase tracking-[0.25em] block mb-2">
              02 · Original Engineering
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-offwhite font-bold leading-tight">
              Five Original <span className="font-serif italic font-normal text-gold">Concepts</span>
            </h2>
            <p className="text-offwhite/50 font-sans text-sm md:text-base mt-4 max-w-xl">
              From commercially sold products to working prototypes, patent filings, and green sustainability research.
            </p>
          </div>
          
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-5 py-3 border border-gold/30 text-gold font-mono text-xs tracking-wider uppercase bg-gold/5 hover:bg-gold hover:text-nearblack transition-all duration-300 self-start md:self-auto"
          >
            <Plus size={14} />
            Add Innovation
          </button>
        </div>

        {/* 3-Column Masonry/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovations.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectProject(project)}
              className="relative group bg-navy/10 border border-gold/15 p-8 flex flex-col justify-between min-h-[380px] overflow-hidden cursor-pointer transition-all duration-300"
            >
              {/* Optional Background Uploaded Image (Hover Visual Overlay) */}
              {project.image && (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              )}

              {/* Top Row: Badge + Ghost ID */}
              <div className="flex items-start justify-between mb-8 z-10">
                <span className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest border rounded-full ${getBadgeStyle(project.status)}`}>
                  {project.status === "Commercially Sold" ? "✓ " : project.status === "Prototype Built" ? "⬡ " : "◯ "}
                  {project.status}
                </span>

                {/* Ghost Stroke Number */}
                <span className="font-serif text-5xl font-black text-transparent select-none leading-none pointer-events-none transition-all duration-300 group-hover:text-gold/20" style={{ WebkitTextStroke: "1px rgba(201, 168, 76, 0.15)" }}>
                  {project.ghostNumber}
                </span>
              </div>

              {/* Middle Row: Content */}
              <div className="flex-grow z-10">
                <div className="text-3xl mb-4 select-none filter drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]">
                  {project.icon}
                </div>
                
                <h3 className="font-serif text-2xl text-offwhite group-hover:text-gold transition-colors duration-300 font-semibold mb-2 leading-tight">
                  {project.name}
                </h3>
                
                <div className="font-mono text-[10px] uppercase tracking-wider text-gold/80 mb-4">
                  {project.tagline}
                </div>
                
                <p className="font-sans text-xs md:text-sm text-offwhite/60 leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>

              {/* Bottom Row: Tags */}
              <div className="mt-8 flex flex-wrap gap-2 z-10">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-1 bg-gold/5 border border-gold/10 font-mono text-[9px] text-offwhite/50 tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Luxury gold bottom border line slide-in effect */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </motion.div>
          ))}

          {/* "+ Add Your Next Innovation" Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: innovations.length * 0.05 }}
            onClick={onOpenAdmin}
            className="md:col-span-2 lg:col-span-3 border-2 border-dashed border-gold/20 hover:border-gold/60 bg-gold/2 hover:bg-gold/5 flex flex-col items-center justify-center py-12 px-6 text-center cursor-pointer transition-all duration-300 group"
          >
            <div className="w-14 h-14 border border-gold/30 rounded-full flex items-center justify-center mb-4 group-hover:border-gold group-hover:scale-110 transition-all duration-300">
              <Plus size={28} className="text-gold" />
            </div>
            
            <h3 className="font-serif text-xl text-offwhite font-medium mb-2">
              Add Your Next Innovation
            </h3>
            
            <p className="font-mono text-[10px] text-gold uppercase tracking-widest max-w-sm">
              Trigger portfolio administrator modal & mount dynamic localStorage configurations
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
