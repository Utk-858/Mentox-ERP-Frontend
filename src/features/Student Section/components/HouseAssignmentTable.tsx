import { useState } from "react"
import HouseConfigurationModal from "./HouseConfigurationModal"

interface House {
  id: string
  name: string
  color: string
}

interface Student {
  admissionNo: string
  studentName: string
  class: string
  section: string
  houseAssigned: string
  houseColor: string
}

const initialStudents: Student[] = [
  {
    admissionNo: "STU001",
    studentName: "Aarav Sharma",
    class: "10",
    section: "A",
    houseAssigned: "Red",
    houseColor: "#ef4444",
  },
  {
    admissionNo: "STU002",
    studentName: "Diya Patel",
    class: "10",
    section: "B",
    houseAssigned: "Green",
    houseColor: "#22c55e",
  },
  {
    admissionNo: "STU003",
    studentName: "Advik Singh",
    class: "10",
    section: "A",
    houseAssigned: "Blue",
    houseColor: "#3b82f6",
  },
  {
    admissionNo: "STU004",
    studentName: "Ananya Khan",
    class: "10",
    section: "C",
    houseAssigned: "Red",
    houseColor: "#ef4444",
  },
  {
    admissionNo: "STU005",
    studentName: "Kabir Kumar",
    class: "10",
    section: "A",
    houseAssigned: "Green",
    houseColor: "#22c55e",
  },
  {
    admissionNo: "STU006",
    studentName: "Kabir Kumar",
    class: "10",
    section: "B",
    houseAssigned: "Red",
    houseColor: "#ef4444",
  },
]

export default function HouseAssignmentTable() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>(["STU001"])
  const [classFilter, setClassFilter] = useState("Class")
  const [isHouseModalOpen, setIsHouseModalOpen] = useState(false)
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [houses, setHouses] = useState<House[]>([
    { id: "1", name: "Red", color: "#ef4444" },
    { id: "2", name: "Green", color: "#22c55e" },
    { id: "3", name: "Blue", color: "#3b82f6" },
  ])

  const handleStudentSelect = (admissionNo: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, admissionNo])
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== admissionNo))
    }
  }

  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(students.map((student) => student.admissionNo))
    }
  }

  const handleHouseAssignment = (admissionNo: string, houseName: string) => {
    const selectedHouse = houses.find((house) => house.name.toLowerCase() === houseName)
    if (selectedHouse) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.admissionNo === admissionNo
            ? {
                ...student,
                houseAssigned: selectedHouse.name,
                houseColor: selectedHouse.color,
              }
            : student,
        ),
      )
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">House Assignment</h1>
          <p className="text-gray-600">Assign houses to students in bulk or manually.</p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-32 px-3 py-2 bg-gray-900 text-white border border-gray-900 rounded"
              title="Filter by class"
              aria-label="Filter by class"
            >
              <option value="Class">Class</option>
              <option value="10">Class 10</option>
              <option value="9">Class 9</option>
              <option value="8">Class 8</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
            >
              Select All
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">
              Auto Assign
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">
              Export
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Save Assignments
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12"></th>
                <th className="text-left px-3 py-2 text-gray-600 font-medium">Admission No.</th>
                <th className="text-left px-3 py-2 text-gray-600 font-medium">Student Name</th>
                <th className="text-left px-3 py-2 text-gray-600 font-medium">Class</th>
                <th className="text-left px-3 py-2 text-gray-600 font-medium">Section</th>
                <th className="text-left px-3 py-2 text-gray-600 font-medium">House Assigned</th>
                <th className="text-left px-3 py-2 text-gray-600 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.admissionNo}
                  className={selectedStudents.includes(student.admissionNo) ? "bg-purple-50" : ""}
                >
                  <td className="px-3 py-2">
                    <label className="sr-only" htmlFor={`select-student-${student.admissionNo}`}>Select student</label>
                    <input
                      id={`select-student-${student.admissionNo}`}
                      type="checkbox"
                      checked={selectedStudents.includes(student.admissionNo)}
                      onChange={(e) => handleStudentSelect(student.admissionNo, e.target.checked)}
                      className="w-4 h-4 text-purple-600"
                    />
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-900">{student.admissionNo}</td>
                  <td className="px-3 py-2 text-gray-900">{student.studentName}</td>
                  <td className="px-3 py-2 text-gray-600">{student.class}</td>
                  <td className="px-3 py-2 text-gray-600">{student.section}</td>
                  <td className="px-3 py-2">
                    <span className="font-medium text-gray-900">{student.houseAssigned}</span>
                  </td>
                  <td className="px-3 py-2">
                    <label className="sr-only" htmlFor={`select-house-${student.admissionNo}`}>Select house for student</label>
                    <select
                      id={`select-house-${student.admissionNo}`}
                      value={student.houseAssigned.toLowerCase()}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value === "add-house") {
                          setIsHouseModalOpen(true)
                        } else {
                          handleHouseAssignment(student.admissionNo, value)
                        }
                      }}
                      className="w-32 px-2 py-1 bg-gray-900 text-white border border-gray-900 rounded"
                      title="Select house"
                      aria-label="Select house"
                    >
                      {houses.map((house) => (
                        <option key={house.id} value={house.name.toLowerCase()}>
                          {house.name}
                        </option>
                      ))}
                      <option value="add-house">+ Add House</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* House Configuration Modal */}
        <HouseConfigurationModal
          isOpen={isHouseModalOpen}
          onClose={() => setIsHouseModalOpen(false)}
          houses={houses}
          setHouses={setHouses}
        />
      </div>
    </div>
  )
}
