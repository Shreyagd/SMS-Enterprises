import React, { useRef, useState } from 'react';
import { Briefcase, MapPin, Clock, GraduationCap, TrendingUp, ShieldCheck, Wallet, Cpu, Upload, CheckCircle2, Mail, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { uploadResume, MAX_RESUME_MB } from '../../utils/media';

const GENERAL = 'General application';
const perkIcons = [Cpu, TrendingUp, ShieldCheck, Wallet];

const emptyForm = { name: '', email: '', phone: '', position: GENERAL, experience: '', location: '', message: '' };

export default function CareersPage() {
  const { careersContent, submitApplication, settings, showToast } = useData();
  const { hero, intro, openings, apply } = careersContent;
  const shown = (section) => section.visible !== false;
  const openingsList = shown(openings) ? openings.items.filter(o => o.title) : [];

  const [form, setForm] = useState(emptyForm);
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const formRef = useRef(null);

  const change = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const applyFor = (title) => {
    setSubmitted(null);
    setForm(prev => ({ ...prev, position: title }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pickResume = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      showToast(`Resume is larger than ${MAX_RESUME_MB} MB. Please upload a smaller PDF.`, 'error');
      e.target.value = '';
      return;
    }
    setResumeFile(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const resume = resumeFile ? await uploadResume(resumeFile) : null;
      const app = await submitApplication({ ...form, resume });
      setSubmitted(app);
      setForm(emptyForm);
      setResumeFile(null);
    } catch (err) {
      showToast(err.message || 'Could not submit your application. Please try again.', 'error');
    }
    setSubmitting(false);
  };

  return (
    <div className="careers-root">
      <section className="careers-hero">
        <div className="container">
          <span className="careers-eyebrow">JOIN OUR TEAM</span>
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
          {openingsList.length > 0 && (
            <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}>
              VIEW {openingsList.length} OPEN {openingsList.length === 1 ? 'ROLE' : 'ROLES'} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </section>

      {shown(intro) && (
        <section className="section careers-intro">
          <div className="container">
            <div className="careers-intro-head">
              <span className="badge badge-green">{intro.badge}</span>
              <h2>{intro.title}</h2>
              <p>{intro.text}</p>
            </div>
            <div className="careers-perks">
              {intro.perks.map((perk, i) => {
                const Icon = perkIcons[i % perkIcons.length];
                return (
                  <div key={i} className="careers-perk">
                    <div className="careers-perk-icon"><Icon size={22} /></div>
                    <h4>{perk.title}</h4>
                    <p>{perk.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {shown(openings) && (
        <section className="section section-alt careers-openings" id="openings">
          <div className="container">
            <div className="careers-section-head">
              <span className="badge badge-green">{openings.badge}</span>
              <h2>{openings.title}</h2>
            </div>
            {openingsList.length === 0 ? (
              <div className="careers-empty">{openings.emptyText}</div>
            ) : (
              <div className="careers-jobs">
                {openingsList.map((job, i) => (
                  <article key={i} className="careers-job">
                    <div className="careers-job-main">
                      <h3>{job.title}</h3>
                      <div className="careers-job-meta">
                        {job.department && <span><Briefcase size={14} /> {job.department}</span>}
                        {job.location && <span><MapPin size={14} /> {job.location}</span>}
                        {job.type && <span><Clock size={14} /> {job.type}</span>}
                        {job.experience && <span><GraduationCap size={14} /> {job.experience}</span>}
                      </div>
                      {job.description && <p>{job.description}</p>}
                    </div>
                    <button className="btn btn-primary" onClick={() => applyFor(job.title)}>APPLY NOW</button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section careers-apply" ref={formRef}>
        <div className="container careers-apply-grid">
          <div className="careers-apply-info">
            <span className="badge badge-green">{apply.badge}</span>
            <h2>{apply.title}</h2>
            <p>{apply.text}</p>
            <div className="careers-mail">
              <Mail size={18} />
              <span>Prefer email? Send your resume to <a href={`mailto:${settings.email}?subject=Job application`}>{settings.email}</a></span>
            </div>
          </div>

          <div className="careers-form-card">
            {submitted ? (
              <div className="careers-success">
                <CheckCircle2 size={48} />
                <h3>Application received</h3>
                <p>Thank you, {submitted.name}. Your application for <strong>{submitted.position}</strong> (ref. {submitted.id}) has been submitted. Our team will contact you if your profile matches.</p>
                <button className="btn btn-secondary" onClick={() => setSubmitted(null)}>Submit another application</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="careers-form-row">
                  <div className="form-group">
                    <label className="form-label">Full name *</label>
                    <input className="form-input" name="name" required value={form.name} onChange={change} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input className="form-input" name="phone" type="tel" required value={form.phone} onChange={change} />
                  </div>
                </div>
                <div className="careers-form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" name="email" type="email" required value={form.email} onChange={change} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Position *</label>
                    <select className="form-select" name="position" value={form.position} onChange={change}>
                      {openingsList.map((job, i) => <option key={i} value={job.title}>{job.title}</option>)}
                      <option value={GENERAL}>{GENERAL}</option>
                    </select>
                  </div>
                </div>
                <div className="careers-form-row">
                  <div className="form-group">
                    <label className="form-label">Experience</label>
                    <input className="form-input" name="experience" placeholder="e.g. 3 years" value={form.experience} onChange={change} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current location</label>
                    <input className="form-input" name="location" placeholder="City" value={form.location} onChange={change} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">About you</label>
                  <textarea className="form-textarea" name="message" rows={4} placeholder="Your skills, current role, notice period…" value={form.message} onChange={change} />
                </div>
                <div className="form-group">
                  <label className="form-label">Resume (PDF or Word, max {MAX_RESUME_MB} MB)</label>
                  <label className="careers-file">
                    <Upload size={18} />
                    <span>{resumeFile ? resumeFile.name : 'Choose file'}</span>
                    <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden onChange={pickResume} />
                  </label>
                </div>
                <button className="btn btn-primary btn-lg careers-submit" type="submit" disabled={submitting}>
                  {submitting ? 'SUBMITTING…' : 'SUBMIT APPLICATION'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .careers-hero { background: linear-gradient(120deg, var(--primary-navy) 0%, var(--navy-light) 100%); color: #fff; padding: 72px 0 64px; }
        .careers-eyebrow { font-size: 0.78rem; font-weight: 700; letter-spacing: 1px; color: #4ade80; }
        .careers-hero h1 { color: #fff; font-size: 2.8rem; font-weight: 800; margin: 10px 0 12px; letter-spacing: -0.5px; }
        .careers-hero p { color: #cbd5e1; font-size: 1.08rem; max-width: 640px; line-height: 1.7; margin-bottom: 26px; }

        .careers-intro-head, .careers-section-head { text-align: center; max-width: 720px; margin: 0 auto 36px; }
        .careers-intro-head h2, .careers-section-head h2 { font-size: 2rem; margin: 12px 0 10px; }
        .careers-intro-head p { color: var(--text-muted); line-height: 1.7; }
        .careers-perks { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .careers-perk { background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 24px; }
        .careers-perk-icon { width: 46px; height: 46px; border-radius: 12px; background: var(--green-bg); color: var(--primary-green); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
        .careers-perk h4 { font-size: 1.05rem; margin-bottom: 6px; }
        .careers-perk p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; }

        .careers-jobs { display: flex; flex-direction: column; gap: 16px; max-width: 960px; margin: 0 auto; }
        .careers-job { display: flex; align-items: center; justify-content: space-between; gap: 24px; background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 22px 26px; transition: var(--transition); }
        .careers-job:hover { border-color: rgba(22, 163, 74, 0.4); box-shadow: var(--shadow-md); }
        .careers-job h3 { font-size: 1.2rem; margin-bottom: 8px; }
        .careers-job-meta { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-bottom: 10px; }
        .careers-job-meta span { display: inline-flex; align-items: center; gap: 6px; font-size: 0.84rem; color: #475569; }
        .careers-job-meta svg { color: var(--primary-green); }
        .careers-job p { font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; }
        .careers-job .btn { flex-shrink: 0; }
        .careers-empty { max-width: 720px; margin: 0 auto; text-align: center; color: var(--text-muted); background: #fff; border: 1px dashed var(--border-light); border-radius: var(--radius-lg); padding: 32px; }

        .careers-apply { scroll-margin-top: 80px; }
        .careers-apply-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 48px; align-items: start; }
        .careers-apply-info h2 { font-size: 2rem; margin: 12px 0 12px; }
        .careers-apply-info p { color: var(--text-muted); line-height: 1.7; margin-bottom: 20px; }
        .careers-mail { display: flex; gap: 10px; align-items: flex-start; background: var(--bg-alt); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 14px 16px; font-size: 0.9rem; color: #334155; }
        .careers-mail svg { color: var(--primary-green); flex-shrink: 0; margin-top: 2px; }
        .careers-mail a { color: var(--primary-green); font-weight: 600; word-break: break-all; }
        .careers-form-card { background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-md); }
        .careers-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
        .careers-file { display: flex; align-items: center; gap: 10px; border: 1.5px dashed #cbd5e1; border-radius: var(--radius-sm); padding: 12px 14px; cursor: pointer; color: #475569; font-size: 0.9rem; transition: var(--transition); }
        .careers-file:hover { border-color: var(--primary-green); color: var(--primary-green); background: var(--green-bg); }
        .careers-file span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .careers-submit { width: 100%; margin-top: 6px; }
        .careers-submit:disabled { opacity: 0.6; cursor: wait; transform: none; }
        .careers-success { text-align: center; padding: 24px 8px; color: var(--text-muted); }
        .careers-success svg { color: var(--primary-green); margin-bottom: 12px; }
        .careers-success h3 { color: var(--text-main); font-size: 1.4rem; margin-bottom: 8px; }
        .careers-success p { margin-bottom: 20px; line-height: 1.6; }

        @media (max-width: 991px) {
          .careers-perks { grid-template-columns: repeat(2, 1fr); }
          .careers-apply-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; }
        }
        @media (max-width: 640px) {
          .careers-hero { padding: 48px 0 44px; }
          .careers-hero h1 { font-size: 2rem; }
          .careers-perks { grid-template-columns: 1fr; }
          .careers-job { flex-direction: column; align-items: flex-start; padding: 18px; }
          .careers-job .btn { width: 100%; }
          .careers-form-row { grid-template-columns: 1fr; }
          .careers-form-card { padding: 20px; }
          .careers-intro-head h2, .careers-section-head h2, .careers-apply-info h2 { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
