import { lazy } from "react";
const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const ExamCard = lazy(() => import("../components/ExamCard"));
const StudentDirectory = lazy(() => import("../components/StudentDirectory"));
const GradingScheme= lazy(() => import("../components/GradingScheme"));
const SearchDatesheet= lazy(() => import("../components/SearchDatesheet"));
const ExamAnalytics= lazy(() => import("../components/ExamAnalytics"));
const MarksPortal= lazy(() => import("../components/MarksPortal"));
type ExamStatus = "Active" | "Upcoming" | "Completed";

type Exam = {
  title: string;
  className: string;
  dateRange: string;
  status: ExamStatus;
};

const Exammanagement: React.FC = () => {
  const examData: Exam[] = [
  {
    title: "End-Term Examination",
    className: "10th Class",
    dateRange: "2nd April 2025 to 7th April 2025",
    status: "Active", // ✅ exact string literal
  },
  {
    title: "Mid-Term Examination",
    className: "10th Class",
    dateRange: "2nd April 2025 to 7th April 2025",
    status: "Upcoming",
  },
  {
    title: "Mid-Term Examination",
    className: "10th Class",
    dateRange: "2nd April 2025 to 7th April 2025",
    status: "Completed",
  },
];

  const studentData = [
    {
      rollNo: 1,
      name: "Alex Johnson",
      className: "10A",
      profilePic: "/alex1.jpg",
      cumulativeScore: "470",
      total: "500",
      grade: "-",
    },
    {
      rollNo: 2,
      name: "Alex Johnson",
      className: "10A",
      profilePic: "/alex2.jpg",
      cumulativeScore: "420",
      total: "500",
      grade: "-",
    },
    {
      rollNo: 3,
      name: "Alex Johnson",
      className: "10A",
      profilePic: "/alex2.jpg",
      cumulativeScore: "420",
      total: "500",
      grade: "-",
    },
    {
      rollNo: 4,
      name: "Alex Johnson",
      className: "10A",
      profilePic: "/alex2.jpg",
      cumulativeScore: "420",
      total: "500",
      grade: "-",
    }
  ];

  const stats = {
    examName: "Mid Term",
    averageScore: "420/500",
    averageGrade: "A",
    passingRate: "88%",
  };
  return (
    <div className=" max-w-screen flex ">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full ml-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div className="text-[2rem] font-[600] mt-4">Exam Management</div>
        <div>
          {" "}
          <ExamCard
            heading="Exam Schedule"
            subheading="View and manage your scheduled Exam events"
            exams={examData}
          />
        </div>
        <div>
          <StudentDirectory
            heading="Student Directory"
            subheading="View and manage all your students"
            stats={stats}
            students={studentData}
          />
        </div>
        <div className="flex mt-4 gap-4">
            <div className="w-1/2 flex flex-col gap-4">
                <div><GradingScheme/></div>
                <div><ExamAnalytics/></div>
            </div>
            <div className="w-1/2 flex flex-col gap-4 mr-6">
                <div><SearchDatesheet/></div>
                <div><MarksPortal/></div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Exammanagement;
