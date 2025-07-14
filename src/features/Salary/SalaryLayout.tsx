import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin'; // Or your specific sidebar

const SalaryLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100"> 
      <aside className="h-screen sticky top-0">
        <SidebarAdmin activeLabel ="Dashboard"/>
      </aside>

      {/* The main content area that will fill the remaining space */}
      <div className="flex-1 flex flex-col"> 
        {/* The <header> and <SearchBar /> have been removed */}
        <main className="flex-1 p-6">
          <Outlet /> {/* This will render your pages like SalaryDashboardPage */}
        </main>
      </div>
    </div>
  );
};

export default SalaryLayout;