import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import SupplierDashboard from './SupplierDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeRole, setActiveRole] = useState(''); // 'admin' | 'manager' | 'supplier'

  // Yedi login bhaxaina bhane Login Page dekhauvne
  if (!isLoggedIn) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        color: '#fff',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          background: '#1e293b',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          width: '350px',
          textAlign: 'center'
        }}>
          <h2>Store Login</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>Select your role to login</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => { setActiveRole('admin'); setIsLoggedIn(true); }}
              style={{ padding: '10px', background: '#3498db', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Login as Admin
            </button>
            <button 
              onClick={() => { setActiveRole('manager'); setIsLoggedIn(true); }}
              style={{ padding: '10px', background: '#27ae60', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Login as Manager
            </button>
            <button 
              onClick={() => { setActiveRole('supplier'); setIsLoggedIn(true); }}
              style={{ padding: '10px', background: '#9b59b6', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Login as Supplier
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login bhaisake paxi active role anusar ko Dashboard ra Top Switcher dekhauvne
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar Switcher & Logout */}
      <div style={{
        padding: '10px 25px',
        background: '#1e293b',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #334155',
        fontSize: '14px',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-store" style={{ color: '#3498db', fontSize: '18px' }}></i>
          <strong>Store Management System</strong>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Logged in as: <strong style={{color: '#fff'}}>{activeRole.toUpperCase()}</strong></span>
          
          {/* Logout Button */}
          <button
            onClick={() => { setIsLoggedIn(false); setActiveRole(''); }}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: '#e74c3c',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '12px'
            }}
          >
            <i className="fa-solid fa-right-from-bracket" style={{ marginRight: '5px' }}></i> Logout
          </button>
        </div>
      </div>

      {/* Render Dashboard based on activeRole */}
      <div style={{ flex: 1 }}>
        {activeRole === 'admin' && <AdminDashboard onNavigate={(role) => setActiveRole(role)} />}
        {activeRole === 'manager' && <ManagerDashboard onNavigate={(role) => setActiveRole(role)} />}
        {activeRole === 'supplier' && <SupplierDashboard onNavigate={(role) => setActiveRole(role)} />}
      </div>
    </div>
  );
}