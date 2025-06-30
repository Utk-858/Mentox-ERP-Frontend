import React from "react";
import Sidebar from "@/components/SidebarStudent";
import SearchBar from "@/components/SearchBar";
import { Play, Settings } from "lucide-react";
import AssignmentComponent from "../components/AssignmentComponent";

const Assignment = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans w-full flex overflow-x-hidden">
      {/* Sidebar – always visible */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full overflow-x-hidden">
        <main className="w-full px-4 md:px-6 py-6 xl:px-10 xl:py-10 flex flex-col items-start justify-start space-y-8 xl:space-y-12">
          {/* Search Bar – always visible */}
          <div className="relative flex w-full justify-center z-10 text-center">
            <SearchBar />
          </div>

          {/* Banner Section */}
          <div className="relative w-full h-[25vh] sm:h-[30vh] md:h-[35vh] xl:h-[40vh] bg-[#702DFF] rounded-2xl overflow-hidden">
            {/* Background Image */}
            <img
              src="/container.png"
              alt="Background"
              className="absolute right-0 bottom-0 w-[40%] sm:w-[35%] md:w-[30%] object-cover z-0"
            />

            {/* Vector Image */}
            <img
              src="/Vector (3).png"
              alt="Vector"
              className="absolute z-10 bottom-0 left-0 w-auto h-auto"
            />

            {/* Top-Right Icons */}
            <div className="absolute top-4 right-6 z-20 flex items-center gap-2 sm:gap-3">
              <img className="w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10" src="/mdi_share.png" alt="" />
              <Settings className="text-[#E4D8FF] w-6 h-6 sm:w-7 sm:h-7 cursor-pointer" />
            </div>

            {/* Text Content */}
            <div className="flex justify-between text-[#E4D8FF] p-4 sm:p-6">
              <div className="max-w-xl absolute z-20 top-3 left-4 sm:left-6 p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold tracking-wide">Maths</h1>
                <h1 className="text-sm xl:text-lg font-semibold mt-2">
                  Engaging math lessons that build problem-solving skills, logical thinking,
                  and confidence through interactive activities and practice.
                </h1>
                <h1 className="text-sm sm:text-base xl:text-lg font-semibold mt-2">
                  Class-6 <span className="ml-3 sm:ml-5">Section-A</span>
                </h1>
                <h1 className="text-base  xl:text-xl font-semibold mt-2">Hemish Morgan</h1>
              </div>

              <button className="absolute right-6 bottom-6 sm:right-10 sm:bottom-10 flex items-center gap-2 sm:gap-3 bg-black text-[#E4D8FF] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md z-20">
                <span className="text-xs sm:text-sm font-medium">Discover AI Learning</span>
                <span className="bg-white rounded-full p-1">
                  <Play size={12} className="text-black sm:size-[14px]" />
                </span>
              </button>
            </div>
          </div>

          {/* Quiz Content Section */}
          <div className="w-full bg-gray-100 rounded-2xl px-4 py-6 sm:px-6 sm:py-8 xl:p-10">
            <AssignmentComponent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Assignment;
