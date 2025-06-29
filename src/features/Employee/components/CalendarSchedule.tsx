import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Search, Filter, User } from "lucide-react"

interface Meeting {
  id: string
  time: string
  title: string
  presenter: string
  room: string
  duration: string
  subject: string
  type: "Online Meeting" | "Offline Meeting"
}

const CalendarSchedule: React.FC = () => {
  const [meetings] = useState<Meeting[]>([
    {
      id: "1",
      time: "10:45 AM",
      title: "Parent Meeting",
      presenter: "Sarah Thompson",
      room: "Counselling Room",
      duration: "30 mins",
      subject:
        "Discussion with Parents, about child's behavior, academic performance, and social development in school environment.",
      type: "Online Meeting",
    },
    {
      id: "2",
      time: "10:45 AM",
      title: "Parent Meeting",
      presenter: "Sarah Thompson",
      room: "Counselling Room",
      duration: "30 mins",
      subject:
        "Discussion with Parents, about child's behavior, academic performance, and social development in school environment.",
      type: "Offline Meeting",
    },
    {
      id: "3",
      time: "11:45 AM",
      title: "Team Standup",
      presenter: "John Doe",
      room: "Conference Room A",
      duration: "45 mins",
      subject: "Daily team standup meeting to discuss progress, blockers, and upcoming tasks for the development team.",
      type: "Online Meeting",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Meeting[]>([])
  const [showSearchOverlay, setShowSearchOverlay] = useState(false)

  const weekDays = [
    { day: "Sun", date: 19 },
    { day: "Mon", date: 20 },
    { day: "Tue", date: 21 },
    { day: "Wed", date: 22 },
    { day: "Thu", date: 23, isToday: true },
    { day: "Fri", date: 24 },
    { day: "Sat", date: 25 },
  ]

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const filtered = meetings.filter(
      (meeting) =>
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.presenter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.room.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setSearchResults(filtered)
  }, [searchQuery, meetings])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const closeSearchOverlay = () => {
    setShowSearchOverlay(false)
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <div className="max-w-md bg-[#D2D2D233] h-[500px] rounded-lg shadow overflow-hidden relative">
      {/* Calendar Header */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <ChevronLeft className="w-5 h-5 text-gray-600 cursor-pointer" />
          <h1 className="text-lg font-semibold text-gray-900">October 2025</h1>
          <ChevronRight className="w-5 h-5 text-gray-600 cursor-pointer" />
        </div>

        {/* Week Calendar */}
        <div className="flex justify-between mb-4">
          {weekDays.map((day) => (
            <div key={day.date} className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">{day.day}</span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  day.isToday ? "bg-purple-500 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {day.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meeting Schedule Section */}
      <div className="px-4 flex flex-col h-[calc(500px-160px)]">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Today's Meeting Schedule</h2>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-3 py-2 bg-gray-900 text-white placeholder-gray-400 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>
          <button className="px-3 py-2 bg-gray-900 text-white rounded-md flex items-center gap-1 hover:bg-gray-800 transition-colors text-sm">
            <Filter className="w-4 h-4" />
            Sort
          </button>
        </div>

        {/* Meeting List */}
        <div className="overflow-y-auto scrollbar-hide space-y-3 flex-1 pr-2 relative">
          {searchQuery.trim() && (
            <div className="fixed inset-0 bg-[#0b0b0b28] bg-opacity-50 z-10 pointer-events-none" />
          )}

          {(searchQuery.trim() ? searchResults : meetings).map((meeting) => {
            const isSearchResult = searchQuery.trim() && searchResults.includes(meeting)

            return (
              <div
                key={meeting.id}
                className={`bg-green-50 rounded-md p-3 border border-green-100 transition-all duration-300 ${
                  isSearchResult ? "relative z-20 shadow-2xl ring-4 ring-purple-200 scale-[1.02]" : ""
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900">{meeting.time}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          meeting.type === "Online Meeting"
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {meeting.type}
                      </span>
                      {isSearchResult && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          Found
                        </span>
                      )}
                    </div>

                    <h3 className="font-medium text-gray-900 text-sm mb-1">
                      {meeting.title} - {meeting.presenter}
                    </h3>

                    <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-1">
                      <span>Room: {meeting.room}</span>
                      <span>Duration: {meeting.duration}</span>
                    </div>

                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Subject:</span> {meeting.subject}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          {searchQuery.trim() && searchResults.length === 0 && (
            <div className="text-center py-6 text-gray-500 relative z-20 bg-white rounded-lg shadow-lg">
              <p>No meetings found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarSchedule
