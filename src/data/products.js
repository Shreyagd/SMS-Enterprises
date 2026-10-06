// Product catalogue sourced from "website doc.docx".
// Each product page is built from `sections`: { title, text?: [], list?: [], table?: { head, rows } }.
// List items written as "Label: description" render the label in bold.

// Main headings from the product doc, in display order
export const PRODUCT_CATEGORIES = ['FMCG', 'Industrial', 'Agri'];

const IMG = '/images/products/';

const CATALOGUE = [
  {
    id: 'ldpe-lamination-film',
    slug: 'ldpe-lamination-film',
    name: 'LDPE Lamination Film',
    category: 'Industrial',
    badge: 'Sealant Layer',
    featured: false,
    subtitle: 'Multi-layer co-extruded PE sealant film for flexible packaging laminates.',
    description: 'LDPE Lamination Film is a specialized, multi-layer co-extruded polyethylene film engineered to serve as the inner sealant and functional backing layer in flexible packaging laminates.',
    thickness: '20 - 150+ Micron',
    width: 'Custom',
    elongation: 'SIT 95°C - 125°C',
    coreSize: '3-Layer / 5-Layer Co-ex PE',
    image: '/images/packaging_showroom.jpg',
    images: ['/images/packaging_showroom.jpg', '/images/rotogravure_press.jpg'],
    applications: ['Food & snack pouches', 'Spice, liquid & dairy packs', 'Personal care & industrial bags'],
    sections: [
      {
        title: 'How It Works',
        text: ['In composite packaging (pouches, sachets, and roll stock), outer materials like Polyester (PET), BOPP, or Aluminum Foil provide printability and barrier properties, but they cannot seal on their own. LDPE lamination film is permanently bonded (via solventless or solvent-based adhesive lamination) to these substrates. When passed through heated sealing jaws, it melts quickly to form an airtight, leak-proof, and burst-resistant hermetic seal.']
      },
      {
        title: 'Key Film Types & Formulations',
        list: [
          'Natural Clear (Transparent) Lamination Film: High-clarity grade used when consumers need to see the packaged product through transparent windows or clear pouches.',
          'Milky White (Opaque) Lamination Film: Formulated with high-opacity titanium dioxide (TiO₂). Enhances printed graphic contrast, eliminates the need for full white ink coverage, and shields light-sensitive goods.',
          'Metallocene High-Integrity (mLLDPE) Sealant Film: Blended with metallocene plastomers for ultra-low sealing temperatures, exceptional hot-tack, and the ability to seal through grease, liquid oils, or dusty powders.',
          'Two-Tone / Colored Lamination Film: Specialty co-extruded films (such as Black/White or Yellow/White) for liquid pouches and specialized industrial packaging.',
          'Low-SIT (Low Seal Initiation Temperature) Film: Engineered to initiate seals at lower temperatures, boosting machine speeds on high-speed Form-Fill-Seal (FFS) lines without thermal distortion.'
        ]
      },
      {
        title: 'Core Technical Features',
        list: [
          'High Hot-Tack & Seal-Through Contamination: Melts and bonds securely even when sealing surfaces are contaminated with fine powders, fat droplets, or moisture.',
          'Consistent Corona Treatment: Treated on the lamination side to a precise surface tension (38 to 44 dynes/cm), ensuring permanent adhesive bonding with zero delamination risk.',
          'Controlled Slip & COF (Coefficient of Friction): Tailored slip properties ensure smooth web passage across high-speed lamination and bag-making machines without wrinkling or telescoping.',
          'Puncture & Dart Drop Resistance: Absorbs mechanical and hydraulic shock during transit, preventing bag rupture during crate drops.',
          'Food Contact Safety: Manufactured from 100% virgin, food-grade resins—free from plasticizers, heavy metals, or toxic slip additives—ensuring zero odor or taint transfer.'
        ]
      },
      {
        title: 'Technical Properties & Specifications',
        table: {
          head: ['Property / Parameter', 'Test Standard', 'Typical Specification Range'],
          rows: [
            ['Film Structure', 'Blown Co-Extrusion', '3-Layer / 5-Layer Co-Ex PE'],
            ['Resin Matrix', 'ISO 1183', 'Pure Virgin LDPE + LLDPE + mLLDPE'],
            ['Thickness Range', 'ASTM D5947 / ISO 4593', '20 µm to 150+ µm (Typically 25, 30, 40, 50, 75, 100 µm)'],
            ['Surface Treatment', 'ASTM D2578', 'One-side Corona Treated: 38 – 44 Dynes/cm'],
            ['Coefficient of Friction (COF)', 'ASTM D1894', 'Dynamic COF: 0.18 – 0.28 (Untreated side)'],
            ['Seal Initiation Temp (SIT)', 'Heat Seal Curve', '95°C to 125°C (Based on formulation)'],
            ['Seal Strength', 'ASTM F88', '≥ 20 to 50+ N / 15 mm (Depends on micron)'],
            ['Dart Impact Strength', 'ASTM D1709', '≥ 250 – 600+ g'],
            ['Tensile Strength (MD/TD)', 'ASTM D882', 'MD: ≥ 24 – 35 MPa / TD: ≥ 20 – 30 MPa'],
            ['Compliance', 'International Standards', 'US FDA 21 CFR 177.1520 / EU 10/2011 / IS 9845']
          ]
        }
      },
      {
        title: 'Common Laminate Combinations & Sector Formats',
        text: ['LDPE lamination film is the backbone of virtually all multi-layer flexible packaging formats across diverse industries:'],
        table: {
          head: ['Sector', 'Laminate', 'Formats', 'Uses'],
          rows: [
            ['Food & Snacks', 'PET + LDPE / BOPP + Met-BOPP + LDPE', 'Center-seal pillow pouches, continuous VFFS rolls', 'Namkeen, chips, biscuits, dry fruits, pasta, confectionery'],
            ['Spices, Seasonings & Powders', 'PET + Met-PET + LDPE', '3-side seal sachets, stand-up zipper pouches (Doypacks)', 'Ground spices (Haldi, Mirch), blended masalas, instant mixes, protein powders'],
            ['Liquid Packaging & Dairy', 'PET + Nylon + LDPE / 5-Layer Co-Ex PE', 'Spouted stand-up pouches, pillow pouches', 'Edible cooking oils, ghee, liquid milk, sauces, fruit concentrates'],
            ['Personal Care & Home Hygiene', 'PET + White LDPE', 'Refill spouted packs, flat sachets, quad-seal bags', 'Liquid hand soap, shampoo sachets, laundry detergent powders, floor cleaner refills'],
            ['Heavy Agriculture & Industrial', 'PET + PE / BOPA + Alu Foil + PE', 'Side-gusset bags, heavy-duty sacks, D-cut bags', '5 kg–10 kg Atta (flour) sacks, pesticide powders, water-soluble fertilizers, hardware components']
          ]
        }
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Maximizes Converter Line Speeds: Tight gauge tolerance (±3% to 5%) and consistent slip ensure smooth runnability at 300+ meters per minute on solventless laminators.',
          'Drastically Cuts Packaging Rejections: Eliminates pouch leakage, seam opening, and pinhole failures on end-customer pouch-filling lines.',
          'Enhanced Shelf Appeal: Clean optical clarity or brilliant milky-white opacity gives finished consumer pouches a crisp, premium look.',
          'Cost Optimization (Downgauging): High-strength metallocene formulations allow converters to use thinner micron films while delivering equal or superior seal performance.',
          '100% Recyclable: Polyethylene base fits directly into circular PE recycling streams (RIC #4 LDPE).'
        ]
      }
    ]
  },
  // ───────────────────────── Shrink & Stretch Films ─────────────────────────
  {
    id: 'ldpe-shrink-film',
    slug: 'ldpe-shrink-film',
    name: 'LDPE Shrink Film',
    category: 'FMCG',
    badge: 'Secondary Packaging',
    featured: true,
    subtitle: 'Industry standard for secondary packaging, bundling and surface transit protection.',
    description: 'Low-Density Polyethylene (LDPE) Shrink film is the Industry standard for secondary packaging, bundling, and surface transit protection. Engineered for high tensile strength and puncture resistance, LDPE film provides superior load stability for heavy beverage packs (cans, PET bottles, glass jars) as well as bulk industrial components, building materials, and palletized loads.',
    thickness: '30 - 200 Micron',
    width: '150 mm - 2000 mm',
    elongation: 'Up to 60% MD / 20-40% CD shrink',
    coreSize: 'Film Rolls & Bags',
    image: '/images/products/ldpe_shrink_film_1.jpeg',
    images: ['/images/products/ldpe_shrink_film_1.jpeg', '/images/products/ldpe_shrink_film_2.jpeg'],
    applications: ['Beverage multipacks (cans, PET, glass)', 'Industrial components & machinery', 'Building materials & palletized loads'],
    sections: [
      {
        title: 'Performance Properties',
        table: {
          head: ['Property', 'Typical Value / Spec', 'Packaging Significance'],
          rows: [
            ['Thickness Range', '30 to 200 microns', 'Flexible enough for beverage cans; heavy enough for bricks and machinery'],
            ['Shrink Ratio', 'Up to 60% MD / 20–40% CD', 'Controlled tight wrap without crushing lightweight or hollow containers'],
            ['Shrink Temperature', '160°C – 210°C', 'Compatible with standard industrial shrink tunnels and heat guns'],
            ['Tensile & Dart Impact', 'High elongation and tear resistance', 'Prevents bursting when handling jagged corners or heavy unitized loads'],
            ['Moisture / Dust Barrier', 'Non-porous polyethylene base', 'Protects goods against rain, dust, humidity, and transit grime']
          ]
        }
      },
      {
        title: 'Specifications',
        table: {
          head: ['Specification', 'Details'],
          rows: [
            ['Material', 'LDPE (Low-Density Polyethylene)'],
            ['Width', '150 mm to 2000 mm'],
            ['Thickness', 'Starting from 35 Micron'],
            ['Colors', 'Natural & Opaque White'],
            ['Form', 'Film Rolls & Bags'],
            ['Additives', 'UV Protection, VCI & Antistatic'],
            ['Packaging Type', 'Secondary & Tertiary Packaging'],
            ['Recyclability', 'Recyclable LDPE Film']
          ]
        }
      },
      {
        title: 'Business Benefits',
        list: [
          'Cost Reduction Over Corrugated Boxes: Eliminates heavy cardboard trays and master cartons, slashing secondary material costs by up to 40%.',
          'Optimized Freight & Storage: Reduces total package weight and volume, increasing pallet loading density and lowering shipping emissions.',
          'Damage & Tamper Prevention: Delivers a tight, tamper-evident outer seal that protects beverage multipacks and palletized freight from moisture, scuffing, and pilferage.',
          '100% Recyclable: Polyethylene is classified under Resin Identification Code (LDPE), easily integrated into industrial closed-loop recycling streams.'
        ]
      },
      {
        title: 'Key Features',
        list: [
          'High Clarity and Gloss for enhanced product visibility.',
          'Excellent Durability with high tensile strength and tear resistance.',
          'Heat Shrink Capability for a tight and secure wrap.',
          'Flexibility in Thickness to meet diverse packaging requirements.',
          'Moisture and Dust Resistance for added product protection.',
          'Customization Options in size, colour, and printing.'
        ]
      },
      {
        title: 'Industries Served',
        text: ['LDPE Shrink Film is widely used across numerous industries, including but not limited to:'],
        list: [
          'Manufacturing and Industrial Packaging: For bundling and securing goods such as machinery components.',
          'Beverage and Bottling Companies: For wrapping multipack bottles and cans.',
          'Retailers and E-Commerce Businesses: For secure and clear product packaging that enhances shelf appeal.'
        ]
      },
      {
        title: 'Is LDPE Shrink Film Recyclable?',
        text: ['Yes, LDPE Shrink Film is 100% Recyclable, it can be reprocessed into new packaging products also. Manufacturers should ensure proper disposal methods or recycling partnerships for sustainable use.']
      }
    ]
  },
  {
    id: 'stretch-hood-film',
    slug: 'stretch-hood-film',
    name: 'Stretch Hood / Shrink Hood Film',
    category: 'Industrial',
    badge: 'Heat-Free Palletizing',
    featured: true,
    subtitle: 'High-performance stretch hood film for beverage & industrial palletizing.',
    description: 'Our Stretch hood film is an advanced pallet packaging solution engineered from specialized blends of Low-Density Polyethylene (LDPE), Linear Low-Density Polyethylene (LLDPE), and high-elasticity polymers such as EVA. Supplied as continuous gusseted tubing, the film is mechanically stretched in both directions by an automated hooding applicator, pulled down over the entire pallet load, and released. The inherent elastic memory creates a continuous, high-tension wrap without requiring any heat tunnels or open flames.',
    thickness: '50 - 140 Micron',
    width: '1,000 mm - 2,400 mm (open)',
    elongation: 'Dual-directional elastic memory',
    coreSize: '76 mm (3") / 152 mm (6")',
    image: '/images/products/stretch_hood_film_roll_1.jpeg',
    images: ['/images/products/stretch_hood_film_roll_1.jpeg', '/images/products/stretch_hood_film_roll_2.jpeg'],
    applications: ['Beverage bottling & canning pallets', 'Construction & building materials', 'Chemicals, white goods & electronics'],
    sections: [
      {
        title: 'Key Features',
        list: [
          'Complete 5-Sided Weatherproofing: Forms a seamless, waterproof barrier over the top and all four vertical sides, safeguarding products from rain, dust, UV degradation, and transit moisture.',
          'Dual-Directional Elastic Memory: Snugly conforms to uniform or irregular loads, delivering exceptional horizontal clamping force and vertical load containment down to the pallet base.',
          'Heat-Free Cold Application: Eliminates the fire hazard, gas utility costs, and factory heat buildup associated with thermal shrink tunnels—making it suitable for flammable, temperature-sensitive, or pressurized products.',
          'High Optical Clarity: Transparent formulation allows easy scannability of barcodes, RFID tags, and warehouse labels directly through the film without unpacking.',
          'Anti-Foil Adhesion (Non-Sticky Exterior): Does not stick to neighbouring pallet hoods inside shipping containers or warehouse staging racks, preventing tear damage during loading and unloading.'
        ]
      },
      {
        title: 'General Technical Specifications',
        table: {
          head: ['Parameter', 'Specification'],
          rows: [
            ['Structure', '3-Layer / 5-Layer multi layered Co-extruded Blown Film'],
            ['Base Polymers', 'LDPE / mLLDPE / EVA / Metallocene Plastomers'],
            ['Supply Form', 'Gusseted Tubing on a paper core (Internal Gussets)'],
            ['Roll Width (Open)', '1,000 mm – 2,400 mm'],
            ['Gusset Depth', '300 mm – 600 mm'],
            ['Standard Micron Range', '50 – 140 µm'],
            ['Surface Treatment', 'UV-stabilized (6, 12, 18, or 24 months), Anti-static, Low-slip outer'],
            ['Core Diameter', '76 mm (3") or 152 mm (6") heavy-duty paper core'],
            ['Pallet Compatibility', 'Euro (800x1200), Industrial/UK (1000x1200), US (40x48")']
          ]
        }
      },
      {
        title: 'Applications: Beverage Industry',
        list: [
          'Secures high-speed bottling and canning pallet lines (PET bottle trays, aluminium can multipacks, glass beverage bottles).',
          'Prevents secondary package de-palletizing or load shifting during rapid forklift movement.',
          'Replaces multiple layers of rotary stretch wrap with a single hood for faster pallet cycle times.'
        ]
      },
      {
        title: 'Applications: Industrial & Heavy Goods',
        list: [
          'Construction & Building Materials: Unitizes cement bags, mortars, tiles, bricks, and plasterboards with outdoor water resistance.',
          'Chemicals & Petrochemicals: Secures 25 kg polymer resin sacks, drums, and pails against dust and ambient humidity.',
          'White Goods & Electronics: Protects boxed appliances against dust ingress and abrasion without melting inner plastic components.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Significant Material Savings: Consumes up to 30% to 40% less film weight per pallet compared to conventional rotary stretch wrap and heavy shrink hoods.',
          'High Packaging Speeds: Automated stretch hood machines package up to 100 to 200 pallets per hour, eliminating line bottlenecks.',
          'Superior Outdoor Storage: Integrated UV stabilizers (rated from 6 to 24 months) allow pallets to be safely stored outdoors in yard environments.',
          'Tamper-Evident & Secure: A single unbroken hood prevents pilferage; any cut or puncture cannot be re-sealed without leaving visible evidence.',
          '100% Recyclable: Compatible with standard Polyethylene (LDPE #4) mechanical recycling streams.'
        ]
      }
    ]
  },
  {
    id: 'collation-shrink-film',
    slug: 'collation-shrink-film',
    name: 'Collation Shrink Film',
    category: 'Industrial',
    badge: 'Trayless Bundling',
    featured: true,
    subtitle: 'Multi-layer bundle shrink film that groups items into compact, rigid sales units.',
    description: 'Collation Shrink Film (also known as bundle shrink film) is a specialized, multi-layer co-extruded polyethylene film engineered to group, bundle, and secure multiple individual items into a single, compact, and rigid sales unit.',
    thickness: '35 - 100 Micron',
    width: 'Custom',
    elongation: '60-75% MD / 10-25% CD shrink',
    coreSize: '3-Layer / 5-Layer Co-ex PE',
    image: '/images/prod_shrink_film.jpg',
    images: ['/images/prod_shrink_film.jpg'],
    applications: ['Beverage 4/6/12/24-packs', 'Packaged foods & dairy', 'Personal & home care multipacks'],
    sections: [
      {
        title: 'How It Works',
        text: ['Manufactured via multi-layer blown film extrusion utilizing tailored formulations of LDPE, LLDPE, and metallocene (mLLDPE) resins, the film wraps around products, seals via hot-knife or thermal bars, and contracts tightly as it passes through a high-velocity heat shrink tunnel. The controlled shrink force forms characteristic "bulls-eye" side openings that serve as natural handles, creating an easy-to-carry, pallet-stable pack without requiring corrugated trays or outer cartons.']
      },
      {
        title: 'Primary Film Types & Configurations',
        list: [
          'High-Clarity Plain Collation Film: Transparent, high-gloss film optimized for multi-packs where the primary product branding, barcodes, and labels must remain visible to consumers and inventory scanners.',
          'Printed Collation Shrink Film: High-definition flexographic surface-printed film (up to 8 to 10 colors). Delivers vibrant, 360-degree point-of-sale branding that transforms plain beverage cans, bottles, and food packs into shelf-ready retail units.',
          'Trayless (Film-Only) Heavy-Duty Bundling Film: High-strength, metallocene-enriched formulation providing the extreme tensile and clamp force needed to bundle 12-packs and 24-packs of heavy cans or 1.5 L/2 L PET bottles without cardboard support trays.',
          'Supported (With Pad / Tray) Collation Film: Engineered to run smoothly over corrugated base pads or shallow trays for fragile glass bottles, jars, or irregularly shaped containers.',
          'Multi-Layer Downgauged Film (3-Layer / 5-Layer): Co-extruded using specialized hexene/octene polymers to reduce film thickness (from 60–75 µm down to 40–50 µm) while preserving tear resistance, dart impact, and load containment.'
        ]
      },
      {
        title: 'Core Features',
        list: [
          'Balanced Unidirectional Shrinkage: High Machine Direction (MD) shrink (60% to 75%) combined with controlled Transverse Direction (CD) shrink (15% to 25%) produces tight, wrinkle-free wraps with uniform, reinforced bulls-eye openings.',
          'High Holding Tension & Residual Clamping Force: Maintains structural rigidity after cooling, preventing the bundle from loosening, flexing, or dislodging during pallet stacking and transit vibration.',
          'Broad Sealing Window & Rapid Hot-Tack: High thermal seal integrity enables clean, smoke-free cutting and instant welding on ultra-high-speed automated bundlers operating at 60 to 150+ packs per minute.',
          'Puncture & Abrasion Resistance: Metallocene-reinforced skin layers resist punctures from bottle crown caps, can pull-tabs, and sharp carton corners.',
          'Optimized Coefficient of Friction (COF): Consistent low-slip to medium-slip properties ensure smooth passage through forming collars and conveyors without jamming or pack-to-pack clinging during palletizing.'
        ]
      },
      {
        title: 'Technical Specifications',
        table: {
          head: ['Property', 'Test Standard', 'Typical Specification'],
          rows: [
            ['Film Structure', 'Blown Co-extrusion', '3-Layer / 5-Layer Co-extruded PE'],
            ['Thickness Range', 'ISO 4593 / ASTM D5947', '35 µm to 100 µm (140 to 400 Gauge)'],
            ['Shrink Ratio (MD)', 'ASTM D2732 (150°C Oil/Air)', '60% to 75%'],
            ['Shrink Ratio (TD/CD)', 'ASTM D2732 (150°C Oil/Air)', '10% to 25%'],
            ['Tensile Strength at Break (MD)', 'ASTM D882', '≥ 28 – 38 MPa'],
            ['Tensile Strength at Break (CD)', 'ASTM D882', '≥ 24 – 32 MPa'],
            ['Dart Drop Impact Strength', 'ASTM D1709', '≥ 300 – 600 g'],
            ['Shrink Tunnel Temperature', 'Operational Metric', '160°C – 210°C (depending on tunnel speed & line rate)'],
            ['Surface Treatment (Printed)', 'Corona Treatment', '38 – 44 Dynes/cm']
          ]
        }
      },
      {
        title: 'Sectors & Multi-Industry Applications',
        list: [
          'Beverage Industry: Bundling 4-packs, 6-packs, 12-packs, and 24-packs of PET/glass water, soft drinks, juices, energy drinks, and beer cans.',
          'Packaged Foods & Dairy: Unitizing canned goods, glass pasta sauce jars, tetra-pack milk cartons, condensed milk tins, and condiment bottles.',
          'Personal Care & Cosmetics: Multi-pack promotional bundling of shampoo bottles, body washes, deodorants, soaps, and lotions.',
          'Home Care & Cleaners: Secondary bundling of detergent jugs, trigger sprayers, disinfectant bottles, and floor cleaners.',
          'Pharmaceuticals & Healthcare: Bundling liquid medicine bottles, intravenous (IV) fluid bags, and boxed medical devices for wholesale transit.',
          'Industrial & Hardware Goods: Grouping aerosol spray cans, lubricant bottles, paint tins, caulking tubes, and electrical fittings.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Up to 50% Secondary Packaging Cost Savings: Eliminating corrugated master cartons, dividers, and trays drastically reduces raw material costs.',
          'Optimized Transport & Warehouse Footprint: Film-only multipacks weigh significantly less and take up less cubic volume than bulky cardboard cartons, increasing pallet payload efficiency.',
          '100% Recyclable: Formulated exclusively from polyethylene (Resin Identification Code #4 LDPE/LLDPE), making bundles fully compatible with standard commercial plastic recycling streams.',
          'Superior Moisture & Transit Protection: Unlike cardboard—which softens and collapses in humid conditions or cold storage—polyethylene collation film remains impervious to rain, spills, and condensation.'
        ]
      }
    ]
  },
  {
    id: 'industrial-stretch-film',
    slug: 'industrial-stretch-film',
    name: 'Industrial Stretch Film',
    category: 'Industrial',
    badge: 'Hand & Machine Grades',
    featured: true,
    subtitle: 'Highly elastic LLDPE stretch wrap for pallet unitization, warehousing and export.',
    description: 'Industrial Stretch Film (also known as stretch wrap) is a highly stretchable, elastic plastic film extruded primarily from Linear Low-Density Polyethylene (LLDPE) and metallocene (mLLDPE) resins. Stretch film is mechanically elongated around pallet loads and bundled goods at ambient temperature. As the film attempts to return to its original dimensions, its natural elastic recovery (clamping force) pulls the products tightly together, creating a rigid, stabilized unit ready for warehouse racking, rough transit, and containerized export.',
    thickness: '12 - 29 Micron',
    width: '50 mm - 600 mm (max 1.5 m)',
    elongation: 'Pre-stretch up to 300%',
    coreSize: '25 mm / 31 mm / 76.2 mm',
    image: '/images/products/stretch_film_1.jpeg',
    images: ['/images/products/stretch_film_1.jpeg', '/images/products/stretch_film_2.jpeg'],
    applications: ['Logistics, warehousing & 3PL', 'Food, beverage & pharma pallets', 'Chemicals, automotive & construction'],
    sections: [
      {
        title: 'Features & Standard Specifications',
        table: {
          head: ['Feature', 'Description'],
          rows: [
            ['Protection Against Dust / Dirt', 'Yes'],
            ['Waterproof Packaging', 'Helps make packaging waterproof when wrapped around paper containers'],
            ['Visual Inspection', 'Helps for Visual Inspection'],
            ['Cost Effectiveness', 'More Cost effective compared to Straps / Shrink / Corrugation'],
            ['Wrapping Options', 'Available for Manual Wrapping / Machine Wrapping'],
            ['Standard Widths', '50 / 100 / 150 / 200 / 300 / 450 / 500 / 600 mm (Other widths on request. Max Width 1.5 Meters)'],
            ['Standard Thickness', '12 / 15 / 18 / 23 / 29 Micron (Other thickness available on request)'],
            ['Standard Colours', 'Natural / Opaque White / Blue / Black (Other colours available on request)'],
            ['Standard Core ID', '25 mm / 31 mm / 76.2 mm'],
            ['Special Additives', 'UV Protection / VCI / Antistatic']
          ]
        }
      },
      {
        title: 'Manufacturing Processes & Performance Grades',
        list: [
          'Cast Stretch Film: Produced via high-speed flat-die extrusion with chilled rollers. Exceptional clarity, ultra-quiet unwind, smooth surface finish, and consistent thickness profile. Highly efficient for standard warehouse operations and barcode scanning.',
          'Blown Stretch Film: Produced via vertical tubular blown extrusion with gradual air cooling. Maximum puncture resistance, high dart impact strength, and aggressive two-sided cling. Best suited for sharp, irregular, jagged, or heavy loads (e.g., bricks, castings, machinery parts).'
        ]
      },
      {
        title: 'Core Features',
        list: [
          'High Elastic Memory & Restoring Force: Maintains constant load tension even when pallets settle, shift, or experience continuous road and rail vibration.',
          'Exceptional Tear & Puncture Propagation Resistance: Formulated with metallocene plastomers to withstand punctures from sharp carton edges or wooden pallet splinters without tearing open completely.',
          'Controlled Cling (1-Side or 2-Side Cling): Proprietary cling packages ensure layers stick firmly to each other while keeping the outer face slick (differential cling) so neighbouring pallets do not drag or tear in transit.',
          'Optical Transparency: High-clarity grades ensure shipping labels, carton text, and inventory barcodes remain instantly scannable without unpacking.',
          'Moisture, Dust & Tamper Resistance: Provides a clean outer envelope shielding goods from warehouse dust, surface moisture, and transit grime while highlighting unauthorized access.'
        ]
      },
      {
        title: 'Primary Film Types & Form Factors',
        list: [
          'Manual / Hand Stretch Film: Lighter rolls (typically 2.5 kg to 5 kg) with extended or standard paper cores, designed for manual application via handheld dispensers in low-to-medium throughput environments.',
          'Machine Stretch Film: Heavy-gauge jumbo rolls (12 kg to 16+ kg) engineered for automated pallet wrappers (turntable, rotary arm, orbital, or ring wrappers) supporting stretch ratios from 150% up to 300%+.',
          'Pre-Stretched Film: Mechanically pre-stretched during extrusion/rewinding. Provides maximum load containment with minimal operator effort, zero neck-down, and up to 50% less plastic consumption.'
        ]
      },
      {
        title: 'Specialty & Protective Grades',
        list: [
          'Black / Opaque Film: Conceals valuable cargo from pilferage and blocks UV radiation for light-sensitive goods.',
          'Colour-Tinted Film (Blue, Green, Red): Used for immediate inventory coding, batch tracking, and international routing.',
          'VCI Stretch Film: Impregnated with volatile corrosion inhibitors to prevent rust on wrapped steel coils, bearings, and machined parts.',
          'Anti-Static (ESD) Film: Formulated to dissipate static electricity, protecting sensitive electronics, semiconductors, and volatile chemicals.',
          'Vented / Perforated Stretch Film: Features die-cut holes allowing airflow for hot-fill beverage condensation release, produce respiration, or frozen food fast-chilling.'
        ]
      },
      {
        title: 'Sectors & Industry Applications',
        list: [
          'Logistics, Warehousing & 3PL: High-throughput pallet unitization, freight consolidation, cross-docking, and container staging.',
          'Food & Beverage: Secondary palletizing of boxed canned goods, bagged grains, packaged snacks, and bottled beverages.',
          'Pharmaceuticals & Healthcare: Clean, lint-free pallet wrapping of medicine cartons, medical supplies, and sterile packaging.',
          'Chemicals & Petrochemicals: Unitizing 25 kg polymer/chemical bags, pails, IBC totes, and steel chemical drums.',
          'Automotive & Heavy Engineering: Securing spare parts bins, metal stampings, castings, engines, and heavy automotive assemblies.',
          'Construction & Building Materials: Wrapping ceramic tiles, bagged cement, insulation boards, roofing supplies, and hardware.',
          'Paper, Printing & Packaging: Securing corrugated carton stacks, paper reams, pulp bundles, and empty packaging bottles.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Up to 40% Reduction in Packaging Cost: High pre-stretch capabilities (up to 300%) yield up to 4 times the wrapped pallet volume per kilogram of film.',
          'Damage & Transit Loss Elimination: Eliminates load toppling, corner crushing, and freight shift claims during intermodal transit.',
          'Faster Packaging Throughput: High-speed power pre-stretch wrappers wrap a complete pallet in under 45–60 seconds.',
          'Eco-Friendly & Closed-Loop Circularity: 100% recyclable through standard LDPE/LLDPE (Resin Code #4) recycling infrastructure, helping operations hit corporate packaging sustainability goals.'
        ]
      }
    ]
  },
  {
    id: 'recycled-stretch-wrap',
    slug: 'recycled-stretch-wrap',
    name: 'Recycled Stretch Wrap',
    category: 'Industrial',
    badge: '40% Recycled Content',
    featured: false,
    subtitle: 'Sustainable stretch wrap with minimum 40% recycled content — without compromising strength.',
    description: 'Our recycled stretch wrap is the perfect solution for businesses that are looking to reduce their environmental impact without sacrificing quality and reliability. Our stretch wrap is made using minimum 40% recycled content, including materials like plastic bottles, so you can trust that your packaging is both sustainable and high-performance.',
    thickness: 'On request',
    width: 'On request',
    elongation: 'High-performance stretch',
    coreSize: 'Standard cores',
    image: '/images/hero_pallet.jpg',
    images: ['/images/hero_pallet.jpg', '/images/pallet_machine.jpg'],
    applications: ['Sustainable pallet wrapping', 'Warehousing & logistics', 'Eco-conscious brands'],
    sections: [
      {
        title: 'Overview',
        text: [
          'We have carefully tested the strength of our stretch wrap to ensure it meets our stringent standards and delivers a secure fit for your products. Plus, our wrap is easy to use, so you can quickly and efficiently package your goods without any hassles. With our recycled stretch wrap, you can rest assured that you are packaging sustainably while still protecting your items during transport.'
        ]
      },
      {
        title: 'Features',
        list: [
          '40% Post Industrial / Post Consumer recycled content',
          'High-performance and durable',
          'Easy to use',
          'Secure fit for products',
          'Reduce environmental impact with sustainable packaging solutions'
        ]
      },
      {
        title: 'Our Commitment',
        text: ['At SMS ENTERPRISES, we are committed to providing businesses with eco-friendly packaging solutions that do not compromise on quality. Our Recycled stretch wrap products will be the perfect choice for companies looking to reduce their environmental impact, without having to sacrifice performance or reliability.']
      }
    ]
  },

  // ───────────────────────── Industrial Films & Liners ─────────────────────────
  {
    id: 'vci-film',
    slug: 'vci-film',
    name: 'VCI Film – Rolls & Pouches',
    category: 'Industrial',
    badge: 'Anti-Corrosion',
    featured: true,
    subtitle: 'High-performance VCI anti-corrosion film for industrial & export packaging.',
    description: 'VCI (Volatile Corrosion Inhibitor) Film is an advanced protective packaging material extruded from premium polyethylene resins (LDPE/LLDPE) impregnated with active anti-corrosion chemical formulations.',
    thickness: '50 - 150+ Micron',
    width: '100 mm - 2000 mm',
    elongation: 'Ferrous / Non-Ferrous / Multi-Metal',
    coreSize: 'Rolls, Tubing, Bags',
    image: '/images/products/vci_stretch_film_1.jpeg',
    images: ['/images/products/vci_stretch_film_1.jpeg', '/images/products/vci_stretch_film_3.jpeg'],
    applications: ['Automotive & auto-ancillary', 'Steel mills & metal processing', 'Export & maritime logistics'],
    sections: [
      {
        title: 'How VCI Works',
        text: ['Once sealed inside the packaging, the specialized additives continuously sublimate (vaporize) into the enclosed airspace, creating a monomolecular protective shield over all exposed metal surfaces. This microscopic layer neutralizes the electrochemical reactions caused by moisture, salt spray, oxygen, and atmospheric pollutants—preventing rust, tarnish, and oxidation without direct liquid contact. When unpackaged, the invisible barrier harmlessly dissipates into the air, leaving parts dry, clean, and immediately ready for painting, welding, or assembly.']
      },
      {
        title: 'Key Film Types & Form Factors',
        list: [
          'Mono Layer & Multi Layered VCI Film: Features an inner layer for fast VCI release, an intermediate reservoir layer for multi-year protection, and an external barrier layer that prevents active vapours from escaping outwards.',
          'VCI Flat Bags & Gusseted Pallet Liners: Pre-sized bags and large box/crate liners for rapid bagging of machined components, stamped parts, and engine blocks.',
          'VCI Stretch Film: Combines high-tack elastic holding force with rust inhibitors for wrapping metal coils, wire bundles, and palletized assemblies.',
          'VCI Heat Shrink Film: Heavy-gauge film that forms a tight, waterproof, puncture-resistant barrier around large machinery and crated equipment during open-deck transit.',
          'VCI Bubble Film / Tubing: Adds cushioning protection to precision polished or ground metal parts while preventing contact corrosion.',
          'Reinforced / Woven VCI Wrap: Heavy-duty tear-resistant woven fabric backed with VCI extrusion for wrapping steel/aluminium master coils and heavy billets.'
        ]
      },
      {
        title: 'Metal Protection Chemistry (Formulation Grades)',
        list: [
          'Ferrous Protection (Fe): Optimized specifically for carbon steel, cast iron, and forged alloys.',
          'Non-Ferrous Protection (N-Fe): Formulated for copper, brass, bronze, and galvanized metals without staining.',
          'Multi-Metal Formulations: Broad-spectrum protection protecting mixed assemblies containing steel, aluminium, copper, zinc, and silver.'
        ]
      },
      {
        title: 'Features',
        list: [
          '360° Recess Protection: VCI vapours diffuse into blind holes, deep threads, internal cavities, and complex geometry that traditional rust preventative (RP) oils cannot reach.',
          'Clean & Dry Operation: Eliminates the hazardous, labour-intensive process of applying grease/oils before shipment and solvent degreasing upon arrival.',
          'Self-Healing Vapor Action: If the package is briefly opened for customs inspection or quality checks, the chemical reservoir re-saturates the airspace once reclosed.',
          'High Optical Clarity & Tinted Identifiers: Typically supplied in translucent yellow, blue, or green to identify VCI-treated packaging while allowing barcode scanning without opening.'
        ]
      },
      {
        title: 'Key Industry Sectors',
        list: [
          'Automotive & Auto-Ancillary: Engine blocks, transmission housings, crankshafts, brake discs, bearings, CKD/SKD kits, and stamped sheet panels.',
          'Steel Mills & Metal Processing: Hot-rolled & cold-rolled steel coils, aluminium extrusions, precision slit coils, and wire rod bundles.',
          'Heavy Engineering & Machinery: CNC machines, gearboxes, pumps, valves, industrial turbines, and hydraulic cylinders.',
          'Aerospace & Defence: Precision structural components, landing gear assemblies, avionics housings, and military hardware conforming to MIL-STD specifications.',
          'Electrical & Electronics: Switchgears, copper busbars, transformers, and PCB enclosures susceptible to oxidation.',
          'Export & Maritime Logistics: Ocean freight containers and breakbulk cargo exposed to aggressive salt-air humidity during cross-continental shipping.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Zero Degreasing Costs: Saves end-customers significant labour and disposal costs associated with toxic chemical solvent washing.',
          'Dramatically Reduced Transit Rejections: Prevents costly cargo write-offs, scrap losses, and ocean transit rust claims.',
          'Eco-Friendly & Worker-Safe: Eliminates volatile hydrocarbon oil fumes in the warehouse; film is 100% mechanically recyclable (LDPE #4).',
          'Rapid Packaging Throughput: Packing speeds increase by up to 60% compared to traditional dipping, spraying, or greasing methods.'
        ]
      },
      {
        title: 'General Technical Specifications',
        table: {
          head: ['Parameter', 'Specification'],
          rows: [
            ['Polymer Structure', 'Multi layered Co-extruded Blown Film'],
            ['Chemistry', 'Amine- & Nitrite-Free Volatile Corrosion Inhibitor (VCI)'],
            ['Active Protection', 'Ferrous / Non-Ferrous / Multi-Metal Grades'],
            ['Form Factors', 'Continuous Rolls, Centre fold, Tubing, Flat Bags, Gusseted Bags, Stretch/Shrink Film'],
            ['Roll Width', '100 mm to 2000 mm (Up to 4,000 mm unfolded)'],
            ['Thickness', '50 µm to 150+ µm (2 mil to 8 mil)'],
            ['Standard Colour', 'Transparent Blue, Yellow, Green, or Natural Clear'],
            ['Additives Available', 'UV Inhibitors (Outdoor grade), Anti-Static (ESD), Flame Retardant, High-Slip'],
            ['Certifications', 'RoHS, REACH, DIN EN ISO 9001, MIL-PRF-22019 / MIL-STD-3010']
          ]
        }
      }
    ]
  },
  {
    id: 'vci-stretch-film',
    slug: 'vci-stretch-film',
    name: 'VCI Stretch Film',
    category: 'Industrial',
    badge: 'Rust Protection',
    featured: false,
    subtitle: 'Stretch wrap combined with Volatile Corrosion Inhibitor technology for metal products.',
    description: 'VCI stretch films are specialized industrial stretch wrap films that combine the benefits of stretch film with VCI (Volatile Corrosion Inhibitor) technology. They provide protection against corrosion and moisture for metal products during storage and transportation.',
    thickness: 'On request',
    width: 'On request',
    elongation: 'Excellent stretch & recovery',
    coreSize: 'Standard stretch cores',
    image: '/images/products/vci_stretch_film_2.jpeg',
    images: ['/images/products/vci_stretch_film_2.jpeg'],
    applications: ['Metal coils & sheets', 'Machinery & equipment', 'Storage & export transit'],
    sections: [
      {
        title: 'How It Works',
        text: [
          'The VCI technology releases a corrosion-inhibiting vapor that forms a protective layer on the metal surface, preventing rust and corrosion. The process involves wrapping the metal product with the VCI stretch film, which securely holds and protects the item while providing the added benefit of corrosion protection.',
          'SMS ENTERPRISES specializes in manufacturing VCI (Vapor Corrosion Inhibitor) stretch films, which offer advanced corrosion protection for metal products. Our VCI stretch films are designed to provide exceptional quality and performance.'
        ]
      },
      {
        title: 'Manufacturing Process',
        list: [
          'Resin Mixing: High-quality resins and additives are carefully selected and mixed to create a specialized VCI formulation.',
          'Film Extrusion: The VCI resin mixture is extruded through a die, forming a continuous plastic film.',
          'Stretch Film Production: The additives are added in stretch film, forming a strong, flexible, and corrosion-resistant VCI stretch film.',
          'Slitting and Packaging: The VCI stretch film is slit into desired widths and lengths, and then packaged for shipment to customers.'
        ]
      },
      {
        title: 'Features of VCI Stretch Films',
        list: [
          'Corrosion Protection: Our VCI stretch films release vapor corrosion inhibitors that create a protective barrier on metal surfaces, preventing the formation of rust and corrosion.',
          'Versatile Application: VCI stretch films can be used for a wide range of metal products, including coils, sheets, machinery, and equipment.',
          'Excellent Stretchability: The stretch films offer excellent elongation and stretch recovery, ensuring secure and tight wrapping of metal items.',
          'Easy Application: Our VCI stretch films are designed for easy application using standard stretch wrapping equipment, providing efficient and time-saving packaging solutions.',
          'Long-Lasting Protection: The corrosion-inhibiting properties of our VCI stretch films remain effective for extended periods, offering reliable protection during storage and transportation.',
          'Transparent and Clear: The films are transparent and clear, allowing for easy visibility and identification of packaged metal products.'
        ]
      },
      {
        title: 'Benefits',
        list: [
          'Corrosion Protection: VCI stretch wraps protect metal surfaces from rust and corrosion.',
          'Secure Encapsulation: The wraps conform tightly to the packaged item, providing a secure barrier.',
          'Versatile Usage: Suitable for various metal products, including machinery and equipment.',
          'Long-Lasting Protection: VCI wraps offer extended protection during storage and transportation.',
          'Visual Inspection: Transparent wraps allow for easy visual inspection of the item.',
          'Cost-Effective: VCI wraps are a cost-effective solution for corrosion prevention.',
          'Time-Saving: Quick and efficient application saves time in the packaging process.',
          'Environmentally Friendly: Recyclable wraps without harmful chemicals.'
        ]
      },
      {
        title: 'Our Commitment',
        text: [
          'At SMS ENTERPRISES, we are committed to delivering superior-quality VCI stretch films that meet the highest industry standards. Our films are extensively tested for performance and durability to ensure reliable corrosion protection for your valuable metal products.',
          'We also offer VCI stretch wraps for specialized packaging needs, providing a comprehensive range of corrosion protection solutions for our customers.'
        ]
      }
    ]
  },
  {
    id: 'ldpe-liners-pouches',
    slug: 'ldpe-liners-pouches',
    name: 'LDPE Liners, Pouches & Garbage Bags',
    category: 'Industrial',
    badge: 'Plain & Printed',
    featured: false,
    subtitle: 'PE liners, garbage bags and bulk bags — plain or printed, in custom sizes and microns.',
    description: 'At SMS ENTERPRISES, we pride ourselves on manufacturing high-quality PE liners, Pouches and garbage bags. Our manufacturing process ensures superior products with excellent features and benefits.',
    thickness: 'Custom microns',
    width: '150 mm - 2.0 m flat',
    elongation: 'Tear & puncture resistant',
    coreSize: 'Bags / Rolls',
    image: '/images/packaging_showroom.jpg',
    images: ['/images/packaging_showroom.jpg'],
    applications: ['Packaging & container liners', 'Construction & agriculture', 'Industrial & household waste'],
    sections: [
      {
        title: 'Manufacturing Process',
        text: [
          'The manufacturing process begins with the extrusion of polyethylene resin, a versatile and durable plastic material. The resin is melted and formed into a continuous film, which is then fed into specialized machinery. This machinery cuts and seals the film to create individual liners or bags of various sizes and shapes. Our state-of-the-art equipment and skilled technicians ensure precision and consistency in manufacturing.',
          'The PE liners and garbage bags produced at SMS ENTERPRISES are made from high-quality polyethylene, ensuring strength, tear resistance, and durability. This makes them capable of securely containing waste without the risk of leaks or tears. Our products are designed to be waterproof, providing an additional layer of protection against liquid waste, and puncture-resistant, ensuring reliable performance even with sharp or heavy waste items.',
          'We adhere to stringent quality control measures throughout manufacturing to ensure consistent product excellence. Our team of experts closely monitors every step, from raw material selection to final product packaging.'
        ]
      },
      {
        title: 'Key Features',
        list: [
          'High-Quality LDPE Material: Ensures flexibility, durability, and high resistance to wear and tear.',
          'Customizable Sizes & Thicknesses: Available in different microns as per customer requirements.',
          'Waterproof & Moisture-Resistant: Protects against humidity, dust, and environmental exposure.',
          'Tear & Puncture Resistant: Provides long-lasting protection and secure handling.',
          'Multipurpose Utility: Suitable for packaging, covering, and protective applications.',
          'Eco-Friendly & Recyclable: Supports sustainable and responsible usage.'
        ]
      },
      {
        title: 'Applications',
        list: [
          'Packaging & Wrapping: Used for safe and secure packaging in various industries.',
          'Construction & Agriculture: Acts as a protective layer for surfaces, soil, and materials.',
          'Industrial & Manufacturing Units: Ideal for lining, shielding, and containment.',
          'Household & Commercial Use: Suitable for furniture protection, dust covering, and temporary partitions.',
          'E-commerce & Logistics: Ensures safe wrapping and packaging during transportation.',
          'Cargo Shipping: Standard & customized container liner.'
        ]
      },
      {
        title: 'Product Specifications',
        table: {
          head: ['Parameter', 'Specification'],
          rows: [
            ['Material', 'Virgin-grade LDPE (Low-Density Polyethylene)'],
            ['Thickness & Durability', 'Available in various microns as per customer needs'],
            ['Colour Options', 'Transparent, white, black, and customizable shades'],
            ['Sizes', '6.0" – 78.0" (150 mm – 2.0 m flat) to meet different packaging and protective requirements']
          ]
        }
      },
      {
        title: 'Key Benefits of PE Liners',
        list: [
          'Strength: Provides enhanced tear and puncture resistance for heavy or sharp waste.',
          'Leak Resistance: Minimizes odours, spillage, and contamination risks.',
          'Customizability: Can be designed with specific sizes, thicknesses, branding, or colours to suit varied requirements.'
        ]
      },
      {
        title: 'Why Choose SMS ENTERPRISES?',
        list: [
          'Trusted Manufacturer: Providing high-quality LDPE packaging solutions.',
          'Cost-Effective & Reliable: Affordable pricing with excellent durability.',
          'Customizable Options: Various sizes, colours, and thickness levels available.',
          'Eco-Friendly Approach: Committed to sustainability with recyclable materials.'
        ]
      }
    ]
  },

  // ───────────────────────── Agricultural Films ─────────────────────────
  {
    id: 'greenhouse-film',
    slug: 'greenhouse-film',
    name: 'Greenhouse (Polyhouse) Film',
    category: 'Agri',
    badge: '5 & 7 Layer',
    featured: true,
    subtitle: 'High-performance multi-layer greenhouse film for year-round protected cultivation.',
    description: 'Greenhouse Film (also known as polyhouse film or agricultural glazing film) is a heavy-duty, multi-layer co-extruded polyethylene sheeting engineered to cover commercial greenhouse frames, walk-in polyhouses, naturally ventilated greenhouses (NVGH), and high-tunnel structures.',
    thickness: 'Multi-layer heavy duty',
    width: 'Custom',
    elongation: '3 - 5 year UV warranty',
    coreSize: '5-Layer / 7-Layer Co-ex',
    image: '/images/prod_agri_film.jpg',
    images: ['/images/prod_agri_film.jpg'],
    applications: ['Floriculture & horticulture', 'Hydroponics & nurseries', 'Medicinal plants & herbs'],
    sections: [
      {
        title: 'Overview',
        text: ['Manufactured using premium LDPE, LLDPE, EVA, and metallocene (mLLDPE) resins integrated with advanced photochemical stabilizers, greenhouse films create an optimized microclimate. They control solar radiation, diffuse harsh sunlight, regulate day-to-night temperatures, and protect crops from damaging weather extremes, enabling year-round cultivation and commercial yield maximization.']
      },
      {
        title: 'Key Film Types & Functional Formulations',
        list: [
          'Clear High-Transmission Film: Delivers high direct Photosynthetically Active Radiation (PAR > 88%–90%). Best suited for low-light geographies, winter-grown crops, and crops with high light requirements.',
          'Diffused / Photo Selective Film: Uses mineral scattering agents to break direct solar rays into omnidirectional, scattered light (diffuse light 40% to 70%). Prevents upper canopy foliage burn while illuminating lower leaves, eliminating harsh shadows inside tall crop canopies (vine tomatoes, capsicum, cucumbers).',
          'Thermal / IR-Barrier Film (Infrared Heat-Retaining): Contains specialized EVA/ceramic IR absorbers that block long-wave thermal radiation from escaping overnight. Keeps the greenhouse interior 2°C to 5°C warmer during cold nights, preventing nocturnal chill and frost damage.',
          'Anti-Drip & Anti-Fog (Condensation Control) Film: Surface tension modifiers cause condensing moisture to flow as a continuous thin water sheet down the sidewalls rather than forming hanging droplets. Eliminates the "lens effect" (sun scorch on leaves) and reduces fungal leaf diseases such as botrytis and powdery mildew.',
          'Anti-Dust / Non-Stick Outer Skin Film: Formulated with advanced fluoropolymer/anti-static additives on the exterior skin to prevent dirt, dust, and soot from adhering to the outer roof, maintaining maximum light entry over multiple seasons.',
          'Anti-Virus / UV-Blocking Film: Selectively blocks specific UV-A/UV-B wavelengths (below 380 nm), disrupting the vision and navigation of insect vectors (thrips, aphids, whiteflies) to reduce the spread of viral plant diseases.'
        ]
      },
      {
        title: 'Core Features & Layered Engineering',
        list: [
          '5-Layer & 7-Layer Co-Extruded Architecture: Strategically distributes functional additives (UV absorbers in the outer layer, thermal barriers and metallocene strength in the core, and anti-drip agents on the inner layer) for maximum multi-season durability.',
          'Extended UV Stabilization (HALS): Fortified with Hindered Amine Light Stabilizers designed to resist intense UV degradation and withstand sulfur/chlorine chemical pesticide fumes used in crop spraying.',
          'Extreme Mechanical Tensile & Wind Resistance: Metallocene-enriched polymers withstand structural flexing against high-speed wind shears, heavy rainstorms, and hail impacts without tearing along frame arches.'
        ]
      },
      {
        title: 'Target Sectors & Agricultural Applications',
        list: [
          'Commercial Floriculture: High-grade cultivation of export-quality cut flowers (roses, gerberas, carnations, orchids, chrysanthemums) where petal blemish prevention and stem elongation are paramount.',
          'High-Value Horticulture & Protected Vegetables: Year-round cultivation of colored capsicum (bell peppers), indeterminate vine tomatoes, seedless cucumbers, and exotic zucchinis.',
          'Hi-Tech Hydroponics & Aquaponics: Climate-controlled indoor growing environments for microgreens, leafy greens, strawberries, and soft berries.',
          'Commercial Nurseries & Tissue Culture Hardening: Seedling germination chambers, young graft shelters, and tissue culture hardening facilities requiring controlled diffuse light and relative humidity.',
          'Medicinal Plants & Exotic Herbs: Controlled-environment cultivation of vanilla, saffron, stevia, and certified medicinal herbs.'
        ]
      },
      {
        title: 'Business & Agronomic Benefits',
        list: [
          'Year-Round Production & Counter-Seasonal Pricing: Protects crops against extreme summer heat, cold snaps, and monsoon floods, allowing harvest cycles when open-field supply is low and market prices peak.',
          'Up to 3x to 5x Higher Crop Yields: Controlled microclimates accelerate vegetative growth rates, increase flower-to-fruit set ratios, and dramatically extend the harvesting window.',
          'Significant Chemical & Pesticide Reduction: UV-blocking and enclosed canopy properties suppress pest activity, cutting pesticide spray cycles by up to 50%.',
          'Lower Total Cost of Ownership: Multi-year UV warranties (3 to 5 years) eliminate the recurring labor and replacement costs associated with single-season films.',
          '100% Recyclable: Manufactured from pure polyethylene (LDPE/LLDPE), fully compatible with agricultural polymer recycling streams.'
        ]
      }
    ]
  },
  {
    id: 'silage-stretch-film',
    slug: 'silage-stretch-film',
    name: 'Silage Stretch Film',
    category: 'Agri',
    badge: '12-18 Month UV',
    featured: true,
    subtitle: 'Multi-layer agri-wrap / bale wrap for airtight silage and haylage preservation.',
    description: 'Silage Stretch Film (also known as Agri-wrap or bale wrap) is a multi-layer, high-performance agricultural film manufactured primarily from Linear Low-Density Polyethylene (LLDPE) and metallocene (mLLDPE) resins.',
    thickness: '25 Micron (22 / 30 available)',
    width: '250 / 500 / 750 mm',
    elongation: 'Pre-stretch up to 70-75%',
    coreSize: '1,500 m / 1,800 m rolls',
    image: '/images/products/silage_stretch_film_1.jpeg',
    images: ['/images/products/silage_stretch_film_1.jpeg', '/images/products/silage_stretch_film_2.jpeg', '/images/products/silage_stretch_film_3.jpeg'],
    applications: ['Round & square bale wrapping', 'Dairy & livestock farms', 'Outdoor feed storage'],
    sections: [
      {
        title: 'How It Works',
        text: ['Applied via automated bale-wrapping machinery around round or square crop bales, it creates a hermetically sealed, airtight environment. This locks out oxygen and rainwater while retaining internal moisture, promoting lactic acid fermentation (anaerobic digestion). The resulting silage or haylage preserves vital nutrients, proteins, and sugars, allowing livestock feed to be stored outdoors for over 12 to 18 months without spoilage.']
      },
      {
        title: 'Key Film Types & Variants',
        list: [
          '3-Layer, 5-Layer & 7-Layer Co-Extruded Film: Blown co-extrusion distributes mechanical strength across distinct layers. 5-layer and 7-layer films allow thinner micron downgauging, superior oxygen barrier performance, and higher dart impact resistance.',
          'Standard Round & Square Bale Wrap: High-stretch films engineered to accommodate high pre-stretch wrapping units (up to 70% stretch) on round bales and withstand the high-stress sharp edges of large square bales.',
          'White: Reflects solar radiation to keep bale temperatures cool in hot, sunny regions, preventing overheating and spoilage.',
          'Green / Olive Green: Blends into natural landscapes while providing balanced thermal absorption in moderate climates.',
          'Black: Absorbs solar radiation, ideal for cooler/high-latitude agricultural climates.'
        ]
      },
      {
        title: 'Core Features',
        list: [
          'Hermetic Air & Moisture Barrier: Ultra-low oxygen transmission rate (OTR) stops aerobic decomposition, preventing mold, yeast, and fungal growth.',
          'Exceptional Puncture & Tear Resistance: Formulated with metallocene polymers to resist puncture from sharp crop stalks, alfalfa stems, and stiff grass stubble.',
          '12 to 18-Month UV Stabilization: Enriched with high-grade HALS (Hindered Amine Light Stabilizers) to withstand intense solar radiation and seasonal weather variations without embrittlement.',
          'Tack / Self-Adhesive Layer: Features a specialized 1-side or 2-side cling additive that fuses overlapping layers together to maintain an impermeable airtight seal.'
        ]
      },
      {
        title: 'Technical Properties & Performance Profile',
        table: {
          head: ['Property', 'Standard / Test Method', 'Typical Specification'],
          rows: [
            ['Manufacturing Process', 'Blown Co-extrusion', 'Multi layered 3/5 layered'],
            ['Standard Thickness', 'ISO 4593', '25 µm (1 mil) (Also available in 22 µm & 30 µm)'],
            ['Standard Roll Widths', 'Industry Standard', '250 mm, 500 mm (20") and 750 mm (30")'],
            ['Standard Lengths', 'Industry Standard', '1,500 m (750 mm) / 1,800 m (500 mm)'],
            ['Dart Impact Strength', 'ASTM D1709', '≥ 350 – 500 g'],
            ['Tensile Strength at Break', 'ISO 527-3', 'MD: ≥ 30 MPa / TD: ≥ 26 MPa'],
            ['Elongation at Break', 'ISO 527-3', 'MD: ≥ 450% / TD: ≥ 650%'],
            ['Pre-Stretch Capability', 'Field Bale Wrappers', 'Up to 70% – 75% without tearing'],
            ['Oxygen Permeability (OTR)', 'ASTM D3985', '< 9,000 cm³ / (m² · 24h · bar) @ 23°C, 0% RH'],
            ['UV Protection Level', 'Accelerated Weathering', '12 to 18 Months (Global UV index rating up to 160–180 kLy)']
          ]
        }
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Zero Indoor Storage Overhead: Bales are stored directly in open pastures or field perimeters, cutting capital expenditures on specialized storage barns and concrete bunker silos.',
          'Preserved Nutritional Value: Minimizes dry matter (DM) loss to under 3–5%, maintaining essential protein levels and feed palatability.',
          'Reduced Feed Spoilage Losses: Prevents secondary fermentation, water logging, and localized bale rotting caused by outer film tearing.',
          'Cost Efficiency Per Bale: High elongation yield provides more wrapped bales per roll, maximizing wrapping throughput while lowering unit packing cost.',
          '100% Recyclable: Polyethylene matrix is fully recyclable through dedicated agricultural plastic recycling programs.'
        ]
      }
    ]
  },
  {
    id: 'agricultural-mulch-film',
    slug: 'agricultural-mulch-film',
    name: 'Agricultural Mulch Film',
    category: 'Agri',
    badge: 'Weed & Water Control',
    featured: true,
    subtitle: 'Polyethylene ground cover that conserves water, suppresses weeds and boosts yield.',
    description: 'Agricultural Mulch Film is an advanced polyethylene-based protective ground cover laid directly over cultivated soil beds before planting. Manufactured via multi-layer blown film extrusion from Linear Low-Density Polyethylene (LLDPE) and Low-Density Polyethylene (LDPE), it modifies the crop’s microclimate.',
    thickness: '20 - 100+ Micron',
    width: 'Custom bed widths',
    elongation: 'Machine-laying grade',
    coreSize: 'Silver/Black, Black, White & more',
    image: '/images/products/agri_mulch_film_1.jpeg',
    images: ['/images/products/agri_mulch_film_1.jpeg', '/images/products/agri_mulch_film_2.jpeg', '/images/products/agri_mulch_film_3.jpeg'],
    applications: ['Open-field vegetables', 'Orchards & berry farming', 'Polyhouse & organic farming'],
    sections: [
      {
        title: 'How It Works',
        text: ['By acting as a physical barrier between the soil and the atmosphere, mulch film regulates root-zone soil temperature, restricts water evaporation, blocks weed photosynthesis, and stops fertilizer leaching—accelerating crop maturity and boosting marketable yield per hectare.']
      },
      {
        title: 'Key Film Types & Dual-Colour Variants',
        list: [
          'Silver/Black Film (The Industry Standard): The top silver layer reflects up to 25–30% of incident sunlight, deterring airborne pests (aphids, thrips, whiteflies) while preventing root overheating; the bottom black layer blocks 100% of PAR, completely suppressing weed growth without chemical herbicides.',
          'Black/Black Film: Universal weed suppression and moisture conservation film for moderate climates, orchards, and perennial crops.',
          'White/Black Film: Reflects maximum solar energy to keep root zones cooler in extreme desert/tropical summers, optimizing yields for heat-sensitive crops like strawberries and lettuce.',
          'Transparent / Clear Film: Maximizes solar thermal transfer into the soil, primarily used for pre-season soil solarization (sterilizing soil-borne pathogens) and early-spring seedling warming.',
          'Yellow/Brown (Photo Selective) Film: Absorbs specific light wavelengths to control soil temperature while inhibiting weed germination beneath the bed.',
          'Biodegradable Mulch Film: Extruded from bio-polyesters (PBAT/PLA/starch blends) that break down directly in the soil via soil microorganisms post-harvest, eliminating retrieval and disposal labour.'
        ]
      },
      {
        title: 'Core Features',
        list: [
          'Complete Weed Suppression: Eliminates light penetration beneath dark films, cutting manual weeding and chemical herbicide costs to near zero.',
          'Moisture Retention & Water Savings: Cuts soil water evaporation by 30% to 50%, enabling precise, low-volume drip irrigation directly under the film.',
          'Root-Zone Microclimate Regulation: Maintains stable soil temperatures day and night, protecting young root structures from thermal shock and nocturnal chill.',
          'Prevention of Soil Compaction & Fertilizer Leaching: Prevents heavy rains from compacting bed aeration and washing soluble NPK fertilizers beyond the root zone.',
          'Cleaner, Higher-Grade Produce: Prevents direct contact between fruit/vegetables and wet soil, eliminating soil splashes, belly rot, and surface blemishes.'
        ]
      },
      {
        title: 'Recommended Thickness by Crop Duration',
        table: {
          head: ['Thickness', 'Crop Duration', 'Typical Crops'],
          rows: [
            ['20 – 25 Microns', 'Short-Term Seasonal (2–4 months)', 'Melons, cucumbers, tomatoes, bell peppers, okra, squash'],
            ['30 – 50 Microns', 'Medium-Term (6–12 months)', 'Strawberries, chillies, sugarcane, cotton, pineapples'],
            ['75 – 100+ Microns', 'Long-Term / Perennials', 'Multi-season orchards, vineyards, nurseries, heavy weed suppression zones']
          ]
        }
      },
      {
        title: 'Sectors & Crop Applications',
        list: [
          'Horticulture & Open-Field Vegetables: High-value cash crops including tomatoes, chillies, eggplants, capsicum, melons, gourds, and cole crops.',
          'Fruit Orchards & Berry Farming: Strawberry cultivation, banana plantations, grape vineyards, and newly planted fruit saplings.',
          'Greenhouse & Polyhouse Protected Farming: Inter-row and bed mulching to control interior relative humidity and deter disease spread.',
          'Organic Farming: Serves as the primary non-chemical weed management tool in certified organic operations.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Early Harvest & Premium Market Pricing: Crops mature 7 to 14 days earlier due to optimal root-zone soil temperatures, allowing growers to hit early market price windows.',
          '25% – 50% Higher Yields: Promotes aggressive lateral root systems in uncompacted, nutrient-rich soil, driving higher flower-to-fruit conversion rates.',
          'Substantial Input Savings: Reduces drip irrigation water requirements by up to 50% and fertilizer consumption by 20–30%.',
          'Machine Laying Efficiency: Engineered with high mechanical stretch and tensile memory, allowing trouble-free application with automated tractor-drawn mulch-laying equipment.'
        ]
      }
    ]
  },
  {
    id: 'low-tunnel-film',
    slug: 'low-tunnel-film',
    name: 'Low Tunnel Film',
    category: 'Agri',
    badge: 'Early Harvest',
    featured: false,
    subtitle: 'Agricultural low tunnel film for microclimate control & early harvest.',
    description: 'Agri Low Tunnel Film (also known as miniature greenhouse film or row cover film) is a flexible, UV-stabilized polyethylene sheeting engineered to cover semi-circular wire or bamboo hoops installed over crop rows.',
    thickness: '50 - 150 Micron',
    width: '1.0 m - 5.0 m',
    elongation: 'Anti-fog, light diffusion',
    coreSize: 'Clear, slight yellow',
    image: '/images/products/agri_low_tunnel_film_1.jpeg',
    images: ['/images/products/agri_low_tunnel_film_1.jpeg', '/images/products/agri_low_tunnel_film_2.jpeg'],
    applications: ['Cucurbits & melons', 'Tomatoes, capsicum & chillies', 'Strawberries & seedbeds'],
    sections: [
      {
        title: 'How It Works',
        text: ['Unlike mulch film that lies flat on the ground, low tunnel film forms a covered canopy (typically 0.5 to 1 meter in height) directly above growing plants. This creates an accelerated microclimate that traps passive solar heat, shields delicate seedlings from frost and sudden freezes, prevents physical pest damage, and protects flowering crops from torrential rains and high winds.']
      },
      {
        title: 'Specifications',
        table: {
          head: ['Specification', 'Details'],
          rows: [
            ['Thickness', '50 – 150 microns'],
            ['Width', '1.0 m – 5.0 m'],
            ['Additives', 'Anti fog, light diffusion'],
            ['Colours', 'Clear, slight yellow']
          ]
        }
      },
      {
        title: 'Key Film Types & Variants',
        list: [
          'Clear / Transparent High-PAR Film: Maximizes light transmission (up to 88%–92% Photosynthetically Active Radiation) for rapid heat accumulation during winter and early spring seeding.',
          'Perforated / Micro-Vented Film: Factory-punched with micro or macro ventilation holes to exhaust excess heat during midday sun, regulating canopy humidity and preventing seedling heat burn.',
          'Thermal / IR-Barrier Film: Formulated with infrared (IR) barrier additives that absorb and re-radiate thermal energy overnight, keeping the plant canopy 2°C to 5°C warmer than ambient night temperatures.',
          'Anti-Drip / Anti-Fog Film: Features internal tension-modifying additives that force condensing moisture to sheet down the film walls rather than form droplets that drip onto plants, preventing fungal outbreaks and scorch-lens effects.',
          'Diffused / Photoselective Film: Softens harsh direct sunlight into scattered light, ensuring lower crop leaves receive uniform illumination without hotspot burning.'
        ]
      },
      {
        title: 'Key Benefits',
        list: [
          'Helps protect crops from climate variations',
          'Provides protection against insects',
          'Reduces crop maturity period',
          'Minimizes temperature variations between daytime and nighttime',
          'Suitable for a wide range of agricultural applications'
        ]
      },
      {
        title: 'Target Crops & Agricultural Applications',
        list: [
          'Cucurbits & Melons: Watermelon, muskmelon, cucumber, bitter gourd, and bottle gourd planted in early spring.',
          'Solanaceous Cash Crops: Tomatoes, bell peppers (capsicum), chillies, and eggplants during flowering and fruit setting.',
          'Soft Fruits & Berries: Strawberry cultivation—ensuring early flowering and unblemished, rot-free fruit formation.',
          'Early Vegetable Seedbeds: Cabbage, cauliflower, and leafy greens germinating ahead of the regular open-field season.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Early Market Entry (15 to 30 Days): Speeds up seed germination and vegetative growth by 2 to 4 weeks, enabling growers to sell produce when off-season market prices are at their peak.',
          'Fraction of Greenhouse Costs: Delivers protected-cultivation advantages (temperature control, pest exclusion) at less than 5% of the capital expenditure required for permanent polyhouses or walk-in greenhouses.',
          'Reduced Chemical Spraying: The enclosed canopy prevents early-stage pest infestations, lowering pesticide application requirements by up to 40%.',
          'Seamless Compatibility with Ground Mulch: Low tunnels are commonly paired with black or silver/black mulch film underneath, creating an optimized total microclimate system (controlled root zone + heated foliage zone).'
        ]
      }
    ]
  },

  // ───────────────────────── Flexible Packaging ─────────────────────────
  {
    id: 'milk-packaging-film',
    slug: 'milk-packaging-film',
    name: 'Milk Packaging Film',
    category: 'FMCG',
    badge: 'Food Grade',
    featured: true,
    subtitle: 'Multi-layer dairy pouch film for high-speed Form-Fill-Seal liquid packaging.',
    description: 'Milk Packaging Film (commonly known as dairy pouch film) is a specialized, multi-layer co-extruded polyethylene film engineered for high-speed Form-Fill-Seal (FFS) automated packaging of pasteurized milk, flavoured milk, buttermilk, and liquid dairy products.',
    thickness: '50 - 85 Micron',
    width: '320 - 325 mm / Custom',
    elongation: '3-Layer / 5-Layer',
    coreSize: '76 mm (3")',
    image: '/images/products/milk_packaging_1.jpeg',
    images: ['/images/products/milk_packaging_1.jpeg', '/images/products/milk_packaging_2.jpeg'],
    applications: ['Dairy processing plants', 'Plant-based beverages', 'Edible oils & water pouches'],
    sections: [
      {
        title: 'Overview',
        text: ['Manufactured using high-purity, virgin food-grade resins—including Low-Density Polyethylene (LDPE), Linear Low-Density Polyethylene (LLDPE), and metallocene plastomers (mLLDPE)—this film provides strict seal integrity, puncture protection, and barrier control against light and oxygen to prevent nutrient degradation, oxidation of milk fats, and premature souring.']
      },
      {
        title: 'Specifications',
        table: {
          head: ['Parameter', 'Specification'],
          rows: [
            ['Structure', '3-Layer / 5-Layer Co-extruded Blown Film'],
            ['Resin Blend', 'Pure Virgin LDPE + LLDPE + mLLDPE (Optional EVOH/PA core)'],
            ['Film Supply', 'Single-wound roll film (printed or unprinted)'],
            ['Standard Widths', '320 mm – 325 mm (for 500 ml / 1 L standard pouches) or custom'],
            ['Micron Range', '50 µm to 85 µm (Custom gauges available)'],
            ['Surface Finish', 'Corona treated outer surface (38 to 44 dynes/cm) for flexo printing'],
            ['Colour Options', 'White/Black, White/Clear, Milky White, Natural Clear'],
            ['Core Diameter', '76 mm (3") heavy-duty paper/PVC core'],
            ['Standard Roll OD', '300 mm to 450 mm'],
            ['Packaging Type', 'VFFS (Vertical Form Fill Seal) automated liquid packaging lines']
          ]
        }
      },
      {
        title: 'Pouch Sizes',
        text: ['We provide flexible solutions for both small dairy units and large-scale automated plants. Our plastic milk pouches are easy to store, easy to handle, and designed for convenient pouring.'],
        list: ['250 ml milk pouch', '500 ml milk pouch', '1 liter milk pouch', '2 liter milk bags', 'Custom size milk packaging']
      },
      {
        title: 'Key Features of Our Milk Bags',
        list: [
          'Leak-proof and waterproof',
          'Strong sealing strength for high-speed filling',
          'Food-grade LDPE & LLDPE material',
          'Excellent durability during transport',
          'Custom printing options',
          'Available in recyclable monolayer films',
          'Cost-effective bulk supply'
        ]
      },
      {
        title: 'Key Film Types & Barrier Structures',
        list: [
          '3-Layer Co-Extruded Film (Standard Shelf-Life): Typically White/Opaque/Black or White/Clear/White. Ideal for daily cold-chain distribution of pasteurized fresh milk (2 to 5 days refrigerated). The internal black layer provides high light opacity, preventing riboflavin (Vitamin B2) breakdown and off-flavour development.',
          '5-Layer High-Barrier Film (Extended Shelf Life / Aseptic): Incorporates barrier polymers such as EVOH or Polyamide (Nylon/PA) sandwiched between tie layers and polyethylene. Extends non-refrigerated ambient shelf-life from 30 days up to 90+ days.',
          'Natural / Monolayer Pouch Film: Clean, transparent or semi-translucent formulations designed for local dairy setups, short-run distribution, and curd/buttermilk packaging.'
        ]
      },
      {
        title: 'Core Features',
        list: [
          'Hermetic Hot-Tack & Seal-Through-Contamination: Formulated with metallocene resins that seal reliably even when liquid fat, milk splashes, or foam contaminate the seal jaw area during vertical filling.',
          'UV & Light Barrier Opacity: High-opacity black-and-white structures block up to 99% of light, preventing photo-oxidation of fats and preserving fresh taste.',
          'Tough Dart & Drop Impact Resistance: High mechanical elongation absorbs hydraulic shock during crate drops, rough handling, and crate stacking without bursting.',
          'Controlled Slip & Friction (COF): Consistent kinetic COF ensures smooth, jam-free tracking across high-speed VFFS machines running at 5,000 to 10,000 pouches per hour.',
          'Taint & Odor-Free Food Contact: Manufactured strictly from 100% virgin US FDA / EU / BIS compliant food-grade resins to avoid plastic odour or chemical migration into the dairy product.'
        ]
      },
      {
        title: 'Sectors & Liquid Packaging Applications',
        list: [
          'Dairy Processing Plants: Whole milk, skimmed milk, standardized milk, buttermilk and liquid curd/lassi.',
          'Alternative Dairy & Plant-Based Beverages: Soy milk, almond milk, and oat milk pouches.',
          'Edible Oils & Liquid Condiments: Free-flowing culinary oils, liquid ghee, sauces, and culinary syrups.',
          'Water & Rehydration Drinks: Mineral water pouches, packaged juices, and electrolyte drinks.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Lowest Unit Packaging Cost: Milk pouches represent the most economical liquid packaging format per liter—costing significantly less than HDPE bottles, glass bottles, and gable-top paperboard cartons.',
          'Ultra-Low Leakage Rates: Robust seal properties keep factory leakage thresholds below 0.1%, preventing costly distributor returns and batch contamination.',
          'High-Speed Machine Runnability: Precise web tension, uniform thickness profile (gauge variation within ±3–5%), and optimized slip reduce machine downtime and jaw sticking.',
          'Superior Flexographic Printability: Treated outer white layer (corona treated to 38–42 dynes/cm) delivers sharp, vibrant multi-color brand graphics, batch numbers, and barcode readability.',
          '100% Recyclable: Compatible with standard PE film recycling streams (Resin Identification Code #4 LDPE).'
        ]
      }
    ]
  },
  {
    id: 'bopp-wrap-around-labels',
    slug: 'bopp-wrap-around-labels',
    name: 'Wrap-Around BOPP Labels',
    category: 'FMCG',
    badge: '360° Branding',
    featured: false,
    subtitle: 'Continuous BOPP film labels for FMCG & beverage bottles on high-speed rotary labellers.',
    description: 'A Wrap-Around BOPP Label is a continuous film label made from Biaxially Oriented Polypropylene (BOPP). It is supplied in roll form and applied directly around bottles, jars, or cans using automated, high-speed rotary labelling machines with hot-melt glue.',
    thickness: '38 - 42 Micron',
    width: 'Custom label height',
    elongation: '300 - 800+ bottles/min',
    coreSize: 'Roll form',
    image: '/images/products/pearlizes_bopp_roll_1.jpeg',
    images: ['/images/products/pearlizes_bopp_roll_1.jpeg', '/images/products/pearlizes_bopp_roll_2.jpeg', '/images/products/pearlizes_bopp_roll_3.jpeg'],
    applications: ['Packaged drinking water', 'Soft drinks & juices', 'Edible oils, home & personal care'],
    sections: [
      {
        title: 'Overview',
        text: ['The label wraps 360 degrees around the container, giving brands full-coverage space for vibrant graphics, mandatory nutritional information, barcodes, and branding. Because it is made of plastic rather than paper, it will not tear, smudge, or peel when exposed to ice, water, moisture, or rough shipping.']
      },
      {
        title: 'Main Types of BOPP Wrap-Around Labels',
        list: [
          'Pearlized (White Opaque) BOPP: The most popular choice for bottled water and carbonated drinks. Features a glossy, pearl-white finish that makes printed colors pop without needing background white ink.',
          'Transparent (Clear) BOPP: Gives a clean, premium "no-label look," allowing consumers to see the liquid or product inside the bottle.',
          'Metallic / Metallized BOPP: Features a mirror-like silver foil shine. Ideal for energy drinks, premium beverages, and personal care products looking for a luxury shelf presence.',
          'Laminated Two-Ply BOPP (BOPP + BOPP): The printing ink is sandwiched between two layers of film ("reverse printing"). This makes the print 100% scratch-proof, chemical-resistant, and scuff-proof during transport.',
          'Matte Finish BOPP: Delivers a non-reflective, soft-touch satin finish for premium and organic FMCG products.'
        ]
      },
      {
        title: 'Key Features at a Glance',
        list: [
          '360-Degree Branding: Wraps the entire circumference of the bottle, maximizing visual shelf impact.',
          '100% Waterproof & Weatherproof: Does not wrinkle, bubble, or dissolve in ice buckets, refrigerators, or high-humidity tropical transit.',
          'Scratch & Scuff Resistant: Ink will not rub off when bottles rub against each other inside crates or shrink bundles.',
          'High-Speed Machine Compatibility: Engineered for automated rotary labeling machines running at 300 to 800+ bottles per minute (e.g., Krones, Sidel, Sacmi).',
          'Cost-Effective Alternative: Costs significantly less than self-adhesive (sticker) labels and full-body PVC/PET shrink sleeves.'
        ]
      },
      {
        title: 'Which Sectors Use BOPP Wrap-Around Labels?',
        list: [
          'Packaged Drinking Water: Single-serve (250 ml, 500 ml, 1 L, 2 L) mineral and spring water bottles.',
          'Carbonated Soft Drinks (CSD): Cola, lemon-lime sodas, energy drinks, and sparkling waters.',
          'Fruit Juices & Ready-to-Drink (RTD) Beverages: Bottled mango juices, apple juices, iced teas, and sports drinks.',
          'Dairy & Liquid Beverages: Flavored milk bottles, buttermilk (chaas), and drinking yogurts.',
          'Edible Oils & Condiments: PET bottles of cooking oil, vinegar, soy sauce, and ketchups.',
          'Home Care & Cleaning: Clear plastic bottles of dishwash liquids, surface cleaners, and hand sanitizers.',
          'Personal Care: Shampoo, liquid body wash, and hair oil bottles.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Lowest Cost Per Bottle: Uses a thin 38–42 micron film and small glue strips at the overlap edges, cutting secondary packaging costs by up to 40% compared to self-adhesive stickers.',
          'Zero Bottle Damage: Hot-melt glue can be easily separated during the PET bottle recycling washing process, making the container eco-friendly and fully recyclable.',
          'Maximum Output Speed: Clean cutting and consistent film tension minimize labeling machine downtime, knife jamming, and static electricity buildup.',
          'Long Shelf Life: Inks remain vibrant and fresh even after months of warehouse storage, direct light exposure, and cold storage.'
        ]
      }
    ]
  },
  {
    id: 'pearlised-bopp-ice-cream-pouches',
    slug: 'pearlised-bopp-ice-cream-pouches',
    name: 'Pearlised BOPP Ice Cream Pouches',
    category: 'FMCG',
    badge: 'Cold-Seal Ready',
    featured: false,
    subtitle: 'Premium pearlised BOPP flow-wrap packaging for ice creams and frozen confectionery.',
    description: 'A Pearlised BOPP Ice Cream Pouch (or flow-wrap film) is a flexible food-grade packaging material made from expanded, white-cavitated Biaxially Oriented Polypropylene (BOPP).',
    thickness: '30 - 40 Micron (mono)',
    width: 'Custom',
    elongation: '150 - 400+ packs/min',
    coreSize: 'Roll form (HFFS)',
    image: '/images/products/ice_cream_rolls_1.jpeg',
    images: ['/images/products/ice_cream_rolls_1.jpeg', '/images/products/ice_cream_rolls_2.jpeg', '/images/products/ice_cream_rolls_3.jpeg'],
    applications: ['Ice creams & frozen treats', 'Chocolates & bakery snacks', 'Premium soap wrapping'],
    sections: [
      {
        title: 'Overview',
        text: ['Recognized for its natural glossy, pearlescent white appearance, this film is engineered for continuous, high-speed Horizontal Form-Fill-Seal (HFFS / Flow-Wrap) packaging of ice creams, popsicles, and frozen confectionery. It creates an airtight, light-blocking seal that shields delicate dairy fats and frozen treats from melting, moisture loss, and freezer burn while running smoothly at sub-zero temperatures.']
      },
      {
        title: 'Core Types & Structures',
        list: [
          'Monolayer Pearlised BOPP (Standard Flow-Wrap): Single-layer printed film (typically 30–40 microns). Highly economical and lightweight, ideal for mass-market water icicles and standard ice cream sticks.',
          'Two-Ply Laminate (Clear BOPP + Pearlised BOPP): The print is reverse-printed on the outer clear film and laminated to the inner pearlised layer. This traps the ink safely inside, making the pack 100% scratch-proof and glossy.',
          'Cold-Seal Pearlised BOPP: Coated on the inner sealing zones with water-based cold-seal adhesive. The pack seals instantly with pressure alone (no heat), preventing chocolate coatings, cones, and ice cream from melting during sealing.',
          'Metallized Pearlised Laminate (BOPP Pearlised + Met-BOPP): Includes a metallic barrier layer to block out light and oxygen, extending the frozen shelf life of premium dairy-rich ice creams.'
        ]
      },
      {
        title: 'Key Technical Features',
        list: [
          'Low Density, High Yield: Cavitated microscopic air bubbles give the film a lower density (0.65–0.70 g/cm³), providing more pouches and surface area per kilogram compared to solid films.',
          'Sub-Zero Cold Flexibility: Specially formulated not to become brittle, crack, or tear when stored in deep freezers at -18°C to -25°C.',
          'Inherent Light Barrier: The pearly white structure naturally blocks light and UV rays, preventing dairy fat oxidation and preserving creamy taste.',
          'Wide Sealing Latitude: Supports high-integrity heat-sealing or heat-free pressure cold-sealing at speeds of 150 to 400+ packs per minute.',
          'High Slip & Anti-Static Control: Glides effortlessly over flow-wrap forming collars and cutting knives without sticking, jamming, or static buildup.'
        ]
      },
      {
        title: 'Applications',
        text: ['While primarily famous for ice cream, this versatile pearlised film and wrap format is used across multiple FMCG product lines:'],
        list: [
          'Ice Creams & Frozen Treats: Ice cream sticks, bars, chocolate-coated chocobars, ice lollies, fruit popsicles, kulfi sticks, ice cream sandwiches, waffle cones, and frozen dessert slices.',
          'Chocolates & Confectionery: Chocolate bars, wafer biscuits, and fudge sticks requiring heat-free cold sealing.',
          'Bakery & Snack Foods: Cookies, soft cakes, cream rolls, and energy/cereal bars.',
          'Personal Care & Soap Wrapping: Pearl-finish outer wrappers for premium bath soaps, shampoo bars, and hotel amenities.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Maximum Cost Efficiency: The lower density means you buy film by the kilogram but pack significantly more ice creams per roll, directly cutting packaging costs.',
          'Zero Melting Defect (Cold-Seal Ready): Pressure-activated sealing guarantees your chocolate coatings and delicate ice creams never melt near the heat jaws.',
          'Vibrant Shelf Appeal: The pearly white background provides a radiant, premium canvas that makes colorful fruit and chocolate illustrations pop inside brightly lit supermarket freezers.',
          'Moisture & Odor Barrier: Locks in internal freshness while preventing outside freezer odors or moisture ingress from spoiling the product texture.',
          '100% Recyclable: Formulated under Polypropylene recycling streams (PP #5), supporting your brand\'s sustainability initiatives.'
        ]
      }
    ]
  },
  {
    id: 'masala-spice-packaging-film',
    slug: 'masala-spice-packaging-film',
    name: 'Masala & Spice Packaging Film',
    category: 'FMCG',
    badge: 'Aroma Lock',
    featured: false,
    subtitle: 'Multi-layer laminated barrier film that locks in the aroma of whole & ground spices.',
    description: 'Masala Packaging Film is a multi-layer laminated barrier film engineered to pack whole, grounded, and blended spices. Spices contain delicate volatile essential oils (which give them their aroma and flavor) and natural fats that easily spoil when exposed to air, light, or moisture. This packaging film combines multiple polymer layers into a single composite material that locks in natural aroma, prevents moisture absorption (which causes powder clumping), blocks oxygen, and stops natural spice oils from leaking through the packet.',
    thickness: '45 - 110+ Micron',
    width: 'Custom',
    elongation: '2-Ply / 3-Ply laminates',
    coreSize: '76 mm (3")',
    image: '/images/products/masala_packaging_1.jpeg',
    images: ['/images/products/masala_packaging_1.jpeg', '/images/products/masala_packaging_2.jpeg', '/images/products/masala_packaging_3.jpeg', '/images/products/masala_packaging_4.jpeg'],
    applications: ['Ground spices & masala blends', 'Whole spices', 'Instant seasonings'],
    sections: [
      {
        title: 'Layer Structures',
        text: ['Spices cannot be packed in simple plastic bags; they require engineered 2-ply or 3-ply barrier laminates:'],
        table: {
          head: ['Structure', 'Layers', 'Best For'],
          rows: [
            ['Two-Layer (2-Ply Laminate)', 'PET + Poly (Natural or Milky PE) or BOPP + Met-BOPP', 'Low-cost, fast-moving spice packs, whole spices (cumin, mustard, pepper seeds), and short-to-medium shelf life products (3 to 6 months)'],
            ['Three-Layer Metallized (3-Ply Standard Barrier)', 'PET + MET-PET + Poly (LLDPE)', 'Ground spice powders (turmeric, chilli, coriander) and popular blended masalas. The metallic layer reflects light and keeps out moisture for 9 to 12 months'],
            ['Three-Layer Pure Foil (3-Ply Ultra-High Barrier)', 'PET + Aluminum Foil + Poly (LLDPE)', 'Premium seasonings, exported spices, curry pastes, and high-oil spices (cloves, cardamom, hing). 100% impermeable barrier for up to 18 to 24 months']
          ]
        }
      },
      {
        title: 'Key Technical Features',
        list: [
          'Aroma Retention: Traps volatile essential oils inside the packet so the spice smells fresh when opened by the consumer.',
          'Moisture & Humidity Lock: Stops atmospheric moisture from entering, preventing powdered spices from hardening into solid lumps.',
          'Oil & Pungency Resistance: Specialized inner sealant layers resist acidic and spicy oils (like capsaicin in red chilli) without delamination or pinhole leaks.',
          'Light & UV Shield: Metallized and aluminum foil layers block direct light that fades vibrant natural spice colors (such as the deep yellow of turmeric and bright red of chilli).',
          'Seal-Through-Powder Integrity: Sealed using metallocene-doped PE (mLLDPE), which creates an airtight thermal weld even if fine spice powder dusts the sealing area during packaging.'
        ]
      },
      {
        title: 'Packaging Formats Available',
        list: [
          'Continuous Roll Form: Supplied in rolls for high-speed automated Vertical Form-Fill-Seal (VFFS) collar machines (pouch packaging lines).',
          'Center-Seal & Pillow Pouches: The standard economical format for single-use sachets (Rs. 5 / Rs. 10 packs) and 50g–100g consumer packs.',
          'Stand-Up Pouches with Zipper (Doypack): Premium resealable pouches for 250g, 500g, and 1kg packs, allowing consumers to zip-close the pack after every use.',
          '3-Side & 4-Side Seal Pouches: Compact flat sachets for seasoning powders, instant noodle tastemakers, and restaurant table sachets.',
          'Gusseted Pouches: Side-folded bags used for bulk retail display of whole spices and restaurant supply packs.'
        ]
      },
      {
        title: 'Technical Specifications',
        table: {
          head: ['Property / Parameter', 'Standard Specification', 'Why It Matters'],
          rows: [
            ['Material Base', '100% Virgin Food-Grade PET, Met-PET, Foil, PE', 'Safe for edible spices (US FDA / BIS compliant)'],
            ['Thickness Range', '45 to 110+ Microns (depending on pack size)', 'Light sachets use 45–60 µm; 1kg packs use 90–110 µm'],
            ['Moisture Barrier (WVTR)', '< 1.0 to 0.1 g / (m² · 24h)', 'Prevents clumping and mould formation'],
            ['Oxygen Barrier (OTR)', '< 2.0 to 0.1 cm³ / (m² · 24h · bar)', 'Prevents fat rancidity and color fading'],
            ['Printing Quality', 'Up to 8 – 9 Colors (Rotogravure Printing)', 'Reverse-printed on PET for scratch-proof, high-gloss graphics'],
            ['Sealing Temperature', '120°C – 160°C', 'Fast hot-tack sealing on high-speed pouch lines'],
            ['Roll Core Size', '76 mm (3") standard heavy-duty paper core', 'Standard fit on all domestic and imported FFS machines']
          ]
        }
      },
      {
        title: 'Products Packed Using This Film',
        list: [
          'Daily Ground Spices: Turmeric powder (Haldi), Red Chilli powder (Mirch), Coriander powder (Dhania).',
          'Blended Spice Mixes: Garam Masala, Biryani Masala, Pav Bhaji Masala, Chaat Masala, Curry Powders.',
          'Whole Spices: Cardamom, Clove, Black Pepper, Cinnamon sticks, Cumin seeds, Mustard seeds.',
          'Dehydrated & Pungent Powders: Asafoetida (Hing), Dry Mango powder (Amchur), Garlic powder, Ginger powder.',
          'Instant Seasonings: Noodle tastemakers, soup powders, pasta seasoning mixes, peri-peri sprinklers.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Zero Aroma Leakage: Extends retail shelf life up to 12 to 24 months without flavor loss.',
          'High Machine Packing Speeds: Runs smoothly at 60 to 120+ pouches per minute on automated VFFS packaging lines without jamming.',
          'Scratch-Proof Brand Graphics: Reverse rotogravure printing places inks between the laminated layers, ensuring graphics cannot scratch off during bulk sack transport.',
          'Reduced Transport Weight: Replaces rigid tin cans and glass jars with flexible, lightweight pouches, cutting logistics costs and freight volume.'
        ]
      }
    ]
  },
  {
    id: 'agro-chemical-pouches',
    slug: 'agro-chemical-pouches',
    name: 'Agro Chemical Packaging Pouches',
    category: 'Agri',
    badge: 'High Barrier',
    featured: false,
    subtitle: 'Heavy-duty multi-layer barrier pouches for pesticides, fertilizers & crop chemicals.',
    description: 'An Agro Chemical Packaging Pouch is a heavy-duty, multi-layer laminated barrier pouch specifically engineered to safely pack liquid pesticides, weedicides, insecticides, fungicides, micronutrients, and chemical fertilizers. Agro chemicals contain aggressive active ingredients, organic solvents, acidic compounds, or hazardous powders. Unlike ordinary packaging, these specialized pouches use chemically resistant barrier layers that prevent solvent migration, delamination, chemical degradation, pinholing, and toxic leakage—ensuring complete safety for warehouse handlers, retail dealers, and farmers.',
    thickness: '70 - 180+ Micron',
    width: '10 ml - 5 L / 25 g - 10 kg',
    elongation: '3-Ply / 4-Ply laminates',
    coreSize: 'Pouches or printed rolls',
    image: '/images/packaging_showroom.jpg',
    images: ['/images/packaging_showroom.jpg'],
    applications: ['Insecticides & pesticides', 'Fungicides & herbicides', 'Fertilizers & bio-stimulants'],
    sections: [
      {
        title: 'Layer Structures',
        text: ['Agro chemical formulations require robust 3-ply or 4-ply barrier laminates to safely contain reactive compounds:'],
        table: {
          head: ['Layer', 'Function', 'Material'],
          rows: [
            ['Outer Layer', 'High Tensile & Print Protection', 'PET (Polyester) / BOPA (Nylon)'],
            ['Middle Layer 1', 'Puncture & Flex-Crack Barrier', 'BOPA (Nylon) / Met-PET'],
            ['Middle Layer 2', 'Total Chemical & Light Lock', 'Pure Aluminum Foil (ALU)'],
            ['Inner Layer', 'Solvent & High Seal Integrity', 'Special Co-Ex Chemical Grade PE']
          ]
        }
      },
      {
        title: 'Available Structures',
        list: [
          'Three-Layer Metallized (3-Ply Standard Barrier): PET + MET-PET + Special Barrier Poly (PE). Best for water-soluble fertilizers, bio-fertilizers, granular insecticides, sulfur powders, and non-corrosive agricultural chemicals.',
          'Three-Layer Pure Foil (3-Ply High Chemical Barrier): PET + Aluminum Foil + Chemical-Resistant PE. Best for wettable powders (WP), concentrated dry fungicides, and moderately active technical agro chemicals needing complete protection against moisture and UV sunlight.',
          'Four-Layer Heavy-Duty Foil (4-Ply Ultra-Barrier): PET + BOPA (Nylon) + Aluminum Foil + Specially Formulated PE / Surlyn. Best for liquid agro chemicals, emulsifiable concentrates (EC), suspensions (SC), active solvents, and export-grade hazardous formulations. The nylon layer provides extreme drop impact resistance and prevents flex-cracking.'
        ]
      },
      {
        title: 'Key Technical Features',
        list: [
          'High Chemical & Solvent Resistance: The inner sealant layer is formulated with specialized ethylene-based resins (such as Surlyn or co-extruded modified LLDPE) that will not soften, dissolve, swell, or delaminate in direct contact with harsh chemical solvents.',
          '100% Moisture & Vapor Lock: Pure aluminum foil layers provide zero moisture vapor transmission, preventing chemical powders from caking, reacting, or losing active efficacy.',
          'Extreme Puncture & Drop Impact Strength: Absorbs severe hydraulic shock when filled pouches are dropped during loading, unloading, or transit on bumpy rural roads.',
          'Zero Pinhole & Flex-Crack Resistance: High-grade oriented polyamide (Nylon/BOPA) in the laminate prevents micro-pinholes caused by continuous vibration in transit.',
          'Wide Seal Window & Hot-Tack: Ensures leak-proof seals on automatic pouch-filling and heat-sealing lines, even if fine chemical dust or liquid droplets splash onto the sealing jaw area.'
        ]
      },
      {
        title: 'Packaging Formats Available',
        list: [
          'Stand-Up Pouches with Spout / Cap: Ideal for liquid pesticides, plant growth regulators (PGR), and foliar sprays—allowing clean, safe pouring and re-capping.',
          'Stand-Up Pouches with Zipper (Doypack): Ideal for reusable dry products like bio-fertilizers, soluble micro-nutrients, and granular insecticides.',
          '3-Side / 4-Side Seal Flat Sachets: Perfect for single-dose liquid formulations, seed treatment chemicals, and small wettable powder doses (10 ml, 25 ml, 50g, 100g).',
          'Center-Seal / Pillow Pouches: The most cost-effective format for high-speed filling of granular insecticides and bulk bio-fertilizers.',
          'Heavy-Duty Side-Gusseted Bags: Designed for bulk packing (1 kg, 5 kg, 10 kg) of crop nutrients, water-soluble fertilizers, and soil conditioners.'
        ]
      },
      {
        title: 'Technical Properties & Specification',
        table: {
          head: ['Property / Parameter', 'Standard Specification', 'Why It Matters'],
          rows: [
            ['Laminate Base', '100% Virgin Grade PET, Nylon, Alu Foil, Chemical PE', 'High structural strength and chemical inertness'],
            ['Thickness Range', '70 to 180+ Microns (depending on chemical aggressiveness & volume)', 'Heavy gauge prevents bursting and solvent seepage'],
            ['Moisture Barrier (WVTR)', '< 0.05 g / (m² · 24h)', 'Blocks humidity; prevents chemical powder caking'],
            ['Oxygen Barrier (OTR)', '< 0.05 cm³ / (m² · 24h · bar)', 'Prevents oxidation of sensitive active ingredients'],
            ['Drop Impact Test', 'Passes 1.5 to 2.0 meter liquid/powder drop tests', 'Zero bursting during rough field distribution'],
            ['Printing Quality', 'Up to 8 – 9 Colors (Reverse Rotogravure Printing)', 'Clear statutory hazard warnings, dosages, and QR codes'],
            ['Sealing Temperature', '140°C – 190°C (Hermetic Thermal Sealing)', 'Prevents seam splitting and dangerous chemical leaks']
          ]
        }
      },
      {
        title: 'Which Sectors & Products Use These Pouches?',
        list: [
          'Insecticides & Pesticides: Emulsifiable Concentrates (EC), Soluble Liquids (SL), and Wettable Powders (WP).',
          'Fungicides & Bactericides: Powder and liquid formulations for crop disease management.',
          'Herbicides & Weedicides: Selective and non-selective weed control liquids and granules.',
          'Plant Growth Regulators (PGR) & Biostimulants: Concentrated liquid humic acids, amino acids, and sea-weed extract tonics.',
          'Crop Nutrition & Fertilizers: Water-Soluble Fertilizers (19:19:19, 0:52:34), chelated micronutrient powders, and zinc/boron compounds.',
          'Veterinary & Pest Control: Household rodenticides, public health sprays, and livestock disinfectants.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Replaces Heavy Plastic/Metal Cans: Cuts packaging procurement and storage space by up to 70% compared to rigid HDPE bottles and tin containers.',
          'Zero Leakage & Reduced Transit Liability: Prevents chemical fumes from escaping inside delivery trucks and storage warehouses, eliminating spillage claims.',
          'Superior Chemical Shelf Life: Guarantees 2 to 3 years of shelf stability without degradation of technical active percentages.',
          'Tamper-Evident & Counterfeit Protection: Supports holographic foil strips, specialized security inks, and unique QR codes to prevent agro-chemical adulteration.'
        ]
      },
      {
        title: 'General Specifications',
        table: {
          head: ['Parameter', 'Specification'],
          rows: [
            ['Product Name', 'Multi-Layer Barrier Agro Chemical Packaging Pouches'],
            ['Laminate Options', 'PET/MET-PET/PE | PET/ALU/PE | PET/NYLON/ALU/PE'],
            ['Thickness Range', '75 Micron to 180 Micron (Customized to liquid/powder type)'],
            ['Supply Format', 'Pre-Formed Pouches or Continuous Printed Lamination Rolls'],
            ['Pouch Configurations', 'Stand-Up Pouch, Spouted Pouch, 3-Side Seal Sachet, Zipper Doypack, Gusseted Bag'],
            ['Pack Size Capacity', '10 ml to 5 Liters (Liquids) | 25 grams to 10 kg (Powders/Granules)'],
            ['Closure Accessories', 'Child-resistant caps, pour spouts, tear notches, press-to-close zippers'],
            ['Print Technology', 'Reverse Rotogravure Printing (High-definition chemical-resistant inks)'],
            ['Certifications', 'Compliant with CIB (Central Insecticides Board) packaging norms & UN transport standards']
          ]
        }
      }
    ]
  },
  {
    id: 'multi-layer-laminated-pouches',
    slug: 'multi-layer-laminated-pouches',
    name: 'Multi-Layer Laminated Pouches',
    category: 'Industrial',
    badge: 'Custom Printed',
    featured: true,
    subtitle: 'Custom laminated pouches for FMCG & industrial packaging — stand-up, zipper, spouted and more.',
    description: 'Custom Multi-Layer Laminated Pouches for FMCG & industrial packaging, available in stand-up, zipper, spouted, 3-side seal, center-seal and side-gusset formats with 2-ply, 3-ply and 4-ply barrier structures, reverse rotogravure printed in up to 8–9 colours.',
    thickness: '50 - 200 Micron',
    width: '5 g - 10 kg capacity',
    elongation: '2-Ply / 3-Ply / 4-Ply',
    coreSize: 'Pre-formed pouches',
    image: '/images/packaging_showroom.jpg',
    images: ['/images/packaging_showroom.jpg', '/images/rotogravure_press.jpg'],
    applications: ['Snacks, tea, coffee & staples', 'Personal care & home hygiene', 'Hardware, chemicals & electronics'],
    sections: [
      {
        title: 'Popular Formats & Styles',
        list: [
          'Stand-Up Pouch (Doypack): Features a bottom gusset that opens up, allowing the pouch to stand upright on retail shelves. Examples: ground coffee, dry fruits, protein powders, pet treats, detergents.',
          'Stand-Up Pouch with Resealable Zipper: Adds a press-to-close or slider zip lock so customers can reopen and reseal the pack multiple times. Examples: tea leaves, namkeen/snacks, dry fruit mixes, bath salts.',
          'Spouted Pouch (Pouch with Pouring Cap): Replaces rigid plastic bottles with a flexible body fitted with a reclosable screw cap for clean, spill-free dispensing. Examples: liquid hand wash, dishwash refill gels, tomato ketchup, edible oil, lubricants, engine oils.',
          'Three-Side Seal Flat Pouch / Sachet: Sealed on three edges with one open end for filling. Highly economical, flat, and compact. Examples: shampoo sachets, instant soup powders, seasoning packs, pharmaceutical tablets, surgical gauze.',
          'Center-Seal / Pillow Pouch: Formed with a back fin seal and top/bottom seals—the classic format for automated high-speed VFFS packaging. Examples: potato chips, biscuits, extruded snacks, pulses, detergent powders.',
          'Side-Gusseted / Quad-Seal Pouch: Features side folds that expand into a box-like shape, providing four flat panels for 360-degree branding. Examples: whole coffee beans, basmati rice, animal feed, bulk industrial granules.'
        ]
      },
      {
        title: 'Core Layer Combinations',
        table: {
          head: ['Structure', 'Best For', 'Product Examples'],
          rows: [
            ['2-Ply Laminate (PET + PE or BOPP + CPP)', 'General snacks, biscuits, short-to-medium shelf life foods, and light industrial hardware', 'Bread, pasta, noodles, textile packaging, plastic screw packets'],
            ['3-Ply Metallized Barrier (PET + MET-PET + PE)', 'Products sensitive to moisture, oxygen, and light needing 9 to 12-month shelf life', 'Spices, crispy potato wafers, milk powders, bath soaps, detergent powders'],
            ['3-Ply / 4-Ply Pure Foil Ultra-Barrier (PET + ALU + PE or PET + NYLON + ALU + PE)', 'Aseptic, vacuum, aggressive chemical, or long-term export protection (up to 24 months)', 'Ready-to-eat retort meals, agrochemical powders, pharmaceutical grade powders, diagnostic kits']
          ]
        }
      },
      {
        title: 'Key Technical Features',
        list: [
          'Tailored Barrier Control: Shields contents against Water Vapor Transmission (WVTR) and Oxygen Transmission (OTR), preventing food sogginess and oil rancidity.',
          'High Seal Integrity: Sealed using metallocene-doped sealant layers (mLLDPE or CPP), delivering strong leak-proof seams even when powders or oils splash near the seal line.',
          'Reverse Printing Inks: Artwork is printed on the underside of the clear outer film. The ink sits safely between the layers, so it will never scratch off, smear, or touch the product inside.',
          'Puncture & Burst Strength: Withstands drops, compression stacking, and vibration shocks during intermodal truck freight.'
        ]
      },
      {
        title: 'Applications Across Different Sectors',
        list: [
          'Dry Snacks & Confectionery: Chips, bhujia, popcorn, chocolates, hard candies.',
          'Beverages & Staples: Tea, coffee powder, health drink mixes, flours (atta), pulses (dal).',
          'Processed & Ready Foods: Ready-to-eat curries, noodles, pasta, instant sauces.',
          'Toiletries: Shampoo refills, conditioner sachets, facial scrub packs, liquid hand washes.',
          'Cleaning: Washing machine liquid pouches, fabric softeners, floor cleaner refills.',
          'Hardware & Fasteners: Screws, nuts, washers, electrical clips packed without puncture tears.',
          'Chemicals & Lubricants: Greases, gear oils, adhesives, sealants, diagnostic reagents.',
          'Electronics & Engineering: Moisture-sensitive electronic boards, VCI-treated spare parts bags.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Up to 70% Cheaper than Rigid Packaging: Replaces heavy glass bottles, tin cans, and plastic jars with lightweight flexible pouches, dramatically lowering unit packaging costs.',
          'Lower Transport & Storage Costs: Empty, un-filled pouches ship flat in compact master cartons, taking up a fraction of the warehouse space needed for empty rigid cans or bottles.',
          'Longer Product Shelf Life: Airtight barrier layers lock out external moisture and oxygen, reducing market product returns and spoilage losses.',
          'Consumer-Friendly Convenience: Lightweight, unbreakable, easy to open, easy to reseal, and simple to carry.'
        ]
      },
      {
        title: 'Specifications',
        table: {
          head: ['Parameter', 'Specification'],
          rows: [
            ['Product Category', 'Custom Multi-Layer Laminated Pouches'],
            ['Available Structures', 'PET/PE | BOPP/PE | PET/MET-PET/PE | PET/ALU/PE | PET/NYLON/PE'],
            ['Pouch Formats', 'Stand-up Pouch, Zipper Pouch, Spouted Pouch, 3-Side Seal, Center-Seal, Side Gusset'],
            ['Thickness Range', '50 Micron to 200 Micron (Customized based on weight)'],
            ['Capacity', '5 g to 10 kg (Custom sizes available)'],
            ['Surface Enhancements', 'High Gloss, Soft-Touch Matt, Metallic Foil Highlights, Clear Display Windows'],
            ['Closure Options', 'Resealable Press-Zip, Slider Zip, Pouring Spout & Cap, Tear Notches, Euro-slot / Round Punch'],
            ['Printing Technology', 'Reverse Rotogravure Printing (up to 8–9 colors)'],
            ['Industry Compliance', 'Food Contact Approved (US FDA / BIS / REACH / RoHS)']
          ]
        }
      }
    ]
  },
  {
    id: 'oil-packaging-film',
    slug: 'oil-packaging-film',
    name: 'Edible & Industrial Oil Packaging Film',
    category: 'Industrial',
    badge: 'Seal-Through-Oil',
    featured: false,
    subtitle: 'High-barrier multi-layer film for edible oils, ghee, motor oils and lubricants.',
    description: 'Oil Packaging Film is a specialized, multi-layer co-extruded and laminated flexible film engineered specifically for liquid packing of edible oils, culinary fats, motor oils, and lubricants. Oils and oily liquids present unique packaging challenges: they degrade under light, turn rancid when exposed to air, and tend to seep through or weaken regular plastics. Oil packaging film uses specialized barrier resins and sealing layers that prevent oil migration, eliminate package sweating, and seal reliably right through liquid oil splashes on high-speed filling lines.',
    thickness: '85 / 95 / 105 / 115 Micron',
    width: '320 - 325 mm / Custom',
    elongation: '3-Layer / 5-Layer / Laminate',
    coreSize: '76 mm (3")',
    image: '/images/products/oil_pouches_1.jpeg',
    images: ['/images/products/oil_pouches_1.jpeg', '/images/products/oil_pouches_2.jpeg', '/images/products/oil_pouches_3.jpeg'],
    applications: ['Edible cooking oils', 'Ghee & vanaspati', 'Engine oils & lubricants'],
    sections: [
      {
        title: 'Layer Structures',
        text: ['Because oils are heavy and chemically active liquids, they require engineered multi-layer co-extruded films or multi-ply laminates:'],
        list: [
          'Five-Layer Co-Extruded Blown PE Film (PE / Tie / EVOH or Nylon (PA) / Tie / mLLDPE): Outer PE provides printability, scuff resistance and strength; the EVOH/Nylon core creates an oxygen and aroma lock and resists flex-cracking; the mLLDPE inner sealant melts and fuses cleanly through oil drops. Best for high-speed VFFS packing of daily cooking oils.',
          'Three-Layer Heavy-Duty Co-Ex Film (White LDPE / Core LLDPE / Modified Sealant PE): High-opacity white masterbatch reflects sunlight, paired with tough metallocene polymers to absorb hydraulic shock. Best for cost-effective packing of mustard, refined sunflower and palm oil.',
          'Multi-Ply Printed Barrier Laminates (PET + Nylon (BOPA) + PE or PET + Metallized Barrier + PE): PET provides high-gloss reverse printing that won\'t smear if oil drips outside, while Nylon prevents pinholing during long-distance transit. Best for premium edible oils, ghee pouches, motor oils, and spouted stand-up pouches.'
        ]
      },
      {
        title: 'Key Technical Features',
        list: [
          'Seal-Through-Oil Capability: Seals tightly even if droplets of oil splash across the seal area during high-speed vertical filling.',
          'No Oil Seepage / Anti-Grease Barrier: Specially cross-linked resins stop fatty acids and oils from penetrating the plastic layers (no slippery or sticky pouch exteriors).',
          'High Drop & Hydraulic Shock Resistance: Absorbs the sudden fluid impact when a pouch is dropped from delivery trucks or stacked in crates.',
          'Oxygen & UV Light Shield: Blocks sunlight and atmospheric oxygen, preserving nutritional vitamins (Vitamin A & D) and preventing oxidation or foul odors.',
          'Controlled Slip Profile (COF): Moves smoothly through high-speed machine forming collars without sticking, jamming, or stretching out of shape.'
        ]
      },
      {
        title: 'Which Sectors & Products Use This Film?',
        list: [
          'Edible Cooking Oils: Mustard oil, sunflower oil, soyabean oil, groundnut (peanut) oil, palm oil, rice bran oil, and coconut oil.',
          'Dairy & Traditional Fats: Liquid ghee, clarified butter, and vanaspati.',
          'Automotive & Industrial Lubricants: 2T/4T engine oils, brake fluids, gear lubricants, and hydraulic oils.',
          'Culinary & Foodservice: Bulk institutional pouches (2 Liters to 5 Liters) for commercial restaurant kitchens.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Up to 60% Cheaper than Rigid Cans & Bottles: Flexible pouches use significantly less raw material by weight compared to tin cans and heavy PET/HDPE bottles.',
          'Ultra-Low Leakage Rates: Robust seal integrity keeps factory leak rates below 0.1%, eliminating messy warehouse cleanup and damaged outer corrugated boxes.',
          'Saves Transport Space: Flat rolls take up far less storage and freight space prior to filling than empty rigid cans and bottles.',
          'Vibrant Brand Visibility: Corona-treated surfaces support high-definition surface or reverse printing (up to 8 colours) that resists fading from handling.'
        ]
      },
      {
        title: 'Specifications',
        table: {
          head: ['Parameter', 'Specification'],
          rows: [
            ['Product Name', 'Multi-Layer Co-extruded Oil Packaging Film & Pouches'],
            ['Structure Types', '3-Layer Co-Ex PE | 5-Layer Barrier (Nylon/EVOH) | Laminated PET/PE'],
            ['Film Formats', 'Continuous Roll Film (for VFFS machines) or Pre-formed Pouches'],
            ['Standard Thicknesses', '85 µm, 95 µm, 105 µm, 115 µm'],
            ['Roll Widths', '320 mm to 325 mm (for 500 ml / 1 L standard pouches) or custom'],
            ['Colour Options', 'Milky White, Natural Translucent, Two-Tone (Yellow/White)'],
            ['Core Size', '76 mm (3 inches) heavy-duty core'],
            ['Machine Compatibility', 'Suitable for automatic high-speed liquid pouch packaging lines']
          ]
        }
      }
    ]
  },
  {
    id: 'atta-flour-packaging-film',
    slug: 'atta-flour-packaging-film',
    name: 'Atta & Flour Packaging Film',
    category: 'FMCG',
    badge: 'Burst Proof',
    featured: false,
    subtitle: 'High-strength laminated film for wheat flour, maida, besan and grain flours.',
    description: 'Atta (Wheat Flour) Packaging Film is a heavy-duty, multi-layer laminated or co-extruded flexible packaging material engineered to pack wheat flour, maida, sooji, besan, and other grain flours. Flour is a dense, heavy powder that creates high hydraulic burst pressure when dropped, and fine flour dust naturally contaminates sealing surfaces during high-speed vertical filling. Milled grain also absorbs airborne moisture quickly, causing insect infestation (weevils), mold growth, and lump formation. Atta packaging film uses tough, puncture-resistant polymers and dust-tolerant sealing layers to ensure airtight, burst-proof bags from the mill to the consumer\'s kitchen.',
    thickness: 'Heavy-duty laminate',
    width: '1 kg - 25 kg packs',
    elongation: '2-Ply / 3-Ply laminates',
    coreSize: 'Rolls or pre-formed bags',
    image: '/images/products/aata_packaging_1.jpeg',
    images: ['/images/products/aata_packaging_1.jpeg', '/images/products/aata_packaging_2.jpeg'],
    applications: ['Wheat atta & maida', 'Besan, sooji & millet flours', 'Commercial flour sacks'],
    sections: [
      {
        title: 'Popular Formats & Styles',
        list: [
          'Center-Seal Pillow Pouch (Form-Fill-Seal Rolls): The standard, high-speed automated format with a vertical back seam and top/bottom seals. Examples: 1 kg and 2 kg packs of whole wheat atta, maida, and besan.',
          'Side-Gusseted Bags with D-Cut / Two-Hole Punch Handle: Expanding side folds provide flat front and back panels for branding, while an integrated punch handle lets consumers carry heavy bags comfortably. Examples: 5 kg and 10 kg retail packs of chakki fresh atta and multi-grain flour.',
          'Stand-Up Pouch with Resealable Zipper (Doypack): Premium self-standing pouch with an airtight press-to-close zipper. Examples: premium organic flours, almond flour, gluten-free quinoa flour, diabetic-care grain blends (500 g to 1 kg).',
          'Heavy-Duty Bottom-Sealed Wicket / Open-Mouth Bags: Pre-formed heavy-gauge bags filled on semi-automatic machines and sealed with heat or sewing bands. Examples: 10 kg, 20 kg, and 25 kg commercial flour sacks for bakeries, restaurants, and wholesalers.'
        ]
      },
      {
        title: 'Core Layer Structures',
        text: ['Because flour packages carry substantial weight (1 kg up to 10 kg), they utilize engineered 2-ply or 3-ply structures:'],
        table: {
          head: ['Structure', 'Best For', 'Function'],
          rows: [
            ['Two-Ply: PET + Heavy mLLDPE / White PE', 'Standard 1 kg, 2 kg, and 5 kg retail packs', 'Outer PET delivers high-gloss, reverse-printed graphics that never scuff; thick metallocene PE absorbs drop impact and seals through fine powder dust'],
            ['Two-Ply: Matte / Gloss BOPP + Extruded PE', 'Economical 5 kg and 10 kg bulk packs', 'BOPP provides stiffness, good tear resistance, and an organic paper-like matte finish popular in modern retail branding'],
            ['Three-Ply Reinforced: PET + Nylon (BOPA) + PE', '5 kg and 10 kg premium export packs or long-distance rural distribution', 'Nylon core eliminates flex-cracking, pinholes, and burst failures when bags undergo repeated drops during rough truck transit']
          ]
        }
      },
      {
        title: 'Key Technical Features',
        list: [
          'Seal-Through-Dust Integrity: Formulated with high-tack metallocene resins (mLLDPE) that melt around and encapsulate airborne flour dust particles, forming a hermetic seal without pinholes.',
          'Drop & Burst Impact Resistance: High tensile elongation absorbs the sudden shock when a 5 kg or 10 kg bag is dropped onto warehouse floors or pallet edges.',
          'Moisture & Pest Barrier: Maintains low moisture vapor transmission to keep flour dry, preventing lump formation, fungal growth, and weevil breeding.',
          'Anti-Skid / Matte Outer Surface: Optional anti-slip coatings or matte finishes prevent bags from sliding and falling when stacked high on warehouse pallets.',
          'Air Evacuation Channels (Micro-Perforation / Venting): Optional micro-pin vents allow trapped air to escape when bags are compressed on pallets, preventing ballooning without leaking powder.'
        ]
      },
      {
        title: 'Flour & Grain Products Packed',
        list: [
          'Daily Wheat Flours: Chakki Fresh Atta, Whole Wheat Flour, Refined Wheat Flour (Maida).',
          'Pulse & Legume Flours: Gram Flour (Besan), Roasted Chana Flour, Sattu.',
          'Millet & Alternative Grain Flours: Ragi (Finger Millet) Flour, Jowar Flour, Bajra Flour, Corn Flour (Makki Atta).',
          'Specialty Baking Ingredients: Semolina (Sooji / Rava), Cake Flours, Rice Flour, Starch Powders.',
          'Specialty Health Blends: Multi-Grain Atta, Keto Flour, Spelt Flour, Organic Buckwheat Flour.'
        ]
      },
      {
        title: 'Business & Operational Benefits',
        list: [
          'Zero Packaging Ruptures: Heavy-duty sealant formulation keeps transit drop breakage below 0.1%, eliminating messy cleanup and stock rejections.',
          'High-Speed Packaging Efficiency: Precise roll slip (COF) and rapid hot-tack allow high-speed packaging lines to run continuously at 40 to 80 packs per minute.',
          'Extended Retail Shelf Life: Airtight barriers keep flour fresh, fragrant, and free of insects for up to 6 to 9 months under varying humidity conditions.',
          'Scratch-Proof Shelf Presentation: Reverse rotogravure printing traps inks beneath the outer film, ensuring vibrant brand graphics remain pristine despite rough distribution.'
        ]
      }
    ]
  }
];

// Products listed in the same order as the doc: FMCG, then Industrial, then Agri
const DOC_ORDER = ['ldpe-shrink-film', 'milk-packaging-film', 'bopp-wrap-around-labels', 'pearlised-bopp-ice-cream-pouches', 'masala-spice-packaging-film', 'atta-flour-packaging-film', 'stretch-hood-film', 'collation-shrink-film', 'ldpe-lamination-film', 'ldpe-liners-pouches', 'vci-film', 'industrial-stretch-film', 'vci-stretch-film', 'multi-layer-laminated-pouches', 'oil-packaging-film', 'recycled-stretch-wrap', 'silage-stretch-film', 'agricultural-mulch-film', 'low-tunnel-film', 'agro-chemical-pouches', 'greenhouse-film'];

export const PRODUCTS = [...CATALOGUE].sort((a, b) => DOC_ORDER.indexOf(a.id) - DOC_ORDER.indexOf(b.id));
