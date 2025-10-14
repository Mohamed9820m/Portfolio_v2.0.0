"use client";

import { motion } from "framer-motion";
import { Camera, Aperture } from "lucide-react";
import Image from "next/image";

const photos = [
  {
    title: "Captured Moment",
    category: "Photography",
    image: "/IMG_4144.JPG",
    size: "large", // For bento grid layout
  },
  {
    title: "Visual Story",
    category: "Photography",
    image: "/IMG_4145.JPG",
    size: "medium",
  },
  {
    title: "Frame Perfect",
    category: "Photography",
    image: "/IMG_4146.JPG",
    size: "tall",
  },
  {
    title: "Through The Lens",
    category: "Photography",
    image: "/IMG_4147.JPG",
    size: "medium",
  },
  {
    title: "Perspective",
    category: "Photography",
    image: "/IMG_4148.JPG",
    size: "wide",
  },
  {
    title: "Light & Shadow",
    category: "Photography",
    image: "/IMG_4149.JPG",
    size: "medium",
  },
];

export default function Testimonials() {
  const getSizeClass = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "wide":
        return "md:col-span-2";
      case "tall":
        return "md:row-span-2";
      default:
        return "";
    }
  };

  return (
    <section id="photography" className="py-32 px-6 relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full glass-strong border border-purple-500/30"
          >
            <Camera className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">My Hobbies</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
            <span className="text-white text-depth">Through My </span>
            <span className="gradient-text-animated">Lens</span>
          </h2>
          
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            When I&apos;m not coding, I capture the world through{" "}
            <span className="text-purple-400 font-semibold">photography</span>
          </p>
        </motion.div>

        {/* Photography Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`group relative overflow-hidden rounded-2xl ${getSizeClass(photo.size)}`}
            >
              {/* Photo Container */}
              <div className="relative w-full h-full">
                {/* Placeholder background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-blue-900/30" />
                
                {/* Image */}
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

                {/* Info Overlay - appears on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-strong border border-white/30 text-xs font-semibold text-white backdrop-blur-md">
                      <Aperture className="w-3 h-3" />
                      {photo.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    {photo.title}
                  </h3>

                  {/* Animated Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60px" }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </motion.div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Border Glow on Hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-all duration-500" />
              </div>

              {/* Outer Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-blue-500/20 transition-all duration-500 -z-10 blur-xl rounded-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
