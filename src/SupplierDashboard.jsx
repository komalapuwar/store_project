import React, { useState } from 'react';

const initialRestockRequests = [
  { id: 'REQ-1092', productName: 'Industrial Hydraulic Pump X1', qty: 15, requiredDate: '2026-08-05', priority: 'High', status: 'Pending', notes: 'Urgent stock depletion in Warehouse A.' },
  { id: 'REQ-1093', productName: 'Digital Multimeter Pro V2', qty: 20, requiredDate: '2026-08-10', priority: 'Medium', status: 'Pending', notes: 'Replacing defective unit batch.' },
  { id: 'REQ-1088', productName: 'Pneumatic Control Valve 24V', qty: 50, requiredDate: '2026-07-30', priority: 'Low', status: 'Accepted', notes: 'Monthly scheduled order.' },
  { id: 'REQ-1085', productName: 'Lithium Ion Battery Pack 48V', qty: 10, requiredDate: '2026-07-28', priority: 'High', status: 'Rejected', notes: 'Raw material shortage from supplier.' }
];

const initialSubmittedSupplies = [
  { id: 'SUP-7701', productName: 'Pneumatic Control Valve 24V', qty: 50, estDelivery: '2026-07-30', trackingNo: 'TRK-98214-X', carrier: 'Swift Express Logistics', status: 'Dispatched' },
  { id: 'SUP-7690', productName: 'Stainless Steel Fasteners Set', qty: 200, estDelivery: '2026-07-25', trackingNo: 'TRK-88120-A', carrier: 'Global Freight Cargo', status: 'Delivered' }
];

