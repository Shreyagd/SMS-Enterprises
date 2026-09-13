import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initial seed data with authentic details from SMS Enterprises PDF
const initialData = {
  settings: {
    companyName: 'SMS ENTERPRISES',
    brandName: 'SWASTIK',
    tagline: 'Revolutionizing Package & Defining the Brand - SWASTIK',
    founder: '~GD KISHORE',
    experienceYears: '05+',
    teamMembers: '40+',
    happyCustomers: '100+',
    vendorPartners: '30+',
    phone: '+91 6363658501',
    altPhone: '+91 87654 32109',
    email: 'swastik.smsenterprises@gmail.com',
    salesEmail: 'sales@smsenterprises.in',
    gstin: '29AXPPS0862E1Z1',
    address: 'No.17 Chamundeshwari Layout, Lakshmipura Main Road, Bengaluru-562162',
    workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM, Sunday: Closed',
    adminEmail: 'admin@smsenterprises.com',
    adminPassword: 'SMSAdmin@2025' // can be changed via admin settings
  },
  products: [
    {
      id: 'prod-1',
      name: 'Machine Stretch Film',
      category: 'Stretch Film',
      subtitle: 'Engineered for high-speed automatic wrapping machines with superior stretch & cling',
      description: 'Our high-performance Machine Stretch Film is manufactured using advanced multi-layer cast and blown extrusion technology. It provides exceptional load-holding force, up to 300% elongation, and high puncture resistance for pallet transit.',
      thickness: '12 - 35 Micron',
      width: '500 mm / Customized',
      elongation: 'Up to 300%',
      coreSize: '76 mm (3 inch)',
      image: '/images/prod_stretch_film.jpg',
      badge: 'High Speed Rated',
      featured: true,
      applications: ['Automated turntable wrappers', 'High-volume logistics pallets', 'Beverage & FMCG palletizing']
    },
    {
      id: 'prod-2',
      name: 'Hand Stretch Film',
      category: 'Stretch Film',
      subtitle: 'Easy to use for manual wrapping applications. Strong, durable & reliable.',
      description: 'Premium grade manual hand stretch film roll designed for lightweight handling without sacrificing tension or load containment. Features ergonomic core rolls and silent unwind.',
      thickness: '15 - 29 Micron',
      width: '450 mm - 500 mm',
      elongation: 'Up to 180%',
      coreSize: '50 mm or 76 mm',
      image: '/images/hero_pallet.jpg',
      badge: 'Popular Manual',
      featured: true,
      applications: ['Manual box bundling', 'Odd-shaped cargo', 'Warehouse picking stations']
    },
    {
      id: 'prod-3',
      name: 'Mini Stretch Film (Bundle Wrap)',
      category: 'Stretch Film',
      subtitle: 'Compact size for small loads, cable bundling and easy handling.',
      description: 'Narrow width stretch film ideal for bundling pipes, profiles, cartons, cables, and hardware without sticky adhesive residue.',
      thickness: '20 - 23 Micron',
      width: '100 mm - 250 mm',
      elongation: 'Up to 200%',
      coreSize: '38 mm / 50 mm plastic core',
      image: '/images/prod_stretch_film.jpg',
      badge: 'Easy Bundling',
      featured: false,
      applications: ['Hardware & lumber bundling', 'Textile rolls', 'Couriers & dispatch packages']
    },
    {
      id: 'prod-4',
      name: 'Pre-Stretch Film',
      category: 'Stretch Film',
      subtitle: 'High performance film with excellent stretchability and cost efficiency.',
      description: 'Pre-stretched during production to reduce manual operator fatigue and save up to 50% on plastic consumption while providing rigid pallet locking.',
      thickness: '8 - 12 Micron',
      width: '430 mm - 500 mm',
      elongation: 'Pre-oriented high tension',
      coreSize: '50 mm / Coreless available',
      image: '/images/pallet_machine.jpg',
      badge: 'Eco Cost Saver',
      featured: true,
      applications: ['Heavy carton loads', 'Temperature sensitive goods', 'Sustainable eco packaging']
    },
    {
      id: 'prod-5',
      name: 'LDPE Shrink Film',
      category: 'LDPE Shrink Film',
      subtitle: 'Heavy-duty secondary packaging for beverage multipacks, cans, and bulk containers.',
      description: 'High tensile strength LDPE shrink film engineered for heat tunnels. Provides tight crystal-clear bundle containment for bottled water, soda cans, and jars.',
      thickness: '35 - 120 Micron',
      width: '200 mm - 1600 mm',
      elongation: 'Shrink ratio: 60-70% TD / 10-20% MD',
      coreSize: '76 mm',
      image: '/images/prod_shrink_film.jpg',
      badge: 'Heavy Duty',
      featured: true,
      applications: ['Packaged drinking water', 'Canned beverages', 'Food & chemical multipacks']
    },
    {
      id: 'prod-6',
      name: 'Bopp Laminated Rolls & Pouches',
      category: 'Bopp Laminated Roll',
      subtitle: 'High-barrier printed multi-layer laminated film rolls for food, spice, and retail packaging.',
      description: 'Printed on our state-of-the-art 600m/min rotogravure printing machine. Offers moisture barrier, aroma preservation, and vivid photo-realistic branding.',
      thickness: '40 - 150 Micron laminated structure',
      width: 'Custom printed roll widths',
      elongation: 'Dimensionally stable',
      coreSize: '76 mm',
      image: '/images/packaging_showroom.jpg',
      badge: 'High Barrier Rotogravure',
      featured: true,
      applications: ['Spices, coffee, tea', 'Dry fruits & pulses', 'Snacks & confectionery packaging']
    },
    {
      id: 'prod-7',
      name: 'Agri Packaging & Silage Stretch Film',
      category: 'Agri Packaging Films',
      subtitle: 'UV-stabilized agricultural films for silage bales, mulch beds, and greenhouse covers.',
      description: 'Engineered for Indian and global farming conditions with multi-layer co-extrusion. Includes black/silver mulch films, green silage stretch wraps for hay preservation, and solarization films.',
      thickness: '25 - 200 Micron',
      width: '750 mm - 1200 mm',
      elongation: 'High puncture resistance against stalks',
      coreSize: '76 mm heavy paper core',
      image: '/images/prod_agri_film.jpg',
      badge: '12-Month UV Stabilized',
      featured: true,
      applications: ['Silage round bale wrapping', 'Mulch film agricultural beds', 'Greenhouse low tunnels']
    },
    {
      id: 'prod-8',
      name: 'Pharma & Industrial Garbage Bags',
      category: 'Pharma Garbage Bags',
      subtitle: 'Puncture-proof, leak-resistant biohazard and industrial heavy-duty waste collection rolls.',
      description: 'Heavy duty Star-sealed bottom rolls available in clinical colors (Black, Blue, Yellow, Red) for hospital biomedical management and warehouse hygiene.',
      thickness: '25 - 60 Micron',
      width: 'Customized sizes (Small to Jumbo Bin)',
      elongation: 'High dart drop impact resistance',
      coreSize: 'Perforated roll',
      image: '/images/prod_agri_film.jpg',
      badge: 'Biohazard & Heavy Duty',
      featured: false,
      applications: ['Hospitals & pharma cleanrooms', 'Industrial manufacturing plants', 'Hotels & commercial facilities']
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Multi-Layer Film Extrusion Plant',
      category: 'Infrastructure',
      description: 'Towering multi-story high-speed blown film co-extrusion line producing ultra-consistent gauge stretch and barrier films.',
      image: '/images/extrusion_plant.jpg'
    },
    {
      id: 'gal-2',
      title: 'High-Speed Rotogravure Printing Press',
      category: 'Printing Plant',
      description: '600 m/min multi-color rotogravure printing line delivering photorealistic graphic accuracy for BOPP and laminated rolls.',
      image: '/images/rotogravure_press.jpg'
    },
    {
      id: 'gal-3',
      title: 'Laminated Rolls & Pouches Showroom',
      category: 'Products',
      description: 'Comprehensive display of finished pouches, standing zip pouches, and printed packaging for food, agriculture & retail.',
      image: '/images/packaging_showroom.jpg'
    },
    {
      id: 'gal-4',
      title: 'Automated Pallet Wrapping In Action',
      category: 'Applications',
      description: 'Heavy industrial pallet wrapped flawlessly with SMS Enterprises high-tensile stretch film on turntable wrapper.',
      image: '/images/pallet_machine.jpg'
    },
    {
      id: 'gal-5',
      title: 'Industrial Pallet Logistics Ready for Transit',
      category: 'Applications',
      description: 'Secure multi-stack carton shipment wrapped with high load-holding film for zero damage transportation.',
      image: '/images/hero_pallet.jpg'
    },
    {
      id: 'gal-6',
      title: 'Agricultural Silage & Mulch Solutions',
      category: 'Agriculture',
      description: 'UV-stabilized silage stretch wrapping bales stacked on farm field with black mulch bed roll.',
      image: '/images/prod_agri_film.jpg'
    },
    {
      id: 'gal-7',
      title: 'Regd. Office & Production Facility',
      category: 'Headquarters',
      description: 'SMS Enterprises modern manufacturing unit at Chamundeshwari Layout, Lakshmipura Main Road, Bengaluru.',
      image: '/images/factory_building.jpg'
    }
  ],
  quotes: [
    {
      id: 'RFQ-1001',
      date: '2026-09-10T10:15:00.000Z',
      name: 'Ramesh Patel',
      company: 'Apex Logistics & Warehousing',
      email: 'ramesh.p@apexlogistics.in',
      phone: '+91 98450 11223',
      productType: 'Machine Stretch Film',
      thickness: '23 Micron',
      quantity: '500 Rolls',
      destination: 'Whitefield, Bengaluru',
      message: 'Need quotation for monthly regular supply of 500 rolls with test certificate.',
      status: 'Quoted',
      adminNotes: 'Quotation sent at ₹145/kg + GST on Sept 10. Follow up on Monday.'
    },
    {
      id: 'RFQ-1002',
      date: '2026-09-11T09:30:00.000Z',
      name: 'Kavitha S.',
      company: 'PureDrops Beverages Ltd',
      email: 'procurement@puredrops.com',
      phone: '+91 99801 44556',
      productType: 'LDPE Shrink Film',
      thickness: '60 Micron',
      quantity: '2 Metric Tons',
      destination: 'Peenya Industrial Area',
      message: 'Require shrink film for 500ml water bottles bundling line. High clarity required.',
      status: 'New',
      adminNotes: ''
    },
    {
      id: 'RFQ-1003',
      date: '2026-09-11T14:20:00.000Z',
      name: 'Sunil Gowda',
      company: 'GreenEarth Organics',
      email: 'sunil@greenearth.co',
      phone: '+91 88612 77889',
      productType: 'Agri Packaging & Silage Stretch Film',
      thickness: '25 Micron UV',
      quantity: '150 Rolls',
      destination: 'Hassan, Karnataka',
      message: 'Looking for UV-stabilized silage stretch film for dairy farm baling.',
      status: 'In Review',
      adminNotes: 'Assigned to South regional sales executive.'
    }
  ],
  messages: [
    {
      id: 'msg-1',
      date: '2026-09-10T16:45:00.000Z',
      name: 'Anand Verma',
      email: 'anand.verma@transind.com',
      phone: '+91 97410 99887',
      subject: 'Distributorship Inquiry for Tamil Nadu',
      message: 'Hello, we are packaging distributors across Chennai and Coimbatore. We would like to discuss dealership terms for your stretch films and BOPP tapes.',
      status: 'Read'
    },
    {
      id: 'msg-2',
      date: '2026-09-11T11:00:00.000Z',
      name: 'Meera Nambiar',
      email: 'meera.n@biopharma.in',
      phone: '+91 94480 33221',
      subject: 'Custom Heavy Duty Garbage Bags for Cleanroom',
      message: 'We require customized biomedical waste rolls with custom barcode print. Please arrange a sample set at our facility.',
      status: 'Unread'
    }
  ]
};

