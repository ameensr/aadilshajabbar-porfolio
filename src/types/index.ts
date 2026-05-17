export interface Innovation {
  id: string;
  ghostNumber: string;
  name: string;
  tagline: string;
  status: "Commercially Sold" | "Prototype Built" | "In Development" | "Concept";
  icon: string;
  description: string;
  tags: string[];
  image?: string; // Optional uploaded image (Base64 string)
  additionalImages?: string[]; // Optional secondary images
  externalLink?: string;
  custom?: boolean; // Set to true if added via admin panel
}
