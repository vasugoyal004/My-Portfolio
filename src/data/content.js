/**
 * Central Content Repository for Vasu Goyal's Portfolio
 * All content, case studies, skills, services, and profile data live here for easy editing.
 */

export const personalData = {
  name: "Vasu Goyal",
  title: "Software Developer",
  roles: [
    "Full-Stack Developer",
    "Web Portal Specialist",
    "React & Node Engineer",
    "Performance Architect"
  ],
  experienceYears: "3.5+",
  tagline: "I build fast, scalable & beautiful web experiences.",
  shortBio: "3.5+ years of craft in engineering end-to-end web applications, enterprise management portals, and high-performance digital platforms. Obsessed with clean code, tactile animations, and fluid user experiences.",
  fullBio: [
    "I am a passionate Full-Stack Software Developer dedicated to turning complex operational challenges into intuitive, high-octane web applications and portals.",
    "Over the past 3.5+ years, I have architected and deployed mission-critical web platforms—from comprehensive university portals and e-procurement tender engines to enterprise Human Resource Management Systems (HRMS) handling multi-tier workflows.",
    "My engineering philosophy combines ruthless performance, scalable system architecture, and Awwwards-inspired modern aesthetics. Every pixel, transition, and API endpoint is built with precision."
  ],
  location: "India , Rajasthan , Jodhpur",
  availability: "Available for freelance & full-time roles",
  email: "vasugoyal536@gmail.com",
  phone: "+91 7850963027",
  avatar: "/my_photo.png",
  resumeUrl: "#",
  stats: [
    { number: "3.5+", label: "Years Experience", suffix: "" },
    { number: "15+", label: "Projects Shipped", suffix: "" },
    { number: "99.9%", label: "Uptime & Quality", suffix: "" },
    { number: "100%", label: "Dedication", suffix: "" }
  ],
  socials: [
    { name: "GitHub", url: "https://github.com", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { name: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    { name: "Email", url: "mailto:vasugoyal536@gmail.com", icon: "Mail" }
  ]
};

export const techMarquee = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "JavaScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "REST API", category: "Architecture" },
  { name: "Git", category: "Version Control" },
  { name: "GitHub", category: "Platform" },
  { name: "Firebase", category: "Backend" },
  { name: "Framer Motion", category: "Animation" },
  { name: "GSAP", category: "Animation" },
  { name: "Docker", category: "DevOps" },
  { name: "Figma", category: "Design" }
];

export const skillsData = {
  categories: [
    {
      title: "Frontend Engineering",
      id: "frontend",
      description: "Crafting fluid, accessible, and ultra-responsive interfaces with state-of-the-art tooling.",
      skills: [
        { name: "React.js / React 18", level: 95 },
        { name: "Next.js (App Router)", level: 88 },
        { name: "TypeScript / Modern ES6+", level: 92 },
        { name: "Tailwind CSS / UI Systems", level: 96 },
        { name: "Framer Motion & GSAP", level: 86 },
        { name: "HTML5 / Semantic Web", level: 98 },
        { name: "Redux Toolkit & Zustand", level: 90 },
        { name: "Responsive Web Architecture", level: 95 }
      ]
    },
    {
      title: "Backend & Systems",
      id: "backend",
      description: "Architecting resilient server infrastructure, secure authentication, and microservice APIs.",
      skills: [
        { name: "Node.js Runtime", level: 92 },
        { name: "Express.js Framework", level: 94 },
        { name: "RESTful API Engineering", level: 96 },
        { name: "JWT, OAuth & RBAC Auth", level: 90 },
        { name: "WebSocket & Realtime", level: 84 },
        { name: "Microservices & Serverless", level: 82 },
        { name: "Performance Caching & Redis", level: 80 }
      ]
    },
    {
      title: "Databases & Storage",
      id: "database",
      description: "Structuring high-throughput schemas, query optimization, and relational data modeling.",
      skills: [
        { name: "MongoDB & Mongoose", level: 94 },
        { name: "MySQL Relational Engine", level: 88 },
        { name: "PostgreSQL", level: 86 },
        { name: "Firebase Firestore / Cloud", level: 85 },
        { name: "Data Aggregation Pipelines", level: 90 },
        { name: "Database Indexing & Tuning", level: 84 }
      ]
    },
    {
      title: "Tools, DevOps & Cloud",
      id: "tools",
      description: "Automating workflows, deployment pipelines, containerization, and developer tooling.",
      skills: [
        { name: "Git & Collaborative GitHub", level: 94 },
        { name: "Vite & Modern Build Tools", level: 92 },
        { name: "Docker & Container Basics", level: 80 },
        { name: "Vercel & Netlify Deployment", level: 95 },
        { name: "Postman & API Testing", level: 92 },
        { name: "Linux / VPS Server Config", level: 84 },
        { name: "Figma to Code Fidelity", level: 90 }
      ]
    }
  ]
};

export const projectsData = [
  {
    id: "jnvu-theatre-cell",
    slug: "jnvu-theatre-cell",
    title: "JNVU Theatre Cell",
    subtitle: "Official University Theatre & Arts Portal",
    category: "Websites",
    categoryLabel: "Official Website",
    index: "01",
    featured: true,
    year: "2024",
    client: "Jai Narain Vyas University",
    role: "Lead Full-Stack Developer",
    duration: "4 Months",
    liveUrl: "https://theatre.jnvu.edu.in",
    githubUrl: "https://github.com/vasugoyal/jnvu-theatre-cell",
    coverImage: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=80",
    overview: "A bespoke digital hub for Jai Narain Vyas University's prestigious Theatre Cell. Designed to broadcast upcoming stage productions, archive dramatic history, showcase talent portfolios, and handle automated audience registrations.",
    problem: "The theatre cell relied on fragmented social channels and offline paper forms for festival schedules, cast audition registrations, and performance archives. Information was frequently lost and festival ticketing created massive logistical bottlenecks.",
    solution: "Engineered an end-to-end, high-performance web platform featuring a dynamic event schedule engine, instant artist profile directories, multimedia production galleries with lazy-loaded media streaming, and an automated ticketing confirmation system.",
    architecture: [
      "Custom React frontend with Framer Motion transitions for stage-worthy theatrical presentation",
      "Node.js & Express REST API with automated seat booking reservation locks",
      "MongoDB database modeling multi-tier roles (Director, Cast, Crew, Public)",
      "Cloudinary integration for optimized image and video asset delivery"
    ],
    keyFeatures: [
      "Interactive Production Showcase with cast & crew credits",
      "Audition portal with digital portfolio submissions & review pipeline",
      "Automated event calendar with RSVP & instant e-ticket QR generation",
      "Digital dramatics archive documenting past stage plays, synopses, and photo journals",
      "Admin CMS allowing non-technical theatre coordinators to update shows effortlessly"
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Framer Motion", "Cloudinary"],
    metrics: [
      { label: "Festival Registrations", value: "8,500+" },
      { label: "Page Load Speed", value: "0.8s" },
      { label: "User Satisfaction", value: "99%" },
      { label: "Admin Time Saved", value: "70%" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "hrms",
    slug: "hrms",
    title: "HRMS Enterprise Portal",
    subtitle: "Human Resource & Workforce Operating System",
    category: "Management Systems",
    categoryLabel: "Enterprise Platform",
    index: "02",
    featured: true,
    year: "2024",
    client: "Enterprise Workforce Solutions",
    role: "Full-Stack Architect",
    duration: "6 Months",
    liveUrl: "https://hrms.vasugoyal.dev",
    githubUrl: "https://github.com/vasugoyal/hrms-enterprise",
    coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    overview: "A comprehensive, multi-tenant Human Resource Management System built to orchestrate the complete employee lifecycle—from onboarding and shift scheduling to real-time biometric attendance and automated payroll processing.",
    problem: "Mid-to-large sized enterprises struggled with disjointed spreadsheets, manual leave reconciliation, and error-prone tax calculations, causing delayed payroll runs and employee dissatisfaction.",
    solution: "Designed a centralized enterprise dashboard featuring automated leave accrual logic, real-time geofenced clock-in, interactive organizational charts, compliance-ready payroll generators, and instant PDF payslips.",
    architecture: [
      "Modular React dashboard utilizing role-based access control (RBAC) across Super Admin, HR, Manager, and Employee tiers",
      "Node.js backend with clustered processes for bulk payroll computational runs",
      "PostgreSQL relational engine with strict ACID transactions ensuring zero discrepancy in salary ledgers",
      "Redis caching layer for instant organizational hierarchy lookups and notification broadcasts"
    ],
    keyFeatures: [
      "Dynamic Employee Directory with hierarchical reporting visualization",
      "Multi-level Leave Approval Workflows with instant notifications",
      "Automated Payroll Engine calculating deductions, taxes, bonuses, and net pay",
      "Attendance telemetry tracking shifts, overtime, and biometric logs",
      "Performance evaluation scoring with 360-degree review cycles"
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Redis"],
    metrics: [
      { label: "Payroll Processing Time", value: "92% Faster" },
      { label: "Active Daily Users", value: "1,200+" },
      { label: "Attendance Accuracy", value: "99.9%" },
      { label: "Error Rate Reduction", value: "95%" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "tender-management-system",
    slug: "tender-management-system",
    title: "Tender Management System",
    subtitle: "Secure E-Procurement & Bid Lifecycle Engine",
    category: "Portals",
    categoryLabel: "GovTech / Procurement",
    index: "03",
    featured: true,
    year: "2023",
    client: "Infrastructure & Procurement Corp",
    role: "Full-Stack Security & Core Developer",
    duration: "5 Months",
    liveUrl: "https://tenders.vasugoyal.dev",
    githubUrl: "https://github.com/vasugoyal/tender-management-system",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    overview: "An enterprise-grade e-procurement portal engineered for publishing, tracking, evaluating, and awarding high-value municipal and commercial tenders with rigorous cryptographic integrity.",
    problem: "Traditional procurement was plagued by opaque document handling, manual bid opening vulnerabilities, vendor credential tampering, and lack of audit trails.",
    solution: "Built a tamper-evident procurement portal incorporating encrypted bid submissions (sealed bid auction model), verifiable vendor KYC verification, automated technical eligibility scorecards, and complete immutability logs.",
    architecture: [
      "React single-page application with strict sanitization, multi-factor authorization, and session heartbeat guards",
      "Express.js backend equipped with time-locked document decrypters (bids cannot be unsealed before deadline)",
      "MongoDB database utilizing change-stream audit tracking for regulatory compliance",
      "AWS S3 bucket policy with versioning and client-side encryption for tender RFP attachments"
    ],
    keyFeatures: [
      "Sealed Digital Bidding Vault with automated unsealing schedule countdown",
      "Vendor Verification & Compliance Dossier with automated status scoring",
      "Real-time Tender Telemetry Dashboard for evaluation committees",
      "Automated Bid Comparison Matrix generating financial ranking reports (L1, L2, L3)",
      "Comprehensive Audit Log capturing every interaction, download, and state transition"
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT Security", "AWS S3"],
    metrics: [
      { label: "Tenders Published", value: "450+" },
      { label: "Procurement Volume", value: "$12M+" },
      { label: "Audit Compliance", value: "100%" },
      { label: "Turnaround Time", value: "3x Faster" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "nexus-analytics-portal",
    slug: "nexus-analytics-portal",
    title: "Nexus Analytics Portal",
    subtitle: "Real-Time Telemetry & Operations Dashboard",
    category: "Portals",
    categoryLabel: "SaaS Dashboard",
    index: "04",
    featured: false,
    year: "2024",
    client: "Nexus Cloud Corp",
    role: "Full-Stack Developer",
    duration: "3 Months",
    liveUrl: "https://nexus-portal.example.com",
    githubUrl: "https://github.com/vasugoyal/nexus-analytics",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    overview: "A lightning-fast operations portal providing engineering teams with unified visibility into server health, API traffic latency, uptime monitoring, and error tracking across multi-cloud clusters.",
    problem: "Engineers were constantly context-switching across 6 separate monitoring utilities, delaying incident response times during production outages.",
    solution: "Consolidated all telemetry streams into a single high-contrast dark dashboard powered by WebSockets, providing sub-second latency graphs, incident triage playbooks, and automated alert routing.",
    architecture: [
      "React + Vite frontend rendering 60fps canvas-accelerated charts",
      "Node.js microservice consuming event streams from Kafka and Redis Pub/Sub",
      "InfluxDB time-series database optimized for millisecond-interval telemetry records",
      "Tailwind CSS custom dark mode UI matching military-grade NOC command centers"
    ],
    keyFeatures: [
      "Sub-second live streaming latency and throughput charts",
      "Anomaly detection with threshold triggers and Slack webhooks",
      "Customizable metric grids with drag-and-drop widget layout persistence",
      "Incident room integration with one-click rollback triggers"
    ],
    techStack: ["React", "TypeScript", "Node.js", "Redis", "Tailwind CSS", "Chart.js"],
    metrics: [
      { label: "Incident MTTR", value: "-45%" },
      { label: "Data Points / Sec", value: "50,000" },
      { label: "Dashboard Render", value: "<16ms" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "aurora-studio-web",
    slug: "aurora-studio-web",
    title: "Aurora Creative Studio",
    subtitle: "Awwwards-Caliber Digital Agency Platform",
    category: "Websites",
    categoryLabel: "Brand Platform",
    index: "05",
    featured: false,
    year: "2023",
    client: "Aurora Creative Agency",
    role: "Frontend Engineer",
    duration: "2 Months",
    liveUrl: "https://aurora-studio.example.com",
    githubUrl: "https://github.com/vasugoyal/aurora-studio",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    overview: "A visually breathtaking, award-winning agency portfolio site spotlighting architectural 3D scenes, smooth scroll-driven typography reveals, and immersive video textures.",
    problem: "The client needed a digital brand experience that signaled elite tier prestige to attract Fortune 500 creative contracts.",
    solution: "Developed a custom GSAP + Three.js web experience featuring magnetic interactions, smooth inertia scrolling, and customized WebGL shader canvas ripples.",
    architecture: [
      "React + React Three Fiber for WebGL canvas backgrounds",
      "GSAP ScrollTrigger orchestrating complex pinned layout narratives",
      "Lenis smooth scroll integration delivering seamless friction-free browsing"
    ],
    keyFeatures: [
      "Interactive 3D particle landscape reacting to mouse movement",
      "Kinetic text splits and distortion masks on scroll",
      "Custom cursor with context-aware magnification and blend modes"
    ],
    techStack: ["React", "Three.js", "GSAP", "Tailwind CSS", "Lenis"],
    metrics: [
      { label: "Inbound Leads", value: "+180%" },
      { label: "Avg Session Duration", value: "3m 42s" },
      { label: "Awwwards Nominee", value: "Honorable" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

export const experienceData = [
  {
    period: "2023 — Present",
    role: "Lead Full-Stack Web Developer",
    company: "Freelance & Enterprise Consulting",
    location: "Remote / Hybrid",
    description: "Architecting, building, and maintaining bespoke web applications, enterprise portals, and high-conversion client websites.",
    highlights: [
      "Engineered the official JNVU Theatre Cell portal, scaling audience event registrations by 300%.",
      "Built an enterprise-ready HRMS application complete with payroll automation, attendance tracking, and RBAC security.",
      "Developed the e-procurement Tender Management System, implementing cryptographic sealed bidding and audit pipelines.",
      "Consulted with startups and businesses on web performance optimization, reducing core web vitals load times below 1 second."
    ],
    skills: ["React", "Node.js", "TypeScript", "Express", "MongoDB", "PostgreSQL", "Tailwind CSS", "GSAP"]
  },
  {
    period: "2022 — 2023",
    role: "Full-Stack Developer",
    company: "Digital Technology Solutions",
    location: "India",
    description: "Developed and maintained full-stack web applications, automated business workflows, and integrated third-party APIs.",
    highlights: [
      "Architected responsive single-page applications in React and modern CSS frameworks.",
      "Designed secure RESTful API endpoints in Node.js & Express with JWT authentication.",
      "Optimized SQL and NoSQL database schemas, resulting in 40% query latency reduction.",
      "Collaborated closely with UI/UX designers to translate Figma design systems into pixel-perfect code."
    ],
    skills: ["JavaScript (ES6+)", "React.js", "Node.js", "Express", "MySQL", "MongoDB", "REST APIs", "Git"]
  },
  {
    period: "2021 — 2022",
    role: "Frontend Web Developer & Webmaster",
    company: "Creative Web Studio",
    location: "India",
    description: "Built client websites, handled domain and hosting configurations, and maintained live web portals.",
    highlights: [
      "Delivered 12+ bespoke corporate websites and landing pages with cross-browser compatibility.",
      "Managed website maintenance routines, security patches, uptime monitoring, and SEO improvements.",
      "Integrated payment gateways, lead-generation forms, and interactive analytics dashboards.",
      "Enhanced mobile responsiveness and Lighthouse scores across all client portfolios."
    ],
    skills: ["HTML5", "CSS3 / Sass", "JavaScript", "React", "WordPress / CMS", "SEO", "Responsive Design"]
  }
];

export const servicesData = [
  {
    number: "01",
    title: "Website Development",
    short: "Bespoke, award-level web applications built with React, Next.js, and modern CSS.",
    description: "I craft lightning-fast, high-converting websites tailored specifically to your brand. From corporate showcases to creative agency portfolios, every build features fluid micro-animations, bulletproof responsiveness, and pristine code.",
    deliverables: ["Custom React / Next.js Architecture", "Awwwards-Style Micro-Interactions", "Mobile-First Responsive Design", "SEO & Core Web Vitals 95+"]
  },
  {
    number: "02",
    title: "Web Portal Development",
    short: "Enterprise portals, administration hubs, and complex data-driven dashboards.",
    description: "Specialized in translating sophisticated business logic into clean, intuitive web portals. Experienced in building multi-tier access systems, e-procurement engines, and real-time operational hubs with strict security standards.",
    deliverables: ["Role-Based Access Control (RBAC)", "Complex Data Grids & Filters", "Secure Authentication & Sessions", "Scalable Database Schemas"]
  },
  {
    number: "03",
    title: "Website Management & Maintenance",
    short: "End-to-end uptime monitoring, security patching, feature expansion, and speed tuning.",
    description: "Your digital platform needs continuous care to remain fast, secure, and compatible with evolving web standards. I provide proactive maintenance, automated backup routines, cloud monitoring, and rapid bug resolution.",
    deliverables: ["24/7 Health & Uptime Telemetry", "Routine Security & Dependency Audits", "Database Backups & Redundancy", "Performance & CDN Tuning"]
  },
  {
    number: "04",
    title: "API Engineering & Integration",
    short: "Robust RESTful APIs, third-party payment gateways, and real-time WebSocket pipelines.",
    description: "Connecting your frontend to secure, scalable backend architectures. I build hardened Node.js/Express APIs, integrate transactional mailers, webhook listeners, payment providers (Stripe, Razorpay), and cloud storage services.",
    deliverables: ["RESTful API Architecture", "Payment & SMS Gateway Integration", "Cloud Storage & Media Pipelines", "Automated API Documentation"]
  },
  {
    number: "05",
    title: "UI/UX & Design Implementation",
    short: "Transforming Figma designs into living, breathing web experiences with obsessive precision.",
    description: "Bridging the gap between design and engineering. I take design tokens, wireframes, and prototypes and implement them into component-driven codebases with 100% fidelity, kinetic transitions, and tactile hover states.",
    deliverables: ["Pixel-Perfect Figma Translation", "Custom Motion Choreography", "Design System Tokenization", "Accessible ARIA Standards"]
  }
];

export const testimonialsData = [
  {
    quote: "Vasu completely redefined our digital presence. The JNVU Theatre Cell website went from an idea to a gorgeous, reliable portal that handled thousands of registrations during our annual fest without breaking a sweat.",
    author: "Prof. Arvind Sharma",
    role: "Theatre Director & Faculty Coordinator",
    organization: "JNVU Theatre Cell",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Finding a developer who understands both complex backend database queries and stunning frontend motion design is rare. Vasu delivered our HRMS ahead of schedule with zero friction.",
    author: "Rajesh Kothari",
    role: "VP of Engineering & HR Operations",
    organization: "Workforce Enterprises",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "The Tender Management System Vasu engineered was audited by strict compliance teams and passed with flying colors. The sealed-bid encryption and audit log features gave all bidders total confidence.",
    author: "Sunita Verma",
    role: "Procurement Committee Head",
    organization: "State Infrastructure Hub",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Vasu is a powerhouse full-stack developer. His speed of execution, aesthetic taste, and attention to detail make him our go-to partner for all web portal projects.",
    author: "Vikram Malhotra",
    role: "Product Founder",
    organization: "Apex Digital Labs",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

export const contactData = {
  heading: "LET'S BUILD SOMETHING AMAZING",
  subheading: "Have a project in mind, need a web portal, or looking for an experienced full-stack developer? Let's discuss your vision.",
  emailServiceId: "service_portfolio", // Replace with your EmailJS service ID
  emailTemplateId: "template_portfolio", // Replace with your EmailJS template ID
  emailPublicKey: "YOUR_EMAILJS_PUBLIC_KEY", // Replace with your EmailJS public key
  officeLocation: "Available Worldwide (IST / UTC+5:30)",
  typicalResponseTime: "Under 12 hours"
};
