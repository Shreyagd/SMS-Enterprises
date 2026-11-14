// Default Careers page content. Editable from Admin → Careers; saved edits are merged over these defaults.
// The openings below are SAMPLES — replace them with real vacancies from the admin portal.

export const DEFAULT_CAREERS_CONTENT = {
  hero: {
    title: 'CAREERS',
    subtitle: 'Build your career with SMS ENTERPRISES — help us package India’s products for the world.'
  },
  shortDescription: {
    visible: true,
    title: 'About this role',
    text: 'Join our manufacturing team and contribute to producing high-quality packaging films that protect products across India. This is a hands-on role where you will see the direct impact of your work every day.'
  },
  highlights: {
    visible: true,
    title: 'Key highlights',
    items: [
      'Competitive salary with annual increments',
      'Comprehensive health and safety training',
      'Opportunity to work with modern extrusion technology',
      'Clear career progression path from operator to supervisor',
      'PF/ESI benefits and performance bonuses',
      'Supportive team culture with experienced mentors'
    ]
  },
  intro: {
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
    visible: true,
    badge: 'CURRENT OPENINGS',
    title: 'Open positions',
    emptyText: 'There are no open positions right now, but we are always happy to hear from good people. Send us a general application below.',
    items: [
      {
        title: 'Machine Operator – Blown Film Extrusion',
        department: 'Production',
        location: 'Bengaluru',
        type: 'Full-time',
        experience: '1–4 years',
        description: 'Run and monitor multi-layer blown film lines, maintain gauge and quality, and follow shift safety practices.',
        shortDescription: 'Operate and maintain our multi-layer blown film extrusion lines to produce high-quality packaging films.',
        highlights: [
          'Hands-on operation of modern extrusion equipment',
          'Monitor film quality (thickness, gauge, optical properties)',
          'Follow safety protocols and maintain clean work area',
          'Shift-based role with overtime opportunities'
        ]
      },
      {
        title: 'Quality Control Executive',
        department: 'Quality',
        location: 'Bengaluru',
        type: 'Full-time',
        experience: '1–3 years',
        description: 'Test film thickness, tensile strength and seal quality; maintain QC records and inspect finished rolls before dispatch.',
        shortDescription: 'Ensure our packaging films meet the highest quality standards through rigorous testing and inspection.',
        highlights: [
          'Perform thickness, tensile strength, and seal integrity tests',
          'Maintain detailed QC records and test reports',
          'Inspect finished rolls before dispatch',
          'Work with production to resolve quality issues'
        ]
      },
      {
        title: 'Sales Executive – Industrial Packaging',
        department: 'Sales',
        location: 'Bengaluru / Field',
        type: 'Full-time',
        experience: '2–5 years',
        description: 'Develop B2B customers for stretch, shrink and laminated films; prepare quotations and follow up on orders.',
        shortDescription: 'Drive growth by acquiring new B2B customers for our industrial packaging film portfolio.',
        highlights: [
          'Identify and approach potential customers in target industries',
          'Prepare and present quotations for stretch/shrink/laminated films',
          'Manage customer relationships and follow up on orders',
          'Travel to client sites across the region'
        ]
      }
    ]
  },
  apply: {
    badge: 'APPLY NOW',
    title: 'Send us your application',
    text: 'Fill in your details and attach your resume. Our HR team reviews every application and will contact shortlisted candidates.'
  }
};

export function mergeCareersContent(saved) {
  const merged = {};
  for (const [key, defaults] of Object.entries(DEFAULT_CAREERS_CONTENT)) {
    merged[key] = { ...defaults, ...(saved?.[key] || {}) };
  }
  return merged;
}
