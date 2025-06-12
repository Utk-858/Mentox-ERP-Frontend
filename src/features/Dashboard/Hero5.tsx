// Hero5.tsx
import React, { useState } from "react";
import Sidebar from "../Lectures/components/front/Sidebar";
import {
  Bell,
  Clock,
  Flame,
  MessageCircle,
  Play,
  Plus,
  Star,
} from "lucide-react";
import ContinueWatching from "../Lectures/components/front/ContinueWatching";
import FreeCourses from "../Lectures/components/front/FreeCourses";
import Course from "../Lectures/components/front/Course";
import SearchTop from "./SearchTop";
import { FaPlayCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Card } from "../Lectures/components/ui/Card";
import Attendance from "./Attendance";
import RankCard from "./RankCard";
import type { RankData } from "./types";
import BarChartCard from "../../components/BarChart";

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  color: string;
  initial: string;
}

const Hero5 = () => {
  const [search, setSearch] = useState("");

  const rankData: RankData = {
    rank: 5,
    totalStudents: 42,
    termScore: 487,
    termTotal: 600,
    topSubject: {
      subject: "Maths",
      score: 98,
    },
    lowSubject: {
      subject: "English",
      score: 62,
    },
  };

  const courses: Course[] = [
    {
      id: "1",
      title: "Maths",
      instructor: "by Hemish Morgan",
      duration: "6h 30min",
      rating: 4.9,
      color: "bg-[#702DFF]",
      initial: "M",
    },
    {
      id: "2",
      title: "Computer",
      instructor: "by Himanshu Norman",
      duration: "3h 15min",
      rating: 4.7,
      color: "bg-[#702DFF]",
      initial: "C",
    },
    {
      id: "3",
      title: "Master Instagram",
      instructor: "by Shalu Gill",
      duration: "7h 40min",
      rating: 4.6,
      color: "bg-[#702DFF]",
      initial: "M",
    },
    {
      id: "4",
      title: "Hindi",
      instructor: "by Mayank Tatte",
      duration: "11h 30min",
      rating: 4.8,
      color: "bg-[#702DFF]",
      initial: "H",
    },
    {
      id: "5",
      title: "Physical Education",
      instructor: "by Keshav Green",
      duration: "9h 36min",
      rating: 4.7,
      color: "bg-[#702DFF]",
      initial: "P",
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("All Courses");
  const tabs = ["All Courses", "The Newest", "Active", "Older"];

  return (
    <div className="flex min-h-screen w-full">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex w-full flex-col">
        <main className="w-full px-4 md:px-10 py-14 flex flex-col items-center justify-start space-y-12">
          <div className="relative flex w-full justify-center z-10 text-center">
            <SearchTop />
          </div>

          <div className="flex flex-row w-full gap-10">
            <div className="flex-[50%] flex flex-col items-start justify-start">
              <div className="flex flex-row bg-[#702DFF] rounded-2xl">
                <div className="flex-[50%]  text-white p-6 overflow-hidden gap-3">
                  <p className="text-xs font-medium uppercase">
                    Your Personalized Learning Partner
                  </p>
                  <h1 className="text-xl font-semibold mt-2">
                    Unlock your full potential with Mentox AI Tutor
                  </h1>
                  <button className="mt-2 flex items-center gap-3 bg-black text-white px-3 py-2 rounded-full shadow-md">
                    <span className="text-sm font-medium">
                      Discover AI Learning
                    </span>
                    <span className="bg-white rounded-full p-1">
                      <Play size={14} className="text-black" />
                    </span>
                  </button>
                </div>

                <div className="flex-[33%]">
                  <img src="container.png" alt="" />
                </div>
              </div>

              <div className="mt-4 flex flex-row gap-5">
                <Attendance />
                <RankCard data={rankData} />
              </div>
              <div className="flex flex-row w-full">
                <div className="flex-col flex-1 flex">
                  {/* <BarChartCard/> */}
                </div>

                <div className="flex-1"></div>
              </div>
            </div>

            <div className="flex-[50%] flex-col gap-5">
              <div className="bg-[#F5F5F7] p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Courses
                </h3>

                {/* Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors flex-1 ${
                        activeTab === tab
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Course Cards */}
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
                    >
                      {/* Avatar + Text */}
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 ${course.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {course.initial}
                        </div>
                        <div className="space-x-6">
                          <h4 className="font-semibold text-gray-900 text-sm ml-2">
                            {course.title}
                          </h4>
                          <p className="text-xs text-gray-500 ml-2">
                            {course.instructor}
                          </p>
                        </div>
                      </div>

                      {/* Meta Info + Button */}
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1 text-sm text-black font-semibold">
                          <Flame className="w-3 h-3 " />
                          <span>{course.rating}</span>
                        </div>
                        <button className="bg-[#702DFF] text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-[#5a24cc]">
                          View course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row rounded-2xl bg-[#F5F5F7] mt-4">
                <div className="flex-[50%] p-6 overflow-hidden gap-3">
                  <p className="text-xs font-medium uppercase text-black">
                    Online Course
                  </p>
                  <h1 className="text-xl font-bold mt-2 text-[#702DFF]">
                    Sharpen Your Skills With Professional Online Courses
                  </h1>
                  <button className="mt-2 flex items-center gap-3 bg-black text-white px-3 py-2 rounded-full shadow-md">
                    <span className="text-sm font-medium">
                      Discover AI Learning
                    </span>
                    <span className="bg-white rounded-full p-1">
                      <Play size={14} className="text-black" />
                    </span>
                  </button>
                </div>

                <div className="">
                  <img src="/test7.png" alt="" />
                </div>
              </div>
            </div>
          </div>
 
          <section className="w-full max-w-6xl mx-auto z-10">
            <ContinueWatching />
          </section>

          {/* Free Courses Section */}
          <section className="w-full max-w-6xl mx-auto">
            <FreeCourses />
          </section>

          <section className="w-full max-w-6xl mx-auto">
            <Course />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Hero5;
