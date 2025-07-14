import React from "react";
import { FaDownload } from "react-icons/fa";

type AttendanceStatus = "Present" | "Absent";

export interface AttendanceRow {
  id: number;
  name: string;
  rollNo: number;
  class: string;
  status: AttendanceStatus;
  percentage: string;
}

export interface AttendanceOverviewProps {
  date: string;
  onDateChange: (value: string) => void;
  onDownload: () => void;
  data: AttendanceRow[];
}

const AttendanceOverviewTable: React.FC<AttendanceOverviewProps> = ({
  date,
  onDateChange,
  onDownload,
  data,
}) => {
  /* ---------- helpers for chip colours ---------- */
  const getStatusStyle = (status: AttendanceStatus) =>
    status === "Present"
      ? "bg-[#D7F5E4] text-[#00000080] border border-[#606060]"
      : "bg-[#FFE3E3] text-[#00000080] border border-[#606060]";

  const getPercentageStyle = (percentage: string) => {
    const numeric = parseInt(percentage);
    if (numeric >= 90) return "bg-[#D7F5E4] text-black";
    if (numeric >= 75) return "bg-[#FFE493] text-black";
    return "bg-[#FFE3E3] text-black";
  };

  return (
    <div className="bg-[#F5F5F7] rounded-xl p-4">
      {/* ---------- header bar (title, date picker, download) ---------- */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="font-[600] text-[1rem]">Attendance Overview</h2>

        <div className="flex gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="border border-[#606060] bg-[#D2D2D233] px-3 py-1 rounded-md text-sm"
          />

          <button
            onClick={onDownload}
            className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
          >
            <FaDownload size={14} />
            Download Excel
          </button>
        </div>
      </div>

      {/* ---------- scrollable table ---------- */}
      <div className="overflow-auto max-h-96">
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-3">
          {/* sticky header */}
          <thead className="text-[#616188] font-medium sticky top-0 bg-[#F5F5F7] z-10">
            <tr>
              <th className="py-2 px-3">Student</th>
              <th className="py-2 px-3">RollNo.</th>
              <th className="py-2 px-3">Class</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Attendance%</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="bg-white rounded-lg shadow-sm font-[400] text-[0.9rem]"
              >
                <td className="py-3 px-3 rounded-l-lg">{row.name}</td>
                <td className="py-3 px-3">{row.rollNo}</td>
                <td className="py-3 px-3">{row.class}</td>

                <td className="py-3 px-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusStyle(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>

                <td className="py-3 px-3 rounded-r-lg">
                  <span
                    className={`px-4 py-2 rounded-md text-xs font-semibold ${getPercentageStyle(
                      row.percentage
                    )}`}
                  >
                    {row.percentage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceOverviewTable;
