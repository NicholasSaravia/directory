/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zgrhkytyuidxhjzijnqm.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
