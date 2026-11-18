// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE — edit text, contacts & projects
// ─────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL;

/** img('mouawad-1')        → large (1920px)
 *  img('mouawad-1', 'sm')  → small (960px) for grids & thumbnails */
export const img = (name, size = 'lg') => `${BASE}images/${name}-${size}.webp`;

export const site = {
  name: 'Qusai Swed',
  firstName: 'Qusai',
  lastName: 'Swed',
  role: 'Interior Design & Fit-Out Specialist',
  location: 'Qatar',
  // ↓↓ replace with the real contact details ↓↓
  email: 'hello@qusaiswed.com',
  phone: '+974 0000 0000',
  whatsapp: '97400000000', // digits only, with country code
  instagram: 'https://instagram.com/',
  linkedin: 'https://linkedin.com/',
};

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/works', label: 'Works' },
  { to: '/contact', label: 'Contact' },
];

export const projects = [
  {
    slug: 'mouawad',
    name: 'Mouawad',
    tagline: 'Crystal chandeliers, arched niches and a golden ombré glow.',
    category: 'Fine Jewellery Boutique',
    images: ['mouawad-1', 'mouawad-2', 'mouawad-3'],
  },
  {
    slug: 'tiffany',
    name: 'Tiffany & Co.',
    tagline: 'A sculpted wave façade in the house’s signature blue.',
    category: 'Fine Jewellery Boutique',
    images: ['tiffany-2', 'tiffany-1', 'tiffany-3'],
  },
  {
    slug: 'vacheron-constantin',
    name: 'Vacheron Constantin',
    tagline: 'Geometric brass screens framing a story of haute horlogerie.',
    category: 'Haute Horlogerie Boutique',
    images: ['vacheron-constantin-2', 'vacheron-constantin-1', 'vacheron-constantin-3'],
  },
  {
    slug: 'chopard',
    name: 'Chopard',
    tagline: 'Deep navy and gold, orchestrated around a sculpted rotunda.',
    category: 'Jewellery & Watch Boutique',
    images: ['chopard-3', 'chopard-1', 'chopard-2'],
  },
  {
    slug: 'alfardan-jewellery',
    name: 'Alfardan Jewellery',
    tagline: 'A grand gilded portal and rich timber colonnades.',
    category: 'Multi-Brand Jewellery House',
    images: [
      'alfardan-jewellery-4',
      'alfardan-jewellery-1',
      'alfardan-jewellery-2',
      'alfardan-jewellery-3',
      'alfardan-jewellery-5',
    ],
  },
  {
    slug: 'noudar',
    name: 'Noudar',
    tagline: 'Aubergine velvet beneath a luminous golden arch.',
    category: 'Jewellery Boutique',
    images: ['noudar-1', 'noudar-3', 'noudar-2'],
  },
  {
    slug: 'marli',
    name: 'Marli New York',
    tagline: 'Cobalt volumes cut through with a lattice of light.',
    category: 'Fine Jewellery Pavilion',
    images: ['marli-1', 'marli-2', 'marli-3'],
  },
  {
    slug: 'chaumet',
    name: 'Chaumet',
    tagline: 'Parisian calm in navy lacquer and warm timber.',
    category: 'Haute Joaillerie Boutique',
    images: ['chaumet-1', 'chaumet-2', 'chaumet-3'],
  },
  {
    slug: 'samer-halimeh',
    name: 'Samer Halimeh',
    tagline: 'An electric-blue pavilion crowned with a sculptural rhino.',
    category: 'Jewellery Pavilion',
    images: ['samer-halimeh-2', 'samer-halimeh-1'],
  },
  {
    slug: 'piranesi',
    name: 'Piranesi',
    tagline: 'Gilded vitrines set within a dark, intimate envelope.',
    category: 'Fine Jewellery Boutique',
    images: ['piranesi-1'],
  },
  {
    slug: 'mahallati',
    name: 'Mahallati',
    tagline: 'Soft arches and blush-lit display windows.',
    category: 'Jewellery Boutique',
    images: ['mahallati-1'],
  },
  {
    slug: 'casato',
    name: 'Casato',
    tagline: 'A warm amber glow held in a minimal black frame.',
    category: 'Jewellery Boutique',
    images: ['casato-2', 'casato-1'],
  },
  {
    slug: 'busatti',
    name: 'Busatti 1947',
    tagline: 'Bold Italian red set inside a black steel frame.',
    category: 'Jewellery Pavilion',
    images: ['busatti-1', 'busatti-2'],
  },
  {
    slug: 'molu',
    name: 'Molu',
    tagline: 'A luminous coffered gateway in champagne gold.',
    category: 'Jewellery Pavilion',
    images: ['molu-1'],
  },
  {
    slug: 'u-los-angeles',
    name: 'U Los Angeles',
    tagline: 'Emerald niches, brass ovals and a floating canopy.',
    category: 'Jewellery Boutique',
    images: ['u-los-angeles-1', 'u-los-angeles-2', 'u-los-angeles-3'],
  },
  {
    slug: 'silvia-furmanovich',
    name: 'Silvia Furmanovich',
    tagline: 'Gilded lettering over a terracotta jewel wall.',
    category: 'Fine Jewellery Pavilion',
    images: ['silvia-furmanovich-1'],
  },
];

