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

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black relative">
      <CustomCursor />
      <GlobalParallax />

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
