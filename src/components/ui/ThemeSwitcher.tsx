"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Terminal, Sparkles, LucideIcon } from "lucide-react";

type ThemeName = "light" | "dark" | "slate" | "aurora";

interface ThemeOption {
  id: ThemeName;
  name: string;
  shortName: string;
  icon: LucideIcon;
  colorClass: string;
  accentColor: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "light",
    name: "Warm Luxury",
    shortName: "Luxury",
    icon: Sun,
    colorClass: "text-[#B89230]",
    accentColor: "bg-[#B89230]",
  },
  {
    id: "dark",
    name: "Deep Obsidian",
    shortName: "Obsidian",
    icon: Moon,
    colorClass: "text-[#C9A84C]",
    accentColor: "bg-[#C9A84C]",
  },
  {
    id: "slate",
    name: "Tech Minimal",
    shortName: "Minimal",
    icon: Terminal,
    colorClass: "text-[#38BDF8]",
    accentColor: "bg-[#38BDF8]",
  },
  {
    id: "aurora",
    name: "Aurora Matrix",
    shortName: "Aurora",
    icon: Sparkles,
    colorClass: "text-[#10B981]",
    accentColor: "bg-[#10B981]",
  },
];

// Helper to safely execute theme changes globally
const applyThemeClass = (newTheme: ThemeName) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  
  // Remove existing themes
  THEME_OPTIONS.forEach((option) => {
    root.classList.remove(`theme-${option.id}`);
  });
  
  // Add new theme
  root.classList.add(`theme-${newTheme}`);
};

export default function ThemeSwitcher({ showText = false }: { showText?: boolean }) {
  const [activeTheme, setActiveTheme] = useState<ThemeName>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 1. Detect and load saved theme on mount
    const savedTheme = localStorage.getItem("theme") as ThemeName;
    if (savedTheme && THEME_OPTIONS.some((o) => o.id === savedTheme)) {
      setActiveTheme(savedTheme);
      applyThemeClass(savedTheme);
    } else {
      setActiveTheme("dark");
      applyThemeClass("dark");
    }

    // 2. Define global setTheme function on window to handle any external or native calls
    const handleGlobalSetTheme = (themeName: ThemeName) => {
      if (!THEME_OPTIONS.some((o) => o.id === themeName)) return;
      
      // Update state, save to localStorage and apply CSS class
      localStorage.setItem("theme", themeName);
      applyThemeClass(themeName);
      
      // Dispatch custom event to notify other instances/components
      const event = new CustomEvent("themechange", { detail: themeName });
      window.dispatchEvent(event);
    };

    // Expose globally
    (window as any).setTheme = handleGlobalSetTheme;

    // 3. Listen to the custom event to sync multiple instances or external changes reactively
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeName>;
      if (customEvent.detail && THEME_OPTIONS.some((o) => o.id === customEvent.detail)) {
        setActiveTheme(customEvent.detail);
      }
    };

    window.addEventListener("themechange", handleThemeChange);
    return () => {
      window.removeEventListener("themechange", handleThemeChange);
    };
  }, []);

  const selectTheme = (themeName: ThemeName) => {
    if (typeof window !== "undefined" && (window as any).setTheme) {
      (window as any).setTheme(themeName);
    } else {
      // Fallback if window method not yet bound
      localStorage.setItem("theme", themeName);
      applyThemeClass(themeName);
      setActiveTheme(themeName);
    }
  };

  // Don't render until client-side hydration is complete to prevent layout mismatches
  if (!mounted) return null;

  return (
    <div className="relative flex items-center p-1 bg-luxegrey-dark/40 border border-gold/10 rounded-full select-none backdrop-blur-md">
      {THEME_OPTIONS.map((theme) => {
        const Icon = theme.icon;
        const isActive = activeTheme === theme.id;
        
        return (
          <button
            key={theme.id}
            onClick={() => selectTheme(theme.id)}
            title={theme.name}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${
              isActive 
                ? "text-nearblack font-bold" 
                : "text-offwhite/50 hover:text-offwhite"
            }`}
          >
            {/* Sliding Active Pill Background Accent */}
            {isActive && (
              <motion.div
                layoutId="activeThemeHighlight"
                className={`absolute inset-0 rounded-full -z-10 ${theme.accentColor} opacity-95`}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            
            <Icon size={10} className={isActive ? "text-nearblack" : theme.colorClass} />
            {showText && <span className="hidden md:inline">{theme.shortName}</span>}
          </button>
        );
      })}
    </div>
  );
}
