import React, { useState } from "react";
import { Search } from "lucide-react";
import CreateGatePass from "./CreateGatePass";


type Status = "All" | "Exited" | "Approved";

interface GatePass {
  id: number;
  name: string;
  status: Status;
  admissionNo: string;
  class: string;
  section: string;
  date: string;
  rollNumber: string;
  parentName: string;
  parentContact: string;
  parentApproval: string;
  reason: string;
}

const gatePasses: GatePass[] = [
  {
    id: 1,
    name: "Navya Jain",
    status: "Approved",
    admissionNo: "STUD1234",
    class: "10",
    section: "A",
    date: "29/03/2025",
    rollNumber: "24",
    parentName: "Hemish Morgan",
    parentContact: "+91 7895831435",
    parentApproval: "Approved",
    reason: "Have Fever that why we have he have to go to school",
  },
  {
    id: 2,
    name: "Navya Jain",
    status: "Exited",
    admissionNo: "STUD1234",
    class: "10",
    section: "A",
    date: "29/03/2025",
    rollNumber: "24",
    parentName: "Hemish Morgan",
    parentContact: "+91 7895831435",
    parentApproval: "Approved",
    reason: "Have Fever that why we have he have to go to school",
  },
  {
    id: 3,
    name: "Navya Jain",
    status: "Exited",
    admissionNo: "STUD1234",
    class: "10",
    section: "A",
    date: "29/03/2025",
    rollNumber: "24",
    parentName: "Hemish Morgan",
    parentContact: "+91 7895831435",
    parentApproval: "Approved",
    reason: "Have Fever that why we have he have to go to school",
  },
  {
    id: 4,
    name: "Navya Jain",
    status: "Exited",
    admissionNo: "STUD1234",
    class: "10",
    section: "A",
    date: "29/03/2025",
    rollNumber: "24",
    parentName: "Hemish Morgan",
    parentContact: "+91 7895831435",
    parentApproval: "Approved",
    reason: "Have Fever that why we have he have to go to school",
  },
];

const GatePassHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Status>("All");
  const [search, setSearch] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredPasses = gatePasses.filter(
    (pass) =>
      (activeTab === "All" || pass.status === activeTab) &&
      pass.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-10 bg-[#F5F5F7] p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Gate Pass History and Create Gate Pass</h2>
          <p className="text-gray-500 text-sm">View and create Gate pass</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-[#702DFF] text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Create Gate Pass
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
        <div className="flex bg-black rounded-md overflow-hidden w-fit p-1 mb-6">
          {(["All", "Exited", "Approved"] as Status[]).map((tab) => (
            <button
              key={tab}
              className={`px-5 py-2 text-sm font-semibold rounded-md transition-colors duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-[#702DFF] text-white"
                  : "bg-black text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Gate Pass List */}
      <div className="space-y-4">
        {filteredPasses.map((pass) => (
          <div
            key={pass.id}
            className="bg-white p-4 rounded-lg shadow-sm flex gap-4 items-start"
          >
            <div className="bg-gray-200 rounded-full p-3">
              <img
                src="https://img.icons8.com/ios-filled/50/user.png"
                alt="avatar"
                className="w-6 h-6"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-1 gap-3">
                <h3 className="font-bold text-base">{pass.name}</h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    pass.status === "Approved"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {pass.status}
                </span>
              </div>
              <div className="text-sm text-[#696969] space-y-2 space-x-5">
                <p className="gap-10">
                  <strong>Adm No:</strong> {pass.admissionNo} <strong>Class:</strong> {pass.class}{" "}
                  <strong>Section:</strong> {pass.section} <strong>Date:</strong> {pass.date}{" "}
                  <strong>Roll Number:</strong> {pass.rollNumber}
                </p>
                <p>
                  <strong>Parent's Name:</strong> {pass.parentName} <strong>Parents Contact:</strong> {pass.parentContact}
                </p>
                <p>
                  <strong>Parent Approval:</strong> {pass.parentApproval}
                </p>
                <p>
                  <strong>Reason:</strong> {pass.reason}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative max-h-[90vh] overflow-y-auto">
            <CreateGatePass onClose={() => setShowCreateForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GatePassHistory;
