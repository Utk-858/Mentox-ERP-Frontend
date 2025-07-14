import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // Make sure this is present

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type TagData = {
  subject: string;
  title: string;
  startTime: string;
  endTime: string;
};

const tagMap: Record<string, TagData[]> = {
  '2025-05-04': [
    {
      subject: 'Science',
      title: 'Science Mid-Term Quiz',
      startTime: '2:00pm',
      endTime: '2:20pm',
    },
  ],
  '2025-05-08': [
    {
      subject: 'Science',
      title: 'Science Mid-Term Quiz',
      startTime: '2:00pm',
      endTime: '2:20pm',
    },
    {
      subject: 'Mathematics',
      title: 'Math Weekly Quiz',
      startTime: '3:00pm',
      endTime: '3:30pm',
    },
  ],
};

const formatDateKey = (date: Date) => date.toISOString().split('T')[0];

const CalendarPanel: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  };

  return (
    <div className="calendar-wrapper w-full">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date }) => {
          const key = formatDateKey(date);
          return tagMap[key] ? 'has-tags group' : '';
        }}
        tileContent={({ date }) => {
          const key = formatDateKey(date);
          const tags = tagMap[key] || [];

          if (!tags.length) return null;

          return (
            <div className="tile-content-wrapper group relative">
              <div className="tags-container">
                {tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    {tag.subject}
                  </span>
                ))}
              </div>

              <div className="tooltip group-hover:flex hidden border border-[#702DFF] bg-[#6820d387] w-fit">
                {tags.map((tag, idx) => (
                  <div key={idx} className="mb-2 text-left">
                    <div className="font-semibold text-sm">{tag.title}</div>
                    <div>Start Time – {tag.startTime}</div>
                    <div>End Time – {tag.endTime}</div>
                    <button className="bg-[#702DFF] text-white mt-2 px-2 py-1 text-xs rounded-md">
                      Add to Schedule
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarPanel;
