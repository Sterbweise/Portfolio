import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://kchndz.dev",
  outDir: "./dist",
  build: {
    format: "file", // Generate clean URLs without .html extensions
    inlineStylesheets: "auto", // Inline small stylesheets for better performance
  },
  // Static generation (SSG)
  output: "static",
  integrations: [
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  prefetch: true, // Enable built-in prefetching
  compressHTML: true, // Minify HTML output
  vite: {
    build: {
      // Optimize chunk splitting
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Better caching with content hashes
          assetFileNames: "_astro/[name].[hash][extname]",
          chunkFileNames: "_astro/[name].[hash].js",
          entryFileNames: "_astro/[name].[hash].js",
        },
      },
    },
  },
});
