import { lazy } from "react";

const Sidebar = lazy(() => import("../../../components/SidebarStudent"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const ResultCard = lazy(() => import("../components/ResultCard"));
const AnnualResult = lazy(() => import("../components/AnnualResult"));
const Examwiseresult = lazy(() => import("../components/Examwiseresult"));
const StudentResult: React.FC = () => {
    type ExamStatus = "Unit Test" | "Mid-Term" | "End-Term";
    interface Exam {
      title: string;
      className: string;
      subject: string;
      dueDate: string;
      status: "Completed";
      type: ExamStatus;
    }
  const exams: Exam[] = [
    {
      title: "Mid-Term Examination",
      className: "11B",
      subject: "Maths",
      dueDate: "6/12/2025",
      status: "Completed",
      type: "Mid-Term",
    },
    {
      title: "End-Term Examination",
      className: "11B",
      subject: "Science",
      dueDate: "6/12/2025",
      status: "Completed",
      type: "End-Term",
    },
    {
      title: "Unit Test",
      className: "11B",
      subject: "Science",
      dueDate: "6/12/2025",
      status: "Completed",
      type: "Unit Test",
    },
  ];
  return (
    <div className="max-w-screen flex gap-8 ">
      <div>
        <Sidebar />
      </div>
      <div className="w-full flex flex-col">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div className="font-[600] text-[2rem] mt-4">Exam Management</div>
        <div>
          <ResultCard exams={exams} />
        </div>
        <div className="flex w-full gap-4 mt-4">
            <div className="w-1/2"><AnnualResult/></div>
            <div className="w-1/2"><Examwiseresult/></div>
        </div>
      </div>
    </div>
  );
};
export default StudentResult;
