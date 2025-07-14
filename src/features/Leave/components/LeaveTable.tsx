import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export interface LeaveTableData {
  leaveType: string;
  from: string;
  to: string;
  days: number;
  status: LeaveStatus;
  reason: string;
  approver: string;
}

interface LeaveTableProps {
  leaves: LeaveTableData[];
}

const statusColors: Record<LeaveStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const LeaveTable: React.FC<LeaveTableProps> = ({ leaves }) => {
  const [selectedFilter, setSelectedFilter] = useState<LeaveStatus | "All">("All");
    const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredLeaves =
    selectedFilter === "All" ? leaves : leaves.filter((l) => l.status === selectedFilter);

  const filters: (LeaveStatus | "All")[] = ["All", "Pending", "Approved", "Rejected"];

  return (
    <div className="p-6 bg-[#f9f9fb] rounded-[0.9rem] max-w-[75rem] mb-8 ">
      <h2 className="text-[1.5rem] font-[600] text-black ">Previous Leave</h2>
      <p className="text-[0.9rem] font-[400] text-[#363636] mb-4">View your all previous leaves</p>

      {/* Filter Buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2 bg-black px-2 py-1 rounded-[0.5rem]">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 text-sm rounded-[0.5rem] font-medium ${
                selectedFilter === filter
                  ? "bg-[#702DFF] text-white"
                  : "text-white"
              }`}
            >
              {filter === "All" ? "All Leaves" : filter}
            </button>
          ))}
        </div>

        {/* Right Side Dropdown (placeholder only) */}
        <div className="relative">
  <button
    onClick={() => setDropdownOpen((prev) => !prev)}
    className="bg-black text-white px-4 py-1 rounded-md text-[0.9rem] font-[500] flex items-center gap-2"
  >
    <span><CiFilter/></span> {selectedFilter === "All" ? "All Leaves" : selectedFilter} ▾
  </button>

  {dropdownOpen && (
    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => {
            setSelectedFilter(filter);
            setDropdownOpen(false);
          }}
          className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
        >
          {filter === "All" ? "All Leaves" : filter}
        </button>
      ))}
    </div>
  )}
</div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2 ">
          <thead className="text-left text-[#616188] text-[1rem] font-[600]">
            <tr>
              <th className="px-3 py-2">Leave type</th>
              <th className="px-3 py-2">From</th>
              <th className="px-3 py-2">To</th>
              <th className="px-3 py-2">Days</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Reason</th>
              <th className="px-3 py-2">Approver</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, idx) => (
              <tr key={idx} className="bg-white  text-[0.9rem] font-[400]">
                <td className="py-2 px-3">{leave.leaveType}</td>
                <td className="py-2 px-3">{leave.from}</td>
                <td className="py-2 px-3">{leave.to}</td>
                <td className="py-2 px-3">{leave.days}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-3 py-1 rounded-[0.2rem] text-xs font-medium ${statusColors[leave.status]}`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="py-2 px-3">{leave.reason}</td>
                <td className="py-2 px-3">{leave.approver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;
