import { Play } from "lucide-react";

export default function TeachersLeave() {
  return (
    <div className="flex-1 border rounded-lg bg-[#F5F5F7] shadow-sm max-w-[260px]">
      <div className="relative rounded-lg overflow-hidden h-full">
        {/* Background Image */}
        <img
          src="/test8.png"
          alt=""
          className="w-full h-full object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-5 py-4">
            <h1 className="uppercase text-white text-base">Leaves Management</h1>
          <h1 className="text-white text-sm xl:text-3xl font-semibold max-w-[220px]">
            Manage Teachers Leave
          </h1>

          <button className="mt-4 xl:w-[55%] flex items-center gap-2 xl:gap-4 bg-black text-white text-xs font-medium py-1 px-0.5 xl:px-3 xl:py-1.5 rounded-full">
            Leaves Page
            <div className="bg-white ml-[-10px] w-4 h-4 xl:w-5 xl:h-5 rounded-full flex items-center justify-center">
              <Play className=" w-3 h-3 xl:w-3.5 xl:h-3.5 text-black" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
