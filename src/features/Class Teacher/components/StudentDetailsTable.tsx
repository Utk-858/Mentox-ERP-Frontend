import React, { useMemo, useState } from "react";
import {
  FaFilter,
  FaChevronDown,
  FaSearch,
  FaSortAmountDownAlt,
} from "react-icons/fa";

export interface StudentRow {
  id: number;
  rollNo: number;
  avatarUrl: string;
  studentName: string;
  className: string;
  parentName: string;
  parentContact: string;
  parentEmail: string;
}

interface StudentDetailsProps {
  data: StudentRow[];
}

const classes = ["10A", "10B", "11A", "11B"];
const designations = ["Monitor", "Prefect", "Regular"];

const StudentDetailsTable: React.FC<StudentDetailsProps> = ({ data }) => {
  const [selectedClass, setSelectedClass] = useState<string | "">("");
  const [selectedDesignation, setSelectedDesignation] = useState<string | "">(
    ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof StudentRow>("rollNo");
  const [sortAsc, setSortAsc] = useState(true);

  const [openClassDrop, setOpenClassDrop] = useState(false);
  const [openDesigDrop, setOpenDesigDrop] = useState(false);

  const filteredData = useMemo(() => {
    let list = [...data];

    if (selectedClass) list = list.filter((s) => s.className === selectedClass);

    if (selectedDesignation)
      list = list.filter(
        (s) => s.studentName.includes(selectedDesignation) // demo logic
      );

    if (searchTerm)
      list = list.filter((s) =>
        s.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      );

    list.sort((a, b) => {
      const x = a[sortField];
      const y = b[sortField];
      if (x === y) return 0;
      return sortAsc ? (x > y ? 1 : -1) : x < y ? 1 : -1;
    });

    return list;
  }, [
    data,
    selectedClass,
    selectedDesignation,
    searchTerm,
    sortField,
    sortAsc,
  ]);

  const closeAll = () => {
    setOpenClassDrop(false);
    setOpenDesigDrop(false);
  };

  return (
    <div className="bg-[#F5F5F7] rounded-xl p-6 mr-6 mt-8" onClick={closeAll}>
      <h2 className="text-[1.5rem] font-[600]">Student Details</h2>
      <p className="text-[0.9rem] text-[#363636] font-[400] mb-4">
        View and manage all your students
      </p>

      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex gap-3">
          <div
            className="relative"
            onClick={(e) => {
              e.stopPropagation();
              setOpenClassDrop((prev) => !prev);
              setOpenDesigDrop(false);
            }}
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-black text-sm font-medium bg-black text-white">
              <FaFilter />
              Class
              <FaChevronDown className="ml-1" />
            </button>

            {openClassDrop && (
              <ul className="absolute left-0 top-full mt-1 w-40 bg-black text-white shadow border rounded-md text-sm z-20">
                <li
                  onClick={() => setSelectedClass("")}
                  className="px-4 py-2 hover:bg-gray-500 cursor-pointer"
                >
                  All
                </li>
                {classes.map((c) => (
                  <li
                    key={c}
                    onClick={() => setSelectedClass(c)}
                    className={`px-4 py-2 hover:bg-gray-500 cursor-pointer ${
                      selectedClass === c ? "font-semibold" : ""
                    }`}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            className="relative"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDesigDrop((prev) => !prev);
              setOpenClassDrop(false);
            }}
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-black text-sm font-medium bg-black text-white">
              <FaFilter />
              Designation
              <FaChevronDown className="ml-1" />
            </button>

            {openDesigDrop && (
              <ul className="absolute left-0 top-full mt-1 w-40 bg-black text-white shadow border rounded-md text-sm z-20">
                <li
                  onClick={() => setSelectedDesignation("")}
                  className="px-4 py-2 hover:bg-gray-500 cursor-pointer"
                >
                  All
                </li>
                {designations.map((d) => (
                  <li
                    key={d}
                    onClick={() => setSelectedDesignation(d)}
                    className={`px-4 py-2 hover:bg-gray-500 cursor-pointer ${
                      selectedDesignation === d ? "font-semibold" : ""
                    }`}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* RIGHT ▸ Search + Sort */}
        <div className="flex gap-4">
          {/* Search box */}
          <div className="flex items-center bg-black text-white px-3 rounded-md">
            <FaSearch className="text-sm mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search students..."
              className="bg-transparent outline-none placeholder:text-gray-300 text-sm py-2 w-36 sm:w-56"
            />
          </div>

          {/* Sort button */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-black text-sm font-medium bg-black text-white"
            onClick={(e) => {
              e.stopPropagation();
              setSortAsc(!sortAsc);
              setSortField("studentName");
            }}
          >
            <FaSortAmountDownAlt />
            Sort by
            <FaChevronDown className="ml-1" />
          </button>
        </div>
      </div>

      <div className="overflow-auto max-h-[420px]">
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-3">
          <thead className="sticky top-0 bg-[#F5F5F7] border-b z-10">
            <tr className="text-[#000000]">
              <th className="py-2 px-3">Roll No.</th>
              <th className="py-2 px-3">Student Name</th>
              <th className="py-2 px-3">Class</th>
              <th className="py-2 px-3">Parent Name</th>
              <th className="py-2 px-3">Parent Contact</th>
              <th className="py-2 px-3">Parent Email</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="bg-white rounded-lg shadow-sm">
                <td className="py-3 px-3 rounded-l-lg">{row.rollNo}</td>

                <td className="py-3 px-3 flex items-center gap-2">
                  <img
                    src={row.avatarUrl}
                    alt={row.studentName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  {row.studentName}
                </td>

                <td className="py-3 px-3">{row.className}</td>
                <td className="py-3 px-3">{row.parentName}</td>
                <td className="py-3 px-3">{row.parentContact}</td>
                <td className="py-3 px-3">{row.parentEmail}</td>
                <td className="py-3 px-3 rounded-r-lg text-[#0085D8] text-[0.9rem] font-[400] cursor-pointer">
                  View
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetailsTable;
