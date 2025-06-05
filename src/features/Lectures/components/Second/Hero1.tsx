import React, { useState } from "react";
// import { FaLock, FaClock, FaFileAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Sidebar from "../front/Sidebar";
import { Bell, MessageCircle, Plus } from "lucide-react";

const Hero1: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-2 flex flex-row pb-20">
      <Sidebar />

      <div className="flex flex-col w-full">
        {/* Search Bar and Action Buttons */}
        <div className="relative flex w-full justify-center z-10 mt-4">
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

        {/* Header */}
        <div className="flex">
          <h1 className="flex text-3xl font-bold mb-4 pl-10 mt-10">
            Python Course: Mastering Essentials
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pl-10 pr-10">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <video
              className="rounded-lg w-full"
              controls
              src="/sample-test.mp4"
            />

            {/* Description */}
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-gray-700">
                A series of Videos from ThimPress, give you a detailed tutorial
                to create an LMS Website with LearnPress – LMS & Education
                WordPress Plugin.
              </p>
              <br />
              <p className="text-gray-700">
                This course is a detailed and easy tutorial to get you all setup
                and going with the use of LearnPress LMS Plugin. It is a free
                and simple plugin to help you create an Online Courses
                Website step by step. The tutorial guides you through the
                configuration of the plugin, creation of Courses, Lessons,
                Quizzes, and finally guides you on how to boost up your Website
                with Premium LearnPress Add-ons brought to you by ThimPress
                (creator of LearnPress). It also shows how you could configure
                additional items like the course layouts and featured images.
              </p>

              <h2 className="text-xl font-semibold">
                Pre-requisites for Free DBMS Certification Course:
              </h2>
              <p className="text-gray-700">
                To get the most out of this course, we recommend that you have a
                basic understanding of computer science and programming
                fundamentals. You should also have some knowledge of SQL
                programming language. However, if you're a complete beginner,
                don't worry, we'll start from the basics and build your
                knowledge up from there
              </p>

              <h2 className="text-xl font-semibold">
                Who Should Learn This Free DBMS Course for Beginners?
              </h2>
              <p className="text-gray-700">
                This course is ideal for: • Beginners who want to learn database
                management systems • Students who want to pursue a career in
                data science, database administration, or software engineering •
                Professionals who want to upskill and learn more about DBMS •
                Anyone who wants to learn about databases and their applications
              </p>
            </div>
          </div>

          {/* Curriculum Sidebar */}
          <div className="bg-gray-50 p-4 rounded-xl shadow h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Curriculum</h3>
              <button className="bg-black text-white text-sm px-3 py-1 rounded">
                Set Goal
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              16 sections • 51 lectures • 9hrs 30mins
            </p>
            <Accordion type="single" collapsible className="">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">This is lesson title - open</AccordionTrigger>
                <AccordionContent className="">
                  <div className="flex flex-row gap-4">
                       <p className="text-[17px] w-[75%]">Lesson title - not purchased course</p>
                       <p className="text-[13px]">30 minutes</p>

                  </div>
                 
                </AccordionContent>
                <AccordionContent className="">
                  <div className="flex flex-row gap-4">
                       <p className="text-[17px] w-[75%]">Lesson title - not purchased course</p>
                       <p className="text-[13px]">30 minutes</p>

                  </div>
                 
                </AccordionContent>

                <AccordionContent className="">
                  <div className="flex flex-row gap-4">
                       <p className="text-[17px] w-[75%]">Lesson title - not purchased course</p>
                       <p className="text-[13px]">30 minutes</p>

                  </div>
                 
                </AccordionContent>
                <AccordionContent className="">
                  <div className="flex flex-row gap-4 ">
                       <p className="text-[17px] w-[75%]">Lesson title - not purchased course</p>
                       <p className="text-[13px]">30 minutes</p>

                  </div>
                 
                </AccordionContent>

              </AccordionItem>
            </Accordion>



              <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">This is lesson title - open</AccordionTrigger>
                <AccordionContent className="">
                  <div className="flex flex-row gap-4">
                       <p className="text-[17px] w-[75%]">Lesson title - not purchased course</p>
                       <p className="text-[13px]">30 minutes</p>

                  </div>
                 
                </AccordionContent>
                <AccordionContent className="">
                  <div className="flex flex-row gap-4">
                       <p className="text-[17px] w-[75%]">Lesson title - not purchased course</p>
                       <p className="text-[13px]">30 minutes</p>

                  </div>
                 
                </AccordionContent>

                <AccordionContent className="">
                  <div className="flex flex-row gap-4">
                       <p className="text-[17px] w-[75%]">Lesson title - not purchased course</p>
                       <p className="text-[13px]">30 minutes</p>

                  </div>
                 
                </AccordionContent>
                <AccordionContent className="">
                  <div className="flex flex-row gap-4 ">
                       <p className="text-[17px] w-[75%]">Lesson title - not purchased course</p>
                       <p className="text-[13px]">30 minutes</p>

                  </div>
                 
                </AccordionContent>

              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

// interface LessonItemProps {
//   title: string;
//   time: string;
//   locked?: boolean;
// }

// const LessonItem: React.FC<LessonItemProps> = ({ title, time, locked }) => (
//   <div className="flex items-center justify-between text-sm text-gray-700">
//     <div className="flex items-center gap-2">
//       <FaFileAlt className="text-purple-600" />
//       <span>{title}</span>
//     </div>
//     <div className="flex items-center gap-1 text-gray-500">
//       {locked && <FaLock />}
//       <FaClock /> <span>{time}</span>
//     </div>
//   </div>
// );

export default Hero1;
