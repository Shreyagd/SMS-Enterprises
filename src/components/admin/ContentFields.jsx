import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Upload, Video } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { compressImage, canLoadImage } from '../../utils/images';
import { uploadVideo, isVideo } from '../../utils/media';
import Media from '../common/Media';

// Shared form building blocks for the Home Page and About Us content editors

export function TextField({ label, value, onChange, multiline, hint }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {multiline ? (
        <textarea className="form-textarea" rows={3} value={value ?? ''} onChange={e => onChange(e.target.value)} />
      ) : (
        <input className="form-input" type="text" value={value ?? ''} onChange={e => onChange(e.target.value)} />
      )}
      {hint && <p className="hc-hint">{hint}</p>}
    </div>
  );
}

// accept: 'both' (image or video), 'image' or 'video'
export function ImageField({ label, value, onChange, accept = 'both' }) {
  const { showToast } = useData();
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);

    const uploadVid = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    try {
      const { url: videoUrl, localOnly } = await uploadVideo(file);
      onChange(videoUrl);
      showToast(localOnly
        ? 'Video added. Note: without the website server running, this video is saved in this browser only — other visitors will not see it.'
        : 'Video uploaded.', localOnly ? 'info' : 'success');
    } catch (err) {
      showToast(err.message || 'Could not upload that video.', 'error');
    }
    setBusy(false);
  };

  const upload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    try {
      onChange(await compressImage(file));
    } catch {
      showToast('Could not read that image. Please try a JPG or PNG file.', 'error');
    }
    setBusy(false);
  };

  const useUrl = async () => {
    const link = url.trim();
    if (!link) return;
        if (!isVideo(link) && !(await canLoadImage(link))) {
      showToast('That link does not open an image. Use a direct image or video link, or upload the file.', 'error');
      return;
    }
    if (accept === 'video' && !isVideo(link)) {
      showToast('Please use a video link (ending in .mp4, .webm or .mov).', 'error');
      return;
    }
    onChange(link);
    setUrl('');
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="hc-image-row">
        <div className="hc-image-preview">
                    {value ? <Media key={value} src={value} /> : <span>{accept === 'video' ? 'No video' : 'No image'}</span>}
        </div>
        <div className="hc-image-actions">
                    <div className="hc-upload-btns">
            {accept !== 'video' && (
              <label className={`btn btn-secondary btn-sm ${busy ? 'hc-busy' : ''}`}>
                <Upload size={14} /> {busy ? 'Uploading…' : 'Upload image'}
                <input type="file" accept="image/*" hidden onChange={upload} disabled={busy} />
              </label>
            )}
            {accept !== 'image' && (
              <label className={`btn btn-secondary btn-sm ${busy ? 'hc-busy' : ''}`}>
                <Video size={14} /> {busy ? 'Uploading…' : 'Upload video'}
                <input type="file" accept="video/*" hidden onChange={uploadVid} disabled={busy} />
              </label>
            )}
          </div>
          <div className="hc-url-row">
            <input
              className="form-input"
                            placeholder={accept === 'video' ? '…or paste a video link / path' : '…or paste a link'}
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); useUrl(); } }}
            />
            <button type="button" className="btn btn-secondary btn-sm" onClick={useUrl}>Use</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Editable list of items (feature badges, checklist points, cards, stats)
export function ListEditor({ items, onChange, fields, newItem, addLabel, itemLabel }) {
  const update = (i, key, val) => onChange(items.map((it, j) => (j === i ? { ...it, [key]: val } : it)));
  const remove = (i) => onChange(items.filter((_, j) => j !== i));
  const move = (i, d) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };

  return (
    <div className="hc-list">
      {items.map((item, i) => (
        <div key={i} className="hc-list-item">
          <div className="hc-list-head">
            <strong>{itemLabel} {i + 1}</strong>
            <div className="hc-list-tools">
              <button type="button" title="Move up" disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp size={14} /></button>
              <button type="button" title="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)}><ArrowDown size={14} /></button>
              <button type="button" title="Remove" className="hc-danger" onClick={() => remove(i)}><Trash2 size={14} /></button>
            </div>
          </div>
          {fields.map(f => f.image ? (
            <ImageField key={f.key} label={f.label} value={item[f.key]} onChange={v => update(i, f.key, v)} />
          ) : (
            <TextField key={f.key} label={f.label} multiline={f.multiline} value={item[f.key]} onChange={v => update(i, f.key, v)} />
          ))}
        </div>
      ))}
      <button type="button" className="btn btn-outline-green btn-sm" onClick={() => onChange([...items, { ...newItem }])}>
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  );
}

