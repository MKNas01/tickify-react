import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Ticket, LogOut, X } from "lucide-react";
import "./Sidebar.css";

function Sidebar({ onLogout, isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <Home size={18} />, path: "/dashboard" },
    { label: "My Tickets", icon: <Ticket size={18} />, path: "/tickets" },
    // { label: "Profile", icon: <User size={18} />, path: "/profile" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Close icon (mobile) */}
      <div className="sidebar-close" onClick={() => setIsOpen(false)}>
        <X size={20} />
      </div>

      <div className="sidebar-content">
        <h1 className="sidebar-logo">Tickify</h1>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className="sidebar-item"
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-logout" onClick={onLogout}>
        <span className="sidebar-icon">
          <LogOut size={18} />
        </span>
        <span className="sidebar-text logout-text">Logout</span>
      </div>
    </aside>
  );
}

export default Sidebar;
