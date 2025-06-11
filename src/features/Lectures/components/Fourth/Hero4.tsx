import React, { useState } from "react";
import { FaLock, FaClock, FaFileAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Sidebar from "../front/Sidebar";
import { Bell, MessageCircle, Plus } from "lucide-react";
import SetGoalModal from "../Second/SetGoalModel";
import Curriculum from "../Third/Curriculum";
import { NavLink } from "react-router-dom";
import SearchTop from "@/features/Dashboard/SearchTop";

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

const Hero4 = () => {
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
    <div className="p-2 flex flex-row pb-20 bg-gray-50 min-h-screen">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full">
        {/* Top Bar */}
        <div className="relative flex w-full justify-center z-10 mt-4">
          <SearchTop/>
        </div>

        {/* Main Section */}

        <div className="flex flex-col lg:flex-row justify-between gap-6 px-10 mt-8">
          {/* Quiz Content */}
          <div className="flex flex-col items-center flex-1">
            <img
              src="/test3.png"
              alt="Quiz Time"
              className="w-[247px] h-auto mb-4"
            />
            <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
              Time to test your skill and knowledge
            </h2>

            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow text-sm text-gray-700">
              <h3 className="font-semibold text-gray-800 mb-4">Instruction</h3>
              <ul className="list-decimal list-inside space-y-2">
                <li>Results will be revealed at the end of the challenge.</li>
                <li>
                  Do not move to the next problem until all approaches and
                  concepts are clear.
                </li>
                <li>
                  Final scores and rewards will be credited after the next
                  product update.
                </li>
                <li>
                  Plagiarism can help you complete the challenge but not with
                  learning.
                </li>
              </ul>
            </div>


            <NavLink to='/Lectures/quiz'>
            <button className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg mt-6 hover:bg-purple-700">
              Start Quiz
            </button>
            </NavLink>
          </div>

          {/* Curriculum Sidebar */}
          <div className="w-full lg:w-[350px] bg-white p-4 rounded-xl shadow h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Curriculum</h3>
              <button
                onClick={() => setShowGoalModal(true)}
                className="bg-black text-white text-sm px-3 py-1 rounded"
              >
                Set Goal
              </button>
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

        {/* Goal Modal */}
        <SetGoalModal
          isOpen={showGoalModal}
          onClose={() => setShowGoalModal(false)}
        />
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
  <div className="flex items-center justify-between text-sm text-gray-700 bg-gray-100 p-2 rounded">
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

export default Hero4;
