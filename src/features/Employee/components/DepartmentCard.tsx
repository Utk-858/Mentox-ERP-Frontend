import { Settings } from "lucide-react";

export default function DepartmentCard() {
  return (
    <div className="flex-1 border rounded-lg bg-gray-100 shadow-sm max-w-[300px] h-[165px] relative overflow-hidden">
      {/* Stars Image on right */}
      <img
        src="/test7.png"
        alt=""
        className="absolute right-0 top-0 h-full object-cover"
      />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 py-4">
        <h2 className="text-[#702DFF] text-lg font-semibold mb-4 max-w-[180px]">
          Department & Designation
        </h2>
        <button className="flex items-center gap-2 bg-[#702DFF] text-white text-xs font-medium px-3 py-2 rounded-md w-fit">
          <Settings className="w-4 h-4" />
          Configuration
        </button>
      </div>
    </div>
  );
}
