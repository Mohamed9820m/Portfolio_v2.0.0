"use client";

import { motion } from "framer-motion";
import { IconArrowRight, IconCopy, IconCheck } from "@tabler/icons-react";
import { useRef, useState, memo } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ContactModal from "./ContactModal";

// Optimized cosmic particles - further reduced for mobile
const cosmicParticles = Array.from({ length: 50 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3,
  opacity: 0.3 + Math.random() * 0.7,
  delay: Math.random() * 5,
  twinkleDuration: 2 + Math.random() * 3,
}));

// Falling stars (shooting stars) - left and right sides only
const generateFallingStar = (i: number, side: 'left' | 'right') => {
  // Position only on left or right sides
  const startX = side === 'left' 
    ? Math.random() * 20  // Left side: 0-20%
    : 80 + Math.random() * 20; // Right side: 80-100%
  
  const startY = Math.random() * 100; // Any vertical position
  
  // Angle that generally moves inward or down
  const angle = side === 'left'
    ? -45 + Math.random() * 135 // Left side angles toward right
    : 45 + Math.random() * 135; // Right side angles toward left
  
  const distance = 80 + Math.random() * 120;
  
  return {
    delay: i * 5, // Each star delayed by 5 seconds
    duration: 1.5 + Math.random() * 1,
    startX,
    startY,
    angle,
    distance,
    trailLength: 60 + Math.random() * 100,
    side,
    // Random show/hide - 70% chance to show
    shouldShow: Math.random() > 0.3,
  };
};

// Reduced to 1 falling star for performance
const fallingStars = [
  generateFallingStar(0, 'left'),
];

