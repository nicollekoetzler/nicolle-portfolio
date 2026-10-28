import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // GoDaddy's parking page sent visitors to /lander before the domain pointed here
    return [
      { source: "/lander", destination: "/", permanent: false },
      // the new style was previewed at /v2 before it became the homepage
      { source: "/v2", destination: "/", permanent: true },
      // the new Case Connector presentation was previewed here before it replaced the case study
      { source: "/case-connector/presentation", destination: "/case-connector", permanent: false },
    ];
  },
};

export default nextConfig;
