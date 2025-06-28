import React, { useState } from "react";
import { BiSearch, BiFilterAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

export type LeaveStatus = "Pending" | "Approved" | "Auto Approved";

export interface LeaveRequest {
  id: number;
  name: string;
  rollNumber: string;
  className: string;
  section: string;
  contact: string;
  startDate: string;
  endDate: string;
  duration: string;
  reason: string;
  type: string;
  status: LeaveStatus;
}

interface LeaveRequestsProps {
  data: LeaveRequest[];
}

const LeaveRequests: React.FC<LeaveRequestsProps> = ({ data }) => {
  const [filter, setFilter] = useState<"All" | LeaveStatus>("All");
  const [search, setSearch] = useState("");
  const [leaves, setLeaves] = useState<LeaveRequest[]>(data);

  const handleApprove = (id: number) => {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: "Approved" } : leave
      )
    );
  };

  const handleReject = (id: number) => {
    setLeaves((prev) => prev.filter((leave) => leave.id !== id));
  };

  const filteredLeaves = leaves.filter((leave) => {
    const matchesStatus = filter === "All" || leave.status === filter;
    const matchesSearch = leave.name.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const tabs: (LeaveStatus | "All")[] = ["All", "Pending", "Approved"]; // No "Rejected"

  return (
    <div className="p-6 bg-[#F5F5F7] rounded-xl mr-6 mt-4 ">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-[1.5rem] font-[600]">Leave Requests</h1>
        <p className="text-[0.88rem] font-[400] text-[#363636]">
          View and manage the requests for Leave
        </p>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
        <div className="flex space-x-2 bg-black p-1 rounded-[0.5rem]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1 rounded-md font-semibold text-sm ${
                filter === tab ? "bg-[#702DFF] text-white" : "bg-black text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="flex items-center px-4 py-2 bg-black rounded-md text-white text-sm">
            <BiSearch className="mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leave..."
              className="bg-transparent outline-none w-32"
            />
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center gap-1">
            <BiFilterAlt />
            All Leaves
          </button>
        </div>
      </div>

      {/* Leave Cards */}
      {filteredLeaves.length > 0 ? (
        filteredLeaves.map((leave) => (
          <div
            key={leave.id}
            className="bg-white p-4 rounded-xl flex justify-between items-center mb-4 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full text-xl">
                <FaUserCircle />
              </div>
              <div>
                <div className="flex gap-3 items-center mb-1">
                  <h3 className="text-[1.02rem] font-[600]">{leave.name}</h3>
                  <span className="bg-[#702DFF] text-white text-[0.75rem] font-[600] px-2 py-0 rounded-full">
                    {leave.type}
                  </span>
                </div>
                <p className="text-[0.75rem] text-[#696969] leading-[1.6]">
                  <b>Roll Number:</b> {leave.rollNumber} &nbsp; &nbsp; <b>Class:</b>{" "}
                  {leave.className} &nbsp; &nbsp; <b>Section:</b> {leave.section} &nbsp;
                  &nbsp; <b>Parent's Contact:</b> {leave.contact} <br />
                  <b>Start Date:</b> {leave.startDate} &nbsp; &nbsp; <b>End Date:</b>{" "}
                  {leave.endDate} &nbsp; &nbsp; <b>Duration:</b> {leave.duration} <br />
                  <b>Reason:</b> {leave.reason}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-2 sm:mt-0">
              {leave.status === "Pending" ? (
                <>
                  <button
                    className="bg-[#702DFF] text-white px-4 py-1 rounded-md text-sm font-semibold"
                    onClick={() => handleApprove(leave.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-black text-white px-4 py-1 rounded-md text-sm font-semibold"
                    onClick={() => handleReject(leave.id)}
                  >
                    Reject
                  </button>
                </>
              ) : leave.status === "Approved" ? (
                <span className="bg-gray-400 text-white px-4 py-1 rounded-md text-sm font-semibold">
                  Approved
                </span>
              ) : (
                <span className="bg-black text-white px-4 py-1 rounded-md text-sm font-semibold">
                  Auto Approved
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-sm">No leave requests found.</p>
      )}
    </div>
  );
};

export default LeaveRequests;
