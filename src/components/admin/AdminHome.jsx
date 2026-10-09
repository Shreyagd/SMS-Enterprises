import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, ExternalLink, Undo2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { DEFAULT_HOME_CONTENT } from '../../data/homeContent';
import { TextField, ImageField, ListEditor, Section, EditorStyles } from './ContentFields';

export default function AdminHome() {
  const { homeContent, updateHomeContent } = useData();
  const [draft, setDraft] = useState(homeContent);
    useEffect(() => { setDraft(homeContent); }, [homeContent]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(homeContent);

  // set(section, key, value) updates one field of one section
  const set = (section, key, value) => setDraft(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  const field = (section, key, label, opts = {}) => (
    <TextField label={label} value={draft[section][key]} onChange={v => set(section, key, v)} {...opts} />
  );
  const sectionProps = (section) => ({ visible: draft[section].visible !== false, onToggle: v => set(section, 'visible', v) });

  const resetAll = () => {
    if (window.confirm('Reset the whole home page back to the original content? Your edits will be lost after you save.')) {
      setDraft(DEFAULT_HOME_CONTENT);
    }
  };

  return (
    <div className="hc-root">
      <div className="hc-toolbar">
        <div>
          <h2>Home Page Content</h2>
          <p>Edit every section of the home page. Changes go live when you click <strong>Save changes</strong>.</p>
        </div>
        <div className="hc-toolbar-actions">
          <a className="btn btn-secondary btn-sm" href="/" target="_blank" rel="noreferrer"><ExternalLink size={14} /> View home page</a>
          <button className="btn btn-secondary btn-sm" onClick={resetAll}><RotateCcw size={14} /> Reset to original</button>
          <button className="btn btn-secondary btn-sm" disabled={!dirty} onClick={() => setDraft(homeContent)}><Undo2 size={14} /> Discard</button>
          <button className="btn btn-primary btn-sm" disabled={!dirty} onClick={() => updateHomeContent(draft)}><Save size={14} /> Save changes</button>
        </div>
      </div>
      {dirty && <div className="hc-unsaved">You have unsaved changes.</div>}

      <Section title="1. Banner (top of page)" description="Headline, text and buttons over the background video." {...sectionProps('hero')}>
        {field('hero', 'pill', 'Small label above headline')}
        <div className="hc-grid-3">
          {field('hero', 'line1', 'Headline – line 1')}
          {field('hero', 'line2', 'Headline – line 2')}
          {field('hero', 'highlight', 'Headline – green line')}
        </div>
        {field('hero', 'subtext', 'Text under headline', { multiline: true })}
        <div className="hc-grid-2">
          {field('hero', 'primaryButton', 'Green button text (opens Products)')}
          {field('hero', 'secondaryButton', 'White button text (opens quote form)')}
        </div>
                <ImageField label="Background video" accept="video" value={draft.hero.video} onChange={v => set('hero', 'video', v)} />
        <ImageField label="Image shown while the video loads" accept="both" value={draft.hero.poster} onChange={v => set('hero', 'poster', v)} />
      </Section>

      <Section title="2. Feature strip" description="The row of short highlights under the banner." {...sectionProps('features')}>
        <ListEditor
          items={draft.features.items}
          onChange={v => set('features', 'items', v)}
          fields={[{ key: 'title', label: 'Title' }, { key: 'desc', label: 'Short description' }]}
          newItem={{ title: 'New feature', desc: '' }}
          addLabel="Add feature"
          itemLabel="Feature"
        />
      </Section>

      <Section title="3. Why choose us" description="Image, intro text and checklist." {...sectionProps('why')}>
        <div className="hc-grid-2">
          <ImageField label="Image" value={draft.why.image} onChange={v => set('why', 'image', v)} />
          {field('why', 'imageBadge', 'Label on the image')}
        </div>
        <div className="hc-grid-2">
          {field('why', 'badge', 'Small green label')}
          {field('why', 'title', 'Title')}
        </div>
        {field('why', 'lead', 'Intro text', { multiline: true })}
        <label className="form-label">Checklist points</label>
        <ListEditor
          items={draft.why.points}
          onChange={v => set('why', 'points', v)}
          fields={[{ key: 'title', label: 'Point' }, { key: 'desc', label: 'Explanation', multiline: true }]}
          newItem={{ title: 'New point', desc: '' }}
          addLabel="Add point"
          itemLabel="Point"
        />
        {field('why', 'button', 'Button text (opens About Us)')}
      </Section>

      <Section title="4. Featured products" description="Shows products marked “Featured” in the Products Catalog." {...sectionProps('featured')}>
        <div className="hc-grid-2">
          {field('featured', 'badge', 'Small green label')}
          {field('featured', 'title', 'Title')}
        </div>
        {field('featured', 'subtitle', 'Subtitle', { multiline: true })}
        <div className="hc-grid-2">
          <div className="form-group">
            <label className="form-label">How many products to show</label>
            <input
              className="form-input"
              type="number"
              min={1}
              max={21}
              value={draft.featured.count}
              onChange={e => set('featured', 'count', Math.max(1, Number(e.target.value) || 1))}
            />
          </div>
          {field('featured', 'button', 'Button text (opens Products)')}
        </div>
      </Section>

      <Section title="5. Infrastructure" description="Dark section with machinery / plant photos." {...sectionProps('infra')}>
        <div className="hc-grid-2">
          {field('infra', 'badge', 'Small gold label')}
          {field('infra', 'title', 'Title')}
        </div>
        {field('infra', 'button', 'Button text (opens Gallery)')}
        <label className="form-label">Cards</label>
        <ListEditor
          items={draft.infra.cards}
          onChange={v => set('infra', 'cards', v)}
          fields={[{ key: 'image', label: 'Photo', image: true }, { key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', multiline: true }]}
          newItem={{ image: '', title: 'New card', desc: '' }}
          addLabel="Add card"
          itemLabel="Card"
        />
      </Section>

      <Section title="6. Numbers" description="Experience, team size, customers and partners." {...sectionProps('stats')}>
        <ListEditor
          items={draft.stats.items}
          onChange={v => set('stats', 'items', v)}
          fields={[{ key: 'number', label: 'Number (e.g. 05+)' }, { key: 'label', label: 'Label' }]}
          newItem={{ number: '0', label: 'NEW STAT' }}
          addLabel="Add number"
          itemLabel="Number"
        />
      </Section>

      <Section title="7. Bottom call-to-action" description="Green box at the end of the page." {...sectionProps('cta')}>
        {field('cta', 'title', 'Title')}
        {field('cta', 'text', 'Text', { multiline: true })}
        <div className="hc-grid-2">
          {field('cta', 'primaryButton', 'White button text (opens quote form)')}
          {field('cta', 'secondaryButton', 'Outline button text (opens Contact)')}
        </div>
      </Section>

      <EditorStyles />
    </div>
  );
}
