import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // GoDaddy's parking page sent visitors to /lander before the domain pointed here
    return [{ source: "/lander", destination: "/", permanent: false }];
  },
};

export default nextConfig;
