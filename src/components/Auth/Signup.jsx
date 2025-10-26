import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Signup.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  // Real-time validation
  const validateField = (name, value, otherValues = {}) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      case 'confirm':
        if (!value) return 'Please confirm your password';
        if (value !== otherValues.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation (pass other fields if needed)
    const error = validateField(name, value, form);
    setErrors(prev => ({ ...prev, [name]: error }));

    // Clear error if valid
    if (!error) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key], form);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors below.", { duration: 3000 });
      return;
    }

    // Check if user already exists (simple simulation)
    const storedUser = JSON.parse(localStorage.getItem("tickify_user"));
    if (storedUser && storedUser.email === form.email) {
      toast.error("An account with this email already exists.", { duration: 3000 });
      return;
    }

    localStorage.setItem("tickify_user", JSON.stringify({ email: form.email, password: form.password }));
    toast.success("Signup successful!", { duration: 2000 });
    setTimeout(() => navigate("/auth/login"), 1000);
  };

  return (
    <main className="auth-page">
      <div className="auth-box">
        <h1>Create Account</h1>
        <p>Sign up to start managing tickets with Tickify</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleInputChange}
              onBlur={handleInputChange}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <span id="email-error" className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleInputChange}
              onBlur={handleInputChange}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-btn"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <span id="password-error" className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              id="confirm"
              name="confirm"
              placeholder="Confirm your password"
              value={form.confirm}
              onChange={handleInputChange}
              onBlur={handleInputChange}
              aria-describedby={errors.confirm ? "confirm-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="toggle-password-btn"
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirm && <span id="confirm-error" className="error">{errors.confirm}</span>}
          </div>

          <button type="submit" className="btn-primary full-width" disabled={Object.keys(errors).length > 0}>
            Sign Up
          </button>

          <p className="switch-link">
            Already have an account? <Link to="/auth/login">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
}