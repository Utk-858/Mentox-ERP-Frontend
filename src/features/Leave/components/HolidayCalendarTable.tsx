import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuDownload } from "react-icons/lu";

type Category = "Events" | "Holiday" | "Examination";
type HolidayType = "Moon Based" | "Normal" | "False";

interface HolidayData {
  title: string;
  from: string;
  to: string;
  category: Category;
  type: HolidayType;
}

const initialMockData: HolidayData[] = [
  { title: "Holi", from: "06/12/2025", to: "06/12/2025", category: "Holiday", type: "Moon Based" },
  { title: "End-Term Exam", from: "06/12/2025", to: "06/12/2025", category: "Examination", type: "False" },
  { title: "Annual Function", from: "06/12/2025", to: "06/12/2025", category: "Events", type: "False" },
  { title: "Diwali", from: "06/12/2025", to: "06/12/2025", category: "Holiday", type: "Normal" },
  { title: "Mid-term Exam", from: "06/12/2025", to: "06/12/2025", category: "Examination", type: "False" },
  { title: "EID", from: "06/12/2025", to: "06/12/2025", category: "Holiday", type: "Moon Based" },
];

const categoryColors: Record<Category, string> = {
  Holiday: "bg-[#0764E633] text-blue-700",
  Examination: "bg-[#EF44444D] text-red-700",
  Events: "bg-[#22C55E33] text-green-700",
};

const HolidayCalendarTable: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"All" | Category>("All");
  const [search, setSearch] = useState("");
  const [holidayData, setHolidayData] = useState<HolidayData[]>(initialMockData);
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [entry, setEntry] = useState<HolidayData>({
    title: "",
    from: "",
    to: "",
    category: "Holiday",
    type: "Normal",
  });

  const tabs: ("All" | Category)[] = ["All", "Events", "Holiday", "Examination"];

  const filteredData = holidayData.filter((item) => {
    const matchCategory = selectedTab === "All" || item.category === selectedTab;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleInputChange = (field: keyof HolidayData, value: string) => {
    setEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditIndex(null);
    setEntry({ title: "", from: "", to: "", category: "Holiday", type: "Normal" });
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setIsAdding(false);
    setEntry(holidayData[index]);
  };

  const handleDeleteClick = (index: number) => {
    const updated = [...holidayData];
    updated.splice(index, 1);
    setHolidayData(updated);
  };

  const handleSave = () => {
    if (!entry.title || !entry.from || !entry.to) {
      alert("Please fill in all fields.");
      return;
    }

    if (isAdding) {
      setHolidayData([...holidayData, entry]);
    } else if (editIndex !== null) {
      const updated = [...holidayData];
      updated[editIndex] = entry;
      setHolidayData(updated);
    }

    setIsAdding(false);
    setEditIndex(null);
    setEntry({ title: "", from: "", to: "", category: "Holiday", type: "Normal" });
  };

  return (
    <div className="bg-[#f9f9fb] p-6 rounded-xl w-full ">
      <h2 className="text-[2rem] font-[600] text-black">Holiday Calendar Management</h2>
      <p className="text-[1rem] text-[#363636] font-[400] mb-4">View and Manage Holidays</p>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex bg-black p-1 rounded-md space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                selectedTab === tab ? "bg-[#702DFF] text-white" : "text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <CiSearch className="absolute left-2 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Holiday/Examination/Events..."
              className="pl-8 pr-4 py-1.5 rounded-md border border-gray-300 w-[18rem] text-sm bg-black text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
            <LuDownload /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead className="text-left text-[#616188] text-[1rem] font-[600]">
            <tr>
              <th className="px-3 py-2">Holiday/ Event</th>
              <th className="px-3 py-2">From</th>
              <th className="px-3 py-2">To</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Holiday Type</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((holiday, idx) =>
              editIndex === idx ? (
                <tr key={idx} className="bg-white text-sm">
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={entry.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="border px-2 py-1 rounded w-full text-sm"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="date"
                      value={entry.from}
                      onChange={(e) => handleInputChange("from", e.target.value)}
                      className="border px-2 py-1 rounded w-full text-sm"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="date"
                      value={entry.to}
                      onChange={(e) => handleInputChange("to", e.target.value)}
                      className="border px-2 py-1 rounded w-full text-sm"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={entry.category}
                      onChange={(e) => handleInputChange("category", e.target.value as Category)}
                      className="border px-2 py-1 rounded w-full text-sm"
                    >
                      <option value="Holiday">Holiday</option>
                      <option value="Events">Events</option>
                      <option value="Examination">Examination</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={entry.type}
                      onChange={(e) => handleInputChange("type", e.target.value as HolidayType)}
                      className="border px-2 py-1 rounded w-full text-sm"
                    >
                      <option value="Moon Based">Moon Based</option>
                      <option value="Normal">Normal</option>
                      <option value="False">False</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <button onClick={handleSave} className="bg-[#702DFF] text-white px-4 py-1 rounded text-xs">
                      Save
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={idx} className="bg-white text-sm font-[400]">
                  <td className="py-2 px-3">{holiday.title}</td>
                  <td className="py-2 px-3">{holiday.from}</td>
                  <td className="py-2 px-3">{holiday.to}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-3 py-1 rounded-[0.3rem] text-xs font-medium ${categoryColors[holiday.category]}`}
                    >
                      {holiday.category}
                    </span>
                  </td>
                  <td className="py-2 px-3">{holiday.type}</td>
                  <td className="py-2 px-3 flex gap-2">
                    <button
                      className="bg-[#FFE493] text-yellow-800 text-[1rem] font-[400] px-3 py-1 rounded-md"
                      onClick={() => handleEditClick(idx)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-[#FFE3E3] text-red-700 text-[1rem] font-[400] px-3 py-1 rounded-md"
                      onClick={() => handleDeleteClick(idx)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}

            {/* Add Row */}
            {isAdding && (
              <tr className="bg-white text-sm">
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={entry.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="border px-2 py-1 rounded w-full text-sm"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="date"
                    value={entry.from}
                    onChange={(e) => handleInputChange("from", e.target.value)}
                    className="border px-2 py-1 rounded w-full text-sm"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="date"
                    value={entry.to}
                    onChange={(e) => handleInputChange("to", e.target.value)}
                    className="border px-2 py-1 rounded w-full text-sm"
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    value={entry.category}
                    onChange={(e) => handleInputChange("category", e.target.value as Category)}
                    className="border px-2 py-1 rounded w-full text-sm"
                  >
                    <option value="Holiday">Holiday</option>
                    <option value="Events">Events</option>
                    <option value="Examination">Examination</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    value={entry.type}
                    onChange={(e) => handleInputChange("type", e.target.value as HolidayType)}
                    className="border px-2 py-1 rounded w-full text-sm"
                  >
                    <option value="Moon Based">Moon Based</option>
                    <option value="Normal">Normal</option>
                    <option value="False">False</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <button onClick={handleSave} className="bg-[#702DFF] text-white px-4 py-1 rounded text-[1rem]">
                    Save
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!isAdding && editIndex === null && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddClick}
            className="bg-[#702DFF] text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            Add New Holiday/Event/Examination
          </button>
        </div>
      )}
    </div>
  );
};

export default HolidayCalendarTable;
