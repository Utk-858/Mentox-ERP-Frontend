import React from "react";
import Sidebar from "../front/Sidebar";
import Container from "./Container";
import BlackBox from "./BlackBox";
import Learn from "./Learn";
import Curriculum from "./Curriculum";
import Review from "./Review";
import ContinueWatching from "../front/ContinueWatching";

const Hero2: React.FC = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen  font-sans">
      <div className="w">
        <Sidebar />
      </div>

      {/* Header and Course Title */}

      <div className="flex w-full flex-col py-8">
        {/* Container and Info Box in one column */}
        <div className="flex flex-col items-center">
          <Container />
          {/* Black Info Box MOVED inside here */}
          <BlackBox />
          <Learn />
          <Curriculum />
          <Review />

          {/* Leave a Comment */}
          <div className="p-6 rounded-lg mb-10 max-w-5xl w-full">
            <h2 className="text-xl font-bold mb-2">Leave a comment</h2>
            <p className="text-sm text-gray-600 mb-4">
              Logged in as{" "}
              <span className="font-medium text-black">pensive-tesla</span>.{" "}
              <a
                href="#"
                className="text-sm text-gray-700 underline hover:text-black"
              >
                Edit your profile
              </a>
              ,{" "}
              <a
                href="#"
                className="text-sm text-gray-700 underline hover:text-black"
              >
                Log out?
              </a>{" "}
              <span className="text-gray-500">*</span> Required fields are
              marked
            </p>

            <form className="space-y-4">
              <textarea
                placeholder="Enter your comment"
                className="w-full min-h-[120px] p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>

              <button
                type="submit"
                className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition text-sm"
              >
                Post A Comment
              </button>
            </form>
          </div>
        <div className="max-w-5xl w-full p-3">
<ContinueWatching/>
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero2;
