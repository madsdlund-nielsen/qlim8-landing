import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileScreenshotCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  className?: string;
}

export function MobileScreenshotCarousel({ images, className = "" }: MobileScreenshotCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  
  const itemWidth = 280;
  const gap = 16;
  const slideWidth = itemWidth + gap;
  const totalSlides = images.length;

  // Measure container width on mount and resize
  useEffect(() => {
    const measureWidth = () => {
      if (wrapperRef.current) {
        setContainerWidth(wrapperRef.current.offsetWidth);
      }
    };
    
    // Measure after a small delay to ensure DOM is ready
    setTimeout(measureWidth, 0);
    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, []);

  // Infinite scroll animation
  const animateToIndex = useCallback((index: number, duration: number = 0.5) => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    
    const targetX = -index * slideWidth;
    animationRef.current = animate(x, targetX, {
      duration,
      ease: "easeOut",
    });
  }, [x, slideWidth]);

  // Auto-scroll logic
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearTimeout(autoScrollRef.current);
    
    autoScrollRef.current = setTimeout(() => {
      if (!isDragging) {
        const nextIndex = (currentIndex + 1) % totalSlides;
        setCurrentIndex(nextIndex);
        animateToIndex(nextIndex, 1);
        startAutoScroll();
      }
    }, 4000);
  }, [currentIndex, totalSlides, isDragging, animateToIndex]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) clearTimeout(autoScrollRef.current);
    };
  }, [startAutoScroll]);

  // Handle drag
  const handleDragStart = () => {
    setIsDragging(true);
    if (autoScrollRef.current) clearTimeout(autoScrollRef.current);
    if (animationRef.current) animationRef.current.stop();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const currentX = x.get();
    const offsetFromCenter = Math.abs(currentX) % slideWidth;
    
    let newIndex = Math.round(Math.abs(currentX) / slideWidth);
    
    if (offsetFromCenter > slideWidth / 2) {
      newIndex = Math.ceil(Math.abs(currentX) / slideWidth);
    } else {
      newIndex = Math.floor(Math.abs(currentX) / slideWidth);
    }
    
    newIndex = Math.max(0, Math.min(newIndex, totalSlides - 1));
    
    setCurrentIndex(newIndex);
    animateToIndex(newIndex, 0.5);
    startAutoScroll();
  };

  // Navigation buttons
  const goToSlide = useCallback((direction: 'prev' | 'next') => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % totalSlides;
    } else {
      newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    }
    
    setCurrentIndex(newIndex);
    animateToIndex(newIndex, 0.5);
    startAutoScroll();
  }, [currentIndex, totalSlides, animateToIndex, startAutoScroll]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    animateToIndex(index, 0.5);
    startAutoScroll();
  };

  return (
    <div 
      ref={wrapperRef}
      className={`w-full ${className}`}
      role="region" 
      aria-label="App screenshots carousel"
    >
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <motion.div
          ref={containerRef}
          className="flex touch-pan-y"
          style={{ x }}
          drag="x"
          dragElastic={0.2}
          dragMomentum={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          initial={{ x: 0 }}
        >
          {images.map((image, index) => (
            <div
              key={`carousel-item-${index}`}
              className="flex-shrink-0 select-none"
              style={{ width: Math.min(itemWidth, containerWidth - 32), marginRight: gap }}
            >
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  draggable={false}
                  loading="eager"
                />
              </div>
              {image.title && (
                <p className="text-center text-sm text-gray-600 mt-2 font-medium">
                  {image.title}
                </p>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Controls */}
      {totalSlides > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          {/* Prev Button */}
          <button
            onClick={() => goToSlide('prev')}
            className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Previous screenshot"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                  index === currentIndex ? "bg-emerald-500" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
                data-testid={`button-carousel-dot-${index}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => goToSlide('next')}
            className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Next screenshot"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}

      {/* Hint Text */}
      <p className="text-center text-xs text-gray-400 mt-3">
        Swipe or use arrows to navigate
      </p>
    </div>
  );
}
