import React, { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/SidebarStudent";
import LateSubmissionContent from "../components/LateSubmissionContent";
import { ArrowLeft, MoreVertical } from "lucide-react";

const LateSubmission: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

//   const handleEdit = () => alert("Edit clicked");
//   const handleDelete = () => alert("Delete clicked");

  return (
    <div className="min-h-screen max-w-screen w-full flex text-gray-800 font-sans">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1">
        {/* Back Button */}
        <div className="p-6 pb-0">
          <div className="flex justify-end mt-3 mr-10">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-[#702DFF] p-2 rounded-lg transition-colors"
              title="Go back"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Back</span>
            </button>
          </div>
        </div>

        {/* Main content with external dropdown */}
        <div className="px-10 mt-6">
          <div className="flex justify-between items-start">
            <LateSubmissionContent />

            {/* Dropdown outside the component */}
            <div className="relative mt-10 mr-5" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                title="More options"
              >
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-[#070707db] border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    title="Edit submission"
                    className="w-full text-left px-4 py-2 text-sm text-white"
                  >
                    Edit
                  </button>
                  <button
                    title="Delete submission"
                    className="w-full text-left px-4 py-2 text-sm text-white">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LateSubmission;
