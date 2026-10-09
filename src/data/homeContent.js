// Default home page content. Everything here is editable from Admin → Home Page;
// saved edits are merged over these defaults, so new fields always have a value.

export const DEFAULT_HOME_CONTENT = {
  hero: {
    visible: true,
    pill: 'SWASTIK BRAND PACKAGING EXCELLENCE',
    line1: 'STRONGER WRAP.',
    line2: 'SAFER LOAD.',
    highlight: 'MAXIMUM VALUE.',
    subtext: 'High performance industrial stretch films and polymer flexible packaging solutions manufactured to protect your products during storage and international transportation.',
    primaryButton: 'EXPLORE PRODUCTS',
    secondaryButton: 'GET A QUOTE',
    video: '/videos/hero-3.mp4',
    poster: '/images/hero_pallet.jpg'
  },
  features: {
    visible: true,
    items: [
      { title: 'Superior Strength', desc: 'High load holding & tear resistance' },
      { title: 'Maximum Cling', desc: 'Keeps load tight & secure' },
      { title: 'Puncture Resistant', desc: 'Protects from damage & dust' },
      { title: 'Cost Effective', desc: 'Reduces material usage & waste' },
      { title: '100% Recyclable', desc: 'Environment friendly solution' }
    ]
  },
  why: {
    visible: true,
    image: '/images/pallet_machine.jpg',
    imageBadge: 'Industrial Turntable Testing',
    badge: 'SUPERIOR MANUFACTURING',
    title: 'WHY CHOOSE SMS ENTERPRISES?',
    lead: 'Our industrial stretch films and polymer flexible packaging solutions are manufactured with advanced multi-layer technology and strict quality control to deliver consistent performance you can rely on.',
    points: [
      { title: 'Excellent load stability', desc: 'High tension recovery prevents shifting during road and container transit.' },
      { title: 'Suitable for all wrapping machines', desc: 'Engineered for high-speed automated turntable and orbital wrappers.' },
      { title: 'UV resistant options available', desc: 'Up to 12-month outdoor weathering protection for agricultural and yard storage.' },
      { title: 'Customized sizes & thickness', desc: 'Tailored micron gauges (8µm to 120µm) and widths engineered to your payload.' }
    ],
    button: 'LEARN MORE ABOUT US'
  },
  featured: {
    visible: true,
    badge: 'FLAGSHIP PRODUCTS',
    title: 'ENGINEERED PACKAGING FILMS',
    subtitle: 'High performance stretch films, LDPE shrink rolls, and barrier laminates for modern industry.',
    count: 6,
    button: 'VIEW ALL PRODUCT LINES'
  },
  infra: {
    visible: true,
    badge: 'PRECISION MACHINERY',
    title: 'WORLD-CLASS INFRASTRUCTURE',
    button: 'VISIT INFRASTRUCTURE GALLERY',
    cards: [
      { image: '/images/extrusion_plant.jpg', title: 'Multi-Layer Blown Film Extrusion Plant', desc: 'Towering continuous bubble plant delivering micron uniformity, puncture barrier, and optical clarity.' },
      { image: '/images/rotogravure_press.jpg', title: 'Rotogravure Printing Machine (600 m/min)', desc: 'Ultra-fast multi-color rotogravure printing unit ensuring vibrant branding and defect-free registration.' },
      { image: '/images/packaging_showroom.jpg', title: 'Laminated Rolls & Pouch Conversion Lines', desc: 'Equipped with Center sealing, Side sealing, and UNITEK 3-side seal pouch machines.' }
    ]
  },
  stats: {
    visible: true,
    items: [
      { number: '05+', label: 'YEARS OF EXPERIENCE' },
      { number: '40+', label: 'TEAM MEMBERS' },
      { number: '100+', label: 'HAPPY CUSTOMERS' },
      { number: '30+', label: 'VENDOR PARTNERS' }
    ]
  },
  cta: {
    visible: true,
    title: 'Need Customized Packaging or Volume Bulk Supply?',
    text: 'We deliver factory-direct customized width, micron gauges, and print options from our Bengaluru unit.',
    primaryButton: 'REQUEST FACTORY QUOTE',
    secondaryButton: 'CONTACT US'
  }
};

// Saved content over defaults, one level deep per section (lists are replaced as a whole)
export function mergeHomeContent(saved) {
  const merged = {};
  for (const [key, defaults] of Object.entries(DEFAULT_HOME_CONTENT)) {
    merged[key] = { ...defaults, ...(saved?.[key] || {}) };
  }
  return merged;
}
