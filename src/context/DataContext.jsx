import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { PRODUCTS } from '../data/products';
import { DEFAULT_HOME_CONTENT, mergeHomeContent } from '../data/homeContent';
import { DEFAULT_ABOUT_CONTENT, mergeAboutContent } from '../data/aboutContent';
import { DEFAULT_CAREERS_CONTENT, mergeCareersContent } from '../data/careersContent';

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

const DEFAULT_PRODUCTS = PRODUCTS;

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

// ── Supabase helpers (used only when VITE_SUPABASE_URL / KEY are configured) ──
const toAdmin = (user) => ({ email: user.email, name: 'Admin - SMS Enterprises' });
// The legacy admin password must never be stored online
const publicSettings = ({ adminPassword, ...rest }) => rest;

async function remoteSaveContent(key, value) {
  const { error } = await supabase.from('site_content').upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}
async function remoteInsert(table, item) {
  // No .select(): visitors may submit but not read back
  const { error } = await supabase.from(table).insert({ id: item.id, data: item });
  if (error) throw new Error(error.message);
}
async function remoteUpdate(table, item) {
  const { error } = await supabase.from(table).update({ data: item }).eq('id', item.id);
  if (error) throw new Error(error.message);
}
async function remoteDelete(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw new Error(error.message);
}
async function remoteList(table) {
  const { data, error } = await supabase.from(table).select('data').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data.map(row => row.data);
}

const jsonRequest = (url, method, body) => fetch(url, {
  method,
  headers: { 'Content-Type': 'application/json' },
  body: body === undefined ? undefined : JSON.stringify(body)
});

