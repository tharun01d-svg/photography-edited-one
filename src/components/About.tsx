import { motion } from "motion/react";
import founderImage from "../assets/images/regenerated_image_1783840783144.png";
import OptimizedImage from "./OptimizedImage";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-36 bg-neutral-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Text Content - Left 7 columns on large desktop */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent-gold mb-4 font-medium block">
              Behind Clicks24
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-neutral-100 mb-8 leading-tight tracking-tight">
              Invest in memories,
              <span className="block italic text-accent-gold font-normal mt-1">
                nothing stays permanent.
              </span>
            </h2>

            <div className="space-y-6 text-neutral-300 font-sans text-sm md:text-base font-light leading-relaxed max-w-xl">
              <p>
                Clicks24 Photography specializes in capturing timeless memories through creative photography and cinematic videography. We provide professional photography services for weddings, engagements, maternity, newborns, babies, couples, holy communion, family portraits, birthdays, traditional events, studio portraits, and commercial shoots.
              </p>
              <p>
                Under the leadership of our lead photographer and founder, our team balances technical skill with deep emotional storytelling. Based in Hassan, Karnataka, we serve clients across the region and are available for travel worldwide to capture your most treasured milestones.
              </p>
              <p>
                We work deliberately with premium equipment, including high-resolution cameras, professional lighting, and advanced drones for cinematic shots, ensuring each session is custom-designed around your unique vision and comfort.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-neutral-900 mt-12 max-w-lg">
              <div>
                <p className="font-serif text-3xl md:text-4xl text-accent-gold">
                  10+
                </p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 mt-1">
                  Years of Vision
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl text-accent-gold">
                  800+
                </p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 mt-1">
                  Shoots Executed
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl text-accent-gold leading-none md:pt-1">
                  Premium
                </p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 mt-1.5">
                  4K & Drone Gear
                </p>
              </div>
            </div>
          </motion.div>

          {/* Portrait Image - Right 5 columns */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            {/* Elegant framing design element */}
            <div className="absolute -inset-4 border border-accent-gold/25 pointer-events-none mt-4 ml-4" />
            
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 group">
              <OptimizedImage
                src={founderImage}
                alt="Lead Photographer and Founder of Clicks24 Photography"
                className="w-full h-full grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                aspectRatioClass="aspect-[3/4]"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              
              {/* Overlay Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-neutral-950 to-transparent">
                <p className="font-serif text-lg text-neutral-100">
                  Clicks24 Studio
                </p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-accent-gold mt-0.5">
                  Lead Photographer & Founder
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
