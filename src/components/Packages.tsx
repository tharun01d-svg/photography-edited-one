import { motion } from "motion/react";
import { ArrowRight, Sparkles, User, Heart, Smile, Building, HelpCircle, Flame } from "lucide-react";

interface PackagesProps {
  onSelectService: (packageName: string) => void;
}

export default function Packages({ onSelectService }: PackagesProps) {
  const packages = [
    {
      name: "Portrait Photography",
      price: "₹5,000",
      description: "Professional indoor or outdoor portrait photography with high-quality edited images.",
      icon: User,
      delay: 0.1,
    },
    {
      name: "Wedding Photography",
      price: "₹50,000",
      description: "Complete wedding day photography with professional coverage, candid moments, traditional photography, and premium edited photos.",
      icon: Heart,
      delay: 0.2,
    },
    {
      name: "Maternity Shoot",
      price: "₹15,000",
      description: "Elegant maternity photography session with professionally edited images in beautiful locations or studio setup.",
      icon: Smile,
      delay: 0.3,
    },
    {
      name: "Pre-Wedding Shoot",
      price: "₹35,000",
      description: "Creative pre-wedding photography at outdoor or destination locations with cinematic concepts and premium editing.",
      icon: Flame,
      delay: 0.4,
    },
    {
      name: "Newborn Photography",
      price: "₹8,000",
      description: "Newborn baby photography with three creative themes, professional props, safe posing, and high-quality edited photographs.",
      icon: Sparkles,
      delay: 0.5,
    },
    {
      name: "Infrastructure Photography",
      price: "₹8,000",
      description: "Professional photography for hotels, resorts, interiors, architecture, commercial spaces, and real estate.",
      icon: Building,
      delay: 0.6,
    },
  ];

  const handleBookClick = (packageName: string) => {
    onSelectService(packageName);
    const bookingSection = document.querySelector("#booking");
    if (bookingSection) {
      const navbarHeight = 80;
      const elementPosition = bookingSection.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div id="photography-packages">
      {/* Packages Section Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between">
        <div className="max-w-2xl">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent-gold mb-4 font-medium block">
            Investment & Pricing
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-neutral-100 tracking-tight leading-none">
            Photography
            <span className="block italic text-accent-gold font-normal mt-1">
              Packages
            </span>
          </h2>
          <p className="font-sans text-neutral-400 text-xs md:text-sm mt-6 leading-relaxed font-light max-w-xl">
            Choose the perfect package for your special moments. Starting prices are shown below. Final pricing may vary based on location, duration, customization, and additional requirements.
          </p>
        </div>
      </div>

      {/* Packages Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
        {packages.map((pkg) => {
          const IconComponent = pkg.icon;
          return (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: pkg.delay }}
              className="group relative flex flex-col bg-neutral-900/10 hover:bg-neutral-900/30 border border-neutral-900 hover:border-accent-gold/30 p-6 md:p-8 transition-all duration-500 ease-out h-full justify-between rounded"
            >
              {/* Premium Glow Aura on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded pointer-events-none" />

              <div>
                {/* Header info of package */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-neutral-950/80 border border-neutral-900 group-hover:border-accent-gold/20 text-accent-gold rounded transition-colors duration-500">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-[9px] uppercase tracking-widest text-neutral-500 block mb-1">
                      Starting Price
                    </span>
                    <span className="font-mono text-lg font-medium text-accent-gold tracking-tight">
                      {pkg.price}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-lg md:text-xl text-neutral-100 mb-3 group-hover:text-accent-gold transition-colors duration-300">
                  {pkg.name}
                </h3>
                <p className="font-sans text-xs md:text-sm text-neutral-400 font-light leading-relaxed mb-8">
                  {pkg.description}
                </p>
              </div>

              <div>
                <button
                  onClick={() => handleBookClick(pkg.name)}
                  className="w-full py-3 bg-neutral-950 border border-neutral-800 hover:border-accent-gold group-hover:bg-accent-gold hover:!bg-accent-gold text-neutral-400 hover:!text-neutral-950 group-hover:text-neutral-200 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center space-x-2 rounded"
                >
                  <span>Book This Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Premium Custom Package Notice Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-neutral-900/10 border border-neutral-900 hover:border-accent-gold/20 p-8 md:p-10 rounded overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-8 transition-colors duration-500"
      >
        <div className="absolute inset-0 bg-radial from-accent-gold/[0.02] to-transparent pointer-events-none" />
        
        <div className="max-w-2xl relative z-10">
          <div className="flex items-center space-x-2.5 mb-3.5">
            <div className="p-1.5 bg-accent-gold/10 rounded text-accent-gold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-lg md:text-xl text-neutral-200">
              Need a Custom Package?
            </h4>
          </div>
          <p className="font-sans text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
            Every event is unique. Contact us for a personalized quotation based on your event type, location, duration, and additional requirements.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <button
            onClick={() => handleBookClick("Portrait Photography")}
            className="px-6 py-4 bg-accent-gold hover:bg-accent-gold-hover text-neutral-950 font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center space-x-2 rounded group shadow-lg shadow-accent-gold/5 hover:shadow-accent-gold/10"
          >
            <span>Get Custom Quote</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
