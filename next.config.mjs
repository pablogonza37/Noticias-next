/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.politico.com",
      },
      {
        protocol: "https",
        hostname: "**.dcrainmaker.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.wp.com",
      },
      {
        protocol: "https",
        hostname: "**.washingtonpost.com",
      },
      {
        protocol: "https",
        hostname: "**", // fallback: cualquier otro dominio
      },
    ],
  },
};

export default nextConfig;

