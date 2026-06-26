import { useState, useEffect, useRef } from 'react';

/**
 * Brand Story Section
 * Design Philosophy: Dark Luxury Cinema
 * - Scroll-triggered animations
 * - Asymmetric layout alternating left/right
 * - Counter animation for success metrics
 */

export default function BrandStory() {
  const [counters, setCounters] = useState({ customers: 0, sales: 0, years: 0 });
  const counterRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const targets = { customers: 15000, sales: 50000, years: 8 };
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        customers: Math.floor(targets.customers * progress),
        sales: Math.floor(targets.sales * progress),
        years: Math.floor(targets.years * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(targets);
      }
    }, stepDuration);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-amber-950/5">
      <div className="container px-4 md:px-6">
        {/* Story Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-50 mb-6">
              قصتنا
            </h2>
            <div className="w-16 h-1 bg-amber-500 mb-6"></div>
            <p className="text-amber-200 text-lg leading-relaxed mb-4">
              بدأت رحلة NAZ Parfume من شغف عميق بفن العطور الشرقية الأصيلة. نحن نؤمن أن كل زجاجة عطر تحكي قصة، وكل رائحة تنقل ذكرى.
            </p>
            <p className="text-amber-200 text-lg leading-relaxed">
              مع مرور السنوات، أصبحنا رمزاً للفخامة والأصالة، حيث يختار ملايين العملاء عطورنا ليعبروا عن شخصيتهم وذوقهم الرفيع.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-hero-perfume-LDV4zRsQSgozDMhjzxFddF.webp"
                alt="Brand Story"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Story Section 2 - Centered */}
        <div className="text-center mb-20 py-12 border-y border-amber-900/30">
          <h3 className="text-3xl md:text-4xl font-bold text-amber-50 mb-6">
            التزامنا بالجودة
          </h3>
          <p className="text-amber-200 text-lg max-w-3xl mx-auto leading-relaxed">
            كل عطر من عطورنا يتم اختياره بعناية فائقة من أفضل المكونات الطبيعية. نستخدم تقنيات تقليدية مع لمسة عصرية لضمان تجربة عطرية لا تُنسى.
          </p>
        </div>

        {/* Success Metrics */}
        <div
          ref={counterRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12"
        >
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-amber-400 mb-4">
              {counters.customers.toLocaleString()}+
            </div>
            <p className="text-amber-200 text-lg">عميل راضٍ</p>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-amber-400 mb-4">
              {counters.sales.toLocaleString()}+
            </div>
            <p className="text-amber-200 text-lg">عملية بيع</p>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-amber-400 mb-4">
              {counters.years}
            </div>
            <p className="text-amber-200 text-lg">سنوات من الخبرة</p>
          </div>
        </div>
      </div>
    </section>
  );
}
