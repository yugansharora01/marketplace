/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ivory-possible-rooster-796.mypinata.cloud",
        port: "",
        pathname: "/account123/**",
      },
    ],
    domains: ["ivory-possible-rooster-796.mypinata.cloud"],
  },
};

module.exports = nextConfig;
