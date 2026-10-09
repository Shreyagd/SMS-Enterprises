import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, ExternalLink, Undo2, FileText, Trash2, Mail, Phone, Download, Inbox } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { DEFAULT_CAREERS_CONTENT } from '../../data/careersContent';
import { TextField, ListEditor, Section, EditorStyles } from './ContentFields';

const STATUSES = ['New', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'];

function Applications() {
  const { applications, updateApplication, deleteApplication } = useData();
  const [filter, setFilter] = useState('All');
  const [openId, setOpenId] = useState(null);

  const list = filter === 'All' ? applications : applications.filter(a => a.status === filter);

  const toggle = (app) => {
    setOpenId(openId === app.id ? null : app.id);
    if (app.status === 'New') updateApplication(app.id, { status: 'Reviewed' });
  };

  if (!applications.length) {
    return (
      <div className="ca-empty">
        <Inbox size={40} />
        <h3>No applications yet</h3>
        <p>Applications submitted on the Careers page will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="ca-filters">
        {['All', ...STATUSES].map(s => (
          <button key={s} className={`ca-filter ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
            {s} <span>{s === 'All' ? applications.length : applications.filter(a => a.status === s).length}</span>
          </button>
        ))}
      </div>

      <div className="ca-list">
        {list.map(app => (
          <div key={app.id} className={`ca-item ${openId === app.id ? 'open' : ''}`}>
            <button className="ca-row" onClick={() => toggle(app)}>
              <div className="ca-who">
                <strong>{app.name}</strong>
                <span>{app.position}</span>
              </div>
              <span className="ca-date">{new Date(app.date).toLocaleDateString()}</span>
              <span className={`ca-status ca-status-${app.status.toLowerCase()}`}>{app.status}</span>
            </button>
            {openId === app.id && (
              <div className="ca-details">
                <div className="ca-contact">
                  <a href={`mailto:${app.email}`}><Mail size={14} /> {app.email}</a>
                  <a href={`tel:${app.phone}`}><Phone size={14} /> {app.phone}</a>
                </div>
                <dl>
                  <dt>Reference</dt><dd>{app.id}</dd>
                  <dt>Experience</dt><dd>{app.experience || '—'}</dd>
                  <dt>Location</dt><dd>{app.location || '—'}</dd>
                  <dt>About</dt><dd className="ca-message">{app.message || '—'}</dd>
                  <dt>Resume</dt>
                  <dd>
                    {app.resume ? (
                      <a className="btn btn-secondary btn-sm" href={app.resume.url} download={app.resume.name} target="_blank" rel="noreferrer">
                        <Download size={14} /> {app.resume.name}
                      </a>
                    ) : 'Not attached'}
                  </dd>
                </dl>
                <div className="ca-actions">
                  <label>
                    Status
                    <select className="form-select" value={app.status} onChange={e => updateApplication(app.id, { status: e.target.value })}>
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </label>
                  <button
                    className="btn btn-secondary btn-sm ca-delete"
                    onClick={() => { if (window.confirm(`Delete the application from ${app.name}?`)) deleteApplication(app.id); }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {!list.length && <p className="ca-none">No applications with status “{filter}”.</p>}
      </div>
    </div>
  );
}

function PageEditor() {
  const { careersContent, updateCareersContent } = useData();
  const [draft, setDraft] = useState(careersContent);
  useEffect(() => { setDraft(careersContent); }, [careersContent]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(careersContent);

  const set = (section, key, value) => setDraft(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  const field = (section, key, label, opts = {}) => (
    <TextField label={label} value={draft[section][key]} onChange={v => set(section, key, v)} {...opts} />
  );
  const sectionProps = (section) => ({ visible: draft[section].visible !== false, onToggle: v => set(section, 'visible', v) });

  return (
    <div>
      <div className="hc-toolbar">
        <p>Edit job openings and the text on the Careers page. Changes go live when you click <strong>Save changes</strong>.</p>
        <div className="hc-toolbar-actions">
          <a className="btn btn-secondary btn-sm" href="/careers" target="_blank" rel="noreferrer"><ExternalLink size={14} /> View Careers page</a>
          <button className="btn btn-secondary btn-sm" onClick={() => window.confirm('Reset the Careers page to the original content?') && setDraft(DEFAULT_CAREERS_CONTENT)}><RotateCcw size={14} /> Reset to original</button>
          <button className="btn btn-secondary btn-sm" disabled={!dirty} onClick={() => setDraft(careersContent)}><Undo2 size={14} /> Discard</button>
          <button className="btn btn-primary btn-sm" disabled={!dirty} onClick={() => updateCareersContent(draft)}><Save size={14} /> Save changes</button>
        </div>
      </div>
      {dirty && <div className="hc-unsaved">You have unsaved changes.</div>}

      <Section title="Job openings" description="Each opening gets an “Apply now” button. Remove all openings to show only the general application." {...sectionProps('openings')}>
        <div className="hc-grid-2">
          {field('openings', 'badge', 'Small green label')}
          {field('openings', 'title', 'Title')}
        </div>
        <ListEditor
          items={draft.openings.items}
          onChange={v => set('openings', 'items', v)}
          fields={[
            { key: 'title', label: 'Job title' },
            { key: 'department', label: 'Department' },
            { key: 'location', label: 'Location' },
            { key: 'type', label: 'Type (Full-time, Part-time, Internship…)' },
            { key: 'experience', label: 'Experience required' },
            { key: 'description', label: 'Short description', multiline: true }
          ]}
          newItem={{ title: 'New position', department: '', location: 'Bengaluru', type: 'Full-time', experience: '', description: '' }}
          addLabel="Add opening"
          itemLabel="Opening"
        />
        {field('openings', 'emptyText', 'Message when there are no openings', { multiline: true })}
      </Section>

      <Section title="Page heading" description="Dark banner at the top of the Careers page." visible onToggle={() => {}}>
        {field('hero', 'title', 'Title')}
        {field('hero', 'subtitle', 'Subtitle', { multiline: true })}
      </Section>

      <Section title="Why work with us" description="Intro text and benefit cards." {...sectionProps('intro')}>
        <div className="hc-grid-2">
          {field('intro', 'badge', 'Small green label')}
          {field('intro', 'title', 'Title')}
        </div>
        {field('intro', 'text', 'Text', { multiline: true })}
        <ListEditor
          items={draft.intro.perks}
          onChange={v => set('intro', 'perks', v)}
          fields={[{ key: 'title', label: 'Benefit' }, { key: 'desc', label: 'Description', multiline: true }]}
          newItem={{ title: 'New benefit', desc: '' }}
          addLabel="Add benefit"
          itemLabel="Benefit"
        />
      </Section>

      <Section title="Application form" description="Text next to the application form." visible onToggle={() => {}}>
        <div className="hc-grid-2">
          {field('apply', 'badge', 'Small green label')}
          {field('apply', 'title', 'Title')}
        </div>
        {field('apply', 'text', 'Text', { multiline: true })}
      </Section>
    </div>
  );
}

export default function AdminCareers() {
  const { applications } = useData();
  const [view, setView] = useState('applications');
  const newCount = applications.filter(a => a.status === 'New').length;

  return (
    <div className="hc-root">
      <div className="hc-toolbar">
        <div>
          <h2>Careers</h2>
          <p>Review job applications and manage the openings shown on the Careers page.</p>
        </div>
      </div>
      <div className="ca-tabs">
        <button className={view === 'applications' ? 'active' : ''} onClick={() => setView('applications')}>
          <FileText size={16} /> Applications {newCount > 0 && <span className="ca-badge">{newCount} new</span>}
        </button>
        <button className={view === 'page' ? 'active' : ''} onClick={() => setView('page')}>
          Page & openings
        </button>
      </div>

      {view === 'applications' ? <Applications /> : <PageEditor />}

      <EditorStyles />
      <style>{`
        .ca-tabs { display: flex; gap: 8px; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
        .ca-tabs button { display: inline-flex; align-items: center; gap: 8px; background: none; border: none; border-bottom: 2px solid transparent; padding: 10px 14px; font-weight: 600; color: #64748b; cursor: pointer; font-size: 0.92rem; margin-bottom: -1px; }
        .ca-tabs button.active { color: var(--primary-green); border-bottom-color: var(--primary-green); }
        .ca-badge { background: #dc2626; color: #fff; font-size: 0.7rem; border-radius: 999px; padding: 1px 8px; }
        .ca-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .ca-filter { border: 1px solid #e2e8f0; background: #fff; border-radius: 999px; padding: 5px 12px; font-size: 0.82rem; font-weight: 600; color: #475569; cursor: pointer; }
        .ca-filter span { color: #94a3b8; margin-left: 4px; }
        .ca-filter.active { background: var(--primary-green); border-color: var(--primary-green); color: #fff; }
        .ca-filter.active span { color: #dcfce7; }
        .ca-list { display: flex; flex-direction: column; gap: 10px; }
        .ca-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }
        .ca-item.open { border-color: rgba(22, 163, 74, 0.45); }
        .ca-row { width: 100%; display: flex; align-items: center; gap: 16px; padding: 14px 18px; background: none; border: none; text-align: left; cursor: pointer; font: inherit; }
        .ca-row:hover { background: #f8fafc; }
        .ca-who { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .ca-who strong { color: #0f172a; }
        .ca-who span { font-size: 0.85rem; color: #64748b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ca-date { font-size: 0.82rem; color: #94a3b8; }
        .ca-status { font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 999px; background: #f1f5f9; color: #475569; }
        .ca-status-new { background: #fee2e2; color: #b91c1c; }
        .ca-status-shortlisted { background: #dbeafe; color: #1d4ed8; }
        .ca-status-hired { background: #dcfce7; color: #15803d; }
        .ca-status-rejected { background: #f1f5f9; color: #94a3b8; }
        .ca-details { border-top: 1px solid #edf2f7; padding: 16px 18px; }
        .ca-contact { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-bottom: 12px; }
        .ca-contact a { display: inline-flex; align-items: center; gap: 6px; color: var(--primary-green); font-weight: 600; font-size: 0.9rem; }
        .ca-details dl { display: grid; grid-template-columns: 110px 1fr; gap: 8px 12px; font-size: 0.9rem; margin-bottom: 14px; }
        .ca-details dt { color: #94a3b8; font-weight: 600; }
        .ca-details dd { color: #334155; }
        .ca-message { white-space: pre-wrap; }
        .ca-actions { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .ca-actions label { display: flex; flex-direction: column; gap: 4px; font-size: 0.8rem; font-weight: 600; color: #64748b; }
        .ca-actions select { min-width: 180px; }
        .ca-delete:hover { background: #fee2e2; color: #dc2626; border-color: #fecaca; }
        .ca-empty { text-align: center; color: #64748b; background: #fff; border: 1px dashed #e2e8f0; border-radius: 12px; padding: 48px 20px; }
        .ca-empty svg { color: #94a3b8; margin-bottom: 10px; }
        .ca-empty h3 { color: #0f172a; margin-bottom: 4px; }
        .ca-none { color: #94a3b8; font-size: 0.9rem; padding: 12px 4px; }
        @media (max-width: 640px) {
          .ca-row { flex-wrap: wrap; }
          .ca-details dl { grid-template-columns: 1fr; gap: 2px; }
          .ca-details dt { margin-top: 8px; }
        }
      `}</style>
    </div>
  );
}
