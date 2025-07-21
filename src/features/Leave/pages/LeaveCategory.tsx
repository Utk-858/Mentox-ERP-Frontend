// Teacherleave.tsx

import { lazy, Suspense } from "react";

// Lazy loaded components
const Sidebar = lazy(() => import("../../../components/SidebarTeacher"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const LeaveCategoryTable = lazy(
  () => import("../components/LeaveCategoryTable")
);
const LeaveCategory: React.FC = () => {
  return (
    <div className="max-w-screen flex">
      <div>
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <Sidebar />
        </Suspense>
      </div>
      <div className="flex flex-col w-full ml-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-8">
          <Suspense fallback={<div>Loading Searchbar...</div>}>
            <Searchbar />
          </Suspense>
        </div>
        <div className="mr-8"><LeaveCategoryTable/></div>
      </div>
    </div>
  );
};

export default LeaveCategory;
