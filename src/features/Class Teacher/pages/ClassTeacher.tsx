import { lazy, useState } from "react";
const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const StatCard = lazy(() => import("../components/StatCard"));
const DailyAttendance = lazy(() => import("../components/DailyAttendance"));
const AvgAttendanceCard = lazy(() => import("../components/AvgAttendanceCard"));
const LeaveRequests = lazy(() => import("../components/LeaveRequests"));
const Banner = lazy(() => import("../components/Banner"));
const TopStudentCard = lazy(
  () => import("../../Exam Management/components/TopStudentCard")
);
const ExamAnalytics = lazy(
  () => import("../../Exam Management/components/ExamAnalytics")
);
const StudentDirectory= lazy(
  () => import("../../Exam Management/components/StudentDirectory")
);
import { FaUserFriends } from "react-icons/fa";
import { BsBarChart } from "react-icons/bs";
import { MdOutlineBarChart } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";

import type { LeaveRequest } from "../components/LeaveRequests";

const ClassTeacher: React.FC = () => {
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
  const students = [
    {
      rollNo: 1,
      name: "Navya Jain",
      isPresent: true,
      attendancePercentage: 80,
    },
    {
      rollNo: 2,
      name: "Navya Jain",
      isPresent: true,
      attendancePercentage: 91,
    },
    {
      rollNo: 3,
      name: "Navya Jain",
      isPresent: false,
      attendancePercentage: 50,
    },
    {
      rollNo: 4,
      name: "Navya Jain",
      isPresent: true,
      attendancePercentage: 88,
    },
    {
      rollNo: 5,
      name: "kavya Jain",
      isPresent: true,
      attendancePercentage: 95,
    },
  ];
  const leaveData :LeaveRequest[] =[
    {
      id: 1,
      name: "John Doe",
      rollNumber: "21CS1001",
      className: "12",
      section: "A",
      contact: "9876543210",
      startDate: "2025-06-25",
      endDate: "2025-06-27",
      duration: "3 Days",
      reason: "Medical Leave",
      type: "Sick",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNumber: "21CS1002",
      className: "12",
      section: "A",
      contact: "9876543211",
      startDate: "2025-06-28",
      endDate: "2025-06-30",
      duration: "3 Days",
      reason: "Family Function",
      type: "Personal",
      status: "Pending",
    },
  ];

  const [selectedDate, setSelectedDate] = useState("2028-07-07");
  
  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
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
        <div className="flex gap-1 mt-6 w-full ">
          <StatCard
            title="Total Students"
            value={35}
            subtitle=""
            icon={FaUserFriends}
            iconBg="bg-[#8280FF]"
          />
          <StatCard
            title="Present students"
            value={30}
            subtitle="increase from last Day"
            trend="↑ 12%"
            icon={BsBarChart}
            iconBg="bg-[#D398E7]"
          />
          <StatCard
            title="Average monthly Attendance"
            value="96%"
            subtitle="increase from last Month"
            trend="↑ 12%"
            icon={MdOutlineBarChart}
            iconBg="bg-[#43C876]"
          />
          <StatCard
            title="Total Leaved Approved"
            value={35}
            subtitle="increase from last Month"
            trend="↑ 12%"
            icon={IoStatsChart}
            iconBg="bg-[#FEC53D]"
          />
        </div>
        <div className="flex gap-4 w-full ">
          <div className="w-full">
            {" "}
            <DailyAttendance
              selectedDate={selectedDate}
              initialData={students}
              
              onDateChange={handleDateChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <AvgAttendanceCard
                boysPercentage={47}
                girlsPercentage={53}
                boysCount={45.414}
                girlsCount={40.27}
              />
            </div>
            <div className="mr-6">
              {" "}
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
        </div>
        <div className="w-full mr-6">
          <LeaveRequests data={leaveData} />
        </div>
        <div className="flex gap-4 mt-4 w-full">
          <div className="w-full">
            <ExamAnalytics />
          </div>

          <div className="w-full flex flex-col gap-2 mr-6">
            <Banner
              title="ATTENDANCE SCHEME"
              subtitle="See Detailed Attendance Charts & Analytics"
              buttonText="Attendance Chart"
              bgColor="bg-[#702DFF]"
              headingColor="text-white"
              subheadingColor="text-white"
              backgroundImageSrc="/container.png"
              onClick={() => console.log("Go to chart page")}
            />
            <Banner
              title="VIEW STUDENT DETAILS"
              subtitle="View Student’s Basic
Details and Quick Access to
Profiles"
              buttonText="Go to Student Details"
              bgColor="bg-[#F5F5F7]"
              headingColor="text-black"
              subheadingColor="text-[#702DFF]"
              backgroundImageSrc="/test7.png"
              onClick={() => console.log("Go to chart page")}
            />
          </div>
        </div>
        <div><StudentDirectory
            heading="Student Directory"
            subheading="View and manage all your students"
            stats={stats}
            students={studentData}
          /></div>
      </div>
    </div>
  );
};
export default ClassTeacher;
