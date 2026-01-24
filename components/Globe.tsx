"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Globe to avoid SSR issues
const GlobeComponent = dynamic(
  () => import('react-globe.gl'),
  {
    ssr: false,
    loading: () => <div className="w-[400px] h-[400px] rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center animate-pulse">
      <p className="text-blue-400 text-sm">Loading Globe...</p>
    </div>
  }
);

// Location data
const locations = {
  uk: { lat: 51.5074, lng: -0.1278, label: 'United Kingdom', code: 'GB UK' },
  india: { lat: 20.5937, lng: 78.9629, label: 'India', code: 'IN India' },
  usa: { lat: 37.0902, lng: -95.7129, label: 'United States', code: 'US USA' },
};

interface GlobeProps {
  onLocationChange?: (location: string) => void;
}


// Simplified land masses coordinates (approximate major continents)
const isLand = (lat: number, lng: number) => {
  // North America
  if (lat > 15 && lat < 75 && lng > -170 && lng < -50) return true;

  // South America
  if (lat > -60 && lat < 15 && lng > -85 && lng < -35) return true;

  // Europe
  if (lat > 35 && lat < 70 && lng > -10 && lng < 40) return true;

  // Africa
  if (lat > -35 && lat < 38 && lng > -20 && lng < 52) return true;

  // Asia
  if (lat > -10 && lat < 75 && lng > 25 && lng < 180) return true;

  // Australia/Oceania
  if (lat > -45 && lat < -10 && lng > 110 && lng < 180) return true;

  return false;
};

// Generate realistic dotted globe with smaller points
const generateRealisticGlobePoints = () => {
  const points = [];
  const numLat = 100; // Increased resolution
  const numLng = 200; // Increased resolution

  for (let lat = -90; lat <= 90; lat += 180 / numLat) {
    for (let lng = -180; lng <= 180; lng += 360 / numLng) {
      const density = Math.cos((lat * Math.PI) / 180);
      const onLand = isLand(lat, lng);

      // Higher density for land, lower for water
      const threshold = onLand ? 0.65 : 0.12;

      if (Math.random() < density * threshold) {
        points.push({
          lat,
          lng,
          size: onLand ? (Math.random() * 0.15 + 0.15) : (Math.random() * 0.08 + 0.05), // Smaller dots
          color: onLand
            ? `rgba(59, 130, 246, ${0.75 + Math.random() * 0.25})` // Bright cyan/blue for land
            : `rgba(59, 130, 246, ${0.08 + Math.random() * 0.15})`, // Very dim for water
        });
      }
    }
  }
  return points;
};

