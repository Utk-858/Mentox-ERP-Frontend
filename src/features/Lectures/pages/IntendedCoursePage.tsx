import React, { useState } from "react";
import Sidebar from "../../../components/SidebarTeacher";

const IntendedCoursePage: React.FC = () => {
  const [learningObjectives, setLearningObjectives] = useState<string[]>(["", "", ""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [targetAudience, setTargetAudience] = useState<string[]>([""]);

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  return (

     <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow border mt-10">

        <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Intended course</h2>
      <p className="mb-6 text-gray-700 text-[16px]">
        The following descriptions will be publicly visible on your Course Landing Page and will have a direct impact
        on your course performance. These descriptions will help learners decide if your course is right for them.
      </p>

      {/* Learning Objectives */}
      <div className="mb-6 mt-10">
        <h3 className="font-semibold text-[16px] mb-1">What will students learn in your course?</h3>
        <p className="text-gray-600 mb-4 text-[16px]">
          You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after
          completing your course.
        </p>
        {learningObjectives.map((obj, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={100}
            placeholder="Eg. Define the role of course"
            className="w-full border p-2 rounded-lg mb-2 text-md"
            value={obj}
            onChange={(e) => handleChange(setLearningObjectives, idx, e.target.value)}
          />
        ))}
        <button
          className="bg-[#702DFF] text-white px-4 py-1 rounded-lg mt-2"
          onClick={() => handleAddField(setLearningObjectives)}
        >
          + Add more
        </button>
      </div>
      </div>

      {/* Requirements */}
      <div className="mb-6 text-[16px]">
        <h3 className="font-semibold  mb-1">What are the requirements or prerequisites for taking your course?</h3>
        <p className="text-gray-600 mb-4">
          List the required skills, experience, tools or equipment learners should have prior to taking your course. If
          there are no requirements, use this space as an opportunity to lower the barrier for beginners.
        </p>
        {requirements.map((req, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={100}
            placeholder="Eg. Define the role of course"
            className="w-full border p-2 rounded mb-2"
            value={req}
            onChange={(e) => handleChange(setRequirements, idx, e.target.value)}
          />
        ))}
        <button
          className="bg-[#702DFF] text-white px-4 py-1 rounded-lg mt-2 hover:bg-purple-700"
          onClick={() => handleAddField(setRequirements)}
        >
          + Add more
        </button>
      </div>

      {/* Target Audience */}
      <div className="text-[16px]">
        <h3 className="font-semibold mb-1">Who is this course for?</h3>
        <p className="text-gray-600 mb-4">
          Write a clear description of the intended learners for your course who will find your course content valuable.
          This will help you attract the right learners to your course.
        </p>
        {targetAudience.map((aud, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={100}
            placeholder="Eg. Define the role of course"
            className="w-full border p-2 rounded mb-2"
            value={aud}
            onChange={(e) => handleChange(setTargetAudience, idx, e.target.value)}
          />
        ))}
        <button
          className="bg-[#702DFF] text-white px-4 py-1 rounded-lg mt-2 hover:bg-purple-700"
          onClick={() => handleAddField(setTargetAudience)}
        >
          + Add more
        </button>
      </div>
    </div>
    </div>
  );
};

export default IntendedCoursePage;