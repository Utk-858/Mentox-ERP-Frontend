

import { lazy, Suspense } from "react";


// Lazy loaded components
const Sidebar = lazy(() => import("../../../components/SidebarTeacher"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const StatCard = lazy(() => import("../components/StatCard"));
const LeaveManager = lazy(() => import("../components/LeaveManager"));
const LeaveCategoryCard = lazy(() => import("../components/LeaveCategoryCard"));
const HolidayEventCard = lazy(() => import("../components/HolidayEventCard"));

// Union type for leave types
type LeaveType = "Medical" | "Casual" | "Half Day" | "Special";

interface Leave {
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  leaveType: LeaveType; // ✅ Fixed: leaveType must match expected LeaveType
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
}


const Adminleave: React.FC = () => {
  const mockLeaves: Leave[] = [
    {
      employeeName: "Navya Jain",
      employeeId: "Emp234",
      department: "Chemistry",
      position: "PGT",
      leaveType: "Medical",
      fromDate: "29th March 2025",
      toDate: "2nd April 2025",
      days: 5,
      reason: "Going Hometown",
    },
    {
      employeeName: "Ravi Mehta",
      employeeId: "Emp101",
      department: "Mathematics",
      position: "TGT",
      leaveType: "Casual",
      fromDate: "10th April 2025",
      toDate: "12th April 2025",
      days: 3,
      reason: "Family function",
    },
    {
      employeeName: "Ankita Sharma",
      employeeId: "Emp115",
      department: "English",
      position: "PGT",
      leaveType: "Half Day",
      fromDate: "5th April 2025",
      toDate: "5th April 2025",
      days: 0.5,
      reason: "Doctor appointment",
    },
    {
      employeeName: "Vikas Rathi",
      employeeId: "Emp212",
      department: "Physics",
      position: "TGT",
      leaveType: "Special",
      fromDate: "15th April 2025",
      toDate: "20th April 2025",
      days: 6,
      reason: "Attending conference",
    },
    {
      employeeName: "Meena Kumari",
      employeeId: "Emp307",
      department: "Biology",
      position: "PGT",
      leaveType: "Casual",
      fromDate: "1st May 2025",
      toDate: "3rd May 2025",
      days: 3,
      reason: "Out of town travel",
    },
    {
      employeeName: "Sandeep Yadav",
      employeeId: "Emp198",
      department: "Geography",
      position: "TGT",
      leaveType: "Medical",
      fromDate: "25th April 2025",
      toDate: "30th April 2025",
      days: 6,
      reason: "Surgery recovery",
    },
    {
      employeeName: "Priya Verma",
      employeeId: "Emp256",
      department: "History",
      position: "PGT",
      leaveType: "Half Day",
      fromDate: "9th April 2025",
      toDate: "9th April 2025",
      days: 0.5,
      reason: "Bank work",
    },
    {
      employeeName: "Rahul Singh",
      employeeId: "Emp140",
      department: "Computer Science",
      position: "PGT",
      leaveType: "Special",
      fromDate: "18th April 2025",
      toDate: "22nd April 2025",
      days: 5,
      reason: "Technical seminar",
    },
    {
      employeeName: "Sneha Kapoor",
      employeeId: "Emp309",
      department: "Economics",
      position: "TGT",
      leaveType: "Medical",
      fromDate: "3rd May 2025",
      toDate: "6th May 2025",
      days: 4,
      reason: "Fever and rest",
    },
    {
      employeeName: "Amit Thakur",
      employeeId: "Emp177",
      department: "Commerce",
      position: "PGT",
      leaveType: "Casual",
      fromDate: "11th May 2025",
      toDate: "13th May 2025",
      days: 3,
      reason: "Religious trip",
    },
  ];

 

  
  return (
    <div className="max-w-screen flex">
      <div>
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <Sidebar />
        </Suspense>
      </div>
      <div className="flex flex-col w-full ml-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-8">
          <Suspense fallback={<div>Loading Searchbar...</div>}>
            <Searchbar />
          </Suspense>
        </div>

        <div className="flex gap-6">
          <StatCard count={20} labelLine1="Leave" labelLine2="Requests" bgColor="bg-[#D7F5E4]" textColor="text-[#063123]" />
          <StatCard count={50} labelLine1="Approved" labelLine2="Leaves" bgColor="bg-[#D7F5E4]" textColor="text-[#222222]" />
          <StatCard count={16} labelLine1="Leave" labelLine2="Without Pay" bgColor="bg-[#FFE3E3]" textColor="text-[#7B0909]" />
          <StatCard count={30} labelLine1="Pending" labelLine2="Requests" bgColor="bg-[#FFE493]" textColor="text-[#222222]" />
        </div>
        <div className="flex mt-4 w-full gap-6">
            <div className="w-1/2"><LeaveCategoryCard/></div>
            <div className="w-1/2 mr-6"><HolidayEventCard/></div>

        </div>
        <div className="mt-6">
          <LeaveManager leaves={mockLeaves} />
        </div>

        
      </div>
    </div>
  );
};

export default Adminleave;
