"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Tag, Cpu, Info } from "lucide-react";
import { Innovation } from "@/types";

interface ProjectDetailsModalProps {
  project: Innovation | null;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-nearblack/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      >
        <div className="absolute inset-0 bg-size-[60px_60px] bg-[linear-gradient(to_right,rgba(201,168,76,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,168,76,0.015)_1px,transparent_1px)] pointer-events-none" />

        {/* Modal content box */}
        <motion.div
          initial={{ scale: 0.95, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-navy-dark border border-gold/25 p-6 sm:p-8 shadow-[0_0_40px_rgba(201,168,76,0.1)] max-h-[85vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 border border-gold/10 hover:border-gold text-offwhite/50 hover:text-gold transition-colors duration-300 rounded-full z-10"
          >
            <X size={16} />
          </button>

          <div className="space-y-6">
            {/* Tag / Status row */}
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 border border-gold/25 font-mono text-[9px] text-gold uppercase tracking-widest bg-gold/5 rounded-full">
                Concept Specifications
              </span>
              <span className="font-mono text-[9px] text-offwhite/40">
                ID: {project.id}
              </span>
            </div>

            {/* Title & Icon Header */}
            <div className="flex items-start gap-4">
              <div className="text-4xl sm:text-5xl select-none filter drop-shadow-[0_0_8px_rgba(201,168,76,0.3)]">
                {project.icon}
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-offwhite font-bold leading-tight">
                  {project.name}
                </h3>
                <p className="font-mono text-xs text-gold uppercase tracking-wider mt-1">
                  {project.tagline}
                </p>
              </div>
            </div>

            <div className="border-t border-b border-gold/10 py-6 space-y-4">
              <div className="flex items-start gap-2 text-gold">
                <Info size={16} className="mt-0.5" />
                <h4 className="font-mono text-[10px] uppercase tracking-widest">
                  Engineering Briefing
                </h4>
              </div>

              <p className="font-sans text-sm text-offwhite/85 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Media attachments gallery */}
            {(project.image || (project.additionalImages && project.additionalImages.length > 0)) && (
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-gold/80 flex items-center gap-1.5">
                  <Cpu size={12} />
                  Design Schematics & Prototyping Media
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {project.image && (
                    <div className="border border-gold/15 bg-nearblack p-1">
                      <img
                        src={project.image}
                        alt="Primary Cover"
                        className="w-full h-24 object-cover filter brightness-90 hover:brightness-100 transition-all duration-300"
                      />
                      <span className="font-mono text-[8px] text-offwhite/30 text-center block mt-1">
                        Primary Cover
                      </span>
                    </div>
                  )}

                  {project.additionalImages &&
                    project.additionalImages.map((imgStr, idx) => (
                      <div key={idx} className="border border-gold/15 bg-nearblack p-1">
                        <img
                          src={imgStr}
                          alt={`Attachment ${idx + 1}`}
                          className="w-full h-24 object-cover filter brightness-90 hover:brightness-100 transition-all duration-300"
                        />
                        <span className="font-mono text-[8px] text-offwhite/30 text-center block mt-1">
                          Schematic #{idx + 1}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Bottom details & CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gold/10">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 border border-gold/10 font-mono text-[9px] text-offwhite/50 tracking-wider flex items-center gap-1"
                  >
                    <Tag size={8} className="text-gold/60" />
                    {tag}
                  </span>
                ))}
              </div>

              {project.externalLink && (
                <a
                  href={project.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-gold text-gold font-mono text-[10px] tracking-wider uppercase bg-gold/5 hover:bg-gold hover:text-nearblack transition-all duration-300"
                >
                  <ExternalLink size={10} />
                  Documentation
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
