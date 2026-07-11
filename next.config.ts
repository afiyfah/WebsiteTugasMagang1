import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // StrictMode double-mounts components in dev, which tears down & recreates the
  // WebGL canvas -> "context lost" white flash on the 3D layer. Off so dev
  // matches production (the canvas mounts once).
  reactStrictMode: false,
};

export default nextConfig;
