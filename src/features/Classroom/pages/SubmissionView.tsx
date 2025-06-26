"use client"

import type React from "react"
import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import FileViewer from "../components/FileViewer"

interface Student {
  name: string
  status: "Handed In" | "Assigned"
  initials: string
  color: string
}

const students: Student[] = [
  { name: "Priyansh Gupta", status: "Handed In", initials: "P", color: "bg-purple-400" },
  { name: "Hemish Jain", status: "Assigned", initials: "H", color: "bg-green-600" },
]

const SubmissionView: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [returnDropdownOpen, setReturnDropdownOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(students[0])
  const [showSingleReturnModal, setShowSingleReturnModal] = useState(false)
  const [showMultipleReturnModal, setShowMultipleReturnModal] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  const handleStudentSelection = (studentName: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentName) ? prev.filter((name) => name !== studentName) : [...prev, studentName],
    )
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(students.map((s) => s.name))
    }
    setSelectAll(!selectAll)
  }

  const handleReturnSingle = () => {
    setShowSingleReturnModal(false)
    setReturnDropdownOpen(false)
    // Handle single return logic here
  }

  const handleReturnMultiple = () => {
    setShowMultipleReturnModal(false)
    setReturnDropdownOpen(false)
    setSelectedStudents([])
    setSelectAll(false)
    // Handle multiple return logic here
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white text-gray-800 font-sans">
      {/* Sidebar */}
      <div className="sticky top-0 md:h-screen w-full md:w-auto">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-10 py-4 md:py-6 space-y-4 md:space-y-6 overflow-hidden">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-sm space-y-2 sm:space-y-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/Frame 1000001783 (2).png" alt="Frame" className="w-6 sm:w-auto" />
            <span className="text-sm sm:text-base font-medium">
              Late Submission: Simulink Onramp Course Certificate
            </span>
          </div>
          <button className="bg-[#702DFF] text-white text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-md" title="Go back">Back</button>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 relative">
          {/* Student Dropdown */}
          <div className="relative w-full sm:w-auto">
            <div
              className="flex items-center bg-gray-100 px-3 sm:px-20 py-2 rounded-md gap-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div
                className={`${selectedStudent.color} text-white w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold`}
              >
                {selectedStudent.initials}
              </div>
              <span className="text-xs sm:text-sm font-medium">{selectedStudent.name}</span>
              <ChevronDown size={14} aria-hidden="true" />
            </div>

            {dropdownOpen && (
              <div className="absolute z-50 mt-2 w-80 bg-[#070202bd] text-white rounded shadow-lg">
                <div className="flex justify-between px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                  <span>Sort by</span>
                  <div className="space-x-2">
                    <button className="hover:text-white" title="Sort by first name">First Name</button>
                    <button className="hover:text-white" title="Sort by last name">Last Name</button>
                  </div>
                </div>
                {students.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => {
                      setSelectedStudent(student)
                      setDropdownOpen(false)
                    }}
                  >
                    <div
                      className={`${student.color} w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold text-white`}
                    >
                      {student.initials}
                    </div>
                    <div className="flex justify-between w-full items-center text-sm">
                      <span>{student.name}</span>
                      <span
                        className={`text-xs ${student.status === "Handed In" ? "text-green-400" : "text-gray-400"}`}
                      >
                        {student.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="cursor-pointer" title="Previous student">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
            <button className="cursor-pointer" title="Next student">
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Return Buttons */}
          <div className="flex items-center gap-1 relative">
            <button className="bg-[#702DFF] text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-md" title="Return submission">
              Return
            </button>
            <button
              className="bg-[#702DFF] text-white p-2 rounded-md"
              onClick={() => setReturnDropdownOpen(!returnDropdownOpen)}
              title="Return options"
            >
              <ChevronDown size={14} aria-hidden="true" />
            </button>

            {/* Return Dropdown */}
            {returnDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 text-white rounded shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
                  onClick={() => {
                    setShowSingleReturnModal(true)
                    setReturnDropdownOpen(false)
                  }}
                  title="Return this submission"
                >
                  return this submission
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
                  onClick={() => {
                    setShowMultipleReturnModal(true)
                    setReturnDropdownOpen(false)
                  }}
                  title="Return multiple submissions"
                >
                  return multiple submissions
                </button>
              </div>
            )}
          </div>
        </div>

        {/* File Viewer */}
        <FileViewer />
      </div>

      {/* Single Return Modal */}
      {showSingleReturnModal && (
        <div className="fixed inset-0 bg-[#0400002b] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Return work to 1 student?</h3>
              <button onClick={() => setShowSingleReturnModal(false)} className="text-gray-400 hover:text-gray-600" title="Close modal">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Student will be notified and can check any marks you've left.</p>
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`${selectedStudent.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}
              >
                {selectedStudent.initials}
              </div>
              <div className="flex-1">
                <div className="font-medium">{selectedStudent.name}</div>
                <div className="text-sm text-gray-500">No mark</div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowSingleReturnModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                title="Cancel return"
              >
                Cancel
              </button>
              <button
                onClick={handleReturnSingle}
                className="px-4 py-2 bg-[#702DFF] text-white rounded hover:bg-[#5a24cc]"
                title="Confirm return"
              >
                Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multiple Return Modal */}
      {showMultipleReturnModal && (
        <div className="fixed inset-0 bg-[#0400002b] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Return multiple submissions</h3>
              <button onClick={() => setShowMultipleReturnModal(false)} className="text-gray-400 hover:text-gray-600" title="Close modal">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Select students that you want to return the submissions to</p>

            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-[#702DFF] rounded"
                />
                <span className="text-sm font-medium">{selectAll ? "Unselect All" : "Select all"}</span>
              </div>
              <div className="text-xs text-gray-500 mb-3">1 student selected (1 without draft mark)</div>
            </div>

            <div className="space-y-2 mb-6">
              {students.map((student, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.name)}
                    onChange={() => handleStudentSelection(student.name)}
                    className="w-4 h-4 text-[#702DFF] rounded"
                  />
                  <div
                    className={`${student.color} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {student.initials}
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-sm">{student.name}</span>
                    <span className="text-xs text-[#702DFF]">{student.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowMultipleReturnModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                title="Cancel return"
              >
                Cancel
              </button>
              <button
                onClick={handleReturnMultiple}
                className="px-4 py-2 bg-[#702DFF] text-white rounded hover:bg-[#5a24cc]"
                title="Confirm return"
              >
                Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default SubmissionView