// Database load & save functions
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading database file, using defaults:', err);
  }
  // Initialize default file if not exists
  saveData(initialData);
  return initialData;
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to database file:', err);
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Full state (for frontend sync)
app.get('/api/data', (req, res) => {
  const data = loadData();
  res.json(data);
});

// Submit Quote (Public / RFQ)
app.post('/api/quotes', (req, res) => {
  const data = loadData();
  const newQuote = {
    id: 'RFQ-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString(),
    name: req.body.name || 'Anonymous',
    company: req.body.company || 'Not Specified',
    email: req.body.email || '',
    phone: req.body.phone || '',
    productType: req.body.productType || 'Stretch Film',
    thickness: req.body.thickness || 'Standard',
    quantity: req.body.quantity || '1',
    destination: req.body.destination || '',
    message: req.body.message || '',
    status: 'New',
    adminNotes: ''
  };
  data.quotes.unshift(newQuote);
  saveData(data);
  res.status(201).json({ success: true, quote: newQuote });
});

// Update Quote Status / Notes (Admin Only)
app.put('/api/quotes/:id', (req, res) => {
  const data = loadData();
  const index = data.quotes.findIndex(q => q.id === req.params.id);
  if (index !== -1) {
    data.quotes[index] = { ...data.quotes[index], ...req.body };
    saveData(data);
    res.json({ success: true, quote: data.quotes[index] });
  } else {
    res.status(404).json({ error: 'Quote not found' });
  }
});

