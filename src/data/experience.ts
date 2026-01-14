// src/data/experience.ts
// Professional experience data

import type { ExperienceEntry } from "../types";

/**
 * Professional experience entries
 * Listed in reverse chronological order (most recent first)
 */
export const experienceData: ExperienceEntry[] = [
  {
    id: "freelance-2024",
    title: "Software Engineer (.NET / Angular)",
    company: "Freelance",
    location: "Kuala Lumpur, Malaysia",
    startDate: "Sep 2024",
    endDate: "Present",
    description: [
      "Architected C# (.NET 8) backends with normalized SQL Server (3NF) databases, optimizing performance via strategic indexing and query tuning.",
      "Engineered secure ASP.NET Core RESTful APIs with Clean Architecture, JWT authentication, input validation, and rate limiting.",
      "Established robust Azure DevOps CI/CD pipelines: automated builds, xUnit testing (85%+ coverage), Docker containerization, and deployment.",
      "Developed responsive Angular front-end modules integrated with backend APIs, reducing page load times by 27% and enhancing user experience.",
      "Integrated Stripe and crypto payment gateways, ensuring PCI-compliant secure transaction handling and comprehensive error management.",
    ],
    skills: [
      "C# / .NET 8",
      "ASP.NET Core",
      "REST APIs",
      "SQL Server (Indexing/3NF)",
      "Docker",
      "Kubernetes",
      "Azure DevOps",
      "CI/CD",
      "Entity Framework Core",
      "LINQ",
      "xUnit",
    ],
  },
  {
    id: "freelance-2023",
    title: "Software Engineer (.NET / Python)",
    company: "Freelance",
    location: "Kuala Lumpur, Malaysia",
    startDate: "Dec 2023",
    endDate: "Aug 2024",
    description: [
      "Built multi-threaded C# scoring engine integrating Python for quantitative analysis, implementing market, fundamental, and technical valuations.",
      "Designed ETL pipelines processing real-time market data via REST/WebSocket, utilizing PostgreSQL for persistence and Redis for caching.",
      "Applied advanced statistical models (regression, volatility) to calculate risk-adjusted metrics like Sharpe ratio and maximum drawdown.",
      "Created backtesting framework with walk-forward optimization to validate algorithmic strategies across diverse market conditions.",
    ],
    skills: [
      "C# / .NET",
      "Python",
      "WebSocket",
      "ETL Pipelines",
      "PostgreSQL",
      "Redis",
      "Entity Framework Core",
      "LINQ",
      "Azure DevOps",
      "Agile / Scrum",
    ],
  },
  {
    id: "ausy-2023",
    title: "Software Engineer (.NET / WPF)",
    company: "AUSY",
    location: "Lorient, France",
    startDate: "Feb 2023",
    endDate: "Nov 2023",
    description: [
      "Designed supply chain optimization algorithms using advanced routing techniques, reducing delivery times by ~30% and boosting efficiency.",
      "Developed enterprise WPF (MVVM) application for production tracking, integrating Entity Framework and LINQ for complex data operations.",
      "Architected containerized ASP.NET microservices with Docker, implementing service communication, health checks, and scalable architecture.",
      "Led Agile SDLC using Azure DevOps: managed sprint planning, Git versioning, automated testing pipelines, and CI/CD workflows.",
      "Refactored legacy codebase using SOLID principles and design patterns, significantly improving maintainability and reducing technical debt.",
    ],
    skills: [
      "C# / .NET",
      "WPF (MVVM)",
      "Entity Framework",
      "LINQ",
      "ASP.NET Microservices",
      "Docker",
      "Azure DevOps",
      "Code Optimization",
    ],
  },
  {
    id: "michelin-2022",
    title: "Software Developer & Data Analyst",
    company: "Michelin",
    location: "Clermont-Ferrand, France",
    startDate: "Apr 2022",
    endDate: "Jul 2022",
    description: [
      "Optimized critical Oracle PL/SQL procedures, improving log processing reliability by ~45% through query tuning and execution plan analysis.",
      "Built real-time C# WPF monitoring dashboard with live visualization, enabling production teams to track machine status and KPIs.",
      "Automated IT operations via PowerShell and C# tools for Active Directory management, database maintenance, and system administration.",
      "Created SQL Server data export tools implementing CSV/VCF contact management with automated PowerShell scheduling.",
      "Designed ETL processes and Power BI dashboards with DAX, delivering actionable operational metrics to multiple departments.",
    ],
    skills: [
      "Oracle PL/SQL",
      "SQL Server",
      "ETL",
      "Power BI",
      "C# / .NET Framework",
      "PowerShell",
      "Automation",
      "Data Quality",
      "KPIs / DAX",
    ],
  },
  {
    id: "michelin-2019",
    title: "Local Area Network Technician",
    company: "Michelin",
    location: "Clermont-Ferrand, France",
    startDate: "Mar 2019",
    endDate: "Jun 2019",
    description: [
      "Automated server maintenance using VBScript and batch scripting, ensuring high availability of critical production infrastructure.",
      "Configured Synology NAS systems for centralized storage, implementing backup strategies and access controls for production servers.",
      "Developed VBScript automation for rapid machine deployment, significantly reducing setup time and ensuring consistent configurations.",
      "Administered Active Directory Domain Services, managing user accounts, policies, and security settings for robust access control.",
      "Configured DNS, DHCP, TCP/IP, and remote access services, optimizing network performance and troubleshooting connectivity.",
    ],
    skills: [
      "Server Administration",
      "Automation (VBS)",
      "Synology NAS",
      "Active Directory (AD DS)",
      "DNS",
      "TCP/IP",
      "VNC / RDP",
      "Network Security",
    ],
  },
  {
    id: "mediapc-2018",
    title: "Computer Repair Technician",
    company: "MediaPC",
    location: "Clermont-Ferrand, France",
    startDate: "Apr 2018",
    endDate: "Apr 2018",
    description: [
      "Performed comprehensive hardware/software diagnostics on 15+ laptops, resolving component failures and configuration issues.",
      "Executed clean OS installations, driver configurations, and system optimizations to restore performance for residential and business clients.",
      "Removed malware and viruses using industry-standard tools, implementing preventive security measures to protect client systems.",
      "Delivered exceptional customer service, explaining technical issues clearly and ensuring client satisfaction with repair outcomes.",
    ],
    skills: [
      "Hardware Diagnostics",
      "Troubleshooting",
      "OS Installation",
      "Driver Configuration",
      "Malware Removal",
      "Data Recovery",
      "Customer Support",
      "Technical Documentation",
    ],
  },
];

/**
 * Get experience by ID
 */
export function getExperienceById(id: string): ExperienceEntry | undefined {
  return experienceData.find((exp) => exp.id === id);
}

/**
 * Get experiences by company
 */
export function getExperiencesByCompany(company: string): ExperienceEntry[] {
  return experienceData.filter((exp) =>
    exp.company.toLowerCase().includes(company.toLowerCase())
  );
}

/**
 * Get current position(s)
 */
export function getCurrentPositions(): ExperienceEntry[] {
  return experienceData.filter((exp) => exp.endDate === "Present");
}
