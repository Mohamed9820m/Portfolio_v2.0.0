"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section className="py-32 px-6 relative overflow-hidden" id="about">
      {/* Atmospheric Background Lighting */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Enhanced Image/Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Simple Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                {/* Main Profile Image - Full Size */}
                <Image 
                  src="/linkedin.png" 
                  alt="Profile" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full origin-left"
                />
                <div className="px-4 py-2 rounded-full glass border border-purple-500/30">
                  <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">About Me</span>
                </div>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-[1.1]">
                <span className="text-white text-depth block">Meet the </span>
                <span className="gradient-text-animated block">Developer</span>
                <span className="text-white text-depth text-4xl md:text-5xl lg:text-6xl block mt-2">
                  behind the magic
                </span>
              </h2>
            </div>

            <div className="space-y-6 mb-10">
              <p className="text-gray-300 text-lg leading-relaxed">
                I&apos;m <span className="text-purple-400 font-semibold">Mohamed Habib</span>, a proactive full-stack developer passionate about creating dynamic web experiences. From frontend to backend, I thrive on solving complex problems with clean, efficient code. My expertise spans React, Next.js, and Node.js, and I&apos;m always eager to learn more.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                When I&apos;m not immersed in work, I&apos;m exploring new ideas and staying curious. Life&apos;s about balance, and I love embracing every part of it.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                I believe in waking up each day eager to{" "}
                <span className="text-pink-400 font-semibold">make a difference</span>!
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/Mohamed9820m"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <Github className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/mohamed-habiiib"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <Linkedin className="w-7 h-7 text-gray-300 group-hover:text-white transition-colors" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
