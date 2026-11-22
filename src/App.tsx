import { useState, useRef } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MaterialLibrarySection } from './components/MaterialLibrarySection';
import { ShowroomExperienceSection } from './components/ShowroomExperienceSection';
import { AtelierDrawer } from './components/AtelierDrawer';
import { SHOWROOM_INFO, type DrawerCategory } from './data/atelierData';

export default function App() {
  const [activeSection, setActiveSection] = useState<DrawerCategory | null>(null);
  const libraryWrapperRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    libraryWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#141210] text-[#F5F2EC] flex flex-col overflow-x-clip">
        <Navbar onOpenSection={setActiveSection} />

        <main className="flex-1">
          <HeroSection
            onOpenSection={setActiveSection}
            onScrollDown={handleScrollDown}
          />

          <div ref={libraryWrapperRef}>
            <MaterialLibrarySection onExploreCategory={setActiveSection} />
          </div>

          <ShowroomExperienceSection
            onVisitShowroom={() => setActiveSection('showroom')}
          />

          <footer
            aria-label="Showroom Location"
            className="border-t border-[#F5F2EC]/12 bg-[#141210] px-5 sm:px-8 md:px-12 py-9 md:py-12 pb-[max(2.25rem,env(safe-area-inset-bottom))]"
          >
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6 text-xs tracking-[0.1em] text-[#D8CFC2]/75">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[#FAF7F2] font-medium tracking-[0.16em]">
                  {SHOWROOM_INFO.brand}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {SHOWROOM_INFO.addressLine1}, {SHOWROOM_INFO.city}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <button
                  type="button"
                  onClick={() => setActiveSection('materials')}
                  className="min-h-[44px] inline-flex items-center hover:text-[#FAF7F2] active:text-[#FAF7F2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Material Archive
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSection('showroom')}
                  className="min-h-[44px] inline-flex items-center hover:text-[#FAF7F2] active:text-[#FAF7F2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Private Appointment
                </button>
              </div>

              <div className="tabular-nums text-[#D8CFC2]/65">
                {SHOWROOM_INFO.hours}
              </div>
            </div>
          </footer>
        </main>

        <AtelierDrawer
          activeSection={activeSection}
          onClose={() => setActiveSection(null)}
          onSwitchSection={setActiveSection}
        />
      </div>
    </MotionConfig>
  );
}
