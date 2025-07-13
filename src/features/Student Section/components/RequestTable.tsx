import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, QrCode } from "lucide-react";

export interface RequestTable {
  aadharNumber: string;
  height: string;
  weight: string;
  specialNeeds: string;
  disadvantage: string;
  bplBeneficiary: string;
  category: string;
  id: number;
  applicationNo: string;
  studentName: string;
  parentsName: string;
  status: "Approved" | "Pending" | "Denied";
  submissionDate: string;

  gender?: string;
  bloodGroup?: string;
  nationality?: string;
  email?: string;
  parentsNumber?: string;
  alternateNumber?: string;
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  guardianName?: string;
  address?: string;
  profilePhotoUrl?: string;
}


export const initialData: RequestTable[] = [
  {
    id: 1,
    applicationNo: "15",
    studentName: "Aarav Sharma",
    parentsName: "Sunita Joshi",
    status: "Approved",
    submissionDate: "07/01/2020",
    aadharNumber: "",
    height: "",
    weight: "",
    specialNeeds: "",
    disadvantage: "",
    bplBeneficiary: "",
    category: ""
  },
  {
    id: 2,
    applicationNo: "16",
    studentName: "Diya Patel",
    parentsName: "Sunita Joshi",
    status: "Pending",
    submissionDate: "07/01/2020",
    aadharNumber: "",
    height: "",
    weight: "",
    specialNeeds: "",
    disadvantage: "",
    bplBeneficiary: "",
    category: ""
  },
  {
    id: 3,
    applicationNo: "17",
    studentName: "Arjun Singh",
    parentsName: "Sunita Joshi",
    status: "Denied",
    submissionDate: "07/01/2020",
    aadharNumber: "",
    height: "",
    weight: "",
    specialNeeds: "",
    disadvantage: "",
    bplBeneficiary: "",
    category: ""
  },
  {
    id: 4,
    applicationNo: "18",
    studentName: "Ananya Kholi",
    parentsName: "Sunita Joshi",
    status: "Approved",
    submissionDate: "07/01/2020",
    aadharNumber: "",
    height: "",
    weight: "",
    specialNeeds: "",
    disadvantage: "",
    bplBeneficiary: "",
    category: ""
  },
  {
    id: 5,
    applicationNo: "19",
    studentName: "Kabir Kumar",
    parentsName: "Sunita Joshi",
    status: "Approved",
    submissionDate: "07/01/2020",
    aadharNumber: "",
    height: "",
    weight: "",
    specialNeeds: "",
    disadvantage: "",
    bplBeneficiary: "",
    category: ""
  },
];

export default function AdmissionRequests() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState<RequestTable[]>(initialData);
  const [ApprovedTab, setApprovedTab] = useState<
    "all" | "approved" | "pending" | "denied"
  >("all");

  const getFilteredRequests = () => {
    const filtered = requests.filter(
      (request) =>
        request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.parentsName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.applicationNo.includes(searchTerm)
    );

    switch (ApprovedTab) {
      case "approved":
        return filtered.filter((r) => r.status === "Approved");
      case "pending":
        return filtered.filter((r) => r.status === "Pending");
      case "denied":
        return filtered.filter((r) => r.status === "Denied");
      default:
        return filtered;
    }
  };

  const getStatusColor = (status: RequestTable["status"]) => {
    switch (status) {
      case "Approved":
        return "bg-red-500 text-white";
      case "Pending":
        return "bg-green-500 text-white";
      case "Denied":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleView = (applicationNo: string) => {
    navigate(`/Student/admission/request/${applicationNo}`);
  };

  const handleDelete = (id: number) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  const filteredRequests = getFilteredRequests();

  return (
    <div className="p-6 bg-[#F5F5F7] rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Admission Requests
          </h1>
          <p className="text-sm xl:text-base text-gray-600">
            Review and process incoming admission applications
          </p>
        </div>
        <button className="flex items-center bg-[#702DFF] text-white px-4 py-2 rounded">
          <QrCode className="w-4 h-4 mr-2" />
          Admission QR
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="flex items-center gap-[130px] xl:justify-between mb-6">
        <div className="flex items-center bg-black rounded-md p-1">
          {[
            { label: "All Students", key: "all" },
            { label: "Approved", key: "approved" },
            { label: "Pending", key: "pending" },
            { label: "Denied", key: "denied" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setApprovedTab(
                  tab.key as "all" | "approved" | "pending" | "denied"
                )
              }
              className={`px-2 py-0.5 xl:px-4 xl:py-2 rounded-sm xl:rounded-md text-xs xl:text-base font-medium transition-colors ${
                ApprovedTab === tab.key
                  ? "bg-[#702DFF] text-white"
                  : "text-white hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search Student"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-50 bg-black border border-gray-700 text-white placeholder:text-gray-400 rounded-md py-2 focus:outline-none focus:border-gray-600"
          />
        </div>
      </div>

      {/* Table */}
      <div className="space-y-2 xl:space-y-3">
        {/* Table Header */}
        <div className="grid grid-cols-6 border-b gap-4 px-4 py-3 bg-gray-100 text-xs xl:text-sm font-medium text-gray-700">
          <div>Application No.</div>
          <div>Student Name</div>
          <div>Parents Name</div>
          <div>Status</div>
          <div>Submission Date</div>
          <div>Action</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-2 xl:space-y-3">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="grid grid-cols-6 gap-1 xl:gap-4 px-4 py-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow text-xs xl:text-sm"
            >
              <div className="font-medium text-gray-900">
                {request.applicationNo}
              </div>
              <div className="text-gray-900">{request.studentName}</div>
              <div className="text-gray-700">{request.parentsName}</div>
              <div>
                <span
                  className={`inline-block px-1 xl:px-3 py-0.5 xl:py-1 rounded-full text-[10px] xl:text-sm font-semibold ${getStatusColor(
                    request.status
                  )}`}
                >
                  {request.status}
                </span>
              </div>
              <div className="text-gray-700">{request.submissionDate}</div>
              <div className="flex items-center gap-2 xl:gap-4">
                <button
                  onClick={() => handleView(request.applicationNo)}
                  className="text-[#702DFF] hover:underline text-xs xl:text-sm font-medium"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(request.id)}
                  className="text-red-500 bg-red-100 px-3 py-1 rounded text-xs xl:text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No admission requests found{" "}
          {ApprovedTab !== "all" && `in ${ApprovedTab} category.`}
        </div>
      )}
    </div>
  );
}
