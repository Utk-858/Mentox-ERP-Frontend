import { lazy, useState } from "react";
import { MdOutlineQueryStats } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdCoPresent } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import type { AttendanceRow } from "../components/AttendanceOverviewTable";
import type { LeaveRequest } from "../components/LeaveRequests";
const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const DateTime = lazy(() => import("../components/DateTime"));
const AttendanceStatCard = lazy(
  () => import("../components/AttendanceStatCard")
);
const AttendanceOverviewTable = lazy(
  () => import("../components/AttendanceOverviewTable")
);
const BarChartAttendance = lazy(
  () => import("../components/BarChartAttendance")
);
const LeaveRequests = lazy(() => import("../components/LeaveRequests"));
const StudentBanner = lazy(() => import("../components/StudentBanner"));
const Teacher: React.FC = () => {
  const leaveData :LeaveRequest[]= [
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

  const handleDownload = () => {
    alert("Excel downloaded!");
  };
  const studentData:AttendanceRow[]= [
    {
      id: 1,
      name: "Navya Jain",
      rollNo: 1,
      class: "10",
      status: "Present",
      percentage: "80%",
    },
    {
      id: 2,
      name: "Navya Jain",
      rollNo: 2,
      class: "10",
      status: "Present",
      percentage: "91%",
    },
    {
      id: 3,
      name: "Navya Jain",
      rollNo: 3,
      class: "10",
      status: "Absent",
      percentage: "50%",
    },
    {
      id: 4,
      name: "Navya Jain",
      rollNo: 12,
      class: "10",
      status: "Present",
      percentage: "88%",
    },
    {
      id: 5,
      name: "Navya Jain",
      rollNo: 15,
      class: "10",
      status: "Absent",
      percentage: "95%",
    },
    {
      id: 6,
      name: "Navya Jain",
      rollNo: 16,
      class: "10",
      status: "Absent",
      percentage: "95%",
    },
     {
      id: 7,
      name: "Navya Jain",
      rollNo: 16,
      class: "10",
      status: "Absent",
      percentage: "95%",
    },
     {
      id: 8,
      name: "Navya Jain",
      rollNo: 16,
      class: "10",
      status: "Absent",
      percentage: "95%",
    },
    // ...more rows
  ];

  return (
    <div className=" max-w-screen flex ">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full ml-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <Searchbar />
        </div>
        <div className="flex justify-between mt-8 gap-2 w-full ">
          <div className="flex flex-col gap-2 w-2/4">
            <div className="flex gap-2 w-full">
              <div className="w-full">
                <DateTime />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <AttendanceStatCard
                  value={52}
                  label="Total Students"
                  icon={
                    <MdOutlinePeopleAlt size={30} className="text-[#702DFF]" />
                  }
                  iconBg="bg-[#DDDCF9]"
                  differenceText=""
                  differenceColor=""
                  differenceBg=""
                />
                <AttendanceStatCard
                  value="96%"
                  label="Average Attendance "
                  icon={
                    <MdOutlineQueryStats size={22} className="text-green-600" />
                  }
                  iconBg="bg-green-100"
                  differenceText="+3% Increase than yesterday"
                  differenceColor="text-[#252C58]"
                  differenceBg="bg-red-100"
                />
              </div>
            </div>
            <div className="mt-3">
              <BarChartAttendance />
            </div>
            <div className="w-full mt-3">
              <StudentBanner
                label="View Student Details"
                title="Quick Access to Profiles"
                buttonText="Go to Student Details"
                onClick={() => alert("Navigating to student details...")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-2/4 mr-8 ">
            <div className="flex gap-4 w-full">
              <AttendanceStatCard
                value={60}
                label="Present"
                icon={
                  <MdCoPresent size={30} className="text-green-600" />
                }
                iconBg="bg-[#9AFFC1]"
                differenceText="10% Less than yesterday"
                differenceColor="text-[#252C58]"
                differenceBg="bg-red-100"
              />

              <AttendanceStatCard
                value={30}
                label="Absent"
                icon={
                  <IoIosStats size={30} className="text-white" />
                }
                iconBg="bg-[#FF0000]"
                differenceText="+3% Increase than yesterday"
                differenceColor="text-[#252C58]"
                differenceBg="bg-red-100"
              />
            </div>
            <div className="">
              {" "}
              <AttendanceOverviewTable
                date={selectedDate}
                onDateChange={setSelectedDate}
                onDownload={handleDownload}
                data={studentData}
              />
            </div>
          </div>
        </div>
        <div>
          <LeaveRequests data={leaveData} />
        </div>
      </div>
    </div>
  );
};
export default Teacher;
