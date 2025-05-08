import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ReactNiceAvatar from "react-nice-avatar";
import { motion } from "framer-motion";
import "./Sidebar.css";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const userName = localStorage.getItem("userName") || "User";
  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/transactions", icon: Receipt, label: "Transactions" },
    { path: "/budget", icon: PiggyBank, label: "Budget" },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className={`sidebar ${
        isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"
      }`}
    >
      <div className="flex flex-col flex-grow p-2 overflow-y-auto">
        {/* Toggle button */}
        <div className="flex justify-end mb-6">
          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{ rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={onToggle}
            className={`sidebar-toggle text-gray-400 hover:text-white p-2 ${
              isCollapsed ? "mx-auto" : ""
            }`}
          >
            {isCollapsed ? (
              <ChevronRight size={28} />
            ) : (
              <ChevronLeft size={28} />
            )}
          </motion.button>
        </div>

        {/* Navigation links */}
        <ul className="space-y-1" style={{ marginLeft: "-25px" }}>
          {navItems.map(({ path, icon: Icon, label }, index) => (
            <motion.li
              key={path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={path}
                className={`nav-item ${
                  location.pathname === path
                    ? "nav-item-active"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <span
                  className={`flex items-center justify-center transition-all duration-200 ${
                    isCollapsed ? "w-full" : "mr-3"
                  }`}
                  style={{ minWidth: "1rem" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={18} />
                  </motion.div>
                </span>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Bottom avatar section */}
      <div
        className={`avatar-section ${isCollapsed ? "collapsed" : "expanded"}`}
      >
        <div className="avatar-container">
          <ReactNiceAvatar className="w-8 h-8" />
        </div>
        {!isCollapsed && (
          <span className="ml-3 text-sm font-medium whitespace-nowrap">
            {userName}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;
