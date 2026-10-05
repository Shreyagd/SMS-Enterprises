import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS } from '../src/data/products.js';

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
  products: PRODUCTS,
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

// Serve client static files if dist exists
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // If running in development without build, give clear guidance for /admin
  app.get(['/admin', '/admin/*'], (req, res) => {
    res.send(`
      <div style="font-family: sans-serif; padding: 40px; text-align: center; max-width: 600px; margin: 0 auto;">
        <h2>SMS Enterprises - Admin Portal</h2>
        <p>The backend API server is running on port ${PORT}.</p>
        <p>To access the Admin Portal, open Vite Frontend at:</p>
        <p><a href="http://localhost:5173/#admin" style="font-size: 1.2rem; color: #16a34a; font-weight: bold;">http://localhost:5173/#admin</a></p>
      </div>
    `);
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`[SMS ENTERPRISES] Database API Server listening on http://localhost:${PORT}`);
});
