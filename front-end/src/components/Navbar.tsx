import React, { useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = useCallback(() => {
    try {
      logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  }, [logout, navigate]);

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid px-4">
        <Link 
          to="/dashboard" 
          className="navbar-brand d-flex align-items-center gap-2"
        >
          <LayoutDashboard size={24} />
          <span className="font-semibold">Budget Tracker</span>
        </Link>

        <button 
          className="navbar-toggler"
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                to="/dashboard" 
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/transactions" 
                className={`nav-link ${location.pathname === '/transactions' ? 'active' : ''}`}
              >
                Transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/budget" 
                className={`nav-link ${location.pathname === '/budget' ? 'active' : ''}`}
              >
                Budget
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            <button 
              onClick={handleLogout}
              className="btn btn-outline-light d-flex align-items-center gap-2"
            >
              <LogOut size={18} />
              <span className="d-none d-sm-inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;