import { useState, useEffect, useMemo, useRef } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string; // e.g. "aspect-[3/2]" or "aspect-[3/4]"
  sizes?: string;
  isPriority?: boolean; // If true, does not lazy load
  fetchPriority?: "high" | "low" | "auto";
  objectFit?: "cover" | "contain";
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  aspectRatioClass = "",
  sizes = "100vw",
  isPriority = false,
  fetchPriority = "auto",
  objectFit = "cover"
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Sync internal src state with prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setRetryCount(0);
    setIsLoaded(false);
  }, [src]);

  // Check if image is already cached/fully loaded in browser on mount or source change
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [currentSrc]);

  // Unsplash image optimizer helpers
  const isUnsplash = useMemo(() => {
    return currentSrc && currentSrc.includes("images.unsplash.com");
  }, [currentSrc]);

  const getUnsplashUrl = (url: string, width?: number, format = "webp") => {
    if (!url || !url.includes("images.unsplash.com")) return url;
    
    // Split the base URL and query parameters
    const [baseUrl] = url.split("?");
    const params = new URLSearchParams();
    params.set("auto", "format");
    params.set("fit", "crop");
    params.set("q", "80");
    params.set("fm", format);
    if (width) {
      params.set("w", width.toString());
    } else {
      params.set("w", "1200");
    }
    
    return `${baseUrl}?${params.toString()}`;
  };

  const avifSrcSet = useMemo(() => {
    if (!isUnsplash) return undefined;
    const widths = [400, 800, 1200, 1600, 2000];
    return widths.map((w) => `${getUnsplashUrl(currentSrc, w, "avif")} ${w}w`).join(", ");
  }, [currentSrc, isUnsplash]);

  const webpSrcSet = useMemo(() => {
    if (!isUnsplash) return undefined;
    const widths = [400, 800, 1200, 1600, 2000];
    return widths.map((w) => `${getUnsplashUrl(currentSrc, w, "webp")} ${w}w`).join(", ");
  }, [currentSrc, isUnsplash]);

  const fallbackSrc = useMemo(() => {
    if (isUnsplash) {
      return getUnsplashUrl(currentSrc, 1200, "jpg");
    }
    return currentSrc;
  }, [currentSrc, isUnsplash]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    if (retryCount < 1) {
      setRetryCount((prev) => prev + 1);
      // Append cache-busting parameter to force re-fetch on retry
      const sep = currentSrc.includes("?") ? "&" : "?";
      setCurrentSrc((prev) => `${prev}${sep}retry=${Date.now()}`);
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-neutral-900/60 ${aspectRatioClass} ${className}`}
      style={{ isolation: "isolate" }}
    >
      {/* Blurred preview / active spinning preloader overlay */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-950">
          <div className="relative flex items-center justify-center">
            {/* Spinning camera lens loading ring */}
            <div className="w-12 h-12 rounded-full border border-neutral-900 border-t-accent-gold/90 animate-spin" />
            
            {/* Innermost static branding container */}
            <div className="absolute w-8 h-8 rounded-full flex items-center justify-center bg-neutral-900/60 border border-neutral-800">
              <span className="text-[8px] font-sans text-accent-gold/80 font-bold tracking-wider">C24</span>
            </div>
          </div>
          
          <span className="text-[8px] font-sans text-neutral-500 uppercase tracking-[0.25em] mt-3 animate-pulse">
            Loading Lens...
          </span>
          <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900/20 to-neutral-950/60 blur-md opacity-40 pointer-events-none" />
        </div>
      )}

      {/* Clean Error Fallback Placeholder */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 text-neutral-500 p-4 border border-neutral-900">
          <svg
            className="w-8 h-8 text-neutral-600 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-[10px] uppercase tracking-widest font-sans text-neutral-500">Image Unavailable</span>
        </div>
      ) : (
        <picture className="w-full h-full">
          {isUnsplash && (
            <>
              <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
              <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
            </>
          )}
          <img
            ref={imgRef}
            src={fallbackSrc}
            alt={alt}
            loading={isPriority ? "eager" : "lazy"}
            {...({ fetchPriority } as any)}
            decoding={isPriority ? "sync" : "async"}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full transition-all duration-700 ease-out ${
              objectFit === "cover" ? "object-cover" : "object-contain"
            } ${isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"}`}
            referrerPolicy="no-referrer"
          />
        </picture>
      )}
    </div>
  );
}
