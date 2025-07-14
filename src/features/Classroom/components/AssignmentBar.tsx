
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, ChevronDown, Calendar, Clock } from "lucide-react"
import { BsQuestionSquare } from "react-icons/bs"

const AssignmentBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [assignModalOpen, setAssignModalOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [scheduleErrors, setScheduleErrors] = useState<{ date?: string; time?: string }>({})
  const [isScheduling, setIsScheduling] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Set default date and time when modal opens
  useEffect(() => {
    if (scheduleModalOpen && !scheduleDate && !scheduleTime) {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)

      // Format date as YYYY-MM-DD for input
      const defaultDate = tomorrow.toISOString().split("T")[0]

      // Format time as HH:MM for input (current time + 1 hour)
      const defaultTime = new Date(now.getTime() + 60 * 60 * 1000).toTimeString().slice(0, 5)

      setScheduleDate(defaultDate)
      setScheduleTime(defaultTime)
    }
  }, [scheduleModalOpen, scheduleDate, scheduleTime])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleDropdownAction = (action: string) => {
    setDropdownOpen(false)

    switch (action) {
      case "assign":
        setAssignModalOpen(true)
        break
      case "scheduled":
        setScheduleModalOpen(true)
        break
      case "save-draft":
        // Handle save draft logic here
        console.log("Save draft clicked")
        break
    }
  }

  const handleAssign = () => {
    // Handle assignment logic here
    console.log("Assignment confirmed")
    setAssignModalOpen(false)
  }

  const validateScheduleForm = () => {
    const errors: { date?: string; time?: string } = {}
    const now = new Date()
    const selectedDateTime = new Date(`${scheduleDate}T${scheduleTime}`)

    if (!scheduleDate) {
      errors.date = "Date is required"
    } else if (selectedDateTime <= now) {
      errors.date = "Please select a future date and time"
    }

    if (!scheduleTime) {
      errors.time = "Time is required"
    }

    setScheduleErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSchedule = async () => {
    if (!validateScheduleForm()) {
      return
    }

    setIsScheduling(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`)
      console.log("Assignment scheduled for:", scheduledDateTime.toLocaleString())

      // Reset form and close modal
      setScheduleDate("")
      setScheduleTime("")
      setScheduleErrors({})
      setScheduleModalOpen(false)

      // You could show a success message here
      alert(`Assignment scheduled for ${scheduledDateTime.toLocaleString()}`)
    } catch (error) {
      console.error("Failed to schedule assignment:", error)
      alert("Failed to schedule assignment. Please try again.")
    } finally {
      setIsScheduling(false)
    }
  }

  const handleScheduleCancel = () => {
    setScheduleDate("")
    setScheduleTime("")
    setScheduleErrors({})
    setScheduleModalOpen(false)
  }

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDisplayTime = (timeStr: string) => {
    if (!timeStr) return ""
    const [hours, minutes] = timeStr.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <>
      <div className="flex items-center justify-between bg-[#F5F5F7] px-4 py-2 rounded-md w-full relative">
        {/* Left Section */}
        <div className="flex items-center gap-5">
          <button className="text-gray-500 hover:text-gray-700" title="Close">
            <X size={18} />
          </button>
          <div className="flex items-center gap-5 text-lg text-[#5F6368] font-semibold">
            <div className="bg-purple-200 w-8 h-8 rounded-full flex items-center justify-center">
              <BsQuestionSquare size={18} className="text-purple-700" />
            </div>
            Assignment
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 relative" ref={dropdownRef}>
          <button
            onClick={() => handleDropdownAction("assign")}
            className="bg-[#702DFF] text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-[#5f25d9] transition"
          >
            Assign
          </button>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[#702DFF] text-white px-2 py-2 rounded-md hover:bg-[#5f25d9] transition"
            title="More options"
          >
            <ChevronDown size={16} />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-40 w-40 bg-[#3c3c3c]/90 text-white rounded-md shadow-lg z-50">
              <button
                onClick={() => handleDropdownAction("assign")}
                className="w-full text-left px-4 py-2 hover:bg-white/10 transition"
              >
                Assign
              </button>
              <button
                onClick={() => handleDropdownAction("scheduled")}
                className="w-full text-left px-4 py-2 hover:bg-white/10 transition"
              >
                Scheduled
              </button>
              <button
                onClick={() => handleDropdownAction("save-draft")}
                className="w-full text-left px-4 py-2 hover:bg-white/10 transition"
              >
                Save draft
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Assignment Modal */}
      {assignModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Assign the assignment</h2>
            <p className="text-gray-600 mb-6">Student will see the assignment in their streams immediately</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAssignModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="px-6 py-2 bg-[#702DFF] text-white rounded-md hover:bg-[#5f25d9] transition"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule Assignment</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => {
                      setScheduleDate(e.target.value)
                      if (scheduleErrors.date) {
                        setScheduleErrors((prev) => ({ ...prev, date: undefined }))
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#702DFF] focus:border-transparent ${
                      scheduleErrors.date ? "border-red-500" : "border-gray-300"
                    }`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  
                </div>
                {scheduleErrors.date && <p className="text-red-500 text-sm mt-1">{scheduleErrors.date}</p>}
                {scheduleDate && !scheduleErrors.date && (
                  <p className="text-gray-600 text-sm mt-1">{formatDisplayDate(scheduleDate)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => {
                      setScheduleTime(e.target.value)
                      if (scheduleErrors.time) {
                        setScheduleErrors((prev) => ({ ...prev, time: undefined }))
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#702DFF] focus:border-transparent ${
                      scheduleErrors.time ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                 
                </div>
                {scheduleErrors.time && <p className="text-red-500 text-sm mt-1">{scheduleErrors.time}</p>}
                {scheduleTime && !scheduleErrors.time && (
                  <p className="text-gray-600 text-sm mt-1">{formatDisplayTime(scheduleTime)}</p>
                )}
              </div>

             
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleScheduleCancel}
                disabled={isScheduling}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSchedule}
                disabled={isScheduling || !scheduleDate || !scheduleTime}
                className="px-6 py-2 bg-[#702DFF] text-white rounded-md hover:bg-[#5f25d9] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isScheduling ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Scheduling...
                  </>
                ) : (
                  "Schedule"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default AssignmentBar
