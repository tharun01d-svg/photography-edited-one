import React, { useState, useEffect } from "react";

interface ImagePreloaderProps {
  urls: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * ImagePreloader ensures that a set of critical images are fully loaded
 * in the browser cache before their corresponding components are displayed.
 * This prevents layout shifts and provides a polished, smooth loading transition.
 */
export default function ImagePreloader({ urls, children, fallback }: ImagePreloaderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!urls || urls.length === 0) {
      setIsReady(true);
      return;
    }

    let active = true;
    let loadedCount = 0;
    const total = urls.length;

    // Fast-fail safe guard in case images take unusually long to load
    const timeoutId = setTimeout(() => {
      if (active) {
        setIsReady(true);
      }
    }, 4000); // 4-second hard limit to protect UX

    const checkComplete = () => {
      if (!active) return;
      loadedCount++;
      if (loadedCount >= total) {
        clearTimeout(timeoutId);
        setIsReady(true);
      }
    };

    urls.forEach((url) => {
      if (!url) {
        checkComplete();
        return;
      }
      
      const img = new Image();
      
      // Setup load and error listeners
      img.onload = () => {
        checkComplete();
      };
      
      img.onerror = () => {
        // Continue progressive disclosure even if an image fails to load
        checkComplete();
      };
      
      img.src = url;
    });

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [urls]);

  if (!isReady && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
