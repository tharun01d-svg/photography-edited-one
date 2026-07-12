import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer id="footer" className="bg-neutral-950 border-t border-neutral-900/60 pt-16 pb-12 overflow-hidden relative">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Logo & Manifesto column (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-serif text-2xl tracking-[0.15em] text-neutral-100 block">
                CLICKS24
              </span>
              <span className="font-sans text-[9px] tracking-[0.3em] text-neutral-500 uppercase mt-0.5 block">
                Photography • Hassan
              </span>
              <p className="font-sans text-xs text-neutral-400 font-light mt-6 leading-relaxed max-w-xs">
                Capturing timeless memories through creative photography and cinematic videography, serving Hassan, Karnataka and worldwide.
              </p>
            </div>
            
            <p className="font-sans text-[10px] text-neutral-600 tracking-widest uppercase mt-8 hidden md:block">
              © 2026 Clicks24 Photography. All Rights Reserved.
            </p>
          </div>

          {/* Spacer (1 col) */}
          <div className="hidden md:block md:col-span-1" />

          {/* Quick Nav (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent-gold mb-6 font-medium">
              Navigation
            </h4>
            <ul className="space-y-3 font-sans text-xs uppercase tracking-wider">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScrollToSection(e, "#about")}
                  className="text-neutral-400 hover:text-accent-gold transition-colors duration-300"
                >
                  Philosophy
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScrollToSection(e, "#services")}
                  className="text-neutral-400 hover:text-accent-gold transition-colors duration-300"
                >
                  Services & Prices
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => handleScrollToSection(e, "#portfolio")}
                  className="text-neutral-400 hover:text-accent-gold transition-colors duration-300"
                >
                  Curated Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleScrollToSection(e, "#process")}
                  className="text-neutral-400 hover:text-accent-gold transition-colors duration-300"
                >
                  Studio Pathway
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  onClick={(e) => handleScrollToSection(e, "#booking")}
                  className="text-neutral-400 hover:text-accent-gold transition-colors duration-300"
                >
                  Book Session
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Contact details (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent-gold mb-6 font-medium">
                Legal & Atelier
              </h4>
              <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                Clicks24 Photography — Hassan, Karnataka, India<br />
                Professional Photography & Videography Studio<br />
                Terms of Commission & Fine Print available on request.
              </p>
            </div>

            {/* Back to Top */}
            <div className="flex justify-end mt-12 md:mt-0">
              <button
                id="footer-back-to-top"
                onClick={handleScrollToTop}
                className="inline-flex items-center space-x-2 text-[10px] font-sans uppercase tracking-[0.25em] text-neutral-400 hover:text-accent-gold transition-colors group"
                aria-label="Back to top"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile copyright */}
        <div className="border-t border-neutral-900/60 pt-8 mt-12 text-center md:hidden">
          <p className="font-sans text-[10px] text-neutral-600 tracking-widest uppercase">
            © 2026 Clicks24 Photography. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
