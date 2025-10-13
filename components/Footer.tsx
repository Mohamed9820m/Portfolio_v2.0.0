"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import ContactModal from "./ContactModal";

const socialLinks = [
  { icon: Github, href: "https://github.com/Mohamed9820m", label: "GitHub", color: "hover:text-purple-400" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-habiiib", label: "LinkedIn", color: "hover:text-blue-400" },
];

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <footer className="relative pt-32 pb-10 px-6 overflow-hidden" id="contact">
      {/* Smooth blend from previous section - removes separation line */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      
      {/* Premium Background with Texture */}
      <div className="absolute inset-0">
        {/* Gradient Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-transparent" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        {/* Glow Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-8 px-5 py-2.5 rounded-full glass-strong border border-purple-500/30"
          >
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Let&apos;s Connect</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
            <span className="text-white text-depth block">Ready to build something</span>
            <span className="gradient-text-animated block mt-2">amazing together?</span>
          </h2>
          
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s turn your ideas into reality. Get in touch and let&apos;s start creating.
          </p>

          <motion.button
            onClick={() => setIsContactModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 rounded-full btn-premium text-white font-bold text-lg inline-flex items-center gap-3 shadow-premium-purple hover:shadow-glow-purple-strong transition-all duration-300"
          >
            <Send className="w-6 h-6" />
            <span>Start a Project</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Contact Modal */}
        <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

        {/* Simple Footer Content */}
        <div className="pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © 2025 Mohamed Habib. All rights reserved.
            </motion.p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-xl glass-strong hover:glass border border-white/10 hover:border-white/30 flex items-center justify-center transition-all duration-300 group ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-current transition-colors" strokeWidth={2} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
