import { lazy } from "react";
const Sidebar = lazy(() => import("../../../components/SidebarTeacher"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const DatesheetTable = lazy(() => import("../components/DatesheetTable"));
const Datesheet: React.FC = () => {
  const sampleData = [
    {
      academicYear: "2024–25",
      examType: "Mid-Term",
      className: "5th",
      subjectCount: 5,
      createdOn: "01-June-2024",
    },
    {
      academicYear: "2024–25",
      examType: "Mid-Term",
      className: "6th",
      subjectCount: 5,
      createdOn: "01-June-2024",
    },
    {
      academicYear: "2024–25",
      examType: "Mid-Term",
      className: "7th",
      subjectCount: 5,
      createdOn: "01-June-2024",
    },
    {
      academicYear: "2024–25",
      examType: "Mid-Term",
      className: "9th",
      subjectCount: 5,
      createdOn: "01-June-2024",
    },
    {
      academicYear: "2024–25",
      examType: "Mid-Term",
      className: "10th",
      subjectCount: 5,
      createdOn: "01-June-2024",
    },
  ];
  return (
    <div className="max-w-screen flex gap-4">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div className="text-[2rem] font-[700] mt-6">Datesheet</div>
        <div className="text-[1.1rem] text-[#363636] font-[400] mb-4">
          Create, manage and analyze your quizzes
        </div>
        <div>
          <DatesheetTable data={sampleData} />
        </div>
      </div>
    </div>
  );
};
export default Datesheet;
