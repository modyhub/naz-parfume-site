import { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Scrollytelling Story Component - IMPROVED MOBILE UX
 * Design Philosophy: Dark Luxury Cinema - Interactive Narrative
 * 
 * 5 Scenes with optimized mobile experience:
 * 0. Entry (0-20%) - Golden particles forming
 * 1. Birth (20-40%) - Bottle SVG drawing and filling
 * 2. Identity (40-60%) - Bottle with world map and ingredients
 * 3. Success (60-80%) - Statistics flying in
 * 4. Finale (80-100%) - Logo and CTA
 * 
 * Mobile: Vertical stacked layout with better spacing and larger text
 * Desktop: Horizontal layout with side-by-side arrangement
 */

interface Scene {
  id: number;
  title: string;
  year?: string;
  icon?: string;
  textLines: string[];
}

const scenes: Scene[] = [
  {
    id: 0,
    title: 'الدخول',
    textLines: ['بدأت من شغف...'],
  },
  {
    id: 1,
    title: 'الولادة',
    year: '٢٠١٩',
    icon: '◇',
    textLines: [
      'وُلد NAZ Parfume من شغف',
      'عميق بفن العطور الشرقية',
      'الأصيلة.',
      '',
      'رحلة بدأت بالبحث عن أندر',
      'مكونات العود والمسك.',
    ],
  },
  {
    id: 2,
    title: 'الهوية',
    icon: '✦',
    textLines: [
      'دمجنا الأصالة العريقة',
      'باللمسة العصرية —',
      '',
      'تريقات عطرية تحكي قصصاً',
      'من الشرق،',
      '',
      'في قوارير تعكس روح',
      'الفخامة المعاصرة.',
    ],
  },
  {
    id: 3,
    title: 'النجاح',
    icon: '👑',
    textLines: [
      'آلاف العملاء منحونا',
      'تقييماتهم وثقتهم،',
      '',
      'لأن كل عطر صنعناه',
      'بيد أمينة وقلب مخلص',
      'لمن يستحق الأفضل دائماً.',
    ],
  },
  {
    id: 4,
    title: 'الختام',
    textLines: [
      'وأنت الآن جزء',
      'من هذه القصة.',
      '',
      'اكتشف مجموعتنا →',
    ],
  },
];

export default function ScrollytellingStory() {
  const [progress, setProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrolled = window.scrollY - containerTop;
      const total = containerHeight - windowHeight;

      if (scrolled < 0 || total <= 0) {
        setProgress(0);
        setCurrentScene(0);
        setSceneProgress(0);
      } else {
        const p = Math.min(scrolled / total, 1);
        setProgress(p);

        // Determine current scene (0-4)
        const scene = Math.floor(p * 5);
        const sceneStart = scene * 0.2;
        const sceneEnd = (scene + 1) * 0.2;
        const sp = (p - sceneStart) / (sceneEnd - sceneStart);

        setCurrentScene(Math.min(scene, 4));
        setSceneProgress(Math.max(0, Math.min(sp, 1)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Render visual layer based on scene
  const renderVisualLayer = () => {
    switch (currentScene) {
      case 0:
        return <Scene0Visual progress={sceneProgress} isMobile={isMobile} />;
      case 1:
        return <Scene1Visual progress={sceneProgress} isMobile={isMobile} />;
      case 2:
        return <Scene2Visual progress={sceneProgress} isMobile={isMobile} />;
      case 3:
        return <Scene3Visual progress={sceneProgress} isMobile={isMobile} />;
      case 4:
        return <Scene4Visual progress={sceneProgress} isMobile={isMobile} />;
      default:
        return null;
    }
  };

  // Render text layer based on scene
  const renderTextLayer = () => {
    const scene = scenes[currentScene];
    if (!scene) return null;

    return (
      <div className="flex flex-col justify-center h-full">
        {scene.year && (
          <div
            className="text-amber-400 text-xs sm:text-sm font-semibold mb-2 sm:mb-4 transition-all duration-300"
            style={{
              opacity: Math.max(0, 1 - Math.abs(sceneProgress - 0.5) * 2),
            }}
          >
            {scene.year}
          </div>
        )}

        {scene.icon && (
          <div
            className="text-amber-400 text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-4 transition-all duration-300"
            style={{
              opacity: Math.max(0, 1 - Math.abs(sceneProgress - 0.5) * 2),
            }}
          >
            {scene.icon}
          </div>
        )}

        <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
          {scene.textLines.map((line, idx) => (
            <div
              key={idx}
              className="text-amber-50 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed sm:leading-relaxed transition-all duration-500"
              style={{
                opacity: Math.max(
                  0,
                  Math.min(1, (sceneProgress - idx * 0.1) * 5)
                ),
                transform: `translateY(${Math.max(0, (1 - sceneProgress - idx * 0.1) * 15)}px)`,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {currentScene === 4 && (
          <div
            className="mt-4 sm:mt-6 md:mt-8 inline-block"
            style={{
              opacity: Math.max(0, (sceneProgress - 0.5) * 2),
            }}
          >
            <button className="px-3 sm:px-6 py-2 sm:py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 text-xs sm:text-sm md:text-base">
              اكتشف المزيد
              <ChevronRight size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </button>
          </div>
        )}
      </div>
    );
  };

  // Mobile height multiplier (less scrolling needed on mobile)
  const heightMultiplier = isMobile ? 250 : 500;

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${heightMultiplier}vh` }}
    >
      {/* Sticky Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen bg-black overflow-hidden flex items-center"
      >
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-between">
          {/* Visual Layer - Top on Mobile, Right on Desktop */}
          <div className="w-full md:w-1/2 h-1/3 md:h-full flex items-center justify-center relative px-2 sm:px-4 md:px-6 py-4 md:py-0">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-none flex items-center justify-center">
              {renderVisualLayer()}
            </div>
          </div>

          {/* Text Layer - Bottom on Mobile, Left on Desktop */}
          <div className="w-full md:w-1/2 h-2/3 md:h-full px-3 sm:px-4 md:px-8 lg:px-12 py-6 sm:py-8 md:py-16 lg:py-20 overflow-y-auto md:overflow-visible flex items-center">
            <div className="w-full">
              {renderTextLayer()}
            </div>
          </div>
        </div>

        {/* Scene Indicators - Bottom */}
        <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-1.5 md:gap-2 z-10">
          {scenes.map((_, idx) => (
            <div
              key={idx}
              className={`rounded-full transition-all duration-300 ${
                idx === currentScene
                  ? 'bg-amber-400 w-4 sm:w-6 md:w-8 h-1.5 sm:h-2 md:h-2'
                  : idx < currentScene
                    ? 'bg-amber-600 w-1.5 sm:w-2 md:w-2 h-1.5 sm:h-2 md:h-2'
                    : 'bg-amber-900 w-1.5 sm:w-2 md:w-2 h-1.5 sm:h-2 md:h-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Scene 0: Entry - Golden particles forming
function Scene0Visual({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const size = isMobile ? 100 : 200;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 256 256" className="w-full h-full">
        {/* Particles */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const distance = 80 * (1 - progress * 0.7);
          const x = 128 + Math.cos(angle) * distance;
          const y = 128 + Math.sin(angle) * distance;
          const opacity = Math.min(1, progress * 2);

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={1.5 + progress * 1.5}
              fill="#BB9530"
              opacity={opacity}
            />
          );
        })}
      </svg>

      {/* Text fade-in */}
      <div
        className="absolute inset-0 flex items-center justify-center text-center"
        style={{ opacity: Math.max(0, progress - 0.3) * 2 }}
      >
        <p className="text-amber-100 text-xs sm:text-sm">بدأت من شغف...</p>
      </div>
    </div>
  );
}

// Scene 1: Birth - Bottle SVG drawing and filling
function Scene1Visual({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const fillProgress = Math.max(0, (progress - 0.3) * 1.4);
  const size = isMobile ? 100 : 200;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 150" className="w-full h-full">
        {/* Bottle outline */}
        <g opacity={Math.min(1, progress * 2)}>
          {/* Cap */}
          <rect x="35" y="10" width="30" height="8" fill="none" stroke="#BB9530" strokeWidth="1.5" />
          {/* Neck */}
          <path d="M 40 18 L 38 35 L 62 35 L 60 18" fill="none" stroke="#BB9530" strokeWidth="1.5" />
          {/* Body */}
          <path
            d="M 38 35 Q 30 50 30 80 Q 30 100 50 110 Q 70 100 70 80 Q 70 50 62 35"
            fill={`url(#bottleFill)`}
            stroke="#BB9530"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="bottleFill" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset={`${fillProgress * 100}%`} stopColor="#BB9530" stopOpacity="0.8" />
              <stop offset={`${fillProgress * 100}%`} stopColor="#BB9530" stopOpacity="0" />
            </linearGradient>
          </defs>
        </g>
      </svg>
    </div>
  );
}

// Scene 2: Identity - Bottle with world map
function Scene2Visual({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const size = isMobile ? 100 : 200;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Bottle filled */}
        <g opacity={Math.min(1, progress * 2)}>
          <rect x="70" y="30" width="60" height="15" fill="#BB9530" />
          <path
            d="M 75 45 Q 65 70 65 100 Q 65 130 100 145 Q 135 130 135 100 Q 135 70 125 45"
            fill="#BB9530"
            opacity="0.8"
          />
        </g>

        {/* Rays */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const startRadius = 70;
          const endRadius = 100 + progress * 25;
          const x1 = 100 + Math.cos(angle) * startRadius;
          const y1 = 100 + Math.sin(angle) * startRadius;
          const x2 = 100 + Math.cos(angle) * endRadius;
          const y2 = 100 + Math.sin(angle) * endRadius;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#BB9530"
              strokeWidth="0.8"
              opacity={progress}
            />
          );
        })}
      </svg>
    </div>
  );
}

// Scene 3: Success - Statistics flying in
function Scene3Visual({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const stats = [
    { label: 'عميل سعيد', value: '٥٠٠٠+', angle: 0 },
    { label: 'عطراً فريداً', value: '٤٨', angle: Math.PI * 0.66 },
    { label: 'نسبة الرضا', value: '٩٨٪', angle: Math.PI * 1.33 },
  ];

  const size = isMobile ? 100 : 200;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Central bottle */}
      <div className="absolute w-8 h-12 sm:w-12 sm:h-16 md:w-16 md:h-24 bg-gradient-to-b from-amber-400 to-amber-600 rounded-lg opacity-80" />

      {/* Flying stats */}
      {stats.map((stat, idx) => {
        const distance = isMobile ? 50 : 100;
        const startDistance = isMobile ? 80 : 160;
        const currentDistance = startDistance - (startDistance - distance) * progress;
        const x = Math.cos(stat.angle) * currentDistance;
        const y = Math.sin(stat.angle) * currentDistance;
        const opacity = Math.max(0, (progress - 0.1) * 2);

        return (
          <div
            key={idx}
            className="absolute text-center transition-all duration-100 whitespace-nowrap"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              opacity: opacity,
            }}
          >
            <div className="text-sm sm:text-lg md:text-2xl font-bold text-amber-400">{stat.value}</div>
            <div className="text-xs sm:text-xs md:text-sm text-amber-200">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// Scene 4: Finale - Logo and tagline
function Scene4Visual({ progress, isMobile }: { progress: number; isMobile: boolean }) {
  const size = isMobile ? 80 : 160;
  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      {/* Logo */}
      <img
        src="https://d2xsxph8kpxj0f.cloudfront.net/310519663333117477/LruHvb32LRvBqDPR6Govwo/naz-logo-YhTymyjhjGuW7ZWEe7unWC.webp"
        alt="NAZ Logo"
        className="w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 mb-2 sm:mb-4"
        style={{ opacity: Math.min(1, progress * 2) }}
      />

      {/* Tagline */}
      <div
        className="text-center text-amber-100 text-xs sm:text-xs md:text-sm font-light italic"
        style={{
          opacity: Math.max(0, (progress - 0.3) * 2),
        }}
      >
        الأصالة في كل قطرة
      </div>
    </div>
  );
}
