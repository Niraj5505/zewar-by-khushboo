import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useCmsStore } from '../lib/cmsStore';

export const AdminLayout = () => {
  const isCollapsed = useCmsStore((s) => s.isSidebarCollapsed);
  const isMobileSidebarOpen = useCmsStore((s) => s.isMobileSidebarOpen);
  const closeMobileSidebar = useCmsStore((s) => s.closeMobileSidebar);
  const location = useLocation();

  // Auto-close mobile sidebar whenever route changes
  useEffect(() => {
    closeMobileSidebar();
  }, [location.pathname, closeMobileSidebar]);

  // Handle Escape key to close mobile sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileSidebarOpen) {
        closeMobileSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileSidebarOpen, closeMobileSidebar]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-espresso font-sans flex relative overflow-x-hidden">
      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-espresso/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={closeMobileSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 w-full ml-0 ${
          isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        }`}
      >
        {/* Sticky Topbar */}
        <Topbar />

        {/* Content Shell */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

