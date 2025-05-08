import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    try {
      toast.success("Logged out successfully");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to Logout");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <LayoutDashboard size={24} />
          <span>Budget Tracker</span>
        </Link>

        {/* Center Navigation Links */}
        <div className="d-flex align-items-center gap-4 nav-center">
          <Link
            to="/"
            className={`nav-link ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className={`nav-link ${
              location.pathname === "/transactions" ? "active" : ""
            }`}
          >
            Transactions
          </Link>
          <Link
            to="/budget"
            className={`nav-link ${
              location.pathname === "/budget" ? "active" : ""
            }`}
          >
            Budget
          </Link>
        </div>

        {/* Right-aligned Logout Button */}
        <div className="d-flex align-items-center ms-auto">
          <button
            onClick={handleLogout}
            className="btn btn-outline-light d-flex align-items-center gap-2 btn-logout"
          >
            <LogOut size={18} />
            <span className="d-none d-sm-inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
