import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
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
  ChevronDown,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  UserPlus,
  RefreshCw,
  ShoppingCart,
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react';

export default function AdminDashboard() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const dateStr = now.toLocaleDateString('en-US', options);
      const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      setCurrentTime(`${dateStr} ${timeStr}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const triggerToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg('');
    }, 3500);
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Manage Users', icon: Users, path: '/manage-users' },
    { name: 'Products', icon: Package, path: '/products' },
    { name: 'Inventory', icon: Boxes, path: '/inventory' },
    { name: 'Low Stock Alerts', icon: AlertTriangle, path: '/low-stock' },
    { name: 'Product Condition', icon: ShieldCheck, path: '/condition' },
    { name: 'Restock Requests', icon: Truck, path: '/suppliers' },
    { name: 'Reports / Receipts', icon: FileText, path: '/reports' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];


  const statCards = [
    {
      title: 'TOTAL USERS',
      value: '0',
      change: '↑ 12% from last month',
      isUp: true,
      icon: Users,
      bgColor: '#e0f2fe',
      iconColor: '#0284c7',
    },
    {
      title: 'TOTAL PRODUCTS',
      value: '140',
      change: '↑ 8% from last month',
      isUp: true,
      icon: Package,
      bgColor: '#dcfce7',
      iconColor: '#16a34a',
    },
    {
      title: 'LOW STOCK ITEMS',
      value: '8',
      change: '↓ 5% from last month',
      isUp: false,
      icon: AlertTriangle,
      bgColor: '#ffedd5',
      iconColor: '#ea580c',
    },
    {
      title: 'RECEIPTS (THIS MONTH)',
      value: '56',
      change: '↑ 15% from last month',
      isUp: true,
      icon: FileText,
      bgColor: '#f3e8ff',
      iconColor: '#9333ea',
    },
  ];

  const actionCards = [
    {
      title: 'Manage Users',
      desc: 'Add, edit, remove and control user accounts.',
      btnText: 'Manage Users',
      btnBg: '#0284c7',
      icon: Users,
     action: () => navigate('/manage-users'),
    },
    {
      title: 'Products',
      desc: 'Add, edit and manage store products.',
      btnText: 'Manage Products',
      btnBg: '#16a34a',
      icon: Package,
      action: () => navigate('/products'),
    },
    {
      title: 'Inventory',
      desc: 'Track stock entry, stock exit and update inventory.',
      btnText: 'View Inventory',
      btnBg: '#8b5cf6',
      icon: Boxes,
      action: () => navigate('/inventory'),
    },
    {
      title: 'Low Stock Alerts',
      desc: 'View products that are running low in stock.',
      btnText: 'View Low Stock',
      btnBg: '#f97316',
      icon: AlertTriangle,
      action: () => triggerToast('Filtering Low Stock Items...'),
    },
    {
      title: 'Product Condition',
      desc: 'Check damaged, expired and low quality products.',
      btnText: 'Check Condition',
      btnBg: '#06b6d4',
      icon: ShieldCheck,
      action: () => triggerToast('Opening Product Condition Audit...'),
    },
    {
      title: 'Reports / Receipts',
      desc: 'View transactions, records and generated receipts.',
      btnText: 'View Reports',
      btnBg: '#ec4899',
      icon: FileText,
      action: () => triggerToast('Generating Transaction Reports...'),
    },
  ];

  const lowStockProducts = [
    {
      name: 'Rice 25kg',
      category: 'Grocery',
      currentStock: 3,
      reorderLevel: 10,
      status: 'Low',
      image: '🌾',
    },
    {
      name: 'Milk 1L',
      category: 'Dairy',
      currentStock: 5,
      reorderLevel: 15,
      status: 'Low',
      image: '🥛',
    },
    {
      name: 'Bath Soap',
      category: 'Personal Care',
      currentStock: 2,
      reorderLevel: 8,
      status: 'Low',
      image: '🧼',
    },
    {
      name: 'Cooking Oil 1L',
      category: 'Grocery',
      currentStock: 4,
      reorderLevel: 10,
      status: 'Low',
      image: '🛢️',
    },
  ];

  const recentActivities = [
    {
      icon: Plus,
      bgColor: '#22c55e',
      title: 'New product "Parle-G Biscuit" added',
      user: 'By Admin',
      time: '10:30 AM',
    },
    {
      icon: UserPlus,
      bgColor: '#3b82f6',
      title: 'New user "Manager1" registered',
      user: 'By Admin',
      time: '09:15 AM',
    },
    {
      icon: RefreshCw,
      bgColor: '#f97316',
      title: 'Stock updated for "Milk 1L"',
      user: 'By Manager',
      time: 'Yesterday, 04:45 PM',
    },
    {
      icon: ShoppingCart,
      bgColor: '#a855f7',
      title: 'Restock request sent to supplier',
      user: 'By Admin',
      time: 'Yesterday, 02:20 PM',
    },
    {
      icon: CheckCircle2,
      bgColor: '#06b6d4',
      title: 'Supplier "FreshMart" delivered supply',
      user: 'By Supplier',
      time: 'Jul 24, 2026, 11:30 AM',
    },
  ];
  

   



  const globalSearchItems = [
  ...navItems.map(item => ({
    type: "Page",
    name: item.name,
    path: item.path
  })),
  ...actionCards.map(card => ({
  type: "Action",
  name: card.title,
  path:
    card.title === "Manage Users"
      ? "/manage-users"
      : card.title === "Products"
      ? "/products"
      : card.title === "Inventory"
      ? "/inventory"
      : card.title === "Low Stock Alerts"
      ? "/low-stock"
      : card.title === "Product Condition"
      ? "/condition"
      : card.title === "Reports / Receipts"
      ? "/reports"
      : null
})),
  ...lowStockProducts.map(product => ({
    type: "Product",
    name: product.name,
    path: "/inventory"
  })),
  ...recentActivities.map(activity => ({
    type: "Activity",
    name: activity.title,
    path: null
  }))
];

const searchResults = globalSearchItems.filter(item =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
);
 

  const filteredStock = lowStockProducts.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
    <div className="sms-dashboard-container">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="sms-toast">
          <CheckCircle2 size={18} />
          <span>{notificationMsg}</span>
          <button onClick={() => setNotificationMsg('')} className="sms-toast-close">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`sms-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sms-sidebar-header">
          <div className="sms-logo-box">
            <ShoppingBag size={22} color="#ffffff" />
          </div>
          <div className="sms-logo-text">
            <h2>SMS</h2>
            <p>Store Management System</p>
          </div>
        </div>

        <nav className="sms-sidebar-nav">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeNav === item.name;
            return (
              <button
                key={item.name}
                className={`sms-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item.name);
                  setSidebarOpen(false);
                  navigate(item.path);
                }}
              >
                <IconComponent size={19} className="sms-nav-icon" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sms-sidebar-footer">
          <button className="sms-nav-btn sms-logout-btn" onClick={() => navigate('/login')}>
            <LogOut size={19} className="sms-nav-icon text-danger" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="sms-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Outer Content Area */}
      <div className="sms-main-wrapper">
        {/* Top Header Bar */}

        <header className="sms-topbar">
          <div className="sms-topbar-left">

            <button className="sms-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>

            <div className="sms-search-box">
  <Search size={18} className="sms-search-icon" />

  <input
    type="text"
    placeholder="Search anything..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    />

  {searchQuery && (
    <div className="sms-search-results">
      {searchResults.length > 0 ? (
        searchResults.map((item, index) => (
          <div
            key={index}
            className="sms-search-item"
            onClick={() => {
              if (item.path) navigate(item.path);
              setSearchQuery("");
            }}
          >
            <strong>{item.type}</strong> - {item.name}
          </div>
        ))
      ) : (
        <div className="sms-search-item">
          No results found
        </div>
      )}
    </div>
  )}
  </div>
  </div>

          <div className="sms-topbar-right">
            <button className="sms-icon-badge-btn" onClick={() => triggerToast('You have 1 unread notification.')}>
              <Bell size={20} />
              <span className="sms-badge-dot">1</span>
            </button>

            <div className="sms-user-profile">
              <div className="sms-avatar">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Admin Avatar"
                />
              </div>
              <div className="sms-user-info">
                <span className="sms-user-name">Admin</span>
                <span className="sms-user-role">Administrator</span>
              </div>
              <ChevronDown size={16} className="sms-dropdown-icon" />
            </div>
          </div>
        </header>

        {/* Dashboard Content Body */}
        <main className="sms-content">
          {/* Title Header Banner */}
          <div className="sms-page-header">
            <div>
              <h1 className="sms-page-title">Dashboard</h1>
              <p className="sms-page-subtitle">Welcome back, Admin! Here's what's happening in your store.</p>
            </div>

            <div className="sms-date-badge">
              <Calendar size={16} />
              <span>{currentTime || 'July 26, 2026 1:24 PM'}</span>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div className="sms-stats-grid">
            {statCards.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="sms-stat-card">
                  <div className="sms-stat-header">
                    <div className="sms-stat-icon-wrapper" style={{ backgroundColor: stat.bgColor, color: stat.iconColor }}>
                      <StatIcon size={22} />
                    </div>
                  </div>
                  <div className="sms-stat-body">
                    <span className="sms-stat-label">{stat.title}</span>
                    <h2 className="sms-stat-value">{stat.value}</h2>
                    <p className={`sms-stat-change ${stat.isUp ? 'up' : 'down'}`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Action Cards Grid */}
          <div className="sms-actions-grid">
            {actionCards.map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <div key={idx} className="sms-action-card">
                  <div className="sms-action-icon-circle" style={{ color: card.btnBg }}>
                    <CardIcon size={28} />
                  </div>
                  <h3 className="sms-action-title">{card.title}</h3>
                  <p className="sms-action-desc">{card.desc}</p>
                  <button
                    className="sms-action-btn"
                    style={{ backgroundColor: card.btnBg }}
                    onClick={card.action}
                  >
                    {card.btnText}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Grid: Low Stock & Recent Activities */}
          <div className="sms-bottom-grid">
            {/* Low Stock Alerts Table */}
            <div className="sms-card-panel">
              <div className="sms-panel-header">
                <h3>Low Stock Alerts</h3>
                <button className="sms-view-all-btn" onClick={() => triggerToast('Viewing all low stock alerts...')}>
                  View All
                </button>
              </div>

              <div className="sms-table-responsive">
                <table className="sms-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Current Stock</th>
                      <th>Reorder Level</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStock.map((prod, index) => (
                      <tr key={index}>
                        <td>
                          <div className="sms-product-cell">
                            <span className="sms-product-thumb">{prod.image}</span>
                            <span className="sms-product-name">{prod.name}</span>
                          </div>
                        </td>
                        <td className="text-muted">{prod.category}</td>
                        <td className="text-bold text-danger">{prod.currentStock}</td>
                        <td className="text-muted">{prod.reorderLevel}</td>
                        <td>
                          <span className="sms-status-badge badge-low">
                            {prod.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activities List */}
            <div className="sms-card-panel">
              <div className="sms-panel-header">
                <h3>Recent Activities</h3>
                <button className="sms-view-all-btn" onClick={() => triggerToast('Opening full Activity Log...')}>
                  View All
                </button>
              </div>

              <div className="sms-activity-list">
                {recentActivities.map((act, index) => {
                  const ActIcon = act.icon;
                  return (
                    <div key={index} className="sms-activity-item">
                      <div className="sms-activity-icon" style={{ backgroundColor: act.bgColor }}>
                        <ActIcon size={16} color="#ffffff" />
                      </div>
                      <div className="sms-activity-content">
                        <p className="sms-activity-title">{act.title}</p>
                        <span className="sms-activity-user">{act.user}</span>
                      </div>
                      <span className="sms-activity-time">{act.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
