import React, { useState } from "react";
import { FaLock, FaClock, FaFileAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Sidebar from "../../../../components/SidebarTeacher";
import { Bell, MessageCircle, Plus, Share2, Target } from "lucide-react";
import SetGoalModal from './SetGoal'; // Make sure the path is correct



const lessons = [
  { title: "Lesson title – not purchased course", time: "30 minutes" },
  {
    title: "Quiz title – purchased course / lock",
    time: "30 minutes",
    locked: true,
  },
  {
    title: "LMS Website and LearnPress Introduction – Active",
    time: "30 minutes",
    active: true,
  },
  { title: "Lesson title – not purchased course", time: "30 minutes" },
];

const curriculumData = [
  {
    section: "This is lesson title – open",
    open: true,
    lessons: [
      {
        title: "Lesson title – not purchased course",
        duration: "30 minutes",
        locked: true,
        active: false,
      },
      {
        title: "Quiz title – purchased course/lock",
        duration: "30 minutes",
        locked: true,
        active: false,
      },
      {
        title: "LMS Website and LearnPress Introduction – Active",
        duration: "30 minutes",
        locked: false,
        active: true,
      },
      {
        title: "Lesson title – not purchased course",
        duration: "30 minutes",
        locked: true,
        active: false,
      },
    ],
  },
  {
    section: "This is lesson title – Close",
    open: false,
    lessons: [
      {
        title: "Lesson title",
        duration: "30 minutes",
        locked: false,
        active: false,
      },
    ],
  },
  {
    section: "This is lesson title – Close",
    open: false,
    lessons: [
      {
        title: "Lesson title",
        duration: "30 minutes",
        locked: false,
        active: false,
      },
    ],
  },
  {
    section: "This is lesson title – Close",
    open: false,
    lessons: [
      {
        title: "Lesson title",
        duration: "30 minutes",
        locked: false,
        active: false,
      },
    ],
  },
];

const Hero1: React.FC = () => {
   const [search, setSearch] = useState("");
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [openSections, setOpenSections] = useState(
      curriculumData.map((section) => section.open)
    );
  
    const toggleSection = (idx: number) => {
      setOpenSections((openSections) =>
        openSections.map((open, i) => (i === idx ? !open : open))
      );
    };
  
    const expandAll = () => setOpenSections(openSections.map(() => true));

  return (
    <div className="p-2 flex flex-row pb-20">
      <Sidebar />

      <div className="flex flex-col w-full">
        {/* Search Bar and Action Buttons */}
        <div className="relative flex w-full justify-center z-10 mt-4">
          <div className="flex items-center flex-grow px-4 max-w-[900px]">
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
        <div className="flex items-center justify-between px-10 mt-10">
      <h1 className="text-3xl font-bold text-gray-900">
        Python Course: Mastering Essentials
      </h1>

      <div className="flex space-x-3">
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md text-xs font-medium">
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <button onClick={() => setShowGoalModal(true)} className="flex items-center gap-2 px-4 py-2 text-white bg-black hover:bg-gray-800 rounded-md text-xs font-medium">
          <Target className="w-4 h-4" />
          Set Goal
        </button>
      </div>
    </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-4 pl-10 pr-10">
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
                and going with the use of LearnPress LMS Plugin. It is a free
                and simple plugin to help you create an Online Courses Website
                step by step. The tutorial guides you through the configuration
                of the plugin, creation of Courses, Lessons, Quizzes, and
                finally guides you on how to boost up your Website with Premium
                LearnPress Add-ons brought to you by ThimPress (creator of
                LearnPress). It also shows how you could configure additional
                items like the course layouts and featured images.
              </p>

              <h2 className="text-xl font-semibold">
                Pre-requisites for Free DBMS Certification Course:
              </h2>
              <p className="text-gray-700">
                To get the most out of this course, we recommend that you have a
                basic understanding of computer science and programming
                fundamentals. You should also have some knowledge of SQL
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
          <div className="w-full lg:w-[350px] bg-white p-4 rounded-xl shadow h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Curriculum</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              16 sections • 51 lectures • 9hrs 30mins
            </p>

            <div className="bg-white rounded-lg shadow divide-y divide-gray-100 text-sm">
              {curriculumData.map((section, idx) => (
                <div key={idx}>
                  <button
                    className="w-full flex justify-between items-center px-4 py-3 text-left font-medium bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => toggleSection(idx)}
                  >
                    <span>{section.section}</span>
                    <span>{openSections[idx] ? "▲" : "▼"}</span>
                  </button>
                  {openSections[idx] && (
                    <div className="px-6 py-2 bg-gray-50">
                      {section.lessons.map((lesson, lidx) => (
                        <div
                          key={lidx}
                          className={`flex items-center justify-between py-1 ${
                            lesson.active
                              ? "text-purple-600 font-semibold underline"
                              : lesson.locked
                              ? "text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          <span>{lesson.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{lesson.duration}</span>
                            {lesson.locked && (
                              <svg
                                width="16"
                                height="16"
                                fill="none"
                                className="text-gray-400"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M17 11V7a5 5 0 00-10 0v4"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <rect
                                  x="5"
                                  y="11"
                                  width="14"
                                  height="10"
                                  rx="2"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Modal */}
      <SetGoalModal isOpen={showGoalModal} onClose={() => setShowGoalModal(false)} />
    </div>
    </div>
  );
};

interface LessonItemProps {
  title: string;
  time: string;
  locked?: boolean;
}

const LessonItem: React.FC<LessonItemProps> = ({ title, time, locked }) => (
  <div className="flex items-center justify-between text-sm text-gray-700">
    <div className="flex items-center gap-2">
      <FaFileAlt className="text-purple-600" />
      <span>{title}</span>
    </div>
    <div className="flex items-center gap-1 text-gray-500">
      {locked && <FaLock />}
      <FaClock /> <span>{time}</span>
    </div>
  </div>
);

export default Hero1;
