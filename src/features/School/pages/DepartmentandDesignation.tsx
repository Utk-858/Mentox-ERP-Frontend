import { lazy } from "react";
const Sidebar = lazy(() => import("../../../components/SidebarStudent"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const DepartmentTable=lazy(() => import("../components/DepartmentTable"));
const DesignationTable=lazy(() => import("../components/DesignationTable"));
const DepartmentandDesignation: React.FC = () => {
   
 
 
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
            <div className="text-[2rem] font-[700]">Departments and Designation</div>
            <div className="text-[#363636] font-[400] text-[1.12rem]">Create, manage Department and Designation</div>
        </div>
        <div className="mt-4"><DepartmentTable/></div>
        <div className="mt-4"><DesignationTable/></div>
      </div>
    </div>
  );
};
export default DepartmentandDesignation;
