import React, { useState } from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";
import DashboardStats from "../../components/DashboardStats";
import UpgradeTable from "../../components/UpgradeTable";

const Upgrade: React.FC = () => {
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

        <div className="px-10 xl:px-15">
               {/* Header */}
      <div className="items-center mt-10">
        <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4 ">
          Class Assignment 
        </h1>
      </div>
      <div className=" flex flex-col gap-4">
        <DashboardStats></DashboardStats>
        <UpgradeTable></UpgradeTable>
      </div>
      
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
