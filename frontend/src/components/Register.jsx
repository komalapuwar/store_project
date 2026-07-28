import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ShieldAlert, Contact, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirm_password: '',
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

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match!');
      return;
    }

    setSuccess('Registration successful! Redirecting to Login...');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Get Started:</h1>
          <p>Create your account & unlock smarter Store Management</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <CheckCircle size={18} /> {success}
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
                name="fullname"
                className="input-control"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-with-icon">
              <span className="input-icon">
                <Mail size={22} />
              </span>
              <input
                type="email"
                name="email"
                className="input-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-with-icon">
              <span className="input-icon">
                <Phone size={22} />
              </span>
              <input
                type="text"
                name="phone"
                className="input-control"
                placeholder="Phone Number"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-with-icon">
              <span className="input-icon">
                <ShieldAlert size={22} />
              </span>
              <input
                type="password"
                name="confirm_password"
                className="input-control"
                placeholder="Confirm Password"
                minLength={8}
                value={formData.confirm_password}
                onChange={handleChange}
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
            <UserPlus size={18} /> Register
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
