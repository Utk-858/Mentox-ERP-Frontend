import { Outlet, useLocation } from 'react-router-dom';

import SidebarStudent from '../../../../components/SidebarStudent';
import SidebarTeacher from '../../../../components/SidebarTeacher';

import SidebarAdmin from '../../../../components/SidebarAdmin';


const MainLayout = () => {
 
  const location = useLocation();

  const renderSidebar = () => {
    if (location.pathname.includes('/Profile/student')) {
      return <SidebarStudent activeLabel="Profile" />;
    }
    if (location.pathname.includes('/profile/teacher')) {
      return <SidebarTeacher activeLabel="Profile" />;
    }

    return <SidebarAdmin activeLabel="Profile" />; 
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex">
    
        <aside className="h-screen sticky top-0 hidden lg:block">
          {renderSidebar()}
        </aside>

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