import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, ArrowRight, Phone, Layers } from 'lucide-react';
import { useData } from '../../context/DataContext';

const sectionId = (title) => 'sec-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// "Label: description" -> bold label + text
function ListItem({ text }) {
  const idx = text.indexOf(': ');
  if (idx > 0 && idx < 80) {
    return (
      <li>
        <CheckCircle size={18} className="pd-check" />
        <span><strong>{text.slice(0, idx)}</strong> — {text.slice(idx + 2)}</span>
      </li>
    );
  }
  return (
    <li>
      <CheckCircle size={18} className="pd-check" />
      <span>{text}</span>
    </li>
  );
}

export default function ProductDetailPage({ slug, setActivePage, onOpenQuoteModal, onSelectProduct }) {
  const { products, settings } = useData();
  const product = products.find(p => p.slug === slug || p.id === slug);
  const images = product ? [product.image, ...(product.images || []).filter(i => i !== product.image)] : [];
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
    const prevTitle = document.title;
    if (product) document.title = `${product.name} | ${settings.companyName}`;
    return () => { document.title = prevTitle; };
  }, [slug]);

  if (!product) {
    return (
      <div className="container pd-notfound">
        <Layers size={48} />
        <h2>Product not found</h2>
        <p>The product you are looking for may have been moved or renamed.</p>
        <button className="btn btn-primary" onClick={() => setActivePage('products')}>Browse all products</button>
      </div>
    );
  }

  const sections = product.sections || [];
  const quickSpecs = [
    ['Thickness', product.thickness],
    ['Width / Size', product.width],
    ['Format / Core', product.coreSize],
    ['Performance', product.elongation]
  ].filter(([, v]) => v);

  const related = [
    ...products.filter(p => p.category === product.category && p.id !== product.id),
    ...products.filter(p => p.category !== product.category)
  ].slice(0, 3);

  return (
    <div className="pd-root fade-in">
      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <div className="container">
          <button onClick={() => setActivePage('home')}>Home</button>
          <ChevronRight size={14} />
          <button onClick={() => setActivePage('products')}>Products</button>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="pd-hero">
        <div className="container pd-hero-grid">
          <div className="pd-gallery">
            <div className="pd-main-img">
              <img src={images[activeImg]} alt={product.name} />
              {product.badge && <span className="pd-img-badge">{product.badge}</span>}
            </div>
            {images.length > 1 && (
              <div className="pd-thumbs">
                {images.map((src, i) => (
                  <button
                    key={src}
                    className={`pd-thumb ${i === activeImg ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pd-summary">
            <span className="pd-category">{product.category}</span>
            <h1 className="pd-title">{product.name}</h1>
            <p className="pd-subtitle">{product.subtitle}</p>
            <p className="pd-desc">{product.description}</p>

            {quickSpecs.length > 0 && (
              <div className="pd-quick-specs">
                {quickSpecs.map(([label, value]) => (
                  <div key={label} className="pd-qs">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            )}

            <div className="pd-ctas">
              <button className="btn btn-primary btn-lg" onClick={() => onOpenQuoteModal(product.name)}>
                Request a Quote <ArrowRight size={18} />
              </button>
              <a className="btn btn-secondary btn-lg" href={`tel:${settings.phone.replace(/\s/g, '')}`}>
                <Phone size={18} /> {settings.phone}
              </a>
            </div>

            {product.applications?.length > 0 && (
              <div className="pd-apps">
                <span className="pd-apps-label">Ideal for</span>
                <div className="pd-apps-list">
                  {product.applications.map(a => <span key={a} className="pd-app-chip">{a}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Details */}
      {sections.length > 0 && (
        <section className="pd-body">
          <div className="container pd-body-grid">
            <aside className="pd-toc">
              <div className="pd-toc-card">
                <h4>On this page</h4>
                {sections.map(s => (
                  <a key={s.title} href={`#${sectionId(s.title)}`}>{s.title}</a>
                ))}
              </div>
              <div className="pd-toc-quote">
                <h4>Need custom specs?</h4>
                <p>Sizes, thickness, colours and printing tailored to your line.</p>
                <button className="btn btn-primary btn-sm" onClick={() => onOpenQuoteModal(product.name)}>
                  Get a Quote
                </button>
              </div>
            </aside>

            <div className="pd-sections">
              {sections.map(s => (
                <article key={s.title} id={sectionId(s.title)} className="pd-section">
                  <h2>{s.title}</h2>
                  {s.text?.map((t, i) => <p key={i}>{t}</p>)}
                  {s.table && (
                    <div className="pd-table-wrap">
                      <table className="pd-table">
                        <thead>
                          <tr>{s.table.head.map(h => <th key={h}>{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {s.table.rows.map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => (
                                <td key={j} data-label={s.table.head[j]}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {s.list && (
                    <ul className="pd-list">
                      {s.list.map((item, i) => <ListItem key={i} text={item} />)}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="pd-cta-band">
        <div className="container pd-cta-inner">
          <div>
            <h3>Looking for {product.name}?</h3>
            <p>Share your application, size and quantity — our team will respond with the right specification and pricing.</p>
          </div>
          <button className="btn btn-white btn-lg" onClick={() => onOpenQuoteModal(product.name)}>
            Request a Quote <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section pd-related">
          <div className="container">
            <h2 className="pd-related-title">Related Products</h2>
            <div className="pd-related-grid">
              {related.map(p => (
                <button key={p.id} className="card pd-rel-card" onClick={() => onSelectProduct(p)}>
                  <div className="pd-rel-img"><img src={p.image} alt={p.name} loading="lazy" /></div>
                  <div className="pd-rel-body">
                    <span className="pd-category">{p.category}</span>
                    <h3>{p.name}</h3>
                    <p>{p.subtitle}</p>
                    <span className="pd-rel-link">View details <ArrowRight size={14} /></span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky CTA */}
      <div className="pd-mobile-cta">
        <a className="btn btn-secondary" href={`tel:${settings.phone.replace(/\s/g, '')}`}><Phone size={16} /> Call</a>
        <button className="btn btn-primary" onClick={() => onOpenQuoteModal(product.name)}>Request a Quote</button>
      </div>

      <style>{`
        .pd-breadcrumb { background: var(--bg-alt); border-bottom: 1px solid var(--border-light); }
        .pd-breadcrumb .container { display: flex; align-items: center; gap: 8px; padding-top: 12px; padding-bottom: 12px; font-size: 0.85rem; color: var(--text-light); flex-wrap: wrap; }
        .pd-breadcrumb button { background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0; font-weight: 500; }
        .pd-breadcrumb button:hover { color: var(--primary-green); }
        .pd-breadcrumb span { color: var(--text-main); font-weight: 600; }

        .pd-hero { padding: 48px 0 56px; background: linear-gradient(180deg, var(--bg-alt) 0%, #fff 100%); }
        .pd-hero-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 56px; align-items: start; }

        .pd-main-img { position: relative; border-radius: var(--radius-lg); overflow: hidden; background: #eef2f6; aspect-ratio: 4 / 3; box-shadow: var(--shadow-lg); }
        .pd-main-img img { width: 100%; height: 100%; object-fit: contain; }
        .pd-hero-grid > *, .pd-body-grid > * { min-width: 0; }
        .pd-img-badge { position: absolute; top: 16px; left: 16px; background: var(--primary-navy); color: #fff; font-size: 0.75rem; font-weight: 700; padding: 6px 12px; border-radius: var(--radius-full); letter-spacing: 0.3px; }
        .pd-thumbs { display: flex; gap: 12px; margin-top: 14px; flex-wrap: wrap; }
        .pd-thumb { width: 84px; height: 66px; border-radius: var(--radius-sm); overflow: hidden; border: 2px solid transparent; padding: 0; cursor: pointer; background: #eef2f6; opacity: 0.7; transition: var(--transition); }
        .pd-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .pd-thumb.active, .pd-thumb:hover { border-color: var(--primary-green); opacity: 1; }

        .pd-category { display: inline-block; font-size: 0.75rem; font-weight: 700; color: var(--primary-green); text-transform: uppercase; letter-spacing: 0.8px; }
        .pd-title { font-size: 2.5rem; font-weight: 800; margin: 8px 0 12px; letter-spacing: -0.5px; }
        .pd-subtitle { font-size: 1.15rem; color: var(--text-main); font-weight: 500; margin-bottom: 14px; }
        .pd-desc { color: var(--text-muted); font-size: 0.98rem; line-height: 1.75; margin-bottom: 24px; }

        .pd-quick-specs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border-light); border: 1px solid var(--border-light); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 26px; }
        .pd-qs { background: #fff; padding: 14px 16px; display: flex; flex-direction: column; gap: 2px; }
        .pd-qs span { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.6px; color: var(--text-light); font-weight: 600; }
        .pd-qs strong { font-size: 0.95rem; color: var(--text-main); font-weight: 600; }

        .pd-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 26px; }
        .pd-apps-label { display: block; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: var(--text-light); margin-bottom: 10px; }
        .pd-apps-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .pd-app-chip { background: var(--green-bg); color: #166534; border: 1px solid rgba(22, 163, 74, 0.2); font-size: 0.82rem; font-weight: 500; padding: 6px 12px; border-radius: var(--radius-full); }

        .pd-body { padding: 24px 0 72px; }
        .pd-body-grid { display: grid; grid-template-columns: 260px 1fr; gap: 48px; align-items: start; }
        .pd-toc { position: sticky; top: 96px; display: flex; flex-direction: column; gap: 16px; }
        .pd-toc-card { border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 18px; background: #fff; }
        .pd-toc-card h4, .pd-toc-quote h4 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-light); margin-bottom: 10px; }
        .pd-toc-card a { display: block; font-size: 0.88rem; color: var(--text-muted); padding: 7px 0 7px 12px; border-left: 2px solid var(--border-light); }
        .pd-toc-card a:hover { color: var(--primary-green); border-left-color: var(--primary-green); }
        .pd-toc-quote { background: var(--primary-navy); color: #cbd5e1; border-radius: var(--radius-md); padding: 20px; }
        .pd-toc-quote h4 { color: #fff; font-size: 1rem; text-transform: none; letter-spacing: 0; }
        .pd-toc-quote p { font-size: 0.85rem; margin-bottom: 14px; line-height: 1.5; }

        .pd-section { padding: 32px 0; border-bottom: 1px solid var(--border-light); scroll-margin-top: 96px; }
        .pd-section:first-child { padding-top: 8px; }
        .pd-section:last-child { border-bottom: none; }
        .pd-section h2 { font-size: 1.5rem; margin-bottom: 16px; position: relative; padding-left: 16px; }
        .pd-section h2::before { content: ''; position: absolute; left: 0; top: 4px; bottom: 4px; width: 4px; border-radius: 4px; background: var(--primary-green); }
        .pd-section p { color: var(--text-muted); line-height: 1.75; margin-bottom: 14px; }

        .pd-list { list-style: none; display: grid; gap: 12px; }
        .pd-list li { display: flex; gap: 12px; align-items: flex-start; color: var(--text-muted); line-height: 1.65; font-size: 0.96rem; background: var(--bg-alt); border: 1px solid #edf2f7; border-radius: var(--radius-md); padding: 14px 16px; }
        .pd-list strong { color: var(--text-main); }
        .pd-check { color: var(--primary-green); flex-shrink: 0; margin-top: 3px; }

        .pd-table-wrap { border: 1px solid var(--border-light); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 16px; }
        .pd-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
        .pd-table th { background: var(--primary-navy); color: #fff; text-align: left; padding: 12px 16px; font-family: var(--font-heading); font-weight: 600; }
        .pd-table td { padding: 12px 16px; border-top: 1px solid var(--border-light); color: var(--text-muted); vertical-align: top; }
        .pd-table td:first-child { color: var(--text-main); font-weight: 600; }
        .pd-table tbody tr:nth-child(even) td { background: var(--bg-alt); }

        .pd-cta-band { background: linear-gradient(120deg, var(--primary-navy) 0%, var(--navy-light) 100%); padding: 48px 0; }
        .pd-cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .pd-cta-inner h3 { color: #fff; font-size: 1.6rem; margin-bottom: 6px; }
        .pd-cta-inner p { color: #cbd5e1; max-width: 620px; }

        .pd-related-title { font-size: 1.8rem; margin-bottom: 28px; }
        .pd-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .pd-rel-card { text-align: left; cursor: pointer; padding: 0; font: inherit; display: flex; flex-direction: column; }
        .pd-rel-img { height: 190px; overflow: hidden; background: #eef2f6; width: 100%; }
        .pd-rel-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .pd-rel-card:hover .pd-rel-img img { transform: scale(1.06); }
        .pd-rel-body { padding: 18px 20px 20px; }
        .pd-rel-body h3 { font-size: 1.15rem; margin: 6px 0 8px; }
        .pd-rel-body p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.55; margin-bottom: 12px; }
        .pd-rel-link { display: inline-flex; align-items: center; gap: 6px; color: var(--primary-green); font-weight: 700; font-size: 0.85rem; }

        .pd-notfound { text-align: center; padding: 100px 20px; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .pd-mobile-cta { display: none; }

        @media (max-width: 991px) {
          .pd-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; }
          .pd-body-grid { grid-template-columns: minmax(0, 1fr); }
          .pd-toc { display: none; }
          .pd-related-grid { grid-template-columns: repeat(2, 1fr); }
          .pd-title { font-size: 2rem; }
        }
        @media (max-width: 640px) {
          .pd-hero { padding: 24px 0 36px; }
          .pd-title { font-size: 1.65rem; }
          .pd-subtitle { font-size: 1.02rem; }
          .pd-quick-specs { grid-template-columns: 1fr 1fr; }
          .pd-qs { padding: 12px; }
          .pd-ctas .btn { flex: 1 1 100%; }
          .pd-section h2 { font-size: 1.25rem; }
          .pd-list li { padding: 12px; font-size: 0.92rem; }
          .pd-table thead { display: none; }
          .pd-table tr { display: block; border-top: 1px solid var(--border-light); }
          .pd-table tr:first-child { border-top: none; }
          .pd-table td { display: block; border: none; padding: 4px 14px; }
          .pd-table td:first-child { padding-top: 12px; }
          .pd-table td:last-child { padding-bottom: 12px; }
          .pd-table td:not(:first-child)::before { content: attr(data-label) ': '; font-weight: 600; color: var(--text-light); font-size: 0.8rem; }
          .pd-table tbody tr:nth-child(even) td { background: var(--bg-alt); }
          .pd-cta-inner { flex-direction: column; align-items: flex-start; }
          .pd-related-grid { grid-template-columns: 1fr; }
          .pd-mobile-cta { display: flex; gap: 10px; position: fixed; left: 0; right: 0; bottom: 0; z-index: 90; padding: 10px 14px; background: rgba(255,255,255,0.96); backdrop-filter: blur(8px); border-top: 1px solid var(--border-light); }
          .pd-mobile-cta .btn { flex: 1; }
          .pd-root { padding-bottom: 64px; }
        }
      `}</style>
    </div>
  );
}
