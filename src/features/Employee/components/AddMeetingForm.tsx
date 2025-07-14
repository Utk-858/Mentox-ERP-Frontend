import { useState } from "react"
import { Calendar, X } from "lucide-react"

export default function AddMeetingForm2() {
  const [participants, setParticipants] = useState(["Navya Jain", "Navya Jain"])
  const [subject, setSubject] = useState("")
  const [meetType, setMeetType] = useState("online")
  const [showParticipantDropdown, setShowParticipantDropdown] = useState(false)

  const [meetingHour, setMeetingHour] = useState("7")
  const [meetingMinute, setMeetingMinute] = useState("00")
  const [meetingPeriod, setMeetingPeriod] = useState<"AM" | "PM">("AM")

  const mockParticipants = [
    "John Smith",
    "Sarah Johnson",
    "Mike Davis",
    "Emily Wilson",
    "David Brown",
    "Lisa Anderson",
    "Tom Wilson",
    "Anna Garcia",
  ]

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index))
  }

  const addParticipant = (participant: string) => {
    if (!participants.includes(participant)) {
      setParticipants([...participants, participant])
    }
    setShowParticipantDropdown(false)
  }

  return (
    <div
      onClick={(e) => {
        if (!(e.target as Element).closest(".participants-section")) {
          setShowParticipantDropdown(false)
        }
      }}
    >
      <div className="w-full max-w-5xl mx-auto bg-white p-6 font-sans">
        <h1 className="text-3xl mt-[-20px] font-medium mb-6 text-black">Add Meeting</h1>

        <div className="space-y-4">
          {/* Title, Date, Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="title" className="text-base font-medium text-black">
                Title<span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                className="w-full h-12 px-3 text-[13px] bg-[#D2D2D233] border border-[#606060] rounded-md"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="date" className="text-base font-medium text-black">
                Date<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="date"
                  type="text"
                  value="07/7/2028"
                  readOnly
                  title="Meeting date"
                  className="w-full h-12 px-3 pr-8 text-[13px] bg-[#D2D2D233] border border-[#606060] rounded-md"
                />
                <Calendar className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="meetingHour" className="text-base font-medium text-black">
                Time<span className="text-red-500">*</span>
              </label>
              <div className="flex w-[130%] xl:w-full items-center bg-[#D2D2D233] border border-[#606060] rounded-md px-3 h-12">
                <div className="flex items-center">
                  <input
                    id="meetingHour"
                    type="number"
                    min="1"
                    max="12"
                    value={meetingHour}
                    onChange={(e) => setMeetingHour(e.target.value)}
                    title="Meeting hour"
                    placeholder="Hour"
                    className="w-8 xl:w-10 text-center rounded-sm text-purple-600 font-semibold text-lg bg-[#922dff2d] border-none outline-none"
                  />
                  <span className="text-gray-500 mx-1">:</span>
                  <input
                    id="meetingMinute"
                    type="number"
                    min="0"
                    max="59"
                    value={meetingMinute}
                    onChange={(e) => setMeetingMinute(e.target.value)}
                    title="Meeting minute"
                    placeholder="Minute"
                    className="w-9 xl:w-10 text-center text-black rounded-sm font-semibold text-lg bg-gray-300 border-none outline-none"
                  />
                </div>
                <div className="flex flex-col ml-2">
                  <button
                    type="button"
                    onClick={() => setMeetingPeriod("AM")}
                    title="Set AM"
                    className={`px-1 text-xs border rounded-sm ${
                      meetingPeriod === "AM" ? "bg-[#EEE6FF] text-[#702DFF]" : "bg-transparent text-gray-500"
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingPeriod("PM")}
                    title="Set PM"
                    className={`px-1 text-xs border rounded-sm mt-1 ${
                      meetingPeriod === "PM" ? "bg-[#EEE6FF] text-[#702DFF]" : "bg-transparent text-gray-500"
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Room, Duration, Meet Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="room" className="text-base font-medium text-black">
                Room<span className="text-red-500">*</span>
              </label>
              <input
                id="room"
                type="text"
                placeholder="Enter room"
                className="w-full h-12 px-3 text-[13px] bg-[#D2D2D233] border border-[#606060] rounded-md"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="duration" className="text-base font-medium text-black">
                Duration<span className="text-red-500">*</span>
              </label>
              <select
                id="duration"
                className="w-full h-12 px-3 text-[13px] bg-[#D2D2D233] border border-[#606060] rounded-md"
                title="Meeting duration"
              >
                <option>1 hr</option>
                <option>30 min</option>
                <option>2 hr</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-base font-medium text-black">
                Mode of Meet<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-3 mt-1 bg-[#D2D2D233] border border-[#606060] rounded-md px-3 py-3 w-full">
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="meetType"
                    value="offline"
                    checked={meetType === "offline"}
                    onChange={(e) => setMeetType(e.target.value)}
                    className="w-3 h-3"
                    title="Offline meeting"
                  />
                  <span className="text-[13px]">Offline</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="meetType"
                    value="online"
                    checked={meetType === "online"}
                    onChange={(e) => setMeetType(e.target.value)}
                    className="w-3 h-3"
                    title="Online meeting"
                  />
                  <span className="text-[13px]">Online</span>
                </label>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="space-y-1 relative participants-section">
            <label htmlFor="participants" className="text-base font-medium text-black">Participants</label>
            <div
              id="participants"
              className="flex flex-wrap gap-1 min-h-[32px] bg-[#D2D2D233] border border-[#606060] rounded-md text-[12px] cursor-text px-2 py-1"
              onClick={() => setShowParticipantDropdown(true)}
            >
              {participants.map((participant, index) => (
                <span
                  key={index}
                  className="flex items-center bg-gray-200 text-black px-2 py-[10px] rounded-sm"
                >
                  {participant}
                  <X
                    size={12}
                    className="ml-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeParticipant(index)
                    }}
                  />
                </span>
              ))}
            </div>

            {showParticipantDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-[#100f0fb6] border border-[#606060] rounded-md shadow-md max-h-32 overflow-y-auto">
                {mockParticipants
                  .filter((p) => !participants.includes(p))
                  .map((p, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 text-[12px] text-white cursor-pointer"
                      onClick={() => addParticipant(p)}
                    >
                      {p}
                    </div>
                  ))}
                {mockParticipants.filter((p) => !participants.includes(p)).length === 0 && (
                  <div className="px-3 py-2 text-[12px] text-gray-400">No more participants</div>
                )}
              </div>
            )}

            <div className="text-right text-[10px] text-gray-500">10/30</div>
          </div>

          {/* Subject */}
          <div className="space-y-1">
            <label htmlFor="subject" className="text-base font-medium text-black">
              Subject<span className="text-red-500">*</span>
            </label>
            <input
              id="subject"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-12 px-3 text-[13px] bg-[#D2D2D233] border border-[#606060] rounded-md"
            />
            <div className="text-right text-[10px] text-gray-500">10/30</div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button 
              className="px-10 h-12 bg-[#702DFF] hover:bg-[#5a1fd9] text-white text-[13px] font-medium rounded"
              title="Submit meeting"
            >
              Submit
            </button>
            <button 
              className="px-10 h-12 bg-[#702DFF] hover:bg-[#5a1fd9] border text-[13px] font-medium rounded text-white"
              title="Cancel meeting"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
