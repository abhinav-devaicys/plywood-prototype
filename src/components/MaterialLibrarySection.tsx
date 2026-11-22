import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  SURFACE_COLLECTION,
  type DrawerCategory,
  type SurfaceCategory,
} from '../data/atelierData';

interface MaterialLibrarySectionProps {
  onExploreCategory: (category: DrawerCategory) => void;
}

interface MaterialCardProps {
  item: SurfaceCategory;
  aspectClass: string;
  featured?: boolean;
  tall?: boolean;
  delay?: number;
  onExplore: (id: DrawerCategory) => void;
}

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT_CONFIG = { once: true, margin: '-40px' } as const;

function MaterialEditorialItem({
  item,
  aspectClass,
  featured = false,
  tall = false,
  delay = 0,
  onExplore,
}: MaterialCardProps) {
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.9, ease: LUXURY_EASE, delay }}
      className="group flex flex-col"
    >
      {/* Image Frame */}
      <motion.button
        type="button"
        whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
        transition={{ duration: 0.18, ease: LUXURY_EASE }}
        onClick={() => onExplore(item.id)}
        aria-label={`Explore ${item.title}`}
        className={`relative w-full ${aspectClass} overflow-hidden bg-[#E5DED3] border border-[#141210]/10 cursor-pointer block text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A3525]`}
      >
        {!imgError ? (
          <motion.div
            initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.055 }}
            whileInView={{ scale: 1 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 1.25, ease: LUXURY_EASE, delay }}
            className="w-full h-full will-change-transform gpu-layer"
          >
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.035 }}
              transition={{ duration: 0.85, ease: LUXURY_EASE }}
              className="w-full h-full will-change-transform gpu-layer"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center select-none"
              />
            </motion.div>
          </motion.div>
        ) : (
          <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#D8CFC2] to-[#C7BBA9] text-[#141210]">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#4A3525] tabular-nums">
              {item.index}
            </span>
            <span className="font-display text-2xl">{item.title}</span>
          </div>
        )}
      </motion.button>

      {/* Editorial Caption & Details */}
      <div className={`pt-4 sm:pt-5 ${featured ? 'md:pt-6' : ''} flex flex-col flex-1`}>
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#141210]/12">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="text-[11px] tracking-[0.18em] uppercase font-medium text-[#4A3525]/75 tabular-nums shrink-0">
              {item.index}
            </span>
            <span aria-hidden="true" className="text-[#4A3525]/40 shrink-0">
              /
            </span>
            <span className="text-[11px] tracking-[0.12em] sm:tracking-[0.14em] uppercase text-[#4A3525]/80 truncate">
              {item.subtitle}
            </span>
          </div>
          <span className="text-[11px] tracking-[0.04em] text-[#4A3525]/65 whitespace-nowrap shrink-0">
            {item.specification.split('·')[0].trim()}
          </span>
        </div>

        <div
          className={`pt-4 ${
            featured
              ? 'grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-8 items-start'
              : 'space-y-2.5 sm:space-y-3'
          }`}
        >
          <div className={featured ? 'md:col-span-5' : ''}>
            <div className="overflow-hidden">
              <motion.h3
                initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.85, ease: LUXURY_EASE, delay: delay + 0.08 }}
                className={`font-display font-normal tracking-[-0.015em] text-[#141210] will-change-transform ${
                  featured
                    ? 'text-[28px] sm:text-4xl'
                    : tall
                      ? 'text-[28px] sm:text-[32px]'
                      : 'text-[26px] sm:text-[28px]'
                }`}
              >
                {item.title}
              </motion.h3>
            </div>
          </div>

          <div className={featured ? 'md:col-span-7 space-y-3 sm:space-y-4' : 'space-y-3 sm:space-y-4'}>
            <p className="text-sm sm:text-[15px] leading-[1.65] text-[#4A3525]/90">
              {item.description}
            </p>

            <motion.button
              type="button"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.15, ease: LUXURY_EASE }}
              onClick={() => onExplore(item.id)}
              className="min-h-[44px] inline-flex items-center gap-2.5 text-[12px] tracking-[0.14em] uppercase font-medium text-[#141210] active:text-[#4A3525] hover:text-[#4A3525] transition-colors cursor-pointer group/link whitespace-nowrap shrink-0 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A3525]"
            >
              <span className="relative">
                Explore Collection
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-[#141210]/35 group-hover/link:bg-[#141210] transition-colors duration-250"
                />
              </span>
              <ArrowRight
                className="w-3.5 h-3.5 stroke-[1.6] transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-1.5"
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function MaterialLibrarySection({ onExploreCategory }: MaterialLibrarySectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const [plywood, veneers, laminates, panels] = SURFACE_COLLECTION;

  return (
    <section
      id="material-library"
      aria-labelledby="material-library-heading"
      className="relative bg-[#F5F2EC] text-[#141210] border-t border-[#141210]/10 py-16 sm:py-24 lg:py-32"
    >
      {/* Subtle Architectural Paper Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 architectural-grain opacity-[0.025]"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="pb-10 sm:pb-12 md:pb-16 border-b border-[#141210]/14">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.75, ease: LUXURY_EASE }}
            className="mb-5 sm:mb-6 md:mb-8"
          >
            <p className="text-[11px] tracking-[0.2em] sm:tracking-[0.22em] uppercase font-medium text-[#4A3525]/80">
              THE MATERIAL LIBRARY / 01
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-12 items-end">
            <div className="lg:col-span-7 overflow-hidden">
              <motion.h2
                id="material-library-heading"
                initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.9, ease: LUXURY_EASE, delay: 0.08 }}
                className="font-display text-[clamp(2.2rem,8.5vw,4.35rem)] leading-[1.0] sm:leading-[0.98] tracking-[-0.02em] font-normal text-[#141210] text-balance will-change-transform"
              >
                Surfaces that shape spaces.
              </motion.h2>
            </div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.85, ease: LUXURY_EASE, delay: 0.16 }}
              className="lg:col-span-5 lg:pb-1"
            >
              <p className="text-[14.5px] sm:text-base leading-[1.68] text-[#4A3525]/90 max-w-md">
                Explore a considered collection of materials designed to bring depth, character, and timelessness to every interior.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Editorial Showcase: Responsive Mobile Stack -> Desktop Asymmetrical Grid */}
        <div className="pt-10 sm:pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-10 xl:gap-x-12 items-start">
          {/* Left 8 Columns: Featured Plywood + Two Categories Below */}
          <div className="lg:col-span-8 flex flex-col gap-10 sm:gap-12 md:gap-16">
            {/* 01. Featured Material Image (4/3 on mobile for rich presence, 16/9 on tablet/desktop) */}
            <MaterialEditorialItem
              item={plywood}
              aspectClass="aspect-[4/3] sm:aspect-[16/9]"
              featured
              delay={0.04}
              onExplore={onExploreCategory}
            />

            {/* 02 & 03. Two Editorial Categories */}
            <div className="pt-10 sm:pt-10 md:pt-12 border-t border-[#141210]/14 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-10">
              <MaterialEditorialItem
                item={veneers}
                aspectClass="aspect-[4/3]"
                delay={0.08}
                onExplore={onExploreCategory}
              />
              <div className="pt-10 border-t border-[#141210]/12 sm:pt-0 sm:border-t-0">
                <MaterialEditorialItem
                  item={laminates}
                  aspectClass="aspect-[4/3]"
                  delay={0.14}
                  onExplore={onExploreCategory}
                />
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Tall Vertical Architectural Panels */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:pl-2 pt-10 border-t border-[#141210]/14 lg:pt-0 lg:border-t-0">
            <MaterialEditorialItem
              item={panels}
              aspectClass="aspect-[4/5] sm:aspect-[3/4]"
              tall
              delay={0.12}
              onExplore={onExploreCategory}
            />

            {/* Quiet Architectural Specification Footnote */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.85, ease: LUXURY_EASE, delay: 0.22 }}
              className="mt-8 sm:mt-10 pt-5 border-t border-[#141210]/14 space-y-2.5 text-xs text-[#4A3525]/80"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="uppercase tracking-[0.14em] text-[10px] text-[#4A3525]/65">
                  Archive Format
                </span>
                <span className="text-[#141210]">Full-Scale Monolith Samples</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="uppercase tracking-[0.14em] text-[10px] text-[#4A3525]/65">
                  Curation
                </span>
                <span className="text-[#141210]">Gwalior Material Atelier</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
