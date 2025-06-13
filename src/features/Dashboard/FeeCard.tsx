import React from "react";
import { BarChart3 } from "lucide-react"; // or use any chart icon from Lucide or replace with an <img/>

const FeeCard = () => {
  return (
    <div className="w-[23rem] h-[181px] bg-neutral-100 rounded-xl p-4 flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">Fee Payment</p>
          <h2 className="text-2xl font-bold text-gray-800">RS. 4000</h2>
        </div>
        <div className="bg-purple-100 p-2 rounded-full">
          <BarChart3 className="text-purple-600 w-6 h-6" />
        </div>
      </div>

      {/* Button */}
      <button className="mt-4 w-full bg-purple-600 text-white font-medium py-2 rounded-lg hover:bg-purple-700 transition">
        Pay
      </button>

      {/* Bottom Text */}
      <p className="text-sm text-gray-500 mt-2">
        Last Fee Payment RS 4500
      </p>
    </div>
  );
};

export default FeeCard;
