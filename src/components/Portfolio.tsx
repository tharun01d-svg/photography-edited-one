import { useState, useEffect, memo, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { PORTFOLIO_ITEMS } from "../data";
import { PortfolioItem } from "../types";
import OptimizedImage from "./OptimizedImage";
import ImagePreloader from "./ImagePreloader";

function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/2] w-full bg-neutral-900 border border-neutral-900 animate-pulse flex items-center justify-center relative overflow-hidden"
        >
          <div className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center bg-neutral-950/40">
            <span className="text-[9px] font-sans text-neutral-600 uppercase tracking-widest">C24</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900/10 to-neutral-950/40 blur-md" />
        </div>
      ))}
    </div>
  );
}

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
  isPriority: boolean;
}

const PortfolioCard = memo(({ item, index, onClick, isPriority }: PortfolioCardProps) => {
  return (
    <motion.div
      layout
      id={`portfolio-item-${item.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      onClick={onClick}
      className="relative overflow-hidden group cursor-pointer bg-neutral-900 border border-neutral-900 hover:border-accent-gold/20 aspect-[3/2] w-full"
    >
      <OptimizedImage
        src={item.url}
        alt={item.title}
        className="w-full h-full transform transition-all duration-700 ease-out group-hover:scale-105"
        aspectRatioClass="aspect-[3/2]"
        isPriority={isPriority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Elegant overlay on hover */}
      <div className="absolute inset-0 bg-neutral-950/45 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-10">
        <div className="p-3 border border-accent-gold/20 rounded-full bg-neutral-950/80 text-accent-gold transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
          <Maximize2 className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
});

PortfolioCard.displayName = "PortfolioCard";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  
  const BATCH_SIZE = 6;
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadMoreTrigger, setLoadMoreTrigger] = useState<HTMLDivElement | null>(null);

  // Filter Categories
  const categories = [
    "All",
    "Weddings",
    "Couples",
    "Maternity",
    "Baby",
    "Holy Communion",
    "Family Portraits",
    "Traditional Events",
    "Portraits",
    "Commercial"
  ];

  // Efficiently calculate which critical images should be preloaded before showing the gallery
  const preloadUrls = useMemo(() => {
    return filteredItems.slice(0, Math.min(3, filteredItems.length)).map((item) => item.url);
  }, [filteredItems]);

  // Preload first row of images on mount
  useEffect(() => {
    PORTFOLIO_ITEMS.slice(0, 3).forEach((item) => {
      const img = new Image();
      img.src = item.url;
    });
  }, []);

  // Category switching filter logic with loading crossfade transition
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      if (activeFilter === "All") {
        setFilteredItems(PORTFOLIO_ITEMS);
      } else {
        setFilteredItems(
          PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter)
        );
      }
      setVisibleCount(BATCH_SIZE);
      setIsTransitioning(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Preload previous and next image when lightbox is opened
  useEffect(() => {
    if (selectedItemIndex !== null) {
      const prevIndex = selectedItemIndex === 0 ? filteredItems.length - 1 : selectedItemIndex - 1;
      const nextIndex = selectedItemIndex === filteredItems.length - 1 ? 0 : selectedItemIndex + 1;

      const prevItem = filteredItems[prevIndex];
      const nextItem = filteredItems[nextIndex];

      if (prevItem) {
        const imgPrev = new Image();
        imgPrev.src = prevItem.url;
      }
      if (nextItem) {
        const imgNext = new Image();
        imgNext.src = nextItem.url;
      }
    }
  }, [selectedItemIndex, filteredItems]);

  // IntersectionObserver for progressive load as user scrolls
  useEffect(() => {
    if (!loadMoreTrigger) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredItems.length));
        }
      },
      { rootMargin: "250px" } // Load before the user reaches the end
    );
    observer.observe(loadMoreTrigger);
    return () => observer.disconnect();
  }, [loadMoreTrigger, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === "Escape") setSelectedItemIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, filteredItems]);

  const handlePrev = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1;
    });
  };

  const handleNext = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const selectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent-gold mb-4 font-medium block">
            Visual Journal
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-neutral-100 tracking-tight leading-none mb-6">
            The Selected
            <span className="italic text-accent-gold font-normal font-serif"> Works</span>
          </h2>
          <div className="w-12 h-[1px] bg-accent-gold/40 mb-8" />
          <p className="font-sans text-neutral-400 text-xs md:text-sm max-w-lg leading-relaxed font-light">
            A curated anthology of captures showcasing our mastery over geometry, human emotion, and classical light.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 border-b border-neutral-900/60 pb-6">
          {categories.map((category) => (
            <button
              key={category}
              id={`portfolio-filter-${category.toLowerCase()}`}
              onClick={() => setActiveFilter(category)}
              className={`font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 relative py-2 ${
                activeFilter === category
                  ? "text-accent-gold"
                  : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              {category}
              {activeFilter === category && (
                <motion.div
                  layoutId="activeFilterUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Consistent Responsive Grid Layout */}
        <ImagePreloader urls={preloadUrls} fallback={<PortfolioSkeleton />}>
          <motion.div
            layout
            id="portfolio-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            animate={{ opacity: isTransitioning ? 0.3 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.slice(0, visibleCount).map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => setSelectedItemIndex(index)}
                  isPriority={index < 3 && activeFilter === "All"}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </ImagePreloader>

        {/* Load more trigger anchor */}
        {visibleCount < filteredItems.length && (
          <div
            ref={setLoadMoreTrigger}
            className="w-full h-10 mt-6 flex items-center justify-center pointer-events-none"
          />
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItemIndex !== null && selectedItem && (
          <motion.div
            id="portfolio-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/98 backdrop-blur-md flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5 bg-neutral-950/60 backdrop-blur-sm">
              <div className="flex flex-col">
                <span className="font-serif text-lg md:text-xl text-neutral-100">
                  {selectedItem.title}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-accent-gold mt-0.5">
                  {selectedItem.category}
                </span>
              </div>
              <button
                id="lightbox-close"
                onClick={() => setSelectedItemIndex(null)}
                className="p-2 text-neutral-400 hover:text-accent-gold transition-colors hover:bg-neutral-900 border border-neutral-800"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Media Viewer */}
            <div className="flex-1 relative flex items-center justify-center p-4 md:p-12">
              {/* Left Navigation */}
              <button
                id="lightbox-prev"
                onClick={handlePrev}
                className="absolute left-4 md:left-8 z-10 p-3 text-neutral-400 hover:text-accent-gold hover:bg-neutral-900 border border-neutral-800 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image viewer */}
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl h-full max-h-[70vh] flex items-center justify-center relative"
              >
                <OptimizedImage
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full h-full"
                  objectFit="contain"
                  isPriority={true}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </motion.div>

              {/* Right Navigation */}
              <button
                id="lightbox-next"
                onClick={handleNext}
                className="absolute right-4 md:right-8 z-10 p-3 text-neutral-400 hover:text-accent-gold hover:bg-neutral-900 border border-neutral-800 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Info bar */}
            <div className="p-6 border-t border-white/5 text-center bg-neutral-950/60 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full">
              <p className="font-sans text-xs text-neutral-400 font-light max-w-xl text-left">
                {selectedItem.description}
              </p>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500 mt-2 md:mt-0">
                Image {selectedItemIndex + 1} of {filteredItems.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
