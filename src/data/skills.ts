// src/data/skills.ts
// Technical skills organized by category

import type { SkillCategory } from "../types";

/**
 * Technical skills grouped by category
 * Each category has a name, FontAwesome icon, and list of skills
 */
export const skillsData: SkillCategory[] = [
  {
    name: "Languages & Frameworks",
    icon: "fa-solid fa-code",
    skills: [
      "C# / .NET (Core, Framework, 8+)",
      "ASP.NET (Core, MVC, Web API)",
      "Python (NumPy, Pandas, Scikit-learn)",
      "TypeScript / JavaScript (Angular)",
      "Java",
      "Bash / PowerShell",
    ],
  },
  {
    name: "Databases & Data Access",
    icon: "fa-solid fa-database",
    skills: [
      "SQL Server (T-SQL)",
      "PostgreSQL / MySQL",
      "Entity Framework (Core)",
      "Dapper (Micro-ORM)",
      "LINQ / ADO.NET",
      "Redis / MongoDB",
      "Azure Cosmos DB",
    ],
  },
  {
    name: "Backend & Architecture",
    icon: "fa-solid fa-diagram-project",
    skills: [
      "RESTful APIs / GraphQL",
      "gRPC / SignalR (WebSocket)",
      "MediatR (CQRS)",
      "Clean Architecture / DDD",
      "Microservices",
      "Design Patterns (SOLID, GoF)",
      "Repository Pattern",
    ],
  },
  {
    name: "Cloud, DevOps & Infrastructure",
    icon: "fa-solid fa-cloud",
    skills: [
      "Azure (App Service, Functions, DevOps)",
      "AWS (EC2, S3, Lambda)",
      "Docker / Kubernetes",
      "CI/CD (Azure DevOps, GitHub Actions)",
      "Terraform / Ansible",
      "NGINX / IIS",
      "Linux / Windows Server",
    ],
  },
  {
    name: "Testing, Quality & Monitoring",
    icon: "fa-solid fa-vial",
    skills: [
      "xUnit / NUnit / MSTest",
      "Moq / NSubstitute",
      "Postman / Swagger",
      "SonarQube / BenchmarkDotNet",
      "Serilog / Application Insights",
      "Prometheus / Grafana",
      "ELK Stack",
    ],
  },
  {
    name: "Security, Auth & Methodologies",
    icon: "fa-solid fa-shield-halved",
    skills: [
      "JWT / OAuth 2.0 / OpenID Connect",
      "Identity Server / Azure AD",
      "Agile / Scrum / Kanban",
      "TDD / BDD / CI/CD",
      "Code Review / Pair Programming",
      "SSIS / Talend (ETL)",
      "Power BI / Tableau",
    ],
  },
];

/**
 * Get skills by category name
 */
export function getSkillsByCategory(categoryName: string): string[] {
  const category = skillsData.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
  );
  return category?.skills ?? [];
}

/**
 * Get all skills as a flat array
 */
export function getAllSkills(): string[] {
  return skillsData.flatMap((category) => category.skills);
}

/**
 * Get category by name
 */
export function getCategoryByName(name: string): SkillCategory | undefined {
  return skillsData.find(
    (cat) => cat.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Search skills across all categories
 */
export function searchSkills(query: string): string[] {
  const normalizedQuery = query.toLowerCase();
  return getAllSkills().filter((skill) =>
    skill.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Get total skill count
 */
export function getTotalSkillCount(): number {
  return skillsData.reduce((total, category) => total + category.skills.length, 0);
}

/**
 * Get category count
 */
export function getCategoryCount(): number {
  return skillsData.length;
}
