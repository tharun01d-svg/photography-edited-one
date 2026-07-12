import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import BookingSection from "./components/Booking";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import SitePreloader from "./components/SitePreloader";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [isSiteLoading, setIsSiteLoading] = useState(true);

  const handleSelectService = (serviceCategory: string) => {
    setSelectedService(serviceCategory);
  };

  const handleClearSelection = () => {
    setSelectedService("");
  };

  return (
    <div id="app-root" className="min-h-screen bg-neutral-950 font-sans selection:bg-accent-gold selection:text-neutral-950">
      <AnimatePresence mode="wait">
        {isSiteLoading ? (
          <SitePreloader key="preloader" onComplete={() => setIsSiteLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            {/* Navigation Layer */}
            <Navbar />

            {/* Editorial Content sections */}
            <main id="app-content">
              {/* Section 1: Hero Cover */}
              <Hero />

              {/* Section 2: Philosophy & Vision */}
              <About />

              {/* Section 3: Professional Categories */}
              <Services onSelectService={handleSelectService} />

              {/* Section 4: Curated Visual Gallery */}
              <Portfolio />

              {/* Section 5: Experience Pathway */}
              <Process />

              {/* Section 6: Client Perspectives */}
              <Testimonials />

              {/* Section 6.5: Frequently Asked Questions */}
              <Faq />

              {/* Section 7: Reservation Ledger & Brief */}
              <BookingSection
                selectedServiceCategory={selectedService}
                onClearServiceSelection={handleClearSelection}
              />
            </main>

            {/* Structural Foot credits & Instagram Journal */}
            <Footer />

            {/* Persistent Action Channels */}
            <FloatingActions />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

