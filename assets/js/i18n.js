(function () {
  // Inline fallback dictionaries to work even on file:// (no fetch)
  const FALLBACK = {
    en: {
      "nav_about": "About",
      "nav_skills": "Skills",
      "nav_experience": "Experience",
      "nav_education": "Education",
      "nav_projects": "Projects",
      "nav_contact": "Contact",
      "hero_title": "Hi, I’m Killian Chandeze",
      "hero_intro": "3+ years building robust, scalable, and data-driven solutions in IT, supply chain, and finance. Skilled in RESTful APIs, SQL/NoSQL, cloud-native applications, and performance optimization.",
      "hero_view_projects": "View Projects",
      "hero_download_cv": "Download CV",
      "quote": "Form follows function.",
      "about_title": "About",
      "skills_title": "Technical Skills",
      "experience_title": "Professional Experience",
      "education_title": "Education",
      "projects_title": "Projects",
      "contact_title": "Contact",
      "languages_title": "Languages",
      "footer_about": "About",
      "footer_experience": "Experience",
      "footer_education": "Education",
      "footer_projects": "Projects",
      "footer_contact": "Contact",
      "about_lead": "Hi, I’m Killian — a Software Engineer from France, currently based in Malaysia. My goal is to build collaborative and impactful solutions that address real-world and future challenges.",
      "about_p2": "I specialize in .NET technologies and work across the full stack, though I have a strong preference for backend development — where I find the real art and enjoyment of programming. I also have a data analyst background from my studies, and I enjoy combining both skill sets in projects.",
      "about_p3": "Beyond coding, I’m passionate about finance, problem‑solving, new technologies, and exploring anything that sparks curiosity.",
      "about_strengths_title": "Key strengths",
      "strength_adaptability": "Adaptability",
      "strength_analytical": "Analytical Thinking",
      "strength_resilience": "Resilience",
      "strength_collaboration": "Collaboration",
      "strength_learning": "Continuous Learning",
      "scroll_down_aria": "Go to About section",
      "skills_cat_languages": "Languages",
      "skills_cat_databases": "Databases",
      "skills_cat_backend": "Backend & APIs",
      "skills_cat_infra": "Infrastructure",
      "skills_cat_cloud": "Cloud & DevOps",
      "skills_cat_other": "Other",
      "skills_lang_1": "C# (.NET, ASP.NET, WPF)",
      "skills_lang_2": "Python",
      "skills_lang_3": "Java",
      "skills_lang_4": "TypeScript (Angular)",
      "skills_lang_5": "Bash",
      "skills_lang_6": "PowerShell",
      "skills_db_1": "SQL (MS SQL, MySQL, PostgreSQL)",
      "skills_db_2": "NoSQL (Redis, MongoDB)",
      "skills_backend_1": "RESTful APIs",
      "skills_backend_2": "OpenAPI",
      "skills_backend_3": "Swagger",
      "skills_backend_4": "Entity Framework",
      "skills_backend_5": "Dapper",
      "skills_backend_6": "LINQ",
      "skills_backend_7": "RabbitMQ",
      "skills_infra_1": "Docker",
      "skills_infra_2": "Kubernetes",
      "skills_infra_3": "KVM",
      "skills_infra_4": "VMWare",
      "skills_infra_5": "NGINX",
      "skills_infra_6": "TCP/IP",
      "skills_infra_7": "Networking",
      "skills_infra_8": "Terraform",
      "skills_infra_9": "SOPS",
      "skills_cloud_1": "AWS",
      "skills_cloud_2": "Azure DevOps",
      "skills_cloud_3": "Git",
      "skills_cloud_4": "CI/CD",
      "skills_cloud_5": "Jenkins",
      "skills_cloud_6": "Prometheus",
      "skills_cloud_7": "Grafana",
      "skills_cloud_8": "ELK Stack",
      "skills_other_1": "Talend, SSIS, ETL",
      "skills_other_2": "Tableau, Power BI",
      "skills_other_3": "xUnit, Moq, Postman",
      "skills_other_4": "SDLC, TDD, UML",
      "skills_other_5": "Agile/Scrum",
      "exp_self_1": "Developed scalable backends in C# (.NET 8), Java, and Python with clean architecture.",
      "exp_self_2": "Designed RESTful APIs with ASP.NET (MVC); built normalized SQL Server models (3NF) and optimized indexing.",
      "exp_self_3": "Deployed infrastructure with Docker, Kubernetes, and cloud services; automated CI/CD.",
      "exp_self_4": "Integrated Stripe and crypto payment gateways for secure transactions.",
      "exp_self_5": "Collaborated on real-time crypto analytics using scoring algorithms.",
      "exp_ausy_1": "Engineered a supply chain optimization algorithm, reducing delivery times by ~30%.",
      "exp_ausy_2": "Developed a C# WPF (MVVM) app for production tracking with EF and LINQ.",
      "exp_ausy_3": "Designed and deployed ASP.NET microservices containerized with Docker.",
      "exp_ausy_4": "Managed SDLC with Azure DevOps: planning, versioning, tests, and pipelines.",
      "exp_ausy_5": "Refactored/optimized legacy codebase to improve stability and performance.",
      "exp_michelin_da_1": "Optimized Oracle PL/SQL scripts, improving log processing reliability by ~45%.",
      "exp_michelin_da_2": "Built a C# WPF dashboard for real-time machine monitoring.",
      "exp_michelin_da_3": "Automated AD and DB management with C# (.NET Framework) and PowerShell.",
      "exp_michelin_da_4": "Developed tools for contact export (CSV/VCF) from SQL Server; ensured sync via PowerShell.",
      "exp_michelin_da_5": "Designed ETL pipelines and Power BI dashboards to surface operational KPIs and actionable insights.",
      "exp_michelin_lan_1": "Automated server tasks to ensure smooth operation of critical production software.",
      "exp_michelin_lan_2": "Configured Synology NAS for various management and production servers, enhancing data storage and accessibility.",
      "exp_michelin_lan_3": "Created VBS scripts for deploying new machines, streamlining the setup process.",
      "exp_michelin_lan_4": "Administered AD DS (Active Directory Domain Services), ensuring robust user management and network security.",
      "exp_michelin_lan_5": "Configured DNS, TCP/IP, VNC, and RDP to optimize network performance and accessibility.",
      "exp_mediapc_1": "Diagnosed and repaired desktops/laptops (hardware and software issues).",
      "exp_mediapc_2": "Reinstalled operating systems, configured drivers, and performed system tuning.",
      "exp_mediapc_3": "Removed malware, secured systems, and handled data backup/recovery.",
      "exp_mediapc_4": "Provided customer support and clear documentation for handover.",
      "edu_pgcert_1": "Proficient in OOP principles (encapsulation, inheritance, polymorphism) to build scalable and maintainable .NET solutions.",
      "edu_pgcert_2": "Strong problem-solving and algorithm design skills, optimizing performance and resource usage.",
      "edu_pgcert_3": "Experience with autonomous agent systems and complex interactions.",
      "edu_pgcert_4": "Knowledge of optimization techniques to improve scalability, reliability, and efficiency.",
      "edu_pgcert_5": "Delivered projects using .NET / ASP.NET Core, applying OOP and algorithmic optimization.",
      "edu_bsc_1": "Proficient in Python, R, Java, and SQL (relational databases) to build data-driven solutions and optimize decision-making processes.",
      "edu_bsc_2": "Skilled in statistical and probabilistic analysis and financial/epidemic modeling (Monte Carlo, Martingale processes, predictive models).",
      "edu_bsc_3": "Expertise in ETL and data visualization with Power BI, transforming complex datasets into actionable insights.",
      "edu_bsc_4": "Experience in cryptography (RSA, AES, Diffie-Hellman) to ensure secure and reliable data handling.",
      "edu_bsc_5": "Completed a final year project (Guessing Game) demonstrating applied skills in software development and modeling.",
      "edu_shs_1": "Mastery of IPv4 and IPv6 protocols, including subnetting (CIDR/VLSM) and advanced IP address management.",
      "edu_shs_2": "Strong knowledge of the OSI model and TCP/UDP transport protocols for reliable and efficient data communication.",
      "edu_shs_3": "Experience with MPLS, VPNs, and tunneling protocols (GRE, IPSec, L2TP) to enable secure and scalable network architectures.",
      "edu_shs_4": "Familiarity with firewalls, ACLs, and NAT/PAT for network security and traffic control.",
      "edu_shs_5": "Experience in configuring and maintaining switches, routers, and load balancers, ensuring secure and efficient communication.",
      "proj_winget_1": "PowerShell-based automation to update installed apps using Windows Package Manager (winget).",
      "proj_winget_2": "Supports flexible update modes (all apps, specific lists) and exclusion lists for fine-grained control.",
      "proj_winget_3": "Improves maintenance efficiency with clear logging and safe fallbacks.",
      "proj_winget_4": "Handles edge cases (missing manifests, interactive installers) to keep runs reliable.",
      "proj_winget_5": "Designed for scheduled use to keep systems consistently up to date.",
      "proj_supply_1": "Contributed to the development of optimization algorithms to streamline production planning and inventory management, improving efficiency and delivery times.",
      "proj_supply_2": "Enabled seamless communication between C# and JavaScript subprograms, facilitating comprehensive data retrieval and integration across systems.",
      "proj_supply_3": "Utilized containerization (Docker, Kubernetes) to ensure efficient deployment and scalability, supporting high availability and performance.",
      "proj_supply_4": "Implemented real‑time data processing for dynamic adjustments and responsive decision‑making based on current production and inventory data.",
      "proj_supply_5": "Participated in thorough testing and validation to ensure reliable algorithm performance under varied conditions.",
      "proj_supply_6": "Collaborated with cross‑functional teams to gather requirements and ensure alignment with business needs and client expectations.",
      "proj_wpf_1": "Contributed to a C# WPF (MVVM) production app, improving tracking accuracy and inventory visibility.",
      "proj_wpf_2": "Enabled end‑to‑end flow tracking to identify bottlenecks and optimize throughput.",
      "proj_wpf_3": "Implemented clear data visualizations for actionable insights and faster decision‑making.",
      "proj_wpf_4": "Collaborated with stakeholders to align features with business requirements and operator needs.",
      "proj_wpf_5": "Performed testing and debugging to ensure reliability and performance in varied shop‑floor conditions.",
      "proj_crypto_1": "Built a multidimensional scoring engine combining fundamentals, on‑chain metrics, technical indicators, and risk factors.",
      "proj_crypto_2": "Designed ingestion pipelines aggregating market, on‑chain and sentiment signals with validation, de‑duplication and retries.",
      "proj_crypto_3": "Engineered feature normalization/standardization and tunable weighting to compute a composite score per asset/timeframe.",
      "proj_crypto_4": "Backtested strategies with walk‑forward validation; tracked Sharpe ratio, hit rate and max drawdown to calibrate thresholds.",
      "proj_crypto_5": "Surfaced top signals via alerts and a lightweight dashboard; added guardrails for position sizing and risk limits.",
      "proj_plutonium_1": "A dedicated server platform for hosting and managing Call of Duty: Black Ops II using the Plutonium mod.",
      "proj_plutonium_2": "Enables advanced customization, stable performance, and straightforward configuration.",
      "proj_plutonium_3": "Provides tooling and structure for reliable operation and streamlined administration.",
      "proj_plutonium_4": "Includes guidance for setup/operations to support consistent deployments.",
      "proj_plutonium_5": "Open-source repository available for contributions and audits.",
      "proj_code_link": "Code",
      "proj_website_link": "Website",
      "contact_whatsapp_pref": "WhatsApp Preferred",
      "local_time_aria": "Local time (UTC+8)",
      "show_more": "Show more",
      "show_less": "Show less",
      "lang_fr": "French",
      "lang_en": "English",
      "lang_es": "Spanish",
      "level_c2_native": "C2 - Native",
      "level_c1_proficient": "C1 - Proficient",
      "level_b1_basic": "B1 - Basic",
      "proj_winget_desc": "Automates and simplifies Windows app updates via WinGet with flexible modes and exclusions.",
      "proj_supply_desc": "Optimization engine for planning and inventory, enabling real‑time, scalable operations.",
      "proj_wpf_desc": "WPF dashboard for live production tracking and actionable shop‑floor insights.",
      "proj_crypto_desc": "Comprehensive crypto analysis engine delivering data‑driven investment insights.",
      "proj_plutonium_desc": "Dedicated server platform for hosting and managing Black Ops II (Plutonium) with stability and easy config."
    },
    fr: {
      "nav_about": "À propos",
      "nav_skills": "Compétences",
      "nav_experience": "Expérience",
      "nav_education": "Éducation",
      "nav_projects": "Projets",
      "nav_contact": "Contact",
      "hero_title": "Bonjour, je suis Killian Chandeze",
      "hero_intro": "3+ ans à concevoir des solutions robustes, scalables et orientées données dans l’IT, la supply chain et la finance. Compétent en APIs REST, SQL/NoSQL, applications cloud‑native et optimisation des performances.",
      "hero_view_projects": "Voir les projets",
      "hero_download_cv": "Télécharger le CV",
      "quote": "La forme suit la fonction.",
      "about_title": "À propos",
      "skills_title": "Compétences techniques",
      "experience_title": "Expérience professionnelle",
      "education_title": "Éducation",
      "projects_title": "Projets",
      "contact_title": "Contact",
      "languages_title": "Langues",
      "footer_about": "À propos",
      "footer_experience": "Expérience",
      "footer_education": "Éducation",
      "footer_projects": "Projets",
      "footer_contact": "Contact",
      "about_lead": "Bonjour, je suis Killian — Ingénieur Logiciel français, basé en Malaisie. Mon objectif est de créer des solutions collaboratives et impactantes répondant aux défis actuels et futurs.",
      "about_p2": "Je me spécialise dans l’écosystème .NET et j’interviens sur tout le stack, avec une préférence pour le backend — là où je trouve l’art et le plaisir du développement. Mon parcours inclut aussi une formation en analyse de données, que j’aime combiner dans mes projets.",
      "about_p3": "Au‑delà du code, je suis passionné par la finance, la résolution de problèmes, les nouvelles technologies et tout ce qui éveille la curiosité.",
      "about_strengths_title": "Forces clés",
      "strength_adaptability": "Adaptabilité",
      "strength_analytical": "Esprit d’analyse",
      "strength_resilience": "Résilience",
      "strength_collaboration": "Collaboration",
      "strength_learning": "Apprentissage continu",
      "scroll_down_aria": "Aller à la section À propos",
      "skills_cat_languages": "Langages",
      "skills_cat_databases": "Bases de données",
      "skills_cat_backend": "Backend & APIs",
      "skills_cat_infra": "Infrastructure",
      "skills_cat_cloud": "Cloud & DevOps",
      "skills_cat_other": "Autres",
      "skills_lang_1": "C# (.NET, ASP.NET, WPF)",
      "skills_lang_2": "Python",
      "skills_lang_3": "Java",
      "skills_lang_4": "TypeScript (Angular)",
      "skills_lang_5": "Bash",
      "skills_lang_6": "PowerShell",
      "skills_db_1": "SQL (MS SQL, MySQL, PostgreSQL)",
      "skills_db_2": "NoSQL (Redis, MongoDB)",
      "skills_backend_1": "APIs REST",
      "skills_backend_2": "OpenAPI",
      "skills_backend_3": "Swagger",
      "skills_backend_4": "Entity Framework",
      "skills_backend_5": "Dapper",
      "skills_backend_6": "LINQ",
      "skills_backend_7": "RabbitMQ",
      "skills_infra_1": "Docker",
      "skills_infra_2": "Kubernetes",
      "skills_infra_3": "KVM",
      "skills_infra_4": "VMWare",
      "skills_infra_5": "NGINX",
      "skills_infra_6": "TCP/IP",
      "skills_infra_7": "Réseaux",
      "skills_infra_8": "Terraform",
      "skills_infra_9": "SOPS",
      "skills_cloud_1": "AWS",
      "skills_cloud_2": "Azure DevOps",
      "skills_cloud_3": "Git",
      "skills_cloud_4": "CI/CD",
      "skills_cloud_5": "Jenkins",
      "skills_cloud_6": "Prometheus",
      "skills_cloud_7": "Grafana",
      "skills_cloud_8": "Stack ELK",
      "skills_other_1": "Talend, SSIS, ETL",
      "skills_other_2": "Tableau, Power BI",
      "skills_other_3": "xUnit, Moq, Postman",
      "skills_other_4": "SDLC, TDD, UML",
      "skills_other_5": "Agile/Scrum",
      "exp_self_1": "Développé des backends scalables en C# (.NET 8), Java et Python avec une architecture clean.",
      "exp_self_2": "Conçu des APIs REST avec ASP.NET (MVC); modèles SQL Server normalisés (3NF) et indexation optimisée.",
      "exp_self_3": "Déployé l’infrastructure avec Docker, Kubernetes et services cloud; CI/CD automatisé.",
      "exp_self_4": "Intégré Stripe et des passerelles de paiement crypto pour des transactions sécurisées.",
      "exp_self_5": "Collaboré sur de l’analytique crypto temps réel via des algorithmes de scoring.",
      "exp_ausy_1": "Conçu un algorithme d’optimisation supply chain, réduisant les délais de livraison de ~30%.",
      "exp_ausy_2": "Développé une app C# WPF (MVVM) pour le suivi de production avec EF et LINQ.",
      "exp_ausy_3": "Conçu et déployé des microservices ASP.NET conteneurisés avec Docker.",
      "exp_ausy_4": "Géré le SDLC avec Azure DevOps: planification, versioning, tests et pipelines.",
      "exp_ausy_5": "Refactoré/optimisé du legacy pour améliorer stabilité et performance.",
      "exp_michelin_da_1": "Optimisé des scripts Oracle PL/SQL, améliorant la fiabilité du traitement des logs de ~45%.",
      "exp_michelin_da_2": "Construit un tableau de bord C# WPF pour la surveillance temps réel des machines.",
      "exp_michelin_da_3": "Automatisé la gestion AD et BD avec C# (.NET Framework) et PowerShell.",
      "exp_michelin_da_4": "Développé des outils d’export contacts (CSV/VCF) depuis SQL Server; synchronisation via PowerShell.",
      "exp_michelin_da_5": "Conçu des pipelines ETL et des dashboards Power BI pour mettre en évidence des KPIs opérationnels.",
      "exp_michelin_lan_1": "Automatisé des tâches serveurs pour assurer le bon fonctionnement de logiciels critiques de production.",
      "exp_michelin_lan_2": "Configuré des NAS Synology pour divers serveurs de gestion et de production, améliorant stockage et accessibilité.",
      "exp_michelin_lan_3": "Créé des scripts VBS pour le déploiement de nouvelles machines, accélérant les mises en place.",
      "exp_michelin_lan_4": "Administré AD DS (services de domaine Active Directory) pour une gestion robuste des utilisateurs et la sécurité réseau.",
      "exp_michelin_lan_5": "Configuré DNS, TCP/IP, VNC et RDP pour optimiser performances et accessibilité réseau.",
      "exp_mediapc_1": "Diagnostiqué et réparé des PC portables/fixes (matériel et logiciel).",
      "exp_mediapc_2": "Réinstallé des systèmes, configuré des pilotes et réalisé des optimisations.",
      "exp_mediapc_3": "Supprimé des malwares, sécurisé des systèmes et géré sauvegarde/récupération.",
      "exp_mediapc_4": "Assuré le support client et une documentation claire pour la remise.",
      "edu_pgcert_1": "Maîtrise des principes POO (encapsulation, héritage, polymorphisme) pour des solutions .NET scalables et maintenables.",
      "edu_pgcert_2": "Fortes compétences en résolution de problèmes et conception d’algorithmes, optimisant performance et ressources.",
      "edu_pgcert_3": "Expérience avec des systèmes d’agents autonomes et des interactions complexes.",
      "edu_pgcert_4": "Connaissance des techniques d’optimisation pour améliorer scalabilité, fiabilité et efficience.",
      "edu_pgcert_5": "Livré des projets en .NET / ASP.NET Core, avec POO et optimisation algorithmique.",
      "edu_bsc_1": "Compétences en Python, R, Java et SQL pour des solutions orientées données et une prise de décision optimisée.",
      "edu_bsc_2": "Maîtrise de l’analyse statistique/probabiliste et modélisation financière/épidémique (Monte Carlo, Martingale, modèles prédictifs).",
      "edu_bsc_3": "Expertise ETL et visualisation avec Power BI, transformant des données complexes en insights actionnables.",
      "edu_bsc_4": "Expérience en cryptographie (RSA, AES, Diffie-Hellman) pour une gestion de données sécurisée et fiable.",
      "edu_bsc_5": "Projet de fin d’études (Guessing Game) démontrant des compétences appliquées en dev et modélisation.",
      "edu_shs_1": "Maîtrise des protocoles IPv4/IPv6, y compris le subnetting (CIDR/VLSM) et l’adressage avancé.",
      "edu_shs_2": "Bonne connaissance du modèle OSI et des transports TCP/UDP pour des communications fiables et efficaces.",
      "edu_shs_3": "Expérience avec MPLS, VPN et tunnels (GRE, IPSec, L2TP) pour des architectures sécurisées et scalables.",
      "edu_shs_4": "Familiarité avec firewalls, ACL et NAT/PAT pour la sécurité et le contrôle du trafic.",
      "edu_shs_5": "Expérience de configuration/maintenance de switches, routeurs et load balancers, pour une communication sûre et efficace.",
      "proj_winget_1": "Automatisation PowerShell pour mettre à jour les applications via le gestionnaire de paquets Windows (winget).",
      "proj_winget_2": "Prend en charge des modes d’update flexibles (toutes apps, listes spécifiques) et des exclusions.",
      "proj_winget_3": "Améliore l’efficacité de maintenance avec des logs clairs et des fallback sûrs.",
      "proj_winget_4": "Gère les cas limites (manifestes manquants, installateurs interactifs) pour des runs fiables.",
      "proj_winget_5": "Pensé pour une exécution planifiée afin de garder les systèmes à jour.",
      "proj_supply_1": "Contribution au développement d’algorithmes d’optimisation pour la planification et l’inventaire, améliorant efficacité et délais.",
      "proj_supply_2": "Communication fluide entre sous‑programmes C# et JavaScript, facilitant la récupération et l’intégration de données.",
      "proj_supply_3": "Conteneurisation (Docker, Kubernetes) pour des déploiements efficaces et scalables (HA/Performance).",
      "proj_supply_4": "Traitement temps réel pour ajustements dynamiques et décisions réactives selon production/inventaire.",
      "proj_supply_5": "Tests et validations approfondis pour une performance fiable en conditions variées.",
      "proj_supply_6": "Collaboration inter‑équipes pour besoins et alignement métier/clients.",
      "proj_wpf_1": "Contribution à une app C# WPF (MVVM), améliorant la précision du suivi et la visibilité d’inventaire.",
      "proj_wpf_2": "Suivi bout‑en‑bout pour identifier les goulets et optimiser le débit.",
      "proj_wpf_3": "Visualisations claires pour insights actionnables et décisions plus rapides.",
      "proj_wpf_4": "Collaboration avec les parties prenantes pour aligner fonctionnalités et besoins.",
      "proj_wpf_5": "Tests et debug pour fiabilité et performance en conditions variées.",
      "proj_crypto_1": "Moteur de scoring multidimensionnel combinant fondamentaux, métriques on‑chain, indicateurs techniques et risques.",
      "proj_crypto_2": "Pipelines d’ingestion agrégant marchés, on‑chain et sentiment avec validation, dé‑duplication et retries.",
      "proj_crypto_3": "Normalisation/standardisation des features et pondération réglable pour un score composite par actif/échéance.",
      "proj_crypto_4": "Backtests avec validation walk‑forward; suivi ratio de Sharpe, taux de réussite et drawdown max pour calibrer.",
      "proj_crypto_5": "Signaux clés via alertes et dashboard léger; garde‑fous pour taille de position et limites de risque.",
      "proj_plutonium_1": "Plateforme serveur dédiée pour héberger et gérer Call of Duty: Black Ops II (mod Plutonium).",
      "proj_plutonium_2": "Personnalisation avancée, performance stable et configuration simple.",
      "proj_plutonium_3": "Outillage et structure pour exploitation fiable et administration fluide.",
      "proj_plutonium_4": "Guides de mise en place/exploitation pour des déploiements cohérents.",
      "proj_plutonium_5": "Dépôt open‑source disponible pour contributions et audits.",
      "proj_code_link": "Code",
      "proj_website_link": "Site",
      "contact_whatsapp_pref": "WhatsApp préféré",
      "local_time_aria": "Heure locale (UTC+8)",
      "show_more": "Afficher plus",
      "show_less": "Afficher moins",
      "lang_fr": "Français",
      "lang_en": "Anglais",
      "lang_es": "Espagnol",
      "level_c2_native": "C2 - Natif",
      "level_c1_proficient": "C1 - Avancé",
      "level_b1_basic": "B1 - Basique",
      "proj_winget_desc": "Automatise et simplifie la mise à jour des applications Windows via WinGet, avec modes flexibles et exclusions.",
      "proj_supply_desc": "Moteur d’optimisation pour la planification et l’inventaire, permettant des opérations temps réel et scalables.",
      "proj_wpf_desc": "Tableau de bord WPF pour le suivi de production en direct et des insights actionnables.",
      "proj_crypto_desc": "Moteur d’analyse crypto fournissant des insights d’investissement basés sur les données.",
      "proj_plutonium_desc": "Plateforme serveur dédiée pour héberger et gérer Black Ops II (Plutonium) avec stabilité et configuration simple."
    }
  };

  const state = { lang: null, dict: {} };

  function setHtmlLang(lang) {
    document.documentElement.setAttribute('lang', lang);
  }

  async function loadJson(lang) {
    try {
      const r = await fetch(`assets/i18n/${lang}.json`);
      if (r.ok) return r.json();
    } catch {}
    // Fallback to inline dict if fetch fails
    return FALLBACK[lang] || {};
  }

  function applyText(node, text) {
    if (node) node.textContent = text;
  }

  function applyAttr(node, attr, text) {
    if (node) node.setAttribute(attr, text);
  }

  function applyI18n(dict) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (typeof val === 'string') applyText(el, val);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const attrName = el.getAttribute('data-i18n-attr');
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (attrName && typeof val === 'string') applyAttr(el, attrName, val);
    });

    document.querySelectorAll('[data-i18n-list]').forEach(ul => {
      const prefix = ul.getAttribute('data-i18n-list');
      if (!prefix) return;
      const items = ul.querySelectorAll(':scope > li');
      items.forEach((li, i) => {
        const key = `${prefix}_${i + 1}`;
        const val = dict[key];
        if (typeof val === 'string') li.textContent = val;
      });
    });
  }

  function persistLang(lang) {
    try { localStorage.setItem('lang', lang); } catch {}
  }

  function getInitialLang() {
    try {
      const saved = localStorage.getItem('lang');
      if (saved) return saved;
    } catch {}
    const navLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return navLang === 'fr' ? 'fr' : 'en';
  }

  async function setLang(lang) {
    state.lang = lang;
    const dict = await loadJson(lang);
    state.dict = dict;
    setHtmlLang(lang);
    applyI18n(dict);
    persistLang(lang);
    const sel = document.getElementById('lang-select');
    if (sel) sel.value = lang;
    // Notify listeners (e.g., main.js) that language changed
    try { document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } })); } catch {}
  }

  function initLangSelector() {
    const sel = document.getElementById('lang-select');
    if (!sel) return;
    sel.addEventListener('change', () => setLang(sel.value));
  }

  // Expose getter for external scripts
  window.i18nGet = function(key, fallback){
    const val = state.dict && state.dict[key];
    return typeof val === 'string' ? val : (fallback || '');
  };

  (async function init() {
    const initial = getInitialLang();
    await setLang(initial);
    initLangSelector();
  })();
})();