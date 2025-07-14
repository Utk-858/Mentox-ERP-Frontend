// AttendanceCalendar.tsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./customCalendar.css"; // custom styling
import { format } from "date-fns";

const AttendanceCalendar: React.FC = () => {
  const [value, setValue] = useState<Date>(new Date());

  // Example of marked attendance dates
  const attendanceDates: Record<string, "present" | "absent"> = {
    "2025-06-07": "present",
    "2025-06-08": "present",
    "2025-06-10": "present",
    "2025-06-13": "absent",
    "2025-06-16": "present",
    "2025-06-20": "absent",
    "2025-06-24": "present",
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const key = format(date, "yyyy-MM-dd");
      if (attendanceDates[key] === "present") {
        return "present-day";
      } else if (attendanceDates[key] === "absent") {
        return "absent-day";
      }
    }
    return "";
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(value, _event) => {
          if (value instanceof Date) {
            setValue(value);
          }
        }}
        value={value}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default AttendanceCalendar;
