import { Play } from "lucide-react";

export default function MeetSchedule() {
  return (
    <div className="flex-1 border rounded-lg bg-[#F5F5F7] shadow-sm max-w-[400px]">
      <div className="relative rounded-lg overflow-hidden h-[100px]">
        {/* Background Image */}
        <img
          src="/test8.png"
          alt=""
          className="w-full h-full object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-5 py-4">
          <h2 className="text-white text-xl font-semibold max-w-[220px]">
           Meet Schedule
          </h2>

          <button className="mt-4 w-[45%] flex gap-2 bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full">
            Attendance Chart
            <div className="bg-white w-5 h-5 rounded-full flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-black" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
