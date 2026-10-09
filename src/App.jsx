import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import QuoteModal from './components/common/QuoteModal';

// Public Pages
import HomePage from './components/public/HomePage';
import ProductsPage from './components/public/ProductsPage';
import ProductDetailPage from './components/public/ProductDetailPage';
import GalleryPage from './components/public/GalleryPage';
import AboutPage from './components/public/AboutPage';
import ContactPage from './components/public/ContactPage';
import CareersPage from './components/public/CareersPage';

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

const PAGES = ['home', 'products', 'gallery', 'about', 'careers', 'contact'];

// Map the URL path to a public page: /products/<slug> opens a product page.
function parseRoute() {
  const parts = window.location.pathname.toLowerCase().split('/').filter(Boolean);
    if (parts[0] === 'products' && parts[1]) return { page: 'product', slug: parts[1] };
  if (parts[0] === 'products') {
    return { page: 'products', slug: null, category: new URLSearchParams(window.location.search).get('category') };
  }
  if (PAGES.includes(parts[0])) return { page: parts[0], slug: null };
  return { page: 'home', slug: null };
}

function MainApp() {
  const { adminUser } = useData();

  // Page Routing & View State
  const [view, setView] = useState(() => {
    return checkIsAdminUrl() ? 'admin' : 'public';
  });

  const [route, setRoute] = useState(parseRoute);
  const activePage = route.page;
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteInitialProduct, setQuoteInitialProduct] = useState('');

    const navigate = (page, slug = null, category = null) => {
    let path = page === 'product' ? `/products/${slug}` : page === 'home' ? '/' : `/${page}`;
    if (page === 'products' && category) path += `?category=${category}`;
    if (window.location.pathname + window.location.search !== path) window.history.pushState(null, '', path);
    setRoute({ page, slug, category });
    window.scrollTo({ top: 0 });
  };
  const setActivePage = (page) => navigate(page);
    const openProduct = (product) => navigate('product', product.slug || product.id);
  const openCategory = (categorySlug) => navigate('products', null, categorySlug);

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
        setRoute(parseRoute());
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
        activePage={activePage === 'product' ? 'products' : activePage} 
        setActivePage={setActivePage} 
        onOpenQuoteModal={() => openQuoteForProduct('')} 
        onOpenAdmin={handleOpenAdmin}
                onSelectProduct={openProduct}
        onSelectCategory={openCategory}
      />

      <main className="public-content">
        {activePage === 'home' && (
          <HomePage 
            setActivePage={setActivePage} 
            onOpenQuoteModal={openQuoteForProduct} 
            onSelectProduct={openProduct} 
          />
        )}

        {activePage === 'products' && (
                    <ProductsPage
            categorySlug={route.category}
            onSelectCategory={openCategory}
            setActivePage={setActivePage}  
            onOpenQuoteModal={openQuoteForProduct} 
            onSelectProduct={openProduct} 
          />
        )}

        {activePage === 'product' && (
          <ProductDetailPage 
            slug={route.slug}
            setActivePage={setActivePage} 
            onOpenQuoteModal={openQuoteForProduct} 
            onSelectProduct={openProduct} 
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

                {activePage === 'careers' && (
          <CareersPage />
        )}

        {activePage === 'contact' && (
          <ContactPage setActivePage={setActivePage} />
        )}
      </main>

      <Footer 
        setActivePage={setActivePage} 
        onSelectProduct={openProduct} 
        onOpenAdmin={handleOpenAdmin} 
      />

      {/* Interactive Quotation Modal */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        initialProduct={quoteInitialProduct} 
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
