/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  serverExternalPackages: [
    "axe-core",
    "@axe-core/puppeteer",
    "@sparticuz/chromium",
    "puppeteer-core"
  ]
};

export default nextConfig;
