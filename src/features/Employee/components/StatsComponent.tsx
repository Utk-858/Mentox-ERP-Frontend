import { Users, TrendingUp, Plus } from "lucide-react";

export default function StatsComponent() {
  return (
    <div className="flex gap-4">
      {/* Total Employees Card */}
      <div className="flex-1 border rounded-lg bg-[#F5F5F7] shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">352</div>
              <div className="text-lg font-medium text-gray-600 mt-1 mb-6">
                Total Employees
              </div>
              <div className="text-xs text-[#20222471] font-medium mt-2 flex items-center gap-1">
                <div className="rounded-full p-1 bg-[#98ce716c]">
                  <Plus className="h-2.5 w-2.5 text-green-600" />
                </div>
                2 new employees added!
              </div>
            </div>
            <div className="p-2 mt-[-4rem] bg-[#E6EAF5] rounded-full">
              <Users className="h-5 w-5 text-[#702DFF]" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Average Attendance Card */}
      <div className="flex-1 border rounded-lg bg-[#F5F5F7] shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">78%</div>
              <div className="text-base font-medium text-gray-600 mt-1 mb-4">
                Monthly Average Attendance
              </div>
              <div className="text-xs text-[#20222471] font-medium mt-2 flex items-center gap-1">
                <div className="rounded-full p-1 bg-[#98ce716c]">
                  <TrendingUp className="h-2.5 w-2.5 text-green-600" />
                </div>
                +5% increase from previous month
              </div>
            </div>
            <div className="p-2 mt-[-4rem] bg-[#E6EAF5] rounded-full">
              <img
                src="https://res.cloudinary.com/dikylfimn/image/upload/v1751220649/mdi_weather-time_bhgedu.png"
                alt=""
                className="h-5 w-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