export default function Globe({ onLocationChange }: GlobeProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('india');
  const [globePoints] = useState(generateRealisticGlobePoints());
  const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!(window.WebGLRenderingContext && gl);
      } catch (e) {
        return false;
      }
    };

    setWebGLAvailable(checkWebGL());
  }, []);

  // Hide entire component if WebGL is not available
  if (webGLAvailable === false) {
    return null;
  }

  useEffect(() => {
    if (webGLAvailable && globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.6;
      globeEl.current.controls().enableZoom = false; // Disable user zoom
      globeEl.current.controls().enablePan = false; // Disable user pan
      globeEl.current.controls().minDistance = 100; // Prevent zoom in
      globeEl.current.controls().maxDistance = 1000; // Prevent zoom out

      // Initial view - ZOOMED OUT for full view
      globeEl.current.pointOfView(
        { lat: 20, lng: 78, altitude: 3.2 }, // Much higher altitude = more zoomed out
        0
      );
    }

    // Scroll-based globe control
    const handleScroll = () => {
      if (!containerRef.current || !globeEl.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the globe card is visible (0 to 1)
      const visiblePercentage = Math.max(0, Math.min(1,
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));

      // Adjust altitude based on scroll (zoom in as user scrolls)
      // When entering view: altitude 4.5 → 2.8 as it comes into view
      const minAltitude = 2.8;
      const maxAltitude = 4.5;
      const scrollAltitude = maxAltitude - (visiblePercentage * (maxAltitude - minAltitude));

      // Smoothly adjust the view
      globeEl.current.pointOfView(
        {
          lat: 20,
          lng: 78 + (visiblePercentage * 30), // Slight rotation as it scrolls
          altitude: scrollAltitude
        },
        0 // Instant update for smooth scrolling
      );
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLocationClick = (locationKey: keyof typeof locations) => {
    const location = locations[locationKey];

    if (globeEl.current) {
      globeEl.current.controls().autoRotate = false;

      // ZOOM IN to the selected location
      globeEl.current.pointOfView(
        { lat: location.lat, lng: location.lng, altitude: 1.5 }, // Lower altitude = zoomed in
        1500 // Zoom in duration
      );

      setSelectedLocation(locationKey);
      onLocationChange?.(locationKey);

      // After 3 seconds, ZOOM OUT and resume rotation
      setTimeout(() => {
        if (globeEl.current) {
          globeEl.current.pointOfView(
            { lat: location.lat, lng: location.lng, altitude: 6 }, // Zoom back out to default
            1500 // Zoom out duration
          );

          // Resume auto-rotate after zoom out
          setTimeout(() => {
            if (globeEl.current) {
              globeEl.current.controls().autoRotate = true;
            }
          }, 1500);
        }
      }, 3000);
    }
  };

  // Smaller glowing location markers
  const locationMarkers = [
    {
      lat: locations.uk.lat,
      lng: locations.uk.lng,
      size: 1.0,
      color: '#3b82f6',
      label: locations.uk.label
    },
    {
      lat: locations.india.lat,
      lng: locations.india.lng,
      size: 1.0,
      color: '#8b5cf6',
      label: locations.india.label
    },
    {
      lat: locations.usa.lat,
      lng: locations.usa.lng,
      size: 1.0,
      color: '#06b6d4',
      label: locations.usa.label
    },
  ];

  // Connection arcs
  const arcsData = [
    {
      startLat: locations.india.lat,
      startLng: locations.india.lng,
      endLat: locations.uk.lat,
      endLng: locations.uk.lng,
      color: ['#8b5cf6', '#3b82f6'],
    },
    {
      startLat: locations.india.lat,
      startLng: locations.india.lng,
      endLat: locations.usa.lat,
      endLng: locations.usa.lng,
      color: ['#8b5cf6', '#06b6d4'],
    },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black pointer-events-none" style={{ touchAction: 'auto' }}>
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center scale-150 pointer-events-none">
        {webGLAvailable === null ? (
          <div className="w-[400px] h-[400px] rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center animate-pulse">
            <p className="text-blue-400 text-sm">Loading Globe...</p>
          </div>
        ) : (
          <GlobeComponent
            ref={globeEl}
            backgroundColor="rgba(0,0,0,0)"
            width={600}
            height={600}
            rendererConfig={{
              antialias: true,
              alpha: true,
              precision: 'highp',
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false, // Important for some GPUs
            }}

            // No globe image - pure dots
            showGlobe={false}
            showAtmosphere={true}
            atmosphereColor="#3b82f6"
            atmosphereAltitude={0.15}

            // Smaller dotted surface with land/water colors
            pointsData={globePoints}
            pointAltitude={0}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pointRadius={(d: any) => d.size}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pointColor={(d: any) => d.color}
            pointResolution={8}

            // Smaller location markers
            htmlElementsData={locationMarkers}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            htmlElement={(d: any) => {
              const el = document.createElement('div');
              el.innerHTML = `
              <div style="
                width: 10px;
                height: 10px;
                background: ${d.color};
                border-radius: 50%;
                box-shadow: 0 0 12px ${d.color}, 0 0 24px ${d.color}, 0 0 36px ${d.color};
                animation: markerPulse 2s ease-in-out infinite;
              "></div>
            `;
              el.style.pointerEvents = 'none';
              return el;
            }}

            // Animated connection arcs
            arcsData={arcsData}
            arcColor={'color'}
            arcDashLength={0.5}
            arcDashGap={0.3}
            arcDashAnimateTime={2500}
            arcStroke={0.5}
            arcAltitude={0.2}

            enablePointerInteraction={false}
          />
        )}
      </div>

      {/* Tech Corner Frames */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l border-t border-blue-500/30" />
      <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-blue-500/30" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l border-b border-blue-500/30" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-blue-500/30" />

      {/* Clean Header with Title and Country Badges */}
      <div className="absolute top-8 left-0 right-0 z-20 flex flex-col items-center gap-5 px-8">
        {/* Simple Title */}
        <h3 className="text-white text-xl md:text-2xl font-semibold text-center">
          I&apos;m very flexible with time zone communications
        </h3>

        {/* Clean Country Badges */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLocationClick('uk')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedLocation === 'uk'
              ? 'bg-white/20 text-white border border-white/40'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200'
              }`}
          >
            {locations.uk.code}
          </button>

          <button
            onClick={() => handleLocationClick('india')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedLocation === 'india'
              ? 'bg-white/20 text-white border border-white/40'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200'
              }`}
          >
            {locations.india.code}
          </button>

          <button
            onClick={() => handleLocationClick('usa')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedLocation === 'usa'
              ? 'bg-white/20 text-white border border-white/40'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-200'
              }`}
          >
            {locations.usa.code}
          </button>
        </div>
      </div>

      {/* Minimal Remote Badge */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div>
          <p className="text-[9px] uppercase tracking-wide text-gray-500 font-medium">Remote</p>
          <p className="text-xs text-white font-semibold">Italy</p>
        </div>
      </div>

      {/* Subtle Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient" style={{
        background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
      }} />

      <style jsx>{`
        @keyframes dotPulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.4);
          }
        }
        
        @keyframes markerPulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
