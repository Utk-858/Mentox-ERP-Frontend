import { lazy } from "react";
const Sidebar = lazy(() => import("../../../components/SidebarStudent"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const SchoolDetailsForm = lazy(() => import("../components/SchoolDetailsForm"));

const SchoolDetails: React.FC = () => {
   
 
 
  return (
    <div className=" max-w-screen flex ">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full ml-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div><SchoolDetailsForm/></div>
        
      </div>
    </div>
  );
};
export default SchoolDetails;
