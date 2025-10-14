"use client";

import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  // Optimized with requestAnimationFrame for smooth performance
  const rafIdRef = useRef<number | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    
    rafIdRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;
      
      x.set(deltaX);
      y.set(deltaY);
    });
  };

  const handleMouseLeave = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y, willChange: isHovered ? 'transform' : 'auto' }}
      className={`relative cursor-pointer ${className}`}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
      
      {/* Magnetic Field Visual Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 blur-2xl -z-10"
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

