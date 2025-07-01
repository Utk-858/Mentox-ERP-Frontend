import { lazy } from "react";
import type { StudentRow } from "../components/StudentDetailsTable";
const Sidebar = lazy(() => import("../../../components/SidebarTeacher"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const StudentDetailsTable = lazy(() => import("../components/StudentDetailsTable"));
const StudentDetails: React.FC = () => {
  const demoStudents: StudentRow[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  rollNo: i + 1,
  avatarUrl: "https://i.pravatar.cc/40?img=" + ((i % 70) + 1),
  studentName: "Alex Johnson",
  className: "10A",
  parentName: "Mike Johnson",
  parentContact: "+91 9876303678",
  parentEmail: "email@gmail.com",
}));
  return (
    <div className=" max-w-screen flex ">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full ml-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div><StudentDetailsTable data={demoStudents} /></div>
          
            
      </div>
    </div>
  );
};
export default StudentDetails;
