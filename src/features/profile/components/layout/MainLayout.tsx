import { Outlet } from 'react-router-dom';
import Sidebar from '../../../../components/Sidebar';
import SearchBar from '../../../../components/SearchBar';

const MainLayout = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="flex">
        
        {/* Sidebar */}
        {/* These 3 classes make the sidebar sticky: h-screen, sticky, and top-0 */}
        <aside className="w-64 h-screen sticky top-0 hidden lg:block">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 p-3 sm:p-4 md:p-6">
          <header className="mb-4 md:mb-6">
            <SearchBar />
          </header>
          <main>
            <Outlet />
          </main>
        </div>

      </div>
    </div>
  );
};

export default MainLayout;