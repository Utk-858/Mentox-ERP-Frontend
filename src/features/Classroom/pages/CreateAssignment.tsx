import React from "react";
import Sidebar from "@/components/SidebarTeacher";
import AssignmentBar from "../components/AssignmentBar";
import AssignmentForm from "../components/AssignmentForm";

const CreateAssignment: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex bg-white text-gray-800 font-sans">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Assignment Top Bar */}
        <div className="px-6 py-4 ">
          <AssignmentBar />
        </div>

        {/* Content (e.g., form, editor, etc.) */}
        <div className="p-6">
            <AssignmentForm />
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
