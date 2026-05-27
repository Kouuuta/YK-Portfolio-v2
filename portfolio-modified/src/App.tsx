import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "./components/Loader";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { TechStack } from "./components/TechStack";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export function App() {
  const [loading, setLoading] = useState(true);
  const [showWipe, setShowWipe] = useState(false);

  const handleLoaderComplete = () => {
    setShowWipe(true);
    setTimeout(() => setLoading(false), 50);
  };

  return (
    <div className="min-h-screen bg-ink text-bone font-sans selection:bg-vermilion selection:text-bone relative">
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {/* Vermilion wipe sweep — exits after loader */}
      <AnimatePresence>
        {showWipe && (
          <motion.div
            className="fixed inset-0 z-[99998] bg-vermilion origin-left pointer-events-none"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{}}
            transition={{
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.05,
            }}
            onAnimationComplete={() => setShowWipe(false)}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Nav />
          <main>
            <Hero />
            <Marquee
              text="AVAILABLE FOR HIRE — PHILIPPINES BASED — REMOTE FRIENDLY"
              direction="left"
            />
            <About />
            <Experience />
            <Marquee
              text="FULL STACK — CREATIVE DEVELOPMENT — MACHINE LEARNING"
              direction="right"
            />
            <TechStack />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
