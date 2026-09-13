import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

// Initial fallback dataset matching SMS Enterprises PDF & reference mockup
const DEFAULT_SETTINGS = {
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
  adminPassword: 'SMSAdmin@2025'
};

const DEFAULT_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Machine Stretch Film',
    category: 'Stretch Film',
    subtitle: 'Designed for high speed wrapping machines with superior stretch & load holding.',
    description: 'Our high-performance Machine Stretch Film is manufactured with advanced multi-layer cast and blown extrusion technology to deliver consistent performance you can rely on.',
    thickness: '12 - 35 Micron',
    width: '500 mm / Customized',
    elongation: 'Up to 300%',
    coreSize: '76 mm (3 inch)',
    image: '/images/prod_stretch_film.jpg',
    badge: 'High Speed Machine',
    featured: true,
    applications: ['Automated turntable pallet wrappers', 'High-volume logistics pallets', 'Beverage & FMCG packaging']
  },
  {
    id: 'prod-2',
    name: 'Hand Stretch Film',
    category: 'Stretch Film',
    subtitle: 'Easy to use for manual wrapping applications. Strong, durable & reliable.',
    description: 'Premium grade manual hand stretch film roll designed for lightweight handling without sacrificing tension, puncture resistance, or load containment.',
    thickness: '15 - 29 Micron',
    width: '450 mm - 500 mm',
    elongation: 'Up to 180%',
    coreSize: '50 mm or 76 mm',
    image: '/images/hero_pallet.jpg',
    badge: 'Manual Favorite',
    featured: true,
    applications: ['Manual box bundling', 'Odd-shaped cargo', 'Warehouse picking stations']
  },
  {
    id: 'prod-3',
    name: 'Mini Stretch Film',
    category: 'Stretch Film',
    subtitle: 'Compact size for small loads and easy handling.',
    description: 'Narrow width stretch film ideal for bundling pipes, profiles, cartons, cables, and hardware without sticky adhesive residue.',
    thickness: '20 - 23 Micron',
    width: '100 mm - 250 mm',
    elongation: 'Up to 200%',
    coreSize: '38 mm / 50 mm',
    image: '/images/prod_stretch_film.jpg',
    badge: 'Compact Size',
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
    coreSize: '50 mm core / Coreless',
    image: '/images/pallet_machine.jpg',
    badge: 'Cost Efficiency',
    featured: true,
    applications: ['Heavy carton loads', 'Temperature sensitive goods', 'Sustainable eco packaging']
  },
  {
    id: 'prod-5',
    name: 'LDPE Shrink Film',
    category: 'LDPE Shrink Film',
    subtitle: 'Heavy-duty secondary packaging for beverage multipacks, cans, and bottles.',
    description: 'High tensile strength LDPE shrink film engineered for heat tunnels. Provides tight crystal-clear bundle containment for bottled water, soda cans, and jars.',
    thickness: '35 - 120 Micron',
    width: '200 mm - 1600 mm',
    elongation: 'Shrink ratio: 65% TD / 15% MD',
    coreSize: '76 mm',
    image: '/images/prod_shrink_film.jpg',
    badge: 'Secondary Packaging',
    featured: true,
    applications: ['Packaged drinking water', 'Canned beverages', 'Food & chemical multipacks']
  },
  {
    id: 'prod-6',
    name: 'Bopp Laminated Roll',
    category: 'Bopp Laminated Roll',
    subtitle: 'High-barrier printed multi-layer laminated film rolls for food, spice, and retail packaging.',
    description: 'Printed on our state-of-the-art 600m/min rotogravure printing machine. Offers moisture barrier, aroma preservation, and vivid photo-realistic branding.',
    thickness: '40 - 150 Micron laminated structure',
    width: 'Custom printed roll widths',
    elongation: 'Dimensionally stable',
    coreSize: '76 mm',
    image: '/images/packaging_showroom.jpg',
    badge: 'Multi-Color Rotogravure',
    featured: true,
    applications: ['Spices, coffee, tea', 'Dry fruits & pulses', 'Snacks & confectionery packaging']
  },
  {
    id: 'prod-7',
    name: 'Agri Packaging Films & Silage Stretch',
    category: 'Agri Packaging Films',
    subtitle: 'UV-stabilized agricultural films for silage bales, mulch beds, and greenhouse covers.',
    description: 'Engineered for Indian and global farming conditions with multi-layer co-extrusion. Includes black/silver mulch films, green silage stretch wraps for hay preservation, and solarization films.',
    thickness: '25 - 200 Micron',
    width: '750 mm - 1200 mm',
    elongation: 'High puncture resistance against stalks',
    coreSize: '76 mm heavy paper core',
    image: '/images/prod_agri_film.jpg',
    badge: '12-Month UV Guarantee',
    featured: true,
    applications: ['Silage round bale wrapping', 'Mulch film agricultural beds', 'Greenhouse low tunnels']
  },
  {
    id: 'prod-8',
    name: 'Pharma Garbage Bags',
    category: 'Pharma Garbage Bags',
    subtitle: 'Puncture-proof, leak-resistant biohazard and industrial heavy-duty waste collection rolls.',
    description: 'Heavy duty Star-sealed bottom rolls available in clinical colors (Black, Blue, Yellow, Red) for hospital biomedical management and warehouse hygiene.',
    thickness: '25 - 60 Micron',
    width: 'Customized sizes (Small to Jumbo Bin)',
    elongation: 'High dart drop impact resistance',
    coreSize: 'Perforated roll',
    image: '/images/prod_agri_film.jpg',
    badge: 'Biohazard & Clinical',
    featured: false,
    applications: ['Hospitals & pharma cleanrooms', 'Industrial manufacturing plants', 'Commercial facilities']
  }
];

