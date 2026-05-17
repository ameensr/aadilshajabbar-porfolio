"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowDownToLine, Globe } from "lucide-react";
import { getCvDownloadLink } from "@/config/portfolio";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const basePath =
    typeof window !== "undefined"
      ? (window.location.pathname.includes("/aadilshajabbar-porfolio") ? "/aadilshajabbar-porfolio" : "")
      : (process.env.GITHUB_ACTIONS === "true" ? "/aadilshajabbar-porfolio" : "");

  const navItems = [
    { label: "Profile", id: "about" },
    { label: "Innovations", id: "innovations" },
    { label: "Background", id: "history" },
    { label: "Capabilities", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Calculate active section based on scroll position
      const scrollPosition = window.scrollY + 100;
      const sections = ["hero", "about", "innovations", "history", "skills", "contact"];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-nearblack/90 backdrop-blur-md py-4 border-gold/15 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Initials */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            {/* Circular Avatar Type Logo */}
            <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center bg-gradient-to-br from-gold/15 to-navy/10 group-hover:border-gold/60 transition-all duration-300 overflow-hidden relative shadow-[0_0_10px_rgba(201,168,76,0.05)]">
              <svg 
                className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors duration-300" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <span className="font-serif text-xs font-black tracking-widest uppercase text-offwhite group-hover:text-gold transition-colors duration-300">
              Aadil Sha Jabbar
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-mono text-xs uppercase tracking-widest relative py-1 hover:text-gold transition-colors duration-300 ${
                  activeSection === item.id ? "text-gold font-bold" : "text-offwhite/60"
                }`}
              >
                {item.label}
                {/* Underline highlighting active section */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action Button: Dynamic Theme Switcher & Download CV */}
          <div className="hidden sm:flex items-center gap-4">
            <ThemeSwitcher />
            <a
              href={getCvDownloadLink(basePath)}
              download="Aadil_Sha_Jabbar_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 border border-gold/40 text-gold font-mono text-[10px] tracking-wider uppercase hover:border-gold hover:bg-gold hover:text-nearblack transition-all duration-300"
            >
              <ArrowDownToLine size={12} />
              Download CV
            </a>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-offwhite/85 hover:text-gold transition-colors duration-300"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Layer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-nearblack z-40 flex flex-col justify-between pt-32 pb-12 px-6"
          >
            {/* Background Grid Overlay */}
            <div className="absolute inset-0 bg-size-[40px_40px] bg-[linear-gradient(to_right,rgba(201,168,76,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,168,76,0.015)_1px,transparent_1px)] pointer-events-none" />

            <nav className="flex flex-col gap-8 text-center relative z-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-serif text-3xl italic hover:text-gold transition-colors duration-300 ${
                    activeSection === item.id ? "text-gold font-bold" : "text-offwhite/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex flex-col gap-6 items-center w-full max-w-xs relative z-10">
              <div className="flex flex-col gap-2 items-center w-full">
                <span className="font-mono text-[8px] text-offwhite/40 uppercase tracking-[0.15em]">Select System Theme</span>
                <ThemeSwitcher showText={true} />
              </div>
              
              <a
                href={getCvDownloadLink(basePath)}
                download="Aadil_Sha_Jabbar_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-gold text-gold font-mono text-xs tracking-wider uppercase hover:bg-gold hover:text-nearblack transition-all duration-300"
              >
                <ArrowDownToLine size={14} />
                Download CV
              </a>

              <span className="font-mono text-[9px] text-offwhite/30 tracking-[0.2em] uppercase">
                Sharjah, UAE · Mechanical Innovation
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
