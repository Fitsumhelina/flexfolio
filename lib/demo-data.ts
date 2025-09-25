// Comprehensive demo data for the portfolio showcase

export const demoUserData = {
  name: "Alex Chen",
  title: "Full Stack Developer & UI/UX Designer",
  bio: "Passionate about creating beautiful, functional web applications that solve real-world problems. With 5+ years of experience in modern web technologies, I specialize in building scalable solutions that deliver exceptional user experiences.",
  experience: "5+",
  projectsCompleted: "50+",
  email: "alex.chen@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  profileImageBorderColor: "#3B82F6",
  github: "https://github.com/alexchen",
  linkedin: "https://linkedin.com/in/alexchen",
  x: "https://x.com/alexchen_dev",
  telegram: "https://t.me/alexchen_dev",
  heroTitle: "Architect of the Web & Digital Alchemist",
  heroDescription: "From a young age, I've been captivated by the logic and creativity of code. At 16, I've already dived deep into the professional development world, transforming complex problems into elegant, high-performance digital solutions. My expertise spans the full stack, from crafting beautiful, intuitive user interfaces to engineering robust and scalable backend systems.",
}

export const demoProjects = [
  {
    id: "p1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with advanced features including real-time inventory management, payment processing, and admin dashboard. Built with modern technologies and optimized for performance.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    github: "https://github.com/alexchen/ecommerce-platform",
    live: "https://ecommerce-demo.vercel.app",
    status: "completed"
  },
  {
    id: "p2",
    title: "AI-Powered Analytics Dashboard",
    description: "An intelligent analytics platform that processes large datasets and provides actionable insights through interactive visualizations and machine learning algorithms.",
    tech: ["React", "Python", "TensorFlow", "D3.js", "FastAPI", "Redis"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    github: "https://github.com/alexchen/ai-analytics",
    live: "https://analytics-demo.vercel.app",
    status: "completed"
  },
  {
    id: "p6",
    title: "Blockchain Voting System",
    description: "A decentralized voting platform built on blockchain technology ensuring transparency, security, and immutability of votes with smart contract integration.",
    tech: ["React", "Solidity", "Web3.js", "Ethereum", "IPFS", "MetaMask"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    github: "https://github.com/alexchen/blockchain-voting",
    live: "https://voting-demo.vercel.app",
    status: "completed"
  }
]

export const demoSkills = [
  // Frontend Technologies
  { id: "s-fe-1", name: "React", category: "Frontend", proficiency: 95 },
  { id: "s-fe-2", name: "Next.js", category: "Frontend", proficiency: 92 },
  { id: "s-fe-3", name: "TypeScript", category: "Frontend", proficiency: 90 },
  { id: "s-fe-4", name: "Tailwind CSS", category: "Frontend", proficiency: 88 },
  { id: "s-fe-5", name: "Vue.js", category: "Frontend", proficiency: 85 },
  { id: "s-fe-6", name: "Svelte", category: "Frontend", proficiency: 80 },
  { id: "s-fe-7", name: "D3.js", category: "Frontend", proficiency: 82 },
  { id: "s-fe-8", name: "Three.js", category: "Frontend", proficiency: 75 },
  
  // Backend Technologies
  { id: "s-be-1", name: "Node.js", category: "Backend", proficiency: 90 },
  { id: "s-be-2", name: "Python", category: "Backend", proficiency: 88 },
  { id: "s-be-3", name: "Express.js", category: "Backend", proficiency: 92 },
  { id: "s-be-4", name: "FastAPI", category: "Backend", proficiency: 85 },
  { id: "s-be-5", name: "GraphQL", category: "Backend", proficiency: 83 },
  { id: "s-be-6", name: "REST APIs", category: "Backend", proficiency: 95 },
  
  // Cloud & DevOps
  { id: "s-dev-1", name: "AWS", category: "Cloud & DevOps", proficiency: 85 },
  { id: "s-dev-2", name: "Docker", category: "Cloud & DevOps", proficiency: 88 },
  { id: "s-dev-3", name: "Kubernetes", category: "Cloud & DevOps", proficiency: 75 },
  { id: "s-dev-4", name: "Vercel", category: "Cloud & DevOps", proficiency: 92 },
  { id: "s-dev-5", name: "GitHub Actions", category: "Cloud & DevOps", proficiency: 87 },
  { id: "s-dev-6", name: "CI/CD", category: "Cloud & DevOps", proficiency: 85 },

]

export const demoMessages = [
  {
    id: "msg1",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    subject: "Frontend Developer Position",
    message: "Hi Alex, I came across your portfolio and I'm impressed by your work on the e-commerce platform. We're looking for a senior frontend developer to join our team. Would you be interested in discussing this opportunity?",
    timestamp: new Date("2024-01-15T10:30:00Z"),
    read: false
  },
  {
    id: "msg2",
    name: "Michael Chen",
    email: "michael@startup.io",
    subject: "Collaboration on AI Project",
    message: "Hello Alex, your AI analytics dashboard caught my attention. We're building a similar product and would love to collaborate or have you as a consultant. Let's schedule a call!",
    timestamp: new Date("2024-01-14T14:20:00Z"),
    read: true
  },
  {
    id: "msg3",
    name: "Emily Rodriguez",
    email: "emily@designstudio.com",
    subject: "UI/UX Design Consultation",
    message: "Hi Alex, I'm a UI/UX designer and I'm really impressed by your design skills shown in your projects. Would you be interested in collaborating on some client projects?",
    timestamp: new Date("2024-01-13T09:15:00Z"),
    read: true
  },
  {
    id: "msg4",
    name: "David Kim",
    email: "david@fintech.com",
    subject: "Mobile Banking App Development",
    message: "Hello Alex, your mobile banking app project is exactly what we're looking for. We have a similar project and would like to discuss potential collaboration opportunities.",
    timestamp: new Date("2024-01-12T16:45:00Z"),
    read: false
  }
]
