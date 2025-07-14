import React from "react";
import Sidebar from "@/components/SidebarAdmin";
import SearchBar from "@/components/SearchBar";
import DateTime from "../components/DateTime";
import StatsDashboard from "../components/StatsDashboard";
import AttendanceComparisonChart from "../components/AttendanceComparisonChart";
import TopEmployees from "../components/TopEmployees";
import DailyAttendance from "../components/DailyAttendance";
import StudentCard from "../components/StudentCard.tsx"
import TeachersLeave from "../components/TeachersLeave.tsx";
import AttendanceOverview from "../components/AttendanceOverview.tsx";

const AttendancePage: React.FC = () => {
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
        <main className="px-10 mt-10">
            {/* 1st row */}
            <div className="flex flex-row gap-5">
                <DateTime></DateTime>
                <StatsDashboard></StatsDashboard>
            </div>
            {/* 2nd row */}
            <div className="flex flex-row mt-3 gap-5">
                <AttendanceComparisonChart></AttendanceComparisonChart>
                <TopEmployees></TopEmployees>
            </div>
            {/* 3rd row */}
            <div className="flex flex-row mt-3 gap-5">
                <DailyAttendance></DailyAttendance>
                <div className="flex flex-col gap-3">
                    <StudentCard></StudentCard>
                    <TeachersLeave></TeachersLeave>
                </div>
            </div>
            {/* 4th row */}
            <div className="mt-3">
                <AttendanceOverview></AttendanceOverview>
            </div>
        </main>
          
           
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
