import type { Config } from "tailwindcss";

const withOpacity = (variableName: string): any => {
  return (({ opacityValue }: { opacityValue?: any }) => {
    return opacityValue 
      ? `rgba(var(${variableName}), ${opacityValue})` 
      : `rgb(var(${variableName}))`;
  }) as any;
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: withOpacity("--color-navy"),
          dark: withOpacity("--color-navy-dark"),
        },
        nearblack: withOpacity("--color-nearblack"),
        gold: {
          DEFAULT: withOpacity("--color-gold"),
          light: withOpacity("--color-gold-light"),
          dark: withOpacity("--color-gold-dark"),
        },
        offwhite: withOpacity("--color-offwhite"),
        emerald: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        luxegrey: {
          DEFAULT: withOpacity("--color-luxegrey"),
          light: withOpacity("--color-luxegrey-light"),
          dark: withOpacity("--color-luxegrey-dark"),
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "DM Sans", "sans-serif"],
        mono: ["var(--font-dmmono)", "DM Mono", "Courier New", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "orbit": "orbit 20s linear infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "spin-slow": "spin 30s linear infinite",
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
