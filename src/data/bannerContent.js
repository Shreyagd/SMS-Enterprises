// Centralized Banner Content for all pages — editable from Admin → Banners
// Each banner section is organized by page, with metadata indicating which page it belongs to

export const DEFAULT_BANNER_CONTENT = {
  // ==========================================
  // HOME PAGE BANNERS
  // ==========================================
  home: {
    hero: {
      page: 'Home Page',
      label: 'Hero Banner (Main)',
      description: 'Full-screen banner with background video, headline lines, subtext, and CTA buttons',
      visible: true,
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
      page: 'Home Page',
      label: 'Feature Strip Banner',
      description: 'Row of 5 feature badges displayed under the hero banner',
      visible: true,
      items: [
        { title: 'Superior Strength', desc: 'High load holding & tear resistance', iconUrl: '' },
        { title: 'Maximum Cling', desc: 'Keeps load tight & secure', iconUrl: '' },
        { title: 'Puncture Resistant', desc: 'Protects from damage & dust', iconUrl: '' },
        { title: 'Cost Effective', desc: 'Reduces material usage & waste', iconUrl: '' },
        { title: '100% Recyclable', desc: 'Environment friendly solution', iconUrl: '' }
      ]
    }
  },

  // ==========================================
  // ABOUT PAGE BANNERS
  // ==========================================
  about: {
    header: {
      page: 'About Us Page',
      label: 'Page Header Banner',
      description: 'Top banner with page title and subtitle',
      visible: true,
      title: 'ABOUT US',
      subtitle: 'Delivering Quality, Building Trust — Revolutionizing Package & Defining the Brand SWASTIK'
    },
    missionVision: {
      page: 'About Us Page',
      label: 'Mission & Vision Banner',
      description: 'Dark section with Vision and Mission cards side by side',
      visible: true,
      visionBadge: 'OUR VISION',
      visionTitle: 'Global Packaging Leader',
      visionText: 'To be a globally respected manufacturer and exporter of polymer and flexible packaging solutions through continuous innovation, certified quality, and sustainable business practices.',
      missionBadge: 'OUR MISSION',
      missionTitle: 'World-Class Customer Value',
      missionText: 'To deliver world-class polymer products that exceed customer expectations, embrace continuous technological advancement, and build enduring relationships with partners across Indian and International markets.'
    },
    customers: {
      page: 'About Us Page',
      label: 'Customers Marquee Banner',
      description: 'Scrolling customer logos strip with optional badge, title, and subtitle',
      visible: true,
      badge: 'TRUSTED BY',
      title: 'OUR CUSTOMERS',
      subtitle: 'Brands and manufacturers across India rely on SMS ENTERPRISES for their packaging.',
      speed: 30,
      items: Array.from({ length: 8 }, (_, i) => ({ name: `Client ${i + 1}`, logo: `/images/customers/customer-${i + 1}.svg` }))
    },
    cta: {
      page: 'About Us Page',
      label: 'Bottom CTA Banner',
      description: 'Contact trigger section at bottom of page',
      visible: true,
      title: 'Ready to Upgrade Your Packaging Strength?',
      text: 'Speak with our technical engineering team for roll samples or factory visits.',
      button: 'REQUEST PRODUCT SAMPLES'
    }
  },

  // ==========================================
  // PRODUCTS PAGE BANNERS
  // ==========================================
  products: {
    header: {
      page: 'Products Page',
      label: 'Page Header Banner',
      description: 'Hero banner with eyebrow, main title, and subtitle',
      visible: true,
      eyebrow: 'Product Catalogue',
      title: 'Packaging films & flexible packaging, engineered for your line',
      subtitle: 'Shrink & stretch films, VCI films and liners, agricultural films and multi-layer laminates. Customised to your size, thickness and print.'
    },
    customSolution: {
      page: 'Products Page',
      label: 'Custom Solution Card (Sidebar)',
      description: 'Sidebar card promoting custom solutions with CTA button',
      visible: true,
      title: 'Need a Custom Solution?',
      text: 'We offer customized sizes, thickness & properties as per your requirement.',
      buttonText: 'CONTACT US'
    },
    qualityAssurance: {
      page: 'Products Page',
      label: 'Quality Assurance Box (Sidebar)',
      description: 'Sidebar box highlighting factory guarantee',
      visible: true,
      title: 'Factory Guaranteed',
      text: '100% Virgin polymer granules used. Consistent tensile strength across every roll.'
    }
  },

  // ==========================================
  // CAREERS PAGE BANNERS
  // ==========================================
  careers: {
    hero: {
      page: 'Careers Page',
      label: 'Hero Banner',
      description: 'Main banner with title, subtitle, and View Openings button',
      visible: true,
      title: 'CAREERS',
      subtitle: 'Build your career with SMS ENTERPRISES — help us package India\'s products for the world.'
    },
    intro: {
      page: 'Careers Page',
      label: 'Why Work With Us Banner',
      description: 'Intro section with badge, title, text, and 4 perk cards',
      visible: true,
      badge: 'WHY WORK WITH US',
      title: 'Grow with a fast-growing packaging manufacturer',
      text: 'We are a hands-on team of engineers, operators, quality specialists and sales professionals. You will work on modern extrusion and printing lines, learn from experienced people, and see your work leave the factory every day.',
      perks: [
        { title: 'Learn on modern machines', desc: 'Multi-layer blown film extrusion, rotogravure printing and pouch conversion lines.' },
        { title: 'Growth from within', desc: 'We promote people who show ownership — operators become supervisors here.' },
        { title: 'Safe, supportive workplace', desc: 'Proper training, safety equipment and a team that helps each other.' },
        { title: 'Timely pay & benefits', desc: 'On-time salary, PF/ESI as applicable, and performance incentives.' }
      ]
    },
    openings: {
      page: 'Careers Page',
      label: 'Current Openings Banner',
      description: 'Section showing job openings with badge, title, and empty state text',
      visible: true,
      badge: 'CURRENT OPENINGS',
      title: 'Open positions',
      emptyText: 'There are no open positions right now, but we are always happy to hear from good people. Send us a general application below.',
      // Note: Actual job items are managed in Admin → Careers, not here
    },
    apply: {
      page: 'Careers Page',
      label: 'Apply Now Banner',
      description: 'Application form section header with badge, title, and text',
      visible: true,
      badge: 'APPLY NOW',
      title: 'Send us your application',
      text: 'Fill in your details and attach your resume. Our HR team reviews every application and will contact shortlisted candidates.'
    }
  },

  // ==========================================
  // CONTACT PAGE BANNERS
  // ==========================================
  contact: {
    header: {
      page: 'Contact Page',
      label: 'Page Header Banner',
      description: 'Top banner with CONTACT US title and subtitle',
      visible: true,
      title: 'CONTACT US',
      subtitle: 'We are here to help you! Reach out for factory visits, distributor inquiries, or sample orders.'
    },
    careersStrip: {
      page: 'Contact Page',
      label: 'Careers Strip Banner',
      description: 'Bottom strip promoting careers page with CTA button',
      visible: true,
      eyebrow: 'WE\'RE HIRING',
      title: 'Want to build your career with us?',
      text: 'See current openings in production, quality and sales — and apply online in a few minutes.',
      buttonText: 'VIEW CAREERS'
    }
  },

  // ==========================================
  // GALLERY PAGE BANNERS
  // ==========================================
  gallery: {
    header: {
      page: 'Gallery Page',
      label: 'Page Header Banner',
      description: 'Top banner with GALLERY title and subtitle',
      visible: true,
      title: 'GALLERY',
      subtitle: 'Explore our products and packaging solutions, manufacturing plants, and extrusion technology'
    },
    cta: {
      page: 'Gallery Page',
      label: 'Bottom CTA Banner',
      description: 'Information bar at bottom with icon, heading, subtext, and contact button',
      visible: true,
      icon: 'MessageSquare', // MessageSquare, Mail, Phone, etc.
      heading: 'Need More Information?',
      subtext: 'Contact us today for product samples and customized solutions.',
      buttonText: 'CONTACT US'
    }
  },

  // ==========================================
  // PRODUCT DETAIL PAGE BANNERS
  // ==========================================
  productDetail: {
    cta: {
      page: 'Product Detail Page',
      label: 'CTA Band Banner',
      description: 'Band between product details and related products with headline, text, and quote button',
      visible: true,
      titlePrefix: 'Looking for ',
      titleSuffix: '?', // Combined with product name: "Looking for {product.name}?"
      text: 'Share your application, size and quantity — our team will respond with the right specification and pricing.',
      buttonText: 'Request a Quote'
    },
    related: {
      page: 'Product Detail Page',
      label: 'Related Products Banner',
      description: 'Section title for related products grid',
      visible: true,
      title: 'Related Products'
    }
  }
};

// Merge saved content over defaults (one level deep per section)
export function mergeBannerContent(saved) {
  const merged = {};
  for (const [pageKey, pageSections] of Object.entries(DEFAULT_BANNER_CONTENT)) {
    merged[pageKey] = {};
    for (const [sectionKey, defaults] of Object.entries(pageSections)) {
      merged[pageKey][sectionKey] = { ...defaults, ...(saved?.[pageKey]?.[sectionKey] || {}) };
    }
  }
  return merged;
}

// Get all banners as a flat array for easy iteration
export function getAllBanners(bannerContent) {
  const all = [];
  for (const [pageKey, pageSections] of Object.entries(bannerContent)) {
    for (const [sectionKey, section] of Object.entries(pageSections)) {
      all.push({
        pageKey,
        sectionKey,
        page: section.page,
        label: section.label,
        description: section.description,
        visible: section.visible !== false,
        ...section
      });
    }
  }
  return all;
}