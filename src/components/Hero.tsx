import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, MapPin, Map, X, ExternalLink } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

export default function Hero() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMapOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isMapOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMapOpen]);

  const handleScrollTo = (id: string) => {
    if (id === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(id);
    if (element) {
      const navbarHeight = 80; // height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Background Image with Ken Burns Zoom Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.45 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      >
        <OptimizedImage
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1920"
          alt="Cinematic studio light casting a golden warmth in the dark"
          className="w-full h-full filter grayscale contrast-110"
          isPriority={true}
          fetchPriority="high"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark vignette gradient overlays for optimal text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/20 z-10" />
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl px-6 md:px-12 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-accent-gold mb-6 font-medium"
        >
          Professional Photography & Videography Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-serif text-5xl md:text-8xl tracking-tight text-neutral-100 mb-6 leading-[1.1] md:leading-[1.05]"
        >
          CLICKS24
          <span className="block italic text-accent-gold font-normal font-serif mt-1">
            Photography
          </span>
        </motion.h1>

        {/* Studio Location & Interactive Map Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mb-8 flex items-center gap-2.5 px-4 py-2 border border-neutral-800/80 hover:border-accent-gold/40 rounded-full bg-neutral-950/80 backdrop-blur-sm transition-all duration-300 cursor-pointer group shadow-lg"
          onClick={() => setIsMapOpen(true)}
        >
          <MapPin className="w-3.5 h-3.5 text-accent-gold group-hover:scale-110 transition-transform" />
          <span className="font-sans text-[11px] uppercase tracking-widest text-neutral-300 font-light group-hover:text-neutral-100 transition-colors">
            Hassan, Karnataka, IN
          </span>
          <span className="w-1 h-1 rounded-full bg-accent-gold/60" />
          <span className="font-sans text-[10px] text-accent-gold tracking-widest flex items-center gap-1 font-medium uppercase">
            View Map <Map className="w-3 h-3" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-sans text-sm md:text-lg text-neutral-300 font-light max-w-xl leading-relaxed tracking-wide mb-12"
        >
          Nothing stays permanent, but memories do. Invest in memories.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <button
            id="hero-cta-book"
            onClick={() => handleScrollTo("#booking")}
            className="px-8 py-4 bg-accent-gold text-neutral-950 hover:bg-accent-gold-hover text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 transform hover:scale-[1.02]"
          >
            Book a Session
          </button>
          <button
            id="hero-cta-portfolio"
            onClick={() => handleScrollTo("#portfolio")}
            className="px-8 py-4 border border-neutral-600 hover:border-neutral-100 bg-neutral-950/20 hover:bg-neutral-900/40 text-xs uppercase tracking-[0.25em] text-neutral-200 hover:text-white transition-all duration-300"
          >
            Explore Portfolio
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        id="hero-scroll-indicator"
        onClick={() => handleScrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer text-neutral-400 hover:text-accent-gold"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.3em] mb-2 font-light">
          Scroll Down
        </span>
        <ArrowDown className="w-4 h-4 text-accent-gold animate-bounce" />
      </motion.button>

      {/* Map Modal */}
      <AnimatePresence>
        {isMapOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMapOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-900 rounded-lg overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-900 bg-neutral-950">
                <div className="flex items-center gap-3">
                  <div className="p-2 border border-accent-gold/20 rounded-full bg-neutral-900 text-accent-gold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-serif text-lg text-neutral-100 font-light">
                      Clicks24 Photography
                    </h3>
                    <p className="font-sans text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5">
                      Hassan, Karnataka, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://maps.google.com/maps?q=Clicks24%20Photography%20Hassan%20Karnataka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-neutral-800 rounded-md hover:border-accent-gold/40 text-neutral-400 hover:text-accent-gold transition-all duration-300 flex items-center justify-center"
                    title="Open in Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsMapOpen(false)}
                    className="p-2 border border-neutral-800 rounded-md hover:border-red-500/40 text-neutral-400 hover:text-red-400 transition-all duration-300 flex items-center justify-center"
                    title="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="relative w-full aspect-video md:h-[400px] bg-neutral-950">
                <iframe
                  title="Clicks24 Photography Hassan Map"
                  src="https://maps.google.com/maps?q=Hassan,%20Karnataka,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale invert opacity-85 contrast-125 brightness-90 hover:opacity-100 transition-opacity duration-300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Footer info */}
              <div className="px-6 py-5 bg-neutral-900/40 border-t border-neutral-900 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
                <div>
                  <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                    Our atelier is nestled in the heart of historic Hassan, Karnataka.
                  </p>
                  <p className="font-sans text-xs text-neutral-500 font-light mt-1">
                    Available for bookings across India and global destination commissions.
                  </p>
                </div>
                <a
                  href="https://maps.google.com/maps?q=Clicks24%20Photography%20Hassan%20Karnataka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-accent-gold hover:bg-accent-gold-hover text-neutral-950 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 shrink-0"
                >
                  Get Directions <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
