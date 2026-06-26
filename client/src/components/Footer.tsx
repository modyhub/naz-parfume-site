import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

/**
 * Footer Component - RESPONSIVE
 * Design Philosophy: Dark Luxury Cinema
 * - Four-column layout on desktop, stacked on mobile
 * - Social icons with hover glow
 * - Newsletter subscription
 * - Floating WhatsApp button
 * - Mobile-first responsive design
 */

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/966501234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 z-40 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
        title="تواصل معنا عبر الواتس"
      >
        <MessageCircle size={20} className="sm:w-6 sm:h-6" />
      </a>

      <footer className="bg-black border-t border-amber-900/30 pt-12 sm:pt-16 pb-8">
        <div className="container px-3 sm:px-4 md:px-6">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-logo-YhTymyjhjGuW7ZWEe7unWC.webp"
                  alt="NAZ Logo"
                  className="h-8 w-8"
                />
                <span className="text-lg sm:text-xl font-bold text-amber-100">NAZ</span>
              </div>
              <p className="text-amber-200 text-xs sm:text-sm mb-6">
                حيث تلتقي الفخامة بالأصالة. عطور فاخرة مستوحاة من تراث العود العريق.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="#"
                  className="p-2 bg-amber-900/30 hover:bg-amber-500 text-amber-300 hover:text-black rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Facebook size={16} className="sm:w-4.5 sm:h-4.5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-amber-900/30 hover:bg-amber-500 text-amber-300 hover:text-black rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={16} className="sm:w-4.5 sm:h-4.5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-amber-900/30 hover:bg-amber-500 text-amber-300 hover:text-black rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Twitter size={16} className="sm:w-4.5 sm:h-4.5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-amber-50 mb-4 sm:mb-6">روابط سريعة</h4>
              <ul className="space-y-2 sm:space-y-3">
                {['الرئيسية', 'العطورات', 'عن الشركة', 'المدونة'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-amber-200 hover:text-amber-400 transition-colors text-xs sm:text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-amber-50 mb-4 sm:mb-6">السياسات</h4>
              <ul className="space-y-2 sm:space-y-3">
                {['سياسة الشحن', 'سياسة الاسترجاع', 'شروط الاستخدام', 'سياسة الخصوصية'].map((policy) => (
                  <li key={policy}>
                    <a
                      href="#"
                      className="text-amber-200 hover:text-amber-400 transition-colors text-xs sm:text-sm"
                    >
                      {policy}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-amber-50 mb-4 sm:mb-6">النشرة البريدية</h4>
              <p className="text-amber-200 text-xs sm:text-sm mb-4">
                اشترك للحصول على أحدث العروض والمنتجات الجديدة
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2 sm:space-y-3">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-amber-900/20 border border-amber-900/50 rounded-lg px-3 sm:px-4 py-2 text-amber-50 placeholder-amber-400/50 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 text-sm"
                >
                  اشترك
                </button>
              </form>
              {subscribed && (
                <p className="text-amber-400 text-xs sm:text-sm mt-2">شكراً لاشتراكك!</p>
              )}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border-t border-amber-900/30 pt-6 sm:pt-8 mb-6 sm:mb-8">
            <p className="text-amber-200 text-xs sm:text-sm mb-4 text-center">
              طرق الدفع المقبولة:
            </p>
            <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
              {['Visa', 'Mastercard', 'Apple Pay', 'Mada'].map((method) => (
                <div
                  key={method}
                  className="px-3 sm:px-4 py-2 bg-amber-900/20 border border-amber-900/50 rounded-lg text-amber-300 text-xs sm:text-sm"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-amber-900/30 pt-6 sm:pt-8 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-amber-400 mt-1 flex-shrink-0 sm:w-5 sm:h-5" />
                <div>
                  <p className="text-amber-200 text-xs sm:text-sm font-semibold">الهاتف</p>
                  <p className="text-amber-300 text-xs sm:text-sm">+966 50 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-amber-400 mt-1 flex-shrink-0 sm:w-5 sm:h-5" />
                <div>
                  <p className="text-amber-200 text-xs sm:text-sm font-semibold">البريد</p>
                  <p className="text-amber-300 text-xs sm:text-sm">info@nazparfume.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-400 mt-1 flex-shrink-0 sm:w-5 sm:h-5" />
                <div>
                  <p className="text-amber-200 text-xs sm:text-sm font-semibold">العنوان</p>
                  <p className="text-amber-300 text-xs sm:text-sm">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-amber-900/30 pt-6 sm:pt-8 text-center">
            <p className="text-amber-300 text-xs sm:text-sm">
              جميع الحقوق محفوظة © 2025 NAZ Parfume. صُنع بـ ❤️
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
