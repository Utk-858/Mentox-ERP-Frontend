import { lazy } from "react";
const Sidebar = lazy(() => import("../../../components/SidebarStudent"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const ClassesAndSectionsTable = lazy(() => import("../components/ClassesandSectionsTable"));
const ClassandSection: React.FC = () => {
   
 
 
  return (
    <div className=" max-w-screen flex ">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full ml-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div className="flex flex-col mt-4">
            <div className="text-[1.5rem] font-[600]">Classes and Sections Setup</div>
            <div className="text-[#363636] font-[400] text-[1.25rem]">View and edit each class and it’s sections</div>
        </div>
        <div className="mt-4"><ClassesAndSectionsTable/></div>
        
      </div>
    </div>
  );
};
export default ClassandSection;
