import React, { useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { lazy } from "react";
const PopupGrading= lazy(() => import("./PopupGrading"));
import { useEffect } from "react";

const GradingScheme: React.FC = () => {
  
 const [showPopup, setShowPopup] = useState(false);

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);
  return (
    <>
      <div className="w-full bg-[#702DFF] flex flex-col rounded-[0.65rem] p-6 gap-2 relative">
        <div className="text-[0.75rem] font-[400] text-white">Grading Scheme</div>
        <div className="text-[1.75rem] font-[500] text-white max-w-[20rem] flex-wrap ">
          Define how marks convert to grades
        </div>
        <div>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-black h-[1.3rem] w-fit rounded-[1.5rem] font-[500] text-[0.75rem] text-white flex gap-2 px-3 cursor-pointer"
          >
            Grading Scheme{" "}
            <span className="mt-0.5">
              <FaRegCirclePlay />
            </span>
          </button>
        </div>
        <div className="absolute top-0 right-7 w-[14.5rem] z-10">
          <img src="/container.png" alt="Banner" />
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 bg-white/30 bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
          <div className="relative bg-[#F5F5F7] rounded-lg shadow-lg p-4  max-w-[50rem] ">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <PopupGrading />
          </div>
        </div>
      )}
    </>
  );
};

export default GradingScheme;
