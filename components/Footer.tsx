import React from "react";
import { Github, Twitter, Instagram, ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black py-16 px-6 border-t border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        <div className="text-center md:text-left">
          <div className="mb-6">
            {/* PLACEHOLDER LOGO - Replace src with "/images/logo.png" after placing your file in public/images/ */}
            <img
              src="/images/t4smono.png"
              alt="T4S Studio"
              className="h-8 mx-auto md:mx-0 opacity-100 invert dark:invert-0 transition-all duration-300"
            />
          </div>
          <p className="text-gray-600 dark:text-gray-500 text-sm max-w-xs mb-6 transition-colors duration-300">
            Refining reality through code, design, and artificial intelligence.
          </p>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://github.com/Quantum3600"
              className="inline-flex text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com/Trishit18"
              className="inline-flex text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/hoppingo.app/"
              className="inline-flex text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="flex gap-12 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
          <div className="space-y-4">
            <h4 className="text-black dark:text-white font-bold uppercase tracking-widest transition-colors duration-300">
              Sitemap
            </h4>
            <a href="#" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </a>
            <a
              href="#portfolio"
              className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Work
            </a>
            <a
              href="#vision"
              className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Vision
            </a>
            <a
              href="#team"
              className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Team
            </a>
          </div>
          <div className="space-y-4">
            <h4 className="text-black dark:text-white font-bold uppercase tracking-widest transition-colors duration-300">
              Legal
            </h4>
            <a href="#" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Terms
            </a>
          </div>
        </div>

        <div className="text-center md:text-right">
          <a
            href="#"
            className="inline-flex bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-black dark:text-white font-bold uppercase tracking-widest px-6 py-3 transition-colors duration-300"
          >
            <ArrowUp className="mr-3" />
            back to top
          </a>
          <p className="mt-4 text-s text-gray-600 uppercase">
            © {new Date().getFullYear()} T4S Studio. All Systems Nominal.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
