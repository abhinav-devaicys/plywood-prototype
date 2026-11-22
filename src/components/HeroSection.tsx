import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { HERO_MEDIA } from '../data/atelierData';
import type { DrawerSection } from './Navbar';

interface HeroSectionProps {
  onOpenSection: (section: DrawerSection) => void;
  onScrollDown: () => void;
}

const HEADLINE_LINES = ['Materials that', 'define spaces.'];
const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection({ onOpenSection, onScrollDown }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.35,
    restDelta: 0.0005,
  });

  const imageParallaxY = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '13%']
  );
  const contentParallaxY = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '-7%']
  );
  const contentOpacity = useTransform(
    smoothProgress,
    [0, 0.85],
    prefersReducedMotion ? [1, 1] : [1, 0.35]
  );

  return (
    <section
      id="hero-top"
      ref={heroRef}
      aria-label="Veneer & Form Hero"
      className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#141210]"
    >
      {/* Background Architectural Photograph Stage (Mobile-tuned focal framing + Spring Parallax) */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#2C1F16] via-[#1C1713] to-[#141210]">
        {!imageError && (
          <motion.div
            initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 1.08, opacity: 0 }}
            animate={{ scale: 1.015, opacity: 1 }}
            transition={{
              scale: { duration: 1.65, ease: LUXURY_EASE },
              opacity: { duration: 1.0, ease: LUXURY_EASE },
            }}
            className="w-full h-full will-change-transform gpu-layer"
          >
            <motion.div
              style={{ y: imageParallaxY }}
              className="w-full h-[114%] -mt-[5%] will-change-transform gpu-layer"
            >
              <img
                src={HERO_MEDIA.src}
                alt={HERO_MEDIA.alt}
                referrerPolicy="no-referrer"
                decoding="async"
                fetchPriority="high"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-[28%_center] sm:object-[38%_center] md:object-center select-none"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Measured Scrims tuned for both portrait mobile and wide desktop legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,18,16,0.64)_0%,rgba(20,18,16,0.42)_52%,rgba(20,18,16,0.78)_100%)] sm:bg-[radial-gradient(ellipse_at_center,rgba(20,18,16,0.58)_0%,rgba(20,18,16,0.34)_52%,rgba(20,18,16,0.72)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#141210]/78 via-[#141210]/25 to-[#141210]/88 sm:from-[#141210]/70 sm:via-[#141210]/15 sm:to-[#141210]/85"
        />
        {/* Subtle Grain Texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 architectural-grain opacity-[0.045] mix-blend-overlay pointer-events-none"
        />
      </div>

      {/* Subtle Thin Architectural Inset Frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 sm:inset-x-8 md:inset-x-12 top-[4.6rem] sm:top-20 md:top-24 bottom-3.5 sm:bottom-5 md:bottom-8 border border-[#F5F2EC]/14"
      />

      {/* Top Spacer matching Navbar height */}
      <div className="h-16 md:h-24 shrink-0" aria-hidden="true" />

      {/* Centered Editorial Content */}
      <motion.div
        style={{ y: contentParallaxY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-[1160px] mx-auto px-6 sm:px-12 md:px-16 py-6 sm:py-10 md:py-14 flex flex-col items-center text-center will-change-transform gpu-layer"
      >
        {/* Brand Label Above Headline */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: LUXURY_EASE, delay: 0.2 }}
          className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8 max-w-full"
        >
          <span aria-hidden="true" className="hidden sm:block w-8 h-[1px] bg-[#D8CFC2]/45" />
          <p className="text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.24em] uppercase font-medium text-[#D8CFC2] leading-relaxed">
            VENEER &amp; FORM — ARCHITECTURAL SURFACES
          </p>
          <span aria-hidden="true" className="hidden sm:block w-8 h-[1px] bg-[#D8CFC2]/45" />
        </motion.div>

        {/* Oversized Editorial Headline with Narrow-Screen Responsive Scale */}
        <h1 className="font-display text-[clamp(2.65rem,11.2vw,6.35rem)] leading-[0.98] sm:leading-[0.95] tracking-[-0.02em] font-normal text-[#FAF7F2] text-balance max-w-4xl">
          {HEADLINE_LINES.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                initial={prefersReducedMotion ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 1.0,
                  ease: LUXURY_EASE,
                  delay: 0.32 + index * 0.13,
                }}
                className="block will-change-transform gpu-layer"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Supporting Line */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: LUXURY_EASE, delay: 0.58 }}
          className="mt-5 sm:mt-6 md:mt-8 max-w-[21rem] sm:max-w-[33rem] text-[14px] sm:text-base md:text-[17px] leading-[1.65] font-normal tracking-[0.01em] text-[#EAE4DA]/90"
        >
          Discover premium plywood, veneers and surfaces crafted for exceptional interiors.
        </motion.p>

        {/* Two Refined Touch-Friendly CTA Buttons */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: LUXURY_EASE, delay: 0.72 }}
          className="mt-7 sm:mt-9 md:mt-11 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-[300px] sm:max-w-none sm:w-auto"
        >
          <motion.button
            type="button"
            whileHover={prefersReducedMotion ? undefined : { y: -1 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
            transition={{ duration: 0.18, ease: LUXURY_EASE }}
            onClick={() => onOpenSection('materials')}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 bg-[#F5F2EC] text-[#141210] text-[12px] sm:text-[13px] tracking-[0.1em] uppercase font-medium rounded-[2px] active:bg-[#D8CFC2] hover:bg-[#D8CFC2] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF7F2]"
          >
            <span>Explore Materials</span>
            <ArrowUpRight className="w-4 h-4 stroke-[1.6]" aria-hidden="true" />
          </motion.button>

          <motion.button
            type="button"
            whileHover={prefersReducedMotion ? undefined : { y: -1 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
            transition={{ duration: 0.18, ease: LUXURY_EASE }}
            onClick={() => onOpenSection('showroom')}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-6 sm:px-7 py-3.5 bg-[#141210]/45 backdrop-blur-[2px] text-[#FAF7F2] text-[12px] sm:text-[13px] tracking-[0.1em] uppercase font-medium border border-[#F5F2EC]/45 rounded-[2px] active:bg-[#F5F2EC]/15 hover:border-[#F5F2EC] hover:bg-[#F5F2EC]/12 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF7F2]"
          >
            Visit Our Showroom
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom Architectural Metadata & Vertical Scroll Indicator */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.95, ease: LUXURY_EASE, delay: 0.88 }}
        className="relative z-10 max-w-[1440px] w-full mx-auto px-6 sm:px-12 md:px-16 pb-6 sm:pb-8 md:pb-11 flex items-end justify-center md:justify-between gap-6"
      >
        <div className="hidden md:flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-[#D8CFC2]/75 whitespace-nowrap">
          <span>Gwalior</span>
          <span aria-hidden="true">·</span>
          <span>Madhya Pradesh</span>
        </div>

        {/* Small Vertical Scroll Indicator */}
        <motion.button
          type="button"
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          onClick={onScrollDown}
          aria-label="Scroll to The Material Library"
          className="group flex flex-col items-center gap-2 cursor-pointer py-1 px-4 min-h-[44px] justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8CFC2]"
        >
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#D8CFC2]/80 group-hover:text-[#FAF7F2] transition-colors duration-250">
            Scroll
          </span>
          <span className="relative block w-[1px] h-7 sm:h-9 bg-[#F5F2EC]/25 overflow-hidden">
            <motion.span
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? { y: '0%', opacity: 0.85 }
                  : { y: ['-100%', '200%'], opacity: [0, 1, 1, 0] }
              }
              transition={{
                duration: 2.3,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.2, 0.8, 1],
              }}
              className="absolute inset-x-0 top-0 h-1/2 bg-[#FAF7F2] will-change-transform"
            />
          </span>
        </motion.button>

        <div className="hidden md:flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-[#D8CFC2]/75 whitespace-nowrap">
          <span>Plywood</span>
          <span aria-hidden="true">·</span>
          <span>Veneers</span>
          <span aria-hidden="true">·</span>
          <span>Laminates</span>
        </div>
      </motion.div>
    </section>
  );
}
