import React, { useState } from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";
import PaymentSummary from "../../components/PaymentSummary";

const OnlineFeePayment: React.FC = () => {
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
      <div className="px-10 xl:px-20 mt-10">
                  
          <div className="flex flex-wrap justify-between items-center mb-2">
            <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4 xl:mb-10">
              Online Fee Payment
              <p className="text-sm font-normal text-gray-900 ">You are paying for the current academic term.</p>
            </h1>
            <button className="bg-[#702DFF] text-white px-4 mb-10 xl:px-6 py-2 rounded w-auto">
              Back
            </button>
          </div>
    
              <PaymentSummary />
            </div>
      </div>
    </div>
  );
};

export default OnlineFeePayment;
