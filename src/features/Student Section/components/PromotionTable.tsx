import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ClassData {
  id: string;
  academicYear: string;
  class: number;
  classSections: number;
  classCapacity: number;
  status: "Not Started" | "In Progress" | "Complete";
}

interface ApiResponse {
  data: ClassData[];
  success: boolean;
  message?: string;
}

const mockData: ClassData[] = [
  { id: "1", academicYear: "2024-25", class: 1, classSections: 3, classCapacity: 120, status: "Not Started" },
  { id: "2", academicYear: "2024-25", class: 2, classSections: 3, classCapacity: 120, status: "In Progress" },
  { id: "3", academicYear: "2024-25", class: 3, classSections: 3, classCapacity: 120, status: "Complete" },
  { id: "4", academicYear: "2024-25", class: 4, classSections: 3, classCapacity: 120, status: "Not Started" },
  { id: "5", academicYear: "2024-25", class: 5, classSections: 3, classCapacity: 120, status: "Not Started" },
  { id: "6", academicYear: "2024-25", class: 6, classSections: 3, classCapacity: 120, status: "Not Started" },
  { id: "7", academicYear: "2024-25", class: 7, classSections: 3, classCapacity: 120, status: "Not Started" },
  { id: "8", academicYear: "2024-25", class: 8, classSections: 3, classCapacity: 120, status: "Not Started" },
  { id: "9", academicYear: "2024-25", class: 9, classSections: 3, classCapacity: 120, status: "Not Started" },
  { id: "10", academicYear: "2024-25", class: 10, classSections: 3, classCapacity: 120, status: "Not Started" },
];

const fetchClassData = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch("/api/promotion-alumni", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    console.warn("API failed, using mock data:", error);
    return { data: mockData, success: false, message: "Using mock data due to API failure" };
  }
};

const StatusBadge = ({ status }: { status: ClassData["status"] }) => {
  const getStatusStyles = (status: ClassData["status"]) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-700 text-white hover:bg-gray-800";
      case "In Progress":
        return "bg-orange-500 text-white hover:bg-orange-600";
      case "Complete":
        return "bg-green-500 text-white hover:bg-green-600";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <span
      className={`${getStatusStyles(status)} px-2 py-0.5 xl:px-3 xl:py-1 text-xs font-medium rounded-full`}
    >
      {status}
    </span>
  );
};

export default function PromotionTable() {
  const [classData, setClassData] = useState<ClassData[]>([]);
  const [filteredData, setFilteredData] = useState<ClassData[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchClassData();
        setClassData(result.data);
        setFilteredData(result.data);
        if (!result.success && result.message) {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to load data");
        setClassData(mockData);
        setFilteredData(mockData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredData(classData);
    } else {
      setFilteredData(classData.filter((item) => item.status === statusFilter));
    }
  }, [statusFilter, classData]);

  const handleView = (classItem: ClassData) => {
    console.log("Viewing class:", classItem);
  };

  const isHousePage = location.pathname.endsWith("/house");

  const headingText = isHousePage
    ? "House Assignment Report"
    : "Promotion & Alumni Management";

  const paraText = isHousePage
    ? "Assign houses to students in bulk or manually."
    : "Promote or mark students as alumni for the end of the academic session.";

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg ">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {headingText}
          </h1>
          <p className="text-sm text-gray-600">{paraText}</p>
        </div>

        <div className="relative inline-block w-40">
          <div className="flex items-center bg-black text-white rounded-sm px-4 py-2 text-sm w-40 justify-between pointer-events-none">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-2.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
              <span>
                {statusFilter === "all" ? "All Classes" : statusFilter}
              </span>
            </div>
            <svg
              className="w-3 h-3 text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <select
            title="Filter classes by status"
            aria-label="Filter classes by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          >
            <option value="all">All Classes</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-5 font-medium text-gray-700">Academic Year</th>
              <th className="text-left py-3 px-5 font-medium text-gray-700">Class</th>
              <th className="text-left py-3 px-5 font-medium text-gray-700">Class Sections</th>
              <th className="text-left py-3 px-5 font-medium text-gray-700">Class Capacity</th>
              <th className="text-left py-3 px-10 xl:px-6 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-8 font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-5 text-gray-900">{item.academicYear}</td>
                <td className="py-4 px-5 text-gray-900">{item.class}</td>
                <td className="py-4 px-6 text-gray-900">{item.classSections}</td>
                <td className="py-4 px-6 text-gray-900">{item.classCapacity}</td>
                <td className="py-4 px-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleView(item)}
                    className="bg-[#702DFF] text-white px-5 xl:px-10 ml-4 py-2 rounded-md text-sm font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No data found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}
