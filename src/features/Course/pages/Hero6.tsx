import React, { useState } from "react";
import { Bell, Search, MessageCircle } from "lucide-react";
import Sidebar from "@/components/SidebarStudent";
import SearchBar from "@/components/SearchBar";
import App1 from "./App1";

import Assignments from "./Assignments";
import QuizList from "./QuizList";
import Lectures from "./Lectures";

const Hero6 = () => {
  const [activeTab, setActiveTab] = useState("Stream");

  const assignments = [
    {
      status: "Pending",
      due: "March 15",
      button: "Submit",
      tag: "yellow-400",
    },
    {
      status: "Completed",
      due: "March 15",
      button: "Review",
      tag: "green-400",
    },
    {
      status: "Missing",
      due: "March 15",
      button: "Late Submission",
      tag: "red-500",
    },
    {
      status: "Pending",
      due: "March 15",
      button: "Submit",
      tag: "yellow-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans w-full flex">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex w-full flex-col">
        <main className="w-full px-4 md:px-10 py-10 flex flex-col items-start justify-start space-y-12">
          <div className="relative flex w-full justify-center z-10 text-center">
            <SearchBar />
          </div>

          <div className=" text-white rounded-xl p-6 mb-6 relative overflow-hidden w-full">
            <img
              src="/test8.png"
              alt=""
              className="absolute right-0 top-0 w-full h-full object-cover z-0"
            />
            <div className="absolute right-4 top-4 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
              Discover AI Learning
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold">Maths</h1>
              <p className="text-sm mt-1">
                Engaging math lessons that build problem-solving skills, logical
                thinking, and confidence through interactive activities and
                practice.
              </p>
              <p className="text-xs mt-2">Class-6 &nbsp;&nbsp; Section-A</p>
              <p className="text-lg font-semibold mt-2">Hemish Morgan</p>
            </div>



          </div>
            <div className="flex mb-4 space-x-4">
        {['Stream', 'Assignment', 'Quizzes', 'Lectures'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg  font-semibold cursor-pointer ${
              activeTab === tab ? 'bg-purple-600 text-white' : 'bg-black text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Stream" && (

        <>
        <div className="border rounded-2xl ">
          <App1 />
        </div>
       </>
      )}


      {activeTab === "Assignment" && (

        <>
        <div className="border rounded-2xl ">
          <Assignments/>
        </div>
       </>
      )}

      {activeTab === "Quizzes" && (

        <>
        <div className="border rounded-2xl ">
          <QuizList/>
        </div>
       </>
      )}

      {activeTab === "Lectures" && (

        <>
        <div className="">
          <Lectures/>
        </div>
       </>
      )}


        </main>
      </div>
      {/* Header */}
    </div>
  );
};

export default Hero6;
