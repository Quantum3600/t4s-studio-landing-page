import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { PortfolioItem } from "../types";
import { ArrowUpRight } from "lucide-react";

const projects: PortfolioItem[] = [
  {
    id: "1",
    name: "Plectune",
    description:
      "Plectune brings the sophisticated, physics-driven UI interactions of iOS to Android, combining professional-grade audio precision with a stunning Liquid Glass interface that feels like magic in your hands. ",
    category: "Utility",
    color: "blue",
    accentHex: "#0055FF",
    image: "/images/projects/plectune.jpg",
    githubUrl: "https://github.com/Quantum3600/Plectune",
  },
  {
    id: "2",
    name: "HoppinGo",
    description:
      "Standalone Pujo travel companion app for Bengalis. Guiding throughthe best pandals in different optimal paths based on real-time traffic and hidden clubs. Enjoy this festive season like a local.",
    category: "Travel",
    color: "purple",
    accentHex: "#8800FF",
    image: "/images/projects/hoppingo.jpg",
    githubUrl: "https://github.com/Quantum3600/Project-Durga",
  },
  {
    id: "3",
    name: "Quotd",
    description:
      "A minimalist daily inspiration app that shows you bite sized quotes in very intuitive way. Beautifully designed, focusing on simplicity and fun. Start your day with the right mindset.",
    category: "Lifestyle",
    color: "red",
    accentHex: "#FF0055",
    image: "/images/projects/quotd.jpg",
    githubUrl: "https://github.com/Quantum3600/Quotd",
  },
  {
    id: "4",
    name: "WakeApp",
    description:
      "A Beautiful Alarm App made with Kotlin and Jetpack Compose. Built to be different and elegant. Feel refreshed every morning.",
    category: "Health",
    color: "green",
    accentHex: "#00FF55",
    image: "/images/projects/wakeapp.jpg",
    githubUrl: "https://github.com/Quantum3600/WakeApp",
  },
];

const Portfolio: React.FC = () => {
  return (
    <section
      id="portfolio"
      className="py-16 md:py-24 px-6 bg-white dark:bg-[#030303] relative z-10 overflow-hidden transition-colors duration-300"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 border-l-4 border-black dark:border-white pl-6 transition-colors duration-300"
        >
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-2">
            Our Artifacts
          </h2>
          <p className="text-gray-500 uppercase tracking-widest text-sm">
            Deployments to the real world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PortfolioCard: React.FC<{ project: PortfolioItem; index: number }> = ({
  project,
  index,
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Create staggered parallax effect based on column (index)
  // Even items move slightly up, odd items move slightly down or stay
  const isEven = index % 2 === 0;
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? [0, -50] : [50, 0],
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        y: yParallax, // Apply scroll parallax here
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[400px] md:h-[500px] w-full bg-gray-50 dark:bg-[#080808] border border-black/5 dark:border-white/5 overflow-hidden cursor-pointer perspective-[1000px] rounded-xl transition-colors duration-300"
    >
      {/* Background Glow on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${project.accentHex}, transparent 70%)`,
          transform: "translateZ(-20px)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 h-full p-8 flex flex-col justify-between"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 text-xs border border-black/10 dark:border-white/20 rounded-full uppercase tracking-wider text-black dark:text-gray-400 bg-white/50 dark:bg-black/50 backdrop-blur-md transition-colors duration-300">
            {project.category}
          </span>
          <ArrowUpRight className="text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
        </div>

        <div className="max-w-xs mt-auto">
          <h3
            className="text-4xl font-bold mb-4 uppercase transition-transform duration-300 group-hover:translate-x-2"
            style={{ textShadow: `0 0 20px ${project.accentHex}40` }}
          >
            {project.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
            {project.description}
          </p>
        </div>
      </div>

      {/* Device Mockup */}
      <motion.div
        className="absolute bottom-[-100px] right-[-20px] w-[280px] h-[610px] bg-white dark:bg-[#111] rounded-[3rem] border-8 border-gray-200 dark:border-[#222] shadow-2xl overflow-hidden z-0 transition-colors duration-300"
        initial={{ rotate: -15, y: 100, opacity: 0.8 }}
        whileHover={{ rotate: 0, y: -80, x: -20, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        style={{ transform: "translateZ(10px)" }}
      >
        {/* Screen Content Placeholder */}
        <div className="w-full h-full bg-gray-100 dark:bg-[#050505] relative flex flex-col transition-colors duration-300">
          {/* Top Bar */}
          <div className="h-6 w-full bg-gray-200 dark:bg-black flex justify-center items-center transition-colors duration-300">
            <div className="w-20 h-4 bg-gray-300 dark:bg-[#111] rounded-b-xl transition-colors duration-300"></div>
          </div>

          {/* Placeholder for Screenshot */}
          <div className="flex-1 overflow-hidden relative group-hover:opacity-100 transition-opacity">
            {/* REPLACE WITH YOUR SCREENSHOT: /image/projects/project-name.png */}
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-fill opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
          </div>

          {/* Accent Bar at bottom */}
          <div
            className="h-2 w-full"
            style={{ backgroundColor: project.accentHex }}
          />
        </div>

        {/* Reflection */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/5 dark:from-white/5 to-transparent pointer-events-none transition-colors duration-300" />
      </motion.div>

      {/* Decorative Lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent opacity-50 transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-black/20 dark:via-white/20 to-transparent opacity-50 transition-colors duration-300" />

      {/* Hover Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-0"
        style={{ backgroundColor: project.accentHex }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

export default Portfolio;
