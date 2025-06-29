import { useState } from "react";
import { Search, ChevronDown, Filter } from "lucide-react";

interface EmployeeRecord {
  employeeId: string;
  name: string;
  avatar: string;
  department: string;
  designation: string;
  attendance: number;
  contact: string;
}

export default function EmployeeDetails() {
  const employeeRecords: EmployeeRecord[] = [
    {
      employeeId: "EMP1278",
      name: "Alex Johnson",
      avatar: "AJ",
      department: "Teaching",
      designation: "PGT",
      attendance: 88,
      contact: "+91 9876303678",
    },
    {
      employeeId: "EMP1279",
      name: "Sarah Wilson",
      avatar: "SW",
      department: "Teaching",
      designation: "TGT",
      attendance: 70,
      contact: "+91 9876303679",
    },
    {
      employeeId: "EMP1280",
      name: "Michael Brown",
      avatar: "MB",
      department: "Administration",
      designation: "Manager",
      attendance: 92,
      contact: "+91 9876303680",
    },
    {
      employeeId: "EMP1281",
      name: "Emily Davis",
      avatar: "ED",
      department: "Teaching",
      designation: "PGT",
      attendance: 85,
      contact: "+91 9876303681",
    },
    {
      employeeId: "EMP1282",
      name: "David Miller",
      avatar: "DM",
      department: "Support",
      designation: "Assistant",
      attendance: 78,
      contact: "+91 9876303682",
    },
    {
      employeeId: "EMP1283",
      name: "Lisa Anderson",
      avatar: "LA",
      department: "Teaching",
      designation: "TGT",
      attendance: 95,
      contact: "+91 9876303683",
    },
    {
      employeeId: "EMP1284",
      name: "Robert Taylor",
      avatar: "RT",
      department: "Administration",
      designation: "HR",
      attendance: 82,
      contact: "+91 9876303684",
    },
  ];

  const [selectedDepartment, setSelectedDepartment] = useState("Department");
  const [selectedSection, setSelectedSection] = useState("Section");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Sort by");

  const getAttendanceBadgeColor = (attendance: number) => {
    if (attendance >= 90) return "bg-green-100 text-green-800";
    if (attendance >= 80) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  // Apply filtering
  let filteredRecords = employeeRecords;

  if (selectedDepartment !== "Department") {
    filteredRecords = filteredRecords.filter(
      (rec) => rec.department === selectedDepartment
    );
  }

  if (selectedSection !== "Section") {
    // If your records have a section field, you'd filter here.
    // Placeholder for future logic.
  }

  if (searchTerm.trim() !== "") {
    filteredRecords = filteredRecords.filter((rec) =>
      rec.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === "Name") {
    filteredRecords = [...filteredRecords].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortBy === "Department") {
    filteredRecords = [...filteredRecords].sort((a, b) =>
      a.department.localeCompare(b.department)
    );
  } else if (sortBy === "Attendance") {
    filteredRecords = [...filteredRecords].sort(
      (a, b) => b.attendance - a.attendance
    );
  }

  return (
    <div className="bg-[#60606010] w-full rounded-xl p-5">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 ">
          Employee Details
        </h1>
        <p className="text-gray-600">View and manage all your employees</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-4">
       <div className="relative">
  {/* The Filter Icon on the left */}
  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
  
  <select
    value={selectedDepartment}
    onChange={(e) => setSelectedDepartment(e.target.value)}
    className="appearance-none bg-black text-white pl-10 pr-8 py-2 rounded-lg text-sm font-medium cursor-pointer"
    title="Select Department"
    aria-label="Select Department"
  >
    <option value="Department">Department</option>
    <option value="Teaching">Teaching</option>
    <option value="Administration">Administration</option>
    <option value="Support">Support</option>
  </select>

  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
</div>

          {/* Section Filter */}

          <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="appearance-none bg-black text-white pl-10 pr-8 py-2 rounded-lg text-sm font-medium cursor-pointer"
              title="Select Section"
              aria-label="Select Section"
            >
              <option value="Section">Section</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Senior">Senior</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-4 ml-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-black text-white rounded-lg text-sm placeholder-gray-400 w-64"
            />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-black text-white px-4 py-2 pr-8 rounded-lg text-sm font-medium cursor-pointer"
              title="Sort Records"
              aria-label="Sort Records"
            >
              <option value="Sort by">Sort by</option>
              <option value="Name">Name</option>
              <option value="Department">Department</option>
              <option value="Attendance">Attendance</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
          </div>
        </div>
      </div>

{/* Table Wrapper */}
<div className="w-full overflow-auto scrollbar-hide max-h-96">
  <table className="min-w-full table-fixed">
    <thead>
      <tr className="border-b border-gray-200">
        <th className="text-left py-3 px-4 font-medium text-gray-700 w-32">
          Employee ID
        </th>
        <th className="text-left py-3 px-4 font-medium text-gray-700 w-48">
          Name
        </th>
        <th className="text-left py-3 px-4 font-medium text-gray-700 w-40">
          Department
        </th>
        <th className="text-left py-3 px-4 font-medium text-gray-700 w-40">
          Designation
        </th>
        <th className="text-left py-3 px-4 font-medium text-gray-700 w-32">
          Attendance
        </th>
        <th className="text-left py-3 px-4 font-medium text-gray-700 w-48">
          Contact
        </th>
        <th className="text-left py-3 px-4 font-medium text-gray-700 w-32">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {filteredRecords.map((record, index) => (
        <tr
          key={index}
          className="border-b border-gray-100 hover:bg-gray-50"
        >
          <td className="py-3 px-4 text-gray-600">
            {record.employeeId}
          </td>
          <td className="py-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {record.avatar}
                </span>
              </div>
              <span className="text-gray-900 font-medium">
                {record.name}
              </span>
            </div>
          </td>
          <td className="py-3 px-4 text-gray-600">
            {record.department}
          </td>
          <td className="py-3 px-4 text-gray-600">
            {record.designation}
          </td>
          <td className="py-3 px-4">
            <span
              className={`px-2 py-2  text-xs font-medium ${getAttendanceBadgeColor(
                record.attendance
              )}`}
            >
              {record.attendance}%
            </span>
          </td>
          <td className="py-3 px-4 text-gray-600">
            {record.contact}
          </td>
          <td className="py-3 px-4">
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              View Details
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
