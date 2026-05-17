"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Innovations from "@/components/sections/Innovations";
import Timeline from "@/components/sections/Timeline";
import SkillsCertifications from "@/components/sections/SkillsCertifications";
import Contact from "@/components/sections/Contact";
import AdminModal from "@/components/admin/AdminModal";
import ProjectDetailsModal from "@/components/ui/ProjectDetailsModal";
import { Innovation } from "@/types";

// Static Default Innovations
const DEFAULT_INNOVATIONS: Innovation[] = [
  {
    id: "sanfoot",
    ghostNumber: "01",
    name: "SANFOOT | Multi-Mode Sanitizer Dispenser",
    tagline: "Product Design · Manufacturing · Sensor Tech · Commercial Sale",
    status: "Commercially Sold",
    icon: "💧",
    description:
      "Designed and manufactured during COVID-19. Combined sensor-activated, manual, and advertisement display functions in a single unit. Taken from concept to commercial manufacture and market sale — fully independently managed.",
    tags: ["Product Design", "Manufacturing", "Sensor Tech", "Commercial Sale"],
  },
  {
    id: "trify",
    ghostNumber: "02",
    name: "TRIFY | Personal Self-Defence Tool",
    tagline: "Safety Engineering · Ergonomics · Manufacturing · UAE Market",
    status: "Commercially Sold",
    icon: "🛡️",
    description:
      "A compact personal safety device designed for real-world use. Brought to full commercial manufacture and sale in the UAE. Required precision ergonomic design, safety compliance thinking, and end-to-end delivery management.",
    tags: ["Safety Engineering", "Ergonomics", "Manufacturing", "UAE Market"],
  },
  {
    id: "dynamic",
    ghostNumber: "03",
    name: "DYNAMIC | Energy-Regenerating Electric Scooter",
    tagline: "Energy Systems · Electromechanical · Patent Filed · Prototype",
    status: "Prototype Built",
    icon: "⚡",
    description:
      "A treadmill-integrated electric scooter with kinetic energy regeneration — converting human movement into electricity. Working prototype developed. Patent Application No: 381521001. Reflects deep interest in energy efficiency systems.",
    tags: ["Energy Systems", "Electromechanical", "Patent Filed", "Prototype"],
  },
  {
    id: "ostov",
    ghostNumber: "04",
    name: "OSTOV | Waste-Oil Powered Cooking Stove",
    tagline: "Thermal Systems · Kitchen Equipment · Waste Energy · Sustainability",
    status: "Prototype Built",
    icon: "🔥",
    description:
      "A professional cooking stove powered entirely by waste oil — converting industrial waste into usable cooking energy. Working prototype completed. Combines thermal systems, combustion engineering, and professional kitchen equipment design.",
    tags: ["Thermal Systems", "Kitchen Equipment", "Waste Energy", "Sustainability"],
  },
  {
    id: "dcarb",
    ghostNumber: "05",
    name: "D'CARB | Decarbonisation Through Algae",
    tagline: "Sustainability · Carbon Capture · Green Engineering · R&D",
    status: "In Development",
    icon: "🌿",
    description:
      "An ongoing sustainability concept using algae-based systems for industrial carbon capture and decarbonisation. Reflects long-term commitment to green engineering and environmental responsibility in manufacturing.",
    tags: ["Sustainability", "Carbon Capture", "Green Engineering", "R&D"],
  },
];

export default function Home() {
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Innovation | null>(null);

  // Load custom projects from localStorage
  useEffect(() => {
    // Initial load including both default static items and any localstorage items
    const loadProjects = () => {
      try {
        const stored = localStorage.getItem("innovator-projects");
        if (stored) {
          const parsed: Innovation[] = JSON.parse(stored);
          // Combine defaults and custom items
          setInnovations([...DEFAULT_INNOVATIONS, ...parsed]);
        } else {
          setInnovations(DEFAULT_INNOVATIONS);
        }
      } catch (err) {
        console.error("Error loading localStorage innovations", err);
        setInnovations(DEFAULT_INNOVATIONS);
      }
    };

    loadProjects();
  }, []);

  // Callback: Add dynamic project
  const handleAddProject = (newProj: Innovation) => {
    try {
      const stored = localStorage.getItem("innovator-projects");
      const currentStored: Innovation[] = stored ? JSON.parse(stored) : [];
      
      // Calculate ghost number based on total index
      const totalCount = DEFAULT_INNOVATIONS.length + currentStored.length + 1;
      const formattedGhost = totalCount < 10 ? `0${totalCount}` : `${totalCount}`;
      
      const configuredProj = { ...newProj, ghostNumber: formattedGhost };
      
      const newStoredList = [...currentStored, configuredProj];
      localStorage.setItem("innovator-projects", JSON.stringify(newStoredList));
      
      // Update state
      setInnovations([...DEFAULT_INNOVATIONS, ...newStoredList]);
    } catch (err) {
      console.error("Error adding project to localStorage", err);
    }
  };

  return (
    <main className="relative min-h-screen bg-nearblack">
      {/* Sticky Navigation Bar */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Innovations Section */}
      <Innovations
        innovations={innovations}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Timeline Section */}
      <Timeline />

      {/* Skills & Accreditations Section */}
      <SkillsCertifications />

      {/* Contact Section */}
      <Contact />

      {/* Full Screen Form Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onAddProject={handleAddProject}
      />

      {/* Project Specifications Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating "+ Add Project" Button on bottom right */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 px-4 py-3 bg-gold border border-gold hover:bg-transparent text-nearblack hover:text-gold font-mono text-[10px] tracking-wider uppercase font-bold transition-all duration-300 rounded-none shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:shadow-none"
      >
        <Plus size={14} />
        Add Project
      </button>

      {/* Elegant Editorial Footer */}
      <footer className="border-t border-gold/10 bg-navy-dark py-12 px-6 text-center text-offwhite/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="font-serif text-sm font-bold text-offwhite italic block">
              Aadil Sha Jabbar
            </span>
            <span className="font-mono text-[8px] uppercase tracking-widest block mt-1">
              Mechanical Engineer · Product Innovator
            </span>
          </div>

          <p className="font-mono text-[9px] uppercase tracking-widest">
            Designed with luxury editorial precision · Built with Next.js & Framer Motion
          </p>

          <span className="font-mono text-[9px] uppercase tracking-widest">
            © {new Date().getFullYear()} · Sharjah, UAE
          </span>
        </div>
      </footer>
    </main>
  );
}
