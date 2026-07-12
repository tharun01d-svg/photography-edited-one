import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Import local image assets to ensure correct paths are bundled
import p1Image from "../assets/images/bridal_portrait_p1_1783768029319.jpg";
import p2Image from "../assets/images/couple_golden_hour_p2_1783768046793.jpg";
import p3Image from "../assets/images/maternity_portrait_p3_1783768060537.jpg";
import p4Image from "../assets/images/newborn_baby_p4_1783768076163.jpg";
import p5Image from "../assets/images/regenerated_image_1783759543879.jpg";
import founderImage from "../assets/images/regenerated_image_1783758243612.jpg";

interface SitePreloaderProps {
  onComplete: () => void;
  key?: string;
}

const CRITICAL_IMAGES = [
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1920", // Hero background
  founderImage,
  p1Image,
  p2Image,
  p3Image,
  p4Image,
  p5Image,
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", // Services weddings
  "https://images.unsplash.com/photo-1551150431-027ee2898428?q=80&w=800", // Services maternity
];

const LOADING_STATUSES = [
  "Awakening optical sensors...",
  "Calibrating aperture matrices...",
  "Loading high-fidelity textures...",
  "Tracing natural light pathways...",
  "Optimizing analog color grades...",
  "Preparing vintage memories...",
  "Ready to disclose..."
];

export default function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(LOADING_STATUSES[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    let loadedCount = 0;
    const total = CRITICAL_IMAGES.length;

    // Smoothly update statuses based on progress
    const statusInterval = setInterval(() => {
      if (!isLoaded) {
        setStatusText((prev) => {
          const currentIndex = LOADING_STATUSES.indexOf(prev);
          const nextIndex = (currentIndex + 1) % (LOADING_STATUSES.length - 1);
          return LOADING_STATUSES[nextIndex];
        });
      }
    }, 800);

    // Hard limit / safety timeout (e.g. 4.5s) to guarantee entry even with slow connection
    const safetyTimeout = setTimeout(() => {
      if (active) {
        setProgress(100);
        setStatusText(LOADING_STATUSES[LOADING_STATUSES.length - 1]);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(onComplete, 600); // Allow fadeout animation
        }, 400);
      }
    }, 4500);

    const onImageLoaded = () => {
      if (!active) return;
      loadedCount++;
      const calculatedProgress = Math.round((loadedCount / total) * 100);
      
      // Ensure smooth progress increases, never jumping backwards
      setProgress((prev) => Math.max(prev, calculatedProgress));

      if (loadedCount >= total) {
        clearTimeout(safetyTimeout);
        setProgress(100);
        setStatusText(LOADING_STATUSES[LOADING_STATUSES.length - 1]);
        
        // Slight organic delay for premium aesthetic feel
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(onComplete, 600);
        }, 500);
      }
    };

    CRITICAL_IMAGES.forEach((url) => {
      if (!url) {
        onImageLoaded();
        return;
      }

      const img = new Image();
      img.onload = onImageLoaded;
      img.onerror = onImageLoaded; // continue on error to not block user
      img.src = url;
    });

    return () => {
      active = false;
      clearInterval(statusInterval);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete, isLoaded]);

  return (
    <div
      id="site-preloader"
      className="fixed inset-0 bg-neutral-950 z-50 flex flex-col justify-between p-8 md:p-16 select-none"
    >
      {/* Dynamic Background Noise / Ambience */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900/10 to-neutral-950/40 opacity-70 pointer-events-none" />

      {/* Top Meta Details Row */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
          <p className="font-sans text-[9px] md:text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium">
            Clicks24 Studio
          </p>
        </div>
        <p className="font-mono text-[9px] md:text-xs text-neutral-500 uppercase tracking-widest">
          Est. 2016 / Hassan, India
        </p>
      </div>

      {/* Central Brand Loading Engine */}
      <div className="flex flex-col items-center text-center max-w-xl mx-auto w-full z-10 my-auto">
        {/* Cinematic Aperture Icon */}
        <motion.div
          className="relative w-16 h-16 mb-8 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Outer circle rotating */}
          <motion.div
            className="absolute inset-0 rounded-full border border-neutral-800 border-t-accent-gold"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          />
          {/* Inner circle rotating opposite */}
          <motion.div
            className="absolute inset-2 rounded-full border border-dashed border-neutral-700 border-b-accent-gold/40"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
          <span className="font-sans text-[10px] font-semibold text-accent-gold">C24</span>
        </motion.div>

        {/* Elegant typography pairing logo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-serif text-3xl md:text-5xl text-neutral-100 tracking-[0.1em] font-light uppercase">
            Clicks24
          </h1>
          <p className="font-serif italic text-accent-gold text-xs md:text-sm mt-1 tracking-widest font-normal">
            Visual Curators of Light
          </p>
        </motion.div>

        {/* Custom luxury progress bar and status */}
        <div className="w-full max-w-sm mt-12 px-4">
          <div className="h-[2px] w-full bg-neutral-900 overflow-hidden relative rounded-full">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-accent-gold"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          <div className="flex justify-between items-center mt-3">
            <p className="font-sans text-[10px] uppercase tracking-widest text-neutral-400 font-light">
              {statusText}
            </p>
            <p className="font-mono text-[10px] text-accent-gold font-medium">
              {progress}%
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Credits */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 z-10 border-t border-neutral-900/40 pt-6">
        <p className="font-sans text-[9px] text-neutral-500 uppercase tracking-widest text-center md:text-left leading-relaxed">
          Nothing stays permanent, but memories do.<br />
          <span className="text-neutral-400">Archival Digital Chronicles</span>
        </p>
        <p className="font-sans text-[9px] text-neutral-500 uppercase tracking-widest">
          © {new Date().getFullYear()} Clicks24. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
