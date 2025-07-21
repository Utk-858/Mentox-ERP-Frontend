import React from "react";
import { useNavigate } from "react-router-dom";
const HolidayEventCard: React.FC = () => {
    const navigate = useNavigate();
    
      const handleButtonClick = () => {
        navigate("holiday");
      };
  return (
    <div className="bg-[#F5F5F7] rounded-2xl p-6 w-full  relative overflow-hidden flex flex-col md:flex-row md:items-end justify-between gap-4 mr-8">
      {/* Left content */}
      <div className="w-full">
        {/* Subheading */}
        <p className="text-[0.75rem] font-[400] uppercase text-[#000000]">
          Event and Holiday Management
        </p>

        {/* Heading */}
        <h2 className="text-[1.5rem] font-[600]  text-[#702DFF] min-w-[50rem]">
          Manage all your holidays and Events
        </h2>

        {/* Label and Select */}
        <div className="flex gap-4 mt-2">
        <div>
        <label className="block  text-[1.15rem] font-[600] text-[#606060]">
          Academic Year<span className="text-red-500">*</span>
        </label>
        <select className="mt-1 w-56 px-4 py-2  bg-[#D2D2D233] border-gray-300 rounded-md  text-[0.875rem]  ">
          <option value="">Select</option>
          <option value="2024">2024-25</option>
          <option value="2025">2025-26</option>
        </select>
        </div>
        <div className="w-fit">
        <button onClick={handleButtonClick} className="mt-8 bg-black text-white text-[0.875rem] px-4 py-2 rounded-md font-[500] z-10">
          Manage leave and Holidays
        </button>
      </div>
        </div>
      </div>

      {/* Right Button */}
      

      {/* Decorative Image */}
      <div className="absolute top-0 right-[-6.5rem] w-[16rem]  z-0 ">
        <img src="/test7.png" alt="Decoration" />
      </div>
    </div>
  );
};

export default HolidayEventCard;
