import { lazy } from "react";
const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const AssignedExam = lazy(() => import("../components/AssignedExam"));
const ExamAnalytics = lazy(() => import("../components/ExamAnalytics"));
const MarksEntry = lazy(() => import("../components/MarksEntry"));
import type { Exam } from "../components/AssignedExam";

const TeacherExam: React.FC = () => {
  const exams: Exam[] = [
  {
    title: "Mid-Term Examination",
    className: "11B",
    subject: "Science",
    dueDate: "6/12/2025",
    status: "In Progress",
  },
  {
    title: "End-Term Examination",
    className: "11B",
    subject: "Science",
    dueDate: "6/12/2025",
    status: "Not Started",
  },
  {
    title: "Unit Test",
    className: "11B",
    subject: "Science",
    dueDate: "6/12/2025",
    status: "Draft",
  },
];

  return (
    <div className="max-w-screen flex gap-8">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div className="text-[2rem] font-[600] mt-6">Exam Management</div>
        <div className="mt-6"><AssignedExam
        heading="My Assigned Exams"
        subheading="View and upload Results"
        exams={exams}
      /></div>
      <div className="flex gap-4 mt-4 mr-4">
        <div className="w-1/2"><ExamAnalytics/></div>
        <div className="w-1/2"><MarksEntry/></div>
      </div>
        
        
      </div>
    </div>
  );
};
export default TeacherExam;
