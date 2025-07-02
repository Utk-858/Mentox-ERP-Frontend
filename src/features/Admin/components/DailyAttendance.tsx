import { useState } from "react"
import { Search, Calendar } from "lucide-react"

interface Employee {
  id: number
  name: string
  isPresent: boolean
  attendancePercentage: number
}

export default function Component() {
  const [selectedDate, setSelectedDate] = useState("2028-07-07")
  const [searchTerm, setSearchTerm] = useState("")
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "Navya Jain", isPresent: true, attendancePercentage: 80 },
    { id: 2, name: "Navya Jain", isPresent: true, attendancePercentage: 91 },
    { id: 3, name: "Navya Jain", isPresent: true, attendancePercentage: 50 },
    { id: 4, name: "Navya Jain", isPresent: true, attendancePercentage: 88 },
    { id: 5, name: "Navya Jain", isPresent: true, attendancePercentage: 95 },
  ])

  const markAllPresent = () => {
    setEmployees(employees.map((emp) => ({ ...emp, isPresent: true })))
  }

  const toggleAttendance = (id: number, status: "present" | "absent") => {
    setEmployees(employees.map((emp) =>
      emp.id === id ? { ...emp, isPresent: status === "present" } : emp
    ))
  }

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md min-w-4xl w-full">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Daily Attendance
              </h1>
              <p className="text-gray-600 text-sm">Mark Today's Attendance</p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative">
                <label htmlFor="attendance-date" className="sr-only">Select Date</label>
                <input
                  id="attendance-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-36 border border-gray-600 bg-gray-100 rounded-md py-2 px-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
                  title="Select attendance date"
                />
              </div>
              <button
                onClick={markAllPresent}
                className="bg-[#702DFF] hover:bg-[#5c22d1] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Mark all Present
              </button>
              <div className="relative">
                <label htmlFor="search-employee" className="sr-only">Search Employee</label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="search-employee"
                  type="text"
                  placeholder="Search Employee"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-48 bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#702DFF]"
                  title="Search for employee by name"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
            <div>Emp. Id</div>
            <div>Name</div>
            <div>Present</div>
            <div>Absent</div>
            <div>Attendance%</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="grid grid-cols-5 gap-4 p-4 items-center"
              >
                <div className="text-gray-900 font-medium">{employee.id}</div>
                <div className="text-gray-900">{employee.name}</div>
                <div>
                  <button
                    onClick={() => toggleAttendance(employee.id, "present")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                      employee.isPresent
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-green-50"
                    }`}
                  >
                    Present
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => toggleAttendance(employee.id, "absent")}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                      !employee.isPresent
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-red-50"
                    }`}
                  >
                    Absent
                  </button>
                </div>
                <div>
                  <span className="px-3 py-1 rounded-md text-sm font-medium bg-[#EFE6FF] text-[#702DFF] border border-[#702DFF]">
                    {employee.attendancePercentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
