import React, { useState } from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";
import StudentPromotionTable from "../../components/PromotionTable";


const StudentPromotion: React.FC = () => {
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

        <div className="p-10 xl:p-15">
               {/* Header */}
      <div className="items-center mb-6">
        <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4 xl:mb-0">
          Student Promotion
        </h1>
      </div>
        <StudentPromotionTable />
        </div>
      </div>
    </div>
  );
};

export default StudentPromotion;
