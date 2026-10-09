// Default About Us page content. Editable from Admin → About Us; saved edits are merged over these defaults.
// Text fields support **double stars** for bold words.

export const DEFAULT_ABOUT_CONTENT = {
  header: {
    visible: true,
    title: 'ABOUT US',
    subtitle: 'Delivering Quality, Building Trust — Revolutionizing Package & Defining the Brand SWASTIK'
  },
  story: {
    visible: true,
    badge: 'LEADERSHIP & VISION',
    title: 'ENGINEERING PACKAGING EXCELLENCE',
    paragraph: '**SMS ENTERPRISES** is a leading manufacturer and supplier of high-performance industrial stretch films, LDPE heavy shrink films, and BOPP multi-layer barrier solutions. We are committed to providing innovative packaging solutions that ensure product safety, reduce material waste, and improve operational efficiency.',
    quote: 'Me as an Entrepreneur with a strong passion for Innovation and Manufacturing, I am committed to build a globally recognized Business in the Polymer and Flexible Packaging Industry. Our journey is driven by a Vision to develop high-performance, Sustainable, & value-driven polymer solutions that meet the evolving needs of industries worldwide.',
    founderName: '~GD KISHORE',
    founderRole: 'Founder & Managing Entrepreneur',
    paragraph2: 'We believe that Indian manufacturing has the potential to compete with the best in the world. Our mission is to become a trusted global exporter of polymer packaging solutions, proudly representing the quality, precision, and manufacturing capabilities of **Made in India**.',
    checks: [
      { text: 'Advanced Manufacturing Technology' },
      { text: 'Strict Quality Control & Testing' },
      { text: 'Customer Focused Approach' },
      { text: 'Sustainable & Recyclable Solutions' }
    ],
    image: '/images/factory_building.jpg',
    imageBadgeTitle: 'Production Unit',
    imageBadgeText: 'Chamundeshwari Layout, Bengaluru',
    highlightTitle: 'Global Exporter Standards',
    highlightText: 'Equipped with 600 m/min Rotogravure and multi-layer blown film extrusion plants.'
  },
  stats: {
    visible: true,
    items: [
      { number: '05+', label: 'Years of Experience' },
      { number: '100+', label: 'Happy Customers' },
      { number: '40+', label: 'Team Members' },
      { number: '100%', label: 'Quality Assurance' }
    ]
  },
  pillars: {
    visible: true,
    badge: 'OUR CORE PILLARS',
    title: 'THE SWASTIK ADVANTAGE',
    subtitle: 'How we partner with logistics companies, FMCG brands, and agricultural producers across India.',
    items: [
      { title: '360° COMMITMENT', desc: 'End-to-end responsibility from virgin polymer resin sourcing to precision extrusion, spooling, and dispatch.' },
      { title: 'PARTNERING BEYOND PRODUCTS', desc: 'We assist clients in optimizing wrap tension, reducing plastic gauge consumption, and cutting shipping damages.' },
      { title: 'CERTIFIED QUALITY', desc: 'Standardized testing for elongation, tensile strength, dart impact resistance, and puncture barrier.' },
      { title: 'SMART LOGISTICS', desc: 'Fast regional dispatches across South India & streamlined container packaging for global export markets.' }
    ]
  },
  missionVision: {
    visible: true,
    visionBadge: 'OUR VISION',
    visionTitle: 'Global Packaging Leader',
    visionText: 'To be a globally respected manufacturer and exporter of polymer and flexible packaging solutions through continuous innovation, certified quality, and sustainable business practices.',
    missionBadge: 'OUR MISSION',
    missionTitle: 'World-Class Customer Value',
    missionText: 'To deliver world-class polymer products that exceed customer expectations, embrace continuous technological advancement, and build enduring relationships with partners across Indian and International markets.'
  },
  cta: {
    visible: true,
    title: 'Ready to Upgrade Your Packaging Strength?',
    text: 'Speak with our technical engineering team for roll samples or factory visits.',
    button: 'REQUEST PRODUCT SAMPLES'
  }
};

export function mergeAboutContent(saved) {
  const merged = {};
  for (const [key, defaults] of Object.entries(DEFAULT_ABOUT_CONTENT)) {
    merged[key] = { ...defaults, ...(saved?.[key] || {}) };
  }
  return merged;
}
