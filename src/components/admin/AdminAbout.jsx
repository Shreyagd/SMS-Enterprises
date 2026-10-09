import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, ExternalLink, Undo2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { DEFAULT_ABOUT_CONTENT } from '../../data/aboutContent';
import { TextField, ImageField, ListEditor, Section, EditorStyles } from './ContentFields';

const BOLD_HINT = 'Tip: wrap words in **double stars** to make them bold.';

export default function AdminAbout() {
  const { aboutContent, updateAboutContent } = useData();
  const [draft, setDraft] = useState(aboutContent);
  useEffect(() => { setDraft(aboutContent); }, [aboutContent]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(aboutContent);

  const set = (section, key, value) => setDraft(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  const field = (section, key, label, opts = {}) => (
    <TextField label={label} value={draft[section][key]} onChange={v => set(section, key, v)} {...opts} />
  );
  const sectionProps = (section) => ({ visible: draft[section].visible !== false, onToggle: v => set(section, 'visible', v) });

  const resetAll = () => {
    if (window.confirm('Reset the whole About Us page back to the original content? Your edits will be lost after you save.')) {
      setDraft(DEFAULT_ABOUT_CONTENT);
    }
  };

  return (
    <div className="hc-root">
      <div className="hc-toolbar">
        <div>
          <h2>About Us Page Content</h2>
          <p>Edit every section of the About Us page. Changes go live when you click <strong>Save changes</strong>.</p>
        </div>
        <div className="hc-toolbar-actions">
          <a className="btn btn-secondary btn-sm" href="/about" target="_blank" rel="noreferrer"><ExternalLink size={14} /> View About Us</a>
          <button className="btn btn-secondary btn-sm" onClick={resetAll}><RotateCcw size={14} /> Reset to original</button>
          <button className="btn btn-secondary btn-sm" disabled={!dirty} onClick={() => setDraft(aboutContent)}><Undo2 size={14} /> Discard</button>
          <button className="btn btn-primary btn-sm" disabled={!dirty} onClick={() => updateAboutContent(draft)}><Save size={14} /> Save changes</button>
        </div>
      </div>
      {dirty && <div className="hc-unsaved">You have unsaved changes.</div>}

      <Section title="1. Page heading" description="Title and line at the top of the page." {...sectionProps('header')}>
        {field('header', 'title', 'Title')}
        {field('header', 'subtitle', 'Subtitle', { multiline: true })}
      </Section>

      <Section title="2. Our story & founder" description="Company introduction, founder quote, checklist and factory photo." {...sectionProps('story')}>
        <div className="hc-grid-2">
          {field('story', 'badge', 'Small green label')}
          {field('story', 'title', 'Title')}
        </div>
        {field('story', 'paragraph', 'Introduction paragraph', { multiline: true, hint: BOLD_HINT })}
        {field('story', 'quote', 'Founder quote', { multiline: true })}
        <div className="hc-grid-2">
          {field('story', 'founderName', 'Founder name')}
          {field('story', 'founderRole', 'Founder title')}
        </div>
        {field('story', 'paragraph2', 'Second paragraph', { multiline: true, hint: BOLD_HINT })}
        <label className="form-label">Checklist</label>
        <ListEditor
          items={draft.story.checks}
          onChange={v => set('story', 'checks', v)}
          fields={[{ key: 'text', label: 'Text' }]}
          newItem={{ text: 'New point' }}
          addLabel="Add point"
          itemLabel="Point"
        />
        <ImageField label="Factory photo" value={draft.story.image} onChange={v => set('story', 'image', v)} />
        <div className="hc-grid-2">
          {field('story', 'imageBadgeTitle', 'Label on photo – title')}
          {field('story', 'imageBadgeText', 'Label on photo – text')}
        </div>
        <div className="hc-grid-2">
          {field('story', 'highlightTitle', 'Highlight box – title')}
          {field('story', 'highlightText', 'Highlight box – text')}
        </div>
      </Section>

      <Section title="3. Numbers" description="Experience, customers, team and quality figures." {...sectionProps('stats')}>
        <ListEditor
          items={draft.stats.items}
          onChange={v => set('stats', 'items', v)}
          fields={[{ key: 'number', label: 'Number (e.g. 05+)' }, { key: 'label', label: 'Label' }]}
          newItem={{ number: '0', label: 'New figure' }}
          addLabel="Add number"
          itemLabel="Number"
        />
      </Section>

      <Section title="4. Core pillars" description="Cards explaining what sets the company apart." {...sectionProps('pillars')}>
        <div className="hc-grid-2">
          {field('pillars', 'badge', 'Small green label')}
          {field('pillars', 'title', 'Title')}
        </div>
        {field('pillars', 'subtitle', 'Subtitle', { multiline: true })}
        <label className="form-label">Pillars</label>
        <ListEditor
          items={draft.pillars.items}
          onChange={v => set('pillars', 'items', v)}
          fields={[{ key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', multiline: true }]}
          newItem={{ title: 'NEW PILLAR', desc: '' }}
          addLabel="Add pillar"
          itemLabel="Pillar"
        />
      </Section>

      <Section title="5. Vision & mission" description="Dark section with the vision and mission statements." {...sectionProps('missionVision')}>
        <div className="hc-grid-2">
          {field('missionVision', 'visionBadge', 'Vision – label')}
          {field('missionVision', 'visionTitle', 'Vision – title')}
        </div>
        {field('missionVision', 'visionText', 'Vision – statement', { multiline: true })}
        <div className="hc-grid-2">
          {field('missionVision', 'missionBadge', 'Mission – label')}
          {field('missionVision', 'missionTitle', 'Mission – title')}
        </div>
        {field('missionVision', 'missionText', 'Mission – statement', { multiline: true })}
      </Section>

      <Section title="6. Certifications" description="List of company certifications and compliances." {...sectionProps('certifications')}>
        {field('certifications', 'title', 'Section Title')}
        {field('certifications', 'subtitle', 'Section Subtitle', { multiline: true })}
        <label className="form-label">Certifications List</label>
        <ListEditor
          items={draft.certifications?.items || []}
          onChange={v => set('certifications', 'items', v)}
                    fields={[
            { key: 'name', label: 'Certificate Name' },
            { key: 'desc', label: 'Description' },
            { key: 'image', label: 'Image', image: true }
          ]}
          newItem={{ name: 'New certificate', desc: '', image: '' }}
          addLabel="Add certificate"
          itemLabel="Certificate"
        />
      </Section>

      <Section title="7. Customers" description="Customer logos that scroll from right to left." {...sectionProps('customers')}>
        <div className="hc-grid-2">
          {field('customers', 'badge', 'Small green label')}
          {field('customers', 'title', 'Title')}
        </div>
        {field('customers', 'subtitle', 'Subtitle', { multiline: true })}
        <div className="form-group">
          <label className="form-label">Scroll speed (seconds for one full loop — higher is slower)</label>
          <input
            className="form-input"
            type="number"
            min={5}
            max={120}
            value={draft.customers.speed}
            onChange={e => set('customers', 'speed', Math.min(120, Math.max(5, Number(e.target.value) || 30)))}
          />
        </div>
        <label className="form-label">Customer logos</label>
        <ListEditor
          items={draft.customers.items}
          onChange={v => set('customers', 'items', v)}
          fields={[{ key: 'name', label: 'Customer name (shown when hovering the logo)' }, { key: 'logo', label: 'Logo', image: true }]}
          newItem={{ name: 'New customer', logo: '' }}
          addLabel="Add customer"
          itemLabel="Customer"
        />
      </Section>

      <Section title="8. Bottom call-to-action" description="Box at the end of the page with a quote button." {...sectionProps('cta')}>
        {field('cta', 'title', 'Title')}
        {field('cta', 'text', 'Text', { multiline: true })}
        {field('cta', 'button', 'Button text (opens quote form)')}
      </Section>

      <EditorStyles />
    </div>
  );
}
