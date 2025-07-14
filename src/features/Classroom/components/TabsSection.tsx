import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Stream", path: "stream" },
  { label: "Assignment", path: "assignment" },
  { label: "Quizzes", path: "quizzes" },
  { label: "Lectures", path: "lectures" },
];

const TabsSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activePath = location.pathname.split("/").pop()?.toLowerCase() || '';

  return (
    <div className="flex space-x-3">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => navigate(`/classroom/${tab.path}`)}
          className={`px-4 py-0.5 xl:px-8 xl:py-2 rounded-md text-base xl:text-lg font-medium transition-all duration-200 ${
            activePath === tab.path
              ? "bg-purple-300 text-gray-700"
              : "bg-[#1c1c1c] text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
export default TabsSection;
