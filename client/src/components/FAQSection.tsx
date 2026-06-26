import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/**
 * FAQ Section Component - RESPONSIVE
 * Design Philosophy: Dark Luxury Cinema
 * - Accordion-style Q&A
 * - Gold highlights on active items
 * - Smooth transitions
 * - Mobile-first responsive design
 */

const faqs = [
  {
    id: '1',
    question: 'ما هي مدة ثبات العطر؟',
    answer:
      'عطورنا الفاخرة مصممة للثبات طويل الأمد، حيث تدوم رائحتها من 8 إلى 12 ساعة على الجلد. يعتمد ذلك على نوع البشرة وظروف الطقس.',
  },
  {
    id: '2',
    question: 'هل تحتوي العطور على مكونات طبيعية؟',
    answer:
      'نعم، جميع عطورنا تحتوي على مكونات طبيعية عالية الجودة من أفضل المصادر العالمية. نستخدم الزيوت الأساسية النقية والمستخلصات الطبيعية.',
  },
  {
    id: '3',
    question: 'ما هي سياسة الاسترجاع والتبديل؟',
    answer:
      'نقدم ضمان 30 يوماً على جميع المشتريات. إذا لم تكن راضياً عن المنتج، يمكنك استرجاعه أو تبديله دون أي مشاكل.',
  },
  {
    id: '4',
    question: 'كم تستغرق عملية التوصيل؟',
    answer:
      'نوفر خدمة التوصيل السريع في جميع أنحاء المملكة. التوصيل عادة ما يستغرق من 2 إلى 5 أيام عمل حسب موقعك.',
  },
  {
    id: '5',
    question: 'هل هناك عينات مجانية متاحة؟',
    answer:
      'نعم، نقدم عينات صغيرة مجانية مع كل طلب. يمكنك أيضاً طلب عينات محددة عند الشراء.',
  },
  {
    id: '6',
    question: 'كيف أختار العطر المناسب لي؟',
    answer:
      'يمكنك استشارة فريقنا المتخصص عبر الواتس أو البريد الإلكتروني. سنساعدك في اختيار العطر الذي يناسب شخصيتك وذوقك.',
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 bg-black relative">
      {/* Decorative top divider */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>

      <div className="container px-3 sm:px-4 md:px-6">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50 mb-3 sm:mb-4">
            أسئلة وأجوبة
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-amber-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            إجابات على أكثر الأسئلة شيوعاً حول منتجاتنا وخدماتنا
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto px-2 sm:px-0">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b border-amber-900/30 mb-1 sm:mb-2 last:border-b-0"
              >
                <AccordionTrigger className="hover:text-amber-400 transition-colors py-3 sm:py-4 text-right">
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-amber-50">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-amber-200 text-xs sm:text-sm md:text-base leading-relaxed pb-3 sm:pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Decorative bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
    </section>
  );
}
