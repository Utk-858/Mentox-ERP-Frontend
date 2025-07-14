import { useState, useEffect } from "react";
import { Sun, Settings } from "lucide-react";

export default function DateTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });

  // Format date as e.g. 2nd August 2023
  const formattedDate = time.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-sm border-gray-400  min-w-[300px] min-h-[330px]">
      <div className="flex items-center gap-3 mt-3 mb-6">
        <Sun className="w-14 h-14 text-gray-400" />
        <div>
          <div className="text-3xl font-semibold text-gray-400">
            {formattedTime}
          </div>
          <div className="text-sm text-gray-400">Realtime insight</div>
        </div>
      </div>

      <div className="mb-2 mt-20">
        <div className="text-2xl font-bold text-gray-700">Today:</div>
        <div className="text-2xl font-bold text-gray-700">{formattedDate}</div>
      </div>

      <button className="bg-[#702DFF] hover:bg-[#5f26e6] text-white w-full px-4 py-3 rounded-md flex items-center gap-2 font-medium transition-colors">
        <Settings className="w-4 h-4" />
        Advanced Configuration
      </button>
    </div>
  );
}
