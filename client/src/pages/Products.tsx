import { useState, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import ProductVideos from '@/components/ProductVideos';
import { toast } from 'sonner';

/**
 * Products Page - RESPONSIVE with Gender Filter & Cart
 * Design Philosophy: Dark Luxury Cinema
 * - Full product catalog with grid layout
 * - Gender filter (Women/Men)
 * - Scroll-triggered reveals
 * - Mobile-first responsive design
 * - Integrated cart with Local Storage
 * - Turkish Lira (₺) currency
 */

type Gender = 'women' | 'men' | 'all';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number; // Changed to number for calculations
  image: string;
  description: string;
  gender: 'women' | 'men';
}

const products: Product[] = [
  // Women's Perfumes
  {
    id: 1,
    name: 'Éclat Luxe',
    category: 'عطر الود الفاخر',
    price: 1350,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-1-dNCjG2ZyhoUcFCdCnHP9Jj.webp',
    description: 'عطر فاخر يجمع بين رائحة العود الأصيل والمسك الدافئ',
    gender: 'women',
  },
  {
    id: 2,
    name: 'Pearl Musk',
    category: 'عطر المسك',
    price: 1320,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-1-dNCjG2ZyhoUcFCdCnHP9Jj.webp',
    description: 'مسك لؤلؤي ناعم يترك انطباعاً دائماً وفاخراً',
    gender: 'women',
  },
  {
    id: 3,
    name: 'Golden Essence',
    category: 'عطر ذهبي',
    price: 1530,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-2-LCxCwZzmguW5es4tSWVGyv.webp',
    description: 'جوهر ذهبي نقي يعطيك شعوراً بالملكية والفخامة',
    gender: 'women',
  },
  {
    id: 4,
    name: 'Amber Dreams',
    category: 'عطر العنبر',
    price: 1410,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-3-TjbAvkUnWaufjmkg8oq47X.webp',
    description: 'أحلام العنبر تتحقق في كل رشة من هذا العطر الساحر',
    gender: 'women',
  },
  {
    id: 5,
    name: 'Velvet Touch',
    category: 'عطر مخملي',
    price: 1380,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-3-TjbAvkUnWaufjmkg8oq47X.webp',
    description: 'لمسة مخملية ناعمة تعطيك شعوراً بالراحة والفخامة',
    gender: 'women',
  },

  // Men's Perfumes
  {
    id: 6,
    name: 'Royal Oud Elixir',
    category: 'عطر ملكي',
    price: 1560,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-2-LCxCwZzmguW5es4tSWVGyv.webp',
    description: 'خليط ملكي من أندر مكونات العود مع لمسات من الزعفران',
    gender: 'men',
  },
  {
    id: 7,
    name: 'Éclat Royal',
    category: 'عطر ملكي',
    price: 1440,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-3-TjbAvkUnWaufjmkg8oq47X.webp',
    description: 'تركيبة ملكية تعكس الفخامة والأناقة في كل رشة',
    gender: 'men',
  },
  {
    id: 8,
    name: 'Midnight Oud',
    category: 'عطر الليل',
    price: 1470,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-1-dNCjG2ZyhoUcFCdCnHP9Jj.webp',
    description: 'عطر ليلي غامض يجمع بين العود والعنبر الفاخر',
    gender: 'men',
  },
  {
    id: 9,
    name: 'Saffron Nights',
    category: 'عطر الزعفران',
    price: 1590,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-2-LCxCwZzmguW5es4tSWVGyv.webp',
    description: 'ليالي الزعفران الذهبية تجتمع في عطر واحد فاخر',
    gender: 'men',
  },
];

export default function Products() {
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const [selectedGender, setSelectedGender] = useState<Gender>('all');
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const { addToCart } = useCart();
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((product) => {
    if (selectedGender === 'all') return true;
    return product.gender === selectedGender;
  });

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
  }, [filteredProducts]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    // Show animation feedback
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 600);

    // Show toast notification
    toast.success(`${product.name} سُضيف إلى السلة`, {
      description: `₺${product.price.toLocaleString('tr-TR')}`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-24 pb-12">
        {/* Header */}
        <div className="container px-3 sm:px-4 md:px-6 mb-8 sm:mb-12 md:mb-16">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50 mb-3 sm:mb-4 animate-fade-in">
              مجموعة العطور الفاخرة
            </h1>
            <div className="w-12 sm:w-16 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-amber-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 animate-fade-in animation-delay-100">
              اكتشف مجموعتنا الكاملة من أفضل العطور الفاخرة المستوحاة من تراث العود العريق
            </p>
          </div>

          {/* Gender Filter */}
          <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap animate-fade-in animation-delay-200">
            <button
              onClick={() => setSelectedGender('all')}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base transform hover:scale-105 active:scale-95 ${
                selectedGender === 'all'
                  ? 'bg-amber-500 text-black scale-105 shadow-lg shadow-amber-500/50'
                  : 'bg-amber-900/30 text-amber-200 hover:bg-amber-900/50'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setSelectedGender('women')}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base transform hover:scale-105 active:scale-95 ${
                selectedGender === 'women'
                  ? 'bg-amber-500 text-black scale-105 shadow-lg shadow-amber-500/50'
                  : 'bg-amber-900/30 text-amber-200 hover:bg-amber-900/50'
              }`}
            >
              عطور نسائية
            </button>
            <button
              onClick={() => setSelectedGender('men')}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base transform hover:scale-105 active:scale-95 ${
                selectedGender === 'men'
                  ? 'bg-amber-500 text-black scale-105 shadow-lg shadow-amber-500/50'
                  : 'bg-amber-900/30 text-amber-200 hover:bg-amber-900/50'
              }`}
            >
              عطور رجالية
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container px-3 sm:px-4 md:px-6">
          {filteredProducts.length > 0 ? (
            <div
              ref={sectionRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {filteredProducts.map((product, index) => (
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
                  <div className="bg-gradient-to-b from-amber-900/10 to-black border border-amber-900/30 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:shadow-amber-500/20">
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
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <p className="text-amber-400 text-xs sm:text-sm font-semibold mb-2">
                        {product.category}
                      </p>
                      <h3 className="text-lg sm:text-xl font-bold text-amber-50 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-amber-200 text-xs sm:text-sm mb-4 flex-1">
                        {product.description}
                      </p>

                      {/* Price and Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-amber-900/30">
                        <span className="text-xl sm:text-2xl font-bold text-amber-400">
                          ₺{product.price.toLocaleString('tr-TR')}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`p-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 transform ${
                            addedToCart === product.id
                              ? 'scale-95 bg-green-500'
                              : ''
                          }`}
                        >
                          <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-amber-200 text-lg">لا توجد منتجات في هذه الفئة</p>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="container px-3 sm:px-4 md:px-6 mt-12 sm:mt-16 text-center">
          <a href="/">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 sm:px-12 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-97 text-sm sm:text-base transform"
            >
              العودة للرئيسية
            </Button>
          </a>
        </div>
      </div>

      {/* Product Videos Section */}
      <ProductVideos />
    </div>
  );
}
