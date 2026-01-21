// src/data/achievements.ts
// Achievements, certifications, and awards data

import type { AchievementEntry } from "../types";

/**
 * Achievements and certifications
 * Listed with most notable first
 */
export const achievementsData: AchievementEntry[] = [
  {
    id: "hackathon-cursor-anthropic-2025",
    title: "Hackathon - Cursor x Anthropic",
    organization: "Cursor x Anthropic",
    location: "Kuala Lumpur, Malaysia",
    badges: ["Team", "Largest Event SEA", "Bonus: Free Credits"],
    description:
      "Built a financial dashboard to centralize transactions for Malaysian users.",
    highlights: [
      "Designed app for managing financial transactions with TypeScript and Next.js",
      "Streamlined data aggregation from multiple financial sources for better user insights",
      "Ensured user-friendly analytics and reporting tailored for Malaysian users",
    ],
    skills: ["Web Application", "Data Aggregation", "TypeScript", "Next.js"],
    url: "https://devpost.com/software/myduit-personal-finance-aggregation-platform",
  },
  {
    id: "hackathon-baidu-ernie-ai-2025",
    title: "Baidu ERNIE AI Developer Challenge",
    organization: "Baidu x Novita AI",
    location: "Online",
    badges: ["Winner: 3rd Place", "Solo", "Prize: $300"],
    description:
      "Built an AI-powered crypto whitepaper analyzer using Baidu's ERNIE 4.5 to transform whitepapers into easy-to-understand insights.",
    highlights: [
      "Integrated ERNIE 4.5 via Novita API for intelligent document analysis",
      "Built full-stack application with FastAPI backend and React TypeScript frontend",
      "Implemented async PDF processing with real-time tracking and comprehensive analysis",
    ],
    skills: ["AI/ML", "FastAPI", "React/Typescript", "OpenAI API"],
    url: "https://devpost.com/software/finsight-y213il",
  },
  {
    id: "Codingame-spring-challenge-2025",
    title: "CodinGame – Spring Challenge 2025",
    organization: "CodinGame",
    location: "Online",
    badges: ["Rank: 372 / 2,864", "Solo"],
    description:
      "Developed an autonomous AI agent in Rust to compete in a real-time multiplayer strategy game.",
    highlights: [
      "Competitive AI agent written in Rust",
      "Optimized pathfinding and resource allocation for performance under contest constraints",
      "Sharpened algorithmic thinking and optimized problem‑solving",
    ],
    skills: ["Rust", "Algorithms", "AI Agent", "Performance Optimization"],
    url: "https://www.codingame.com/contests/spring-challenge-2025/leaderboard/global?column=keyword&value=Sterbweise",
  },
  {
    id: "hackathon-microsoft-ai-learning-2024",
    title: "Hackathon - Microsoft AI Learning",
    organization: "Microsoft",
    location: "Global (Remote)",
    badges: ["Rank: 16", "Team", "Prize: AI Courses"],
    description:
      "Built a cloud-native backend in C#/.NET using Azure Cosmos DB.",
    highlights: [
      "Configured Azure Cosmos DB for scalable data storage and retrieval",
      "Implemented database schema and optimized queries with C# .NET",
      "Applied cloud-native best practices including data partitioning and performance tuning",
    ],
    skills: [
      "C# / .NET",
      "Azure Cosmos DB",
      "Cloud-Native Architecture",
      "DB Design",
    ],
    url: "https://azurecosmosdb.devpost.com/",
  },
  {
    id: "csgo-local-tournament-2019",
    title: "CS:GO UCA Gaming Tournament",
    organization: "UCA",
    location: "Clermont-Ferrand, France",
    badges: ["Winner: 3rd Place", "Team", "Prize: Knife Skin"],
    description:
      "Participated in a local CS:GO tournament as part of a competitive team.",
    highlights: [
      "Collaborated in a 5-player team under tournament pressure and tight deadlines",
      "Demonstrated strategic thinking, communication, and quick decision-making",
      "Managed stress and adapted rapidly to changing game situations during competition",
    ],
    skills: [
      "Team Collaboration",
      "Strategic Thinking",
      "Communication",
      "Quick Decision-Making",
    ],
  },
];

/**
 * Get achievement by ID
 */
export function getAchievementById(id: string): AchievementEntry | undefined {
  return achievementsData.find((achievement) => achievement.id === id);
}

/**
 * Get achievements by organization
 */
export function getAchievementsByOrganization(
  organization: string
): AchievementEntry[] {
  return achievementsData.filter((achievement) =>
    achievement.organization.toLowerCase().includes(organization.toLowerCase())
  );
}

/**
 * Get certifications only
 */
export function getCertifications(): AchievementEntry[] {
  return achievementsData.filter((achievement) =>
    achievement.badges.some(
      (badge) =>
        badge.toLowerCase().includes("certified") ||
        badge.toLowerCase().includes("professional")
    )
  );
}

/**
 * Get awards/competitions only
 */
export function getAwards(): AchievementEntry[] {
  return achievementsData.filter((achievement) =>
    achievement.badges.some(
      (badge) =>
        badge.toLowerCase().includes("place") ||
        badge.toLowerCase().includes("winner") ||
        badge.toLowerCase().includes("champion")
    )
  );
}

/**
 * Get achievements by skill
 */
export function getAchievementsBySkill(skill: string): AchievementEntry[] {
  return achievementsData.filter((achievement) =>
    achievement.skills.some((s) =>
      s.toLowerCase().includes(skill.toLowerCase())
    )
  );
}
