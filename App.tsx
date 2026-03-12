import React, { useEffect } from "react";
import Lenis from "lenis";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Vision from "./components/Vision";
import Team from "./components/Team";
import SystemCore from "./components/SystemCore";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import GlobalParallax from "./components/GlobalParallax";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initial theme check to prevent flash
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black relative transition-colors duration-300">
      <CustomCursor />
      <GlobalParallax />
      <ThemeToggle />

      <Hero />
      <Portfolio />
      <Vision />
      <Team />
      <SystemCore />
      <Footer />
    </main>
  );
}

export default App;
