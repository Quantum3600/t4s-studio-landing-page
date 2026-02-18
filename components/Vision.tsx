import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const Vision: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const codeY1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const codeY2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      id="vision"
      ref={containerRef}
      className="py-20 md:py-32 px-6 bg-[#050505] relative overflow-hidden"
    >
      {/* Background Typography Parallax */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none select-none overflow-hidden">
        <motion.h2
          style={{ x: textX, opacity: 0.03 }}
          className="text-[25vw] font-black leading-none whitespace-nowrap text-white"
        >
          VISION VISION
        </motion.h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
        {/* Left Column: Code Visualization */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ y: codeY1 }}
          className="relative"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="aspect-square bg-gradient-to-br from-gray-900 to-black border border-white/10 p-8 flex flex-col justify-center shadow-2xl shadow-purple-900/20 backdrop-blur-sm relative z-10"
          >
            {/* Terminal Header */}
            <div className="flex gap-2 mb-6 opacity-50">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <code className="text-green-500 text-sm mb-4 font-mono">
              <span className="text-purple-400">@Composable</span>
              <br />
              <span className="text-blue-400">fun</span> CraftFuture() {"{"}
            </code>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pl-4 border-l border-white/10 space-y-3"
            >
              <motion.div
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  visible: { width: "75%", opacity: 1 },
                }}
                className="h-2 bg-white/10 rounded"
              />
              <motion.div
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  visible: { width: "50%", opacity: 1 },
                }}
                className="h-2 bg-white/10 rounded"
              />
              <motion.div
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  visible: { width: "85%", opacity: 1 },
                }}
                className="h-2 bg-blue-500/20 rounded"
              />
              <motion.div
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  visible: { width: "60%", opacity: 1 },
                }}
                className="h-2 bg-white/10 rounded"
              />
            </motion.div>

            <code className="text-green-500 text-sm mt-4">{"}"}</code>
          </motion.div>

          {/* Decorative rotating elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 -right-6 w-24 h-24 border border-blue-500/30 z-0"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-6 -left-6 w-24 h-24 border border-red-500/30 z-0"
          />
        </motion.div>

        {/* Right Column: Text Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase">
            Code as{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
              Art Form
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            We don't just write code; we architect experiences. At T4S, we
            specialize in
            <span className="text-white font-medium"> Kotlin</span> and
            <span className="text-white font-medium"> Jetpack Compose</span> to
            build native Android applications that feel fluid, responsive, and
            alive.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            From complex backend integrations to pixel-perfect animations, our
            studio bridges the gap between rigid engineering and organic design.
          </p>

          <div className="mt-12 flex space-x-8 border-t border-white/10 pt-8">
            {[
              { val: "100%", label: "Kotlin" },
              { val: "50+", label: "Modules" },
              { val: "4.9", label: "Avg Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <motion.h4
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {stat.val}
                </motion.h4>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second Section: Built for Production */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10 mt-20 md:mt-32">
        {/* Left Column: Text Content (Reversed for visual flow) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="order-2 md:order-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
              Production
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Stability meets speed. We harness the robust ecosystem of
            <span className="text-white font-medium"> Spring Boot</span>{" "}
            combined with the expressive power of
            <span className="text-white font-medium"> Kotlin</span> to architect
            server-side solutions that scale effortlessly.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            From microservices to monolithic masterpieces, our backend
            engineering ensures your application performs flawlessly under any
            load.
          </p>

          <div className="mt-12 flex space-x-8 border-t border-white/10 pt-8">
            {[
              { val: "99.9%", label: "Uptime" },
              { val: "<50ms", label: "Latency" },
              { val: "∞", label: "Scale" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <motion.h4
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {stat.val}
                </motion.h4>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Code Visualization */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          style={{ y: codeY2 }}
          className="relative order-1 md:order-2"
        >
          <motion.div
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="aspect-square bg-gradient-to-bl from-gray-900 to-black border border-white/10 p-8 flex flex-col justify-center shadow-2xl shadow-green-900/20 backdrop-blur-sm relative z-10"
          >
            {/* Terminal Header */}
            <div className="flex gap-2 mb-6 opacity-50">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <code className="text-emerald-500 text-sm mb-4 font-mono">
              <span className="text-yellow-400">@RestController</span>
              <br />
              <span className="text-blue-400">class</span> MagicController {"{"}
            </code>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pl-4 border-l border-white/10 space-y-3"
            >
              <motion.div
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  visible: { width: "65%", opacity: 1 },
                }}
                className="h-2 bg-white/10 rounded"
              />
              <motion.div
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  visible: { width: "40%", opacity: 1 },
                }}
                className="h-2 bg-white/10 rounded"
              />
              <code className="block text-xs text-gray-500 mt-2">
                // Injecting Kotlin Magic
              </code>
              <motion.div
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  visible: { width: "80%", opacity: 1 },
                }}
                className="h-2 bg-emerald-500/20 rounded"
              />
            </motion.div>

            <code className="text-emerald-500 text-sm mt-4">{"}"}</code>
          </motion.div>

          {/* Decorative rotating elements */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 -left-6 w-24 h-24 border border-emerald-500/30 z-0"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-6 -right-6 w-24 h-24 border border-purple-500/30 z-0"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
