import React from "react";

const courses = [
  { name: "Maths", author: "Hemish Morgan", rating: 4.9 },
  { name: "Computer", author: "Himanshu Norman", rating: 4.7 },
  { name: "Master Instagram", author: "Shulin Gill", rating: 4.6 },
  { name: "Hindi", author: "Mayank Tatte", rating: 4.8 },
  { name: "Physical Education", author: "Keshav Green", rating: 4.7 },
];

const Dashboard: React.FC = () => (
  <div className="bg-gray-50 min-h-screen p-8 font-sans">
    {/* Top Search Bar */}
    <div className="flex items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="What assignment are you looking for"
        className="flex-1 px-6 py-3 rounded-xl bg-white shadow text-gray-600 outline-none"
      />
      <button className="bg-white p-3 rounded-xl shadow">
        <span className="text-2xl font-bold">+</span>
      </button>
      <button className="bg-white p-3 rounded-xl shadow">
        <span role="img" aria-label="notifications">🔔</span>
      </button>
      <button className="bg-white p-3 rounded-xl shadow">
        <span role="img" aria-label="profile">👤</span>
      </button>
    </div>

    <div className="grid grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="flex flex-col gap-6">
        {/* Monthly Attendance */}
        <div className="bg-white rounded-xl p-6 shadow flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg className="absolute top-0 left-0" width="80" height="80">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#8B5CF6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={201}
                strokeDashoffset={201 - (201 * 0.67)}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-purple-600">
              67%
            </span>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Monthly Attendance</div>
            <div className="text-xs text-gray-400">Absent for 18 days this year</div>
            <div className="text-green-500 text-xs mt-2 font-semibold">
              ▲ 8.5% Up from previous month
            </div>
          </div>
        </div>
        {/* Your Statistics */}
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Your statistics</span>
            <button className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-medium text-purple-600">Weekly</button>
          </div>
          <div className="flex items-end gap-2 h-28">
            {/* Fake bar chart */}
            {[70, 80, 60, 90, 100, 80, 70].map((h, i) => (
              <div
                key={i}
                className="bg-purple-400 rounded w-4"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Maths</span>
            <span>English</span>
            <span>Hindi</span>
            <span>Science</span>
            <span>Physical</span>
            <span>Computer</span>
          </div>
        </div>
        {/* Fee Payment */}
        <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
          <div className="text-sm text-gray-500">Fee Payment</div>
          <div className="text-2xl font-semibold">RS. 4000</div>
          <button className="bg-purple-500 text-white rounded px-4 py-2 mt-2 hover:bg-purple-600">
            Pay
          </button>
          <div className="text-xs text-gray-400">Last Fee Payment RS 4500</div>
        </div>
      </div>

      {/* Middle Column */}
      <div className="flex flex-col gap-6">
        {/* Class Rank */}
        <div className="bg-white rounded-xl p-6 shadow flex items-center gap-4">
          <div className="w-20 h-20 bg-purple-100 rounded-xl flex items-center justify-center">
            <span className="text-4xl text-purple-400">✦</span>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Class Rank</div>
            <div className="text-xl font-semibold">Rank: 5 of 42</div>
            <div className="text-xs text-gray-400">Term 1: 487 / 600</div>
            <div className="flex gap-3 mt-2 text-xs">
              <span className="text-green-500">Top: 98 in Maths</span>
              <span className="text-red-500">Low: 62 in English</span>
            </div>
          </div>
          <div className="ml-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
        </div>
        {/* Schedule */}
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-xl font-semibold mb-2">27 July</div>
          <ul className="space-y-2">
            <li>
              <div className="font-medium">Meet w/ Simmpmple</div>
              <div className="text-xs text-gray-500">01:00 PM - 02:00 PM</div>
            </li>
            <li>
              <div className="font-medium">Fitness Training</div>
              <div className="text-xs text-gray-500">02:00 PM - 03:00 PM</div>
            </li>
            <li>
              <div className="font-medium">Reading time</div>
              <div className="text-xs text-gray-500">03:00 PM - 04:00 PM</div>
            </li>
          </ul>
          <button className="mt-4 text-purple-600 hover:underline text-sm font-medium">View all Tasks</button>
        </div>
        {/* Activity */}
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl p-6 shadow text-white flex flex-col">
          <div className="text-xs">Activity</div>
          <div className="text-lg font-semibold">233 × 345</div>
          <div className="text-2xl font-bold mt-2">$540.50</div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-6">
        {/* Courses */}
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex gap-6 mb-4 font-semibold text-gray-500 text-sm">
            <span className="text-purple-600 border-b-2 border-purple-600 pb-1">All Courses</span>
            <span className="hover:text-purple-600 cursor-pointer">The Newest</span>
            <span className="hover:text-purple-600 cursor-pointer">Active</span>
            <span className="hover:text-purple-600 cursor-pointer">Older</span>
          </div>
          <ul className="space-y-3">
            {courses.map((course, idx) => (
              <li key={idx} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                    {course.name[0]}
                  </span>
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-xs text-gray-500">by {course.author}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-sm">🔥 {course.rating}</span>
                  <button className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 text-xs font-semibold">
                    View course
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Online Course Banner */}
        <div className="bg-gray-100 rounded-xl p-6 shadow flex flex-col items-start relative overflow-hidden">
          <div className="text-lg font-semibold text-purple-600 mb-2">
            Sharpen <span className="text-gray-700">Your Skills With <br /> Professional Online Courses</span>
          </div>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center gap-2">
            Join Now <span className="text-xs">▶</span>
          </button>
          {/* Decorative stars */}
          <span className="absolute right-6 top-6 text-purple-200 text-4xl">✦</span>
          <span className="absolute right-16 bottom-4 text-purple-100 text-3xl">✦</span>
        </div>
      </div>
    </div>
    {/* Continue Watching (footer) */}
    <div className="mt-8 text-2xl font-semibold text-gray-700">Continue Watching</div>
  </div>
);

export default Dashboard;
