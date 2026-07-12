import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItemProps {
  key?: number | string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-neutral-900 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-start justify-between text-left group transition-colors duration-300"
      >
        <div className="flex gap-4">
          <HelpCircle className="w-5 h-5 text-accent-gold/60 mt-0.5 shrink-0 group-hover:text-accent-gold transition-colors duration-300" />
          <span className="font-serif text-base md:text-lg text-neutral-200 group-hover:text-neutral-100 transition-colors duration-300">
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="ml-4 shrink-0 p-1 border border-neutral-900 rounded-full bg-neutral-950 text-accent-gold"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-9 pr-4 text-sm md:text-base text-neutral-400 font-sans font-light leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the process for booking a photography session with Clicks24?",
      answer: "Booking is seamless! Start by completing our Booking Brief below with your desired date and details. We will respond within 24 hours to schedule a creative consultation, discuss package customization, and finalize the timeline. A signed agreement and a standard retainer secure your reservation on our studio calendar."
    },
    {
      question: "Do you travel outside of Hassan for weddings and destination shoots?",
      answer: "Absolutely! While our central studio is located in Hassan, Karnataka, we regularly travel across India and globally for destination weddings, pre-wedding couple sessions, and editorial portraits. Travel and lodging logistics are calculated transparently and included directly within your personalized quote."
    },
    {
      question: "When and how will we receive our final edited photographs?",
      answer: "For portraits and maternity sessions, you will receive your hand-retouched collection within 2 weeks. For weddings, we deliver a curated 'sneak peek' of 25-30 high-resolution frames within 5 days, followed by your entire hand-edited gallery via a secure, beautifully formatted private online gallery within 6 to 8 weeks."
    },
    {
      question: "Can we customize the packages to fit our specific needs?",
      answer: "Yes, we believe every story deserves a bespoke frame. All our signature packages for weddings, couples, and portraits serve as starting frameworks. We can customize active coverage hours, introduce secondary shooters, incorporate custom-bound leather lay-flat albums, or bundle comprehensive cinematic videography."
    },
    {
      question: "What is your policy for unfavorable weather or rescheduling?",
      answer: "If an outdoor portrait session faces adverse weather conditions, we will gladly reschedule to the nearest available date without any extra charge. For other personal rescheduling requests, we ask for at least 72 hours' advance notice to accommodate other creative bookings on our studio roster."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-36 bg-neutral-950 border-t border-neutral-900/40">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent-gold mb-4 font-medium block">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-neutral-100 tracking-tight leading-none mb-6">
            Frequently Asked
            <span className="italic text-accent-gold font-normal font-serif"> Questions</span>
          </h2>
          <div className="w-12 h-[1px] bg-accent-gold/40" />
        </div>

        {/* Faq List */}
        <div className="bg-neutral-900/25 border border-neutral-900/60 p-6 md:p-10 rounded-lg backdrop-blur-sm shadow-xl">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
