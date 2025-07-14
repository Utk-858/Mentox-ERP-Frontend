import React, { useState } from "react";
import Sidebar from "@/components/SidebarStudent";
import SearchBar from "@/components/SearchBar";
import AnnouncementEditor from "../components/AnnouncementEditor";
import CourseCardList from "../components/CourseCardList";
import {
  Play,
  Settings,
} from "lucide-react";

const Classroom2 = () => {
  const [activeTab, setActiveTab] = useState("Stream");
  const tabs = ["Stream", "Assignment", "Quizzes", "Lectures"];


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

          {/* Header Banner */}
          <div className="relative w-full h-[40vh] max-w-screen bg-[#702DFF] rounded-2xl overflow-hidden">
            {/* Background Image */}
            <img
              src="/container.png"
              alt="Background"
              className="absolute inset-0 ml-[50rem] w-[30%] object-cover z-0"
            />

            {/* Vector Image */}
            <img
              src="/Vector (3).png"
              alt="Vector"
              className="absolute z-10 bottom-0 left-0 w-auto h-auto"
            />

            {/* Top-Right Icons */}
            <div className="absolute top-4 right-6 z-20 flex items-center gap-3">
              <img className="w-10 h-10" src="/mdi_share.png" alt="" />
              <Settings className="text-[#E4D8FF] w-7 h-7 cursor-pointer" />
            </div>

            {/* Banner Content */}
            <div className="flex justify-between text-[#E4D8FF] p-6">
              <div className="max-w-2xl absolute z-20 p-6 top-3 left-6">
                <h1 className="text-4xl font-bold tracking-wide">Maths</h1>
                <h1 className="text-lg font-semibold mt-2">
                  Engaging math lessons that build problem-solving skills, logical thinking, and confidence through interactive activities and practice.
                </h1>
                <h1 className="text-lg font-semibold mt-2">
                  Class-6 <span className="ml-5">Section-A</span>
                </h1>
                <h1 className="text-xl font-semibold mt-10">Hemish Morgan</h1>
              </div>

              <button className="mt-3 absolute right-10 bottom-10 flex items-center gap-3 bg-black text-[#E4D8FF] px-4 py-2 rounded-full shadow-md z-20">
                <span className="text-sm font-medium">Discover AI Learning</span>
                <span className="bg-white rounded-full p-1">
                  <Play size={14} className="text-black" />
                </span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2 rounded-md text-lg font-medium transition-all duration-200
                  ${activeTab === tab ? "bg-purple-300 text-gray-700" : "bg-[#1c1c1c] text-white"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className="w-full bg-gray-100 max-w-screen rounded-2xl p-4 mx-auto space-y-4">
            {/* Announcement Section */}
            <AnnouncementEditor  />

            {/* Info Card */}
            <div className="bg-white rounded-xl shadow border p-4 flex items-center justify-between">
              <img
                src="/20945188 1.png"
                alt="Stream visual"
                className="w-50 h-50 object-contain"
              />
              <div className="flex flex-col flex-1 ml-6">
                <h2 className="text-xl xl:text-2xl font-semibold text-[#606060]">
                  This is where you can talk to your class
                </h2>
                <p className="text-base xl:text-lg text-[#202020] mt-1">
                  Use the stream to share announcements, post assignments and respond to student questions
                </p>
                <div className="mt-4 self-end mr-4">
                  <button className="flex items-center gap-2 border border-[#702DFF] text-[#702DFF] px-6 py-2 rounded-md text-lg font-medium hover:bg-purple-50 transition">
                    <Settings className="w-5 h-5" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
          <CourseCardList></CourseCardList>
        </main>
      </div>
    </div>
  );
};export default Classroom2;
