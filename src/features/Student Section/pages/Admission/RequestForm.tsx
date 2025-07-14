import React, { useState } from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";
import ApplicationRequestForm from "../../components/ApplicationRequestForm";

const RequestForm: React.FC = () => {
  return (
    <div className="flex w-full max-w-screen relative p-4 md:p-10">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="relative flex w-full justify-center z-10 text-center mt-2">
          <SearchBar />
        </div>

        <div className="p-10 mt-[-3rem] xl:p-15">
             
          <ApplicationRequestForm />
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
