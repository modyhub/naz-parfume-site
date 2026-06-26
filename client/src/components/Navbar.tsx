import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';
import { useNavigation, type NavItem } from '@/hooks/useNavigation';

/**
 * Navbar Component - RESPONSIVE
 * Design Philosophy: Dark Luxury Cinema
 * - Sticky on scroll with background transition
 * - RTL layout with logo on right, nav links in center, icons on left
 * - Gold accents and smooth transitions
 * - Mobile-first responsive design
 * - Integrated with Cart Context
 * - Full navigation functionality with active link highlighting
 */

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const [location, navigate] = useLocation();
  const { activeLink, handleNavigation, scrollToTop } = useNavigation();
  const cartCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavItem[] = [
    { id: 'hero', label: 'الرئيسية', href: '/', isSection: false },
    { id: 'products', label: 'العطورات', href: '/products', isSection: false },
    { id: 'story', label: 'قصتنا', href: '/#story', isSection: true },
    { id: 'faq', label: 'أسئلة وأجوبة', href: '/#faq', isSection: true },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.isSection && location === '/') {
      // Scroll to section on same page
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (!item.isSection) {
      // Navigate to different page
      navigate(item.href);
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  // Determine active link
  const isActiveLink = (item: NavItem) => {
    if (location === '/' && item.isSection) {
      return activeLink === item.id;
    }
    if (!item.isSection && location === item.href) {
      return true;
    }
    return false;
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-amber-900/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20 px-3 md:px-6">
        {/* Logo - Right Side */}
        <div
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            navigate('/');
            setTimeout(() => scrollToTop(), 100);
          }}
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-logo-YhTymyjhjGuW7ZWEe7unWC.webp"
            alt="NAZ Logo"
            className="h-8 w-8 md:h-10 md:w-10"
          />
          <span className="text-lg md:text-xl font-bold text-amber-100 hidden sm:inline">NAZ</span>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link)}
              className={`relative text-sm font-medium transition-all duration-300 pb-1 ${
                isActiveLink(link)
                  ? 'text-amber-300'
                  : 'text-amber-50 hover:text-amber-300'
              }`}
            >
              {link.label}
              {/* Active indicator */}
              {isActiveLink(link) && (
                <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-amber-500 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Icons - Left Side */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          {/* Shopping Cart */}
          <div className="relative">
            <button
              onClick={() => {
                navigate('/cart');
                setTimeout(() => scrollToTop(), 100);
              }}
              className="p-2 hover:text-amber-300 transition-colors group"
              title="سلة التسوق"
            >
              <ShoppingCart
                size={18}
                className="md:w-5 md:h-5 text-amber-50 group-hover:scale-110 transition-transform"
              />
            </button>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-amber-50" />
            ) : (
              <Menu size={20} className="text-amber-50" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-amber-900/30 py-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="container px-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`text-sm text-right py-2 border-b border-amber-900/20 transition-colors duration-300 ${
                  isActiveLink(link)
                    ? 'text-amber-300 font-semibold'
                    : 'text-amber-50 hover:text-amber-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
