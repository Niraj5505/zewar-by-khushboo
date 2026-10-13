import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useCmsStore } from '../lib/cmsStore';

export const AdminLayout = () => {
  const isCollapsed = useCmsStore((s) => s.isSidebarCollapsed);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-espresso font-sans flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'ml-[72px]' : 'ml-[260px]'
        }`}
      >
        {/* Sticky Topbar */}
        <Topbar />

        {/* Content Shell */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1440px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
