"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the page has already been loaded in this session to prevent constant loading screens
    const hasLoaded = sessionStorage.getItem("portfolio-loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("portfolio-loaded", "true");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-nearblack"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-size-[40px_40px] bg-[linear-gradient(to_right,rgba(201,168,76,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,168,76,0.015)_1px,transparent_1px)] pointer-events-none" />

          <div className="relative flex flex-col items-center">
            {/* Spinning elegant orbit ring around initials */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-28 h-28 border border-dashed border-gold/30 rounded-full flex items-center justify-center"
            >
              {/* Gold dot on the orbit ring */}
              <div className="absolute top-0 left-1/2 -ml-1.5 w-3 h-3 bg-gold rounded-full shadow-[0_0_10px_#C9A84C]" />
            </motion.div>

            {/* Initials Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-serif tracking-widest text-gold font-bold italic"
              >
                ASJ
              </motion.span>
            </div>

            {/* Bottom Tagline Animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-xs font-mono text-offwhite/50 tracking-[0.25em] uppercase text-center"
            >
              Engineer · Product Innovator
            </motion.div>

            {/* Elegant loading progress line */}
            <div className="w-32 h-[1px] bg-gold/10 mt-4 overflow-hidden rounded-full relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
