// ============================================================
// data/resume.ts  — Single source of truth from resume
// ============================================================

export const personal = {
  name: 'Mohan Babu M',
  title: 'Full Stack Developer & Software Engineer',
  tagline: 'Crafting AI-powered digital experiences',
  location: 'Tirupur, Tamil Nadu, India',
  email: 'mohanbabu2502@gmail.com',
  phone: '+91 8610987397',
  github: 'https://github.com/mohan-ux',
  linkedin: 'https://linkedin.com/in/mohan-babu-m-9a166431b',
  leetcode: 'https://leetcode.com/u/cartooncity77',
  summary:
    'Full Stack Software Engineer proficient in JavaScript, React.js, Node.js, and MongoDB, with hands-on experience in Docker and CI/CD pipelines on AWS. Built and shipped responsive web applications during a live internship, and applied AI/ML and LLM integration techniques on independent projects.',
};

export const stats = [
  { value: '8.5', label: 'CGPA' },
  { value: '4+', label: 'Projects' },
  { value: '3', label: 'Certifications' },
  { value: '2+', label: 'Yrs Exp' },
];

export const roles = [
  'Full Stack Applications',
  'AI-Powered Products',
  'Cloud Infrastructure',
  'LLM Integrations',
];

export const skills = [
  {
    category: 'Languages',
    icon: 'code',
    items: ['JavaScript', 'Java', 'Python', 'SQL', 'Bash'],
  },
  {
    category: 'Frontend & Backend',
    icon: 'layers',
    items: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Redux'],
  },
  {
    category: 'Cloud & DevOps',
    icon: 'cloud',
    items: ['AWS (EC2, S3, Lambda)', 'Docker', 'GitHub Actions', 'CI/CD'],
  },
  {
    category: 'AI & Tools',
    icon: 'brain',
    items: ['LLM APIs', 'TensorFlow', 'OpenAI GPT-4', 'Postman', 'Jira'],
  },
];

export const projects = [
  {
    id: 'codecraft',
    num: '01',
    title: 'CODECRAFT AI',
    category: 'AI · Full Stack · DevOps',
    date: 'Jun 2025 – Apr 2026',
    description:
      'AI-assisted code generation tool built with TypeScript and React, featuring automated project scaffolding and inline error highlighting. Integrated OpenAI GPT-4 API via MCP-based plugin architecture connecting to Notion, Figma, and Calendar. Docker-containerized with VS Code integration.',
    tech: ['TypeScript', 'React', 'OpenAI GPT-4', 'Docker', 'MCP'],
    github: 'https://github.com/mohan-ux',
    color: '#6366f1',
  },
  {
    id: 'adaptlearn',
    num: '02',
    title: 'ADAPTLEARN AI',
    category: 'AI · Full Stack · EdTech',
    date: 'Jan 2024 – Apr 2024',
    description:
      'AI-powered adaptive learning platform using React and Node.js with personalized content delivery and progress tracking. WebSocket-based interactive coding sandbox with real-time AI tutoring using LLaMA 2. RESTful API with MongoDB indexing and Redis caching.',
    tech: ['React', 'Node.js', 'LLaMA 2', 'MongoDB', 'Redis', 'WebSocket'],
    github: 'https://github.com/mohan-ux',
    color: '#a855f7',
  },
  {
    id: 'diaflow',
    num: '03',
    title: 'DIAFLOW',
    category: 'AI · NLP · Collaboration',
    date: 'Aug 2023 – Dec 2023',
    description:
      'Text-to-diagram generation tool using React Flow and NLP techniques to convert natural language descriptions into visual diagrams. Implemented WebSocket-based collaborative editing with conflict resolution. Optimized rendering to support 500+ node diagrams.',
    tech: ['React Flow', 'NLP', 'WebSocket', 'JavaScript', 'Node.js'],
    github: 'https://github.com/mohan-ux',
    deployed: 'https://diaflow.onrender.com/',
    color: '#06b6d4',
  },
  {
    id: 'movie',
    num: '04',
    title: 'Movie Booking System',
    category: 'Full Stack · Web',
    date: '2024',
    description:
      'Responsive movie booking web application using React.js, JavaScript ES6+, and Redux for state management with dynamic seat selection and real-time availability. Built 12+ reusable atomic components improving development velocity by 30%.',
    tech: ['React.js', 'Redux', 'JavaScript ES6+', 'Node.js', 'CSS3'],
    github: 'https://github.com/mohan-ux',
    color: '#10b981',
  },
];

export const experience = [
  {
    id: 'novintix',
    role: 'AI Fullstack Developer Intern',
    company: 'Novintix',
    date: 'Dec 2025 – Jul 2026',
    current: true,
    bullets: [
      'Built and maintained full-stack features for AI-powered web applications, integrating LLM APIs into product workflows',
      'Developed RESTful APIs and backend services using Node.js and Express, with MongoDB for data modeling',
      'Built responsive UI components in React.js and participated in Agile ceremonies (sprint planning, standups, code reviews)',
    ],
    tags: ['Node.js', 'React.js', 'LLM APIs', 'MongoDB', 'Agile'],
    icon: '💼',
  },
  {
    id: 'ether',
    role: 'Frontend Developer Intern',
    company: 'Ether Infotech',
    date: 'Jun 2024 – Jul 2024',
    current: false,
    bullets: [
      'Developed a responsive movie booking web application using React.js, JavaScript ES6+, and Redux',
      'Built 12+ reusable atomic components, improving development velocity by 30% across 8+ pages',
    ],
    tags: ['React.js', 'Redux', 'JavaScript ES6+'],
    icon: '💼',
  },
  {
    id: 'btech',
    role: 'B.Tech Information Technology',
    company: 'SNS College of Technology, Coimbatore',
    date: '2022 – 2026',
    current: false,
    bullets: [
      'CGPA: 8.5/10 — Active in coding contests, hackathons, and tech clubs',
      '3-Star Java on HackerRank — algorithmic expertise',
    ],
    tags: ['8.5 CGPA', 'Java 3★', 'Hackathons'],
    icon: '🎓',
  },
  {
    id: 'school',
    role: 'Higher Secondary Education',
    company: 'Saradha Vidhyalaya Matric HSS, Tirupur',
    date: '2021 – 2022',
    current: false,
    bullets: ['Scored 84% — Strong foundation in Mathematics and Science'],
    tags: ['84%'],
    icon: '🏫',
  },
];

export const certifications = [
  {
    id: 'aws',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2025',
    color: '#ff9900',
    emoji: '☁️',
  },
  {
    id: 'sf',
    name: 'Certified Agentforce Specialist',
    issuer: 'Salesforce',
    year: '2025',
    color: '#00a1e0',
    emoji: '⚡',
  },
  {
    id: 'oracle',
    name: 'OCI 2025 AI Foundations Associate',
    issuer: 'Oracle',
    year: '2025',
    color: '#f80000',
    emoji: '🔮',
  },
];
