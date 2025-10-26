import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    console.log('useEffect ran');  // Debug: Logs every time useEffect executes

    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      console.log('No session - redirecting silently');  // Extra log for expiry path
      navigate("/auth/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("tickify_user"));
    setUser(storedUser);

    // Load tickets for stats
    const storedTickets = JSON.parse(localStorage.getItem("tickify_tickets")) || [];
    setTickets(storedTickets);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully!', { timeout: 2000 })
    navigate("/");  // To landing
  };

  // Compute stats
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const resolvedTickets = tickets.filter(t => t.status === 'closed').length;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main content - Wrapped for max-width */}
      <div className="app-wrapper">
        <main className="dashboard-main">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <h1 className="dashboard-header">Welcome, {user?.name || "Guest"} 👋</h1>

          {/* Stats Section */}
          <section className="stats-section" aria-label="Ticket summary statistics">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Tickets</h3>
                <p className="stat-number">{totalTickets}</p>
              </div>
              <div className="stat-card open">
                <h3>Open Tickets</h3>
                <p className="stat-number">{openTickets}</p>
              </div>
              <div className="stat-card resolved">
                <h3>Resolved Tickets</h3>
                <p className="stat-number">{resolvedTickets}</p>
              </div>
            </div>
          </section>

          {/* Quick Link to Management */}
          <section className="quick-actions" aria-label="Quick actions">
            <h2>Manage Your Tickets</h2>
            <button 
              className="manage-btn" 
              onClick={() => navigate('/tickets')}
              aria-label="Go to ticket management"
            >
              View All Tickets
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;