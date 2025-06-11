import { useEffect, useState } from "react";
import { Sun, Settings } from "lucide-react";

const DateTimeCard: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  const formattedDate = new Date("2023-08-02").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gray-100 w-full max-w-xs h-auto rounded-xl p-6 shadow-md space-y-4">
      {/* Time Section */}
      <div className="flex items-center space-x-3 mt-5">
        <Sun className="text-gray-400 w-15 h-15" />
        <div>
          <div className="text-4xl  text-gray-400">{time}</div>
          <div className="text-lg text-gray-400">Realtime Insight</div>
        </div>
      </div>

      {/* Date */}
      <div className="mt-15">
        <p className="text-xl font-bold text-gray-800">Today:</p>
        <p className="text-xl font-bold text-gray-800">{formattedDate}</p>
      </div>

      {/* Buttons */}
      <div className="space-y-5">
        <button className="w-full flex items-center justify-center space-x-2 bg-[#18181A80] text-white p-2 rounded-md hover:bg-gray-500 ">
          <Settings />
          <span>Library Policy Setup</span>
        </button>
        <button className="w-full flex items-center justify-center space-x-2 bg-[#18181A80] text-white p-2 rounded-md hover:bg-gray-500 ">
          <Settings />
          <span>Library Configuration</span>
        </button>
      </div>
    </div>
  );
};

export default DateTimeCard;
