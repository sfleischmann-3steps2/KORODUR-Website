import type { NextConfig } from "next";

// basePath aus derselben Env-Var wie lib/basePath.ts (Launch-Plan M1/B6):
// GitHub Pages setzt NEXT_PUBLIC_BASE_PATH=/KORODUR-Website im Workflow,
// ein Build für die eigene Domain (Cutover) lässt die Variable leer.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
