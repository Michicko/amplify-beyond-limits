/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  images: {
    loader: "akamai",
    path: "/",
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
