import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, ExternalLink, Undo2, Building, Mail, Phone, MapPin, Award, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { DEFAULT_FOOTER_CONTENT } from '../../data/footerContent';
import { TextField, ImageField, ListEditor, Section, EditorStyles } from './ContentFields';

export default function AdminFooter() {
  const { footerContent, updateFooterContent, settings } = useData();
  const [draft, setDraft] = useState(footerContent);
  useEffect(() => { setDraft(footerContent); }, [footerContent]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(footerContent);

  // set(section, key, value) updates one field of one section
  const set = (section, key, value) => setDraft(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  const field = (section, key, label, opts = {}) => (
    <TextField label={label} value={draft[section][key]} onChange={v => set(section, key, v)} {...opts} />
  );
  const sectionProps = (section) => ({ visible: draft[section].visible !== false, onToggle: v => set(section, 'visible', v) });

  const resetAll = () => {
    if (window.confirm('Reset the whole footer back to the original content? Your edits will be lost after you save.')) {
      setDraft(DEFAULT_FOOTER_CONTENT);
    }
  };

  return (
    <div className="hc-root">
      <div className="hc-toolbar">
        <div>
          <h2>Footer Content</h2>
          <p>Edit the footer sections. Changes go live when you click <strong>Save changes</strong>.</p>
        </div>
        <div className="hc-toolbar-actions">
          <a className="btn btn-secondary btn-sm" href="/" target="_blank" rel="noreferrer"><ExternalLink size={14} /> View footer on site</a>
          <button className="btn btn-secondary btn-sm" onClick={resetAll}><RotateCcw size={14} /> Reset to original</button>
          <button className="btn btn-secondary btn-sm" disabled={!dirty} onClick={() => setDraft(footerContent)}><Undo2 size={14} /> Discard</button>
          <button className="btn btn-primary btn-sm" disabled={!dirty} onClick={() => updateFooterContent(draft)}><Save size={14} /> Save changes</button>
        </div>
      </div>
      {dirty && <div className="hc-unsaved">You have unsaved changes.</div>}

      <Section title="1. Brand Column" description="Company logo, name, tagline, bio and GSTIN badge." {...sectionProps('brand')}>
        <div className="form-group">
          <label className="form-label">Tagline (under company name)</label>
          <input
            className="form-input"
            type="text"
            value={draft.brand.tagline}
            onChange={e => set('brand', 'tagline', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Bio / Description</label>
          <textarea
            className="form-textarea"
            rows={4}
            value={draft.brand.bio}
            onChange={e => set('brand', 'bio', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">GSTIN Label</label>
          <input
            className="form-input"
            type="text"
            value={draft.brand.gstinLabel}
            onChange={e => set('brand', 'gstinLabel', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">GSTIN Value (from Settings)</label>
          <input
            className="form-input"
            type="text"
            value={settings.gstin}
            readOnly
          />
          <p className="hc-hint">Edit the actual GSTIN in <strong>Settings & Security → Company Information</strong>.</p>
        </div>
        <p className="hc-hint">Company name, address, phone, email and working hours are also managed in <strong>Settings & Security</strong>.</p>
      </Section>

      <Section title="2. Quick Links" description="Navigation links in the second column." {...sectionProps('quickLinks')}>
        <div className="form-group">
          <label className="form-label">Column Heading</label>
          <input
            className="form-input"
            type="text"
            value={draft.quickLinks.heading}
            onChange={e => set('quickLinks', 'heading', e.target.value)}
          />
        </div>
        <ListEditor
          items={draft.quickLinks.items}
          onChange={v => set('quickLinks', 'items', v)}
          fields={[
            { key: 'label', label: 'Link Label' },
            { key: 'page', label: 'Target Page (home, products, about, careers, contact)' }
          ]}
          newItem={{ label: 'New Link', page: 'home' }}
          addLabel="Add link"
          itemLabel="Link"
        />
      </Section>

      <Section title="3. Product Lines" description="Third column showing product catalog links." {...sectionProps('productLines')}>
        <div className="form-group">
          <label className="form-label">Column Heading</label>
          <input
            className="form-input"
            type="text"
            value={draft.productLines.heading}
            onChange={e => set('productLines', 'heading', e.target.value)}
          />
        </div>
        <p className="hc-hint">Products are automatically loaded from the Products Catalog. Only the heading and visibility can be changed here.</p>
      </Section>

      <Section title="4. Contact Column" description="Factory/registered unit address and contact details." {...sectionProps('contact')}>
        <div className="form-group">
          <label className="form-label">Column Heading</label>
          <input
            className="form-input"
            type="text"
            value={draft.contact.heading}
            onChange={e => set('contact', 'heading', e.target.value)}
          />
        </div>
        <div className="hc-grid-2">
          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              className="form-input"
              type="text"
              value={settings.address}
              readOnly
            />
            <p className="hc-hint">Managed in Settings & Security</p>
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              type="text"
              value={settings.phone}
              readOnly
            />
            <p className="hc-hint">Managed in Settings & Security</p>
          </div>
        </div>
        <div className="hc-grid-2">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={settings.email}
              readOnly
            />
            <p className="hc-hint">Managed in Settings & Security</p>
          </div>
          <div className="form-group">
            <label className="form-label">Working Hours</label>
            <input
              className="form-input"
              type="text"
              value={settings.workingHours}
              readOnly
            />
            <p className="hc-hint">Managed in Settings & Security</p>
          </div>
        </div>
      </Section>

      <Section title="5. Copyright Bar" description="Bottom bar with copyright notice." {...sectionProps('copyright')}>
        <div className="form-group">
          <label className="form-label">Copyright Text Template</label>
          <input
            className="form-input"
            type="text"
            value={draft.copyright.text}
            onChange={e => set('copyright', 'text', e.target.value)}
          />
        </div>
        <p className="hc-hint">Use <code>{'{'}</code>year<code>{'}'}</code> for current year and <code>{'{'}</code>companyName<code>{'}'}</code> for company name. These are auto-replaced.</p>
      </Section>

      <EditorStyles />
    </div>
  );
}