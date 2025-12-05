// src/data/education.ts
// Education and academic background data

import type { EducationEntry } from "../types";

/**
 * Education entries
 * Listed in reverse chronological order (most recent first)
 */
export const educationData: EducationEntry[] = [
  {
    id: "columbia-specialization-2025",
    degree: "Specialization, Financial Engineering and Risk Management",
    institution: "Columbia University",
    location: "Remote",
    startDate: "Mar 2025",
    endDate: "Present",
    description: [
      "Studying advanced quantitative methods for financial engineering, derivatives pricing, and risk management.",
      "Learning stochastic calculus and mathematical modeling for option pricing and portfolio optimization.",
      "Implementing Monte Carlo simulations (5,000+ iterations) for complex financial instruments valuation.",
      "Understanding Value at Risk (VaR), Credit Risk, and Market Risk measurement and management techniques.",
      "Building financial models using Python with real market data for practical applications.",
    ],
    skills: [
      "Python (NumPy/Pandas)",
      "Financial Engineering",
      "Risk Management",
      "Derivatives Pricing",
      "Stochastic Calculus",
      "Monte Carlo Methods",
      "VaR & Credit Risk",
    ],
  },
  {
    id: "microsoft-pgcert-2023",
    degree: "PGCert, Full-Stack Software Engineering",
    institution: "Microsoft",
    location: "Lorient, France",
    startDate: "Sep 2022",
    endDate: "Feb 2023",
    description: [
      "Mastered OOP principles (encapsulation, inheritance, polymorphism) to build scalable and maintainable .NET solutions.",
      "Developed strong problem-solving and algorithm design skills, optimizing code performance by 30-40%.",
      "Built 3+ full-stack applications using .NET/ASP.NET Core with Clean Architecture and CQRS patterns.",
      "Implemented comprehensive testing strategies (80%+ code coverage) using xUnit and Moq to ensure code quality.",
      "Completed capstone project: autonomous agent system demonstrating advanced software engineering principles.",
    ],
    skills: [
      "C# / .NET 6+",
      "ASP.NET Core",
      "Clean Architecture",
      "CQRS Pattern",
      "Entity Framework Core",
      "xUnit / Moq",
      "Docker",
      "Azure DevOps",
    ],
  },
  {
    id: "uca-bsc-2022",
    degree: "B.Sc. Statistics & Business Intelligence",
    institution: "University Clermont Auvergne",
    location: "Aurillac, France",
    startDate: "Sep 2020",
    endDate: "Jun 2022",
    gpa: {
      value: "3.6",
      scale: "4.0",
      label: "Très bien",
    },
    description: [
      "Developed proficiency in Python, R, Java, and SQL for data analysis and statistical modeling.",
      "Applied statistical methods including Monte Carlo simulations and predictive modeling on datasets of 1,000+ records.",
      "Created ETL pipelines and interactive Power BI dashboards transforming data into actionable business insights.",
      "Studied cryptographic algorithms (RSA, AES, Diffie-Hellman) and implemented secure data handling in 2 projects.",
      "Final year project: Built a 'Guessing Game' in Python demonstrating probability theory and game logic implementation.",
    ],
    skills: [
      "Python",
      "R",
      "Java",
      "SQL",
      "Statistical Modeling",
      "Power BI",
      "ETL",
      "Data Visualization",
      "Cryptography",
    ],
  },
  {
    id: "camille-claudel-shs-2020",
    degree: "S.H.S. Computer Networking & Communication Systems",
    institution: "Lycée Camille Claudel",
    location: "Clermont-Ferrand, France",
    startDate: "Sep 2017",
    endDate: "Jun 2020",
    gpa: {
      value: "3.7",
      scale: "4.0",
      label: "Bien",
    },
    description: [
      "Learned IPv4 and IPv6 protocols, including subnetting (CIDR/VLSM) and IP address management.",
      "Studied the OSI model and TCP/UDP transport protocols for network communication.",
      "Configured VPNs and implemented tunneling protocols (IPSec, GRE) in lab environments.",
      "Practiced network security with firewalls, ACLs, and NAT/PAT configurations.",
      "Completed hands-on projects with Cisco routers and switches using Packet Tracer for 10+ network topologies.",
    ],
    skills: [
      "IPv4/IPv6",
      "CIDR/VLSM",
      "TCP/UDP",
      "Routing (OSPF/BGP)",
      "VLANs",
      "VPN (IPSec/GRE)",
      "Firewall/ACL/NAT",
      "Cisco Packet Tracer",
    ],
  },
];

/**
 * Get education by ID
 */
export function getEducationById(id: string): EducationEntry | undefined {
  return educationData.find((edu) => edu.id === id);
}

/**
 * Get education by institution
 */
export function getEducationByInstitution(
  institution: string,
): EducationEntry[] {
  return educationData.filter((edu) =>
    edu.institution.toLowerCase().includes(institution.toLowerCase()),
  );
}

/**
 * Get education entries with GPA
 */
export function getEducationWithGpa(): EducationEntry[] {
  return educationData.filter((edu) => edu.gpa !== undefined);
}

/**
 * Get highest degree
 */
export function getHighestDegree(): EducationEntry {
  return educationData[0];
}
