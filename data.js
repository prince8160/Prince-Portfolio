/**
 * KALLA PRINCE — PORTFOLIO DATA CONFIGURATION
 * 
 * Edit your personal info, projects, skills, and experience easily from this single file.
 */

const portfolioData = {
  personal: {
    firstName: "KALLA",
    lastName: "PRINCE",
    fullName: "Kalla Prince",
    role: "Creative Web Developer & UI Engineer",
    statusText: "AVAILABLE FOR WORK",
    welcomeBadge: "WELCOME TO MY UNIVERSE",
    heroDescription: "Creative web developer focused on building modern, responsive, and visually engaging websites with clean design, smooth user experience, and premium-quality digital aesthetics.",
    aboutParagraph1: "I am a passionate web developer with a keen eye for aesthetics and a strong technical foundation. I specialize in building highly interactive, responsive, and performant web applications that leave a lasting impression.",
    aboutParagraph2: "My approach combines clean code architecture with premium design principles, ensuring every project not only functions flawlessly but looks extraordinary.",
    visionStatement: "Transforming complex problems into elegant, intuitive, and modern web solutions.",
    email: "kallaprince221@gmail.com",
    location: "Available Worldwide / Remote",
    resumeUrl: "resume.html", // Opens the dedicated resume viewer in a new tab
    resumeImageUrl: "assets/Resume.png", // Direct path to the resume image asset
    socials: {
      github: "https://github.com/prince8160",
      linkedin: "https://www.linkedin.com/in/prince-kala-b38754334?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://www.instagram.com/prinsu_kalla?igsh=MXRodjJocjl3MG41bw==",
      email: "mailto:kallaprince221@gmail.com"
    }
  },

  stats: [
    { number: "2+", label: "YEARS EXPERIENCE", sub: "Hands-on frontend & creative craft" },
    { number: "30+", label: "PROJECTS DELIVERED", sub: "Across clinics, startups & brands" },
    { number: "100%", label: "CODE QUALITY", sub: "Clean, scalable & responsive" },
    { number: "99%", label: "CLIENT SATISFACTION", sub: "Delivering beyond expectations" }
  ],

  services: [
    {
      id: "ui-ux",
      title: "UI/UX Design",
      desc: "Crafting premium, intuitive, and modern user interfaces with a focus on immersive experiences, design systems, and glassmorphism aesthetics.",
      iconClass: "icon-purple",
      features: [
        "Design Systems & Wireframes",
        "Glassmorphic & Dark Aesthetics",
        "Interactive Prototyping"
      ]
    },
    {
      id: "frontend",
      title: "Frontend Development",
      desc: "Building high-performance, pixel-perfect web applications using React, Next.js, TypeScript, and modern CSS frameworks with optimized rendering.",
      iconClass: "icon-pink",
      features: [
        "React & Next.js Architecture",
        "State Management & APIs",
        "Blazing Fast Load Times"
      ]
    },
    {
      id: "responsive",
      title: "Responsive Layouts",
      desc: "Ensuring your website looks and interacts flawlessly on all devices, from ultra-wide 4K desktop monitors down to mobile screens.",
      iconClass: "icon-orange",
      features: [
        "Fluid Adaptive Breakpoints",
        "Touch-Optimized Interactions",
        "Cross-Browser Consistency"
      ]
    },
    {
      id: "motion",
      title: "Interactive Animation",
      desc: "Adding cinematic motion, 60fps scroll effects, Canvas/3D frame sequences, and micro-interactions to make the digital experience feel alive.",
      iconClass: "icon-cyan",
      features: [
        "Scroll-Driven Canvas Sequences",
        "Physics Lerp & Micro-Animations",
        "High Framerate Performance"
      ]
    }
  ],

  skills: [
    { name: "HTML5", category: "Semantic Architecture", badge: "Core", color: "#f97316" },
    { name: "CSS3 / SCSS", category: "Modern Styling & FX", badge: "Core", color: "#38bdf8" },
    { name: "JavaScript", category: "ES6+ & Web APIs", badge: "Advanced", color: "#facc15" },
    { name: "React.js", category: "Component Architecture", badge: "Advanced", color: "#06b6d4" },
    { name: "Next.js", category: "SSR & Fullstack Web", badge: "Framework", color: "#ffffff" },
    { name: "Tailwind CSS", category: "Utility-First Styling", badge: "Proficient", color: "#38bdf8" },
    { name: "Bootstrap", category: "Responsive Framework", badge: "Proficient", color: "#a855f7" },
    { name: "Git & GitHub", category: "Version Control", badge: "Workflow", color: "#f43f5e" },
    { name: "Responsive Design", category: "Mobile-First Layouts", badge: "Mastery", color: "#10b981" }
  ],

  experience: [
    {
      year: "2024 — PRESENT",
      role: "Freelance Creative Web Developer",
      company: "Independent Practice",
      desc: "Architecting custom dental clinic platforms, commercial websites, and high-performance frontend solutions with smooth UI animations and patient conversion funnels.",
      tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "UI/UX"]
    },
    {
      year: "2023 — 2024",
      role: "Frontend Developer & UI Specialist",
      company: "Client Solutions & Web Systems",
      desc: "Engineered responsive web applications, created custom design systems, optimized Lighthouse performance scores, and built interactive interfaces for local businesses.",
      tags: ["JavaScript (ES6+)", "CSS3 Architecture", "Bootstrap", "Git", "REST APIs"]
    },
    {
      year: "2022 — 2023",
      role: "Web Development & UI/UX Foundation",
      company: "Core Training & Digital Craft",
      desc: "Mastered semantic HTML5, modern CSS grids/flexbox, component-driven development, and interactive animation principles to craft award-style web experiences.",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    }
  ],

  projects: [
    {
      id: "demo-1",
      demoLabel: "DEMO 1",
      title: "Shree Chehar Clinic",
      description:
        "Modern dental clinic web application featuring appointment booking, doctor profiles, treatments overview, and patient-first UI architecture.",
      image: "assets/image 1.png",
      tags: ["React", "Next.js", "Tailwind CSS"],
      demoUrl: "https://chehardentalclinic.netlify.app/",
      githubUrl: "https://github.com/prince8160",
      featured: true
    },
    {
      id: "demo-2",
      demoLabel: "DEMO 2",
      title: "DEESADENTAL",
      description:
        "Comprehensive dental clinic platform featuring treatment showcases, online consultation booking, clinic features, and mobile-optimized layouts.",
      image: "assets/image 2.png",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      demoUrl: "https://frabjous-gaufre-155dc9.netlify.app/",
      githubUrl: "https://github.com/prince8160",
      featured: true
    },
    {
      id: "demo-3",
      demoLabel: "DEMO 3",
      title: "Tanmay Dental Clinic",
      description:
        "A premium dental clinic website built with a modern aesthetic, clear service presentations, doctor credentials, and a high-conversion booking layout.",
      image: "assets/image 3.png",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      demoUrl: "https://tanmaydentalclinic.netlify.app/#home",
      githubUrl: "https://github.com/prince8160",
      featured: true
    },
    {
      id: "demo-4",
      demoLabel: "DEMO 4",
      title: "Deesa ITI",
      description:
        "A modern institutional web portal for ITI Deesa featuring vocational course information, admissions, institute details, and a responsive user-friendly interface.",
      image: "assets/image 4.png",
      tags: ["React", "Next.js", "Tailwind CSS"],
      demoUrl: "https://itideesa.netlify.app/",
      githubUrl: "https://github.com/prince8160",
      featured: true
    },
    {
      id: "demo-5",
      demoLabel: "DEMO 5",
      title: "Hardik Limbachiya",
      description:
        "A modern responsive personal portfolio website showcasing skills, projects, creative work, and professional achievements.",
      image: "assets/image 5.png",
      tags: ["React", "Node.js", "MongoDB"],
      demoUrl: "https://hardiklimbachiya.netlify.app/",
      githubUrl: "https://github.com/prince8160",
      featured: true
    },
    {
      id: "demo-6",
      demoLabel: "DEMO 6",
      title: "PRINCE Portfolio",
      description:
        "A modern personal portfolio website designed to showcase projects, skills, experience, and professional work with a premium responsive interface.",
      image: "assets/image 6.png",
      tags: ["React", "Next.js", "Tailwind CSS"],
      demoUrl: "https://prinsuportfolio.netlify.app/",
      githubUrl: "https://github.com/prince8160",
      featured: true
    }
  ]
};

// Export to window for browser script access
window.portfolioData = portfolioData;
