import "bootstrap/dist/css/bootstrap.min.css";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Target,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon, label, onClick }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`d-flex align-items-center gap-2 px-3 py-2 rounded ${
        isActive ? "bg-primary text-white" : "text-white text-opacity-75"
      } text-decoration-none`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );
};

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className={`bg-primary text-white p-4 d-flex flex-column position-fixed top-0 start-0 vh-100 shadow-lg ${
          sidebarOpen ? "" : "d-none d-md-flex"
        }`}
        style={{ width: "250px", zIndex: 1040 }}
      >
        <h2 className="fw-bold mb-4">Finance<span className="text-light">Tracker</span></h2>
        <Nav className="flex-column flex-grow-1">
          <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={() => setSidebarOpen(false)} />
          <SidebarLink to="/goals" icon={Target} label="Goals" onClick={() => setSidebarOpen(false)} />
          <SidebarLink to="/settings" icon={Settings} label="Settings" onClick={() => setSidebarOpen(false)} />
        </Nav>
        <Button
          variant="danger"
          onClick={handleLogout}
          className="mt-auto d-flex align-items-center gap-2"
        >
          <LogOut size={16} /> Logout
        </Button>
      </div>

      {/* Sidebar Toggle (Mobile) */}
      <Button
        variant="outline-primary"
        className="d-md-none position-absolute m-3 z-3"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Main Content */}
      <main className="flex-grow-1 ms-md-5 ms-lg-4 p-4" style={{ marginLeft: "250px" }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
