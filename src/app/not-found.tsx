"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-nearblack overflow-hidden px-6">
      {/* Fine grid background overlay */}
      <div className="absolute inset-0 bg-size-[60px_60px] bg-[linear-gradient(to_right,rgba(201,168,76,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,168,76,0.015)_1px,transparent_1px)] pointer-events-none" />
      
      {/* Editorial aesthetic lines */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-gold/10 to-transparent pointer-events-none" />

      <div className="relative text-center max-w-lg z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Status Label */}
          <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase mb-4">
            Error 404 · Scope Missing
          </span>

          {/* Large Editorial Headline */}
          <h1 className="text-8xl md:text-9xl font-serif italic text-offwhite/10 select-none leading-none font-bold mb-4">
            Void
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-serif text-offwhite font-medium mb-6 italic">
            &ldquo;I don&apos;t wait for a map. But this path is empty.&rdquo;
          </h2>

          <p className="font-sans text-sm md:text-base text-offwhite/60 mb-8 leading-relaxed">
            The page you are looking for has been decommissioned, relocated, or did not pass inspection under the current scope parameters. Let&apos;s redirect back to the central hub.
          </p>

          {/* Back Home CTA Button */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gold text-gold font-mono text-xs tracking-wider uppercase bg-gold/5 hover:bg-gold hover:text-nearblack transition-all duration-300"
            >
              <MoveLeft size={14} />
              Return to Hub
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Decorative spinning orbit vector */}
      <div className="absolute -bottom-48 -right-48 w-96 h-96 border border-gold/5 rounded-full pointer-events-none animate-spin-slow" />
    </main>
  );
}