export function DataProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('sms_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sms_products_v3');
    if (saved) {
      let parsed = JSON.parse(saved);
      // Migrate 'Agri' to 'Agriculture'
      return parsed.map(p => p.category === 'Agri' ? { ...p, category: 'Agriculture' } : p);
    }
    return DEFAULT_PRODUCTS;
  });

  const [homeContent, setHomeContent] = useState(() => {
    try {
      const saved = localStorage.getItem('sms_home');
      return saved ? mergeHomeContent(JSON.parse(saved)) : DEFAULT_HOME_CONTENT;
    } catch {
      return DEFAULT_HOME_CONTENT;
    }
  });

  const [aboutContent, setAboutContent] = useState(() => {
    try {
      const saved = localStorage.getItem('sms_about');
      return saved ? mergeAboutContent(JSON.parse(saved)) : DEFAULT_ABOUT_CONTENT;
    } catch {
      return DEFAULT_ABOUT_CONTENT;
    }
  });

  const [careersContent, setCareersContent] = useState(() => {
    try {
      const saved = localStorage.getItem('sms_careers');
      return saved ? mergeCareersContent(JSON.parse(saved)) : DEFAULT_CAREERS_CONTENT;
    } catch {
      return DEFAULT_CAREERS_CONTENT;
    }
  });

  // Submissions: with Supabase they are loaded from the database after admin login
  const [applications, setApplications] = useState(() => {
    if (supabase) return [];
    try {
      return JSON.parse(localStorage.getItem('sms_applications')) || [];
    } catch {
      return [];
    }
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('sms_gallery');
    return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
  });

  const [quotes, setQuotes] = useState(() => {
    if (supabase) return [];
    const saved = localStorage.getItem('sms_quotes');
    return saved ? JSON.parse(saved) : DEFAULT_QUOTES;
  });

  const [messages, setMessages] = useState(() => {
    if (supabase) return [];
    const saved = localStorage.getItem('sms_messages');
    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
  });

  // Admin authentication state (Supabase restores its own session below)
  const [adminUser, setAdminUser] = useState(() => {
    if (supabase) return null;
    const session = sessionStorage.getItem('sms_admin_session');
    return session ? JSON.parse(session) : null;
  });

  // Toast state
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Latest state for async work (seeding Supabase on first admin login)
  const stateRef = useRef();
  stateRef.current = { settings, products, homeContent, aboutContent, careersContent, gallery };

  // Load site content: Supabase when configured, otherwise the local Node server if running
  useEffect(() => {
    if (!supabase) {
      jsonRequest('/api/data', 'GET')
        .then(res => {
          if (!res.ok) throw new Error(`Server returned ${res.status}`);
          return res.json();
        })
        .then(data => {
          if (data.settings) setSettings(data.settings);
          if (data.home) setHomeContent(mergeHomeContent(data.home));
          if (data.about) setAboutContent(mergeAboutContent(data.about));
          if (data.careers) setCareersContent(mergeCareersContent(data.careers));
          if (data.applications) setApplications(data.applications);
          if (data.products) setProducts(data.products);
          if (data.gallery) setGallery(data.gallery);
          if (data.quotes) setQuotes(data.quotes);
          if (data.messages) setMessages(data.messages);
        })
        .catch(err => {
          console.log('Using local persistent storage engine:', err.message);
        });
      return;
    }

    supabase.from('site_content').select('key, value').then(({ data, error }) => {
      if (error) {
        console.warn('Supabase content not loaded (run supabase/setup.sql?):', error.message);
        return;
      }
      const c = Object.fromEntries(data.map(row => [row.key, row.value]));
      if (c.settings) setSettings(prev => ({ ...DEFAULT_SETTINGS, ...c.settings, adminPassword: prev.adminPassword }));
      if (c.products) setProducts(c.products);
      if (c.home) setHomeContent(mergeHomeContent(c.home));
      if (c.about) setAboutContent(mergeAboutContent(c.about));
      if (c.careers) setCareersContent(mergeCareersContent(c.careers));
      if (c.gallery) setGallery(c.gallery);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setAdminUser(toAdmin(data.session.user));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminUser(session ? toAdmin(session.user) : null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Supabase + admin signed in: load submissions, and on the first login copy this
  // browser's content into the database for anything not stored online yet
  const adminEmail = adminUser?.email;
  useEffect(() => {
    if (!supabase || !adminEmail) return;
    (async () => {
      try {
        const [q, m, a] = await Promise.all([remoteList('quotes'), remoteList('messages'), remoteList('applications')]);
        setQuotes(q);
        setMessages(m);
        setApplications(a);
      } catch (err) {
        showToast(`Could not load submissions: ${err.message}`, 'error');
        return;
      }
      try {
        const { data, error } = await supabase.from('site_content').select('key');
        if (error) throw new Error(error.message);
        const existing = new Set(data.map(row => row.key));
        const cur = stateRef.current;
        const initial = {
          settings: publicSettings(cur.settings),
          products: cur.products,
          home: cur.homeContent,
          about: cur.aboutContent,
          careers: cur.careersContent,
          gallery: cur.gallery
        };
        const missing = Object.keys(initial).filter(key => !existing.has(key));
        for (const key of missing) await remoteSaveContent(key, initial[key]);
        if (missing.length) showToast(`Website content copied to Supabase (${missing.join(', ')}).`, 'success');
      } catch (err) {
        showToast(`Could not copy content to Supabase: ${err.message}`, 'error');
      }
    })();
  }, [adminEmail]);

  // Sync to local storage (fast first load; the only storage when no backend exists)
  useEffect(() => {
    localStorage.setItem('sms_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('sms_products_v3', JSON.stringify(products));
    } catch {
      // Uploaded images can exceed the browser storage quota
      if (!supabase) showToast('Browser storage is full — remove some uploaded images or use image URLs.', 'error');
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sms_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    if (!supabase) localStorage.setItem('sms_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    if (!supabase) localStorage.setItem('sms_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('sms_home', JSON.stringify(homeContent));
    } catch {
      if (!supabase) showToast('Browser storage is full — use smaller images or image links on the home page.', 'error');
    }
  }, [homeContent]);

  useEffect(() => {
    try {
      localStorage.setItem('sms_about', JSON.stringify(aboutContent));
    } catch {
      if (!supabase) showToast('Browser storage is full — use smaller images or image links on the About Us page.', 'error');
    }
  }, [aboutContent]);

  useEffect(() => {
    try {
      localStorage.setItem('sms_careers', JSON.stringify(careersContent));
    } catch {
      if (!supabase) showToast('Browser storage is full — could not save the Careers page.', 'error');
    }
  }, [careersContent]);

  useEffect(() => {
    if (supabase) return;
    try {
      localStorage.setItem('sms_applications', JSON.stringify(applications));
    } catch {
      showToast('Browser storage is full — delete some old job applications.', 'error');
    }
  }, [applications]);

  // ── Shared persistence helpers ──
  // Save one piece of site content. Resolves true when saved (or when there is no online storage).
  const saveContent = async (key, value, legacy) => {
    if (supabase) {
      try {
        await remoteSaveContent(key, value);
        return true;
      } catch (err) {
        showToast(`Not saved online: ${err.message}`, 'error');
        return false;
      }
    }
    try { await legacy(); } catch { /* no backend: kept in this browser */ }
    return true;
  };

  // Visitor submissions. With Supabase a failure is reported to the visitor (throws).
  const submitRow = async (table, item, legacy) => {
    if (supabase) {
      try {
        await remoteInsert(table, item);
      } catch (err) {
        showToast('Sorry, we could not send this. Please try again or contact us by phone/email.', 'error');
        throw err;
      }
      return;
    }
    try { await legacy(); } catch { /* no backend: kept in this browser */ }
  };

  const updateRow = async (table, list, id, updates, legacy) => {
    const current = list.find(x => x.id === id);
    if (supabase && current) {
      try {
        await remoteUpdate(table, { ...current, ...updates });
      } catch (err) {
        showToast(`Not saved online: ${err.message}`, 'error');
        return false;
      }
      return true;
    }
    try { await legacy(); } catch { /* no backend */ }
    return true;
  };

  const deleteRow = async (table, id, legacy) => {
    if (supabase) {
      try {
        await remoteDelete(table, id);
      } catch (err) {
        showToast(`Not deleted online: ${err.message}`, 'error');
        return false;
      }
      return true;
    }
    try { await legacy(); } catch { /* no backend */ }
    return true;
  };

  // ── Quotes ──
  const submitQuote = async (quoteData) => {
    const newQuote = {
      id: 'RFQ-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      status: 'New',
      adminNotes: '',
      ...quoteData
    };
    await submitRow('quotes', newQuote, () => jsonRequest('/api/quotes', 'POST', quoteData));
    setQuotes(prev => [newQuote, ...prev]);
    showToast('Your quote request has been submitted successfully! Our team will contact you shortly.', 'success');
    return newQuote;
  };

  const updateQuote = async (id, updates) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
    if (await updateRow('quotes', quotes, id, updates, () => jsonRequest(`/api/quotes/${id}`, 'PUT', updates))) {
      showToast('Quote updated successfully!', 'success');
    }
  };

  const deleteQuote = async (id) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
    if (await deleteRow('quotes', id, () => jsonRequest(`/api/quotes/${id}`, 'DELETE'))) {
      showToast('Quote record deleted.', 'info');
    }
  };

  // ── Contact messages ──
  const submitMessage = async (msgData) => {
    const newMsg = {
      id: 'MSG-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      status: 'Unread',
      ...msgData
    };
    await submitRow('messages', newMsg, () => jsonRequest('/api/messages', 'POST', msgData));
    setMessages(prev => [newMsg, ...prev]);
    showToast('Thank you for reaching out! We will respond promptly.', 'success');
    return newMsg;
  };

  const updateMessage = async (id, updates) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    await updateRow('messages', messages, id, updates, () => jsonRequest(`/api/messages/${id}`, 'PUT', updates));
  };

  const deleteMessage = async (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    if (await deleteRow('messages', id, () => jsonRequest(`/api/messages/${id}`, 'DELETE'))) {
      showToast('Message deleted.', 'info');
    }
  };

  // ── Products ──
  const saveProduct = async (productData) => {
    if (productData.id) {
      const next = products.map(p => p.id === productData.id ? productData : p);
      setProducts(next);
      if (await saveContent('products', next, () => jsonRequest(`/api/products/${productData.id}`, 'PUT', productData))) {
        showToast('Product updated successfully!', 'success');
      }
    } else {
      const newProd = { ...productData, id: 'prod-' + Date.now() };
      const next = [...products, newProd];
      setProducts(next);
      if (await saveContent('products', next, () => jsonRequest('/api/products', 'POST', newProd))) {
        showToast('New product added to catalog!', 'success');
      }
    }
  };

  const deleteProduct = async (id) => {
    const next = products.filter(p => p.id !== id);
    setProducts(next);
    if (await saveContent('products', next, () => jsonRequest(`/api/products/${id}`, 'DELETE'))) {
      showToast('Product removed from catalog.', 'info');
    }
  };

  // ── Careers ──
  const updateCareersContent = async (content) => {
    setCareersContent(content);
    if (await saveContent('careers', content, () => jsonRequest('/api/careers', 'PUT', content))) {
      showToast('Careers page updated!', 'success');
    }
  };

  const submitApplication = async (appData) => {
    const newApp = {
      id: 'JOB-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString(),
      status: 'New',
      ...appData
    };
    await submitRow('applications', newApp, () => jsonRequest('/api/applications', 'POST', newApp));
    setApplications(prev => [newApp, ...prev]);
    showToast('Thank you! Your application has been submitted.', 'success');
    return newApp;
  };

  const updateApplication = async (id, updates) => {
    setApplications(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
    await updateRow('applications', applications, id, updates, () => jsonRequest(`/api/applications/${id}`, 'PUT', updates));
  };

  const deleteApplication = async (id) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    if (await deleteRow('applications', id, () => jsonRequest(`/api/applications/${id}`, 'DELETE'))) {
      showToast('Application deleted.', 'info');
    }
  };

  // ── Page content & settings ──
  const updateAboutContent = async (content) => {
    setAboutContent(content);
    if (await saveContent('about', content, () => jsonRequest('/api/about', 'PUT', content))) {
      showToast('About Us page updated!', 'success');
    }
  };

  const updateHomeContent = async (content) => {
    setHomeContent(content);
    if (await saveContent('home', content, () => jsonRequest('/api/home', 'PUT', content))) {
      showToast('Home page updated!', 'success');
    }
  };

  const updateSettings = async (newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    if (await saveContent('settings', publicSettings(merged), () => jsonRequest('/api/settings', 'PUT', newSettings))) {
      showToast('Company settings updated!', 'success');
    }
  };

  // ── Admin authentication ──
  const loginAdmin = async (email, password) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        const msg = /invalid login credentials/i.test(error.message) ? 'Invalid email or password. Please try again.' : error.message;
        return { success: false, error: msg };
      }
      setAdminUser(toAdmin(data.user));
      showToast('Welcome back, Admin!', 'success');
      return { success: true };
    }

    // Try API first
    try {
      const res = await jsonRequest('/api/admin/login', 'POST', { email, password });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminUser(data.user);
        sessionStorage.setItem('sms_admin_session', JSON.stringify(data.user));
        showToast('Welcome back, Admin!', 'success');
        return { success: true };
      }
    } catch { /* no server */ }

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

  const logoutAdmin = async () => {
    if (supabase) await supabase.auth.signOut();
    setAdminUser(null);
    sessionStorage.removeItem('sms_admin_session');
    showToast('Logged out of Admin Portal.', 'info');
  };

  const changeAdminPassword = async (currentPassword, newPassword) => {
    if (supabase) {
      const email = adminUser?.email;
      const check = await supabase.auth.signInWithPassword({ email, password: currentPassword });
      if (check.error) return { success: false, error: 'Current password does not match.' };
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { success: false, error: error.message };
      showToast('Admin password changed successfully!', 'success');
      return { success: true };
    }

    if (currentPassword !== settings.adminPassword) {
      return { success: false, error: 'Current password does not match.' };
    }
    const updated = { ...settings, adminPassword: newPassword };
    setSettings(updated);
    try {
      await jsonRequest('/api/admin/change-password', 'POST', { currentPassword, newPassword });
    } catch { /* no server */ }
    showToast('Admin password changed successfully!', 'success');
    return { success: true };
  };

  return (
    <DataContext.Provider value={{
      usingSupabase: !!supabase,
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
      homeContent,
      updateHomeContent,
      aboutContent,
      updateAboutContent,
      careersContent,
      updateCareersContent,
      applications,
      submitApplication,
      updateApplication,
      deleteApplication,
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
