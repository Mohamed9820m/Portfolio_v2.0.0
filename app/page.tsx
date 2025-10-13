import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IntroCards from "@/components/IntroCards";
import CuratedWork from "@/components/CuratedWork";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      
      {/* Tech Grid Background Section */}
      <div className="relative tech-grid-background">
        <IntroCards />
        <CuratedWork />
        <TechStack />
        <About />
        <Testimonials />
        
        {/* Smooth blend transition to footer */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-black pointer-events-none z-10" />
      </div>
      
      <Footer />
    </main>
  );
}
