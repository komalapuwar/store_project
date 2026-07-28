import React, { useState } from 'react';
import './ManageUsers.css';
import {
  ShoppingBag,
  PanelLeft,
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  AlertTriangle,
  ShieldCheck,
  Truck,
  FileText,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  Plus,
  UserCheck,
  Briefcase,
  Filter,
  ChevronDown,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

// Custom Avatar SVG Renderer for exact image visual fidelity
const UserAvatar = ({ type }) => {
  if (type === 1) {
    // Male Admin User in suit
    return (
      <svg viewBox="0 0 100 100" className="sms-avatar-img">
        <circle cx="50" cy="50" r="50" fill="#e2e8f0" />
        {/* Head */}
        <circle cx="50" cy="38" r="18" fill="#fcd34d" />
        <path d="M32 28 C 32 16, 68 16, 68 28 C 68 22, 32 22, 32 28 Z" fill="#1e293b" />
        <path d="M34 26 Q 50 14 66 26 Q 50 20 34 26 Z" fill="#0f172a" />
        {/* Eyes & Nose */}
        <circle cx="43" cy="38" r="2" fill="#1e293b" />
        <circle cx="57" cy="38" r="2" fill="#1e293b" />
        {/* Suit & Tie */}
        <path d="M20 90 Q 50 60 80 90 L 80 100 L 20 100 Z" fill="#334155" />
        <polygon points="50,60 42,100 58,100" fill="#ffffff" />
        <polygon points="50,65 47,85 50,92 53,85" fill="#2563eb" />
      </svg>
    );
  }

  if (type === 2 || type === 5) {
    // Female User
    return (
      <svg viewBox="0 0 100 100" className="sms-avatar-img">
        <circle cx="50" cy="50" r="50" fill="#fed7aa" />
        {/* Hair Back */}
        <path d="M26 35 C 20 70, 80 70, 74 35 Z" fill="#1e293b" />
        {/* Head */}
        <circle cx="50" cy="40" r="18" fill="#fcd34d" />
        <path d="M32 32 Q 50 20 68 32 Q 50 28 32 32 Z" fill="#0f172a" />
        {/* Eyes */}
        <circle cx="43" cy="40" r="2" fill="#1e293b" />
        <circle cx="57" cy="40" r="2" fill="#1e293b" />
        {/* Clothes */}
        <path d="M22 90 Q 50 65 78 90 L 78 100 L 22 100 Z" fill="#9a3412" />
      </svg>
    );
  }

  if (type === 3) {
    // Male User Manager Two
    return (
      <svg viewBox="0 0 100 100" className="sms-avatar-img">
        <circle cx="50" cy="50" r="50" fill="#e2e8f0" />
        {/* Head */}
        <circle cx="50" cy="40" r="18" fill="#fde047" />
        <path d="M32 30 C 32 18, 68 18, 68 30 Z" fill="#1e293b" />
        {/* Eyes */}
        <circle cx="43" cy="40" r="2" fill="#1e293b" />
        <circle cx="57" cy="40" r="2" fill="#1e293b" />
        {/* Shirt */}
        <path d="M22 90 Q 50 65 78 90 L 78 100 L 22 100 Z" fill="#0f172a" />
      </svg>
    );
  }

  if (type === 4 || type === 6) {
    // Yellow circle background avatar
    return (
      <svg viewBox="0 0 100 100" className="sms-avatar-img">
        <circle cx="50" cy="50" r="50" fill="#fef08a" />
        {/* Head */}
        <circle cx="50" cy="40" r="18" fill="#fed7aa" />
        <path d="M30 32 C 30 18, 70 18, 70 32 Z" fill="#451a03" />
        {/* Eyes */}
        <circle cx="43" cy="40" r="2" fill="#1e293b" />
        <circle cx="57" cy="40" r="2" fill="#1e293b" />
        {/* Shirt */}
        <path d="M22 90 Q 50 65 78 90 L 78 100 L 22 100 Z" fill="#78350f" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className="sms-avatar-img">
      <circle cx="50" cy="50" r="50" fill="#e2e8f0" />
      <circle cx="50" cy="40" r="18" fill="#cbd5e1" />
      <path d="M22 95 Q 50 70 78 95 Z" fill="#64748b" />
    </svg>
  );
};

export default function ManageUsers() {
  const [activeNav, setActiveNav] = useState('Manage Users');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Select role',
    status: 'Active',
  });

  // Table Data initialized to match screenshot exactly
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: 'Admin User',
      username: 'admin01',
      email: 'admin@sms.com',
      phone: '9800000001',
      role: 'Admin',
      status: 'Active',
      avatarType: 1,
    },
    {
      id: 2,
      fullName: 'Manager One',
      username: 'manager01',
      email: 'manager1@sms.com',
      phone: '9800000002',
      role: 'Manager',
      status: 'Active',
      avatarType: 2,
    },
    {
      id: 3,
      fullName: 'Manager Two',
      username: 'manager02',
      email: 'manager2@sms.com',
      phone: '9800000003',
      role: 'Manager',
      status: 'Active',
      avatarType: 3,
    },
    {
      id: 4,
      fullName: 'Supplier One',
      username: 'supplier01',
      email: 'supplier1@sms.com',
      phone: '9800000004',
      role: 'Supplier',
      status: 'Active',
      avatarType: 4,
    },
    {
      id: 5,
      fullName: 'Supplier Two',
      username: 'supplier02',
      email: 'supplier2@sms.com',
      phone: '9800000005',
      role: 'Supplier',
      status: 'Inactive',
      avatarType: 5,
    },
    {
      id: 6,
      fullName: 'Cashier User',
      username: 'cashier01',
      email: 'cashier@sms.com',
      phone: '9800000006',
      role: 'Manager',
      status: 'Active',
      avatarType: 6,
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.username) return;

    const newUser = {
      id: users.length + 1,
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email || `${formData.username}@sms.com`,
      phone: formData.phone || '9800000007',
      role: formData.role === 'Select role' ? 'Manager' : formData.role,
      status: formData.status,
      avatarType: (users.length % 6) + 1,
    };

    setUsers([...users, newUser]);
    setFormData({
      fullName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'Select role',
      status: 'Active',
    });
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'All Roles' || u.role === roleFilter;
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="sms-container">
      {/* ---------------- LEFT SIDEBAR ---------------- */}
      <aside className="sms-sidebar">
        {/* Brand Header */}
        <div className="sms-sidebar-brand">
          <div className="sms-brand-left">
            <div className="sms-brand-icon">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h1 className="sms-brand-title">SMS</h1>
              <p className="sms-brand-subtitle">Store Management System</p>
            </div>
          </div>
          <button className="sms-sidebar-toggle" title="Toggle Sidebar">
            <PanelLeft size={16} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="sms-sidebar-nav">
          <a
            href="#dashboard"
            className={`sms-nav-item ${activeNav === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveNav('Dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </a>

          {/* USER MANAGEMENT SECTION */}
          <div className="sms-nav-group">
            <div className="sms-nav-section-title">User Management</div>
            <a
              href="#manage-users"
              className={`sms-nav-item ${activeNav === 'Manage Users' ? 'active' : ''}`}
              onClick={() => setActiveNav('Manage Users')}
            >
              <Users size={18} />
              <span>Manage Users</span>
            </a>
          </div>

          {/* INVENTORY MANAGEMENT SECTION */}
          <div className="sms-nav-group">
            <div className="sms-nav-section-title">Inventory Management</div>
            <a
              href="#products"
              className={`sms-nav-item ${activeNav === 'Products' ? 'active' : ''}`}
              onClick={() => setActiveNav('Products')}
            >
              <Package size={18} />
              <span>Products</span>
            </a>
            <a
              href="#inventory"
              className={`sms-nav-item ${activeNav === 'Inventory' ? 'active' : ''}`}
              onClick={() => setActiveNav('Inventory')}
            >
              <Boxes size={18} />
              <span>Inventory</span>
            </a>
            <a
              href="#low-stock"
              className={`sms-nav-item ${activeNav === 'Low Stock Alerts' ? 'active' : ''}`}
              onClick={() => setActiveNav('Low Stock Alerts')}
            >
              <AlertTriangle size={18} />
              <span>Low Stock Alerts</span>
            </a>
            <a
              href="#product-condition"
              className={`sms-nav-item ${activeNav === 'Product Condition' ? 'active' : ''}`}
              onClick={() => setActiveNav('Product Condition')}
            >
              <ShieldCheck size={18} />
              <span>Product Condition</span>
            </a>
          </div>

          {/* REQUESTS & REPORTS SECTION */}
          <div className="sms-nav-group">
            <div className="sms-nav-section-title">Requests & Reports</div>
            <a
              href="#restock"
              className={`sms-nav-item ${activeNav === 'Restock Requests' ? 'active' : ''}`}
              onClick={() => setActiveNav('Restock Requests')}
            >
              <Truck size={18} />
              <span>Restock Requests</span>
            </a>
            <a
              href="#reports"
              className={`sms-nav-item ${activeNav === 'Reports / Receipts' ? 'active' : ''}`}
              onClick={() => setActiveNav('Reports / Receipts')}
            >
              <FileText size={18} />
              <span>Reports / Receipts</span>
            </a>
          </div>

          {/* OTHERS SECTION */}
          <div className="sms-nav-group">
            <div className="sms-nav-section-title">Others</div>
            <a
              href="#suppliers"
              className={`sms-nav-item ${activeNav === 'Suppliers' ? 'active' : ''}`}
              onClick={() => setActiveNav('Suppliers')}
            >
              <Users size={18} />
              <span>Suppliers</span>
            </a>
            <a
              href="#settings"
              className={`sms-nav-item ${activeNav === 'Settings' ? 'active' : ''}`}
              onClick={() => setActiveNav('Settings')}
            >
              <Settings size={18} />
              <span>Settings</span>
            </a>
          </div>

          <div className="sms-sidebar-divider" />

          <a href="#logout" className="sms-nav-item logout">
            <LogOut size={18} />
            <span>Logout</span>
          </a>
        </nav>
      </aside>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <main className="sms-main">
        {/* Topbar */}
        <header className="sms-topbar">
          <div className="sms-topbar-left">
            <button className="sms-menu-btn">
              <Menu size={20} />
            </button>
            <div className="sms-search-box">
              <span className="sms-search-icon-left">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="sms-search-input"
              />
              <button className="sms-search-icon-right">
                <Search size={16} />
              </button>
            </div>
          </div>

          <div className="sms-topbar-right">
            <div className="sms-notification-wrapper">
              <button className="sms-bell-btn">
                <Bell size={20} />
              </button>
              <span className="sms-bell-badge">3</span>
            </div>

            <div className="sms-user-profile">
              <div className="sms-user-avatar-top">
                <UserAvatar type={1} />
              </div>
              <div className="sms-user-info">
                <span className="sms-user-name">Admin</span>
                <span className="sms-user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="sms-page-content">
          {/* Header Title Bar */}
          <div className="sms-page-header">
            <div>
              <h1 className="sms-page-title">Manage Users</h1>
              <p className="sms-breadcrumb">
                <span>Dashboard</span>
                <span className="separator">&gt;</span>
                <span>Manage Users</span>
              </p>
            </div>
            <button
              className="sms-add-btn"
              onClick={() => setShowDrawer(true)}
            >
              <Plus size={18} />
              <span>Add New User</span>
            </button>
          </div>

          {/* 4 Stats Cards Grid */}
          <div className="sms-stats-grid">
            <div className="sms-stat-card">
              <div className="sms-stat-icon-wrapper purple">
                <Users size={24} />
              </div>
              <div className="sms-stat-info">
                <span className="sms-stat-title">Total Users</span>
                <span className="sms-stat-number">25</span>
                <span className="sms-stat-subtitle">All registered users</span>
              </div>
            </div>

            <div className="sms-stat-card">
              <div className="sms-stat-icon-wrapper green">
                <UserCheck size={24} />
              </div>
              <div className="sms-stat-info">
                <span className="sms-stat-title">Admins</span>
                <span className="sms-stat-number">3</span>
                <span className="sms-stat-subtitle">System administrators</span>
              </div>
            </div>

            <div className="sms-stat-card">
              <div className="sms-stat-icon-wrapper blue">
                <Briefcase size={24} />
              </div>
              <div className="sms-stat-info">
                <span className="sms-stat-title">Managers</span>
                <span className="sms-stat-number">8</span>
                <span className="sms-stat-subtitle">Store managers</span>
              </div>
            </div>

            <div className="sms-stat-card">
              <div className="sms-stat-icon-wrapper orange">
                <Truck size={24} />
              </div>
              <div className="sms-stat-info">
                <span className="sms-stat-title">Suppliers</span>
                <span className="sms-stat-number">14</span>
                <span className="sms-stat-subtitle">Store suppliers</span>
              </div>
            </div>
          </div>

          {/* Split Layout: Users Table & Add User Panel */}
          <div className="sms-layout-split">
            {/* Left Table Section */}
            <div className="sms-table-card">
              <div className="sms-table-header-controls">
                <div className="sms-role-filter-select">
                  <Filter size={16} />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#334155',
                      fontWeight: 500,
                    }}
                  >
                    <option value="All Roles">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Supplier">Supplier</option>
                  </select>
                </div>

                <div className="sms-table-search-box">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="sms-table-search-input"
                  />
                  <Search size={16} className="sms-table-search-icon" />
                </div>
              </div>

              {/* Table */}
              <div className="sms-table-wrapper">
                <table className="sms-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                          <div className="sms-user-cell">
                            <div className="sms-avatar-wrapper">
                              <UserAvatar type={user.avatarType} />
                            </div>
                            <span>{user.fullName}</span>
                          </div>
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <span
                            className={`sms-badge role-${user.role.toLowerCase()}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`sms-badge status-${user.status.toLowerCase()}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <div className="sms-actions-cell">
                            <button
                              className="sms-btn-action edit"
                              title="Edit user"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              className="sms-btn-action delete"
                              title="Delete user"
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

              {/* Footer Pagination */}
              <div className="sms-table-footer">
                <span className="sms-footer-info">
                  Showing 1 to {filteredUsers.length} of 25 entries
                </span>
                <div className="sms-pagination">
                  <button className="sms-page-btn" disabled>
                    <ChevronLeft size={16} />
                  </button>
                  <button className="sms-page-btn active">1</button>
                  <button className="sms-page-btn">2</button>
                  <button className="sms-page-btn">3</button>
                  <button className="sms-page-btn">4</button>
                  <button className="sms-page-btn">5</button>
                  <button className="sms-page-btn">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Drawer/Panel: Add New User */}
            {showDrawer && (
              <div className="sms-drawer-card">
                <div className="sms-drawer-header">
                  <h2 className="sms-drawer-title">Add New User</h2>
                  <button
                    className="sms-drawer-close"
                    onClick={() => setShowDrawer(false)}
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveUser}>
                  <div className="sms-form-group">
                    <label className="sms-form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="sms-form-input"
                    />
                  </div>

                  <div className="sms-form-group">
                    <label className="sms-form-label">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="sms-form-input"
                    />
                  </div>

                  <div className="sms-form-group">
                    <label className="sms-form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="sms-form-input"
                    />
                  </div>

                  <div className="sms-form-group">
                    <label className="sms-form-label">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="sms-form-input"
                    />
                  </div>

                  <div className="sms-form-group">
                    <label className="sms-form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="sms-form-input"
                    />
                  </div>

                  <div className="sms-form-group">
                    <label className="sms-form-label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="sms-form-input"
                    />
                  </div>

                  <div className="sms-form-group">
                    <label className="sms-form-label">Role</label>
                    <div className="sms-select-wrapper">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="sms-form-select"
                      >
                        <option value="Select role">Select role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Supplier">Supplier</option>
                      </select>
                      <span className="sms-select-arrow">
                        <ChevronDown size={16} />
                      </span>
                    </div>
                  </div>

                  <div className="sms-form-group">
                    <label className="sms-form-label">Status</label>
                    <div className="sms-select-wrapper">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="sms-form-select"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <span className="sms-select-arrow">
                        <ChevronDown size={16} />
                      </span>
                    </div>
                  </div>

                  <div className="sms-form-actions">
                    <button
                      type="button"
                      className="sms-btn-cancel"
                      onClick={() => setShowDrawer(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="sms-btn-save">
                      Save User
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
