"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, X, Globe } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Tunisian Taste - Restaurant & Food Ordering Platform",
    description: "Full-stack food delivery platform for authentic Tunisian cuisine. Built responsive restaurant website with interactive menu catalog, real-time cart management, and order tracking system. Implemented Revolut payment integration, admin dashboard for order management, and delivery coordination. Deployed on Azure with optimized performance achieving 95+ Lighthouse score.",
    gradient: "from-purple-600 via-purple-700 to-pink-600",
    bgGradient: "from-purple-500/10 via-purple-600/10 to-pink-500/10",
    borderGradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    glowClass: "glow-purple-strong",
    color: "purple",
    tags: ["E-Commerce", "Restaurant", "Payment Gateway"],
    image: "/tunisian-taste.png",
    link: "https://restaurant-delta-eight-98.vercel.app/",
    tech: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
    ]
  },
  {
    title: "Delivery Agent Portal - Real-Time Order Management",
    description: "Progressive Web App for delivery drivers managing food orders in real-time. Engineered live order tracking with GPS integration, delivery incentive program with gamification (earning €20 per 10 deliveries), and milestone tracking system. Built quick search functionality, real-time status updates via WebSockets, and offline-first architecture with service workers. Deployed on Google Cloud Platform with Firebase for real-time sync.",
    gradient: "from-blue-600 via-blue-700 to-cyan-600",
    bgGradient: "from-blue-500/10 via-blue-600/10 to-cyan-500/10",
    borderGradient: "from-blue-500 via-cyan-500 to-blue-600",
    glowClass: "glow-cyan-strong",
    color: "blue",
    tags: ["PWA", "Real-Time", "Gamification"],
    image: "/delivery-agent.png",
    link: "https://restaurant-delta-eight-98.vercel.app/delivery",
    demoAccount: { username: "bilel", password: "bilel123" },
    tech: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Socket.io", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg", invert: true },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
    ]
  },
  {
    title: "Restaurant Admin Dashboard - Multi-Module Management System",
    description: "Comprehensive restaurant management platform handling orders, menu, promo codes, and delivery agents. Architected real-time order management with live tracking numbers, automated order status workflows, and customer communication system. Built multi-tab navigation for Overview, Orders, Menu Management, Promo Codes, Delivery Agents, and Settings. Implemented secure authentication and role-based access control. Hosted on Azure with scalable cloud infrastructure.",
    gradient: "from-emerald-600 via-emerald-700 to-teal-600",
    bgGradient: "from-emerald-500/10 via-emerald-600/10 to-teal-500/10",
    borderGradient: "from-emerald-500 via-teal-500 to-emerald-600",
    glowClass: "glow-emerald-strong",
    color: "emerald",
    tags: ["Admin Dashboard", "Multi-Tenant", "Real-Time"],
    image: "/admin-dashboard.png",
    link: "https://restaurant-delta-eight-98.vercel.app/admin",
    demoAccount: { password: "admin123" },
    tech: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Socket.io", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg", invert: true },
      { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
    ]
  },
  {
    title: "EcoClicko - Sustainable Learning & Green Action Platform",
    description: "Educational platform promoting environmental awareness through gamification. Built interactive learning modules about eco-friendly practices with 'Play, Learn & Resolve' methodology. Developed partnership system for eco-units, blog content management, and services showcase. Implemented responsive design with 3D illustrations, smooth animations, and multi-language support (French/English). Integrated social sharing and community features.",
    gradient: "from-orange-600 via-orange-700 to-red-600",
    bgGradient: "from-orange-500/10 via-orange-600/10 to-red-500/10",
    borderGradient: "from-orange-500 via-red-500 to-orange-600",
    glowClass: "glow-orange-strong",
    color: "orange",
    tags: ["EdTech", "Sustainability", "Gamification"],
    image: "/ecoclicko.png",
    unavailable: true,
    tech: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", invert: true },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg", invert: true },
    ]
  },
  {
    title: "Healthcare Mobile App - Telemedicine & Doctor Consultation Platform",
    description: "Cross-platform mobile healthcare application connecting patients with doctors. Developed 3D body anatomy visualization for symptom selection, category-based medical services (digestive, cardio, etc.), and doctor profile management system. Built secure video consultation integration, appointment scheduling with calendar sync, and prescription delivery system. Implemented HIPAA-compliant data encryption and secure authentication for patient records.",
    gradient: "from-indigo-600 via-indigo-700 to-purple-600",
    bgGradient: "from-indigo-500/10 via-indigo-600/10 to-purple-500/10",
    borderGradient: "from-indigo-500 via-purple-500 to-indigo-600",
    glowClass: "glow-indigo-strong",
    color: "indigo",
    tags: ["Mobile", "Healthcare", "3D Graphics"],
    image: "/healthcare-app.png",
    link: "https://drive.google.com/file/d/12DDmNPHoc7XDgNt3xVNzS9EimF-6AI5j/view",
    tech: [
      { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", invert: true },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
    ]
  },
  {
    title: "Professional Developer Portfolio - Current Project",
    description: "This portfolio website you're viewing! Modern, high-performance portfolio showcasing full-stack expertise. Engineered custom animations with Framer Motion, starfield effects, 3D globe visualization, and interactive UI components. Built booking system integrated with Google Calendar API, Azure SQL database for data persistence, and automated email notifications with Resend. Implemented advanced SEO optimization, responsive design, and 98+ Lighthouse performance score. Cloud infrastructure powered by Azure and Google Cloud.",
    gradient: "from-pink-600 via-pink-700 to-rose-600",
    bgGradient: "from-pink-500/10 via-pink-600/10 to-rose-500/10",
    borderGradient: "from-pink-500 via-rose-500 to-pink-600",
    glowClass: "glow-pink-strong",
    color: "pink",
    tags: ["Portfolio", "Full-Stack", "Performance"],
    image: "/portfolio.png",
    disabled: true,
    tech: [
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
      { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", invert: true },
    ]
  },
  {
    title: "ANNAVA - French Social Events & Activities Matching Platform",
    description: "Social networking platform connecting people for events and activities in France. Built advanced search system with keyword, location, and date filtering for events (camping, cafés, soirées, outdoor activities). Developed user authentication, event creation workflow, and RSVP management system. Implemented geolocation services for city-based event discovery and trending searches algorithm. Fully multilingual (French) with beautiful gradient UI design.",
    gradient: "from-green-600 via-green-700 to-emerald-600",
    bgGradient: "from-green-500/10 via-green-600/10 to-emerald-500/10",
    borderGradient: "from-green-500 via-emerald-500 to-green-600",
    glowClass: "glow-green-strong",
    color: "green",
    tags: ["Social Network", "Geolocation", "Events"],
    image: "/annava.png",
    unavailable: true,
    tech: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Google Maps API", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ]
  },
  {
    title: "Agency Portfolio - Digital Experience Transformation",
    description: "Professional agency portfolio for founders and startups featuring elegant typography and smooth animations. Built with 'I help founders turn ideas into seamless digital experiences' positioning. Implemented starfield background effects, notification system for announcements (Next Ventures launch), and multi-section navigation (Home, About, Work, Blog, More). Developed contact booking system with Google Calendar integration and responsive design optimized for all devices.",
    gradient: "from-slate-600 via-slate-700 to-gray-600",
    bgGradient: "from-slate-500/10 via-slate-600/10 to-gray-500/10",
    borderGradient: "from-slate-500 via-gray-500 to-slate-600",
    glowClass: "glow-slate-strong",
    color: "slate",
    tags: ["Agency", "Portfolio", "UI/UX"],
    image: "/agency-portfolio.png",
    link: "https://mohamedportfolio.vercel.app/",
    tech: [
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg", invert: true },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", invert: true },
      { name: "Three.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", invert: true },
    ]
  },
  {
    title: "Coach Heni - Personal Fitness Training Platform",
    description: "Professional fitness coaching website offering personalized training programs. Developed service showcase (Home, About, Services, Transformation, Contact Us), transformation gallery with before/after client results, and program customization system. Built appointment booking integration, testimonial management, and responsive design optimized for mobile fitness enthusiasts. Implemented high-impact hero section with motivational messaging and call-to-action optimization.",
    gradient: "from-cyan-600 via-cyan-700 to-blue-600",
    bgGradient: "from-cyan-500/10 via-cyan-600/10 to-blue-500/10",
    borderGradient: "from-cyan-500 via-blue-500 to-cyan-600",
    glowClass: "glow-cyan-strong",
    color: "cyan",
    tags: ["Fitness", "Booking System", "Responsive"],
    image: "/coach-heni.png",
    link: "https://coaching-project.vercel.app/",
    tech: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg", invert: true },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    ]
  }
];

