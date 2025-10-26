import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Real-time validation
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation
    const error = validateField(name, value);
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
      const error = validateField(key, form[key]);
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

    const storedUser = JSON.parse(localStorage.getItem("tickify_user"));
    if (!storedUser || storedUser.email !== form.email || storedUser.password !== form.password) {
      toast.error("Invalid credentials. Please try again.", { duration: 3000 });
      return;
    }

    localStorage.setItem("ticketapp_session", JSON.stringify({ email: form.email }));
    toast.success("Login successful!", { duration: 2000 });
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <main className="auth-page">
      <div className="auth-box">
        <h1>Welcome Back 👋</h1>
        <p>Login to your Tickify account</p>

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
              onBlur={handleInputChange} // Real-time on blur
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

          <button type="submit" className="btn-primary full-width" disabled={Object.keys(errors).length > 0}>
            Login
          </button>

          <p className="switch-link">
            Don’t have an account? <Link to="/auth/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}