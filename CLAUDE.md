# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual portfolio website with integrated blog system. The site is built with vanilla HTML/CSS/JavaScript and features a component-based architecture, internationalization (i18n), and a Markdown-based blog system.

## Development Commands

### Blog Article Management
```bash
# Generate article list after adding new .md files to articles/
npm run generate-articles
# or
node generate-articles-list.js
```

### Local Development Server
```bash
# Do not start an server There is already an Live Http server running taking all the modification in real time listening on the 127.0.0.1:5500
```

### Adding New Blog Articles
1. Create a `.md` file in `articles/` directory
2. Add YAML front matter with required fields:
   ```yaml
   ---
   title: "Article Title"
   date: "YYYY-MM-DD"
   category: "Development"
   tags: ["JavaScript", "Web"]
   excerpt: "Short description"
   readTime: "5 min"
   ---
   ```
3. Write content in Markdown below the front matter
4. Run `npm run generate-articles` to update `assets/js/articles-list.js`

## Architecture

### Component System
- **Header/Footer Components**: Shared components loaded from `components/` directory
- **ComponentLoader** (`assets/js/components.js`): Dynamically loads header/footer into placeholders on all pages
- All pages use `#header-placeholder` and `#footer-placeholder` divs
- Components are loaded via `fetch()` and injected at DOM ready

### Internationalization (i18n)
- **Supported Languages**: English (en), French (fr)
- **Translation Files**:
  - Inline fallback dictionaries in `assets/js/i18n.js`
  - JSON files in `assets/i18n/en.json` and `assets/i18n/fr.json`
- **Language Detection**: Automatic via `navigator.language` with localStorage persistence
- **Translation Keys**: Use `data-i18n`, `data-i18n-attr`, and `data-i18n-list` attributes
- **Language Selector**: Dropdown in header (`#lang-select`)

### Blog System
- **Article Storage**: Markdown files in `articles/` directory
- **Article Index**: Auto-generated `assets/js/articles-list.js` (window.ARTICLES_LIST array)
- **Blog Pages**:
  - `blog.html`: List view with search, filtering, and category badges
  - `article.html`: Individual article rendering with Markdown parsing
- **Features**: Category filtering, search (title/content/tags), read time estimation

### File Structure (Clean Architecture - Restructured 2025)
```
Portfolio/
├── index.html              # Main portfolio page
├── blog.html               # Blog list page
├── article.html            # Article detail page template
├── services.html           # Services/offerings page
├── work-with-me.html       # Contact/hire page
├── components/
│   ├── header.html         # Shared header component
│   ├── footer.html         # Shared footer component
│   └── page-template.html  # Template for new pages
├── articles/               # Markdown blog articles
│   └── *.md
├── assets/
│   ├── css/
│   │   ├── styles.css      # Main styles
│   │   ├── additions.css   # Additional styling
│   │   ├── blog.css        # Blog-specific styles
│   │   ├── services.css    # Services page styles
│   │   ├── responsive.css  # Responsive breakpoints
│   │   └── components/     # Component-specific styles
│   │       ├── carousel.css         # Modern carousel component
│   │       └── language-selector.css # Language selector
│   ├── js/
│   │   ├── main.js         # Core site functionality
│   │   ├── i18n.js         # Internationalization system
│   │   ├── components.js   # Component loader
│   │   ├── blog.js         # Blog list functionality (consolidated)
│   │   ├── article.js      # Article rendering (consolidated)
│   │   ├── articles-list.js # Auto-generated article index
│   │   ├── shared/         # Shared utility components
│   │   │   └── markdown-parser.js # Shared markdown parser
│   │   └── components/     # Reusable UI components
│   │       └── carousel.js  # Modern carousel component
│   └── i18n/
│       ├── en.json         # English translations
│       └── fr.json         # French translations
├── generate-articles-list.js # Node script to generate article index
└── package.json
```

## Key Implementation Details

### Theme System
- Dark/light theme toggle in header
- Theme preference stored in localStorage
- Uses `data-theme` attribute on `<body>`
- CSS custom properties (`:root` variables) for theming

### Page Lifecycle
1. `DOMContentLoaded` fires
2. `components.js` loads header/footer components
3. `componentsLoaded` event dispatches
4. `i18n.js` applies translations to loaded DOM
5. Page-specific scripts initialize (blog, carousel, etc.)

### CV Downloads
- CV files in root directory: `CV_Killian_Chandeze_Sofware_Engineer.pdf`
- French version also available
- Language selector in header updates CV download link

### Styling Approach
- **Component-Based CSS Architecture** (Restructured 2025):
  - `styles.css`: Core base styles
  - `responsive.css`: Global responsive breakpoints
  - `components/carousel.css`: Modern carousel with sharp design (no rounded borders)
  - `components/language-selector.css`: Language selector dropdown
  - Feature-specific: `blog.css`, `services.css`

### Shared Components Architecture
- **Markdown Parser** (`shared/markdown-parser.js`):
  - Unified YAML front matter parsing
  - Excerpt extraction and read time calculation
  - Date formatting utilities
  - Used by both blog and article pages to eliminate code duplication

- **Carousel Component** (`components/carousel.js`):
  - Modern, responsive carousel with touch support
  - Configurable breakpoints and items per view
  - Automatic initialization on DOM ready
  - Sharp, clean design aesthetic

- **Component Loading Pattern**:
  1. Load `components.js` first (header/footer)
  2. Load `i18n.js` for translations
  3. Load shared utilities (`markdown-parser.js`)
  4. Load page-specific scripts
  5. Load `main.js` last for initialization

## Important Conventions

### Adding New Pages
1. Copy `components/page-template.html`
2. Include header/footer placeholders
3. Load required scripts: `components.js`, `i18n.js`, `main.js`
4. Add translation keys to `assets/i18n/en.json` and `fr.json`
5. Update header navigation in `components/header.html`

### Translation Keys
- Use descriptive prefixes: `nav_*`, `hero_*`, `skills_*`, `exp_*`, `proj_*`
- Lists use numbered suffixes: `exp_self_1`, `exp_self_2`, etc.
- Keep English as fallback in inline dictionaries

### Code Style
- **Vanilla JavaScript** (no framework dependencies)
- **ES6+ Standards**: async/await, arrow functions, classes
- **All comments in English** (standardized during 2025 refactor)
- **Semantic HTML5** elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`)
- **No code duplication**: Use shared components for common functionality
- **Modern CSS**: No rounded borders, clean sharp design, component-based architecture

### Design Philosophy (2025 Refactor)
- **Clean & Modern**: Sharp edges, no rounded borders on components
- **Component-Based**: Reusable CSS and JS components
- **DRY Principle**: No duplicate code - shared utilities for common functionality
- **Performance**: Consolidated files, minimal HTTP requests
- **Maintainability**: Clear separation of concerns, well-documented components

## Testing Notes

- Test with Python HTTP server, not direct file:// protocol (fetch requires HTTP)
- Verify i18n works by switching languages
- Check responsive behavior on mobile/desktop
- Ensure blog articles render correctly with various Markdown features
- Validate that component loading completes before page-specific scripts run
