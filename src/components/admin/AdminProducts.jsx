import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Save, Layers, CheckCircle, Upload, Archive, ArchiveRestore } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PRODUCT_CATEGORIES } from '../../data/products';

// Resize uploaded photos (max 1200px, JPEG) so they stay small enough to store with the catalogue
function compressImage(file, maxSize = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// Resolves true if the URL loads as an image in the browser
function canLoadImage(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export default function AdminProducts() {
  const { products, saveProduct, deleteProduct, showToast } = useData();
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [brokenImages, setBrokenImages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionsStr, setSectionsStr] = useState('');
  const [appsStr, setAppsStr] = useState('');

  const initialForm = {
    name: '',
    category: PRODUCT_CATEGORIES[0],
    subtitle: '',
    description: '',
    thickness: '23 Micron',
    width: '500 mm',
    elongation: 'Up to 300%',
    coreSize: '76 mm',
    image: '',
    images: [],
    badge: '',
    featured: false,
    applications: ['Pallet wrapping', 'Logistics transit']
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setSectionsStr(JSON.stringify([], null, 2));
    setAppsStr(initialForm.applications.join(', '));
    setIsModalOpen(true);
  };

  const toggleArchive = (prod) => {
    saveProduct({ ...prod, archived: !prod.archived });
    showToast(`Product ${prod.archived ? 'unarchived' : 'archived'} successfully!`, 'success');
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      ...prod,
      applications: prod.applications || ['Pallet wrapping'],
      sections: prod.sections || []
    });
    setSectionsStr(JSON.stringify(prod.sections || [], null, 2));
    setAppsStr((prod.applications || []).join(', '));
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Images: formData.images holds the gallery, formData.image mirrors the first (main) one
  const formImages = formData.images?.length ? formData.images : (formData.image ? [formData.image] : []);

  const setImages = (images) => {
    setFormData(prev => ({ ...prev, images, image: images[0] || '' }));
  };

  const addImageUrl = async () => {
    const url = imageUrlInput.trim();
    if (!url) return;

    if (url.toLowerCase().startsWith('c:\\') || url.toLowerCase().startsWith('file://') || url.indexOf(':\\') === 1) {
      showToast('Local file paths are not allowed. Please use the "Upload images" button instead.', 'error');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/') && !url.startsWith('data:')) {
      showToast('Image URL must be a valid web link (http/https) or an absolute path (/).', 'error');
      return;
    }

    if (!(await canLoadImage(url))) {
      showToast('That link does not open an image. Use a direct image link (ending in .jpg/.png/.webp) or the "Upload images" button.', 'error');
      return;
    }

    setImages([...formImages, url]);
    setImageUrlInput('');
  };

  const removeImage = (index) => setImages(formImages.filter((_, i) => i !== index));

  const makeMainImage = (index) => {
    setImages([formImages[index], ...formImages.filter((_, i) => i !== index)]);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
    e.target.value = '';
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(files.map(f => compressImage(f)));
      setImages([...formImages, ...uploaded]);
    } catch {
      showToast('Could not read one of the images. Please try another file.', 'error');
    }
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formImages.length) {
      showToast('Please add at least one product image.', 'error');
      return;
    }

    let parsedSections = [];
    try {
      parsedSections = JSON.parse(sectionsStr);
    } catch (err) {
      showToast('Invalid JSON format in Sections field.', 'error');
      return;
    }

    const finalData = {
      ...formData,
      applications: appsStr.split(',').map(s => s.trim()).filter(Boolean),
      sections: parsedSections
    };

    if (editingProduct) {
      saveProduct({ ...finalData, id: editingProduct.id });
    } else {
      saveProduct(finalData);
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="admin-products-root">
      <div className="products-mgmt-toolbar">
        <div>
          <h2>Product Catalog Manager</h2>
          <p>Add, update specifications, or remove packaging film products from the public catalog</p>
        </div>

        <div className="toolbar-actions">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input search-input"
            />
          </div>
          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} /> Add New Product
          </button>
        </div>
      </div>

      <div className="products-table-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Thickness</th>
                <th>Elongation</th>
                <th>Badge</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="prod-cell">
                      <img src={p.image} alt={p.name} className="prod-table-thumb" />
                      <div>
                        <strong>{p.name}</strong>
                        <span className="prod-cell-sub">{p.subtitle}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-navy">{p.category}</span>
                  </td>
                  <td>{p.thickness}</td>
                  <td>{p.elongation}</td>
                  <td>
                    {p.badge && <span className="badge badge-green">{p.badge}</span>}
                  </td>
                  <td>
                    {p.archived ? (
                      <span className="badge badge-red" title="Archived">Archived</span>
                    ) : p.featured ? (
                      <span className="featured-tag">★ Featured</span>
                    ) : (
                      <span className="text-muted">Standard</span>
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="btn-action edit"
                        onClick={() => handleOpenEdit(p)}
                        title="Edit Product"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className="btn-action archive"
                        onClick={() => toggleArchive(p)}
                        title={p.archived ? "Unarchive Product" : "Archive Product"}
                      >
                        {p.archived ? <ArchiveRestore size={15} /> : <Archive size={15} />}
                      </button>
                      <button 
                        className="btn-action delete"
                        onClick={() => {
                          if (window.confirm(`Delete "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        title="Delete Product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content product-form-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Packaging Product' : 'Add New Packaging Product'}</h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="form-input" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="form-select"
                  >
                    {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subtitle / Short Summary</label>
                <input 
                  type="text" 
                  name="subtitle" 
                  value={formData.subtitle} 
                  onChange={handleChange} 
                  className="form-input" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description</label>
                <textarea 
                  name="description" 
                  rows="3" 
                  value={formData.description} 
                  onChange={handleChange} 
                  className="form-textarea" 
                />
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Thickness</label>
                  <input 
                    type="text" 
                    name="thickness" 
                    value={formData.thickness} 
                    onChange={handleChange} 
                    className="form-input" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Width</label>
                  <input 
                    type="text" 
                    name="width" 
                    value={formData.width} 
                    onChange={handleChange} 
                    className="form-input" 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Elongation</label>
                  <input 
                    type="text" 
                    name="elongation" 
                    value={formData.elongation} 
                    onChange={handleChange} 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Applications (Comma separated)</label>
                <input 
                  type="text" 
                  value={appsStr} 
                  onChange={(e) => setAppsStr(e.target.value)} 
                  className="form-input" 
                  placeholder="e.g. Pallet wrapping, Logistics transit"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sections / Product Page Content (Advanced JSON)</label>
                <p className="img-help">Define the rich content of the product page (title, text, list, table). Must be valid JSON.</p>
                <textarea 
                  rows="10" 
                  value={sectionsStr} 
                  onChange={(e) => setSectionsStr(e.target.value)} 
                  className="form-textarea" 
                  style={{fontFamily: 'monospace', fontSize: '0.85rem'}}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Badge Label</label>
                  <input 
                    type="text" 
                    name="badge" 
                    placeholder="e.g. High Speed Machine" 
                    value={formData.badge} 
                    onChange={handleChange} 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Product Images</label>
                <p className="img-help">The first image is the main image shown on product cards. Click ★ to make an image the main one.</p>
                <div className="img-grid">
                  {formImages.map((src, i) => (
                    <div key={i} className={`img-tile ${i === 0 ? 'img-main' : ''} ${brokenImages[src] ? 'img-broken' : ''}`}>
                      <img
                        src={src}
                        alt={`Product ${i + 1}`}
                        onError={() => setBrokenImages(prev => ({ ...prev, [src]: true }))}
                      />
                      {brokenImages[src] && <span className="img-broken-tag">Broken – remove</span>}
                      {i === 0 ? (
                        <span className="img-main-tag">Main</span>
                      ) : (
                        <button type="button" className="img-btn img-star" title="Set as main image" onClick={() => makeMainImage(i)}>★</button>
                      )}
                      <button type="button" className="img-btn img-remove" title="Remove image" onClick={() => removeImage(i)}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <label className={`img-upload ${uploading ? 'img-uploading' : ''}`}>
                    <Upload size={22} />
                    <span>{uploading ? 'Uploading…' : 'Upload images'}</span>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} hidden disabled={uploading} />
                  </label>
                </div>
                <div className="img-url-row">
                  <input
                    type="text"
                    placeholder="…or paste an image URL / path (e.g. /images/products/photo.jpg)"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImageUrl(); } }}
                    className="form-input"
                  />
                  <button type="button" className="btn btn-secondary btn-sm" onClick={addImageUrl}>Add</button>
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="featured" 
                    checked={formData.featured} 
                    onChange={handleChange} 
                  />
                  <span>Show as Featured Flagship Product on Home Page</span>
                </label>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .products-mgmt-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .products-mgmt-toolbar h2 {
          font-size: 1.4rem;
          color: #0b1a30;
        }
        .products-mgmt-toolbar p {
          font-size: 0.85rem;
          color: #64748b;
        }

        .products-table-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.86rem;
        }
        .admin-table th {
          text-align: left;
          padding: 14px 16px;
          background: #f8fafc;
          color: #475569;
          font-weight: 700;
          border-bottom: 1px solid var(--border-light);
        }
        .admin-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #edf2f7;
          vertical-align: middle;
        }
        .prod-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .prod-table-thumb {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          border: 1px solid var(--border-light);
        }
        .prod-cell-sub {
          display: block;
          font-size: 0.74rem;
          color: #64748b;
          max-width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .featured-tag {
          color: #d97706;
          font-weight: 700;
          font-size: 0.8rem;
        }
        .table-actions {
          display: flex;
          gap: 8px;
        }
        .btn-action {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .btn-action.edit:hover { background: #eff6ff; color: #2563eb; }
        .btn-action.archive:hover { background: #fef9c3; color: #eab308; }
        .btn-action.delete:hover { background: #fef2f2; color: #dc2626; }
        .badge-red {
          background-color: #fee2e2;
          color: #ef4444;
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .toolbar-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .search-input {
          min-width: 250px;
        }
        .product-form-modal {
          max-width: 700px;
          padding: 28px;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .modal-close-btn {
          background: none;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          cursor: pointer;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          transition: all 0.2s;
        }
        .modal-close-btn:hover {
          color: #ef4444;
          border-color: #ef4444;
          background: #fef2f2;
        }
        .form-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 14px;
        }
        .checkbox-group {
          margin-top: 10px;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          cursor: pointer;
          color: #334155;
        }

        @media (max-width: 768px) {
          .products-mgmt-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .products-mgmt-toolbar .btn {
            width: 100%;
          }
          .products-table-card {
            overflow-x: auto;
          }
          .admin-table {
            min-width: 650px;
          }
          .product-form-modal {
            padding: 20px 16px;
          }
          .form-row-3 {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .modal-footer {
            flex-direction: column-reverse;
            gap: 10px;
          }
          .modal-footer .btn {
            width: 100%;
          }
        }
        .img-help {
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 10px;
        }
        .img-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 10px;
          margin-bottom: 10px;
        }
        .img-tile, .img-upload {
          position: relative;
          aspect-ratio: 1;
          border-radius: 8px;
          overflow: hidden;
        }
        .img-tile {
          border: 2px solid #e2e8f0;
          background: #f8fafc;
        }
        .img-tile.img-main {
          border-color: var(--primary-green);
        }
        .img-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .img-tile.img-broken {
          border-color: #dc2626;
        }
        .img-tile.img-broken img {
          visibility: hidden;
        }
        .img-broken-tag {
          position: absolute;
          inset: auto 6px 30px 6px;
          text-align: center;
          color: #dc2626;
          font-size: 0.72rem;
          font-weight: 700;
        }
        .img-main-tag {
          position: absolute;
          left: 6px;
          bottom: 6px;
          background: var(--primary-green);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
        }
        .img-btn {
          position: absolute;
          top: 6px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: rgba(15, 23, 42, 0.75);
          color: #fff;
          font-size: 0.85rem;
        }
        .img-remove { right: 6px; }
        .img-remove:hover { background: #dc2626; }
        .img-star { left: 6px; }
        .img-star:hover { background: var(--primary-green); }
        .img-upload {
          border: 2px dashed #cbd5e1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #64748b;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .img-upload:hover {
          border-color: var(--primary-green);
          color: var(--primary-green);
          background: #f0fdf4;
        }
        .img-uploading {
          opacity: 0.6;
          pointer-events: none;
        }
        .img-url-row {
          display: flex;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
