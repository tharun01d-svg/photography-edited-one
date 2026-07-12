import { motion } from "motion/react";
import { PROCESS_STEPS } from "../data";

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 md:py-36 bg-neutral-950 border-t border-neutral-900/40 relative overflow-hidden"
    >
      {/* Decorative vertical light streak/grid line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-900 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-28">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent-gold mb-4 font-medium block">
            Our Approach
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-neutral-100 tracking-tight leading-none mb-6">
            The Creative
            <span className="italic text-accent-gold font-normal font-serif"> Pathway</span>
          </h2>
          <div className="w-12 h-[1px] bg-accent-gold/40 mb-8" />
          <p className="font-sans text-neutral-400 text-xs md:text-sm max-w-lg leading-relaxed font-light">
            We operate with absolute transparency and meticulous organization, ensuring a calm, inspiring experience from first hello to final delivery.
          </p>
        </div>

        {/* Process Steps List/Timeline */}
        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              id={`process-step-${step.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-neutral-900/10 border border-neutral-900/60 p-8 hover:border-accent-gold/25 transition-all duration-500 flex flex-col justify-between h-full"
            >
              <div>
                {/* Step Number */}
                <div className="flex items-baseline justify-between mb-8">
                  <span className="font-serif text-4xl md:text-5xl text-neutral-800 group-hover:text-accent-gold/30 transition-colors duration-500 font-light">
                    {step.stepNumber}
                  </span>
                  <div className="w-8 h-[1px] bg-neutral-800 group-hover:bg-accent-gold/30 transition-colors duration-500" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-lg md:text-xl text-neutral-200 mb-4 group-hover:text-accent-gold transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step indicator dot at the bottom for timeline connector */}
              <div className="mt-8 pt-4 border-t border-neutral-950 flex justify-end">
                <span className="text-[9px] font-sans uppercase tracking-widest text-neutral-600 group-hover:text-accent-gold transition-colors duration-300">
                  Phase {step.stepNumber}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
