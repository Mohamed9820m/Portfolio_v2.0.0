"use client";

import { motion } from "framer-motion";
import { IconHeartHandshake, IconWorldPin, IconClock, IconBriefcase, IconCopy, IconChartBar, IconPalette, IconApi, IconUserPlus, IconCreditCard, IconChartLine } from "@tabler/icons-react";
import dynamic from 'next/dynamic';
import { useWebGL } from '@/hooks/useWebGL';
import { useState } from "react";
import ContactModal from "./ContactModal";
import Image from "next/image";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('./Globe'), { ssr: false });

export default function IntroCards() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const webGLAvailable = useWebGL();

  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden">
      {/* Seamless gradient connection from Hero */}
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black via-purple-950/30 to-transparent pointer-events-none z-0" />

      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Grid Layout - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN - 2 Cards Stacked */}
          <div className="space-y-6">

            {/* Collaboration Card - Enhanced Professional Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden hover:border-white/20 transition-all group"
            >
              {/* Subtle Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10">
                {/* Header with Icon */}
                <div className="mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 inline-block">
                    <IconHeartHandshake className="w-5 h-5 text-purple-400" stroke={1.8} />
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mb-5">
                  <h3 className="text-base font-bold text-white mb-2">
                    Collaboration
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    I prioritize client collaboration, fostering open communication
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-lg font-bold text-white">50+</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wider">Clients</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-lg font-bold text-white">98%</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wider">Success</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-lg font-bold text-white">4.9★</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wider">Rating</div>
                  </div>
                </div>

                {/* Avatar Group - Overlapping Style */}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-3 font-semibold">Trusted by</p>
                  <div className="flex items-center">
                    {/* Avatars - Overlapping */}
                    <div className="flex -space-x-3">
                      {[
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
                        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
                      ].map((src, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.15, zIndex: 10 }}
                          className="relative"
                        >
                          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-900 hover:border-purple-500 transition-all shadow-lg relative">
                            <Image src={src} alt={`Client ${i + 1}`} fill className="object-cover" />
                          </div>
                        </motion.div>
                      ))}
                      {/* "+15 more" badge */}
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="relative w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 border-2 border-gray-900 flex items-center justify-center cursor-pointer hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg"
                      >
                        <span className="text-xs font-bold text-white">+15</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Currently Building - Compact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-3xl border border-white/10 relative overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 pb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <IconBriefcase className="w-5 h-5 text-gray-400" stroke={1.5} />
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">THE INSIDE SCOOP</p>
                </div>
                <h3 className="text-base font-bold text-white">Currently building a SaaS Application</h3>
              </div>

              {/* Horizontal Scrolling Project Cards */}
              <div className="px-5 pb-5 overflow-hidden">
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, -2000, 0] }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ willChange: 'transform' }}
                  className="flex gap-3 w-max"
                >
                  {[
                    { title: 'Payment System Architecture', icon: IconCreditCard, description: 'Handles recurring subscriptions' },
                    { title: 'Monitoring & Analytics', icon: IconChartBar, description: 'Infrastructure metrics' },
                    { title: 'Design System & UI Consistency', icon: IconPalette, description: 'Unified design assets' },
                    { title: 'API Gateway & Documentation', icon: IconApi, description: 'Guides developers to integrate' },
                    { title: 'User Onboarding Flow Design', icon: IconUserPlus, description: 'Step-by-step guides' },
                    { title: 'Real-time Analytics Dashboard', icon: IconChartLine, description: 'Track performance' },
                    { title: 'Authentication System', icon: IconBriefcase, description: 'Secure user access' },
                    { title: 'Database Architecture', icon: IconWorldPin, description: 'Scalable data storage' },
                    { title: 'Email Notification Service', icon: IconHeartHandshake, description: 'Automated messaging' },
                    { title: 'Search & Filter Engine', icon: IconClock, description: 'Fast query results' },
                    { title: 'File Upload Manager', icon: IconCopy, description: 'Cloud storage integration' },
                    { title: 'User Role Management', icon: IconUserPlus, description: 'Permission controls' },
                    { title: 'Webhook Integration', icon: IconApi, description: 'Real-time events' },
                    { title: 'Caching Strategy', icon: IconChartLine, description: 'Performance optimization' },
                    { title: 'Error Tracking System', icon: IconChartBar, description: 'Bug monitoring' },
                    { title: 'CI/CD Pipeline Setup', icon: IconBriefcase, description: 'Automated deployments' },
                    { title: 'Multi-tenant Architecture', icon: IconWorldPin, description: 'Isolated data per client' },
                    { title: 'Rate Limiting & Throttling', icon: IconClock, description: 'API protection' },
                    { title: 'Data Export & Reporting', icon: IconCopy, description: 'CSV and PDF generation' },
                    { title: 'Two-Factor Authentication', icon: IconUserPlus, description: 'Enhanced security' },
                    { title: 'Push Notification System', icon: IconHeartHandshake, description: 'Mobile alerts' },
                    { title: 'Microservices Architecture', icon: IconApi, description: 'Distributed systems' },
                    { title: 'GraphQL API Layer', icon: IconChartLine, description: 'Flexible queries' },
                    { title: 'Session Management', icon: IconCreditCard, description: 'User state tracking' },
                    { title: 'Logging & Debugging Tools', icon: IconChartBar, description: 'System insights' },
                    // Duplicate for seamless loop
                    { title: 'Payment System Architecture', icon: IconCreditCard, description: 'Handles recurring subscriptions' },
                    { title: 'Monitoring & Analytics', icon: IconChartBar, description: 'Infrastructure metrics' },
                    { title: 'Design System & UI Consistency', icon: IconPalette, description: 'Unified design assets' },
                    { title: 'API Gateway & Documentation', icon: IconApi, description: 'Guides developers to integrate' },
                    { title: 'User Onboarding Flow Design', icon: IconUserPlus, description: 'Step-by-step guides' },
                  ].map((project, index) => {
                    const Icon = project.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + (index % 8) * 0.05 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="group flex-shrink-0 w-36 h-28 rounded-2xl p-5 relative overflow-hidden transition-all bg-gradient-to-br from-white/8 via-white/5 to-white/[0.02] cursor-pointer shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/40"
                      >
                        {/* Heavy blur overlay - removed on hover - ROUNDED */}
                        <div className="absolute inset-0 backdrop-blur-[14px] group-hover:backdrop-blur-none transition-all duration-300 rounded-2xl" />

                        {/* Subtle inner glow on hover - ROUNDED */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/10 via-transparent to-transparent transition-opacity duration-300 rounded-2xl" />

                        {/* Content Container */}
                        <div className="relative z-10 h-full flex flex-col justify-between">
                          {/* Icon - Slightly visible when blurred */}
                          <div className="opacity-25 group-hover:opacity-100 transition-opacity duration-300">
                            <Icon className="w-6 h-6 text-white" stroke={1.5} />
                          </div>

                          {/* Text Content */}
                          <div>
                            {/* Title - Slightly visible when blurred */}
                            <h4 className="text-white/30 group-hover:text-white font-semibold text-[12px] leading-tight mb-1.5 transition-all duration-300">
                              {project.title}
                            </h4>

                            {/* Description - Hidden, revealed on hover */}
                            <p className="text-gray-400 text-[9px] leading-tight opacity-0 group-hover:opacity-100 transition-all duration-300">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>

            {/* Additional Card to Balance Height */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden hover:border-white/20 transition-all bg-gradient-to-br from-blue-500/5 to-cyan-500/5"
            >
              {/* Availability Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold text-white">Available for work</span>
                </div>
                <IconClock className="w-5 h-5 text-gray-400" stroke={1.5} />
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Response Time</span>
                  <span className="text-sm font-semibold text-white">~2 hours</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Projects Completed</span>
                  <span className="text-sm font-semibold text-white">50+</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Client Satisfaction</span>
                  <span className="text-sm font-semibold text-white">98%</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="mt-6 w-full px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold transition-all shadow-lg hover:bg-gray-100 hover:scale-[1.02] duration-300"
              >
                Schedule a Call
              </button>
            </motion.div>

          </div>

          {/* MIDDLE COLUMN - 2 Cards Stacked */}
          <div className="space-y-6">

            {/* 3D Globe Visualization or Availability Card */}
            {webGLAvailable ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden hover:border-white/20 transition-all min-h-[500px]"
              >
                {/* 3D Globe Visualization - Full Card Coverage with Scroll Pass-through */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <Globe />
                </div>
              </motion.div>
            ) : webGLAvailable === false ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden hover:border-white/20 transition-all min-h-[500px]"
              >
                {/* Professional 2D World Map Background - High-End Blended Look */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-[15%] left-0 right-0 bottom-0 opacity-[0.16] [mask-image:radial-gradient(ellipse_at_center,white_35%,transparent_90%)]">
                    {/* Subtle Glow Layer */}
                    <Image
                      src="/world-map.png"
                      alt=""
                      fill
                      className="object-contain mix-blend-screen scale-[1.1] blur-[1px] brightness-125 opacity-50"
                    />
                    {/* Sharp Detail Layer */}
                    <Image
                      src="/world-map.png"
                      alt="World Map"
                      fill
                      className="object-contain mix-blend-screen scale-[1.1] brightness-110 contrast-125"
                    />
                  </div>

                  {/* Digital Grid/Depth Effect Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,transparent_0%,rgba(0,0,0,0.5)_100%)] opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/[0.04] via-transparent to-transparent" />
                </div>

                {/* Content - now with higher z-index */}
                <div className="relative z-10">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-8">
                    I'm very flexible with time zone communications
                  </h3>

                  {/* Timezone Options */}
                  <div className="flex gap-3 mb-8">
                    <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium">
                      GB UK
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium">
                      IN India
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium">
                      US USA
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="absolute bottom-8 left-8 flex items-center gap-2 text-sm text-white/50 z-10">
                  <IconWorldPin className="w-4 h-4" />
                  <span>REMOTE</span>
                  <span className="mx-2">·</span>
                  <span>Italy</span>
                </div>
              </motion.div>
            ) : null}

            {/* Let's Work Together Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden hover:border-white/20 transition-all bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20"
            >
              {/* Sparkle/Stars effect */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    style={{
                      left: `${(i * 23) % 100}%`,
                      top: `${(i * 17) % 100}%`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center px-2 sm:px-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Let&apos;s work together on your next project
                </h3>

                {/* Email Button - Fully Responsive */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('mohamedhabibmarouani8@gmail.com');
                  }}
                  className="w-full sm:w-auto max-w-full px-4 sm:px-6 py-3 rounded-full glass-strong border border-white/20 hover:border-white/40 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto transition-all hover:scale-105 group"
                >
                  <IconCopy className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate max-w-[200px] sm:max-w-none">mohamedhabibmarouani8@gmail.com</span>
                </button>

                {/* Alternative: Show shortened on mobile */}
                <p className="text-xs text-gray-400 mt-2 sm:hidden">Tap to copy email</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - 2 Cards Stacked */}
          <div className="space-y-6">

            {/* The Secret Sauce - Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden hover:border-white/20 transition-all bg-gradient-to-br from-black via-gray-900/50 to-black"
            >
              {/* Decorative glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-full blur-3xl" />
              </div>

              {/* Header */}
              <div className="text-center mb-6 relative z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 font-semibold">MY SKILLS</p>
                <h3 className="text-xl font-bold text-white mb-1">
                  The Secret <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 italic font-serif">Sauce</span>
                </h3>
              </div>

              {/* Horizontal Scrolling Tech Rows */}
              <div className="space-y-3 relative z-10">
                {/* Row 1 - Scroll Right to Left */}
                <div className="overflow-hidden">
                  <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="flex gap-3"
                  >
                    {[
                      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                      { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
                      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
                      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                      { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
                      { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                      // Duplicate for seamless loop
                      { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                      { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
                      { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
                      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                      { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
                      { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                    ].map((tech, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, y: -3 }}
                        className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-purple-500/50 transition-all backdrop-blur-sm group"
                      >
                        <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
                          <Image
                            src={tech.logo}
                            alt={tech.name}
                            width={20}
                            height={20}
                            className="object-contain"
                            style={{ filter: tech.invert ? 'invert(1)' : 'none' }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">{tech.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Row 2 - Scroll Left to Right */}
                <div className="overflow-hidden">
                  <motion.div
                    animate={{ x: [-1000, 0] }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="flex gap-3"
                  >
                    {[
                      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                      { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
                      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
                      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                      { name: 'Prisma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg' },
                      // Duplicate for seamless loop
                      { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
                      { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
                      { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
                      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
                      { name: 'Prisma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg' },
                    ].map((tech, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, y: -3 }}
                        className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-purple-500/50 transition-all backdrop-blur-sm group"
                      >
                        <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
                          <Image
                            src={tech.logo}
                            alt={tech.name}
                            width={20}
                            height={20}
                            className="object-contain"
                            style={{ filter: tech.invert ? 'invert(1)' : 'none' }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">{tech.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Row 3 - Scroll Right to Left */}
                <div className="overflow-hidden">
                  <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="flex gap-3"
                  >
                    {[
                      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
                      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                      { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
                      { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
                      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                      // Duplicate for seamless loop
                      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
                      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                      { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
                      { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
                      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                    ].map((tech, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, y: -3 }}
                        className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-purple-500/50 transition-all backdrop-blur-sm group"
                      >
                        <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
                          <Image
                            src={tech.logo}
                            alt={tech.name}
                            width={20}
                            height={20}
                            className="object-contain"
                            style={{ filter: tech.invert ? 'invert(1)' : 'none' }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">{tech.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Projects Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden hover:border-white/20 transition-all bg-gradient-to-br from-gray-900/50 to-black/50"
            >
              {/* Browser mockup */}
              <div className="mb-6">
                <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-white/10 overflow-hidden">
                  {/* Browser chrome */}
                  <div className="bg-black/40 px-4 py-2 flex items-center gap-2 border-b border-white/10">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                  </div>

                  {/* Content - Text inside screen */}
                  <div className="p-6 flex flex-col items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4 flex items-center justify-center">
                        <IconBriefcase className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-white text-base font-semibold leading-snug max-w-xs">
                        Websites that stand out and make a difference
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-all">
                  Explore
                </button>
                <button className="px-4 py-2 rounded-full glass border border-white/20 hover:border-white/40 text-white text-sm font-medium transition-all">
                  Resume
                </button>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>
  );
}
