import React, { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, X, Save, Layers, CheckCircle, Upload, Video, Archive, ArchiveRestore, ChevronUp, ChevronDown, GripVertical, Trash, Type, List, Table, Move, Eye, EyeOff, RefreshCw, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { PRODUCT_CATEGORIES, PRODUCTS as DEFAULT_PRODUCTS } from '../../data/products';
import { uploadImage, canLoadImage } from '../../utils/images';
import { uploadVideo, isVideo } from '../../utils/media';
import Media from '../common/Media';

// ───────────────────────── Sections Editor ─────────────────────────
function SectionsEditor({ sections, onChange }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Auto-detect section type from content structure
  const getSectionType = (section) => {
    if (section.type) return section.type;
    const content = getSectionContent(section);
    if (content && typeof content === 'object') {
      if (content.head && content.rows) return 'table';
      if (Array.isArray(content)) return 'list';
    }
    return 'text';
  };

  // Get content from section regardless of structure (table/list/text at root or in content)
  const getSectionContent = (section) => {
    if (section.content !== undefined) return section.content;
    if (section.table) return section.table;
    if (section.list) return section.list;
    if (section.text) return section.text;
    return [];
  };

  // Set content on section, normalizing to use 'content' property
  const setSectionContent = (section, content) => {
    return { ...section, content, table: undefined, list: undefined, text: undefined };
  };

  const addSection = (type = 'text') => {
    const newSection = {
      title: '',
      type,
      content: type === 'text' ? [''] : type === 'list' ? [''] : { head: ['Column 1', 'Column 2'], rows: [['', '']] }
    };
    onChange([...sections, newSection]);
    setExpandedIndex(sections.length);
  };

  const removeSection = (index) => {
    onChange(sections.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(null);
    else if (expandedIndex > index) setExpandedIndex(expandedIndex - 1);
  };

  const moveSection = (fromIndex, toIndex) => {
    const newSections = [...sections];
    const [moved] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, moved);
    onChange(newSections);
    if (expandedIndex === fromIndex) setExpandedIndex(toIndex);
    else if (expandedIndex === toIndex) setExpandedIndex(fromIndex);
    else if (expandedIndex > fromIndex && expandedIndex <= toIndex) setExpandedIndex(expandedIndex - 1);
    else if (expandedIndex < fromIndex && expandedIndex >= toIndex) setExpandedIndex(expandedIndex + 1);
  };

  const updateSection = (index, updates) => {
    onChange(sections.map((s, i) => i === index ? setSectionContent(s, { ...getSectionContent(s), ...updates }) : s));
  };

  const updateContent = (sectionIndex, content) => {
    onChange(sections.map((s, i) => i === sectionIndex ? setSectionContent(s, content) : s));
  };

  // Text content handlers
  const updateTextItem = (sectionIndex, itemIndex, value) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    const newContent = [...content];
    newContent[itemIndex] = value;
    updateContent(sectionIndex, newContent);
  };

  const addTextItem = (sectionIndex) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    updateContent(sectionIndex, [...content, '']);
  };

  const removeTextItem = (sectionIndex, itemIndex) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    updateContent(sectionIndex, content.filter((_, i) => i !== itemIndex));
  };

  // List content handlers
  const updateListItem = (sectionIndex, itemIndex, value) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    const newContent = [...content];
    newContent[itemIndex] = value;
    updateContent(sectionIndex, newContent);
  };

  const addListItem = (sectionIndex) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    updateContent(sectionIndex, [...content, '']);
  };

  const removeListItem = (sectionIndex, itemIndex) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    updateContent(sectionIndex, content.filter((_, i) => i !== itemIndex));
  };

  // Table content handlers
  const updateTableCell = (sectionIndex, rowIndex, colIndex, value) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    const newContent = { ...content };
    newContent.rows = newContent.rows.map((row, r) =>
      r === rowIndex ? row.map((cell, c) => c === colIndex ? value : cell) : row
    );
    // Ensure head array matches row length
    if (newContent.rows.length && newContent.rows[0].length > newContent.head.length) {
      newContent.head = [...newContent.head, `Column ${newContent.head.length + 1}`];
    }
    updateContent(sectionIndex, newContent);
  };

  const updateTableHead = (sectionIndex, colIndex, value) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    const newContent = { ...content };
    newContent.head = newContent.head.map((h, i) => i === colIndex ? value : h);
    updateContent(sectionIndex, newContent);
  };

  const addTableRow = (sectionIndex) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    const newContent = { ...content };
    newContent.rows = [...newContent.rows, new Array(newContent.head.length).fill('')];
    updateContent(sectionIndex, newContent);
  };

  const removeTableRow = (sectionIndex, rowIndex) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    const newContent = { ...content };
    newContent.rows = newContent.rows.filter((_, i) => i !== rowIndex);
    updateContent(sectionIndex, newContent);
  };

  const addTableColumn = (sectionIndex) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    const newContent = { ...content };
    newContent.head = [...newContent.head, `Column ${newContent.head.length + 1}`];
    newContent.rows = newContent.rows.map(row => [...row, '']);
    updateContent(sectionIndex, newContent);
  };

  const removeTableColumn = (sectionIndex, colIndex) => {
    const section = sections[sectionIndex];
    const content = getSectionContent(section);
    const newContent = { ...content };
    newContent.head = newContent.head.filter((_, i) => i !== colIndex);
    newContent.rows = newContent.rows.map(row => row.filter((_, i) => i !== colIndex));
    updateContent(sectionIndex, newContent);
  };

  const typeLabels = { text: 'Text Paragraphs', list: 'Bullet List', table: 'Data Table' };
  const typeIcons = { text: Type, list: List, table: Table };

  const renderIcon = (type) => {
    const Icon = typeIcons[type];
    return <Icon size={14} />;
  };

  return (
    <div className="sections-editor">
      {sections.length === 0 && (
        <div className="sections-empty">
          <p>No sections added yet. Click a button below to add content to the product page.</p>
          <div className="sections-add-buttons">
            {['text', 'list', 'table'].map(type => (
              <button
                key={type}
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => addSection(type)}
              >
                {renderIcon(type)} Add {typeLabels[type]}
              </button>
            ))}
          </div>
        </div>
      )}

      {sections.map((section, index) => (
        <div key={index} className="section-card">
          <div className="section-card-header">
            <button
              type="button"
              className="section-drag-handle"
              onMouseDown={(e) => {
                e.preventDefault();
                // Simple drag to reorder - click up/down buttons instead
              }}
              title="Drag to reorder"
            >
              <GripVertical size={16} />
            </button>
            <div className="section-title-input">
              <input
                type="text"
                placeholder="Section Title (e.g. Technical Specifications)"
                value={section.title}
                onChange={(e) => updateSection(index, { title: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="section-type-badge">{typeLabels[getSectionType(section)] || getSectionType(section)}</div>
            <div className="section-actions">
              <button
                type="button"
                className="btn-icon"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                title={expandedIndex === index ? 'Collapse' : 'Expand'}
              >
                {expandedIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <button
                type="button"
                className="btn-icon"
                onClick={() => moveSection(index, index - 1)}
                disabled={index === 0}
                title="Move Up"
              >
                <ChevronUp size={14} />
              </button>
              <button
                type="button"
                className="btn-icon"
                onClick={() => moveSection(index, index + 1)}
                disabled={index === sections.length - 1}
                title="Move Down"
              >
                <ChevronDown size={14} />
              </button>
              <button
                type="button"
                className="btn-icon danger"
                onClick={() => removeSection(index)}
                title="Delete Section"
              >
                <Trash size={14} />
              </button>
            </div>
          </div>

          {expandedIndex === index && (
            <div className="section-card-body">
              {getSectionType(section) === 'text' && (
                <div className="section-content-editor">
                  <div className="content-items">
                    {getSectionContent(section).map((item, itemIndex) => (
                      <div key={itemIndex} className="content-item">
                        <textarea
                          placeholder="Enter paragraph text..."
                          value={item}
                          onChange={(e) => updateTextItem(index, itemIndex, e.target.value)}
                          rows={3}
                          className="form-textarea"
                        />
                        <div className="item-actions">
                          <button type="button" className="btn-icon" onClick={() => removeTextItem(index, itemIndex)} title="Remove">
                            <Trash size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => addTextItem(index)}>
                    <Plus size={14} /> Add Paragraph
                  </button>
                </div>
              )}

              {getSectionType(section) === 'list' && (
                <div className="section-content-editor">
                  <div className="content-items">
                    {getSectionContent(section).map((item, itemIndex) => (
                      <div key={itemIndex} className="content-item">
                        <input
                          type="text"
                          placeholder="Enter list item (e.g. 'High Tensile Strength: 30+ MPa')"
                          value={item}
                          onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                          className="form-input"
                        />
                        <div className="item-actions">
                          <button type="button" className="btn-icon" onClick={() => removeListItem(index, itemIndex)} title="Remove">
                            <Trash size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => addListItem(index)}>
                    <Plus size={14} /> Add List Item
                  </button>
                  <p className="img-help">Tip: Use format "Label: description" for bold label styling on the website.</p>
                </div>
              )}

              {getSectionType(section) === 'table' && (
                <div className="section-content-editor">
                  <div className="table-editor">
                    <div className="table-head-row">
                      {getSectionContent(section).head.map((head, colIndex) => (
                        <div key={colIndex} className="table-cell-wrapper">
                          <input
                            type="text"
                            value={head}
                            onChange={(e) => updateTableHead(index, colIndex, e.target.value)}
                            className="form-input table-head-input"
                            placeholder={`Column ${colIndex + 1}`}
                          />
                          {getSectionContent(section).head.length > 1 && (
                            <button type="button" className="btn-icon danger" onClick={() => removeTableColumn(index, colIndex)} title="Remove Column">
                              <Trash size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button type="button" className="btn btn-secondary btn-sm table-add-col" onClick={() => addTableColumn(index)}>
                        <Plus size={14} /> Add Column
                      </button>
                    </div>
                    <div className="table-rows">
                      {getSectionContent(section).rows.map((row, rowIndex) => (
                        <div key={rowIndex} className="table-row">
                          {row.map((cell, colIndex) => (
                            <div key={colIndex} className="table-cell-wrapper">
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) => updateTableCell(index, rowIndex, colIndex, e.target.value)}
                                className="form-input table-cell-input"
                                placeholder={`Row ${rowIndex + 1}, Col ${colIndex + 1}`}
                              />
                            </div>
                          ))}
                          <div className="table-row-actions">
                            <button type="button" className="btn-icon" onClick={() => removeTableRow(index, rowIndex)} title="Remove Row">
                              <Trash size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => addTableRow(index)}>
                      <Plus size={14} /> Add Row
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {sections.length > 0 && (
        <div className="sections-add-more">
          <span>Add another section:</span>
          <div className="sections-add-buttons">
            {['text', 'list', 'table'].map(type => (
              <button
                key={`add-${type}`}
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => addSection(type)}
              >
                {renderIcon(type)} {typeLabels[type]}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .sections-editor {
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          background: #fafafa;
          padding: 16px;
        }
        .sections-empty {
          text-align: center;
          padding: 32px;
          color: #64748b;
        }
        .sections-add-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .section-card {
          background: #fff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          margin-bottom: 12px;
          overflow: hidden;
        }
        .section-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #f8fafc;
          border-bottom: 1px solid var(--border-light);
        }
        .section-drag-handle {
          color: #94a3b8;
          cursor: grab;
          padding: 4px;
          background: none;
          border: none;
        }
        .section-drag-handle:hover {
          color: var(--primary-green);
        }
        .section-title-input {
          flex: 1;
          min-width: 200px;
        }
        .section-type-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--green-bg);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }
        .section-actions {
          display: flex;
          gap: 4px;
        }
        .btn-icon {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s;
        }
        .btn-icon:hover:not(:disabled) {
          background: #f1f5f9;
          color: var(--primary-green);
        }
        .btn-icon:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .btn-icon.danger:hover {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fecaca;
        }
        .section-card-body {
          padding: 16px;
          animation: slideDown 0.2s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .content-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .content-item {
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }
        .content-item textarea,
        .content-item input {
          flex: 1;
        }
        .item-actions {
          flex-shrink: 0;
          margin-top: 4px;
        }
        .table-editor {
          overflow-x: auto;
        }
        .table-head-row {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
          align-items: flex-end;
        }
        .table-cell-wrapper {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 150px;
        }
        .table-head-input {
          font-weight: 600;
          background: #f0fdf4;
        }
        .table-add-col {
          height: 38px;
        }
        .table-rows {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .table-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: flex-end;
        }
        .table-cell-input {
          min-width: 150px;
        }
        .table-row-actions {
          display: flex;
          align-items: flex-end;
          height: 38px;
        }
        .sections-add-more {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px dashed var(--border-light);
          flex-wrap: wrap;
        }
        .sections-add-more span {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

export default function AdminProducts() {
  const { products, saveProduct, deleteProduct, replaceAllProducts, showToast } = useData();
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [brokenImages, setBrokenImages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    applications: ['Pallet wrapping', 'Logistics transit'],
    sections: []
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setAppsStr(initialForm.applications.join(', '));
    setIsModalOpen(true);
  };

  const toggleArchive = (prod) => {
    saveProduct({ ...prod, archived: !prod.archived });
    showToast(`Product ${prod.archived ? 'unarchived' : 'archived'} successfully!`, 'success');
  };

  const resetToDefaults = () => {
    if (window.confirm('This will replace ALL products with the default catalog (21 products with full tables). This cannot be undone. Continue?')) {
      replaceAllProducts(DEFAULT_PRODUCTS);
    }
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      ...prod,
      applications: prod.applications || ['Pallet wrapping'],
      sections: prod.sections || []
    });
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

        if (!isVideo(url) && !(await canLoadImage(url))) {
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

    const handleVideoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    setUploading(true);
    try {
      const results = [];
      for (const file of files) results.push(await uploadVideo(file));
      setImages([...formImages, ...results.map(r => r.url)]);
      if (results.some(r => r.localOnly)) {
        showToast('Video added. Note: without the website server running, it is saved in this browser only — other visitors will not see it.', 'info');
      }
    } catch (err) {
      showToast(err.message || 'Could not upload that video.', 'error');
    }
    setUploading(false);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
    e.target.value = '';
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(files.map(f => uploadImage(f)));
      setImages([...formImages, ...uploaded]);
    } catch (err) {
      showToast(err?.message ? 'Upload failed: ' + err.message : 'Could not read one of the images. Please try another file.', 'error');
    }
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formImages.length) {
      showToast('Please add at least one product image.', 'error');
      return;
    }

    const finalData = {
      ...formData,
      applications: appsStr.split(',').map(s => s.trim()).filter(Boolean),
      sections: formData.sections || []
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
    (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.thickness && p.thickness.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.width && p.width.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.coreSize && p.coreSize.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.elongation && p.elongation.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.badge && p.badge.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.applications && p.applications.some(app => app.toLowerCase().includes(searchQuery.toLowerCase())))
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
          <button className="btn btn-secondary" onClick={resetToDefaults} title="Reset to default catalog with all tables">
            <RefreshCw size={16} /> Reset to Defaults
          </button>
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
                <th>Width</th>
                <th>Core Size</th>
                <th>Elongation</th>
                <th>Badge</th>
                <th>Featured</th>
                <th>Applications</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="prod-cell">
                      <Media src={p.image} alt={p.name} className="prod-table-thumb" />
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
                  <td>{p.width}</td>
                  <td>{p.coreSize}</td>
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
                    <span className="prod-cell-sub" style={{maxWidth: '200px'}}>
                      {p.applications?.slice(0, 3).join(', ')}
                      {p.applications && p.applications.length > 3 && '...'}
                    </span>
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
                <label className="form-label">Sections / Product Page Content</label>
                <p className="img-help">Add rich content sections (text, lists, tables) that appear on the product detail page. Drag to reorder.</p>
                <SectionsEditor
                  sections={formData.sections || []}
                  onChange={(sections) => setFormData(prev => ({ ...prev, sections }))}
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
                <p className="img-help">The first item is the main image shown on product cards (images or videos). Click ★ to make an image the main one.</p>
                <div className="img-grid">
                  {formImages.map((src, i) => (
                    <div key={i} className={`img-tile ${i === 0 ? 'img-main' : ''} ${brokenImages[src] ? 'img-broken' : ''}`}>
                                            <Media
                        src={src}
                        alt={`Product ${i + 1}`}
                        onError={() => setBrokenImages(prev => ({ ...prev, [src]: true }))}
                      />
                      {isVideo(src) && <span className="img-video-tag">Video</span>}
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
                  <label className={`img-upload ${uploading ? 'img-uploading' : ''}`}>
                    <Video size={22} />
                    <span>{uploading ? 'Uploading…' : 'Upload video'}</span>
                    <input type="file" accept="video/*" multiple onChange={handleVideoUpload} hidden disabled={uploading} />
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
                .img-tile video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .img-video-tag {
          position: absolute;
          right: 6px;
          bottom: 6px;
          background: rgba(15, 23, 42, 0.8);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 999px;
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
