import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Discount Banner Component - RESPONSIVE
 * Design Philosophy: Dark Luxury Cinema
 * - Eye-catching promotional section
 * - Copy-to-clipboard functionality
 * - Animated background elements
 * - Mobile-first responsive design
 */

export default function DiscountBanner() {
  const [copied, setCopied] = useState(false);
  const discountCode = 'NAZ2025';

  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-amber-900/20 via-black to-amber-900/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="container px-3 sm:px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50 mb-3 sm:mb-4">
            عرض حصري
          </h2>
          <p className="text-amber-200 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-2">
            احصل على خصم خاص على جميع منتجاتنا الفاخرة
          </p>

          {/* Discount Code Box */}
          <div className="bg-black/50 border-2 border-amber-500 rounded-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 backdrop-blur-sm">
            <p className="text-amber-300 text-xs sm:text-sm mb-3 sm:mb-4 font-semibold">
              استخدم الكود الحصري:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <code className="text-3xl sm:text-4xl font-bold text-amber-400 tracking-widest">
                {discountCode}
              </code>
              <button
                onClick={handleCopy}
                className="p-2 sm:p-3 bg-amber-500 hover:bg-amber-600 text-black rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
                title="نسخ الكود"
              >
                {copied ? (
                  <Check size={20} className="sm:w-6 sm:h-6" />
                ) : (
                  <Copy size={20} className="sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
            <p className="text-amber-200 text-xs sm:text-sm">
              {copied ? 'تم نسخ الكود!' : 'انقر لنسخ الكود'}
            </p>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 sm:px-12 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-97 text-sm sm:text-base"
          >
            استفد من العرض الآن
          </Button>

          <p className="text-amber-300 text-xs sm:text-sm mt-4 sm:mt-6">
            العرض محدود لفترة زمنية معينة فقط
          </p>
        </div>
      </div>
    </section>
  );
}
