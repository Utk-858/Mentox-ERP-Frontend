import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // Custom overrides

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// const scoreMap: Record<string, number> = {
//   '2025-05-06': 709,
//   '2025-05-27': 309,
//   '2025-05-30': 607,
//   '2025-06-04': 169,
// };

const tagMap: Record<string, string[]> = {
  '2025-05-04': ['Science'],
  '2025-05-08': ['Science', 'Mathematics'],
};

const formatDateKey = (date: Date) =>
  date.toISOString().split('T')[0]; // 'YYYY-MM-DD'

const CalendarPanel: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
  };

  return (
    <div className=" p-5 rounded-2xl bg-[#F5F5F7] max-h-[56rem] w-[48rem] mx-auto">
      {/* <h2 className="text-lg font-bold mb-4">My Calendar</h2> */}

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date }) => {
          const key = formatDateKey(date);
          return tagMap[key]  ? 'has-tags' : '';
        }}
        tileContent={({ date }) => {
          const key = formatDateKey(date);
          const tags = tagMap[key] || [];
       

          return (
            <div className="tile-content">
              
              {tags.map((tag, idx) => (
                <span key={idx} className="tag ">
                  {tag}
                </span>
              ))}
            </div>
          );
        }}
      />

      
    </div>
  );
};

export default CalendarPanel;
