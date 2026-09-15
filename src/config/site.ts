export const siteConfig = {
  name: "Nisar Ahmed",
  role: "Full-Stack Developer",
  secondaryRole: "MERN Stack Developer",
  company: "Inbyo Tech",
  description: "I build fast, scalable, and thoughtful digital experiences across the full stack.",
  email: "nisarbaloshi786@gmail.com",
  location: "Pakistan",
  
  social: {
    github: "https://github.com/Nisar-baloch",
    // We use environment variables for potentially sensitive or changing URLs if needed,
    // but a centralized config works well for this too. Let's provide a sensible default
    // or fallback to an empty string to be handled by the UI.
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#", 
  },
  
  stats: {
    codingHours: 5223,
    coffeeCups: 1306,
  },
  
  favoriteTool: {
    name: "Next.js",
    icon: "nextjs", // Can map to an SVG locally
  },

  projects: [
    {
      title: "EarthShop",
      description: "Django-based shop / inventory management system.",
      technologies: ["Python", "Django", "Bootstrap", "SQLite"],
      image: "/images/projects/earthshop.jpg",
      github: "https://github.com/Nisar-baloch",
      live: "#",
      fallbackColor: "from-blue-500/20 to-indigo-500/20",
    },
    {
      title: "Student Management System",
      description: "A Django CRUD-based student management system with roll numbers and admin features.",
      technologies: ["Python", "Django", "Bootstrap", "SQLite"],
      image: "/images/projects/student-management.jpg",
      github: "https://github.com/Nisar-baloch",
      live: "#",
      fallbackColor: "from-emerald-500/20 to-teal-500/20",
    },
    {
      title: "MERN Full-Stack Application",
      description: "A modern full-stack application built using the MERN ecosystem with robust state management and API integration.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Mongoose", "Tailwind CSS"],
      image: "/images/projects/mern-app.jpg",
      github: "https://github.com/Nisar-baloch",
      live: "#",
      fallbackColor: "from-yellow-500/20 to-orange-500/20",
    },
    {
      title: "Inbyo Tech Platform",
      description: "Digital technology and software services platform for my company.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      image: "/images/projects/inbyo-tech.jpg",
      github: "#",
      live: "#",
      fallbackColor: "from-purple-500/20 to-pink-500/20",
    },
  ],

  hobbies: [
    {
      id: "01",
      title: "Reading",
      description: "Exploring tech blogs, engineering articles, and self-improvement books.",
      image: "/images/hobbies/hobby-1.jpg",
      fallbackColor: "from-slate-500/20 to-zinc-500/20",
    },
    {
      id: "02",
      title: "Open Source",
      description: "Contributing to community projects and exploring new repositories.",
      image: "/images/hobbies/hobby-2.jpg",
      fallbackColor: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: "03",
      title: "UI/UX Design",
      description: "Experimenting with modern design trends and building prototypes.",
      image: "/images/hobbies/hobby-3.jpg",
      fallbackColor: "from-rose-500/20 to-red-500/20",
    },
  ]
};
