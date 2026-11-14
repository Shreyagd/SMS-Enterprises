import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Save, RotateCcw, ExternalLink, Undo2, Home, Users, Briefcase, ShoppingBag, Mail, Image, FileText, LayoutDashboard } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { DEFAULT_BANNER_CONTENT } from '../../data/bannerContent';
import { TextField, ImageField, ListEditor, Section, EditorStyles } from './ContentFields';

// Mapping: internal key -> display name
const PAGE_KEY_TO_DISPLAY = {
  home: 'Home Page',
  about: 'About Us Page',
  products: 'Products Page',
  careers: 'Careers Page',
  contact: 'Contact Page',
  gallery: 'Gallery Page',
  productDetail: 'Product Detail Page'
};

const DISPLAY_TO_PAGE_KEY = Object.fromEntries(
  Object.entries(PAGE_KEY_TO_DISPLAY).map(([k, v]) => [v, k])
);

const PAGE_ICONS = {
  'Home Page': Home,
  'About Us Page': Users,
  'Products Page': ShoppingBag,
  'Careers Page': Briefcase,
  'Contact Page': Mail,
  'Gallery Page': Image,
  'Product Detail Page': FileText,
};

const PAGE_ORDER = [
  'Home Page',
  'About Us Page',
  'Products Page',
  'Careers Page',
  'Contact Page',
  'Gallery Page',
  'Product Detail Page'
];

