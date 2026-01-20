---
title: "Modern Portfolio Website"
description: "High-performance, SEO-optimized portfolio website built with Astro featuring interactive carousels, dark mode, and dynamic content."
publishDate: "2025-12-08"
tags:
  [
    "Astro",
    "TypeScript",
    "MDX",
    "CSS",
    "Static Site Generation",
    "Web Development",
  ]
link: "https://github.com/Sterbweise/Portfolio"
linkText: "View on GitHub"
featured: true
visibility: public
githubStars: 0
downloads: 6
---

## Overview

This **Modern Portfolio Website** is a high-performance, static-generated portfolio built with Astro, showcasing professional experience, projects, achievements, and technical skills. Designed with a mobile-first approach, it combines cutting-edge web technologies with thoughtful UX design to create a fast, accessible, and visually appealing personal brand presence.

## The Challenge

Building a portfolio website that stands out requires balancing multiple competing priorities:

- **Performance vs Features** - Rich interactions without bloating the bundle size
- **SEO Optimization** - Static generation while maintaining dynamic content
- **Content Management** - Easy-to-update projects and blog posts without a CMS
- **Responsiveness** - Seamless experience across all devices and screen sizes
- **Developer Experience** - Fast builds, hot reload, and maintainable code structure

This project solves these challenges by leveraging Astro's Island Architecture and modern web standards.

## Key Features

### **Lightning-Fast Performance**

Built with performance as a priority:

- **Static Site Generation (SSG)** - Pre-rendered HTML for instant page loads
- **Zero JavaScript by Default** - Only ship JS where absolutely necessary
- **Optimized Images** - Automatic image optimization and lazy loading
- **Minimal Bundle Size** - < 50KB total JavaScript across the entire site

### **Interactive UI Components**

Custom-built components without heavy frameworks:

- **Achievement Carousel** - Smooth, touch-enabled carousel with keyboard navigation
- **Project Carousel** - Featured projects showcase with numbered indicators
- **Clickable Cards** - External link integration with visual feedback
- **Dark Mode Toggle** - System preference detection with manual override
- **Responsive Navigation** - Mobile-friendly menu with smooth transitions

### **Content Collections**

Leveraging Astro's Content Collections for type-safe content management:

- **Projects** - MDX-powered project documentation with rich formatting
- **Blog Posts** - Markdown articles with frontmatter metadata
- **Achievements** - Structured data for awards, certifications, and competitions
- **Experience** - Professional work history with skills and highlights

### **SEO & Analytics Ready**

Built for discoverability:

- **Semantic HTML** - Proper heading hierarchy and ARIA labels
- **Open Graph Tags** - Rich social media previews
- **Structured Data** - JSON-LD schema for search engines
- **Sitemap Generation** - Automatic XML sitemap
- **RSS Feed** - Blog post syndication

## Technical Stack

### Core Technologies

| Technology     | Purpose                | Why Chosen                                    |
| -------------- | ---------------------- | --------------------------------------------- |
| **Astro 4.x**  | Static site generator  | Best-in-class performance, zero JS by default |
| **TypeScript** | Type-safe development  | Enhanced DX, catch errors at compile time     |
| **MDX**        | Enhanced Markdown      | Component-rich documentation                  |
| **CSS3**       | Styling and animations | No framework overhead, modern CSS features    |

### Architecture Decisions

**Why Astro?**

- **Islands Architecture** - Ship interactive components only where needed
- **Content Collections** - Built-in type-safe content management
- **Fast Builds** - Vite-powered dev server with instant HMR
- **SEO First** - Static HTML generation with perfect meta tags

**Why Not Next.js/Nuxt?**

- No need for server-side rendering for a portfolio
- Astro produces smaller bundles with better performance
- Simpler deployment (static files only)
- Better SEO out of the box

## Project Structure

```
Portfolio/
├── public/                    # Static assets
│   ├── cv/                   # Resume/CV files (PDF)
│   ├── img/                  # Images and graphics
│   └── js/                   # Client-side scripts
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Shared components (Badge, Button, Card)
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   └── sections/        # Page sections (Hero, Projects, Skills)
│   ├── content/             # Content collections
│   │   ├── projects/        # Project MDX files
│   │   └── config.ts        # Collection schemas
│   ├── data/                # Static data files
│   │   ├── achievements.ts  # Awards and certifications
│   │   ├── experience.ts    # Work history
│   │   └── skills.ts        # Technical skills
│   ├── layouts/             # Page layouts
│   │   ├── BaseLayout.astro # Base HTML structure
│   │   └── MarkdownLayout.astro # MDX layout
│   ├── pages/               # Route pages
│   │   ├── index.astro      # Homepage
│   │   ├── projects/        # Project pages
│   │   ├── blog.astro       # Blog listing
│   │   └── services.astro   # Services page
│   ├── scripts/             # Utility scripts
│   ├── styles/              # Global styles
│   │   ├── global.css       # Base styles
│   │   └── themes.css       # Dark/light themes
│   └── types/               # TypeScript definitions
│       └── index.ts         # Type definitions
├── astro.config.mjs         # Astro configuration
└── package.json             # Dependencies
```

