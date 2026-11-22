import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SHOWROOM_EXPERIENCE_MEDIA } from '../data/atelierData';

interface ShowroomExperienceSectionProps {
  onVisitShowroom: () => void;
}

interface ApproachBenefit {
  number: string;
  title: string;
  detail: string;
}

const BENEFITS: ApproachBenefit[] = [
  {
    number: '01',
    title: 'Curated Material Selection',
    detail:
      'Full-height sliding veneer flitches, calibrated birch cores, and matte mineral laminates displayed side by side.',
  },
  {
    number: '02',
    title: 'Expert Product Guidance',
    detail:
      'Dedicated material consultants assisting architects and homeowners with grade, moisture, and joinery specifications.',
  },
  {
    number: '03',
    title: 'Materials for Every Interior',
    detail:
      'Tailored surface combinations suited to quiet private residences, bespoke cabinetry, and hospitality spaces.',
  },
];

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VIEWPORT_CONFIG = { once: true, margin: '-40px' } as const;

export function ShowroomExperienceSection({
  onVisitShowroom,
}: ShowroomExperienceSectionProps) {
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="showroom-experience"
      aria-labelledby="showroom-experience-heading"
      className="relative bg-[#FAF7F2] text-[#141210] border-t border-[#141210]/12 py-16 sm:py-24 lg:py-36"
    >
      {/* Subtle Architectural Paper Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 architectural-grain opacity-[0.025]"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 items-stretch">
          {/* LEFT SIDE: Editorial Copy, Benefits & Minimal CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between py-1">
            <div>
              {/* Small Uppercase Label */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.75, ease: LUXURY_EASE }}
                className="mb-5 sm:mb-6 md:mb-8"
              >
                <p className="text-[11px] tracking-[0.2em] sm:tracking-[0.22em] uppercase font-medium text-[#4A3525]/80">
                  OUR APPROACH / 03
                </p>
              </motion.div>

              {/* Large Heading */}
              <div className="overflow-hidden">
                <motion.h2
                  id="showroom-experience-heading"
                  initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{ duration: 0.9, ease: LUXURY_EASE, delay: 0.06 }}
                  className="font-display text-[clamp(2.2rem,8.5vw,4.15rem)] leading-[1.02] sm:leading-[1.0] tracking-[-0.02em] font-normal text-[#141210] text-balance max-w-xl will-change-transform"
                >
                  See the difference. Feel the material.
                </motion.h2>
              </div>

              {/* Supporting Paragraph */}
              <motion.p
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.85, ease: LUXURY_EASE, delay: 0.16 }}
                className="mt-5 sm:mt-6 md:mt-7 max-w-[33rem] text-[14.5px] sm:text-base leading-[1.68] sm:leading-[1.7] text-[#4A3525]/90"
              >
                Selecting architectural surfaces demands more than small swatches. Inside our Gwalior showroom, homeowners, architects, and interior designers can inspect full-scale timber panels, compare natural grains under true daylight, and match textures with confidence.
              </motion.p>
            </div>

            {/* Three Staggered Benefits + Minimal Showroom Link */}
            <div className="mt-9 sm:mt-12 lg:mt-14">
              <div className="border-t border-b border-[#141210]/14 divide-y divide-[#141210]/14">
                {BENEFITS.map((benefit, index) => (
                  <motion.div
                    key={benefit.number}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT_CONFIG}
                    transition={{
                      duration: 0.75,
                      ease: LUXURY_EASE,
                      delay: 0.14 + index * 0.1,
                    }}
                    className="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                  >
                    <div className="sm:col-span-6 flex items-baseline gap-2.5 sm:gap-3 min-w-0">
                      <span className="text-xs tracking-[0.14em] font-medium text-[#4A3525] tabular-nums shrink-0">
                        {benefit.number}
                      </span>
                      <span aria-hidden="true" className="text-[#4A3525]/45 shrink-0">
                        —
                      </span>
                      <h3 className="font-display text-[21px] sm:text-[23px] font-medium tracking-[-0.01em] text-[#141210]">
                        {benefit.title}
                      </h3>
                    </div>

                    <p className="sm:col-span-6 text-[13.5px] sm:text-sm leading-[1.6] text-[#4A3525]/85">
                      {benefit.detail}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.8, ease: LUXURY_EASE, delay: 0.35 }}
                className="pt-6 sm:pt-8"
              >
                <motion.button
                  type="button"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.15, ease: LUXURY_EASE }}
                  onClick={onVisitShowroom}
                  className="min-h-[44px] inline-flex items-center gap-3 text-[12px] tracking-[0.15em] uppercase font-medium text-[#141210] active:text-[#4A3525] hover:text-[#4A3525] transition-colors cursor-pointer group/cta py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A3525]"
                >
                  <span className="relative">
                    Visit Our Showroom
                    <span
                      aria-hidden="true"
                      className="absolute left-0 -bottom-1 w-full h-[1px] bg-[#4A3525]/45 group-hover/cta:bg-[#141210] transition-colors duration-250"
                    />
                  </span>
                  <ArrowRight
                    className="w-4 h-4 stroke-[1.5] text-[#4A3525] transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:translate-x-1.5 group-hover/cta:text-[#141210]"
                    aria-hidden="true"
                  />
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE: Large Showroom Photograph with Clip Reveal + Gentle Hover Zoom */}
          <div className="lg:col-span-6 flex">
            <motion.div
              initial={
                prefersReducedMotion
                  ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                  : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.9 }
              }
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 1.2, ease: LUXURY_EASE }}
              className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[640px] overflow-hidden bg-[#E5DED3] border border-[#141210]/12 gpu-layer will-change-[clip-path,opacity]"
            >
              {!imgError ? (
                <motion.div
                  initial={prefersReducedMotion ? { scale: 1 } : { scale: 1.07 }}
                  whileInView={{ scale: 1 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{ duration: 1.35, ease: LUXURY_EASE }}
                  className="w-full h-full will-change-transform gpu-layer"
                >
                  <motion.div
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.035 }}
                    transition={{ duration: 0.85, ease: LUXURY_EASE }}
                    className="w-full h-full will-change-transform gpu-layer"
                  >
                    <img
                      src={SHOWROOM_EXPERIENCE_MEDIA.src}
                      alt={SHOWROOM_EXPERIENCE_MEDIA.alt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-center select-none"
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <div className="w-full h-full flex flex-col justify-between p-8 bg-gradient-to-br from-[#D8CFC2] to-[#C7BBA9] text-[#141210]">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#4A3525]">
                    Gwalior Atelier
                  </span>
                  <span className="font-display text-3xl">
                    Veneer &amp; Form Showroom
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
