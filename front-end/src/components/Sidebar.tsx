import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Receipt, PiggyBank, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/transactions', icon: Receipt, label: 'Transactions' },
    { path: '/budget', icon: PiggyBank, label: 'Budget' }
  ];

  return (
    <div 
      className={`bg-gray-900 text-white transition-all duration-300 ${
        isCollapsed ? 'w-[60px]' : 'w-[250px]'
      }`}
      style={{ minHeight: '100vh' }}
    >
      <div className="p-3">
        <button
          onClick={onToggle}
          className="w-full mb-4 p-2 text-gray-300 hover:bg-gray-800 rounded transition-colors flex justify-center items-center"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <ul className="nav flex-column">
          {navItems.map(({ path, icon: Icon, label }) => (
            <li key={path} className="nav-item mb-2">
              <Link
                to={path}
                className={`nav-link d-flex align-items-center px-3 py-2 rounded transition-colors ${
                  location.pathname === path
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={18} className={isCollapsed ? 'mx-auto' : 'me-3'} />
                {!isCollapsed && <span>{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;