const DEFAULT_GALLERY = [
  {
    id: 'gal-1',
    title: 'Multi-Layer Film Extrusion Plant',
    category: 'Infrastructure',
    description: 'Towering multi-story high-speed blown film co-extrusion line producing ultra-consistent gauge stretch and barrier films.',
    image: '/images/extrusion_plant.jpg'
  },
  {
    id: 'gal-2',
    title: 'Rotogravure Printing Machine (600 m/min)',
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
];

const DEFAULT_QUOTES = [
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
    productType: 'Agri Packaging Films & Silage Stretch',
    thickness: '25 Micron UV',
    quantity: '150 Rolls',
    destination: 'Hassan, Karnataka',
    message: 'Looking for UV-stabilized silage stretch film for dairy farm baling.',
    status: 'In Review',
    adminNotes: 'Assigned to South regional sales executive.'
  }
];

const DEFAULT_MESSAGES = [
  {
    id: 'MSG-1',
    date: '2026-09-10T16:45:00.000Z',
    name: 'Anand Verma',
    email: 'anand.verma@transind.com',
    phone: '+91 97410 99887',
    subject: 'Distributorship Inquiry for Tamil Nadu',
    message: 'Hello, we are packaging distributors across Chennai and Coimbatore. We would like to discuss dealership terms for your stretch films and BOPP tapes.',
    status: 'Read'
  },
  {
    id: 'MSG-2',
    date: '2026-09-11T11:00:00.000Z',
    name: 'Meera Nambiar',
    email: 'meera.n@biopharma.in',
    phone: '+91 94480 33221',
    subject: 'Custom Heavy Duty Garbage Bags for Cleanroom',
    message: 'We require customized biomedical waste rolls with custom barcode print. Please arrange a sample set at our facility.',
    status: 'Unread'
  }
];

