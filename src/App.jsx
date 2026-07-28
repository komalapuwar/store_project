import React, { useState } from 'react';
import ManagerDashboard from './ManagerDashboard';
import SupplierDashboard from './SupplierDashboard';

export default function App() {
  const [activeRole, setActiveRole] = useState('manager'); // 'manager' | 'supplier'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation Switcher */}
      <div style={{
        padding: '10px 25px',
        background: '#1e293b',
        color: '#fff',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #334155',
        fontSize: '14px',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-store" style={{ color: '#3498db', fontSize: '18px' }}></i>
          <strong>Store Management System</strong>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Select Dashboard:</span>

          <button
            onClick={() => setActiveRole('manager')}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px',
              backgroundColor: activeRole === 'manager' ? '#27ae60' : '#334155',
              color: '#ffffff',
              transition: 'all 0.2s'
            }}
          >
            <i className="fa-solid fa-user-tie" style={{ marginRight: '6px' }}></i> Manager Dashboard
          </button>

          <button
            onClick={() => setActiveRole('supplier')}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px',
              backgroundColor: activeRole === 'supplier' ? '#9b59b6' : '#334155',
              color: '#ffffff',
              transition: 'all 0.2s'
            }}
          >
            <i className="fa-solid fa-truck-field" style={{ marginRight: '6px' }}></i> Supplier Dashboard
          </button>
        </div>
      </div>

      {/* Active Dashboard View */}
      <div style={{ flex: 1 }}>
        {activeRole === 'manager' && <ManagerDashboard onNavigate={(role) => setActiveRole(role)} />}
        {activeRole === 'supplier' && <SupplierDashboard onNavigate={(role) => setActiveRole(role)} />}
      </div>
    </div>
  );
}