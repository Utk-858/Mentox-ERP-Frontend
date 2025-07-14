import React, { useState } from "react";
import { ChevronDown, MoreVertical, Search, Plus } from "lucide-react";
import TabsSection from "./TabsSection";
import AnnouncementEditor from "./AnnouncementEditor";

const AssignmentComponent: React.FC = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All Assignment");

  const assignments = [
    {
      title: "Science Assignment",
      status: "Completed",
      questions: 13,
      due: "March 15",
      points: 15,
      action: "Review",
      buttonClass: "bg-black text-white",
      color: "bg-[#43C876] text-white",
    },
    {
      title: "Science Assignment",
      status: "Ongoing",
      questions: 13,
      due: "March 15",
      points: 15,
      action: "Review",
      buttonClass: "bg-[#702DFF] text-white",
      color: "bg-[#702DFF] text-white",
    },
    {
      title: "Science Assignment",
      status: "Saved As Draft",
      questions: 13,
      due: "March 15",
      points: 15,
      action: "Complete",
      buttonClass: "bg-[#0D6EFD] text-white",
      color: "bg-[#0D6EFD] text-white",
    },
    {
      title: "Science Assignment",
      status: "Scheduled",
      questions: 13,
      due: "Scheduled: March 17, 10:00 AM",
      points: 15,
      action: "Edit",
      buttonClass: "bg-[#B7B7B7] text-gray-700",
      color: "bg-[#B7B7B7] text-white",
    },
  ];

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const filteredAssignments =
    filterStatus === "All Assignment"
      ? assignments
      : assignments.filter((a) => a.status === filterStatus);

  return (
    <div className="font-sans w-full max-w-screen space-y-6">
      {/* Header Tabs and Search */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <TabsSection />

        <div className="flex gap-3 items-center">
          <div className="relative text-white">
            <Search className="absolute left-2 top-2 h-4 w-4 text-white" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-8 pr-4 py-2 border border-[#606060] rounded-md bg-black text-sm sm:text-xs text-white placeholder-white w-full sm:w-48"
            />
          </div>

          <div className="relative">
            <button
              className="bg-black text-white rounded-md px-3 py-2 flex items-center gap-1 text-sm sm:text-xs"
              onClick={() => toggleDropdown(999)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 15.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-5.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
              {filterStatus}
              <ChevronDown className="h-4 w-4 text-white" />
            </button>

            {openDropdownIndex === 999 && (
              <div className="absolute right-0 mt-2 w-48 bg-[#3F3F3F] text-white rounded-md shadow-lg text-sm z-20">
                {["Ongoing", "Completed", "Saved As Draft", "Scheduled", "All Assignment"].map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className={`px-4 py-2 hover:bg-gray-600 cursor-pointer border-b border-gray-500 last:border-none ${
                        filterStatus === item ? "bg-gray-700 font-semibold" : ""
                      }`}
                      onClick={() => {
                        setFilterStatus(item);
                        toggleDropdown(999);
                      }}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnnouncementEditor />

      {/* Create Assignment Header */}
      <div className="bg-white flex flex-col p-4 sm:p-6 shadow rounded-2xl space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4 xl:gap-10">
          <img src="/Group (3).png" alt="assignment-illustration" className="w-18 xl:w-28" />
          <div>
            <h2 className="text-base sm:text-2xl xl:text-3xl font-semibold text-[#606060]">
              This is where you can create Assignment
            </h2>
            <p className="text-xs xl:text-base text-[#606060] mt-2">
              Easily create and manage assignments for your class. Set deadlines, add detailed
              instructions, and track student submissions effortlessly from one place.
            </p>
          </div>
        </div>
        <button className="bg-[#702DFF] mt-2 sm:mt-0 text-white px-2 xl:px-5 py-2 rounded-md text-sm xl:text-base flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Create
        </button>
      </div>

      {/* Assignment Cards */}
      <div className="space-y-4">
        {filteredAssignments.map((a, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-6 shadow rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 w-full">
              <img src="/Frame 1000001783 (2).png" alt="assignment-icon" className="w-10 sm:w-12" />
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                  <h3 className="font-semibold text-base xl:text-xl text-gray-800">{a.title}</h3>
                  <div
                    className={`text-xs xl:text-base px-2 py-0.5 rounded-full w-fit font-medium ${a.color}`}
                  >
                    {a.status}
                  </div>
                </div>
                <p className="text-xs xl:text-base text-[#8EA3C1] mt-1 max-w-3xl">
                  Assess your understanding of core Physics, Chemistry, and Biology concepts from
                  the first half of the term through MCQs, short answers and diagrams.
                </p>
                <div className="text-xs xl:text-base text-gray-400 mt-2 flex flex-wrap gap-2 sm:gap-4">
                  <span>{a.questions} Questions</span>
                  <span>{a.due}</span>
                  <span>{a.points} Points</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button
                className={`text-xs xl:text-base px-3 xl:px-5 py-1.5 rounded-md shadow-sm hover:opacity-90 ${a.buttonClass}`}
              >
                {a.action}
              </button>
              <div className="relative">
                <MoreVertical
                  className="text-black cursor-pointer"
                  onClick={() => toggleDropdown(index)}
                />
                {openDropdownIndex === index && (
                  <div className="absolute right-0 mt-2 w-36 bg-gray-800 bg-opacity-90 text-white rounded-md shadow-lg text-sm z-10">
                    <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Edit</div>
                    <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Delete</div>
                    <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Duplicate</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentComponent;