// Delete Quote (Admin Only)
app.delete('/api/quotes/:id', (req, res) => {
  const data = loadData();
  data.quotes = data.quotes.filter(q => q.id !== req.params.id);
  saveData(data);
  res.json({ success: true });
});

// Submit Message (Public / Contact Us)
app.post('/api/messages', (req, res) => {
  const data = loadData();
  const newMsg = {
    id: 'MSG-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString(),
    name: req.body.name || 'Anonymous',
    email: req.body.email || '',
    phone: req.body.phone || '',
    subject: req.body.subject || 'General Inquiry',
    message: req.body.message || '',
    status: 'Unread'
  };
  data.messages.unshift(newMsg);
  saveData(data);
  res.status(201).json({ success: true, message: newMsg });
});

// Update Message Status (Admin Only)
app.put('/api/messages/:id', (req, res) => {
  const data = loadData();
  const index = data.messages.findIndex(m => m.id === req.params.id);
  if (index !== -1) {
    data.messages[index] = { ...data.messages[index], ...req.body };
    saveData(data);
    res.json({ success: true, message: data.messages[index] });
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

// Delete Message (Admin Only)
app.delete('/api/messages/:id', (req, res) => {
  const data = loadData();
  data.messages = data.messages.filter(m => m.id !== req.params.id);
  saveData(data);
  res.json({ success: true });
});

// Product CRUD (Admin Only)
app.post('/api/products', (req, res) => {
  const data = loadData();
  const newProduct = {
    id: 'prod-' + Date.now(),
    ...req.body
  };
  data.products.push(newProduct);
  saveData(data);
  res.status(201).json({ success: true, product: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const data = loadData();
  const index = data.products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    data.products[index] = { ...data.products[index], ...req.body };
    saveData(data);
    res.json({ success: true, product: data.products[index] });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const data = loadData();
  data.products = data.products.filter(p => p.id !== req.params.id);
  saveData(data);
  res.json({ success: true });
});

// Settings & Admin Auth
app.post('/api/admin/login', (req, res) => {
  const data = loadData();
  const { email, password } = req.body;
  if (
    (email === data.settings.adminEmail || email === 'admin') &&
    password === data.settings.adminPassword
  ) {
    // Generate simple bearer token
    const token = 'sms-token-' + Buffer.from(email + ':' + Date.now()).toString('base64');
    res.json({
      success: true,
      token,
      user: { email: data.settings.adminEmail, name: 'Admin - SMS Enterprises' }
    });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials. Please try again.' });
  }
});

app.post('/api/admin/change-password', (req, res) => {
  const data = loadData();
  const { currentPassword, newPassword } = req.body;
  if (currentPassword === data.settings.adminPassword) {
    data.settings.adminPassword = newPassword;
    saveData(data);
    res.json({ success: true, message: 'Password updated successfully!' });
  } else {
    res.status(400).json({ error: 'Incorrect current password.' });
  }
});

app.put('/api/settings', (req, res) => {
  const data = loadData();
  data.settings = { ...data.settings, ...req.body };
  saveData(data);
  res.json({ success: true, settings: data.settings });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[SMS ENTERPRISES] Database API Server listening on http://localhost:${PORT}`);
});
