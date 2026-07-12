import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-24 md:py-36 bg-neutral-950 border-t border-neutral-900/40 overflow-hidden relative"
    >
      {/* Abstract light background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Quote icon / mark */}
        <span className="font-serif text-8xl md:text-9xl text-accent-gold/15 leading-none h-12 block select-none">
          “
        </span>

        {/* Dynamic Carousel content */}
        <div className="w-full min-h-[280px] md:min-h-[220px] flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="font-serif italic text-lg md:text-2xl text-neutral-200 leading-relaxed max-w-3xl mb-8">
                "{activeTestimonial.quote}"
              </blockquote>

              {/* Author details */}
              <cite className="not-italic block">
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-neutral-100 font-medium">
                  {activeTestimonial.author}
                </p>
                <p className="font-sans text-[10px] uppercase tracking-widest text-accent-gold mt-1">
                  {activeTestimonial.role}
                </p>
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Elements */}
        <div className="flex items-center space-x-8 mt-12">
          {/* Previous Button */}
          <button
            id="testimonial-prev"
            onClick={handlePrev}
            className="p-2 border border-neutral-800 hover:border-accent-gold text-neutral-400 hover:text-accent-gold rounded-full transition-colors bg-neutral-900/40 hover:bg-neutral-900"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                id={`testimonial-dot-${index}`}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-accent-gold w-4" : "bg-neutral-800"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            id="testimonial-next"
            onClick={handleNext}
            className="p-2 border border-neutral-800 hover:border-accent-gold text-neutral-400 hover:text-accent-gold rounded-full transition-colors bg-neutral-900/40 hover:bg-neutral-900"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
