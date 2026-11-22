import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ArrowRight, Check, Search, Phone } from 'lucide-react';
import {
  SURFACE_COLLECTION,
  SHOWROOM_INFO,
  type DrawerCategory,
} from '../data/atelierData';

interface AtelierDrawerProps {
  activeSection: DrawerCategory | null;
  onClose: () => void;
  onSwitchSection: (section: DrawerCategory) => void;
}

const ARCHIVE_TABS: { id: DrawerCategory; label: string }[] = [
  { id: 'materials', label: 'All Surfaces' },
  { id: 'plywood', label: 'Plywood' },
  { id: 'veneers', label: 'Veneers' },
  { id: 'laminates', label: 'Laminates' },
  { id: 'panels', label: 'Panels' },
  { id: 'showroom', label: 'Showroom' },
];

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AtelierDrawer({
  activeSection,
  onClose,
  onSwitchSection,
}: AtelierDrawerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('Architect / Interior Designer');
  const [preferredDate, setPreferredDate] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!activeSection) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection, onClose]);

  const isShowroom = activeSection === 'showroom';
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const categorySurfaces =
    activeSection && activeSection !== 'materials' && activeSection !== 'showroom'
      ? SURFACE_COLLECTION.filter((s) => s.id === activeSection)
      : SURFACE_COLLECTION;

  const filteredSurfaces = normalizedQuery
    ? categorySurfaces.filter((item) =>
        `${item.title} ${item.subtitle} ${item.specification} ${item.description} ${item.details.join(' ')}`
          .toLowerCase()
          .includes(normalizedQuery)
      )
    : categorySurfaces;

  const handleTabSwitch = (tabId: DrawerCategory) => {
    setSearchQuery('');
    onSwitchSection(tabId);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setFormError('Please provide your name and phone number or email address.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setContact('');
    setPreferredDate('');
    setFormError('');
  };

  return (
    <AnimatePresence>
      {activeSection && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: LUXURY_EASE }}
            onClick={onClose}
            className="fixed inset-0 bg-[#141210]/70 backdrop-blur-[4px]"
          />

          {/* Slide-over Architectural Panel */}
          <motion.aside
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={
              prefersReducedMotion
                ? { duration: 0.2 }
                : { type: 'spring', stiffness: 320, damping: 36, mass: 0.85 }
            }
            className="relative z-10 w-full max-w-xl h-full bg-[#FAF7F2] text-[#141210] border-l border-[#141210]/15 flex flex-col overflow-hidden will-change-transform gpu-layer"
          >
            {/* Header */}
            <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-[#141210]/12 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#4A3525] font-medium truncate">
                <span>{isShowroom ? 'Gwalior Atelier' : 'Material Archive'}</span>
                <span aria-hidden="true">·</span>
                <span>Veneer &amp; Form</span>
              </div>

              <motion.button
                type="button"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                transition={{ duration: 0.15, ease: LUXURY_EASE }}
                onClick={onClose}
                aria-label="Close panel"
                className="w-11 h-11 inline-flex items-center justify-center border border-[#141210]/20 rounded-[2px] text-[#141210] active:bg-[#141210] active:text-[#FAF7F2] hover:bg-[#141210] hover:text-[#FAF7F2] transition-colors duration-200 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Section Tabs with Sliding Shared-Layout Indicator */}
            <div className="px-5 sm:px-8 py-2.5 border-b border-[#141210]/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {ARCHIVE_TABS.map((tab) => {
                const active = activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabSwitch(tab.id)}
                    className={`relative min-h-[40px] px-3 py-2 text-xs tracking-[0.06em] rounded-[2px] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                      active ? 'text-[#FAF7F2]' : 'text-[#4A3525] hover:bg-[#141210]/8'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="drawer-active-tab"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0.1 }
                            : { type: 'spring', stiffness: 420, damping: 36 }
                        }
                        className="absolute inset-0 bg-[#141210] rounded-[2px] -z-0"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Scrollable Body with Smooth View Transition */}
            <div className="flex-1 overflow-y-auto overscroll-y-contain px-5 sm:px-8 py-6 sm:py-7 pb-[max(2rem,env(safe-area-inset-bottom))]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: LUXURY_EASE }}
                  className="space-y-7 sm:space-y-8"
                >
                  {!isShowroom ? (
                    <>
                      <div className="space-y-4">
                        <div>
                          <h2 className="font-display text-[30px] sm:text-4xl font-normal tracking-tight text-[#141210]">
                            {categorySurfaces.length === 1
                              ? categorySurfaces[0].title
                              : 'Curated architectural surfaces'}
                          </h2>
                          <p className="mt-2 text-sm leading-relaxed text-[#4A3525]/85">
                            Each board, veneer leaf, laminate sheet, and acoustic wall panel is curated at our Gwalior studio for residential and hospitality architecture.
                          </p>
                        </div>

                        {/* Compact Architectural Search Filter */}
                        <div className="relative">
                          <Search
                            className="w-3.5 h-3.5 text-[#4A3525]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            aria-hidden="true"
                          />
                          <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter by finish, wood species, or grade..."
                            aria-label="Filter material surfaces"
                            className="w-full min-h-[42px] pl-9 pr-8 py-2 bg-white/70 border border-[#141210]/15 rounded-[2px] text-[13px] text-[#141210] placeholder:text-[#4A3525]/50 focus:outline-none focus:border-[#141210] transition-colors"
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              onClick={() => setSearchQuery('')}
                              aria-label="Clear search"
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 inline-flex items-center justify-center text-[#4A3525] hover:text-[#141210] cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {filteredSurfaces.length === 0 ? (
                        <div className="py-10 border-t border-b border-[#141210]/12 text-center space-y-3">
                          <p className="font-display text-2xl text-[#141210]">
                            No surfaces match &ldquo;{searchQuery}&rdquo;
                          </p>
                          <p className="text-xs text-[#4A3525]/80">
                            Try searching for walnut, birch, matte, fluted, or reset the filter.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('');
                              onSwitchSection('materials');
                            }}
                            className="mt-1 px-4 py-2 text-xs tracking-[0.12em] uppercase border border-[#141210]/25 rounded-[2px] text-[#141210] hover:bg-[#141210] hover:text-[#FAF7F2] transition-colors cursor-pointer"
                          >
                            View All Surfaces
                          </button>
                        </div>
                      ) : (
                        <div className="divide-y divide-[#141210]/12 border-t border-b border-[#141210]/12">
                          {filteredSurfaces.map((item) => (
                            <article key={item.id} className="py-6 sm:py-7 space-y-4">
                              <div className="aspect-[4/3] w-full overflow-hidden bg-[#D8CFC2]/40 border border-[#141210]/10">
                                <img
                                  src={item.image}
                                  alt={item.imageAlt}
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-4 text-xs text-[#4A3525]/80">
                                  <span className="tabular-nums font-medium">
                                    {item.index} · {item.subtitle}
                                  </span>
                                </div>
                                <h3 className="font-display text-2xl font-medium text-[#141210]">
                                  {item.title}
                                </h3>
                                <p className="text-xs tracking-[0.04em] text-[#4A3525]/75">
                                  {item.specification}
                                </p>
                                <p className="pt-1 text-sm leading-relaxed text-[#141210]/80">
                                  {item.description}
                                </p>

                                <ul className="pt-3 border-t border-[#141210]/10 space-y-1.5 text-xs text-[#4A3525]">
                                  {item.details.map((detail) => (
                                    <li key={detail} className="flex items-center gap-2.5">
                                      <span
                                        aria-hidden="true"
                                        className="w-3 h-[1px] bg-[#4A3525]/45 shrink-0"
                                      />
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </article>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <a
                          href={`tel:${SHOWROOM_INFO.phone.replace(/\s+/g, '')}`}
                          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#141210]/25 rounded-[2px] text-xs tracking-[0.1em] uppercase text-[#141210] hover:border-[#141210] transition-colors whitespace-nowrap"
                        >
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Call Desk</span>
                        </a>
                        <motion.button
                          type="button"
                          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                          transition={{ duration: 0.15, ease: LUXURY_EASE }}
                          onClick={() => handleTabSwitch('showroom')}
                          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#141210] text-[#FAF7F2] text-xs tracking-[0.12em] uppercase font-medium rounded-[2px] hover:bg-[#4A3525] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Book Consultation</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="aspect-[4/3] w-full overflow-hidden bg-[#D8CFC2]/40 border border-[#141210]/10">
                        <img
                          src={SHOWROOM_INFO.image}
                          alt={SHOWROOM_INFO.imageAlt}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-3 border-b border-[#141210]/12 pb-6">
                        <h2 className="font-display text-[30px] sm:text-4xl font-normal tracking-tight text-[#141210]">
                          Visit the Gwalior Atelier
                        </h2>
                        <p className="text-sm leading-relaxed text-[#141210]/80">
                          Experience full-height veneer monoliths, acoustic fluted timber walls, and calibrated plywood joinery under natural daylight.
                        </p>
                        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4A3525]">
                          <div>
                            <p className="uppercase tracking-[0.14em] text-[#4A3525]/70 mb-1">Address</p>
                            <p className="text-[#141210] font-medium">{SHOWROOM_INFO.addressLine1}</p>
                            <p>{SHOWROOM_INFO.addressLine2}</p>
                          </div>
                          <div>
                            <p className="uppercase tracking-[0.14em] text-[#4A3525]/70 mb-1">Hours &amp; Desk</p>
                            <p className="text-[#141210] font-medium">{SHOWROOM_INFO.hours}</p>
                            <a
                              href={`tel:${SHOWROOM_INFO.phone.replace(/\s+/g, '')}`}
                              className="tabular-nums underline underline-offset-4 hover:text-[#141210]"
                            >
                              {SHOWROOM_INFO.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      {submitted ? (
                        <motion.div
                          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, ease: LUXURY_EASE }}
                          className="p-5 sm:p-6 border border-[#141210]/18 bg-[#F5F2EC] space-y-3"
                        >
                          <div className="flex items-center gap-2.5 text-[#141210]">
                            <Check className="w-4 h-4 text-[#4A3525]" aria-hidden="true" />
                            <h3 className="font-display text-2xl font-medium">Appointment Requested</h3>
                          </div>
                          <p className="text-sm text-[#4A3525] leading-relaxed">
                            Thank you, {name}. Our material curator in Gwalior will confirm your private showroom slot at{' '}
                            <span className="text-[#141210] font-medium">{contact}</span> shortly.
                          </p>
                          <button
                            type="button"
                            onClick={resetForm}
                            className="mt-2 min-h-[40px] text-xs tracking-[0.12em] uppercase underline underline-offset-4 text-[#141210] cursor-pointer"
                          >
                            Schedule another visit
                          </button>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                          <h3 className="font-display text-2xl font-normal text-[#141210]">
                            Request Private Material Consultation
                          </h3>

                          <div>
                            <label
                              htmlFor="visitor-name"
                              className="block text-xs tracking-[0.08em] uppercase text-[#4A3525] mb-1.5"
                            >
                              Full Name
                            </label>
                            <input
                              id="visitor-name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Arjun Scindia"
                              className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-[#141210]/20 rounded-[2px] text-sm text-[#141210] placeholder:text-[#4A3525]/45 focus:outline-none focus:border-[#141210] transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="visitor-contact"
                                className="block text-xs tracking-[0.08em] uppercase text-[#4A3525] mb-1.5"
                              >
                                Phone or Email
                              </label>
                              <input
                                id="visitor-contact"
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="+91 98260 00000"
                                className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-[#141210]/20 rounded-[2px] text-sm text-[#141210] placeholder:text-[#4A3525]/45 focus:outline-none focus:border-[#141210] transition-colors"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="visitor-date"
                                className="block text-xs tracking-[0.08em] uppercase text-[#4A3525] mb-1.5"
                              >
                                Preferred Date
                              </label>
                              <input
                                id="visitor-date"
                                type="date"
                                value={preferredDate}
                                onChange={(e) => setPreferredDate(e.target.value)}
                                className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-[#141210]/20 rounded-[2px] text-sm text-[#141210] focus:outline-none focus:border-[#141210] transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="visitor-role"
                              className="block text-xs tracking-[0.08em] uppercase text-[#4A3525] mb-1.5"
                            >
                              Project Role
                            </label>
                            <select
                              id="visitor-role"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              className="w-full min-h-[44px] px-3.5 py-2.5 bg-white border border-[#141210]/20 rounded-[2px] text-sm text-[#141210] focus:outline-none focus:border-[#141210] transition-colors"
                            >
                              <option>Architect / Interior Designer</option>
                              <option>Homeowner / Private Residence</option>
                              <option>Commercial &amp; Hospitality Developer</option>
                            </select>
                          </div>

                          {formError && (
                            <p className="text-xs text-[#8C2D19]" role="alert">
                              {formError}
                            </p>
                          )}

                          <motion.button
                            type="submit"
                            whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                            transition={{ duration: 0.15, ease: LUXURY_EASE }}
                            className="w-full min-h-[48px] py-3.5 px-6 bg-[#141210] text-[#FAF7F2] text-xs tracking-[0.14em] uppercase font-medium rounded-[2px] hover:bg-[#4A3525] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Confirm Showroom Visit
                          </motion.button>
                        </form>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
