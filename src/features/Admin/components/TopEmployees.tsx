import { useState, useEffect } from "react"

// Type definitions
interface Employee {
  id: number
  name: string
  attendance: number
  avatar?: string
  rank: number
}

interface EmployeesApiResponse {
  employees: Employee[]
}

// Mock data
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Hemish Jain",
    attendance: 94,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&h=80&w=80",
    rank: 1,
  },
  {
    id: 2,
    name: "Sanya Kapoor",
    attendance: 92,
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&h=80&w=80",
    rank: 2,
  },
  {
    id: 3,
    name: "Raj Malhotra",
    attendance: 90,
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&h=80&w=80",
    rank: 3,
  },
]

export default function TopEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)

        // Simulate API call
        const response = await fetch("/api/employees/top", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch employees")
        }

        const data = (await response.json()) as EmployeesApiResponse

        setEmployees(data.employees || [])
      } catch (err) {
        console.warn("API call failed, falling back to mock data:", err)
        setEmployees(mockEmployees)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  if (loading) {
    return (
      <div className="w-full max-w-sm mx-auto bg-white shadow rounded p-8">
        <h2 className="text-2xl font-bold text-gray-900 ">Top Employees</h2>
        <p className="text-sm text-gray-600 mb-7">Employees with highest Attendance</p>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-3 animate-pulse mb-4">
            <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-50 shadow rounded p-8">
      <h2 className="text-2xl font-bold text-gray-900">Top Employees</h2>
      <p className="text-sm text-gray-600 mb-7">Employees with highest Attendance</p>
      {employees.map((employee) => (
        <div key={employee.id} className="flex items-center space-x-3 mb-4">
          {/* Rank Badge */}
          <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 font-semibold flex items-center justify-center text-sm">
            {employee.rank}
          </div>

          {/* Avatar */}
          <img
            src={
              employee.avatar ||
              "https://images.unsplash.com/photo-1603415526960-f6e0afe31dee?crop=faces&fit=crop&h=80&w=80"
            }
            alt={employee.name}
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Employee Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-base">
              {employee.name}
            </h3>
            <p className="text-sm text-gray-600">
              Attendance: {employee.attendance}%
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
