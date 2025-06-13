import { lazy } from "react";
import { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";

const Sidebar = lazy(() => import("../../../components/Sidebar"));
const Searchbar = lazy(() => import("../../../components/SearchBar"));
const StatCard = lazy(() => import("../components/StatCard"));
const LeaveManager = lazy(() => import("../components/LeaveManager"));
const LeaveCategoryManager = lazy(
  () => import("../components/LeaveCategoryManager")
);
const HolidayTable = lazy(() => import("../components/HolidayTable"));
const Teacherleave: React.FC = () => {
  const mockLeaves = [
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
  const [holidays, setHolidays] = useState([
    {
      name: "Diwali Break",
      from: "2020-12-31",
      to: "2021-01-10",
      duration: 11,
    },
    {
      name: "Holi Break",
      from: "2020-12-31",
      to: "2021-01-10",
      duration: 11,
    },
    {
      name: "Independence Day",
      from: "2020-08-15",
      to: "2020-08-15",
      duration: 1,
    },
  ]);

  const handleEdit = (index: number, updatedHoliday: any) => {
    const updated = [...holidays];
    updated[index] = updatedHoliday;
    setHolidays(updated);
  };

  const handleDelete = (index: number) => {
    const updated = holidays.filter((_, i) => i !== index);
    setHolidays(updated);
  };

  const handleAdd = (newHoliday: any) => {
    setHolidays([...holidays, newHoliday]);
  };
  return (
    <div className="max-w-screen flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full ml-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-8">
          <Searchbar />
        </div>
        <div className="flex gap-6 ">
          <StatCard
            count={20}
            labelLine1="Leave"
            labelLine2="Requests"
            bgColor="bg-[#D7F5E4]"
            textColor="text-[#063123]"
          />
          <StatCard
            count={50}
            labelLine1="Approved"
            labelLine2="Leaves"
            bgColor="bg-[#D7F5E4]"
            textColor="text-[#222222]"
          />
          <StatCard
            count={16}
            labelLine1="Leave"
            labelLine2="Without Pay"
            bgColor="bg-[#FFE3E3]"
            textColor="text-[#7B0909]"
          />
          <StatCard
            count={30}
            labelLine1="Pending"
            labelLine2="Requests"
            bgColor="bg-[#FFE493]"
            textColor="text-[#222222]"
          />
        </div>
        <div className="mt-6">
          <LeaveManager leaves={mockLeaves} />
        </div>
        <div className="flex mt-6 gap-6">
          <div className="">
            <LeaveCategoryManager />
          </div>
          <div className="flex flex-col mr-4">
            <div>
            <HolidayTable
              holidays={holidays}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAdd}
            /></div>
            <div><div className="w-full bg-[#702DFF] h-full flex flex-col rounded-[0.7rem] p-3 gap-2 relative ">
                    <div className="text-[0.75rem] font-[400] text-white">
                        YOUR PERSONALISED LEARNING PARTNER
                    </div>
                    <div className="absolute top-0 right-7 h-[3rem] w-[12rem] z-10"><img src="/container.png" alt="Banner" /></div>

                    <div className="text-[1.5rem] font-[600] text-white ">
                        Unlock your full potential <br></br>
                        with Mentox AI Tutor
                    </div>
                    <button className="bg-black h-[1.3rem] w-fit rounded-[1.5rem] font-[500] text-[0.75rem] text-white flex gap-2 px-3 cursor-pointer">
                        Discover AI learning <span className="mt-0.5"><FaRegCirclePlay/></span>
                    </button>
            
                </div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Teacherleave;
