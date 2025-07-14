import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { GrDocumentTime } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export type LeaveType = "Casual" | "Medical" | "Half Day" | "Special";

export interface LeaveCardData {
  employeeName: string;
  employeeId: string;
  department: string;
  position: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
}

interface LeaveManagerProps {
  leaves: LeaveCardData[];
}

const badgeColors: Record<LeaveType, string> = {
  Casual: "bg-black text-white",
  Medical: "bg-[#22C55E] text-white",
  "Half Day": "bg-[#17A1FA] text-white",
  Special: "bg-purple-500 text-white",
};

const LeaveManager: React.FC<LeaveManagerProps> = ({ leaves }) => {
  const [filter, setFilter] = useState<LeaveType | "All">("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const leaveTypes: (LeaveType | "All")[] = ["All", "Casual", "Medical", "Half Day", "Special"];

  const filteredLeaves = leaves.filter((leave) => {
    const matchesFilter = filter === "All" || leave.leaveType === filter;
    const matchesSearch =
      leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredLeaves.length / rowsPerPage);
  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleRowsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-[#F5F5F7] rounded-[0.9rem] min-w-[75rem] mr-6">
      <h2 className="text-[1.5rem] font-[600] text-black">Leave Requests</h2>
      <p className="text-[0.9rem] font-[400] text-[#363636] mb-4">
        View and manage the requests for Leave
      </p>

      {/* Filter Tabs + Search + Dropdown */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex bg-black px-2 py-1 rounded-lg space-x-2">
          {leaveTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilter(type);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                filter === type ? "bg-[#702DFF] text-white" : "text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex gap-3 items-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search leave..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-black text-white px-4 py-1 rounded-md text-sm placeholder-gray-400 focus:outline-none w-[200px]"
          />

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-black text-white px-4 py-1 rounded-md text-sm flex items-center gap-2"
            >
              <CiFilter /> {filter === "All" ? "All Leaves" : filter} ▾
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                {leaveTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilter(type);
                      setDropdownOpen(false);
                      setCurrentPage(1);
                    }}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Leave Request Cards */}
      {paginatedLeaves.map((leave, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center mb-4"
        >
          <div className="flex gap-4 items-start">
            <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
              <GrDocumentTime />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[1rem] font-[600]">{leave.employeeName}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColors[leave.leaveType]}`}
                >
                  {leave.leaveType}
                </span>
              </div>
              <p className="text-sm text-[#696969]">
                <strong>Employee ID:</strong> {leave.employeeId} &nbsp;&nbsp;
                <strong>Department:</strong> {leave.department} &nbsp;&nbsp;
                <strong>Position:</strong> {leave.position}
              </p>
              <p className="text-sm text-[#696969]">
                <strong>Date:</strong> {leave.fromDate} - {leave.toDate} &nbsp;&nbsp;
                <strong>Duration:</strong> {leave.days} Days
              </p>
              <p className="text-sm text-[#696969]">
                <strong>Reason:</strong> {leave.reason}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => alert(`Approved ${leave.employeeName}`)}
              className="bg-[#702DFF] text-white px-4 py-1.5 rounded-md font-medium"
            >
              Approve
            </button>
            <button
              onClick={() => alert(`Rejected ${leave.employeeName}`)}
              className="bg-black text-white px-4 py-1.5 rounded-md font-medium"
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      {/* Pagination Footer */}
      <div className="flex justify-end items-center text-sm text-gray-500 mt-4 gap-4">
        <div className="flex items-center gap-2">
          Rows per page:
          <select
            value={rowsPerPage}
            onChange={handleRowsChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div>
          {currentPage} of {totalPages}
        </div>
        <div className="flex gap-1">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-2">
            <IoIosArrowBack />
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-2">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveManager;
