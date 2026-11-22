export type DrawerCategory =
  | 'materials'
  | 'veneers'
  | 'plywood'
  | 'laminates'
  | 'panels'
  | 'showroom';

export interface SurfaceCategory {
  id: Exclude<DrawerCategory, 'materials' | 'showroom'>;
  index: string;
  title: string;
  subtitle: string;
  specification: string;
  description: string;
  image: string;
  imageAlt: string;
  details: string[];
}

export const HERO_MEDIA = {
  src: '/src/assets/images/hero_walnut_interior_1795338010227.jpg',
  alt: 'Minimalist sunlit architectural residence featuring bookmatched walnut wall paneling, travertine bench, and limestone floors',
};

export const SURFACE_COLLECTION: SurfaceCategory[] = [
  {
    id: 'plywood',
    index: '01',
    title: 'Premium Plywood',
    subtitle: 'Calibrated hardwood & birch cores',
    specification: '4 mm – 25 mm · IS:710 BWP & E0 low-emission',
    description:
      'Precision-calibrated multi-ply boards engineered for structural stability, seamless edge detailing, and bespoke architectural millwork.',
    image: '/src/assets/images/library_plywood_featured_1795338224237.jpg',
    imageAlt:
      'Minimalist interior living room with bespoke birch and walnut architectural plywood cabinetry and shelving in natural morning light',
    details: ['Zero-core gap Gurjan & European Birch', 'Boiling Waterproof (BWP) marine resin', 'Precision thickness tolerance (±0.2 mm)'],
  },
  {
    id: 'veneers',
    index: '02',
    title: 'Natural Wood Veneers',
    subtitle: 'Quarter-cut & bookmatched flitches',
    specification: '0.6 mm – 1.5 mm · Sequential architectural bundles',
    description:
      'Hand-selected American walnut, white oak, and Burmese teak slices curated in sequential bundles for uninterrupted grain continuity.',
    image: '/src/assets/images/library_veneers_oak_walnut_1795338223747.jpg',
    imageAlt:
      'Bookmatched quarter-cut American walnut and European white oak natural wood veneer sheets on a warm travertine drafting table',
    details: ['Crown, quarter & rift grain selections', 'Smoked, fumed & raw timber tones', 'Matched full-height 10 ft architectural sheets'],
  },
  {
    id: 'laminates',
    index: '03',
    title: 'Decorative Laminates',
    subtitle: 'Ultra-matte mineral & timber textures',
    specification: '1.0 mm – 12 mm · Anti-fingerprint & compact HPL',
    description:
      'Velvety soft-touch mineral solids and synchronized woodgrain laminates crafted for high-traffic kitchens, wardrobes, and workspaces.',
    image: '/src/assets/images/library_laminates_matte_1795338224992.jpg',
    imageAlt:
      'Stepped minimalist studio display of ultra-matte decorative laminates in warm sand, smoked walnut, and charcoal clay on limestone',
    details: ['Zero-reflection anti-fingerprint surface', 'High abrasion & thermal resistance', 'Color-matched solid core edge profiles'],
  },
  {
    id: 'panels',
    index: '04',
    title: 'Architectural Panels',
    subtitle: 'Fluted timber & acoustic wall systems',
    specification: '18 mm – 24 mm · Prefinished modular wall claddings',
    description:
      'Sculptural fluted walnut profiles and sound-absorbing timber slats designed to bring vertical rhythm and acoustic warmth to expansive rooms.',
    image: '/src/assets/images/library_architectural_panels_1795338223488.jpg',
    imageAlt:
      'Floor-to-ceiling fluted smoked walnut architectural wall panels framing a sunlit minimalist limestone hallway',
    details: ['Linear, micro-reeded & bevelled flutes', 'Integrated acoustic felt backing options', 'Concealed tongue-and-groove shadow joinery'],
  },
];

export const SHOWROOM_INFO = {
  brand: 'VENEER & FORM',
  city: 'Gwalior, India',
  addressLine1: 'Plot 14, Patel Nagar, City Centre',
  addressLine2: 'Gwalior, Madhya Pradesh 474011',
  hours: 'Monday – Saturday · 10:30 – 19:30 IST',
  phone: '+91 751 402 8910',
  email: 'atelier@veneerandform.in',
  image: '/src/assets/images/showroom_gwalior_atelier_1795338011204.jpg',
  imageAlt: 'Veneer & Form showroom gallery in Gwalior with vertical walnut and oak sample monoliths',
};

export const SHOWROOM_EXPERIENCE_MEDIA = {
  src: '/src/assets/images/showroom_experience_gallery_1795339709624.jpg',
  alt: 'Contemporary Veneer & Form showroom interior with full-height sliding walnut and oak display panels and curated plywood sample table',
};

