import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuDownload } from "react-icons/lu";

interface LeaveCategory {
  name: string;
  allowedDays: number;
  type: string;
  lossOfPay: boolean;
  carryForward: boolean;
}

const initialLeaveData: LeaveCategory[] = [
  { name: "Casual", allowedDays: 5, type: "Yearly", lossOfPay: false, carryForward: false },
  { name: "Medical", allowedDays: 20, type: "Yearly", lossOfPay: true, carryForward: false },
  { name: "Special", allowedDays: 10, type: "Lifetime", lossOfPay: false, carryForward: true },
  { name: "Earned", allowedDays: 10, type: "Yearly", lossOfPay: false, carryForward: false },
  { name: "xyz", allowedDays: 12, type: "Yearly", lossOfPay: false, carryForward: false },
  { name: "xyz", allowedDays: 10, type: "yearly", lossOfPay: false, carryForward: false },
];

const LeaveCategoryTable: React.FC = () => {
  const [data, setData] = useState(initialLeaveData);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [entry, setEntry] = useState<LeaveCategory>({
    name: "",
    allowedDays: 0,
    type: "Yearly",
    lossOfPay: false,
    carryForward: false,
  });

  const filteredData = data.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (field: keyof LeaveCategory, value: string | boolean | number) => {
    setEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setIsAdding(false);
    setEntry(data[index]);
  };

  const handleDeleteClick = (index: number) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  const handleSave = () => {
    if (!entry.name || !entry.type) return;

    if (isAdding) {
      setData([...data, entry]);
    } else if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = entry;
      setData(updated);
    }

    setEditIndex(null);
    setIsAdding(false);
    setEntry({ name: "", allowedDays: 0, type: "Yearly", lossOfPay: false, carryForward: false });
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditIndex(null);
    setEntry({ name: "", allowedDays: 0, type: "Yearly", lossOfPay: false, carryForward: false });
  };

  return (
    <div className="bg-[#F5F5F7] p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-[600] text-black ">Configure Leaves Categories</h2>
      <p className="text-[0.9rem] font-[400] text-[#363636] mb-4">View your all previous leave categories</p>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="relative">
          <CiSearch className="absolute top-2.5 left-3 text-white" />
          <input
            type="text"
            placeholder="Search Leave Category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 bg-black text-white rounded-md text-sm"
          />
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
          <LuDownload /> Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[1rem] border-separate border-spacing-y-2">
          <thead className="text-[#616188] font-[600]">
            <tr>
              <th className="px-3 py-2">Leave Category</th>
              <th className="px-3 py-2">Allowed Days</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Loss of Pay</th>
              <th className="px-3 py-2">Carry Forward</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) =>
              editIndex === idx ? (
                <tr key={idx} className="bg-white">
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={entry.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={entry.allowedDays}
                      onChange={(e) => handleInputChange("allowedDays", Number(e.target.value))}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={entry.type}
                      onChange={(e) => handleInputChange("type", e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option>Yearly</option>
                      <option>Lifetime</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={entry.lossOfPay.toString()}
                      onChange={(e) => handleInputChange("lossOfPay", e.target.value === "true")}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={entry.carryForward.toString()}
                      onChange={(e) => handleInputChange("carryForward", e.target.value === "true")}
                      className="border px-2 py-1 rounded w-full"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={handleSave}
                      className="bg-[#702DFF] text-white px-4 py-1 rounded text-sm"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={idx} className="bg-white">
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2">{row.allowedDays}</td>
                  <td className="px-3 py-2">{row.type}</td>
                  <td className="px-3 py-2">{row.lossOfPay ? "True" : "False"}</td>
                  <td className="px-3 py-2">{row.carryForward ? "True" : "False"}</td>
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      onClick={() => handleEditClick(idx)}
                      className="bg-[#FFE493] text-yellow-800 px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(idx)}
                      className="bg-[#FFE3E3] text-red-700 px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}

            {/* Add Row */}
            {isAdding && (
  <tr className="bg-white">
    <td className="px-3 py-2">
      <input
        type="text"
        value={entry.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        className="border px-2 py-1 rounded w-fit"
      />
    </td>
    <td className="px-3 py-2">
      <input
        type="number"
        value={entry.allowedDays}
        onChange={(e) => handleInputChange("allowedDays", Number(e.target.value))}
        className="border px-2 py-1 rounded w-fit"
      />
    </td>
    <td className="px-3 py-2">
      <select
        value={entry.type}
        onChange={(e) => handleInputChange("type", e.target.value)}
        className="border px-2 py-1 rounded w-fit"
      >
        <option>Yearly</option>
        <option>Lifetime</option>
      </select>
    </td>
    <td className="px-3 py-2">
      <select
        value={entry.lossOfPay.toString()}
        onChange={(e) => handleInputChange("lossOfPay", e.target.value === "true")}
        className="border px-2 py-1 rounded w-full"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td className="px-3 py-2">
      <select
        value={entry.carryForward.toString()}
        onChange={(e) => handleInputChange("carryForward", e.target.value === "true")}
        className="border px-2 py-1 rounded w-full"
      >
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </td>
    <td className="px-3 py-2 flex gap-2">
      <button
        onClick={handleSave}
        className="bg-[#702DFF] text-white px-4 py-1 rounded text-sm"
      >
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
            Add New Leaves Categories
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaveCategoryTable;
