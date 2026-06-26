import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

/**
 * useNavigation Hook
 * Handles smooth scrolling to sections and active link detection
 */

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isSection?: boolean; // If true, scroll to section on same page
}

export const useNavigation = () => {
  const [location, navigate] = useLocation();
  const [activeLink, setActiveLink] = useState<string>('');

  // Smooth scroll to element
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Handle navigation
  const handleNavigation = (item: NavItem) => {
    if (item.isSection) {
      // Scroll to section on same page
      scrollToElement(item.id);
      setActiveLink(item.id);
    } else {
      // Navigate to different page
      navigate(item.href);
      // Scroll to top after navigation
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  };

  // Detect active link based on current page and scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Check if on home page
      if (location === '/') {
        const sections = [
          'hero',
          'featured-products',
          'story',
          'discount',
          'faq',
          'footer',
        ];

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If section is in viewport
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
              setActiveLink(sectionId);
              break;
            }
          }
        }
      } else if (location === '/products') {
        setActiveLink('products');
      } else if (location === '/cart') {
        setActiveLink('cart');
      } else {
        setActiveLink('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return {
    activeLink,
    handleNavigation,
    scrollToElement,
    scrollToTop,
  };
};
