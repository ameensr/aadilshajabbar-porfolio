const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGitHubPages ? '/aadilshajabbar-porfolio' : '',
  trailingSlash: true,
};

export default nextConfig;
