import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import SupplierManagement from './components/SupplierManagement';
import ManageUsers from './components/ManageUsers';
import ProductManagement from "./components/ProductManagement";
import Inventory from "./components/Inventory";
function MainLayout() {
  const location = useLocation();
  const hideNavbar = ['/admin', '/manager', '/suppliers'].includes(location.pathname);

  return (
    <div className="app-container">
      

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminDashboard />} />
        {/* <Route path="/manager" element={<ManagerDashboard />} /> */}
        <Route path="/supplier" element={<SupplierManagement />} />

        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/inventory" element={<Inventory />} />


        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

