import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/ui/LoadingScreen";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
});

const dmmono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dmmono",
});

export const metadata: Metadata = {
  title: "Aadil Sha Jabbar | Mechanical Engineer & Product Innovator",
  description: "Mechanical Engineer & Product Innovator specializing in QA/QC coordination, refrigeration engineering, and full product cycles (concept to commercial manufacture and market sale) on major ADNOC projects.",
  keywords: [
    "Aadil Sha Jabbar",
    "Mechanical Engineer",
    "Product Innovator",
    "Sharjah UAE",
    "ADNOC",
    "QA QC Coordination",
    "Refrigeration Engineer",
    "Dynamic Electro Scooter",
    "SANFOOT",
    "TRIFY",
    "OSTOV",
    "D'CARB"
  ],
  authors: [{ name: "Aadil Sha Jabbar" }],
  openGraph: {
    title: "Aadil Sha Jabbar | Mechanical Engineer & Product Innovator",
    description: "Mechanical Engineer specializing in QA/QC, refrigeration systems, and product innovation in UAE.",
    url: "https://aadilsha.com",
    siteName: "Aadil Sha Jabbar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadil Sha Jabbar | Mechanical Engineer & Product Innovator",
    description: "Mechanical Engineer specializing in QA/QC, refrigeration systems, and product innovation in UAE.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmsans.variable} ${dmmono.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased min-h-screen relative selection:bg-gold selection:text-nearblack bg-nearblack text-offwhite overflow-x-hidden">
        {/* Grain overlay for luxury editorial paper feel */}
        <div className="noise-overlay" />
        
        {/* ASJ custom page load transition screen */}
        <LoadingScreen />
        
        {children}
      </body>
    </html>
  );
}
