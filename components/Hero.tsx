import React, { useRef, useMemo, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 40; // Movement range
      const y = (clientY / innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Generate points for the sphere mesh
  const points = useMemo(() => {
    const pts = [];
    const numPoints = 300;
    const radius = 600;

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5)); // Golden angle increment

      pts.push({
        x: Math.cos(theta) * r * radius,
        y: y * radius,
        z: Math.sin(theta) * r * radius,
      });
    }
    return pts;
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]"
    >
      {/* Header / Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 left-0 w-full p-6 md:p-10 z-50 flex justify-between items-center"
      >
        {/* PLACEHOLDER LOGO - Replace src with "/images/logo.png" after placing your file in public/images/ */}
        <img
          src="/images/t4slogocolor.png"
          alt="T4S Studio"
          className="h-10 md:h-14 hover:scale-110 transition-transform"
        />

        {/* Center Title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-['Audiowide'] text-xl md:text-3xl tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          T4S STUDIO
        </div>

        <div className="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          <a href="#portfolio" className="hover:text-white transition-colors">
            Work
          </a>
          <a href="#vision" className="hover:text-white transition-colors">
            Vision
          </a>
          <a href="#team" className="hover:text-white transition-colors">
            Team
          </a>
        </div>
      </motion.nav>

      {/* Background Gradients - Parallax Effect */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-600/40 rounded-full blur-[120px]"
        style={{ y: y1, x: springX }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/40 rounded-full blur-[120px]"
        style={{ y: y2, x: useTransform(springX, (v) => -v) }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating Particles/Stars */}
      <div className="absolute inset-0 z-0 opacity-80">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Giant Dotted Sphere Mesh */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 perspective-[2000px]">
        <motion.div
          className="relative preserve-3d w-0 h-0"
          style={{
            rotateX: springY,
            rotateY: springX,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="relative preserve-3d w-0 h-0"
            animate={{ rotateY: 360, rotateZ: 360 }}
            transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {points.map((pt, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                style={{
                  transform: `translate3d(${pt.x}px, ${pt.y}px, ${pt.z}px)`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Abstract Representation (Cube) - Behind Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="perspective-[1000px] pointer-events-auto scale-50 md:scale-100 transition-transform duration-500">
          <motion.div
            className="w-96 h-96 relative preserve-3d"
            style={{
              transformStyle: "preserve-3d",
              rotateX: springY,
              rotateY: springX,
            }}
          >
            <motion.div
              className="w-full h-full relative preserve-3d"
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              whileHover={{ scale: 1.1 }}
              transition={{
                rotateX: { duration: 20, repeat: Infinity, ease: "linear" },
                rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.3 },
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Cube Faces - increased translateZ from 64px to 192px (half of w-96/24rem/384px) */}
              <div
                className="absolute w-full h-full border border-red-500/30 bg-red-900/5 backdrop-blur-sm shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                style={{ transform: "translateZ(192px)" }}
              />
              <div
                className="absolute w-full h-full border border-blue-500/30 bg-blue-900/5 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                style={{ transform: "rotateY(180deg) translateZ(192px)" }}
              />
              <div
                className="absolute w-full h-full border border-green-500/30 bg-green-900/5 backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                style={{ transform: "rotateY(90deg) translateZ(192px)" }}
              />
              <div
                className="absolute w-full h-full border border-purple-500/30 bg-purple-900/5 backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                style={{ transform: "rotateY(-90deg) translateZ(192px)" }}
              />
              <div
                className="absolute w-full h-full border border-white/20 bg-white/5 backdrop-blur-sm"
                style={{ transform: "rotateX(90deg) translateZ(192px)" }}
              />
              <div
                className="absolute w-full h-full border border-white/20 bg-white/5 backdrop-blur-sm"
                style={{ transform: "rotateX(-90deg) translateZ(192px)" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center pointer-events-none">
        <motion.h1
          className="text-4xl md:text-8xl font-black uppercase tracking-widest mb-4 mt-32 pointer-events-auto"
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Refining <br />
          <motion.span
            className="text-transparent font-['Audiowide'] bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-500"
            style={{ backgroundSize: "200% auto" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            Reality
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Forging the next generation of digital experiences.
          <br /> We build voids where ideas become ecosystems.
        </motion.p>

        <motion.a
          href="#portfolio"
          className="group relative px-10 py-5 border border-white/20 overflow-hidden bg-transparent pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{
            scale: 1.05,
            borderColor: "rgba(255,255,255,0.8)",
            boxShadow: "0 0 20px rgba(255,255,255,0.1)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
          <span className="relative text-white font-bold tracking-[0.2em] uppercase text-sm group-hover:text-white transition-colors">
            Explore Ecosystem
          </span>
        </motion.a>
      </div>

      <motion.div
        className="absolute bottom-10 -translate-x-1/2 text-white/30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
