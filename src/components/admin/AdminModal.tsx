"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Plus, AlertCircle, Link2, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { Innovation } from "@/types";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Innovation) => void;
}

export default function AdminModal({ isOpen, onClose, onAddProject }: AdminModalProps) {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [status, setStatus] = useState<Innovation["status"]>("Commercially Sold");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [icon, setIcon] = useState("💡");
  
  // File Upload State (Base64)
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [mainImageName, setMainImageName] = useState("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOverMain, setIsDragOverMain] = useState(false);
  const [isDragOverMulti, setIsDragOverMulti] = useState(false);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // File to Base64 converter
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const processMainImage = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, mainImage: "Image must be under 2MB." }));
      return;
    }
    try {
      const base64 = await convertToBase64(file);
      setMainImage(base64);
      setMainImageName(file.name);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.mainImage;
        return copy;
      });
    } catch (err) {
      setErrors((prev) => ({ ...prev, mainImage: "Error reading image file." }));
    }
  };

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processMainImage(file);
    }
  };

  const processMultiImages = async (files: FileList) => {
    const converted: string[] = [];
    const limit = Math.min(files.length, 5 - additionalImages.length);
    
    for (let i = 0; i < limit; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 2 * 1024 * 1024) continue;
      try {
        const base64 = await convertToBase64(file);
        converted.push(base64);
      } catch (err) {
        console.error("Error reading file", err);
      }
    }
    
    setAdditionalImages((prev) => [...prev, ...converted]);
  };

  const handleMultiImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      await processMultiImages(files);
    }
  };

  // Drag and Drop handlers
  const handleDragOverMain = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverMain(true);
  };

  const handleDragLeaveMain = () => {
    setIsDragOverMain(false);
  };

  const handleDropMain = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverMain(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      await processMainImage(file);
    } else if (file) {
      setErrors((prev) => ({ ...prev, mainImage: "Dropped file must be a valid image." }));
    }
  };

  const handleDragOverMulti = (e: React.DragEvent) => {
    e.preventDefault();
    if (additionalImages.length < 5) {
      setIsDragOverMulti(true);
    }
  };

  const handleDragLeaveMulti = () => {
    setIsDragOverMulti(false);
  };

  const handleDropMulti = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverMulti(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processMultiImages(files);
    }
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) tempErrors.name = "Project name is required.";
    if (!tagline.trim()) tempErrors.tagline = "Tagline is required.";
    if (!description.trim()) tempErrors.description = "Description is required.";
    if (!tagsInput.trim()) tempErrors.tags = "At least one tag is required.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Format tags from comma-separated input
    const tagsArray = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    // Icons mapper based on status
    const statusIcons: Record<Innovation["status"], string> = {
      "Commercially Sold": "✓",
      "Prototype Built": "⬡",
      "In Development": "◯",
      "Concept": "💡",
    };

    // Selected or custom emoji
    const finalIcon = icon || statusIcons[status] || "💡";

    const newProject: Innovation = {
      id: `custom-${Date.now()}`,
      ghostNumber: "NEW",
      name: name.trim(),
      tagline: tagline.trim(),
      status,
      icon: finalIcon,
      description: description.trim(),
      tags: tagsArray,
      image: mainImage || undefined,
      additionalImages: additionalImages.length > 0 ? additionalImages : undefined,
      externalLink: externalLink.trim() || undefined,
      custom: true,
    };

    // Add brief artificial validation delay for luxury feels
    setTimeout(() => {
      onAddProject(newProject);
      setIsSubmitting(false);
      
      // Fire premium full screen confetti blast!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#C9A84C", "#0D2137", "#F5F2ED", "#10B981"],
      });

      // Clear Form state
      setName("");
      setTagline("");
      setDescription("");
      setTagsInput("");
      setExternalLink("");
      setMainImage(null);
      setMainImageName("");
      setAdditionalImages([]);
      setIcon("💡");
      
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-nearblack/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          {/* Noise/Grid overlay for luxury visuals */}
          <div className="absolute inset-0 bg-size-[60px_60px] bg-[linear-gradient(to_right,rgba(201,168,76,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,168,76,0.015)_1px,transparent_1px)] pointer-events-none" />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-navy-dark border border-gold/25 p-6 sm:p-10 shadow-[0_0_50px_rgba(201,168,76,0.15)] max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/10 pb-6 mb-8">
              <div>
                <span className="font-mono text-xs text-gold uppercase tracking-[0.25em] block mb-1">
                  Scope Access · Portals
                </span>
                <h2 className="text-3xl font-serif italic text-offwhite font-bold leading-none">
                  Mount New <span className="font-serif italic font-normal text-gold">Innovation</span>
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 border border-gold/20 hover:border-gold text-offwhite/70 hover:text-gold transition-colors duration-300 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Name */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-offwhite/60">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. DYNAMIC scooter"
                    className="w-full bg-nearblack border border-gold/20 focus:border-gold px-4 py-3 text-sm text-offwhite focus:outline-none transition-colors duration-300"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Subtitle / Tagline */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-offwhite/60">
                    Tagline / Subtitle *
                  </label>
                  <input
                    type="text"
                    required
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Energy-Regenerating Electric Scooter"
                    className="w-full bg-nearblack border border-gold/20 focus:border-gold px-4 py-3 text-sm text-offwhite focus:outline-none transition-colors duration-300"
                  />
                  {errors.tagline && (
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.tagline}
                    </span>
                  )}
                </div>

                {/* Status Dropdown */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-offwhite/60">
                    Status Badge *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Innovation["status"])}
                    className="w-full bg-nearblack border border-gold/20 focus:border-gold px-4 py-3 text-sm text-offwhite focus:outline-none transition-colors duration-300 cursor-pointer"
                  >
                    <option value="Commercially Sold">✓ Commercially Sold</option>
                    <option value="Prototype Built">⬡ Prototype Built</option>
                    <option value="In Development">◯ In Development</option>
                    <option value="Concept">💡 Concept</option>
                  </select>
                </div>

                {/* Icon Selection Emoji */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-offwhite/60">
                    Project Icon Emoji *
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="e.g. ⚡, 💧, 🛡️"
                    className="w-full bg-nearblack border border-gold/20 focus:border-gold px-4 py-3 text-sm text-offwhite focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Description textarea */}
              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-wider text-offwhite/60">
                  Description Paragraph *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Elaborate on the concept, components constructed, and testing parameters..."
                  className="w-full bg-nearblack border border-gold/20 focus:border-gold px-4 py-3 text-sm text-offwhite focus:outline-none transition-colors duration-300 resize-y"
                />
                {errors.description && (
                  <span className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.description}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tags input (comma separated) */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-offwhite/60">
                    Tags (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Product Design, Sensor Tech, Manufacturing"
                    className="w-full bg-nearblack border border-gold/20 focus:border-gold px-4 py-3 text-sm text-offwhite focus:outline-none transition-colors duration-300"
                  />
                  {errors.tags && (
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.tags}
                    </span>
                  )}
                </div>

                {/* External Link */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-offwhite/60 flex items-center gap-1.5">
                    <Link2 size={10} className="text-gold" />
                    External Link (Optional URL)
                  </label>
                  <input
                    type="url"
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    placeholder="https://example.com/project-documentation"
                    className="w-full bg-nearblack border border-gold/20 focus:border-gold px-4 py-3 text-sm text-offwhite focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              {/* UPLOAD LAYERS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                
                {/* Primary Drag & Drop Image Uploader */}
                <div className="space-y-3">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-offwhite/60">
                    Primary Cover Image Upload
                  </label>
                  
                  <div
                    onClick={() => mainFileInputRef.current?.click()}
                    onDragOver={handleDragOverMain}
                    onDragLeave={handleDragLeaveMain}
                    onDrop={handleDropMain}
                    className={`border border-dashed p-6 text-center cursor-pointer transition-all duration-300 relative group min-h-[140px] flex flex-col justify-center items-center ${
                      isDragOverMain
                        ? "border-gold bg-gold/5 shadow-[0_0_15px_rgba(201,168,76,0.15)]"
                        : "border-gold/20 hover:border-gold/60 bg-nearblack/40 hover:bg-nearblack/70"
                    }`}
                  >
                    <input
                      type="file"
                      ref={mainFileInputRef}
                      onChange={handleMainImageChange}
                      accept="image/png, image/jpeg, image/webp"
                      className="hidden"
                    />
                    
                    {mainImage ? (
                      <div className="space-y-2">
                        <CheckCircle2 size={24} className="text-emerald mx-auto" />
                        <span className="font-mono text-[10px] text-offwhite block truncate max-w-[250px]">
                          {mainImageName}
                        </span>
                        <span className="font-mono text-[8px] text-gold uppercase block">
                          Click or Drop to Replace Cover
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fade-up">
                        <Upload size={24} className="text-gold/40 group-hover:text-gold mx-auto transition-colors duration-300" />
                        <span className="font-sans text-xs text-offwhite/50 block">
                          Drag cover file or click to select
                        </span>
                        <span className="font-mono text-[8px] text-offwhite/30 uppercase block">
                          JPG, PNG, WebP (Max 2MB)
                        </span>
                      </div>
                    )}
                  </div>
                  {errors.mainImage && (
                    <span className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.mainImage}
                    </span>
                  )}
                </div>

                {/* Additional Images Multi-Uploader */}
                <div className="space-y-3">
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-offwhite/60">
                    Additional Media Attachments (Up to 5)
                  </label>
                  
                  <div
                    onClick={() => {
                      if (additionalImages.length < 5) {
                        multiFileInputRef.current?.click();
                      }
                    }}
                    onDragOver={handleDragOverMulti}
                    onDragLeave={handleDragLeaveMulti}
                    onDrop={handleDropMulti}
                    className={`border border-dashed p-6 text-center transition-all duration-300 relative group min-h-[140px] flex flex-col justify-center items-center ${
                      additionalImages.length >= 5
                        ? "border-emerald/30 bg-emerald/5 cursor-not-allowed"
                        : isDragOverMulti
                        ? "border-gold bg-gold/5 shadow-[0_0_15px_rgba(201,168,76,0.15)] cursor-pointer"
                        : "border-gold/20 hover:border-gold/60 bg-nearblack/40 hover:bg-nearblack/70 cursor-pointer"
                    }`}
                  >
                    <input
                      type="file"
                      ref={multiFileInputRef}
                      onChange={handleMultiImageChange}
                      multiple
                      accept="image/png, image/jpeg, image/webp"
                      className="hidden"
                      disabled={additionalImages.length >= 5}
                    />
                    
                    <div className="space-y-2">
                      <Plus size={24} className="text-gold/40 group-hover:text-gold mx-auto transition-colors duration-300" />
                      <span className="font-sans text-xs text-offwhite/50 block">
                        {additionalImages.length > 0
                          ? `Attached: ${additionalImages.length} images`
                          : "Upload supplementary design schematics"}
                      </span>
                      <span className="font-mono text-[8px] text-offwhite/30 uppercase block">
                        {additionalImages.length >= 5
                          ? "Maximum attachments reached"
                          : `Drag files or click (Limit: ${5 - additionalImages.length} slots remaining)`}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Submit Buttons */}
              <div className="border-t border-gold/10 pt-8 flex flex-col sm:flex-row items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 border border-gold/20 text-offwhite/70 hover:text-gold font-mono text-xs tracking-wider uppercase transition-colors duration-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-gold border border-gold text-nearblack font-mono text-xs tracking-wider uppercase font-bold hover:bg-transparent hover:text-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Mounting scope..." : "Add to Portfolio"}
                </button>
              </div>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
