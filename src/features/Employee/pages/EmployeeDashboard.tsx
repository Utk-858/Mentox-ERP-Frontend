import React from "react";
import Sidebar from "@/components/SidebarStudent";
import SearchBar from "@/components/SearchBar";
import DashboardCards from "../components/DashboardCards";
import CalendarSchedule from "../components/CalendarSchedule";
import AddMeetingForm2 from "../components/AddMeetingForm";

const EmployeeManagement: React.FC = () => {
  return (
    <div>
      <div className="flex lg:flex-row h-auto min-h-screen max-w-screen">
        <div>
          <Sidebar></Sidebar>
        </div>
        <div className="flex-1 flex flex-col mt-4">
          <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-2">
            <SearchBar />
          </div>
          <main className="px-10">
            {/* 1st row */}
            <div>
                <DashboardCards></DashboardCards>
            </div>
            {/* 2nd Row */}
            <div className="flex flex-row gap-4 ml-10">
                <CalendarSchedule></CalendarSchedule>
                <AddMeetingForm2></AddMeetingForm2>
            </div>
          </main>
          
           
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