export default function SupplierDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' | 'submit'

  const [requests, setRequests] = useState(initialRestockRequests);
  const [submittedSupplies, setSubmittedSupplies] = useState(initialSubmittedSupplies);
  const [statusFilter, setStatusFilter] = useState('All');

  const [supplyForm, setSupplyForm] = useState({
    productName: '', qty: '', estDelivery: '', trackingNo: '', carrier: 'Swift Express Logistics', reqRef: '', notes: ''
  });

  const [rejectingReq, setRejectingReq] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAcceptRequest = (req) => {
    setRequests(requests.map(r => r.id === req.id ? { ...r, status: 'Accepted' } : r));
    showToast(`Request ${req.id} ACCEPTED! Pre-filling supply form...`);

    setSupplyForm({
      productName: req.productName,
      qty: req.qty,
      estDelivery: req.requiredDate,
      trackingNo: `TRK-${Math.floor(10000 + Math.random() * 90000)}-X`,
      carrier: 'Swift Express Logistics',
      reqRef: req.id,
      notes: `Fulfilling request ${req.id}`
    });

    setActiveTab('submit');
  };

  const handleConfirmRejection = (e) => {
    e.preventDefault();
    if (!rejectingReq) return;

    setRequests(requests.map(r => r.id === rejectingReq.id ? {
      ...r, status: 'Rejected', notes: `Rejected: ${rejectionReason}`
    } : r));

    showToast(`Request ${rejectingReq.id} REJECTED.`);
    setRejectingReq(null);
  };

  const handleSubmitSupply = (e) => {
    e.preventDefault();
    if (!supplyForm.productName || !supplyForm.qty || !supplyForm.estDelivery || !supplyForm.trackingNo) return;

    const newSupply = {
      id: `SUP-${Math.floor(7000 + Math.random() * 1000)}`,
      productName: supplyForm.productName,
      qty: Number(supplyForm.qty),
      estDelivery: supplyForm.estDelivery,
      trackingNo: supplyForm.trackingNo,
      carrier: supplyForm.carrier,
      status: 'Dispatched'
    };

    setSubmittedSupplies([newSupply, ...submittedSupplies]);
    showToast(`Supply details submitted! Tracking: ${supplyForm.trackingNo}`);

    setSupplyForm({
      productName: '', qty: '', estDelivery: '', trackingNo: '', carrier: 'Swift Express Logistics', reqRef: '', notes: ''
    });
  };

  const filteredRequests = requests.filter(r => statusFilter === 'All' || r.status === statusFilter);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-circle" style={{ background: '#9b59b6' }}>S</div>
          <h2>Supplier Panel</h2>
        </div>

        <nav className="menu">
          <button className={activeTab === 'requests' ? 'active' : ''} onClick={() => setActiveTab('requests')}>
            <i className="fa-solid fa-clipboard-list"></i> View Restock Requests
          </button>
          <button className={activeTab === 'submit' ? 'active' : ''} onClick={() => setActiveTab('submit')}>
            <i className="fa-solid fa-truck-ramp-box"></i> Submit Supply Details
          </button>

          {onNavigate && (
            <button onClick={() => onNavigate('manager')}>
              <i className="fa-solid fa-user-tie"></i> Manager Dashboard
            </button>
          )}
          <button onClick={() => alert('Logout clicked')}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{activeTab === 'requests' ? 'View Restock Requests' : 'Submit Supply Details'}</h1>
            <p>Supplier Fulfillment Operational Panel</p>
          </div>

          <div className="admin-profile">
            <i className="fa-solid fa-truck-field" style={{ color: '#9b59b6' }}></i>
            <span>Apex Hydraulics & Electronics</span>
          </div>
        </header>

        <section className="stats">
          <div className="stat-box">
            <h3>Total Requests</h3>
            <p>{requests.length}</p>
          </div>
          <div className="stat-box">
            <h3>Pending Requests</h3>
            <p style={{ color: '#f39c12' }}>{requests.filter(r => r.status === 'Pending').length}</p>
          </div>
          <div className="stat-box">
            <h3>Accepted Requests</h3>
            <p style={{ color: '#27ae60' }}>{requests.filter(r => r.status === 'Accepted').length}</p>
          </div>
          <div className="stat-box">
            <h3>Submitted Supplies</h3>
            <p style={{ color: '#3498db' }}>{submittedSupplies.length}</p>
          </div>
        </section>

        {activeTab === 'requests' && (
          <section className="section-container">
            <div className="section-header">
              <h2><i className="fa-solid fa-clipboard-list" style={{ color: '#f39c12' }}></i> View Restock Requests</h2>
              <div className="controls-bar">
                <select className="select-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Req ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Required Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map(r => (
                    <tr key={r.id}>
                      <td><strong>{r.id}</strong></td>
                      <td>{r.productName}</td>
                      <td><strong>{r.qty} units</strong></td>
                      <td>{r.requiredDate}</td>
                      <td>
                        <span style={{ color: r.priority === 'High' ? '#e74c3c' : r.priority === 'Medium' ? '#f39c12' : '#27ae60', fontWeight: 600 }}>
                          {r.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${r.status === 'Accepted' ? 'badge-good' : r.status === 'Rejected' ? 'badge-damaged' : 'badge-pending'}`}>
                          {r.status}
                        </span>
                      </td>
                      <td>{r.notes || 'N/A'}</td>
                      <td>
                        {r.status === 'Pending' ? (
                          <>
                            <button className="btn btn-success btn-sm" onClick={() => handleAcceptRequest(r)} style={{ marginRight: '6px' }}>
                              <i className="fa-solid fa-check"></i> Accept
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => setRejectingReq(r)}>
                              <i className="fa-solid fa-times"></i> Reject
                            </button>
                          </>
                        ) : (
                          <span style={{ color: '#777', fontSize: '13px' }}><i className="fa-solid fa-lock"></i> Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'submit' && (
          <section className="section-container">
            <div className="section-header">
              <h2><i className="fa-solid fa-truck-ramp-box" style={{ color: '#9b59b6' }}></i> Submit Supply Details</h2>
            </div>

            <form onSubmit={handleSubmitSupply} style={{ marginBottom: '30px' }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={supplyForm.productName}
                    onChange={(e) => setSupplyForm({ ...supplyForm, productName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Supply Quantity</label>
                  <input
                    type="number"
                    value={supplyForm.qty}
                    onChange={(e) => setSupplyForm({ ...supplyForm, qty: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Estimated Delivery Date</label>
                  <input
                    type="date"
                    value={supplyForm.estDelivery}
                    onChange={(e) => setSupplyForm({ ...supplyForm, estDelivery: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tracking Number</label>
                  <input
                    type="text"
                    value={supplyForm.trackingNo}
                    onChange={(e) => setSupplyForm({ ...supplyForm, trackingNo: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Logistics Carrier</label>
                  <select className="select-input" value={supplyForm.carrier} onChange={(e) => setSupplyForm({ ...supplyForm, carrier: e.target.value })}>
                    <option value="Swift Express Logistics">Swift Express Logistics</option>
                    <option value="Global Freight Cargo">Global Freight Cargo</option>
                    <option value="FastTrack Supply Line">FastTrack Supply Line</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Request Ref (Optional)</label>
                  <input
                    type="text"
                    value={supplyForm.reqRef}
                    onChange={(e) => setSupplyForm({ ...supplyForm, reqRef: e.target.value })}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Supply Notes</label>
                  <textarea
                    rows="2"
                    value={supplyForm.notes}
                    onChange={(e) => setSupplyForm({ ...supplyForm, notes: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <div className="form-actions" style={{ justifyContent: 'flex-start' }}>
                <button type="submit" className="btn btn-success" style={{ padding: '12px 30px' }}>
                  <i className="fa-solid fa-paper-plane"></i> Submit Supply Details
                </button>
              </div>
            </form>

            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Submitted Supply History</h3>
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Supply ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Est Delivery</th>
                    <th>Tracking No</th>
                    <th>Carrier</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedSupplies.map(s => (
                    <tr key={s.id}>
                      <td><strong>{s.id}</strong></td>
                      <td>{s.productName}</td>
                      <td><strong>{s.qty} units</strong></td>
                      <td>{s.estDelivery}</td>
                      <td><code>{s.trackingNo}</code></td>
                      <td>{s.carrier}</td>
                      <td><span className="badge badge-good">{s.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {/* MODAL: REJECT REASON */}
      {rejectingReq && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Reject Restock Request</h3>
              <button className="modal-close" onClick={() => setRejectingReq(null)}>&times;</button>
            </div>
            <form onSubmit={handleConfirmRejection}>
              <div className="form-group">
                <label>Reason for Rejection</label>
                <textarea
                  rows="3"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="State rejection reason..."
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setRejectingReq(null)}>Cancel</button>
                <button type="submit" className="btn btn-danger"><i className="fa-solid fa-times-circle"></i> Confirm Rejection</button>
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
