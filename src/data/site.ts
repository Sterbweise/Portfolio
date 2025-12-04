// src/data/site.ts
// Centralized site configuration and metadata

import type { SiteConfig, NavItem, ContactInfo, LanguageEntry } from "../types";

/**
 * Main site configuration
 */
export const siteConfig: SiteConfig = {
  name: "Killian Chandeze",
  title: "Portfolio - Killian Chandeze",
  description:
    "C#/.NET Software Engineer — a clean and minimal portfolio showcasing my expertise in backend architecture, scalable systems, professional experience, technical skills, and projects.",
  url: "https://kchndz.dev",
  author: "Killian Chandeze",
  email: "chandeze.killian@proton.me",
  locale: "en",
  social: {
    github: "https://github.com/Sterbweise",
    linkedin: "https://www.linkedin.com/in/killian-chandeze",
    telegram: "https://t.me/SG991",
    whatsapp: "https://wa.me/60182839937",
    wechat: "https://i.vgy.me/uJINMz.png",
    codingame:
      "https://www.codingame.com/profile/b2ad07e79ce1bd6e95eb7f54a7cc4b8b8661204",
    leetcode: "https://leetcode.com/u/sterbweise/",
  },
};

/**
 * Main navigation items
 */
export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Work with me", href: "/work-with-me" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Resume/Portfolio section navigation
 */
export const sectionNavigation: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

/**
 * Contact information
 */
export const contactInfo: ContactInfo = {
  location: "Federal Territory of Kuala Lumpur, Malaysia",
  social: [
    {
      platform: "WhatsApp",
      url: "https://wa.me/60182839937",
      label: "+60 18-283 9937",
      icon: "fa-solid fa-phone",
    },
    {
      platform: "Email",
      url: "mailto:chandeze.killian@proton.me",
      label: "chandeze.killian@proton.me",
      icon: "fa-solid fa-envelope",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/killian-chandeze",
      label: "linkedin/killian-chandeze",
      icon: "fa-brands fa-linkedin",
    },
    {
      platform: "GitHub",
      url: "https://github.com/Sterbweise",
      label: "github/Sterbweise",
      icon: "fa-brands fa-github",
    },
  ],
};

/**
 * Language proficiencies
 */
export const languages: LanguageEntry[] = [
  { name: "French", level: "C2 - Native", code: "fr" },
  { name: "English", level: "C1 - Proficient", code: "en" }
];

/**
 * Footer social links with icons
 */
export const footerSocialLinks = [
  {
    href: `mailto:${siteConfig.email}`,
    label: "Email",
    icon: "fa-solid fa-envelope",
  },
  {
    href: siteConfig.social.linkedin!,
    label: "LinkedIn",
    icon: "fa-brands fa-linkedin",
    external: true,
  },
  {
    href: siteConfig.social.github!,
    label: "GitHub",
    icon: "fa-brands fa-github",
    external: true,
  },
  {
    href: siteConfig.social.whatsapp!,
    label: "WhatsApp",
    icon: "fa-brands fa-whatsapp",
    external: true,
  },
  {
    href: siteConfig.social.telegram!,
    label: "Telegram",
    icon: "fa-brands fa-telegram",
    external: true,
  },
  {
    href: siteConfig.social.wechat!,
    label: "WeChat",
    icon: "fa-brands fa-weixin",
    external: true,
  },
  {
    href: siteConfig.social.codingame!,
    label: "CodinGame",
    icon: "fa-solid fa-gamepad",
    external: true,
  },
  {
    href: siteConfig.social.leetcode!,
    label: "LeetCode",
    icon: "fa-solid fa-code",
    external: true,
  },
];

/**
 * CV/Resume download paths
 */
export const cvPaths = {
  en: "/cv/CV_EN_Killian_Chandeze_Sofware_Engineer.pdf",
  fr: "/cv/CV_FR_Killian_Chandeze_Sofware_Engineer.pdf",
};

/**
 * OG Image for social sharing
 */
export const ogImage = `${siteConfig.url}/assets/img/og-image.jpg`;