export function Section({ title, description, visible, onToggle, children }) {
  return (
    <section className={`hc-section ${visible ? '' : 'hc-hidden'}`}>
      <div className="hc-section-head">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {onToggle && (
          <label className="hc-toggle">
            <input type="checkbox" checked={visible} onChange={e => onToggle(e.target.checked)} />
            <span>{visible ? 'Shown on page' : 'Hidden'}</span>
          </label>
        )}
      </div>
      {visible && <div className="hc-section-body">{children}</div>}
    </section>
  );
}

// Styles for the content editors (render once per editor page)
export function EditorStyles() {
  return (
    <style>{`
        .hc-root { max-width: 980px; }
        .hc-toolbar { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
        .hc-toolbar h2 { font-size: 1.4rem; margin-bottom: 4px; }
        .hc-toolbar p { color: #64748b; font-size: 0.9rem; }
        .hc-toolbar-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .hc-toolbar-actions .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
        .hc-unsaved { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; border-radius: 8px; padding: 10px 14px; font-size: 0.88rem; font-weight: 600; margin-bottom: 16px; position: sticky; top: 0; z-index: 5; }
        .hc-section { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 18px; overflow: hidden; }
        .hc-section.hc-hidden { background: #f8fafc; }
        .hc-section-head { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 16px 20px; border-bottom: 1px solid #edf2f7; }
        .hc-hidden .hc-section-head { border-bottom: none; opacity: 0.7; }
        .hc-section-head h3 { font-size: 1.05rem; margin-bottom: 2px; }
        .hc-section-head p { color: #64748b; font-size: 0.84rem; }
        .hc-section-body { padding: 18px 20px 6px; }
        .hc-toggle { display: inline-flex; align-items: center; gap: 8px; font-size: 0.82rem; font-weight: 600; color: #334155; cursor: pointer; white-space: nowrap; }
        .hc-toggle input { width: 16px; height: 16px; accent-color: var(--primary-green); }
        .hc-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
        .hc-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0 16px; }
        .hc-hint { font-size: 0.78rem; color: #64748b; margin-top: 4px; }
        .hc-image-row { display: flex; gap: 14px; align-items: flex-start; }
        .hc-image-preview { width: 140px; height: 96px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f1f5f9; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; color: #94a3b8; }
        .hc-image-preview img, .hc-image-preview video { width: 100%; height: 100%; object-fit: cover; }
        .hc-upload-btns { display: flex; gap: 8px; flex-wrap: wrap; }
        .hc-upload-btns > label { cursor: pointer; }
        .hc-image-actions { display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 0; }
        .hc-image-actions > label { align-self: flex-start; cursor: pointer; }
        .hc-busy { opacity: 0.6; pointer-events: none; }
        .hc-url-row { display: flex; gap: 8px; }
        .hc-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px; align-items: flex-start; }
        .hc-list-item { width: 100%; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px 0; background: #fbfdff; }
        .hc-list-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 0.85rem; color: #334155; }
        .hc-list-tools { display: flex; gap: 4px; }
        .hc-list-tools button { width: 28px; height: 28px; border-radius: 6px; border: 1px solid #e2e8f0; background: #fff; color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .hc-list-tools button:disabled { opacity: 0.35; cursor: default; }
        .hc-list-tools .hc-danger:hover { background: #fee2e2; color: #dc2626; border-color: #fecaca; }
        @media (max-width: 700px) {
          .hc-grid-2, .hc-grid-3 { grid-template-columns: 1fr; }
          .hc-section-head { flex-direction: column; align-items: flex-start; }
          .hc-image-row { flex-direction: column; }
        }
    `}</style>
  );
}
