import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Holiday = {
  name: string;
  from: string;
  to: string;
  duration: number;
};

type HolidayCardListProps = {
  holidays: Holiday[];
  onEdit: (index: number, updated: Holiday) => void;
  onDelete: (index: number) => void;
  onAdd: (newHoliday: Holiday) => void;
};

const HolidayTable: React.FC<HolidayCardListProps> = ({
  holidays,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedHoliday, setEditedHoliday] = useState<Holiday>({
    name: "",
    from: "",
    to: "",
    duration: 0,
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newHoliday, setNewHoliday] = useState<Holiday>({
    name: "",
    from: "",
    to: "",
    duration: 0,
  });

  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const totalPages = Math.ceil(holidays.length / rowsPerPage);

  const calculateDuration = (from: string, to: string) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffTime = toDate.getTime() - fromDate.getTime();
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
  };

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditedHoliday(holidays[index]);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      onEdit(editIndex, editedHoliday);
      setEditIndex(null);
    }
  };

  const handleChange = (field: keyof Holiday, value: string) => {
    const newFrom = field === "from" ? value : editedHoliday.from;
    const newTo = field === "to" ? value : editedHoliday.to;
    const newDuration = calculateDuration(newFrom, newTo);

    setEditedHoliday((prev) => ({
      ...prev,
      [field]: value,
      duration: newDuration,
    }));
  };

  const handleNewChange = (field: keyof Holiday, value: string) => {
    const newFrom = field === "from" ? value : newHoliday.from;
    const newTo = field === "to" ? value : newHoliday.to;
    const newDuration = calculateDuration(newFrom, newTo);

    setNewHoliday((prev) => ({
      ...prev,
      [field]: value,
      duration: newDuration,
    }));
  };

  const handleAddNew = () => {
    if (newHoliday.name && newHoliday.from && newHoliday.to && newHoliday.duration > 0) {
      onAdd(newHoliday);
      setNewHoliday({ name: "", from: "", to: "", duration: 0 });
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-[#F5F5F7] rounded-xl p-6 w-full min-w-[36rem] max-w-[43rem] mb-6 text-sm mr-4">
      <h2 className="text-xl font-semibold text-black mb-1">Holiday Calendar Management</h2>
      <p className="text-[#6B6B6B] text-sm mb-4">View your all Holidays</p>

      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 mb-2 px-4 py-2 border-b border-[#E7E8EE] text-[#616188] font-[600] text-[1rem]">
        <div>Holiday Name</div>
        <div className="flex items-center gap-1 cursor-pointer">From <MdArrowDownward size={14} /></div>
        <div className="flex items-center gap-1 cursor-pointer">To <MdArrowUpward size={14} /></div>
        <div>Duration</div>
        <div>Actions</div>
      </div>

      {/* Existing Rows */}
      {holidays.slice(start, end).map((holiday, index) => {
        const realIndex = start + index;
        const isEditing = editIndex === realIndex;

        return (
          <div key={realIndex} className="grid grid-cols-5 gap-4 px-4 py-3 items-center bg-white rounded-lg mb-3 font-[400] text-[0.9rem]">
            {isEditing ? (
              <>
                <input value={editedHoliday.name} onChange={(e) => handleChange("name", e.target.value)} className="px-2 py-1 border rounded" />
                <input type="date" value={editedHoliday.from} onChange={(e) => handleChange("from", e.target.value)} className="px-2 py-1 border rounded" />
                <input type="date" value={editedHoliday.to} onChange={(e) => handleChange("to", e.target.value)} className="px-2 py-1 border rounded" />
                <div>{editedHoliday.duration}</div>
                <div>
                  <button onClick={handleSave} className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded">Save</button>
                </div>
              </>
            ) : (
              <>
                <div className="text-[#333]">{holiday.name}</div>
                <div>{holiday.from}</div>
                <div>{holiday.to}</div>
                <div>{holiday.duration}</div>
                <div className="flex gap-3 items-center">
                  <button onClick={() => onDelete(realIndex)} title="Delete">
                    <RiDeleteBin5Line className="text-[1.3rem] text-[#737791]" />
                  </button>
                  <button onClick={() => handleEditClick(realIndex)} title="Edit">
                    <FaEdit className="text-[1.3rem]" />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Add New Holiday Fields */}
      {isAdding && (
        <div className="grid grid-cols-5 gap-4 px-4 py-3 items-center bg-white rounded-lg mb-3 font-[400] text-[0.9rem]">
          <input value={newHoliday.name} onChange={(e) => handleNewChange("name", e.target.value)} placeholder="Enter Holiday Type" className="px-2 py-1 border rounded" />
          <input type="date" value={newHoliday.from} onChange={(e) => handleNewChange("from", e.target.value)} className="px-2 py-1 border rounded" />
          <input type="date" value={newHoliday.to} onChange={(e) => handleNewChange("to", e.target.value)} className="px-2 py-1 border rounded" />
          <input type="number" value={newHoliday.duration || ""} onChange={(e) => handleNewChange("duration", e.target.value)} className="px-2 py-1 border rounded" />
          <button onClick={handleAddNew} className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded">Save</button>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex flex-wrap justify-end items-center mt-6 text-sm text-gray-600 px-2 gap-2">
        <div>
          Rows per page:{" "}
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="ml-1 border px-2 py-1 rounded">
            {[3, 5, 10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="text-[#6F4EF2] font-bold disabled:text-gray-400">
            <IoIosArrowBack />
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="text-[#6F4EF2] font-bold disabled:text-gray-400">
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* Add Button */}
      <button onClick={() => setIsAdding(true)} className=" bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white px-4 py-2 rounded-md font-medium">
        + Add Holiday
      </button>
    </div>
  );
};

export default HolidayTable;
