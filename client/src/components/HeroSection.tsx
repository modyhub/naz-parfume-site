import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Hero Section Component - RESPONSIVE
 * Design Philosophy: Dark Luxury Cinema
 * - Full-screen video background with overlay
 * - Centered text with luxury positioning
 * - Scroll-triggered fade animation
 * - Mobile-first responsive design
 */

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden pt-16 md:pt-20">
      {/* Background Image (Video placeholder) */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-hero-perfume-LDV4zRsQSgozDMhjzxFddF.webp"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div
        className={`relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-amber-50 mb-4 sm:mb-6 leading-tight">
          NAZ Parfume
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-amber-100 mb-6 sm:mb-8 max-w-2xl font-light">
          حيث تلتقي الفخامة بالأصالة
        </p>
        <p className="text-sm sm:text-base md:text-lg text-amber-200 mb-8 sm:mb-12 max-w-xl px-2">
          اكتشف عالم العطور الفاخرة المستوحاة من تراث العود العريق
        </p>

        <Button
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-97 text-sm sm:text-base"
        >
          تسوّق الآن
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-amber-300 text-center">
          <p className="text-xs sm:text-sm mb-2">اسحب للأسفل</p>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
