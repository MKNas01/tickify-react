import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Menu, X } from "lucide-react";
import { toast } from "react-hot-toast"; // Use react-hot-toast for better UX (install if needed: npm i react-hot-toast)
import "./Tickets.css";

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    status: "open",
  });
  const [errors, setErrors] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load session/user
  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) navigate("/auth/login");
  }, [navigate]);

  // Load tickets
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tickify_tickets")) || [];
    setTickets(stored);
  }, []);

  const saveTickets = (updated) => {
    localStorage.setItem("tickify_tickets", JSON.stringify(updated));
    setTickets(updated);
  };

  // Real-time validation function
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'title':
        if (!value.trim()) error = 'Title is required';
        break;
      case 'status':
        if (!['open', 'in_progress', 'closed'].includes(value)) error = 'Invalid status';
        break;
      case 'description':
        if (value && value.length < 10) error = 'Description must be at least 10 characters';
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation on change
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

  const validateForm = () => {
    const errs = {};
    Object.keys(form).forEach(key => {
      if (key !== 'id') {
        const error = validateField(key, form[key]);
        if (error) errs[key] = error;
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors below.", { duration: 3000 });
      return;
    }

    let updatedTickets;
    if (form.id) {
      updatedTickets = tickets.map((t) => (t.id === form.id ? { ...form } : t));
      toast.success("Ticket updated successfully!", { duration: 2500 });
    } else {
      const newTicket = {
        ...form,
        id: Date.now(),
        createdAt: new Date().toLocaleString(),
      };
      updatedTickets = [...tickets, newTicket];
      toast.success("Ticket created successfully!", { duration: 2500 });
    }

    saveTickets(updatedTickets);
    setForm({ id: null, title: "", description: "", status: "open" });
    setErrors({}); // Clear errors
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    const updated = tickets.filter((t) => t.id !== id);
    saveTickets(updated);
    toast.success("Ticket deleted successfully!"); // Fixed: "success" type
  };

  const handleEdit = (ticket) => {
    setForm(ticket);
    // Scroll to form for UX
    document.querySelector('.ticket-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div className="tickets-page-container">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="app-wrapper">
        <main className="tickets-main">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <h2>🎫 Manage Tickets</h2>

          <form className="ticket-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                onBlur={handleInputChange} // Real-time on blur too
                placeholder="Enter ticket title"
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && <small id="title-error" className="error">{errors.title}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                onBlur={handleInputChange}
                placeholder="Enter ticket description (min 10 chars if provided)"
                rows="4"
                aria-describedby={errors.description ? "desc-error" : undefined}
              ></textarea>
              {errors.description && <small id="desc-error" className="error">{errors.description}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleInputChange}
                onBlur={handleInputChange}
                aria-describedby={errors.status ? "status-error" : undefined}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              {errors.status && <small id="status-error" className="error">{errors.status}</small>}
            </div>

            <button type="submit" className="submit-btn" disabled={Object.keys(errors).length > 0}>
              {form.id ? "Update Ticket" : "Create Ticket"}
            </button>
          </form>

          <div className="tickets-list">
            <h3>All Tickets</h3>
            {tickets.length === 0 ? (
              <p className="no-tickets">No tickets available</p>
            ) : (
              tickets.map((t) => (
                <div key={t.id} className={`ticket-card ${t.status}`}>
                  <h4>{t.title}</h4>
                  <p>{t.description || "No description provided"}</p>
                  <span className="status-tag" aria-label={`Status: ${t.status}`}>
                    {t.status.replace('_', ' ')}
                  </span>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(t)} className="edit-btn">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tickets;