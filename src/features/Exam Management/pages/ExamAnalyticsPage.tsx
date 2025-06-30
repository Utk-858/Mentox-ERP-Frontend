import { lazy } from "react";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlinePeople } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
const Sidebar = lazy(() => import("../../../components/SidebarStudent"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const SummaryStats = lazy(() => import("../../qms/components/Summarystats"));
const ScoreDistribution = lazy(() => import("../components/ScoreDistribution"));
const PassFail = lazy(() => import("../components/PassFail"));
const TopStudentCard = lazy(() => import("../components/TopStudentCard"));
const AnalyticsDirectory= lazy(() => import("../components/AnalyticsDirectory"));
const ExamAnalyticsPage: React.FC = () => {
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

 
  return (
    <div className="max-w-screen flex gap-8 ">
      <div>
        <Sidebar />
      </div>
      <div className="w-full flex flex-col">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div className="flex justify-between mt-6 mr-4">
          <div className="font-[500] text-[1.5rem]">
            Academic Year : 2024-25
          </div>
          <div className="font-[500] text-[1.5rem]">Class : 10-A</div>
          <div className="font-[500] text-[1.5rem]">Section : A</div>
          <div className="font-[500] text-[1.5rem]">Exam Name : Mid-Term</div>
        </div>
        <div className="mr-4">
          <SummaryStats
            stats={[
              {
                label: "Total Participants",
                value: `28`,
                icon: <IoBookOutline />,
              },
              {
                label: "Avg Completion Time",
                value: "12:45",
                icon: <MdOutlineCalendarToday />,
              },
              {
                label: "Average Score",
                value: "15/30",
                icon: <MdOutlinePeople />,
              },
              { label: "Top Score", value: "25/30", icon: <VscGraph /> },
            ]}
          />
        </div>
        <div className="flex mt-12 gap-4 w-full">
          <div>
            <ScoreDistribution />
          </div>
          <div className="">
            <PassFail data={{ passPercentage: 75, trendChange: 8.5 }} />
          </div>
          <div className="">
            <TopStudentCard
              students={[
                {
                  name: "Hemish Jain",
                  percentage: 94,
                  avatarUrl: "/avatars/hemish1.jpg",
                },
                {
                  name: "Hemish Jain",
                  percentage: 94,
                  avatarUrl: "/avatars/hemish2.jpg",
                },
                {
                  name: "Hemish Jain",
                  percentage: 94,
                  avatarUrl: "/avatars/hemish3.jpg",
                },
              ]}
            />
          </div>
        </div>
        <div><AnalyticsDirectory
            heading="Student Directory"
            subheading="View and manage all your students"
            
            students={studentData}
          /></div>
      </div>
    </div>
  );
};
export default ExamAnalyticsPage;
