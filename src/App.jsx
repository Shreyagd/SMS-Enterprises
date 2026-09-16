import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import QuoteModal from './components/common/QuoteModal';
import ProductDetailsModal from './components/common/ProductDetailsModal';

// Public Pages
import HomePage from './components/public/HomePage';
import ProductsPage from './components/public/ProductsPage';
import GalleryPage from './components/public/GalleryPage';
import AboutPage from './components/public/AboutPage';
import ContactPage from './components/public/ContactPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';

function checkIsAdminUrl() {
  const hash = (window.location.hash || '').toLowerCase();
  const path = (window.location.pathname || '').toLowerCase();
  const search = (window.location.search || '').toLowerCase();

  return (
    hash === '#admin' ||
    hash.startsWith('#admin') ||
    hash.startsWith('#/admin') ||
    path === '/admin' ||
    path.startsWith('/admin/') ||
    path.endsWith('/admin') ||
    search.includes('admin')
  );
}

function MainApp() {
  const { adminUser } = useData();

  // Page Routing & View State
  const [view, setView] = useState(() => {
    return checkIsAdminUrl() ? 'admin' : 'public';
  });

  const [activePage, setActivePage] = useState('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialProduct, setQuoteInitialProduct] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenAdmin = () => {
    if (window.location.hash !== '#admin') {
      window.location.hash = 'admin';
    }
    setView('admin');
  };

  const handleExitAdmin = () => {
    setView('public');
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    if (window.location.pathname.toLowerCase().includes('admin')) {
      window.history.pushState(null, '', '/');
    }
  };

  // Secret keyboard shortcut to toggle admin: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setView(prev => {
          const next = prev === 'admin' ? 'public' : 'admin';
          if (next === 'admin') {
            window.location.hash = 'admin';
          } else {
            handleExitAdmin();
          }
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for hash & URL changes (e.g. #admin, #/admin, back/forward navigation)
  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsAdminUrl()) {
        setView('admin');
      } else {
        setView('public');
      }
    };
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const openQuoteForProduct = (productName = '') => {
    setQuoteInitialProduct(productName);
    setQuoteModalOpen(true);
  };

  // If in admin mode
  if (view === 'admin') {
    if (!adminUser) {
      return (
        <AdminLogin 
          onLoginSuccess={() => {}} 
          onCancel={handleExitAdmin} 
        />
      );
    }

    return (
      <AdminLayout 
        onExitAdmin={handleExitAdmin} 
      />
    );
  }

  // Public Website View
  return (
    <div className="site-wrapper">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onOpenQuoteModal={() => openQuoteForProduct('')} 
        onOpenAdmin={handleOpenAdmin}
      />

      <main className="public-content">
        {activePage === 'home' && (
          <HomePage 
            setActivePage={setActivePage} 
            onOpenQuoteModal={openQuoteForProduct} 
            onSelectProduct={setSelectedProduct} 
          />
        )}

        {activePage === 'products' && (
          <ProductsPage 
            setActivePage={setActivePage} 
            onOpenQuoteModal={openQuoteForProduct} 
            onSelectProduct={setSelectedProduct} 
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage 
            setActivePage={setActivePage} 
            onOpenQuoteModal={openQuoteForProduct} 
          />
        )}

        {activePage === 'about' && (
          <AboutPage 
            setActivePage={setActivePage} 
            onOpenQuoteModal={openQuoteForProduct} 
          />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}
      </main>

      <Footer 
        setActivePage={setActivePage} 
        onOpenAdmin={handleOpenAdmin} 
      />

      {/* Interactive Quotation Modal */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        initialProduct={quoteInitialProduct} 
      />

      {/* Product Details Drawer / Modal */}
      <ProductDetailsModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onOpenQuote={openQuoteForProduct} 
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
