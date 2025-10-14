"use client";

import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window width is less than 768px (tablet breakpoint)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Helper to get motion props conditionally
export function getMotionProps(isMobile: boolean, desktopProps: Record<string, any>) {
  return isMobile ? {} : desktopProps;
}

// Helper to get hover props conditionally (empty on mobile since touch devices don't hover)
export function getHoverProps(isMobile: boolean, hoverProps: Record<string, any>) {
  return isMobile ? {} : hoverProps;
}

