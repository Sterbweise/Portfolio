# Minimal One-Page Portfolio

Aesthetic, minimal, and responsive single-page portfolio for a Software Engineer. Sections: Hero, About, Skills, Experience, Education, Projects, Contact. Separate HTML/CSS/JS, smooth scrolling, and subtle reveal animations.

## Structure
- index.html
- assets/
  - css/styles.css
  - js/main.js
  - cv/YourName-CV.pdf (add your PDF here)

## Customize
1. Open index.html and replace:
   - Your Name
   - Email, LinkedIn, GitHub links
   - Experience, Education, Projects content
2. Add your CV PDF:
   - Place file at: assets/cv/YourName-CV.pdf
   - Update links if you rename it.
3. Colors and theme:
   - Edit CSS variables in assets/css/styles.css under :root (and light mode in media query).
4. Favicon:
   - Add an icon to assets/img/favicon.ico and uncomment the link tag in index.html.

## Run locally
- Option A: Double-click index.html to open in browser.
- Option B (recommended): run a simple server for better routing/performance.
  - PowerShell: npx serve -s .  (install Node.js first)
  - Python: python -m http.server 8080

## Notes
- Fully responsive; supports dark and light via prefers-color-scheme.
- Accessible landmarks, semantic headings, and reduced motion friendly (animations are subtle).# Portfolio