## Technical Implementation

### Component Architecture

**Achievement Cards with External Links**
Implemented clickable achievement cards that redirect to external platforms (Devpost, competition pages):

```typescript
// Type-safe achievement interface
export interface AchievementEntry {
  id: string;
  title: string;
  organization: string;
  location: string;
  badges: string[];
  description: string;
  highlights: string[];
  skills: string[];
  url?: string; // External link for clickable cards
}
```

Cards with URLs render as anchor tags with:

- External link indicator icon
- `target="_blank"` for new tab opening
- `rel="noopener noreferrer"` for security
- Hover animations with accent color highlighting

### Content Collections Schema

Type-safe content management with Zod validation:

```typescript
import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    tags: z.array(z.string()),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
    visibility: z.enum(["public", "private"]),
  }),
});
```

## Responsive Design Strategy

### Mobile-First Approach

**Breakpoints**:

```css
/* Mobile: < 768px (default) */
/* Tablet: 768px - 1024px */
@media (min-width: 768px) {
  ...;
}

/* Desktop: > 1024px */
@media (min-width: 1024px) {
  ...;
}
```

**Touch Optimization**:

- Larger tap targets (48x48px minimum)
- Swipe gestures for carousels
- No hover-dependent functionality
- Touch-friendly spacing

### Accessibility Features

- **Semantic HTML** - Proper `<section>`, `<article>`, `<nav>` usage
- **ARIA Labels** - Descriptive labels for screen readers
- **Keyboard Navigation** - Full keyboard support for interactive elements
- **Color Contrast** - WCAG AA compliant contrast ratios
- **Focus Management** - Visible focus indicators
- **Alt Text** - Comprehensive image descriptions

## Deployment

### Cloudflare Pages Configuration

**Build Settings**:

```yaml
Build command: npm run build
Build output directory: dist
Node.js version: 18
```

**Advantages**:

- ✅ Free SSL certificates
- ✅ Global CDN distribution
- ✅ Automatic deployments from Git
- ✅ Preview deployments for PRs
- ✅ Analytics and Web Vitals tracking

### Build Process

```bash
# Development
npm run dev          # Start dev server at localhost:4321

# Production build
npm run build        # Generate static files to ./dist/

# Preview build locally
npm run preview      # Test production build
```

**Build Output**:

- Static HTML files for all routes
- Optimized CSS bundles
- Minimal JavaScript chunks
- Compressed assets
- Generated sitemap

## Development Experience

### Hot Module Replacement

Instant updates during development:

- Astro components: < 50ms refresh
- CSS changes: Injected without page reload
- TypeScript: Fast type checking with isolatedModules

### Type Safety

**Strict TypeScript Configuration**:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

All data structures are fully typed for enhanced DX.

### Code Organization

**Modular Components**:

- Each component handles a single responsibility
- Reusable primitives (Badge, Button, Card)
- Composed sections (Hero, Projects, Skills)

**Data Separation**:

- Content in `/src/content/` collections
- Configuration in `/src/data/` TypeScript files
- Styles in component-scoped `<style>` tags

## Lessons Learned

### What Went Well

✅ **Astro's Performance** - Exceeded expectations with near-zero JavaScript overhead

✅ **Type Safety** - TypeScript caught numerous bugs during development

✅ **Content Collections** - Made content management seamless and type-safe

✅ **Dark Mode** - CSS custom properties made theming straightforward

✅ **Deployment** - Cloudflare Pages deployment was trivially easy

### Challenges Overcome

- **Carousel Implementation** - Built custom vanilla JS carousel instead of importing heavy libraries
- **MDX Compatibility** - Learned Astro's component passing patterns for MDX
- **SEO Optimization** - Properly structured metadata and schema markup
- **Responsive Design** - Balanced desktop richness with mobile simplicity

## Resources & Links

- **Live Site**: [https://sterbweise.dev](https://sterbweise.dev)
- **Repository**: [github.com/Sterbweise/Portfolio](https://github.com/Sterbweise/Portfolio)
- **Astro Documentation**: [docs.astro.build](https://docs.astro.build)
- **Cloudflare Pages**: [pages.cloudflare.com](https://pages.cloudflare.com)

---

**Project Status**: Active Development | **Framework**: Astro 4.x
