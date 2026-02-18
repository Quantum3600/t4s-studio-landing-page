import React from "react";
import { Github, Twitter, Instagram, ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 px-6 border-t border-white/10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        <div className="text-center md:text-left">
          <div className="mb-6">
            {/* PLACEHOLDER LOGO - Replace src with "/images/logo.png" after placing your file in public/images/ */}
            <img
              src="/images/t4smono.png"
              alt="T4S Studio"
              className="h-8 mx-auto md:mx-0 opacity-100"
            />
          </div>
          <p className="text-gray-500 text-sm max-w-xs mb-6">
            Refining reality through code, design, and artificial intelligence.
          </p>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://github.com/Quantum3600"
              className="inline-flex text-gray-400 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com/Trishit18"
              className="inline-flex text-gray-400 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/hoppingo.app/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="flex gap-12 text-sm text-gray-400">
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest">
              Sitemap
            </h4>
            <a href="#" className="block hover:text-blue-400 transition-colors">
              Home
            </a>
            <a
              href="#portfolio"
              className="block hover:text-blue-400 transition-colors"
            >
              Work
            </a>
            <a
              href="#vision"
              className="block hover:text-blue-400 transition-colors"
            >
              Vision
            </a>
            <a
              href="#team"
              className="block hover:text-blue-400 transition-colors"
            >
              Team
            </a>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest">
              Legal
            </h4>
            <a href="#" className="block hover:text-blue-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="block hover:text-blue-400 transition-colors">
              Terms
            </a>
          </div>
        </div>

        <div className="text-center md:text-right">
          <a
            href="#"
            className="inline-flex bg-white/30 text-black font-bold uppercase tracking-widest px-6 py-3 hover:bg-gray-200 transition-colors"
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
