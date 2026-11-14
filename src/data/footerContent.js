// Default footer content. Everything here is editable from Admin → Footer;
// saved edits are merged over these defaults, so new fields always have a value.

export const DEFAULT_FOOTER_CONTENT = {
  brand: {
    visible: true,
    tagline: 'Packaging Solutions',
    bio: 'Manufacturer and global exporter of high-performance stretch films, LDPE shrink packaging, and BOPP multi-layer barrier solutions. Driven by innovation, quality, and sustainable manufacturing practices.',
    gstinLabel: 'GSTIN:'
  },
  quickLinks: {
    visible: true,
    heading: 'Quick Links',
    // Links are generated from navigation pages; these are labels
    items: [
      { label: 'Home', page: 'home' },
      { label: 'Our Products', page: 'products' },
      { label: 'About Us', page: 'about' },
      { label: 'Careers', page: 'careers' },
      { label: 'Contact Us', page: 'contact' }
    ]
  },
  productLines: {
    visible: true,
    heading: 'Product Lines',
    // Products are dynamically loaded from the products catalog
    // This section just controls the heading and visibility
  },
  contact: {
    visible: true,
    heading: 'Registered Unit',
    // Address, phone, email, workingHours come from settings
  },
  copyright: {
    visible: true,
    text: '© {year} {companyName}. All Rights Reserved.'
  }
};

// Saved content over defaults, one level deep per section
export function mergeFooterContent(saved) {
  const merged = {};
  for (const [key, defaults] of Object.entries(DEFAULT_FOOTER_CONTENT)) {
    merged[key] = { ...defaults, ...(saved?.[key] || {}) };
  }
  return merged;
}