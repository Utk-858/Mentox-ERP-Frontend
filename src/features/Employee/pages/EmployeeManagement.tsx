import React from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import StatsComponent from "../components/StatsComponent";
import Attendance from "../components/Attendance";
import DepartmentCard from "../components/DepartmentCard";
import DepartmentHeadcountChart from "../components/DepartmentHeadcountChart";
import MeetSchedule from "../components/MeetSchedule";
import AddEmployeeForm from "../components/AddEmployeeForm";
import EmployeeDetails from "../components/EmployeeDetails";

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
            <div className="mt-10">
              <div className="flex flex-row gap-4">
                <StatsComponent></StatsComponent>
                <Attendance></Attendance>
                <DepartmentCard></DepartmentCard>
              </div>
            </div>
            {/* 2nd row */}
            <div className="mt-5 flex">
                <div className="flex flex-col gap-5">
                <DepartmentHeadcountChart></DepartmentHeadcountChart>  
                 <MeetSchedule></MeetSchedule>
                </div>
               <AddEmployeeForm></AddEmployeeForm>
            </div>
            {/* 3rd row */}
            <div className="mt-20 xl:mt-5">
                <EmployeeDetails></EmployeeDetails>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