function Hero() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('mohamedhabibmarouani8@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40 pb-0"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Dark Cosmic Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0a1a] to-[#0a0a0f]">
        
        {/* Realistic Twinkling Stars with Smooth Movement */}
        <div className="absolute inset-0">
          {cosmicParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                opacity: [
                  particle.opacity * 0.3,
                  particle.opacity * 0.9,
                  particle.opacity,
                  particle.opacity * 0.9,
                  particle.opacity * 0.3,
                ],
                scale: [1, 1.2, 1.5, 1.2, 1],
                x: [0, (i % 2 === 0 ? 3 : -3), 0, (i % 2 === 0 ? -2 : 2), 0],
                y: [0, (i % 3 === 0 ? -3 : 3), 0, (i % 3 === 0 ? 2 : -2), 0],
                boxShadow: [
                  `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity * 0.3})`,
                  `0 0 ${particle.size * 4}px rgba(255, 255, 255, ${particle.opacity * 0.6})`,
                  `0 0 ${particle.size * 6}px rgba(255, 255, 255, ${particle.opacity * 0.8})`,
                  `0 0 ${particle.size * 4}px rgba(255, 255, 255, ${particle.opacity * 0.6})`,
                  `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity * 0.3})`,
                ],
              }}
              transition={{
                duration: particle.twinkleDuration * 1.5,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Falling Stars - Natural Realistic Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {fallingStars
            .filter(star => star.shouldShow) // Only show stars that passed the random check
            .map((star, i) => {
            // Calculate end position based on angle and distance
            const endX = Math.cos((star.angle * Math.PI) / 180) * star.distance;
            const endY = Math.sin((star.angle * Math.PI) / 180) * star.distance;
            
            return (
              <motion.div
                key={`falling-${i}-${star.side}`}
                className="absolute"
                style={{
                  left: `${star.startX}%`,
                  top: `${star.startY}%`,
                }}
              >
                {/* Moving star */}
                <motion.div
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: endX,
                    y: endY,
                    opacity: [0, 1, 1, 1, 0], // Fade in and out naturally
                  }}
                  transition={{
                    duration: star.duration,
                    repeat: Infinity,
                    repeatDelay: 15 - star.duration,
                    ease: "easeOut", // Natural deceleration
                    times: [0, 0.1, 0.5, 0.9, 1],
                  }}
                >
                  {/* Star point */}
                  <div 
                    className="w-2 h-2 rounded-full bg-white"
                    style={{
                      boxShadow: '0 0 8px 3px rgba(255, 255, 255, 0.9), 0 0 15px 5px rgba(167, 139, 250, 0.5)',
                    }}
                  />
                </motion.div>
                
                {/* Trail line that fades as it draws - more realistic */}
                <svg
                  className="absolute top-0 left-0 pointer-events-none"
                  style={{
                    overflow: 'visible',
                    width: Math.abs(endX) + 10,
                    height: Math.abs(endY) + 10,
                  }}
                >
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="0"
                    initial={{
                      x2: 0,
                      y2: 0,
                      opacity: 0,
                    }}
                    animate={{
                      x2: [0, endX * 0.3, endX * 0.6, endX, endX],
                      y2: [0, endY * 0.3, endY * 0.6, endY, endY],
                      opacity: [0, 0.8, 0.8, 0.6, 0], // Line fades out as star completes
                    }}
                    transition={{
                      duration: star.duration,
                      repeat: Infinity,
                      repeatDelay: 15 - star.duration,
                      ease: "easeOut",
                      times: [0, 0.3, 0.6, 0.9, 1],
                    }}
                    stroke="rgba(255, 255, 255, 0.7)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{
                      filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 6px rgba(167, 139, 250, 0.4))',
                    }}
                  />
                  
                  {/* Additional softer trail layer that fades faster */}
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="0"
                    initial={{
                      x2: 0,
                      y2: 0,
                      opacity: 0,
                    }}
                    animate={{
                      x2: [0, endX * 0.3, endX * 0.6, endX, endX],
                      y2: [0, endY * 0.3, endY * 0.6, endY, endY],
                      opacity: [0, 0.5, 0.4, 0.2, 0], // Fades faster for realistic effect
                    }}
                    transition={{
                      duration: star.duration,
                      repeat: Infinity,
                      repeatDelay: 15 - star.duration,
                      ease: "easeOut",
                      times: [0, 0.3, 0.6, 0.85, 1],
                    }}
                    stroke="rgba(167, 139, 250, 0.4)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      filter: 'blur(2px)',
                    }}
                  />
                </svg>
              </motion.div>
            );
          })}
        </div>

        {/* Subtle purple/cosmic atmosphere */}
        <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-purple-900/15 via-indigo-900/10 to-transparent" />
        
        {/* Deep space ambient light */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
        
        {/* "New" Badge - Featured Release */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center justify-center mb-16"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer hover:border-purple-500/30 hover:bg-white/8 transition-all duration-300">
            <div className="px-2.5 py-0.5 rounded-md bg-[#3b82f6] shadow-lg shadow-blue-500/30">
              <span className="text-white text-xs font-bold tracking-wide">New</span>
            </div>
            <span className="text-[15px] text-gray-300 font-medium">E-com is live!</span>
            <IconArrowRight className="w-4 h-4 text-gray-400" stroke={2} />
          </div>
        </motion.div>

        {/* Main Headline - Large Elegant Serif & Italic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10"
        >
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.1] tracking-tight">
            <span className="block font-serif font-normal text-white mb-1 text-shadow-lg">
              I help founders turn ideas
            </span>
            <span className="block font-serif font-normal">
              <span className="text-white text-shadow-lg">into seamless </span>
              <span className="font-serif italic bg-gradient-to-r from-[#a78bfa] via-[#c084fc] to-[#e879f9] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(167,139,250,0.5)]">
                digital experiences
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Friendly Greeting with Profile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-2.5 mb-14 text-[17px] text-gray-400 font-normal flex-wrap"
        >
          <span>Hello, I&apos;m Mohamed Habib</span>
          
          {/* Circular Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Avatar className="w-9 h-9 ring-2 ring-purple-500/50 ring-offset-2 ring-offset-[#0a0a0f]">
              <AvatarImage 
                src="/linkedin.png" 
                alt="Profile" 
              />
              <AvatarFallback>MH</AvatarFallback>
            </Avatar>
          </motion.div>
          
          <span>a Full Stack Developer</span>
        </motion.div>

        {/* Interaction Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          {/* Let's Connect Button with Arrow */}
          <motion.button
            onClick={() => setIsContactModalOpen(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group px-7 py-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/40 hover:bg-white/10 text-white font-medium text-[15px] flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
          >
            <span>Let&apos;s Connect</span>
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-md">
              <IconArrowRight className="w-3.5 h-3.5 text-black" stroke={2.5} />
            </div>
          </motion.button>

          {/* Email with Mail Icon */}
          <motion.button
            onClick={copyEmail}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-7 py-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/40 hover:bg-white/10 text-gray-300 hover:text-white font-medium text-[15px] flex items-center gap-2.5 transition-all duration-300 shadow-lg"
          >
            <motion.div
              animate={copied ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {copied ? (
                <IconCheck className="w-4 h-4 text-green-400" stroke={2} />
              ) : (
                <IconCopy className="w-4 h-4" stroke={2} />
              )}
            </motion.div>
            <span>{copied ? 'Copied!' : 'mohamedhabibmarouani8@gmail.com'}</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* Glowing Horizon Arc with Seamless Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] pointer-events-none">
        {/* Main Curved Horizon Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] max-w-[1600px]">
          
          {/* Brightest core glow - white/light */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-t from-white/40 via-white/20 to-transparent blur-[60px]"
            style={{
              borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            }}
          />
          
          {/* Mid-layer expanding glow */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[250px] bg-gradient-to-t from-white/25 via-white/10 to-transparent blur-[80px]"
            style={{
              borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            }}
          />
          
          {/* Outer atmospheric glow */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[300px] bg-gradient-to-t from-white/15 via-white/5 to-transparent blur-[100px]"
            style={{
              borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            }}
          />
          
          {/* Purple/cosmic tint overlay */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[180px] bg-gradient-to-t from-purple-400/15 via-indigo-500/10 to-transparent blur-[70px]"
            style={{
              borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            }}
          />

          {/* Subtle blue accent */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-gradient-to-t from-blue-400/10 to-transparent blur-[60px]"
            style={{
              borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            }}
          />
        </div>

        {/* Seamless Transition Layer - Connects to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-[300px]">
          {/* Purple to black gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/40 to-black" />
          
          {/* Subtle purple glow that extends beyond section */}
          <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-purple-900/20 via-purple-950/10 to-transparent" />
        </div>
      </div>

      {/* Extended gradient overlay for smooth blend */}
      <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </section>
  );
}

// Export memoized version for better performance
export default memo(Hero);
