import React, { useState } from "react";
import {Card} from "../ui/Card"
import { FaPlayCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type Tab = "Software Engineering" | "Data Science" | "Programming Language" | "Programming Framework";

const tabs: Tab[] = ["Software Engineering", "Data Science", "Programming Language", "Programming Framework"];

const courses = [
  {
    title: "Java Course - Masterclass",
    author: "Tarun Luthra",
    modules: 12,
    lessons: 95,
  },
  {
    title: "JavaScript Course - Beginner to Pro",
    author: "Mrinal Bhattacharya",
    modules: 18,
    lessons: 78,
  },
  {
    title: "DBMS Course - Masterclass",
    author: "Tarun Luthra",
    modules: 12,
    lessons: 95,
  },
  {
    title: "DBMS Course - Masterclass",
    author: "Tarun Luthra",
    modules: 12,
    lessons: 95,
  },
  {
    title: "DBMS Course - Masterclass",
    author: "Tarun Luthra",
    modules: 12,
    lessons: 95,
  },
  {
    title: "DBMS Course - Masterclass",
    author: "Tarun Luthra",
    modules: 12,
    lessons: 95,
  },
  // Repeat or map as needed
];

const FreeCourses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Software Engineering");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Free Programming Courses</h2>

      {/* Tabs */}
      <div className="flex gap-6 border-b-2 border-gray-200 pb-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            
            className={`flex items-center gap-2 text-sm font-medium cursor-pointer ${
              activeTab === tab ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "text-gray-500"
            }`}
          >
            <span className="text-xl">{getTabIcon(tab)}</span>
            {tab}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cusor-pointer">
        {courses.map((course, idx) => (
          <Card key={idx} className="rounded-xl shadow p-4 cursor-pointer">
            <NavLink to='/Lectures/side'>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-md" />
              <div>
                <h3 className="text-md font-semibold truncate">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.author}</p>
                <div className="flex gap-4 text-sm text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <FaPlayCircle className="text-gray-400" /> {course.modules} Modules
                  </span>
                  <span className="flex items-center gap-1">
                    <FaPlayCircle className="text-gray-400" /> {course.lessons} Lessons
                  </span>
                </div>
              </div>
            </div>
            </NavLink>
          </Card>
        ))}
      </div>
    </div>
  );
};

function getTabIcon(tab: Tab) {
  switch (tab) {
    case "Software Engineering":
      return <i className="fa-solid fa-code" />;
    case "Data Science":
      return <i className="fa-solid fa-database" />;
    case "Programming Language":
      return <i className="fa-solid fa-terminal" />;
    case "Programming Framework":
      return <i className="fa-solid fa-project-diagram" />;
    default:
      return null;
  }
}

export default FreeCourses;