export function DataProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('sms_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sms_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('sms_gallery');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });

  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem('sms_quotes');
    return saved ? JSON.parse(saved) : DEFAULT_QUOTES;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('sms_messages');
    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
  });

  // Admin authentication state
  const [adminUser, setAdminUser] = useState(() => {
    const session = sessionStorage.getItem('sms_admin_session');
    return session ? JSON.parse(session) : null;
  });

  // Toast state
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Sync with backend API if available
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.settings) setSettings(data.settings);
        if (data.products) setProducts(data.products);
        if (data.gallery) setGallery(data.gallery);
        if (data.quotes) setQuotes(data.quotes);
        if (data.messages) setMessages(data.messages);
      })
      .catch(err => {
        console.log('Using local persistent storage engine:', err.message);
      });
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sms_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('sms_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sms_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('sms_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('sms_messages', JSON.stringify(messages));
  }, [messages]);

  // Actions
  const submitQuote = async (quoteData) => {
    const newQuote = {
      id: 'RFQ-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      status: 'New',
      adminNotes: '',
      ...quoteData
    };

    setQuotes(prev => [newQuote, ...prev]);

    // Send to backend API
    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData)
      });
    } catch (e) {
      console.log('Saved to local store');
    }

    showToast('Your quote request has been submitted successfully! Our team will contact you shortly.', 'success');
    return newQuote;
  };

  const updateQuote = async (id, updates) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
    try {
      await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (e) {}
    showToast('Quote updated successfully!', 'success');
  };

  const deleteQuote = async (id) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
    try {
      await fetch(`/api/quotes/${id}`, { method: 'DELETE' });
    } catch (e) {}
    showToast('Quote record deleted.', 'info');
  };

  const submitMessage = async (msgData) => {
    const newMsg = {
      id: 'MSG-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      status: 'Unread',
      ...msgData
    };

    setMessages(prev => [newMsg, ...prev]);

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });
    } catch (e) {}

    showToast('Thank you for reaching out! We will respond promptly.', 'success');
    return newMsg;
  };

  const updateMessage = async (id, updates) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    try {
      await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (e) {}
  };

  const deleteMessage = async (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    } catch (e) {}
    showToast('Message deleted.', 'info');
  };

  const saveProduct = async (productData) => {
    if (productData.id) {
      // Edit
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
      try {
        await fetch(`/api/products/${productData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
      } catch (e) {}
      showToast('Product updated successfully!', 'success');
    } else {
      // Create
      const newProd = {
        ...productData,
        id: 'prod-' + Date.now()
      };
      setProducts(prev => [...prev, newProd]);
      try {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProd)
        });
      } catch (e) {}
      showToast('New product added to catalog!', 'success');
    }
  };

  const deleteProduct = async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch (e) {}
    showToast('Product removed from catalog.', 'info');
  };

  const updateSettings = async (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
    } catch (e) {}
    showToast('Company settings updated!', 'success');
  };

  const loginAdmin = async (email, password) => {
    // Try API first
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminUser(data.user);
        sessionStorage.setItem('sms_admin_session', JSON.stringify(data.user));
        showToast('Welcome back, Admin!', 'success');
        return { success: true };
      }
    } catch (e) {}

    // Fallback authentication
    if (
      (email.toLowerCase() === settings.adminEmail.toLowerCase() || email === 'admin') &&
      password === settings.adminPassword
    ) {
      const user = { email: settings.adminEmail, name: 'Admin - SMS Enterprises' };
      setAdminUser(user);
      sessionStorage.setItem('sms_admin_session', JSON.stringify(user));
      showToast('Welcome back, Admin!', 'success');
      return { success: true };
    }

    return { success: false, error: 'Invalid admin credentials. Please try again.' };
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    sessionStorage.removeItem('sms_admin_session');
    showToast('Logged out of Admin Portal.', 'info');
  };

  const changeAdminPassword = async (currentPassword, newPassword) => {
    if (currentPassword !== settings.adminPassword) {
      return { success: false, error: 'Current password does not match.' };
    }
    const updated = { ...settings, adminPassword: newPassword };
    setSettings(updated);
    try {
      await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
    } catch (e) {}
    showToast('Admin password changed successfully!', 'success');
    return { success: true };
  };

  return (
    <DataContext.Provider value={{
      settings,
      products,
      gallery,
      quotes,
      messages,
      adminUser,
      toasts,
      showToast,
      submitQuote,
      updateQuote,
      deleteQuote,
      submitMessage,
      updateMessage,
      deleteMessage,
      saveProduct,
      deleteProduct,
      updateSettings,
      loginAdmin,
      logoutAdmin,
      changeAdminPassword
    }}>
      {children}
      {/* Toast Render */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
