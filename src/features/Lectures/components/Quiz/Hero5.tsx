import React from "react";
import {
  AlignJustify,
  Clock,
  ExternalLink,
  Home,
  RefreshCcw,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// Mock questions data
const questions = [
  { id: 1, title: "Topics | DBMs - Introduction - 1", difficulty: "Easy", type: "Single Choice Question" },
  { id: 2, title: "Topics | DBMs - Introduction - 2", difficulty: "Easy", type: "Single Choice Question" },
  { id: 3, title: "Topics | DBMs - Introduction - 3", difficulty: "Easy", type: "Single Choice Question" },
  { id: 4, title: "Topics | DBMs - Introduction - 4", difficulty: "Easy", type: "Single Choice Question" },
  { id: 5, title: "Topics | DBMs - Introduction - 5", difficulty: "Easy", type: "Single Choice Question" },
];

// Instructions data for mapping
const instructions = [
  "Results will be revealed at the end of the challenge.",
  "Do not move to the next problem until all approaches and concepts are clear.",
  "Final scores and rewards will be credited after the next product update.",
  "Plagiarism can help you complete the challenge but not with learning."
];

// Header buttons data for mapping
const headerButtons = [
  { icon: Clock, text: "00:04:16", id: "timer" },
  { icon: AlignJustify, text: "Course Content", id: "course" },
  { icon: ExternalLink, text: "Exit Challenge", id: "exit" },
];

const Hero5 = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="bg-purple-200 w-20 flex flex-col items-center py-4 space-y-6">
        <img src="/test6.png" alt="Logo" className="w-16 h-16" />
        <Home className="text-purple-900 w-6 h-6" />
        <div className="space-y-4 text-sm font-medium text-purple-900">
          {questions.map((question, idx) => (
            <p key={question.id}>Q{idx + 1}</p>
          ))}
        </div>
        <RefreshCcw className="mt-auto text-purple-900 w-6 h-6" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="text-sm text-gray-400 font-medium">
            QUIZ{" "}
            <span className="font-medium text-gray-400 ml-3">
              Challenge 1 - DBMS
            </span>
          </div>
          <div className="flex gap-2">
            {headerButtons.map((button) => {
              const IconComponent = button.icon;
              return (
                <button 
                  key={button.id}
                  className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium text-xs">{button.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-8">Instruction</h2>
          <ul className="list-decimal list-inside text-sm text-gray-500 space-y-5">
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </section>

        {/* Problems Table */}
        <section>
          <h2 className="text-lg font-medium mb-3">All Problems</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-t">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Question</th>
                  <th className="py-2">Type & Difficulty</th>
                  <th className="py-2">Score Points</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question.id} className="border-t">
                    <td className="py-4 text-gray-500">
                      {question.title}
                    </td>
                    <td className="py-2">
                      <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded text-xs mr-2">
                        QUIZ
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs mr-2">
                        {question.type}
                      </span>
                      <span className="text-sm text-gray-500">{question.difficulty}</span>
                    </td>
                    <td className="py-2 text-blue-500">-</td>
                    <td className="py-2">
                        <NavLink to='/Lectures/quiz/first'>
                      <button 
                        className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                        onClick={() => console.log(`Navigate to question ${question.id}`)}
                      >
                        Go To Problem
                      </button>
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button className="bg-purple-100 text-purple-600 rounded px-2 hover:bg-purple-200 transition-colors">
            &lt;
          </button>
          <button className="bg-purple-100 text-purple-600 rounded px-2 hover:bg-purple-200 transition-colors">
            &gt;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Hero5;