export default function AdminBanners() {
  const { bannerContent, updateBannerContent } = useData();
  const [draft, setDraft] = useState(bannerContent);
  useEffect(() => { setDraft(bannerContent); }, [bannerContent]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(bannerContent);

  const sectionRefs = useRef({});

  // Helper to update nested banner fields
  const set = (pageKey, sectionKey, key, value) => setDraft(prev => ({
    ...prev,
    [pageKey]: {
      ...prev[pageKey],
      [sectionKey]: { ...prev[pageKey][sectionKey], [key]: value }
    }
  }));

  // Helper for list editor
  const setList = (pageKey, sectionKey, key, items) => setDraft(prev => ({
    ...prev,
    [pageKey]: {
      ...prev[pageKey],
      [sectionKey]: { ...prev[pageKey][sectionKey], [key]: items }
    }
  }));

  // Helper for visibility toggle
  const toggleVisible = (pageKey, sectionKey) => setDraft(prev => ({
    ...prev,
    [pageKey]: {
      ...prev[pageKey],
      [sectionKey]: { ...prev[pageKey][sectionKey], visible: !prev[pageKey][sectionKey].visible }
    }
  }));

  // Scroll to page section
  const scrollToPage = (displayName) => {
    const ref = sectionRefs.current[displayName];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetAll = () => {
    if (window.confirm('Reset ALL banners across all pages back to original content? Your edits will be lost after you save.')) {
      setDraft(JSON.parse(JSON.stringify(DEFAULT_BANNER_CONTENT)));
    }
  };

  // Get available pages from draft (in defined order)
  const availablePages = useMemo(() => {
    const displayNames = Object.keys(draft)
      .map(k => PAGE_KEY_TO_DISPLAY[k])
      .filter(d => d && draft[DISPLAY_TO_PAGE_KEY[d]] && Object.keys(draft[DISPLAY_TO_PAGE_KEY[d]]).length > 0);
    return PAGE_ORDER.filter(p => displayNames.includes(p));
  }, [draft]);

  // Group banners by page for rendering
  const bannersByPage = useMemo(() => {
    const grouped = {};
    for (const [pageKey, pageSections] of Object.entries(draft)) {
      if (!pageSections || Object.keys(pageSections).length === 0) continue;
      const displayName = PAGE_KEY_TO_DISPLAY[pageKey];
      if (!displayName) continue;
      grouped[displayName] = Object.entries(pageSections).map(([sectionKey, section]) => ({
        pageKey,
        sectionKey,
        page: section.page,
        label: section.label,
        description: section.description,
        visible: section.visible !== false,
        data: section
      }));
    }
    return grouped;
  }, [draft]);

  return (
    <div className="hc-root">
      <div className="hc-toolbar">
        <div>
          <h2>Banners Management</h2>
          <p>Edit all banners across the entire website. Click a page button above to jump to its banners. Changes go live when you click <strong>Save changes</strong>.</p>
        </div>
        <div className="hc-toolbar-actions">
          <a className="btn btn-secondary btn-sm" href="/" target="_blank" rel="noreferrer"><ExternalLink size={14} /> View website</a>
          <button className="btn btn-secondary btn-sm" onClick={resetAll}><RotateCcw size={14} /> Reset all to original</button>
          <button className="btn btn-secondary btn-sm" disabled={!dirty} onClick={() => setDraft(bannerContent)}><Undo2 size={14} /> Discard</button>
          <button className="btn btn-primary btn-sm" disabled={!dirty} onClick={() => updateBannerContent(draft)}><Save size={14} /> Save changes</button>
        </div>
      </div>
      {dirty && <div className="hc-unsaved">You have unsaved changes.</div>}

      {/* Page Navigation Buttons - scroll to sections */}
      <div className="banner-page-nav">
        <button className="banner-nav-btn" onClick={() => scrollToPage('Home Page')}>
          <Home size={16} /> Home Page
        </button>
        <button className="banner-nav-btn" onClick={() => scrollToPage('About Us Page')}>
          <Users size={16} /> About Us Page
        </button>
        <button className="banner-nav-btn" onClick={() => scrollToPage('Products Page')}>
          <ShoppingBag size={16} /> Products Page
        </button>
        <button className="banner-nav-btn" onClick={() => scrollToPage('Careers Page')}>
          <Briefcase size={16} /> Careers Page
        </button>
        <button className="banner-nav-btn" onClick={() => scrollToPage('Contact Page')}>
          <Mail size={16} /> Contact Page
        </button>
        <button className="banner-nav-btn" onClick={() => scrollToPage('Gallery Page')}>
          <Image size={16} /> Gallery Page
        </button>
        <button className="banner-nav-btn" onClick={() => scrollToPage('Product Detail Page')}>
          <FileText size={16} /> Product Detail Page
        </button>
      </div>

      {/* All Banners Grouped by Page */}
      <main className="banners-main">
        {availablePages.map(displayName => {
          const banners = bannersByPage[displayName];
          if (!banners || banners.length === 0) return null;
          const PageIcon = PAGE_ICONS[displayName] || LayoutDashboard;
          return (
            <div key={displayName} ref={el => { sectionRefs.current[displayName] = el; }} className="banner-page-group">
              <div className="banner-page-header">
                <PageIcon size={20} />
                <h3>{displayName}</h3>
                <span className="banner-count">{banners.length} banner{banners.length !== 1 ? 's' : ''}</span>
              </div>
              {banners.map(({ pageKey: pk, sectionKey, page, label, description, visible, data }) => (
                <Section
                  key={`${pk}-${sectionKey}`}
                  title={label}
                  description={description}
                  visible={visible}
                  onToggle={v => toggleVisible(pk, sectionKey)}
                  className="banner-section"
                >
                  {renderSectionFields(pk, sectionKey, data, set, setList)}
                </Section>
              ))}
            </div>
          );
        })}
      </main>

      <EditorStyles />
    </div>
  );
}

// Render fields based on section type
function renderSectionFields(pageKey, sectionKey, data, set, setList) {
  const fields = [];

  // Common fields that many sections share
  const commonFields = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'text', label: 'Text / Description', type: 'textarea' },
    { key: 'buttonText', label: 'Button Text', type: 'text' },
    { key: 'button', label: 'Button Text', type: 'text' },
    { key: 'badge', label: 'Badge / Eyebrow Text', type: 'text' },
    { key: 'eyebrow', label: 'Eyebrow / Small Label', type: 'text' },
  ];

  // Determine which fields to show based on section
  if (sectionKey === 'hero' && pageKey === 'home') {
    // Home Hero Banner - special fields
    fields.push(
      <div key="line1" className="hc-grid-3">
        <TextField label="Headline Line 1" value={data.line1} onChange={v => set(pageKey, sectionKey, 'line1', v)} />
        <TextField label="Headline Line 2" value={data.line2} onChange={v => set(pageKey, sectionKey, 'line2', v)} />
        <TextField label="Green Highlight Line" value={data.highlight} onChange={v => set(pageKey, sectionKey, 'highlight', v)} />
      </div>,
      <TextField label="Subtext" value={data.subtext} onChange={v => set(pageKey, sectionKey, 'subtext', v)} multiline />,
      <div key="buttons" className="hc-grid-2">
        <TextField label="Primary Button (Green)" value={data.primaryButton} onChange={v => set(pageKey, sectionKey, 'primaryButton', v)} />
        <TextField label="Secondary Button (Outline)" value={data.secondaryButton} onChange={v => set(pageKey, sectionKey, 'secondaryButton', v)} />
      </div>,
      <ImageField label="Background Video (MP4/WebM)" accept="video" value={data.video} onChange={v => set(pageKey, sectionKey, 'video', v)} />,
      <ImageField label="Poster Image" accept="both" value={data.poster} onChange={v => set(pageKey, sectionKey, 'poster', v)} />
    );
  }
  else if (sectionKey === 'features' && pageKey === 'home') {
    // Home Feature Strip - ListEditor
    fields.push(
      <ListEditor
        key="features-list"
        items={data.items}
        onChange={v => setList(pageKey, sectionKey, 'items', v)}
        fields={[
          { key: 'title', label: 'Title' },
          { key: 'desc', label: 'Short Description' },
          { key: 'iconUrl', label: 'Custom Icon URL (Optional)', image: true }
        ]}
        newItem={{ title: 'New Feature', desc: '', iconUrl: '' }}
        addLabel="Add Feature Badge"
        itemLabel="Feature Badge"
      />
    );
  }
  else if (sectionKey === 'customers' && pageKey === 'about') {
    // About Page Customers Marquee
    fields.push(
      <div key="cust-grid" className="hc-grid-2">
        <TextField label="Badge" value={data.badge} onChange={v => set(pageKey, sectionKey, 'badge', v)} />
        <TextField label="Title" value={data.title} onChange={v => set(pageKey, sectionKey, 'title', v)} />
      </div>,
      <TextField label="Subtitle" value={data.subtitle} onChange={v => set(pageKey, sectionKey, 'subtitle', v)} />,
      <div key="speed" className="hc-grid-2">
        <TextField label="Scroll Speed (seconds)" value={data.speed} onChange={v => set(pageKey, sectionKey, 'speed', v)} type="number" />
      </div>,
      <ListEditor
        key="customers-list"
        items={data.items}
        onChange={v => setList(pageKey, sectionKey, 'items', v)}
        fields={[
          { key: 'name', label: 'Client Name' },
          { key: 'logo', label: 'Logo URL (SVG/PNG)', image: true }
        ]}
        newItem={{ name: 'New Client', logo: '' }}
        addLabel="Add Client Logo"
        itemLabel="Client Logo"
      />
    );
  }
  else if (sectionKey === 'missionVision' && pageKey === 'about') {
    // About Page Mission & Vision
    fields.push(
      <div key="vision" className="banner-subsection">
        <h5>Vision</h5>
        <TextField label="Badge" value={data.visionBadge} onChange={v => set(pageKey, sectionKey, 'visionBadge', v)} />
        <TextField label="Title" value={data.visionTitle} onChange={v => set(pageKey, sectionKey, 'visionTitle', v)} />
        <TextField label="Text" value={data.visionText} onChange={v => set(pageKey, sectionKey, 'visionText', v)} multiline />
      </div>,
      <div key="mission" className="banner-subsection">
        <h5>Mission</h5>
        <TextField label="Badge" value={data.missionBadge} onChange={v => set(pageKey, sectionKey, 'missionBadge', v)} />
        <TextField label="Title" value={data.missionTitle} onChange={v => set(pageKey, sectionKey, 'missionTitle', v)} />
        <TextField label="Text" value={data.missionText} onChange={v => set(pageKey, sectionKey, 'missionText', v)} multiline />
      </div>
    );
  }
  else if (sectionKey === 'cta' && (pageKey === 'about' || pageKey === 'home')) {
    // CTA Banners
    fields.push(
      <TextField label="Title" value={data.title} onChange={v => set(pageKey, sectionKey, 'title', v)} />,
      <TextField label="Text" value={data.text} onChange={v => set(pageKey, sectionKey, 'text', v)} multiline />,
      <TextField label="Button Text" value={data.button || data.buttonText} onChange={v => set(pageKey, sectionKey, data.button ? 'button' : 'buttonText', v)} />
    );
  }
  else if (sectionKey === 'customSolution' && pageKey === 'products') {
    // Products Custom Solution Card
    fields.push(
      <TextField label="Title" value={data.title} onChange={v => set(pageKey, sectionKey, 'title', v)} />,
      <TextField label="Text" value={data.text} onChange={v => set(pageKey, sectionKey, 'text', v)} multiline />,
      <TextField label="Button Text" value={data.buttonText} onChange={v => set(pageKey, sectionKey, 'buttonText', v)} />
    );
  }
  else if (sectionKey === 'qualityAssurance' && pageKey === 'products') {
    // Products Quality Box
    fields.push(
      <TextField label="Title" value={data.title} onChange={v => set(pageKey, sectionKey, 'title', v)} />,
      <TextField label="Text" value={data.text} onChange={v => set(pageKey, sectionKey, 'text', v)} multiline />
    );
  }
  else if (sectionKey === 'intro' && pageKey === 'careers') {
    // Careers Intro with perks
    fields.push(
      <div key="intro-main" className="hc-grid-2">
        <TextField label="Badge" value={data.badge} onChange={v => set(pageKey, sectionKey, 'badge', v)} />
        <TextField label="Title" value={data.title} onChange={v => set(pageKey, sectionKey, 'title', v)} />
      </div>,
      <TextField label="Text" value={data.text} onChange={v => set(pageKey, sectionKey, 'text', v)} multiline />,
      <ListEditor
        key="perks-list"
        items={data.perks}
        onChange={v => setList(pageKey, sectionKey, 'perks', v)}
        fields={[
          { key: 'title', label: 'Perk Title' },
          { key: 'desc', label: 'Description', multiline: true }
        ]}
        newItem={{ title: 'New Perk', desc: '' }}
        addLabel="Add Perk"
        itemLabel="Perk"
      />
    );
  }
  else if (sectionKey === 'openings' && pageKey === 'careers') {
    // Careers Openings - note: actual jobs managed in Admin Careers
    fields.push(
      <div key="openings-info" className="banner-info-notice">
        <strong>Note:</strong> Job openings (title, department, location, type, experience, description) are managed in <strong>Admin → Careers</strong>. This section only controls the banner header.
      </div>,
      <div key="openings-fields" className="hc-grid-2">
        <TextField label="Badge" value={data.badge} onChange={v => set(pageKey, sectionKey, 'badge', v)} />
        <TextField label="Title" value={data.title} onChange={v => set(pageKey, sectionKey, 'title', v)} />
      </div>,
      <TextField label="Empty State Text" value={data.emptyText} onChange={v => set(pageKey, sectionKey, 'emptyText', v)} multiline />
    );
  }
  else if (sectionKey === 'apply' && pageKey === 'careers') {
    // Careers Apply
    fields.push(
      <div key="apply-grid" className="hc-grid-2">
        <TextField label="Badge" value={data.badge} onChange={v => set(pageKey, sectionKey, 'badge', v)} />
        <TextField label="Title" value={data.title} onChange={v => set(pageKey, sectionKey, 'title', v)} />
      </div>,
      <TextField label="Text" value={data.text} onChange={v => set(pageKey, sectionKey, 'text', v)} multiline />
    );
  }
  else if (sectionKey === 'careersStrip' && pageKey === 'contact') {
    // Contact Page Careers Strip
    fields.push(
      <div key="careers-strip" className="hc-grid-2">
        <TextField label="Eyebrow" value={data.eyebrow} onChange={v => set(pageKey, sectionKey, 'eyebrow', v)} />
        <TextField label="Title" value={data.title} onChange={v => set(pageKey, sectionKey, 'title', v)} />
      </div>,
      <TextField label="Text" value={data.text} onChange={v => set(pageKey, sectionKey, 'text', v)} multiline />,
      <TextField label="Button Text" value={data.buttonText} onChange={v => set(pageKey, sectionKey, 'buttonText', v)} />
    );
  }
  else if (sectionKey === 'cta' && pageKey === 'gallery') {
    // Gallery CTA
    fields.push(
      <div key="gallery-cta" className="hc-grid-2">
        <TextField label="Icon (Lucide name)" value={data.icon} onChange={v => set(pageKey, sectionKey, 'icon', v)} placeholder="MessageSquare, Mail, Phone, etc." />
        <TextField label="Heading" value={data.heading} onChange={v => set(pageKey, sectionKey, 'heading', v)} />
      </div>,
      <TextField label="Subtext" value={data.subtext} onChange={v => set(pageKey, sectionKey, 'subtext', v)} multiline />,
      <TextField label="Button Text" value={data.buttonText} onChange={v => set(pageKey, sectionKey, 'buttonText', v)} />
    );
  }
  else if (sectionKey === 'cta' && pageKey === 'productDetail') {
    // Product Detail CTA Band
    fields.push(
      <div key="pd-cta" className="hc-grid-2">
        <TextField label="Title Prefix" value={data.titlePrefix} onChange={v => set(pageKey, sectionKey, 'titlePrefix', v)} placeholder="Looking for " />
        <TextField label="Title Suffix" value={data.titleSuffix} onChange={v => set(pageKey, sectionKey, 'titleSuffix', v)} placeholder="?" />
      </div>,
      <TextField label="Text" value={data.text} onChange={v => set(pageKey, sectionKey, 'text', v)} multiline />,
      <TextField label="Button Text" value={data.buttonText} onChange={v => set(pageKey, sectionKey, 'buttonText', v)} />
    );
  }
  else if (sectionKey === 'related' && pageKey === 'productDetail') {
    // Product Detail Related
    fields.push(
      <TextField label="Section Title" value={data.title} onChange={v => set(pageKey, sectionKey, 'title', v)} />
    );
  }
  else {
    // Generic fallback - render all fields in data
    Object.keys(data).forEach(key => {
      if (key === 'page' || key === 'label' || key === 'description' || key === 'visible' || key === 'items' || key === 'perks') return;
      const value = data[key];
      const isTextarea = typeof value === 'string' && (key.includes('text') || key.includes('desc') || key.includes('subtitle') || key.includes('paragraph'));
      if (isTextarea) {
        fields.push(<TextField key={key} label={key} value={value} onChange={v => set(pageKey, sectionKey, key, v)} multiline />);
      } else if (Array.isArray(value)) {
        // Skip arrays in generic mode (handled above)
      } else {
        fields.push(<TextField key={key} label={key} value={value} onChange={v => set(pageKey, sectionKey, key, v)} />);
      }
    });
  }

  return fields;
}