import React from "react";
import { useNavigate } from "react-router-dom";

const LeaveCategoryCard: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("leavecategory");
  };

  return (
    <div className="bg-[#702DFF] rounded-2xl p-6 text-white w-full relative overflow-hidden">
      {/* Top Small Text */}
      <p className="text-[0.75rem] font-[400] uppercase">
        Configure Leave Categories
      </p>

      {/* Main Heading */}
      <h2 className="text-[1.5rem] font-[600] mt-1 max-w-[15rem]">
        Manage All Leave Categories
      </h2>

      {/* Button */}
      <button
        onClick={handleButtonClick}
        className="mt-2 bg-black text-white text-sm px-4 py-1.5 rounded-full font-medium"
      >
        Leave Management
      </button>

      <div className="absolute top-0 right-7 w-[16rem] z-10">
        <img src="/container.png" alt="Banner" />
      </div>
    </div>
  );
};

export default LeaveCategoryCard;
