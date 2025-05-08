import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      {/* Fixed Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Sidebar + Content Layout (starts below navbar) */}
      <div className="pt-[64px] flex">
        {/* Sidebar positioned below navbar */}
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

        {/* Main content */}
        <main
          className={`flex-grow transition-all duration-300 p-4 bg-light min-h-[calc(100vh-64px)] ${
            isSidebarCollapsed ? 'ml-[5px]' : 'ml-[170px]'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
