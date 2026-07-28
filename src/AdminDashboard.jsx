import React from 'react';

export default function AdminDashboard({ onNavigate }) {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-circle">A</div>
          <h2>Admin Panel</h2>
        </div>

        <nav className="menu">
          <button className="active"><i className="fa-solid fa-house"></i> Dashboard</button>
          <button onClick={() => onNavigate && onNavigate('manager')}><i className="fa-solid fa-user-gear"></i> Manager Panel</button>
          <button onClick={() => onNavigate && onNavigate('supplier')}><i className="fa-solid fa-truck-field"></i> Supplier Panel</button>
          <button onClick={() => alert('Logout clicked')}><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the Admin Panel</p>
          </div>

          <div className="admin-profile">
            <i className="fa-solid fa-user-shield"></i>
            <span>Admin</span>
          </div>
        </header>

        {/* Statistics */}
        <section className="stats">
          <div className="stat-box">
            <h3>Total Users</h3>
            <p>25</p>
          </div>

          <div className="stat-box">
            <h3>Total Products</h3>
            <p>140</p>
          </div>

          <div className="stat-box">
            <h3>Low Stock</h3>
            <p>8</p>
          </div>

          <div className="stat-box">
            <h3>Receipts</h3>
            <p>56</p>
          </div>
        </section>

        {/* Action Cards */}
        <section className="cards">
          <div className="card blue">
            <i className="fa-solid fa-users"></i>
            <h2>Manage Users</h2>
            <p>Add, edit, remove and control user accounts.</p>
            <button onClick={() => alert('User management panel active')}>Manage</button>
          </div>

          <div className="card green">
            <i className="fa-solid fa-boxes-stacked"></i>
            <h2>Stock Inflow / Outflow</h2>
            <p>Track stock entry, stock exit and inventory updates.</p>
            <button onClick={() => onNavigate && onNavigate('manager')}>View Stock</button>
          </div>

          <div className="card orange">
            <i className="fa-solid fa-clipboard-check"></i>
            <h2>Product Condition</h2>
            <p>Check damaged, expired and low stock products.</p>
            <button onClick={() => onNavigate && onNavigate('manager')}>Inspect</button>
          </div>

          <div className="card purple">
            <i className="fa-solid fa-receipt"></i>
            <h2>Records / Receipts</h2>
            <p>View transactions, records and generated receipts.</p>
            <button onClick={() => onNavigate && onNavigate('supplier')}>View Records</button>
          </div>
        </section>
      </main>
    </div>
  );
}
