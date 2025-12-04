// src/types/index.ts
// Type definitions for portfolio data structures

/**
 * Site metadata configuration
 */
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  email: string;
  social: SocialLinks;
  locale: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  telegram?: string;
  whatsapp?: string;
  wechat?: string;
  codingame?: string;
  leetcode?: string;
}

/**
 * Navigation item
 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Hero section data
 */
export interface HeroData {
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  cta: {
    primary: { text: string; href: string };
    secondary?: { text: string; href: string; download?: boolean };
  };
}

/**
 * About section data
 */
export interface AboutData {
  introduction: string[];
  highlights: string[];
  strengths: string[];
  image?: {
    src: string;
    srcFallback?: string;
    alt: string;
    width?: number;
    height?: number;
  };
}

/**
 * Skill category
 */
export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

/**
 * Experience entry
 */
export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  skills: string[];
}

/**
 * Education entry
 */
export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: {
    value: string;
    scale: string;
    label?: string;
  };
  description: string[];
  skills: string[];
}

/**
 * Achievement entry
 */
export interface AchievementEntry {
  id: string;
  title: string;
  organization: string;
  location: string;
  date?: string;
  badges: string[];
  description: string;
  highlights: string[];
  skills: string[];
}

/**
 * Contact information
 */
export interface ContactInfo {
  location: string;
  social: {
    platform: string;
    url: string;
    label: string;
    icon: string;
  }[];
}

/**
 * Language proficiency
 */
export interface LanguageEntry {
  name: string;
  level: string;
  code: string;
}

/**
 * Project data (from content collection)
 */
export interface ProjectFrontmatter {
  title: string;
  description: string;
  publishDate: string;
  tags: string[];
  link?: string;
  linkText?: string;
  featured?: boolean;
  visibility: "public" | "private";
}

/**
 * Blog post data (from content collection)
 */
export interface BlogPostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  readTime: string;
}

/**
 * Service data
 */
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  deliveryTime: string;
  category: "development" | "infrastructure" | "consultation";
  features: string[];
  icon: string;
}

/**
 * Props for section components
 */
export interface SectionProps {
  id?: string;
  className?: string;
}

/**
 * Card component props
 */
export interface CardProps {
  variant?: "default" | "elevated" | "outlined";
  hoverable?: boolean;
  className?: string;
}

/**
 * Badge component props
 */
export interface BadgeProps {
  variant?: "default" | "accent" | "success" | "warning" | "muted";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Button component props
 */
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  download?: boolean | string;
  external?: boolean;
  disabled?: boolean;
  className?: string;
}
