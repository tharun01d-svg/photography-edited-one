import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Phone, Mail, MapPin, Instagram, CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Printer, Share2, Sparkles } from "lucide-react";
import { Booking } from "../types";

interface BookingProps {
  selectedServiceCategory: string;
  onClearServiceSelection: () => void;
}

type FormStep = "brief" | "confirmed";

export default function BookingSection({ selectedServiceCategory, onClearServiceSelection }: BookingProps) {
  // Booking details state
  const [formData, setFormData] = useState<Booking>({
    name: "",
    email: "",
    phone: "",
    shootType: "Portrait Photography",
    preferredDate: "",
    location: "",
    additionalRequirements: "Photography Only",
    message: ""
  });

  // State for tracking submission steps
  const [step, setStep] = useState<FormStep>("brief");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const getServicePrice = (type: string) => {
    switch (type) {
      case "Portrait Photography": return "₹5,000";
      case "Wedding Photography": return "₹50,000";
      case "Maternity Shoot": return "₹15,000";
      case "Pre-Wedding Shoot": return "₹35,000";
      case "Newborn Photography": return "₹8,000";
      case "Infrastructure Photography": return "₹8,000";
      default: return "₹5,000";
    }
  };

  // Sync prop category selection
  useEffect(() => {
    if (selectedServiceCategory) {
      const validPackages = [
        "Portrait Photography",
        "Wedding Photography",
        "Maternity Shoot",
        "Pre-Wedding Shoot",
        "Newborn Photography",
        "Infrastructure Photography"
      ];
      
      let mappedType = "Portrait Photography";
      if (validPackages.includes(selectedServiceCategory)) {
        mappedType = selectedServiceCategory;
      } else if (selectedServiceCategory === "Weddings") {
        mappedType = "Wedding Photography";
      } else if (selectedServiceCategory === "Maternity") {
        mappedType = "Maternity Shoot";
      } else if (selectedServiceCategory === "Couples") {
        mappedType = "Portrait Photography";
      } else if (selectedServiceCategory === "Traditional Events") {
        mappedType = "Wedding Photography";
      } else if (selectedServiceCategory === "Baby") {
        mappedType = "Newborn Photography";
      }
      
      setFormData((prev) => ({ ...prev, shootType: mappedType }));
    }
  }, [selectedServiceCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "phone") {
      setPhoneError("");
    }
  };

  // Step 1: Submit brief directly -> confirm booking
  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate || !formData.location) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate Indian phone number
    // Clean spaces, hyphens, and parentheses
    const cleanedPhone = formData.phone.replace(/[\s\-()]/g, "");
    // Check if it's a 10-digit number starting with 6,7,8,9 (with optional +91, 91 or 0 prefix)
    const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(cleanedPhone)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number (e.g. +91 98765 43210).");
      return;
    }
    
    setPhoneError("");
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = "C24-" + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(generatedRef);
      setStep("confirmed");
      onClearServiceSelection();
    }, 1500);
  };

  // Reset the form
  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      shootType: "Portrait Photography",
      preferredDate: "",
      location: "",
      additionalRequirements: "Photography Only",
      message: ""
    });
    setPhoneError("");
    setStep("brief");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="booking" className="py-24 md:py-36 bg-neutral-950 border-t border-neutral-900/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Left Column: Contact info & Studio Details (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent-gold mb-4 font-medium block">
                Contact & Bookings
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-neutral-100 tracking-tight leading-none mb-8">
                Initiate Your
                <span className="block italic text-accent-gold font-normal mt-1">
                  Creative Session
                </span>
              </h2>
              <p className="font-sans text-neutral-400 text-sm font-light leading-relaxed mb-12 max-w-sm">
                Sessions are limited and scheduled on a rolling calendar. Securing a shoot requires an initial deposit after aligning on your creative brief.
              </p>

              {/* Contact Details Grid */}
              <div className="space-y-8">
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-accent-gold mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-neutral-200">The Hassan Studio</h4>
                    <p className="font-sans text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                      No.06, Siddeshwara Complex, 1st Cross Rd,<br />
                      behind indian bank, wesley road, CSI Layout,<br />
                      Rangoli Halla, Hassan, Karnataka 573201<br />
                      <span className="text-neutral-500 text-[10px] uppercase tracking-wider block mt-1">
                        By Appointment & Walk-in
                      </span>
                    </p>
                  </div>
                </div>

                {/* Contact phone */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-accent-gold mt-1">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-neutral-200">Direct Inquiries</h4>
                    <p className="font-sans text-xs text-neutral-400 mt-1 font-light">
                      080885 53343 / +91 80885 53343<br />
                      <span className="text-neutral-500 text-[10px] uppercase tracking-wider block mt-1">
                        Mon — Sun, 9:00 — 18:30 IST
                      </span>
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-full text-accent-gold mt-1">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-neutral-200">Electronic Mail</h4>
                    <p className="font-sans text-xs text-neutral-400 mt-1 font-light hover:text-accent-gold transition-colors">
                      <a href="mailto:clicks24.in@gmail.com">clicks24.in@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Studio Location Map */}
              <div className="mt-8 pt-8 border-t border-neutral-900/60">
                <p className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 mb-4">
                  Studio Location Map
                </p>
                <div className="relative w-full h-48 md:h-56 bg-neutral-950 border border-neutral-900/60 overflow-hidden rounded">
                  <iframe
                    title="Clicks24 Photography Studio Location"
                    src="https://maps.google.com/maps?q=Clicks24%20Photography,%20No.06,%20Siddeshwara%20Complex,%201st%20Cross%20Rd,%20behind%20indian%20bank,%20wesley%20road,%20CSI%20Layout,%20Rangoli%20Halla,%20Hassan,%20Karnataka%20573201&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="pt-12 border-t border-neutral-900 mt-12">
              <p className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 mb-4">
                Connect on Instagram
              </p>
              <a
                href="https://www.instagram.com/clicks24photography?igsh=aDRhN2thc2oxZ2px"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 p-3 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 hover:border-accent-gold/20 text-neutral-300 hover:text-accent-gold transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4" />
                <span className="font-sans text-[10px] uppercase tracking-widest">@clicks24photography</span>
              </a>
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Form Cards (7 columns) */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="w-full bg-neutral-900/10 border border-neutral-900 p-8 md:p-10 relative">
              
              {/* Gold framing border decorations */}
              <div className="absolute top-0 right-0 w-6 h-[1px] bg-accent-gold/45" />
              <div className="absolute top-0 right-0 w-[1px] h-6 bg-accent-gold/45" />
              <div className="absolute bottom-0 left-0 w-6 h-[1px] bg-accent-gold/45" />
              <div className="absolute bottom-0 left-0 w-[1px] h-6 bg-accent-gold/45" />

              <AnimatePresence mode="wait">
                
                {/* STEP 1: BRIEF FORM */}
                {step === "brief" && (
                  <motion.div
                    key="form-brief"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-6">
                      <h3 className="font-serif text-lg text-neutral-200">
                        Creative Brief <span className="text-neutral-500 font-sans text-xs ml-2">— Session Intake</span>
                      </h3>
                      <span className="text-[10px] font-sans uppercase tracking-widest text-accent-gold animate-pulse">
                        ● Active Calendar
                      </span>
                    </div>

                    <form id="booking-brief-form" onSubmit={handleBriefSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div>
                          <label htmlFor="name" className="block font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-accent-gold focus:outline-none px-4 py-3.5 text-xs text-neutral-200 font-sans transition-colors duration-300"
                          />
                        </div>

                        {/* Email Input */}
                        <div>
                          <label htmlFor="email" className="block font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. rahul@domain.com"
                            className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-accent-gold focus:outline-none px-4 py-3.5 text-xs text-neutral-200 font-sans transition-colors duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone Input */}
                        <div>
                          <label htmlFor="phone" className="block font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                            Telephone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 98765 43210"
                            className={`w-full bg-neutral-950 border ${phoneError ? 'border-red-500/50 hover:border-red-500 focus:border-red-500' : 'border-neutral-800 hover:border-neutral-700 focus:border-accent-gold'} focus:outline-none px-4 py-3.5 text-xs text-neutral-200 font-sans transition-colors duration-300`}
                          />
                          <p className="mt-1.5 font-sans text-[9px] text-neutral-500 tracking-wide">
                            Only Indian numbers are accepted.
                          </p>
                          {phoneError && (
                            <p className="mt-1 font-sans text-[10px] text-red-400 tracking-wide">
                              {phoneError}
                            </p>
                          )}
                        </div>

                        {/* Select Photography Service Dropdown */}
                        <div>
                          <label htmlFor="shootType" className="block font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                            Select Photography Service *
                          </label>
                          <select
                            id="shootType"
                            name="shootType"
                            required
                            value={formData.shootType}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-accent-gold focus:outline-none px-4 py-3.5 text-xs text-neutral-200 font-sans transition-colors duration-300"
                          >
                            <option value="Portrait Photography">Portrait Photography — ₹5,000</option>
                            <option value="Wedding Photography">Wedding Photography — ₹50,000</option>
                            <option value="Maternity Shoot">Maternity Shoot — ₹15,000</option>
                            <option value="Pre-Wedding Shoot">Pre-Wedding Shoot — ₹35,000</option>
                            <option value="Newborn Photography">Newborn Photography — ₹8,000</option>
                            <option value="Infrastructure Photography">Infrastructure Photography — ₹8,000</option>
                          </select>

                          {/* Automatically display package & price below */}
                          <div className="mt-2.5 p-3.5 bg-neutral-950/70 border border-neutral-900/60 rounded flex flex-col space-y-1">
                            <p className="font-sans text-[11px] text-neutral-400">
                              <span className="font-medium text-neutral-300">Selected Package:</span> {formData.shootType}
                            </p>
                            <p className="font-sans text-[11px] text-neutral-400">
                              <span className="font-medium text-neutral-300">Base Price:</span> <span className="text-accent-gold font-mono font-medium">{getServicePrice(formData.shootType)}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Event Date */}
                        <div>
                          <label htmlFor="preferredDate" className="block font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                            Event Date *
                          </label>
                          <input
                            type="date"
                            id="preferredDate"
                            name="preferredDate"
                            required
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-accent-gold focus:outline-none px-4 py-3.5 text-xs text-neutral-200 font-sans transition-colors duration-300"
                          />
                        </div>

                        {/* Event Location */}
                        <div>
                          <label htmlFor="location" className="block font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                            Event Location *
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            required
                            value={formData.location || ""}
                            onChange={handleInputChange}
                            placeholder="e.g. CSI Layout, Hassan"
                            className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-accent-gold focus:outline-none px-4 py-3.5 text-xs text-neutral-200 font-sans transition-colors duration-300"
                          />
                        </div>
                      </div>

                      {/* Additional Requirements Selector */}
                      <div>
                        <label htmlFor="additionalRequirements" className="block font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                          Additional Requirements
                        </label>
                        <select
                          id="additionalRequirements"
                          name="additionalRequirements"
                          value={formData.additionalRequirements || "Photography Only"}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-accent-gold focus:outline-none px-4 py-3.5 text-xs text-neutral-200 font-sans transition-colors duration-300"
                        >
                          <option value="Photography Only">Photography Only</option>
                          <option value="Photography and Videography">Photography and Videography</option>
                          <option value="Drone Coverage">Drone Coverage</option>
                          <option value="Premium Album">Premium Album</option>
                          <option value="Extra Event Day">Extra Event Day</option>
                          <option value="Custom Requirement">Custom Requirement</option>
                        </select>
                        <div className="mt-2 text-[11px] font-sans text-neutral-500 italic">
                          Additional services will be quoted separately after consultation.
                        </div>
                      </div>

                      {/* Message Brief */}
                      <div>
                        <label htmlFor="message" className="block font-sans text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-medium">
                          Conceptual Brief & Narrative Goals
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Describe the mood, color grades, and artistic direction you wish to explore..."
                          className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 focus:border-accent-gold focus:outline-none px-4 py-3.5 text-xs text-neutral-200 font-sans transition-colors duration-300 resize-none"
                        />
                      </div>

                      {/* Price Summary and Custom Notice Block */}
                      <div className="p-4 bg-neutral-950 border border-neutral-900 rounded space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-neutral-500 font-sans">Selected Service:</span>
                          <span className="text-neutral-200 font-sans font-semibold">{formData.shootType}</span>
                        </div>
                        <div className="flex justify-between text-xs border-t border-neutral-900 pt-2">
                          <span className="text-neutral-500 font-sans">Starting Price:</span>
                          <span className="text-accent-gold font-mono font-semibold text-sm">{getServicePrice(formData.shootType)}</span>
                        </div>
                        <p className="text-[10px] text-neutral-500 font-sans leading-relaxed pt-2 border-t border-neutral-900 font-light">
                          The displayed amount is the base starting price. The final cost may vary depending on event duration, location, number of photographers, videography, albums, travel, and other custom requirements.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-accent-gold hover:bg-accent-gold-hover text-neutral-950 font-sans text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-center space-x-2 group"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                            <span>Submitting Booking Request...</span>
                          </div>
                        ) : (
                          <>
                            <span>Submit Booking Request</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 3: BOOKING CONFIRMED */}
                {step === "confirmed" && (
                  <motion.div
                    key="form-confirmed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-6 flex flex-col items-center"
                  >
                    <div className="p-4 bg-accent-gold/10 border border-accent-gold/30 rounded-full text-accent-gold mb-6 animate-pulse">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent-gold mb-2 font-medium">
                      Booking Request Submitted
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl text-neutral-100 mb-6 leading-tight">
                      Thank You for Reaching Out
                    </h3>

                    <div className="w-full bg-neutral-950 border border-neutral-900/60 rounded p-6 mb-8 text-left space-y-3 max-w-md">
                      <div className="flex justify-between text-xs border-b border-neutral-900 pb-3">
                        <span className="text-neutral-500 font-sans">Reference:</span>
                        <span className="text-accent-gold font-mono font-medium">{bookingRef}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-neutral-900/40 pb-2">
                        <span className="text-neutral-500 font-sans">Name:</span>
                        <span className="text-neutral-300 font-sans font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-neutral-900/40 pb-2">
                        <span className="text-neutral-500 font-sans">Phone:</span>
                        <span className="text-neutral-300 font-sans font-medium">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-neutral-900/40 pb-2">
                        <span className="text-neutral-500 font-sans">Email:</span>
                        <span className="text-neutral-300 font-sans font-medium">{formData.email}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-neutral-900/40 pb-2">
                        <span className="text-neutral-500 font-sans">Selected Service:</span>
                        <span className="text-neutral-300 font-sans font-medium">{formData.shootType}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-neutral-900/40 pb-2">
                        <span className="text-neutral-500 font-sans">Base Price:</span>
                        <span className="text-accent-gold font-mono font-medium">{getServicePrice(formData.shootType)}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-neutral-900/40 pb-2">
                        <span className="text-neutral-500 font-sans">Event Date:</span>
                        <span className="text-neutral-300 font-sans font-medium">{formData.preferredDate}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-neutral-900/40 pb-2">
                        <span className="text-neutral-500 font-sans">Event Location:</span>
                        <span className="text-neutral-300 font-sans font-medium">{formData.location}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-neutral-900/40 pb-2">
                        <span className="text-neutral-500 font-sans">Requirements:</span>
                        <span className="text-neutral-300 font-sans font-medium">{formData.additionalRequirements}</span>
                      </div>
                      {formData.message && (
                        <div className="text-xs">
                          <span className="text-neutral-500 font-sans block mb-1">Message:</span>
                          <span className="text-neutral-400 font-sans font-light block line-clamp-2 bg-neutral-950 p-2.5 border border-neutral-900 italic">{formData.message}</span>
                        </div>
                      )}
                      <div className="border-t border-neutral-900 pt-3 text-neutral-400 font-sans text-[11px] leading-relaxed font-light text-center">
                        Our creative team will review your requirements and connect with you shortly at <span className="text-neutral-200 font-medium">{formData.email}</span>.
                      </div>
                    </div>

                    {/* Print / Reset buttons */}
                    <div className="flex space-x-4">
                      <button
                        onClick={handlePrint}
                        className="px-6 py-3 border border-neutral-800 hover:border-neutral-600 bg-neutral-950 text-[10px] font-sans uppercase tracking-widest text-neutral-300 hover:text-white transition-colors flex items-center space-x-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Invoice</span>
                      </button>
                      <button
                        onClick={handleResetForm}
                        className="px-6 py-3 bg-accent-gold hover:bg-accent-gold-hover text-neutral-950 text-[10px] font-sans uppercase tracking-widest font-medium transition-colors flex items-center space-x-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>New Brief</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
