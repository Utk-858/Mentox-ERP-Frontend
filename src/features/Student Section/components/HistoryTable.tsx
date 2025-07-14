"use client";

import { useState } from "react";
import { Search, Download, Calendar } from "lucide-react";

const paymentData = [
  {
    admNo: "STU001",
    studentName: "Aryan Pratap yadav",
    class: "10",
    section: "A",
    date: "06/12/2025",
    status: "Paid",
    amount: "₹1,000",
    mode: "UPI",
    transId: "REF09GA7CV",
  },
  {
    admNo: "STU001",
    studentName: "Aryan Pratap yadav Sharma Jain",
    class: "10",
    section: "A",
    date: "06/12/2025",
    status: "Paid",
    amount: "₹1,000",
    mode: "UPI",
    transId: "REF09GA7CV wty287722wh",
  },
  {
    admNo: "STU001",
    studentName: "Aryan Pratap yadav",
    class: "10",
    section: "A",
    date: "06/12/2025",
    status: "Paid",
    amount: "₹1,000",
    mode: "Cash",
    transId: "-",
  },
  {
    admNo: "STU001",
    studentName: "Aryan Pratap yadav",
    class: "10",
    section: "A",
    date: "06/12/2025",
    status: "Paid",
    amount: "₹1,000",
    mode: "Cheque",
    transId: "GFTVGEWVG",
  },
  {
    admNo: "STU001",
    studentName: "Aryan Pratap yadav",
    class: "10",
    section: "A",
    date: "06/12/2025",
    status: "Paid",
    amount: "₹1,000",
    mode: "Net Banking",
    transId: "GFTVGEWVG",
  },
  {
    admNo: "STU001",
    studentName: "Aryan Pratap yadav",
    class: "10",
    section: "A",
    date: "-",
    status: "Due",
    amount: "₹1,000",
    mode: "-",
    transId: "-",
  },
  {
    admNo: "STU001",
    studentName: "Aryan Pratap yadav",
    class: "10",
    section: "A",
    date: "06/12/2025",
    status: "Refund",
    amount: "₹1,000",
    mode: "UPI",
    transId: "GFTVGEWVG",
  },
];

const getStatusBadge = (status: string) => {
  let styles = "";
  switch (status) {
    case "Paid":
      styles = "bg-green-100 text-green-800";
      break;
    case "Due":
      styles = "bg-red-100 text-red-800";
      break;
    case "Refund":
      styles = "bg-orange-100 text-orange-800";
      break;
    default:
      styles = "bg-gray-200 text-gray-800";
  }
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};

const getModeBadge = (mode: string) => {
  if (mode === "-") return mode;

  let styles = "";
  switch (mode) {
    case "UPI":
      styles = "bg-blue-100 text-blue-800";
      break;
    case "Cash":
      styles = "bg-green-100 text-green-800";
      break;
    case "Cheque":
      styles = "bg-purple-100 text-purple-800";
      break;
    case "Net Banking":
      styles = "bg-indigo-100 text-indigo-800";
      break;
    default:
      styles = "bg-gray-200 text-gray-800";
  }
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles}`}>
      {mode}
    </span>
  );
};

export default function PaymentHistoryReport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [classFilter, setClassFilter] = useState("all-class");
  const [sectionFilter, setSectionFilter] = useState("all-sections");

  // Optionally add filtering logic
  const filteredData = paymentData.filter((item) => {
    const matchesSearch = item.studentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all-status" ||
      item.status.toLowerCase() === statusFilter;
    const matchesClass =
      classFilter === "all-class" || item.class === classFilter;
    const matchesSection =
      sectionFilter === "all-sections" ||
      item.section.toLowerCase() === sectionFilter;

    return matchesSearch && matchesStatus && matchesClass && matchesSection;
  });

  return (
    <div className="w-full max-w-6xl rounded-md mx-auto p-6 bg-gray-50 ">
      <div className=" rounded-lg">
        {/* Header */}
        <div className="p-6 ">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Fee Payment History Report
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Filter and view payment records for all students.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center px-5 py-2.5 rounded bg-[#702DFF] text-white text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                July 2023
              </button>
              <button className="flex items-center px-5 py-2.5 rounded bg-black hover:bg-gray-800 text-white text-sm">
                <Download className="w-4 h-4 mr-2" />
                Export as Excel
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full py-2 border border-gray-700 rounded-md bg-black text-white placeholder-gray-400"
              />
            </div>

            <select
              title="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-40 rounded-md bg-black text-gray-200 px-4 py-2"
            >
              <option value="all-status">All Status</option>
              <option value="paid">Paid</option>
              <option value="due">Due</option>
              <option value="refund">Refund</option>
            </select>

            <select
              title="Class Filter"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full sm:w-40  rounded-md bg-black text-gray-200 px-4 py-2"
            >
              <option value="all-class">All Class</option>
              <option value="10">Class 10</option>
              <option value="9">Class 9</option>
              <option value="8">Class 8</option>
            </select>

            <select
              title="Section Filter"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="w-full sm:w-40  rounded-md bg-black text-gray-200 px-4 py-2"
            >
              <option value="all-sections">All Sections</option>
              <option value="a">Section A</option>
              <option value="b">Section B</option>
              <option value="c">Section C</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="h-96 overflow-y-auto scrollbar-hide">
          <div className="max-w-xl ">
            <table className="">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adm. No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount(₹)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mode
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trans. Id/Cheque No.
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.admNo}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.studentName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.class}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.section}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.amount}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {getModeBadge(payment.mode)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.transId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
