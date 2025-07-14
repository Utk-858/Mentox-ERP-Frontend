import { useState } from "react";

export default function AttendanceOverview() {
  const [filter, setFilter] = useState("All Classes");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const attendanceData = [
    {
      id: "2341421",
      employee: "Ahmed Rashdan",
      role: "Help Desk Executive",
      department: "IT Department",
      date: "29 July 2023",
      status: "Half Day",
      checkIn: "09:00",
      checkOut: "18:00",
      statusColor: "bg-blue",
    },
    {
      id: "3411421",
      employee: "Ali Alhamdan",
      role: "Senior Executive",
      department: "Marketing",
      date: "29 July 2023",
      status: "Absent",
      checkIn: "00:00",
      checkOut: "00:00",
      statusColor: "bg-red",
    },
    {
      id: "2341121",
      employee: "Mona Alghafar",
      role: "Senior Manager",
      department: "Design",
      date: "29 July 2023",
      status: "Late arrival",
      checkIn: "10:30",
      checkOut: "18:00",
      statusColor: "bg-yellow",
    },
    {
      id: "2341421",
      employee: "Moustafa Adel",
      role: "Director",
      department: "Development",
      date: "29 July 2023",
      status: "Present",
      checkIn: "09:00",
      checkOut: "18:00",
      statusColor: "bg-green",
    },
    {
      id: "2341421",
      employee: "Jhon Neleson",
      role: "Director",
      department: "Sales",
      date: "29 July 2023",
      status: "Present",
      checkIn: "09:00",
      checkOut: "18:00",
      statusColor: "bg-green",
    },
    {
      id: "2341421",
      employee: "Kadi Manela",
      role: "System coordinator",
      department: "IT Department",
      date: "29 July 2023",
      status: "Half Day",
      checkIn: "-",
      checkOut: "-",
      statusColor: "bg-blue",
    },
  ];

  // mapping status to class colors
  const statusColors = {
    "bg-blue": "bg-[#dbeafe] text-[#1e40af]",
    "bg-red": "bg-[#fee2e2] text-[#b91c1c]",
    "bg-yellow": "bg-[#fef9c3] text-[#92400e]",
    "bg-green": "bg-[#d1fae5] text-[#065f46]",
  };

  // compute filtered data
  const filteredData =
    filter === "All Classes"
      ? attendanceData
      : attendanceData.filter((item) =>
          item.status.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Attendance Overview
          </h1>
          <p className="text-sm text-gray-600 mt-1">View Attendance</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md text-white"
            style={{ backgroundColor: "#7033FF" }}
          >
            {/* Calendar Icon */}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M8 7V3m8 4V3m-9 8h10m-12 4h12m-14 4h14"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            29 July 2023
          </button>

          {/* Search Button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-black hover:bg-gray-800 text-white">
            {/* Search Icon */}
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search Employee
          </button>

          {/* Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-black hover:bg-gray-800 text-white w-40 justify-between"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {/* Filter Icon */}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zm0 4h18v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"
                />
              </svg>
              <span>{filter}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                {[
                  "All Classes",
                  "Present",
                  "Absent",
                  "Late",
                  "Half Day",
                ].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setFilter(item);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-gray-600 font-medium text-left p-4">ID</th>
              <th className="text-gray-600 font-medium text-left p-4">
                Employee
              </th>
              <th className="text-gray-600 font-medium text-left p-4">Role</th>
              <th className="text-gray-600 font-medium text-left p-4">
                Department
              </th>
              <th className="text-gray-600 font-medium text-left p-4">Date</th>
              <th className="text-gray-600 font-medium text-left p-4">
                Status
              </th>
              <th className="text-gray-600 font-medium text-left p-4">
                Check-in
              </th>
              <th className="text-gray-600 font-medium text-left p-4">
                Check-out
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-gray-500 p-6 bg-gray-50"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              filteredData.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">
                    {record.id}
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    {record.employee}
                  </td>
                  <td className="p-4 text-gray-600">{record.role}</td>
                  <td className="p-4 text-gray-600">
                    {record.department}
                  </td>
                  <td className="p-4 text-gray-600">{record.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[record.statusColor as keyof typeof statusColors]}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-blue-600 font-medium">
                    {record.checkIn}
                  </td>
                  <td className="p-4 text-blue-600 font-medium">
                    {record.checkOut}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
