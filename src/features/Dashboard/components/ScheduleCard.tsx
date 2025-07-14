import React from "react";

const ScheduleCard = () => {
  return (
    <div className="p-6 py-5 rounded-xl  bg-neutral-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">27 May</h2>

      <div className="space-y-4">
        {[
          { title: "Meet w/ Simmmple", time: "01:00 PM – 02:00 PM" },
          { title: "Fitness Training", time: "02:00 PM – 03:00 PM" },
          { title: "Reading time", time: "03:00 PM – 04:00 PM" },
        ].map((task, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <div className="w-1.5 h-5 mt-1 rounded-full bg-[#4318FF]" />
            <div>
              <h3 className="font-semibold text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-400">{task.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <a
          href="#"
          className="text-sm font-medium text-[#4318FF] hover:underline flex items-center gap-1"
        >
          View all Tasks →
        </a>
      </div>
    </div>
  );
};

export default ScheduleCard;
