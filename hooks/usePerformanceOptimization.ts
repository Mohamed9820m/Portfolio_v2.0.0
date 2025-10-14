"use client";

import { useEffect } from 'react';

/**
 * Custom hook for mobile performance optimization
 * Implements various tricks to prevent lag and crashes on mobile devices
 */
export function usePerformanceOptimization() {
  useEffect(() => {
    // 1. Passive Event Listeners for better scroll performance
    const passiveSupported = checkPassiveSupport();
    
    // 2. Optimize scroll performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Your scroll handler logic here
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, passiveSupported ? { passive: true } : false);
    
    // 3. Reduce animations on low-end devices
    if (isLowEndDevice()) {
      document.documentElement.classList.add('reduce-motion');
    }
    
    // 4. Prevent mobile browser zoom on double-tap
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (event: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    };
    
    document.addEventListener('touchend', preventDoubleTapZoom, false);
    
    // 5. Optimize images lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }
    
    // 6. Prevent memory leaks - cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchend', preventDoubleTapZoom);
    };
  }, []);
}

// Helper: Check if browser supports passive event listeners
function checkPassiveSupport() {
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    window.addEventListener('test', null as any, options);
    window.removeEventListener('test', null as any, options);
  } catch (err) {
    passiveSupported = false;
  }
  return passiveSupported;
}

// Helper: Detect low-end devices
function isLowEndDevice() {
  // Check for low memory
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;
  
  // Check for slow connection
  const connection = (navigator as any).connection;
  if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    return true;
  }
  
  // Check hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }
  
  return false;
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function useReducedMotion() {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches || isLowEndDevice();
}

/**
 * Hook for optimized intersection observer
 */
export function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }
    
    const observer = new IntersectionObserver(callback, {
      rootMargin: '100px 0px',
      threshold: 0.01,
      ...options
    });
    
    return () => {
      observer.disconnect();
    };
  }, [callback, options]);
}

