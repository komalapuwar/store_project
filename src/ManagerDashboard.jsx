import React, { useState } from 'react';

const initialProducts = [
  { id: 'PRD-001', name: 'Industrial Hydraulic Pump X1', category: 'Machinery', price: 1450, stock: 24, condition: 'Good', notes: 'Inspection passed' },
  { id: 'PRD-002', name: 'Digital Multimeter Pro V2', category: 'Electronics', price: 185, stock: 8, condition: 'Damaged', notes: 'Screen display glitch' },
  { id: 'PRD-003', name: 'Heavy Duty Conveyor Belt 50m', category: 'Logistics', price: 3200, stock: 5, condition: 'Good', notes: 'Certified quality' },
  { id: 'PRD-004', name: 'Pneumatic Control Valve 24V', category: 'Machinery', price: 310, stock: 45, condition: 'Good', notes: 'Calibrated' },
  { id: 'PRD-005', name: 'Stainless Steel Fasteners Set', category: 'Hardware', price: 95, stock: 120, condition: 'Good', notes: 'Full stock' },
  { id: 'PRD-006', name: 'Lithium Ion Battery Pack 48V', category: 'Electronics', price: 890, stock: 3, condition: 'Damaged', notes: 'Casing dented in transport' }
];

const initialInventoryRecords = [
  { id: 'REC-8801', date: '2026-07-27 14:30', product: 'Industrial Hydraulic Pump X1', type: 'Stock In', qty: 10, ref: 'PO-2026-991' },
  { id: 'REC-8802', date: '2026-07-27 11:15', product: 'Digital Multimeter Pro V2', type: 'Damage Report', qty: -2, ref: 'INC-2026-042' },
  { id: 'REC-8803', date: '2026-07-26 16:45', product: 'Pneumatic Control Valve 24V', type: 'Stock Out', qty: -15, ref: 'WO-88410' },
  { id: 'REC-8804', date: '2026-07-25 09:20', product: 'Lithium Ion Battery Pack 48V', type: 'Damage Report', qty: -1, ref: 'AUD-2026-Q3' }
];

