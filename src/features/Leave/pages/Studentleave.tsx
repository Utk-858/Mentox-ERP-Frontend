import { lazy } from "react";
import { useState } from "react";
import AttendanceCalendar from "../components/AttendanceCalendar";
import LeaveTable from "../components/LeaveTable";

const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const StatCard = lazy(() => import("../components/StatCard"));
const LeaveBalanceChart = lazy(() => import("../components/LeaveBalanceChart"));
const AttendanceCard=lazy(() => import("../../libraryms/components/Librarian/AttendanceCard"));
const ProductiveHoursChart=lazy(() => import("../components/ProductiveHoursChart"));
const Totalattendancecard=lazy(() => import("../components/Totalattendancecard"));
const ApplyLeaveForm=lazy(() => import("../components/ApplyLeaveForm"));
const Studentleave: React.FC = () => {
    type LeaveTableData = {
  leaveType: string;
  from: string;
  to: string;
  days: number;
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
  approver: string;
};

  const leaveData = [
    { type: "Sick Leaves", count: 8, total: 15 },
    { type: "Casual Leaves", count: 4, total: 15 },
    { type: "Earned Leaves", count: 10, total: 15 },
  ];
  const dummyLeaves: LeaveTableData[] = [
  {
    leaveType: "Casual",
    from: "31 Dec 2020",
    to: "10 Jan 2021",
    days: 1,
    status: "Pending",
    reason: "Travelling to village",
    approver: "Avinash Pratap",
  },
  {
    leaveType: "Casual",
    from: "31 Dec 2020",
    to: "10 Jan 2021",
    days: 1,
    status: "Approved",
    reason: "Travelling to village",
    approver: "Avinash Sharma",
  },
  {
    leaveType: "Casual",
    from: "31 Dec 2020",
    to: "10 Jan 2021",
    days: 1,
    status: "Rejected",
    reason: "Feeling Low",
    approver: "Avinash Jain",
  },
];
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? leaveData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === leaveData.length - 1 ? 0 : prev + 1));
  };

  const current = leaveData[index];
  return (
    <div className="max-w-screen flex ">
      <div>
        <Sidebar />
      </div>
      <div className="w-full flex flex-col ml-8 ">
        <div className="mt-8">
          <Searchbar />
        </div>
        <div className="text-[2rem] font-[600] mt-4">Leaves</div>
        <div className="flex gap-6 ">
          <StatCard
            count={10}
            labelLine1="Available"
            labelLine2="Leaves"
            bgColor="bg-[#D7F5E4]"
            textColor="text-[#063123]"
          />
          <StatCard
            count={2}
            labelLine1="Approved"
            labelLine2="Balance"
            bgColor="bg-[#D7F5E4]"
            textColor="text-[#222222]"
          />
          <StatCard
            count={3}
            labelLine1="Rejected"
            labelLine2="Leaves"
            bgColor="bg-[#FFE3E3]"
            textColor="text-[#7B0909]"
          />
          <StatCard
            count={2}
            labelLine1="Pending"
            labelLine2="Leave requests"
            bgColor="bg-[#FFE493]"
            textColor="text-[#222222]"
          />
        </div>
        <div className="mt-4 flex gap-5">
          <div>
            <LeaveBalanceChart
              leaveType={current.type}
              leaveCount={current.count}
              totalLeaves={current.total}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>
          <div className="w-[17rem] h-[12rem] "><AttendanceCard/></div>
          <div><ProductiveHoursChart/></div>
        </div>
        <div className="mt-6 flex gap-6">
            <div className="flex flex-col gap-6">
                <div><AttendanceCalendar/></div>
                <div><Totalattendancecard data={{ percentage: 85, total: 110 }}/></div>

            </div>
            <div><ApplyLeaveForm/></div>    
        </div>
        <div className="mt-6"><LeaveTable leaves={dummyLeaves}  /></div>
      </div>
    </div>
  );
};
export default Studentleave;
