import { lazy } from "react";
const Sidebar = lazy(() => import("../../../components/SidebarTeacher"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const Summarystats = lazy(() => import("../components/Summarystats"));
const Topstudents = lazy(() => import("../components/Teacherdashboard/Topstudents"));
const StudentDirectory = lazy(() => import("../components/Teacherdashboard/StudentDirectory"));
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlinePeople } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
const Teacherdashboard: React.FC = () => {
    const sampleData = [
  { name: "Alex Johnson", score: "25/30", timeSpent: "15:24" },
  { name: "Emma Wilson", score: "20/30", timeSpent: "18:24" },
  { name: "Michael Cohen", score: "20/30", timeSpent: "18:24" },
  { name: "Sophia Garcia", score: "18/30", timeSpent: "18:24" },
  { name: "Sophia Garcia", score: "16/30", timeSpent: "18:24" },
];
const students = [
  {
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    className: "10B",
    timeTaken: "12:24 min",
    score: "14/30",
    lastActive: "2 hours ago",
  },
  {
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    className: "10A",
    timeTaken: "12:00 min",
    score: "20/30",
    lastActive: "2 hours ago",
  },
  {
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    className: "10A",
    timeTaken: "12:15 min",
    score: "23/30",
    lastActive: "2 hours ago",
  },
  {
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    className: "10A",
    timeTaken: "12:01 min",
    score: "19/30",
    lastActive: "2 hours ago",
  },
  {
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    className: "10A",
    timeTaken: "12:01 min",
    score: "19/30",
    lastActive: "2 hours ago",
  },
];

const handleViewQuizStudent = (index: number) => {
  alert(`Viewing quiz for ${students[index].name}`);
};
const handleViewQuiz = (index: number) => {
  alert(`Viewing quiz for student #${index + 1}`);
};
  return (
    <div className="max-w-screen h-full flex pr-8">
      <div>
        <Sidebar />
      </div>
      <div className="w-full mt-8 flex flex-col ml-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-4 mb-4">
            <Searchbar />
          </div>
        <div className="text-[2rem] font-[600] mt-4">
          Computer Communication Networks
        </div>
        <div className="w-[70rem] mb-6">
          <Summarystats
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
        <div><Topstudents students={sampleData} onViewQuiz={handleViewQuiz}/></div>
        <div><StudentDirectory students={students} onViewQuiz={handleViewQuizStudent}/></div>
      </div>
    </div>
  );
};
export default Teacherdashboard;
