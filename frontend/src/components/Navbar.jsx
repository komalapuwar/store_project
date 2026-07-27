import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LogIn, UserPlus, Truck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="app-header">
      <NavLink to="/admin" className="app-logo">
        <div className="app-logo-badge">SMS</div>
        <span>Store Management System</span>
      </NavLink>

      <nav className="app-nav">
        <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <LogIn size={18} /> Login
        </NavLink>
        <NavLink to="/register" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <UserPlus size={18} /> Register
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={18} /> Admin Dashboard
        </NavLink>
        <NavLink to="/suppliers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Truck size={18} /> Suppliers
        </NavLink>
      </nav>
    </header>
  );
}
