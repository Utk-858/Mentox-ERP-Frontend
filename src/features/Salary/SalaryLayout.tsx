import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin'; // Make sure this path is correct for your project

const SalaryLayout: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <aside className="lg:h-screen lg:sticky lg:top-0">
        <SidebarAdmin activeLabel="Dashboard" />
      </aside>
      
      {/* FIX: Add `min-w-0` to this div. This resolves the Firefox flexbox rendering issue. */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* We can likely remove the inner div and apply the max-width directly to main for cleaner code */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl w-full mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default SalaryLayout;