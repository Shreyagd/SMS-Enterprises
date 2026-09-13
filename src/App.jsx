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

function MainApp() {
  const { adminUser } = useData();

  // Page Routing & View State
  const [view, setView] = useState(() => {
    // Check if initial hash or path specifies admin
    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      return 'admin';
    }
    return 'public';
  });

  const [activePage, setActivePage] = useState('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialProduct, setQuoteInitialProduct] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Secret keyboard shortcut to toggle admin: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setView(prev => prev === 'admin' ? 'public' : 'admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen for hash changes (e.g. #admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      } else if (window.location.hash === '' || window.location.hash === '#home') {
        setView('public');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
          onCancel={() => {
            setView('public');
            window.location.hash = '';
          }} 
        />
      );
    }

    return (
      <AdminLayout 
        onExitAdmin={() => {
          setView('public');
          window.location.hash = '';
        }} 
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
        onOpenAdmin={() => setView('admin')} 
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
