import React, { useState } from "react"
import {Search} from 'lucide-react'
import { useNavigate } from "react-router-dom"

interface Student {
  admissionNo: string
  studentName: string
  class: string
  section: string
  feeStatus: "Paid" | "Pending"
  yot: number
  isDeleted: boolean
}

const studentsData: Student[] = [
  {
    admissionNo: "STU001",
    studentName: "Aarav Sharma",
    class: "10",
    section: "A",
    feeStatus: "Paid",
    yot: 2023,
    isDeleted: false,
  },
  {
    admissionNo: "STU002",
    studentName: "Diya Patel",
    class: "11",
    section: "B",
    feeStatus: "Paid",
    yot: 2024,
    isDeleted: false,
  },
  {
    admissionNo: "STU003",
    studentName: "Advik Singh",
    class: "12",
    section: "F",
    feeStatus: "Paid",
    yot: 2022,
    isDeleted: false,
  },
  {
    admissionNo: "STU004",
    studentName: "Ananya Khan",
    class: "9",
    section: "A",
    feeStatus: "Paid",
    yot: 2025,
    isDeleted: false,
  },
  {
    admissionNo: "STU005",
    studentName: "Kabir Kumar",
    class: "10",
    section: "D",
    feeStatus: "Paid",
    yot: 2024,
    isDeleted: false,
  },
]

export default function TCListComp() {
  const [selectedYear, setSelectedYear] = useState<string>("all-years")
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/TC/certificate-details" );
  };
  // Filter students based on selected year
  const filteredStudents = selectedYear === "all-years"
    ? studentsData
    : studentsData.filter((student) => student.yot.toString() === selectedYear)

  return (
    <div className="w-full max-w-7xl mx-auto mt-[120px] p-6 bg-gray-100 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">TC List</h1>
          <p className="text-sm text-gray-600">
            Comprehensive List of Students for Whom Transfer Certificates Have Been Successfully Generated as of Now
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-4">
          <div className="relative bg-gray-900 text-white border flex border-gray-700 rounded-md ">
              <Search className="text-gray-200 ml-3 w-5 h-5 mt-2.5"></Search>
            <input
              type="text"
              placeholder="Search Student"
              className="placeholder-gray-400 pl-3  px-3 py-2 w-60"
            />
         
          </div>

          <select
            className="bg-gray-900 text-white border border-gray-700 rounded-md px-3 py-2 w-32"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            title="Filter by year"
            aria-label="Filter students by year"
          >
            <option value="all-years">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Admission No.", "Student Name", "Class", "Section", "Fee Status", "Y.O.T", "Action"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.admissionNo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.admissionNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.section}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block text-sm px-2 py-1 rounded bg-green-100 text-green-800">
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.yot}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button  onClick={handleViewDetails} className="text-blue-600 hover:text-blue-800 text-sm ">View Details</button>
                      <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs">Deleted</span>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No students found for selected year.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
