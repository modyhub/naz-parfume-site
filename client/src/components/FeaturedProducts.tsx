import { useState, useEffect, useRef } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Featured Products Section - RESPONSIVE
 * Design Philosophy: Dark Luxury Cinema
 * - Grid layout with scroll-triggered reveals
 * - Product cards with ratings and pricing
 * - Asymmetric layout with staggered animation
 * - Mobile-first responsive design
 */

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Éclat Luxe',
    category: 'عطر الود الفاخر',
    price: '450 ريال',
    rating: 4.8,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-1-dNCjG2ZyhoUcFCdCnHP9Jj.webp',
  },
  {
    id: 2,
    name: 'Royal Oud Elixir',
    category: 'عطر ملكي',
    price: '520 ريال',
    rating: 4.9,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-2-LCxCwZzmguW5es4tSWVGyv.webp',
  },
  {
    id: 3,
    name: 'Éclat Royal',
    category: 'عطر ملكي',
    price: '480 ريال',
    rating: 4.7,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-3-TjbAvkUnWaufjmkg8oq47X.webp',
  },
];

export default function FeaturedProducts() {
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const productId = parseInt(entry.target.getAttribute('data-product-id') || '0');
            setVisibleProducts((prev) => {
              if (!prev.includes(productId)) {
                return [...prev, productId];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const productElements = sectionRef.current?.querySelectorAll('[data-product-id]');
    productElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" className="py-20 bg-black relative">
      {/* Decorative top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>

      <div className="container px-3 sm:px-4 md:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50 mb-3 sm:mb-4">
            العطور المميزة
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-amber-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            اختر من مجموعتنا الحصرية من أفضل العطور الفاخرة
          </p>
        </div>

        {/* Products Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              data-product-id={product.id}
              className={`group transition-all duration-700 transform ${
                visibleProducts.includes(product.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: visibleProducts.includes(product.id)
                  ? `${index * 100}ms`
                  : '0ms',
              }}
            >
              <div className="bg-gradient-to-b from-amber-900/10 to-black border border-amber-900/30 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300">
                {/* Product Image */}
                <div className="relative overflow-hidden h-64 sm:h-72 md:h-80 bg-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-6">
                  <p className="text-amber-400 text-xs sm:text-sm font-semibold mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-amber-50 mb-4">
                    {product.name}
                  </h3>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-bold text-amber-400">
                      {product.price}
                    </span>
                    <button className="p-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg transition-all duration-300 hover:scale-110 active:scale-95">
                      <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <a href="/products">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 sm:px-12 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-97 text-sm sm:text-base"
            >
              عرض المزيد
            </Button>
          </a>
        </div>
      </div>

      {/* Decorative bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
    </section>
  );
}
