/**
 * Aadil Sha Jabbar - Portfolio Configuration
 * Use this file to easily manage your Dynamic CV download links, contact details, and social links.
 */
export const portfolioConfig = {
  cv: {
    // Paste your Google Drive sharing link here!
    // Example: "https://drive.google.com/file/d/18r6fB74qg_Y_T_rExHhQ_O2y4S9eJ0gU/view?usp=sharing"
    // The portfolio will automatically convert it into a direct download link!
    googleDriveLink: "https://drive.google.com/file/d/1vPo4MQIT2yRy24DBEJRdgazfWwVb02QS/view?usp=drive_link",

    // Local PDF file under the /public directory as a backup
    localPdfFallback: "/Aadil_Sha_Jabbar_CV.pdf",

    // Choose whether to download from Google Drive ("drive") or use local PDF ("local")
    source: "drive" as "drive" | "local",
  },

  // Contact Details
  contact: {
    email: "aadilshajabbar@gmail.com",
    location: "Sharjah, UAE",
  },

  // Social Links
  socials: {
    linkedin: "https://linkedin.com/in/aadil-sha-jabbar",
    github: "https://github.com/ameensr/aadilshajabbar-porfolio",
  }
};

/**
 * Helper utility to determine the correct CV download link.
 * If source is "drive", it extracts the file ID from a Google Drive sharing link
 * and converts it into a direct download link automatically.
 */
export function getCvDownloadLink(basePath: string): string {
  if (portfolioConfig.cv.source === "drive" && portfolioConfig.cv.googleDriveLink) {
    const driveLink = portfolioConfig.cv.googleDriveLink;

    // Regular expression to extract the Google Drive file ID
    const match = driveLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return driveLink;
  }

  // Fallback to local PDF path
  return `${basePath}${portfolioConfig.cv.localPdfFallback}`;
}
