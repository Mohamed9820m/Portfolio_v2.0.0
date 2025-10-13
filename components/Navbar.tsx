"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Grid3x3 } from "lucide-react";
import { useState, useEffect } from "react";
import ContactModal from "./ContactModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { scrollY } = useScroll();

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
    setIsOpen(false); // Close mobile menu if open
  };
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const navY = useTransform(scrollY, [0, 100], [24, 16]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#", active: true },
    { name: "Skills", href: "#skills", active: false },
    { name: "Work", href: "#work", active: false },
    { name: "Tech Stack", href: "#tech", active: false },
    { name: "About", href: "#about", active: false },
    { name: "Photography", href: "#photography", active: false }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ opacity: navOpacity, paddingTop: navY }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-300"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Main Navbar Container */}
        <div className="relative flex items-center justify-between h-16">
          
          {/* Logo - Simple & Realistic */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 flex-shrink-0"
          >
            <a href="#" className="flex items-center gap-2">
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 group">
                {/* Code Icon - Clean & Professional */}
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              
              {/* Text Logo - Clean & Creative */}
              <span className="hidden md:flex items-baseline gap-[2px] text-lg tracking-wide font-medium text-white">
                Mohamed Hab
                <span className="relative inline-flex flex-col items-center">
                  {/* Light Bulb replacing the dot on "i" */}
                  <svg className="w-2.5 h-2.5 text-yellow-400 animate-pulse absolute -top-[7px]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  <span>ı</span>
                </span>
                b
              </span>
            </a>
          </motion.div>

          {/* Center Navigation - Premium Glass Pill */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className={`hidden md:flex items-center gap-1 px-2 py-2 rounded-full glass-strong border border-white/15 transition-all duration-500 ${
              isScrolled 
                ? "shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(139,92,246,0.15)]" 
                : "shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_15px_rgba(139,92,246,0.1)]"
            }`}>
              {/* Top light reflection */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.05, 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                    item.active
                      ? "bg-white/12 text-white shadow-inner-light" 
                      : "text-gray-300 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Active indicator subtle glow */}
                  {item.active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.a>
              ))}
              
              {/* Bottom shadow for depth */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)] pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Side - CTA & Grid with Perfect Spacing */}
          <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
            {/* Book a Call Button - Enhanced */}
            <motion.button
              onClick={handleOpenContactModal}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden md:block px-6 py-2.5 rounded-full glass-strong border border-white/15 text-white text-[13px] font-semibold hover:bg-white/10 hover:border-white/25 transition-all duration-300 shadow-depth-sm hover:shadow-depth-md relative group"
            >
              {/* Top light reflection */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <span className="relative z-10">Book a Call</span>
              
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Grid Icon - Enhanced with Micro-interaction */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ 
                delay: 0.5,
                duration: 0.6,
                type: "spring",
                stiffness: 200
              }}
              className="hidden md:flex w-11 h-11 rounded-xl glass-strong border border-white/15 items-center justify-center hover:bg-white/10 hover:border-white/25 transition-all duration-300 shadow-depth-sm hover:shadow-depth-md relative group"
            >
              {/* Top light reflection */}
              <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <Grid3x3 size={18} className="text-white relative z-10" strokeWidth={2} />
              
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Mobile Menu Button - Enhanced */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-11 h-11 rounded-xl glass-strong border border-white/15 flex items-center justify-center hover:bg-white/10 transition-all duration-300 shadow-depth-sm relative"
            >
              {/* Top light reflection */}
              <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden overflow-hidden"
        >
          <div className="mt-4 glass-strong rounded-3xl p-5 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative">
            {/* Top light reflection */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => setIsOpen(false)}
                  className={`px-5 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                    item.active
                      ? "bg-white/12 text-white shadow-inner-light"
                      : "text-gray-300 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.button
                onClick={handleOpenContactModal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="mt-2 px-6 py-3 rounded-xl glass-strong border border-white/15 text-white text-base font-semibold w-full hover:bg-white/10 transition-all duration-300 shadow-depth-sm relative"
              >
                {/* Top light reflection */}
                <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <span className="relative z-10">Book a Call</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </motion.nav>
  );
}
