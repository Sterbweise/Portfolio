// src/data/about.ts
// Personal introduction and about section data

import type { AboutData, HeroData } from "../types";

/**
 * Hero section data
 * Main introduction displayed at the top of the page
 */
export const heroData: HeroData = {
  greeting: "Hi, I'm",
  name: "Killian Chandeze",
  title: "Hi, I'm Killian Chandeze",
  subtitle: "Software Engineer C#/.NET",
  description:
    "3+ years building robust, scalable, and data-driven solutions in IT, supply chain, and finance. Skilled in RESTful APIs, SQL/NoSQL, cloud-native applications, and performance optimization.",
  quote: "Form follows function.",
  cta: {
    primary: {
      text: "View Projects",
      href: "#projects",
    },
    secondary: {
      text: "Download CV",
      href: "/cv/CV_EN_Killian_Chandeze_Sofware_Engineer.pdf",
      download: true,
    },
  },
};

/**
 * About section data
 * Detailed personal and professional introduction
 */
export const aboutData: AboutData = {
  introduction: [
    "Hi, I'm Killian — a Software Engineer from France, currently based in Malaysia. My goal is to build collaborative and impactful solutions that address real-world and future challenges.",
    "I specialize in .NET technologies and work across the full stack, though I have a strong preference for backend development — where I find the real art and enjoyment of programming. I also have a data analyst background from my studies, and I enjoy combining both skill sets in projects.",
  ],
  highlights: [
    "finance",
    "problem‑solving",
    "new technologies",
    "exploring anything that sparks curiosity",
  ],
  strengths: [
    "Adaptability",
    "Analytical Thinking",
    "Resilience",
    "Collaboration",
    "Continuous Learning",
  ],
  image: {
    src: "/img/profile.jpg",
    alt: "Portrait of Killian Chandeze",
  },
};

/**
 * Professional summary for meta descriptions
 */
export const professionalSummary =
  "Software Engineer with 3+ years of experience building scalable backend systems, RESTful APIs, and cloud-native applications. Specialized in C#/.NET, Python, and data-driven solutions.";

/**
 * Short bio for social/footer
 */
export const shortBio =
  "Software Engineer passionate about building robust, scalable solutions.";

/**
 * Get introduction paragraphs as HTML-safe strings
 */
export function getIntroductionParagraphs(): string[] {
  return aboutData.introduction;
}

/**
 * Get highlighted interests formatted for display
 */
export function getFormattedHighlights(): string {
  const highlights = aboutData.highlights;
  if (highlights.length === 0) return "";
  if (highlights.length === 1) return highlights[0];

  const lastItem = highlights[highlights.length - 1];
  const otherItems = highlights.slice(0, -1);

  return `${otherItems.join(", ")}, and ${lastItem}`;
}

/**
 * Get all strengths
 */
export function getStrengths(): string[] {
  return aboutData.strengths;
}

/**
 * Get hero CTA configuration
 */
export function getHeroCTA(): HeroData["cta"] {
  return heroData.cta;
}
