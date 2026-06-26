import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import ScrollytellingStory from '@/components/ScrollytellingStory';
import DiscountBanner from '@/components/DiscountBanner';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

/**
 * Home Page - NAZ Parfume
 * Design Philosophy: Dark Luxury Cinema
 * 
 * Page Structure:
 * 1. Navbar - Sticky navigation with scroll detection
 * 2. Hero Section - Full-screen video background with CTA
 * 3. Featured Products - Grid of best-selling products
 * 4. Brand Story - Company narrative with scroll animations
 * 5. Discount Banner - Promotional code section
 * 6. FAQ Section - Accordion with common questions
 * 7. Footer - Multi-column layout with contact info
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-amber-50">
      <Navbar />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="featured-products">
        <FeaturedProducts />
      </div>
      <div id="story">
        <ScrollytellingStory />
      </div>
      <div id="discount">
        <DiscountBanner />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
