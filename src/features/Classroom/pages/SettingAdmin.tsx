import React, { useState, useEffect } from "react";
import Sidebar from "@/components/SidebarStudent";
import SearchBar from "@/components/SearchBar";
import { Play, Settings,MoreVertical } from "lucide-react";
import ClassroomSettings from "../components/ClassroomSettings";

const SettingAdmin: React.FC = () => {

  return (
    <div className="min-h-screen max-w-screen bg-white text-gray-800 font-sans w-full flex">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex w-full flex-col">
        <main className="w-full px-4 md:px-10 py-10 flex flex-col items-start justify-start space-y-12">
          {/* Top Search Bar */}
          <div className="relative flex w-full justify-center z-10 text-center">
            <SearchBar />
          </div>
          <div className="px-20 mt-[-2rem]">
                 <ClassroomSettings></ClassroomSettings>
          </div>
           
        </main>
      </div>
    </div>
  );
};

export default SettingAdmin;
