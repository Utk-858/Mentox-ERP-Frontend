import  { useState } from "react";
import { Plus, Bell, MessageCircle } from "lucide-react";
import { ContainerTextFlip } from '../ui/container-text-flip';
import FreeCourses from "./FreeCourses";
import Course from "./Course";
import ContinueWatching from "./ContinueWatching";
import Sidebar from "./Sidebar";


const Hero = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar and Promo */}
      <Sidebar/>

      <div className="flex w-full flex-col">
        {/* Right Side Content */}
        <main className="w-full px-6 md:px-16 py-10 flex flex-col items-center justify-start text-center space-y-12">
          {/* Background sparkles */}
            <img src="/sparkles.png" alt="sparkles" className="absolute h-[50%] w-[80%]" />

          {/* Top Search Bar */}
          <div className="relative flex w-full justify-center z-10">
            <div className="flex items-center flex-grow px-4 max-w-[600px]">
              <svg
                className="w-4 h-4 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="z-10 bg-[#F5F5F7] outline-none w-full text-center text-sm text-gray-700 px-4 py-2 rounded-lg"
                placeholder="What assignment are you looking for"
              />
            </div>
            <div className="flex items-center space-x-3 pr-2 z-10">
              <button className="p-2 rounded-lg bg-[#F5F5F7] hover:bg-gray-200">
                <Plus className="w-4 h-4 text-black" />
              </button>
              <button className="p-2 rounded-lg bg-[#F5F5F7] hover:bg-gray-200">
                <Bell className="w-4 h-4 text-black" />
              </button>
              <button className="p-2 rounded-lg bg-[#F5F5F7] hover:bg-gray-200">
                <MessageCircle className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          {/* Main Hero Text */}
          <div className="z-10 max-w-2xl flex flex-col items-center justify-center gap-3">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
              Empowering Students <br />
              for a{" "}
              <span className="text-[#702DFF]">
                <ContainerTextFlip
                  words={[
                    "Brighter Future",
                    "Skilled Journey",
                    "Successfull Career",
                  ]}
                />
              </span>
            </h1>
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              Unlock learning experiences that combine academic excellence with
              practical skill development to help students thrive in school and
              future pursuits.
            </p>
            <div className="mt-6 flex justify-center">
              <input
                type="text"
                placeholder="Search Your Best Courses"
                className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-[#702DFF] transition">
                Search
              </button>
            </div>
          </div>
        </main>

          <section className="w-full max-w-7x;  mx-auto px-4 z-10">
          <ContinueWatching/>
        </section>

        {/* Free Courses Section */}
        <section className="w-full max-w-7xl mx-auto px-4">
          <FreeCourses />
        </section>
        <section className="w-full max-w-7xl mx-auto px-4">
          <Course/>
        </section>
      </div>
    </div>
  );
};

export default Hero;
