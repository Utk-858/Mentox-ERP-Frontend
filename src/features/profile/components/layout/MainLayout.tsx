// AFTER (in MainLayout.tsx)

import { Outlet } from 'react-router-dom';
import Sidebar from '../../../../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="flex">
        
    <aside className="h-screen sticky top-0 hidden lg:block">
      <Sidebar />
    </aside>

        {/* Main Content Area */}
        <div className="flex-1 p-3 sm:p-4 md:p-6">
          <main>
            <Outlet />
          </main>
        </div>

      </div>
    </div>
  );
};

export default MainLayout;