import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "../data";
import Packages from "./Packages";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  return (
    <section
      id="services"
      className="py-24 md:py-36 bg-neutral-950 border-t border-neutral-900/60"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Photography Packages Section */}
        <Packages onSelectService={onSelectService} />
      </div>
    </section>
  );
}