export default function ManagerDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('crud'); // 'crud' | 'records' | 'condition' | 'reports'

  // Data States
  const [products, setProducts] = useState(initialProducts);
  const [inventoryRecords, setInventoryRecords] = useState(initialInventoryRecords);

  // Filters
  const [crudSearch, setCrudSearch] = useState('');
  const [crudCategory, setCrudCategory] = useState('All');
  const [recordTypeFilter, setRecordTypeFilter] = useState('All');
  const [conditionFilter, setConditionFilter] = useState('All');

  // Reports state
  const [reportType, setReportType] = useState('inventory');

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Forms
  const [productForm, setProductForm] = useState({
    name: '', category: 'Machinery', price: '', stock: '', condition: 'Good', notes: ''
  });

  const [recordForm, setRecordForm] = useState({
    product: initialProducts[0].name, type: 'Stock In', qty: '', ref: ''
  });

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // CRUD Handlers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({ name: '', category: 'Machinery', price: '', stock: '', condition: 'Good', notes: '' });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (p) => {
    setEditingProduct(p);
    setProductForm({ ...p });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.stock) return;

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? {
        ...productForm,
        id: editingProduct.id,
        price: Number(productForm.price),
        stock: Number(productForm.stock)
      } : p));
      showToast(`Product "${productForm.name}" updated.`);
    } else {
      const newId = `PRD-00${products.length + 1}`;
      setProducts([{
        ...productForm,
        id: newId,
        price: Number(productForm.price),
        stock: Number(productForm.stock)
      }, ...products]);
      showToast(`Product "${productForm.name}" added.`);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    const target = products.find(p => p.id === id);
    if (window.confirm(`Delete product "${target?.name || id}"?`)) {
      setProducts(products.filter(p => p.id !== id));
      showToast(`Product deleted.`);
    }
  };

  // Inventory Record Handler
  const handleSaveRecord = (e) => {
    e.preventDefault();
    if (!recordForm.product || !recordForm.qty) return;

    const qtyNum = Number(recordForm.qty);
    const finalQty = (recordForm.type === 'Stock Out' || recordForm.type === 'Damage Report') ? -Math.abs(qtyNum) : Math.abs(qtyNum);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const recId = `REC-${Math.floor(8000 + Math.random() * 1000)}`;

    setInventoryRecords([{
      id: recId,
      date: now,
      product: recordForm.product,
      type: recordForm.type,
      qty: finalQty,
      ref: recordForm.ref || 'N/A'
    }, ...inventoryRecords]);

    setProducts(products.map(p => p.name === recordForm.product ? {
      ...p, stock: Math.max(0, p.stock + finalQty)
    } : p));

    setIsRecordModalOpen(false);
    showToast(`Inventory Record ${recId} saved.`);
  };

  // Toggle Condition (Good / Damaged)
  const handleToggleCondition = (id) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const nextCond = p.condition === 'Good' ? 'Damaged' : 'Good';
        showToast(`Condition for ${p.name} updated to ${nextCond}`);
        return {
          ...p,
          condition: nextCond,
          notes: nextCond === 'Damaged' ? 'Marked damaged during condition check' : 'Restored to good condition'
        };
      }
      return p;
    }));
  };

  // Filtered Data
  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(crudSearch.toLowerCase()) || p.id.toLowerCase().includes(crudSearch.toLowerCase());
    const matchCat = crudCategory === 'All' || p.category === crudCategory;
    return matchSearch && matchCat;
  });

  const filteredRecords = inventoryRecords.filter(r => recordTypeFilter === 'All' || r.type === recordTypeFilter);
  const filteredConditions = products.filter(p => conditionFilter === 'All' || p.condition === conditionFilter);

  return (
    <div className="dashboard">
      {/* Sidebar matching Admin Dashboard theme */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-circle" style={{ background: '#27ae60' }}>M</div>
          <h2>Manager Panel</h2>
        </div>

        <nav className="menu">
          <button className={activeTab === 'crud' ? 'active' : ''} onClick={() => setActiveTab('crud')}>
            <i className="fa-solid fa-boxes-stacked"></i> Product CRUD
          </button>
          <button className={activeTab === 'records' ? 'active' : ''} onClick={() => setActiveTab('records')}>
            <i className="fa-solid fa-receipt"></i> Inventory Records
          </button>
          <button className={activeTab === 'condition' ? 'active' : ''} onClick={() => setActiveTab('condition')}>
            <i className="fa-solid fa-clipboard-check"></i> Condition Tracking
          </button>
          <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>
            <i className="fa-solid fa-file-invoice"></i> Generate Reports
          </button>

          {onNavigate && (
            <button onClick={() => onNavigate('supplier')}>
              <i className="fa-solid fa-truck-field"></i> Supplier Dashboard
            </button>
          )}
          <button onClick={() => alert('Logout clicked')}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{activeTab === 'crud' ? 'Product CRUD' : activeTab === 'records' ? 'Inventory Records' : activeTab === 'condition' ? 'Condition Tracking (Good / Damaged)' : 'Generate Reports'}</h1>
            <p>Store Manager Operational Panel</p>
          </div>

          <div className="admin-profile">
            <i className="fa-solid fa-user-tie" style={{ color: '#27ae60' }}></i>
            <span>Store Manager</span>
          </div>
        </header>

        {/* Stats */}
        <section className="stats">
          <div className="stat-box">
            <h3>Total Products</h3>
            <p>{products.length}</p>
          </div>
          <div className="stat-box">
            <h3>Good Condition</h3>
            <p style={{ color: '#27ae60' }}>{products.filter(p => p.condition === 'Good').length}</p>
          </div>
          <div className="stat-box">
            <h3>Damaged Condition</h3>
            <p style={{ color: '#e74c3c' }}>{products.filter(p => p.condition === 'Damaged').length}</p>
          </div>
          <div className="stat-box">
            <h3>Inventory Logs</h3>
            <p>{inventoryRecords.length}</p>
          </div>
        </section>

        {/* TAB 1: PRODUCT CRUD */}
        {activeTab === 'crud' && (
          <section className="section-container">
            <div className="section-header">
              <h2><i className="fa-solid fa-boxes-stacked" style={{ color: '#27ae60' }}></i> Product CRUD</h2>
              <div className="controls-bar">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search products..."
                  value={crudSearch}
                  onChange={(e) => setCrudSearch(e.target.value)}
                />
                <select className="select-input" value={crudCategory} onChange={(e) => setCrudCategory(e.target.value)}>
                  <option value="All">All Categories</option>
                  <option value="Machinery">Machinery</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Hardware">Hardware</option>
                </select>
                <button className="btn btn-success" onClick={handleOpenAddProduct}>
                  <i className="fa-solid fa-plus"></i> Add Product
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price ($)</th>
                    <th>Stock Qty</th>
                    <th>Condition</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id}>
                      <td><strong>{p.id}</strong></td>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.category}</td>
                      <td>${p.price.toFixed(2)}</td>
                      <td>{p.stock} units</td>
                      <td>
                        <span className={`badge ${p.condition === 'Good' ? 'badge-good' : 'badge-damaged'}`}>
                          {p.condition}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-primary btn-sm" onClick={() => handleOpenEditProduct(p)} style={{ marginRight: '6px' }}>
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(p.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 2: INVENTORY RECORDS */}
        {activeTab === 'records' && (
          <section className="section-container">
            <div className="section-header">
              <h2><i className="fa-solid fa-receipt" style={{ color: '#3498db' }}></i> Inventory Records</h2>
              <div className="controls-bar">
                <select className="select-input" value={recordTypeFilter} onChange={(e) => setRecordTypeFilter(e.target.value)}>
                  <option value="All">All Log Types</option>
                  <option value="Stock In">Stock In</option>
                  <option value="Stock Out">Stock Out</option>
                  <option value="Damage Report">Damage Report</option>
                </select>
                <button className="btn btn-primary" onClick={() => setIsRecordModalOpen(true)}>
                  <i className="fa-solid fa-plus-circle"></i> Add Record
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Record ID</th>
                    <th>Date & Time</th>
                    <th>Product</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map(r => (
                    <tr key={r.id}>
                      <td><strong>{r.id}</strong></td>
                      <td>{r.date}</td>
                      <td>{r.product}</td>
                      <td>
                        <span className={`badge ${r.type === 'Stock In' ? 'badge-good' : 'badge-damaged'}`}>
                          {r.type}
                        </span>
                      </td>
                      <td><strong>{r.qty > 0 ? `+${r.qty}` : r.qty}</strong></td>
                      <td><code>{r.ref}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 3: CONDITION TRACKING (Good / Damaged) */}
        {activeTab === 'condition' && (
          <section className="section-container">
            <div className="section-header">
              <h2><i className="fa-solid fa-clipboard-check" style={{ color: '#f39c12' }}></i> Condition Tracking (Good / Damaged)</h2>
              <div className="controls-bar">
                <select className="select-input" value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)}>
                  <option value="All">All Conditions</option>
                  <option value="Good">Good</option>
                  <option value="Damaged">Damaged</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Stock</th>
                    <th>Condition State</th>
                    <th>Condition Details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConditions.map(p => (
                    <tr key={p.id}>
                      <td><strong>{p.id}</strong></td>
                      <td>{p.name}</td>
                      <td>{p.stock} units</td>
                      <td>
                        <span className={`badge ${p.condition === 'Good' ? 'badge-good' : 'badge-damaged'}`}>
                          {p.condition}
                        </span>
                      </td>
                      <td>{p.notes || 'No issues reported'}</td>
                      <td>
                        <button className="btn btn-warning btn-sm" onClick={() => handleToggleCondition(p.id)}>
                          <i className="fa-solid fa-sync"></i> Toggle State
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 4: GENERATE REPORTS */}
        {activeTab === 'reports' && (
          <section className="section-container">
            <div className="section-header">
              <h2><i className="fa-solid fa-file-invoice" style={{ color: '#9b59b6' }}></i> Generate Reports</h2>
            </div>

            <div className="form-grid" style={{ marginBottom: '20px' }}>
              <div className="form-group">
                <label>Select Report Type</label>
                <select className="select-input" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                  <option value="inventory">Product Inventory Summary</option>
                  <option value="damaged">Damaged Products Report</option>
                  <option value="logs">Inventory Movement Log</option>
                </select>
              </div>
            </div>

            <div className="form-actions" style={{ justifyContent: 'flex-start', marginBottom: '25px' }}>
              <button className="btn btn-success" onClick={() => window.print()}>
                <i className="fa-solid fa-print"></i> Print / Export Report
              </button>
            </div>

            <div style={{ borderTop: '2px dashed #cbd5e1', paddingTop: '20px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>
                {reportType === 'inventory' ? 'Product Inventory Summary Report' : reportType === 'damaged' ? 'Damaged Products Inspection Report' : 'Inventory Movement Log Report'}
              </h3>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      <th>Category / Details</th>
                      <th>Price / Qty</th>
                      <th>Condition / Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportType === 'inventory' && products.map(p => (
                      <tr key={p.id}>
                        <td><strong>{p.id}</strong></td>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>${p.price.toFixed(2)} ({p.stock} pcs)</td>
                        <td><span className={`badge ${p.condition === 'Good' ? 'badge-good' : 'badge-damaged'}`}>{p.condition}</span></td>
                      </tr>
                    ))}
                    {reportType === 'damaged' && products.filter(p => p.condition === 'Damaged').map(p => (
                      <tr key={p.id}>
                        <td><strong>{p.id}</strong></td>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>${p.price.toFixed(2)} ({p.stock} pcs)</td>
                        <td><span className="badge badge-damaged">Damaged</span></td>
                      </tr>
                    ))}
                    {reportType === 'logs' && inventoryRecords.map(r => (
                      <tr key={r.id}>
                        <td><strong>{r.id}</strong></td>
                        <td>{r.product}</td>
                        <td>{r.date}</td>
                        <td>{r.qty > 0 ? `+${r.qty}` : r.qty}</td>
                        <td><span className="badge badge-good">{r.type}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* MODAL: PRODUCT */}
      {isProductModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="modal-close" onClick={() => setIsProductModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSaveProduct}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Product Name</label>
                  <input type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}>
                    <option value="Machinery">Machinery</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Hardware">Hardware</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input type="number" step="0.01" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Stock Qty</label>
                  <input type="number" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Condition State</label>
                  <select value={productForm.condition} onChange={(e) => setProductForm({ ...productForm, condition: e.target.value })}>
                    <option value="Good">Good</option>
                    <option value="Damaged">Damaged</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Condition Notes</label>
                  <textarea rows="2" value={productForm.notes} onChange={(e) => setProductForm({ ...productForm, notes: e.target.value })}></textarea>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsProductModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-success"><i className="fa-solid fa-save"></i> Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RECORD */}
      {isRecordModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Add Inventory Record</h3>
              <button className="modal-close" onClick={() => setIsRecordModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSaveRecord}>
              <div className="form-group">
                <label>Product</label>
                <select value={recordForm.product} onChange={(e) => setRecordForm({ ...recordForm, product: e.target.value })}>
                  {products.map(p => <option key={p.id} value={p.name}>{p.name} (Stock: {p.stock})</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Record Type</label>
                <select value={recordForm.type} onChange={(e) => setRecordForm({ ...recordForm, type: e.target.value })}>
                  <option value="Stock In">Stock In (+)</option>
                  <option value="Stock Out">Stock Out (-)</option>
                  <option value="Damage Report">Damage Report (-)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input type="number" value={recordForm.qty} onChange={(e) => setRecordForm({ ...recordForm, qty: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Reference PO / WO</label>
                <input type="text" value={recordForm.ref} onChange={(e) => setRecordForm({ ...recordForm, ref: e.target.value })} />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsRecordModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><i className="fa-solid fa-plus-circle"></i> Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="toast-msg">
          <i className="fa-solid fa-circle-check" style={{ color: '#27ae60', fontSize: '18px' }}></i>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
