import React, { useState } from "react";
import {
  motion,
  Variants,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { TeamMember } from "../types";

const members: TeamMember[] = [
  {
    id: "1",
    name: "Trishit Majumdar",
    role: "Lead Architect",
    image: "/images/trishit.png",
  },
  {
    id: "2",
    name: "Sudip Pal",
    role: "Backend Specialist",
    image: "/images/sudip.png",
  },
  {
    id: "3",
    name: "Sagnic Bhattacharya",
    role: "Database Manager",
    image: "/images/sagnic.png",
  },
  {
    id: "4",
    name: "Swarnali Mitra",
    role: "Backend Specialist",
    image: "/images/suor.png",
  },
  {
    id: "5",
    name: "Sujan Karamakar",
    role: "UI/UX Visionary",
    image: "/images/sujan.png",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

const Team: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const rotation = useMotionValue(0);
  const rotateReverse = useTransform(rotation, (r) => -r);

  // Animation loop for rotation
  useAnimationFrame((t, delta) => {
    if (!hoveredId) {
      // Slower speed: 360 degrees in ~60 seconds (0.006 deg/ms)
      rotation.set(rotation.get() + delta * 0.006);
    }
  });

  return (
    <section
      id="team"
      className="py-16 md:py-24 px-6 bg-[#030303] border-t border-white/5 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-10 md:mb-16">
          <h2 className="text-3xl font-bold uppercase">The Operators</h2>
          <span className="hidden md:block h-[1px] flex-1 bg-white/10 mx-8 mb-2"></span>
          <p className="text-gray-500 text-sm">T4S_MEMBERS_V1.0</p>
        </div>

        {/* Desktop Circular Layout */}
        <div className="hidden lg:flex justify-center items-center h-[600px] relative w-full">
          <div className="absolute w-[450px] h-[450px] border border-white/5 rounded-full" />
          <motion.div
            style={{ rotate: rotation }}
            className="relative w-[450px] h-[450px] rounded-full flex justify-center items-center"
          >
            {members.map((member, index) => {
              const isHovered = hoveredId === member.id;
              const angle = (index / members.length) * 360;
              // If hovered, move to center (radius 0), otherwise normal orbit
              const radius = isHovered ? 0 : 225;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={member.id}
                  className="absolute left-1/2 top-1/2"
                  initial={false}
                  animate={{
                    x: x,
                    y: y,
                    scale: isHovered ? 2 : 1,
                    zIndex: isHovered ? 50 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  style={{
                    marginLeft: "-80px", // Half of width (w-40 = 160px / 2 = 80px)
                    marginTop: "-100px", // Approximate half height
                  }}
                  onMouseEnter={() => setHoveredId(member.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <motion.div
                    style={{ rotate: rotateReverse }}
                    className="group text-center w-40 cursor-pointer"
                  >
                    <div className="relative w-36 h-36 mx-auto mb-4">
                      <div className="absolute inset-0 border border-white/20 rounded-[30px] rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                      <div className="absolute inset-0 border border-white/20 rounded-[30px] -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
                      <div className="absolute inset-0 rounded-[30px] overflow-hidden shadow-2xl">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                        />
                      </div>
                    </div>
                    <div
                      className={`bg-black/80 backdrop-blur-sm p-2 rounded-xl border border-white/10 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
                    >
                      <h3 className="text-sm font-bold uppercase group-hover:text-blue-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 tracking-widest mt-1">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile/Tablet Grid Layout */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex lg:hidden flex-wrap justify-center gap-12"
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              variants={item}
              className="group text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 border border-white/20 rounded-[40px] rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="absolute inset-0 border border-white/20 rounded-[40px] -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
                <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold uppercase group-hover:text-blue-400 transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 tracking-widest mt-1">
                {member.role}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm italic tracking-wide">
            <span className="text-white font-bold">T4S</span> Origin: The
            convergence of
            <span className="text-red-400 font-bold"> T</span>rishit,
            <span className="text-blue-400 font-bold"> S</span>udip,
            <span className="text-green-400 font-bold"> S</span>agnic,
            <span className="text-yellow-400 font-bold"> S</span>warnali, &
            <span className="text-purple-400 font-bold"> S</span>ujan
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
