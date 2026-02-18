import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const GlobalParallax: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll value for softer movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Layer 1: Large background gradients shifting vertically
  const y1 = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const opacity1 = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 0.3, 0.3, 0]);

  // Layer 2: Rotating geometric shapes
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 180]);
  const y2 = useTransform(smoothProgress, [0, 1], ['10%', '-20%']);

  // Layer 3: Vertical progress line
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Layer 4: Subtle floating text watermark
  const xText = useTransform(smoothProgress, [0, 1], ['-10%', '10%']);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Vertical Progress Line on the left */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block">
        <motion.div
          style={{ height: lineHeight }}
          className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 opacity-50"
        />
      </div>

      {/* Floating Gradient Blob 1 */}
      <motion.div
        style={{ top: y1, opacity: opacity1 }}
        className="absolute left-[10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px]"
      />

      {/* Floating Gradient Blob 2 */}
      <motion.div
        style={{ bottom: y2, right: '10%', opacity: opacity1 }}
        className="absolute w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[80px]"
      />

      {/* Rotating Square Outline */}
      <motion.div
        style={{ rotate: rotate1, top: '40%', right: '5%' }}
        className="absolute w-64 h-64 border border-white/5 rounded-3xl hidden lg:block"
      >
         <div className="absolute inset-4 border border-white/5 rounded-2xl" />
      </motion.div>

      {/* Watermark Text */}
      <motion.div
        style={{ x: xText }}
        className="absolute bottom-20 left-0 w-full text-center opacity-[0.02]"
      >
        <h1 className="text-[15vw] font-black leading-none font-['Audiowide'] text-white whitespace-nowrap">
          T4S STUDIO
        </h1>
      </motion.div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />
    </div>
  );
};

export default GlobalParallax;
