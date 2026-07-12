import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Process", href: "#process" },
    { name: "Booking", href: "#booking" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href === "#" || href === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80; // offset of fixed navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out py-6 ${
          isScrolled
            ? "bg-neutral-950/80 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            id="nav-logo"
            href="#"
            className="group flex flex-col"
            onClick={(e) => handleLinkClick(e, "#")}
          >
            <span className="font-serif text-xl md:text-2xl tracking-[0.15em] text-neutral-100 group-hover:text-accent-gold transition-colors">
              CLICKS24
            </span>
            <span className="font-sans text-[8px] tracking-[0.3em] text-neutral-400 -mt-0.5 uppercase">
              Photography • Hassan
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-300 hover:text-accent-gold transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent-gold after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              id="desktop-nav-cta"
              href="#booking"
              onClick={(e) => handleLinkClick(e, "#booking")}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 border border-accent-gold/40 hover:border-accent-gold bg-transparent hover:bg-accent-gold hover:text-neutral-950 font-sans text-xs uppercase tracking-[0.2em] text-accent-gold transition-all duration-300"
            >
              <span>Reserve</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-200 hover:text-accent-gold p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-neutral-950 z-40 pt-28 px-8 flex flex-col justify-between pb-12 md:hidden"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-serif text-3xl tracking-wide text-neutral-200 hover:text-accent-gold block"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col space-y-6"
            >
              <div className="border-t border-neutral-800 pt-6">
                <p className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 mb-2">
                  Studio Location
                </p>
                <p className="font-sans text-xs text-neutral-300">
                  No.06, Siddeshwara Complex, 1st Cross Rd, Hassan, Karnataka 573201
                </p>
              </div>

              <a
                href="#booking"
                onClick={(e) => handleLinkClick(e, "#booking")}
                className="w-full py-4 bg-accent-gold text-neutral-950 text-center font-sans text-xs uppercase tracking-[0.25em] font-medium"
              >
                Book a Session
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
