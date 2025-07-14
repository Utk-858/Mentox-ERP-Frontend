import { lazy } from "react";
const Sidebar = lazy(() => import("../../../components/SidebarStudent"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const CreateSubjectsDatabase = lazy(() => import("../components/CreateSubjectsDatabase"));
const SubjectDatabase: React.FC = () => {
   
 
 
  return (
    <div className=" max-w-screen flex ">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full ml-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div className="text-[2rem] font-[700] mt-4">Subject Database</div>
        <div className="mt-4 mr-8"><CreateSubjectsDatabase/></div>
        
      </div>
    </div>
  );
};
export default SubjectDatabase;
