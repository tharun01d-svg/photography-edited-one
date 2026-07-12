import { motion } from "motion/react";
import { MessageCircle, Instagram } from "lucide-react";

export default function FloatingActions() {
  const whatsappUrl = "https://wa.me/918088553343?text=Hello%20Clicks24%20Photography%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20photography%20session!";
  const instagramUrl = "https://www.instagram.com/clicks24photography?igsh=aDRhN2thc2oxZ2px";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3" id="floating-actions-container">
      {/* Instagram Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="group relative flex items-center justify-end"
      >
        {/* Tooltip */}
        <span className="mr-3 px-3 py-1.5 rounded bg-neutral-900/95 border border-neutral-800 text-neutral-300 font-sans text-[11px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg backdrop-blur-sm">
          Instagram Portfolio
        </span>
        
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Clicks24 Photography on Instagram"
          className="w-12 h-12 md:w-13 md:h-13 rounded-full bg-neutral-950/90 border border-accent-gold/20 hover:border-accent-gold text-neutral-400 hover:text-accent-gold shadow-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-md relative overflow-hidden group-hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]"
        >
          {/* Subtle glow layer */}
          <div className="absolute inset-0 bg-radial from-accent-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Instagram className="w-5 h-5 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
        </a>
      </motion.div>

      {/* WhatsApp Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="group relative flex items-center justify-end"
      >
        {/* Tooltip */}
        <span className="mr-3 px-3 py-1.5 rounded bg-neutral-900/95 border border-neutral-800 text-neutral-300 font-sans text-[11px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg backdrop-blur-sm">
          Chat on WhatsApp
        </span>
        
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Clicks24 Photography on WhatsApp"
          className="w-12 h-12 md:w-13 md:h-13 rounded-full bg-neutral-950/90 border border-emerald-500/20 hover:border-emerald-500 text-neutral-400 hover:text-emerald-400 shadow-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-md relative overflow-hidden group-hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]"
        >
          {/* Subtle glow layer */}
          <div className="absolute inset-0 bg-radial from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <MessageCircle className="w-5 h-5 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
        </a>
      </motion.div>
    </div>
  );
}
