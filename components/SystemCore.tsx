import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeProjectIdea } from "../services/gemini";
import { AiResponse } from "../types";
import { Sparkles, Cpu, Layers, AlertCircle, Loader2, Mail } from "lucide-react";

const SystemCore: React.FC = () => {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<AiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const result = await analyzeProjectIdea(input);
      setAnalysis(result);
    } catch (err) {
      setError("System malfunction. Neural link failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-black relative border-t border-black/10 dark:border-white/10 overflow-hidden transition-colors duration-300">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-900/5 dark:from-blue-900/10 to-transparent pointer-events-none transition-colors duration-300" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-full mb-6 transition-colors duration-300">
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-xs font-bold tracking-widest uppercase">
              System Core // AI Powered
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase text-black dark:text-white transition-colors duration-300">
            Initialize Project Protocol
          </h2>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Describe your concept. Our AI Neural Core will architect the initial
            stack.
          </p>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-1 md:p-2 rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-blue-900/10 transition-colors duration-300">
          <form onSubmit={handleAnalyze} className="relative">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., 'A decentralized social network for musicians to collaborate remotely'"
                className="flex-1 bg-gray-100 dark:bg-[#111] text-black dark:text-white px-6 py-4 rounded-xl border border-black/5 dark:border-white/5 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all font-mono text-sm placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Analyze"}
              </button>
            </div>
          </form>

          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 md:p-8 mt-4 border-t border-black/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 transition-colors duration-300">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Cpu size={14} /> System Analysis
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm transition-colors duration-300">
                        {analysis.analysis}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                        <AlertCircle size={14} /> Technical Note
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
                        {analysis.technicalNotes}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-100 dark:bg-[#111] rounded-xl p-6 border border-black/5 dark:border-white/5 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-green-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <Layers size={14} /> Stack Recommendation
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded border ${analysis.complexity === "Extreme"
                            ? "border-red-500 text-red-500"
                            : analysis.complexity === "High"
                              ? "border-orange-500 text-orange-500"
                              : "border-green-500 text-green-500"
                          } uppercase font-bold`}
                      >
                        {analysis.complexity} Load
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {analysis.stackRecommendation.map((tech, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="p-6 text-red-500 text-center font-mono text-sm uppercase"
              >
                [Error] {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-24 border-t border-black/10 dark:border-white/10 pt-16 text-center transition-colors duration-300">
          <h3 className="text-2xl font-bold uppercase mb-6 text-black dark:text-white transition-colors duration-300">
            Ready to build the future with us?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto transition-colors duration-300">
            Our team of architects is ready to bring your vision to life.
          </p>
          <a
            href="mailto:pujapandals2025@gmail.com"
            className="inline-flex bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            <Mail scale={24} className="w-4 h-6 mr-3" />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default SystemCore;
