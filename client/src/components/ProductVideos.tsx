import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

/**
 * Product Videos Component - RESPONSIVE
 * Design Philosophy: Dark Luxury Cinema
 * - Autoplay muted videos with loop
 * - Scroll-triggered reveals
 * - Hover effects and smooth animations
 * - Mobile-first responsive design
 */

interface Video {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
}

// Sample videos - replace with your actual video URLs
const videos: Video[] = [
  {
    id: 1,
    title: 'كيفية استخدام العطر',
    description: 'تعرف على أفضل طرق استخدام عطور NAZ للحصول على أفضل النتائج',
    videoUrl: 'https://media.w3.org/2016/12/sintel_trailer-720p.mp4',
    thumbnail: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-1-dNCjG2ZyhoUcFCdCnHP9Jj.webp',
  },
  {
    id: 2,
    title: 'رحلة صنع العطر',
    description: 'اكتشف عملية صنع عطور NAZ الفاخرة من البداية إلى النهاية',
    videoUrl: 'https://media.w3.org/2016/12/sintel_trailer-720p.mp4',
    thumbnail: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-2-LCxCwZzmguW5es4tSWVGyv.webp',
  },
  {
    id: 3,
    title: 'شهادات العملاء',
    description: 'استمع إلى تجارب عملائنا الراضين مع عطور NAZ',
    videoUrl: 'https://media.w3.org/2016/12/sintel_trailer-720p.mp4',
    thumbnail: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-featured-product-3-TjbAvkUnWaufjmkg8oq47X.webp',
  },
];

export default function ProductVideos() {
  const [visibleVideos, setVisibleVideos] = useState<number[]>([]);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoId = parseInt(entry.target.getAttribute('data-video-id') || '0');
            setVisibleVideos((prev) => {
              if (!prev.includes(videoId)) {
                return [...prev, videoId];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const videoElements = sectionRef.current?.querySelectorAll('[data-video-id]');
    videoElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black relative" id="videos">
      <div className="container px-3 sm:px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50 mb-3 sm:mb-4 animate-fade-in">
            فيديوهات المنتجات
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-amber-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 animate-fade-in animation-delay-100">
            شاهد فيديوهاتنا الحصرية لتتعرف أكثر على عطور NAZ الفاخرة
          </p>
        </div>

        {/* Videos Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              data-video-id={video.id}
              className={`group transition-all duration-700 transform ${
                visibleVideos.includes(video.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: visibleVideos.includes(video.id)
                  ? `${index * 100}ms`
                  : '0ms',
              }}
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <div className="relative overflow-hidden rounded-lg bg-black border border-amber-900/30 hover:border-amber-500/50 transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:shadow-amber-500/20">
                {/* Video Container */}
                <div className="relative overflow-hidden h-64 sm:h-72 md:h-80 bg-black">
                  <video
                    src={video.videoUrl}
                    poster={video.thumbnail}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-amber-500/50">
                      <Play size={32} className="text-black fill-black ml-1" />
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>

                {/* Video Info */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-end">
                  <h3 className="text-lg sm:text-xl font-bold text-amber-50 mb-2 group-hover:text-amber-300 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-amber-200 text-xs sm:text-sm line-clamp-2">
                    {video.description}
                  </p>

                  {/* Watch Button */}
                  <button className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base transform">
                    شاهد الآن
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Videos CTA */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <p className="text-amber-200 text-sm sm:text-base mb-4">
            هل لديك فيديو تود مشاركته معنا؟
          </p>
          <button className="px-6 sm:px-8 py-2 sm:py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base transform">
            أرسل فيديوك
          </button>
        </div>
      </div>
    </section>
  );
}
