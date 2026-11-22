import { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SHOWROOM_INFO } from '../data/atelierData';

export type DrawerSection = 'materials' | 'veneers' | 'plywood' | 'showroom';

interface NavbarProps {
  onOpenSection: (section: DrawerSection) => void;
}

const NAV_ITEMS: { label: string; section: DrawerSection }[] = [
  { label: 'Materials', section: 'materials' },
  { label: 'Veneers', section: 'veneers' },
  { label: 'Plywood', section: 'plywood' },
  { label: 'Showroom', section: 'showroom' },
];

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Navbar({ onOpenSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const rawBackdropOpacity = useTransform(scrollY, [0, 96], [0, 1]);
  const backdropOpacity = useSpring(rawBackdropOpacity, {
    stiffness: 180,
    damping: 30,
    mass: 0.4,
  });

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const handleNavClick = (section: DrawerSection) => {
    setMobileOpen(false);
    onOpenSection(section);
  };

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: LUXURY_EASE, delay: 0.06 }}
        className="fixed top-0 inset-x-0 z-40 border-b border-[#F5F2EC]/12 gpu-layer"
      >
        {/* Continuous spring-interpolated backdrop layer */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: prefersReducedMotion ? 0.85 : backdropOpacity }}
          className="absolute inset-0 bg-[#141210]/90 backdrop-blur-md pointer-events-none"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 h-16 md:h-20 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero-top"
            onClick={() => setMobileOpen(false)}
            className="font-display text-[18px] sm:text-[20px] md:text-[22px] tracking-[0.12em] sm:tracking-[0.14em] font-medium text-[#FAF7F2] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8CFC2] transition-opacity duration-200 hover:opacity-85 py-1"
          >
            VENEER &amp; FORM
          </a>

          {/* Zone 2: 4 concise single-line text links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.06em] font-normal text-[#EAE4DA]/85"
          >
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.section}
                type="button"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.15, ease: LUXURY_EASE }}
                onClick={() => handleNavClick(item.section)}
                className="relative py-2 whitespace-nowrap shrink-0 text-[#EAE4DA]/85 hover:text-[#FAF7F2] transition-colors duration-200 group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D8CFC2]"
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-0 w-full h-[1px] bg-[#D8CFC2] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </motion.button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + mobile drawer trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              type="button"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.15, ease: LUXURY_EASE }}
              onClick={() => handleNavClick('showroom')}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-[12px] tracking-[0.12em] uppercase font-medium text-[#FAF7F2] border border-[#F5F2EC]/35 rounded-[2px] hover:bg-[#F5F2EC] hover:text-[#141210] hover:border-[#F5F2EC] transition-colors duration-250 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8CFC2]"
            >
              Book Visit
            </motion.button>

            <motion.button
              type="button"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              transition={{ duration: 0.15, ease: LUXURY_EASE }}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#FAF7F2] border border-[#F5F2EC]/25 rounded-[2px] active:bg-[#F5F2EC]/10 hover:border-[#F5F2EC]/60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8CFC2]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Responsive Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: LUXURY_EASE }}
            className="fixed inset-0 z-30 bg-[#141210]/98 backdrop-blur-xl md:hidden flex flex-col justify-between pt-20 pb-[max(2rem,env(safe-area-inset-bottom))] px-5 sm:px-8 overflow-y-auto overscroll-y-contain"
          >
            <div className="pt-4">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#D8CFC2]/60 mb-3">
                Navigation
              </p>
              <nav aria-label="Mobile navigation" className="flex flex-col border-t border-[#F5F2EC]/14">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.button
                    key={item.section}
                    type="button"
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease: LUXURY_EASE,
                      delay: 0.05 + idx * 0.05,
                    }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                    onClick={() => handleNavClick(item.section)}
                    className="flex items-center justify-between py-4 sm:py-5 border-b border-[#F5F2EC]/14 text-left text-[#FAF7F2] active:text-[#D8CFC2] hover:text-[#D8CFC2] transition-colors cursor-pointer min-h-[56px]"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[11px] tracking-[0.18em] text-[#D8CFC2]/65 tabular-nums">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-[28px] sm:text-3xl tracking-tight">
                        {item.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#D8CFC2]/60 shrink-0" aria-hidden="true" />
                  </motion.button>
                ))}
              </nav>
            </div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: LUXURY_EASE, delay: 0.25 }}
              className="pt-8 space-y-4"
            >
              <motion.button
                type="button"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                onClick={() => handleNavClick('showroom')}
                className="w-full min-h-[48px] py-3.5 px-6 bg-[#F5F2EC] text-[#141210] text-xs tracking-[0.14em] uppercase font-medium rounded-[2px] active:bg-[#D8CFC2] hover:bg-[#D8CFC2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Visit Our Showroom
              </motion.button>
              <div className="flex flex-col items-center gap-1 text-[11px] tracking-[0.12em] text-[#D8CFC2]/70 text-center">
                <span>{SHOWROOM_INFO.addressLine1}, {SHOWROOM_INFO.city}</span>
                <span className="tabular-nums text-[#D8CFC2]/55">{SHOWROOM_INFO.hours}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
