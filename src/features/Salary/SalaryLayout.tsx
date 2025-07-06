import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin'; 

const SalaryLayout: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <aside className="lg:h-screen lg:sticky lg:top-0">
        <SidebarAdmin activeLabel="Dashboard" />
      </aside>
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-full lg:max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalaryLayout;