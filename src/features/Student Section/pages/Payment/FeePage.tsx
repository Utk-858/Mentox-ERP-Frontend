import React, { useState } from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";
import HistoryTable from "../../components/HistoryTable";
import ScholarshipsCard from "../../components/ScholarshipCard";
import CurrentDueCard from "../../components/CurrentDueCard";

const PaymentHistory: React.FC = () => {
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
        <div className="px-16   mt-10"    >
            {/* 1st row */}
            <div className="flex gap-4">
 <ScholarshipsCard></ScholarshipsCard>
            <CurrentDueCard amount={0.0} nextDeadline="01/08/2025"  />
<div className="w-[240px] rounded-2xl bg-[#F8F8FB] p-5 flex flex-col justify-between shadow-sm">
  <div>
    <h2 className="text-[18px] font-semibold text-[#7B3AED]">Fee Slip</h2>
    <p className="text-sm text-[#7B3AED] mt-1">View the Fee Slip for the duration</p>
  </div>
  <button className="mt-4 bg-[#1A1A1A] text-white rounded-lg px-4 py-2 w-full font-medium shadow">
    Pay Now
  </button>
</div>

            </div>
           <div className="mt-5"> <HistoryTable /></div>
           
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