export default function CuratedWork() {
  const [showModal, setShowModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [modalProject, setModalProject] = useState<typeof projects[0] | null>(null);

  const handleProjectClick = (project: typeof projects[0]) => {
    if (project.disabled) {
      return; // Don't do anything for current portfolio
    }
    
    if (project.unavailable) {
      setModalProject(project);
      setShowModal(true);
    } else if (project.demoAccount) {
      // Show credentials modal first
      setModalProject(project);
      setShowCredentialsModal(true);
    } else if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  const handleProceedToProject = () => {
    if (modalProject?.link) {
      window.open(modalProject.link, '_blank');
    }
    setShowCredentialsModal(false);
    setModalProject(null);
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="work">
      {/* Atmospheric Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full origin-left"
            />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Featured Work</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
            <span className="text-white text-depth">Curated </span>
            <span className="gradient-text-animated">Work</span>
          </h2>
          
          <p className="text-gray-400 text-xl max-w-3xl leading-relaxed">
            A selection of projects that showcase my design and development capabilities,
            <span className="text-purple-400 font-medium"> from concept to creation</span>
          </p>
        </motion.div>

        {/* Premium Neon Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="section-divider mb-20"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              onClick={() => handleProjectClick(project)}
              className={`group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 ${project.disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
            >
              {/* Project Preview/Image */}
              <div className="relative h-80 overflow-hidden bg-black">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                  </div>

                  {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white flex-1 leading-tight">
                        {project.title}
                      </h3>
                      
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0 ml-4" strokeWidth={2} />
                    </div>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                {/* Technology Stack */}
                <div className="flex items-center gap-3">
                  {project.tech.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="group/tech relative w-8 h-8"
                      title={tech.name}
                    >
                      <Image
                        src={tech.logo}
                        alt={tech.name}
                        width={32}
                        height={32}
                        className="object-contain transition-all duration-300 group-hover/tech:scale-110"
                        style={{ filter: tech.invert ? 'invert(1)' : 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-4 rounded-full glass-strong hover:glass border border-white/20 hover:border-purple-500/50 text-white font-semibold text-lg inline-flex items-center gap-3 hover:shadow-glow-purple transition-all duration-300"
          >
            <span>View All Projects</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Unavailable Project Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-8 max-w-md w-full relative"
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-orange-400" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white text-center mb-3">
                  Domain Changed
                </h3>
                <p className="text-gray-400 text-center mb-6">
                  The admin of this website has changed the domain. This project is currently unavailable for viewing.
                </p>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300"
                >
                  Got it
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo Credentials Modal */}
        <AnimatePresence>
          {showCredentialsModal && modalProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowCredentialsModal(false);
                setModalProject(null);
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-8 max-w-md w-full relative"
              >
                <button
                  onClick={() => {
                    setShowCredentialsModal(false);
                    setModalProject(null);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-300"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-blue-400" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white text-center mb-3">
                  Demo Access
                </h3>
                <p className="text-gray-400 text-center mb-6">
                  Use these credentials to explore the project
                </p>

                <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
                  {modalProject.demoAccount?.username && (
                    <div className="mb-3">
                      <p className="text-gray-400 text-sm mb-1">Username</p>
                      <p className="text-white font-mono font-semibold text-lg">
                        {modalProject.demoAccount.username}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Password</p>
                    <p className="text-white font-mono font-semibold text-lg">
                      {modalProject.demoAccount?.password}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowCredentialsModal(false);
                      setModalProject(null);
                    }}
                    className="flex-1 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProceedToProject}
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-glow-blue transition-all duration-300"
                  >
                    Open Project
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