// Shared meta shown on every project page (edit per project if needed by
// adding `scope`, `sector`, `year` fields to a project above)
export const projectDefaults = {
  sector: 'Luxury Retail',
  scope: 'Interior Design & Fit-Out',
  location: 'Qatar',
};

export const heroSlides = ['mouawad', 'tiffany', 'chopard', 'alfardan-jewellery', 'chaumet'];
export const featured = ['mouawad', 'tiffany', 'vacheron-constantin', 'chopard', 'alfardan-jewellery', 'noudar', 'marli', 'casato'];

export const services = [
  {
    no: '01',
    title: 'Interior Design',
    short: 'Concepts that translate a maison’s identity into space.',
    text:
      'From the first sketch to the final detail drawing — space planning, display strategy, lighting intent and a material story that speaks the brand’s language.',
    points: ['Concept & space planning', 'Display & lighting strategy', 'Detail & shop drawings', 'Brand guideline alignment'],
    image: 'chaumet-2',
  },
  {
    no: '02',
    title: 'Fit-Out & Execution',
    short: 'Turnkey delivery, executed to the millimetre.',
    text:
      'Coordinating joinery, metalwork, glass vitrines, ceilings and signage on site — keeping programme, quality and budget in step until handover.',
    points: ['Joinery & showcase coordination', 'Contractor & trade management', 'Programme & cost control', 'Snagging & handover'],
    image: 'mouawad-3',
  },
  {
    no: '03',
    title: 'Site Safety',
    short: 'Every site run safely, without compromising the finish.',
    text:
      'Site safety reviews, method statements and daily supervision — protecting people, adjacent tenants and the luxury finishes being installed.',
    points: ['Site safety reviews', 'Risk assessments & method statements', 'Daily supervision', 'Quality & compliance checks'],
    image: 'practice-safety',
  },
  {
    no: '04',
    title: 'Materials & Finishes',
    short: 'A curated palette that feels as precious as the jewels.',
    text:
      'Selecting and sampling stones, metals, lacquers, fabrics and glass — then specifying them precisely so what is built matches what was imagined.',
    points: ['Material & finishes palette', 'Sampling & mock-ups', 'Specifications', 'Supplier coordination'],
    image: 'practice-materials',
  },
];

export const process = [
  { no: 'I', title: 'Brief', text: 'Understanding the brand, the location and the guidelines.' },
  { no: 'II', title: 'Concept', text: 'Space planning, mood, materials and lighting intent.' },
  { no: 'III', title: 'Detailing', text: 'Shop drawings, specifications and approvals.' },
  { no: 'IV', title: 'Fit-Out', text: 'On-site execution, safety and quality control.' },
  { no: 'V', title: 'Handover', text: 'Snagging, final finishes and a boutique ready to open.' },
];

export const about = {
  intro:
    'I design and deliver luxury retail interiors — boutiques where architecture, light and material are tuned to the value of what they display.',
  body: [
    'Working across interior design, fit-out and site safety, I take a project from the brand’s guidelines to a finished, opening-ready space. My work spans some of the world’s most recognised jewellery and watch maisons, each with its own language of colour, material and craft.',
    'I believe luxury lives in the detail: the radius of a showcase edge, the warmth of a light, the way a material catches the eye. And none of it matters unless the site is run safely and the finish is flawless on opening day.',
  ],
  values: [
    { title: 'Precision', text: 'Millimetre-level detailing from drawing to site.' },
    { title: 'Craft', text: 'Materials and finishes worthy of the brands they frame.' },
    { title: 'Safety', text: 'Disciplined, safe sites — always.' },
  ],
  practice: [
    { image: 'practice-safety', title: 'Site Safety Review' },
    { image: 'practice-fitout', title: 'Completed Interior Fit-Out' },
    { image: 'practice-materials', title: 'Material & Finishes Palette' },
  ],
  // Career Overview — add real entries and this section appears on the About page:
  // { years: '2021 — Present', role: 'Fit-Out Specialist', company: 'Company name', text: 'Short description' },
  experience: [],
};
