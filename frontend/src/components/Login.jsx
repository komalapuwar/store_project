import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Contact, LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     if (!formData.username || !formData.password || !formData.role) {
     setError('Please fill in all required fields.');
      return;
    }
    
    setSuccess('Login successful! Redirecting to Dashboard...');
    
    setTimeout(() => {
  if (formData.role === 'admin') {
    navigate('/admin');
  } else if (formData.role === 'manager') {
    navigate('/manager');
  } else if (formData.role === 'supplier') {
    navigate('/supplier');
  }

}, 1000);
  };

    

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back!</h1>
          <p>Please log in into your account.</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <LogIn size={18} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-with-icon">
              <span className="input-icon">
                <User size={22} />
              </span>
              <input
                type="text"
                name="username"
                className="input-control"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-with-icon">
              <span className="input-icon">
                <Lock size={22} />
              </span>
              <input
                type="password"
                name="password"
                className="input-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-with-icon">
              <span className="input-icon">
                <Contact size={22} />
              </span>
              <select
                name="role"
                className="input-control"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            <LogIn size={18} /> Login
          </button>

          <p className="auth-footer">
            No account Yet? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
