import { useState } from "react";
import { Plus, Bell, MessageCircle } from "lucide-react";
import { ContainerTextFlip } from '../ui/container-text-flip';

import SearchTop from "@/features/Dashboard/components/SearchTop";
import Sidebar from "../../../../components/SidebarTeacher";
import ContinueWatching from "../front/ContinueWatching";
import FreeCourses from "../front/FreeCourses";
import Course from "../front/Course";
import { NavLink } from "react-router-dom";

const Hero = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar - Fixed/Sticky */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Right Side Content */}
        <main className="w-full px-6 md:px-16 py-10 flex flex-col items-center justify-start text-center space-y-12">
          {/* Background sparkles */}
          <img src="/sparkles.png" alt="sparkles" className="absolute h-[50%] w-[80%]" />
          
          {/* Top Search Bar */}
          <div className="relative flex w-full justify-center z-10">
            <div className="relative flex w-full justify-center z-10 mt-4">
              <SearchTop />
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

            <div className="flex gap-4">

           
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
            <div className="mt-6 flex justify-center">
              <NavLink to='/Lectures/Course'>
                <button className=" text-white px-4 py-2 rounded-md bg-[#702DFF]">
                Create Course
              </button>
              </NavLink>
            </div>
              

               </div>
          </div>
        </main>
        
        <section className="w-full max-w-7xl mx-auto px-4 z-10">
          <ContinueWatching />
        </section>
        
        {/* Free Courses Section */}
        <section className="w-full max-w-7xl mx-auto px-4">
          <FreeCourses />
        </section>
        
        <section className="w-full max-w-7xl mx-auto px-4">
          <Course />
        </section>
      </div>
    </div>
  );
};

export default Hero;