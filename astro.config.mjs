import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://kchndz.dev", // Update with your actual domain
  outDir: "./dist",
  build: {
    format: "file", // Generate clean URLs without .html extensions
  },
  // This ensures static generation (SSG)
  output: "static",
  integrations: [mdx()],
  prefetch: true, // Enable built-in prefetching
});
