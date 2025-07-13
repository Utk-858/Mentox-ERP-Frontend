import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface Student {
  name: string;
  class: string;
  section: string;
  rollNo: string;
  admissionNo: string;
  fee: string;
  dueDate: string;
  photoUrl: string;
}

type SearchType = "admission" | "name" | null;

export default function OfflineFeeSubmission() {
  const [paymentMode, setPaymentMode] = useState<string>("Cheque");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [admissionNumber, setAdmissionNumber] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [scholarshipCode, setScholarshipCode] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("");
  const [chequeNumber, setChequeNumber] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchType, setSearchType] = useState<SearchType>(null);

  const paymentModes = ["Net Banking", "UPI", "Cheque", "Cash"];

  const mockStudents: Student[] = [
    {
      name: "Hemish Jain",
      class: "6th",
      section: "A",
      rollNo: "2",
      admissionNo: "145675",
      fee: "INR 50,000",
      dueDate: "12/06/2025",
      photoUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (admissionNumber.trim()) {
        const student = mockStudents.find(
          (s) => s.admissionNo === admissionNumber
        );
        setSelectedStudent(student || null);
        setSearchType("admission");
        setStudentName("");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [admissionNumber]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (studentName.trim()) {
        const student = mockStudents.find((s) =>
          s.name.toLowerCase().includes(studentName.toLowerCase())
        );
        setSelectedStudent(student || null);
        setSearchType("name");
        setAdmissionNumber("");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [studentName]);

  return (
    <div className="max-w-screen mx-auto p-2 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Offline Fee Submission
        </h1>
        <p className="text-sm text-gray-600">
          Record fee payments made via cash, cheque or other offline methods.
        </p>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Submit Fee</h2>
        <p className="text-sm text-gray-600 mb-4">
          Search for a student and enter payment details.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          {/* Admission Number */}
          <div className="relative">
            <label className="block text-sm text-gray-700 mb-1">
              Search by Admission Number
            </label>
            <div className="flex bg-[#D2D2D233] border w-full px-3 py-2 text-sm border-[#606060] rounded-md">
              <input
                type="text"
                placeholder="Enter Admission Number"
                value={admissionNumber}
                onChange={(e) => setAdmissionNumber(e.target.value)}
                className="outline-none w-full"
              />
              <Search className="text-gray-500 ml-2 mt-0.5 w-4 h-4" />
            </div>

            {selectedStudent && searchType === "admission" && (
              <div className="absolute top-full mt-2 left-0 bg-[#fcf8f877] border border-gray-300 rounded-md shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-[445px] z-20">
                <img
                  src={selectedStudent.photoUrl}
                  alt="Student"
                  className="w-24 h-28 md:w-28 md:h-36 object-cover rounded-md border border-gray-200 mx-auto md:mx-0"
                />
                <div className="text-xs md:text-sm text-gray-800 leading-5">
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Student Name:
                    </strong>{" "}
                    <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
                      {selectedStudent.name}
                    </span>
                  </div>
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Class:
                    </strong>{" "}
                    <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
                      {selectedStudent.class}
                    </span>
                    &nbsp;&nbsp;
                    <strong className="font-semibold text-gray-700">
                      Section:
                    </strong>{" "}
                    <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
                      {selectedStudent.section}
                    </span>
                  </div>
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Roll Number:
                    </strong>{" "}
                    <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
                      {selectedStudent.rollNo}
                    </span>
                  </div>
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Admission No.:
                    </strong>{" "}
                    <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
                      {selectedStudent.admissionNo}
                    </span>
                  </div>
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Fee details:
                    </strong>{" "}
                    <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
                      {selectedStudent.fee}
                    </span>
                  </div>
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Due Date:
                    </strong>{" "}
                    <span className="ml-1 text-sm md:text-base text-gray-500 font-normal">
                      {selectedStudent.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Student Name */}
          <div className="relative">
            <div className="flex flex-col">
              <label className="block text-sm text-gray-700 mb-1 ml-0 md:ml-7">
                Search by Student Name
              </label>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-400">Or</span>
                <div className="flex bg-[#D2D2D233] border w-full px-3 py-2 text-sm border-[#606060] rounded-md">
                  <input
                    type="text"
                    placeholder="Enter Student Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="outline-none w-full"
                  />
                  <Search className="text-gray-500 ml-2 mt-0.5 w-4 h-4" />
                </div>
              </div>
            </div>

            {selectedStudent && searchType === "name" && (
              <div className="absolute top-full mt-2 left-0 bg-[#fcf8f877] border border-gray-300 rounded-md shadow-xl p-4 xl:p-6 flex flex-col xl:flex-row gap-3 xl:gap-4 w-full xl:w-[415px] z-20 xl:ml-7">
                <img
                  src={selectedStudent.photoUrl}
                  alt="Student"
                  className="w-24 h-28 xl:w-28 xl:h-36 object-cover rounded-md border border-gray-200 mx-auto xl:mx-0"
                />
                <div className="text-xs xl:text-sm text-gray-800 leading-5">
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Student Name:
                    </strong>{" "}
                    <span className="ml-1 text-sm xl:text-base text-gray-500 font-normal">
                      {selectedStudent.name}
                    </span>
                  </div>
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Class:
                    </strong>{" "}
                    <span className="ml-1 text-sm xl:text-base text-gray-500 font-normal">
                      {selectedStudent.class}
                    </span>
                    &nbsp;&nbsp;
                    <strong className="font-semibold text-gray-700">
                      Section:
                    </strong>{" "}
                    <span className="ml-1 text-sm xl:text-base text-gray-500 font-normal">
                      {selectedStudent.section}
                    </span>
                  </div>
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Roll Number:
                    </strong>{" "}
                    <span className="ml-1 text-sm xl:text-base text-gray-500 font-normal">
                      {selectedStudent.rollNo}
                    </span>
                  </div>
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Admission No.:
                    </strong>{" "}
                    <span className="ml-1 text-sm xl:text-base text-gray-500 font-normal">
                      {selectedStudent.admissionNo}
                    </span>
                  </div>
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Fee details:
                    </strong>{" "}
                    <span className="ml-1 text-sm xl:text-base text-gray-500 font-normal">
                      {selectedStudent.fee}
                    </span>
                  </div>
                  <div>
                    <strong className="font-semibold text-gray-700">
                      Due Date:
                    </strong>{" "}
                    <span className="ml-1 text-sm xl:text-base text-gray-500 font-normal">
                      {selectedStudent.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#606060] mb-4 text-center">
          Payment Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Scholarship Code
            </label>
            <input
              type="text"
              placeholder="Enter Scholarship Code (Optional)"
              value={scholarshipCode}
              onChange={(e) => setScholarshipCode(e.target.value)}
              className="w-full px-3 py-2 bg-[#D2D2D233] border border-[#606060] rounded-md text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Coupon Code
            </label>
            <input
              type="text"
              placeholder="Enter Coupon Code (Optional)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full px-3 py-2 bg-[#D2D2D233] border border-[#606060] rounded-md text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <label className="block text-sm text-gray-700 mb-1">
              Payment Mode*
            </label>
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full px-3 py-2 bg-[#D2D2D233] border border-[#606060] rounded-md text-sm text-left outline-none flex items-center justify-between"
            >
              {paymentMode}
              <span className="text-gray-400 text-sm">▼</span>
            </button>

            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 p-4 bg-[#00000099] border border-gray-600 rounded-md shadow-lg">
                {paymentModes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setPaymentMode(mode);
                      setShowDropdown(false);
                      setChequeNumber("");
                      setTransactionId("");
                    }}
                    className="w-full px-2 py-1 text-left text-sm text-white border-b hover:bg-[#24242416] border-gray-400 first:rounded-t-md last:rounded-b-md"
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>

          {paymentMode === "Cheque" && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Cheque Number
              </label>
              <input
                type="text"
                placeholder="Enter Cheque Number"
                value={chequeNumber}
                onChange={(e) => setChequeNumber(e.target.value)}
                className="w-full px-3 py-2 bg-[#D2D2D233] border border-[#606060] rounded-md text-sm outline-none"
              />
            </div>
          )}

          {(paymentMode === "Net Banking" || paymentMode === "UPI") && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Transaction ID
              </label>
              <input
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full px-3 py-2 bg-[#D2D2D233] border border-[#606060] rounded-md text-sm outline-none"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <textarea
            rows={4}
            className="w-full px-3 py-2 bg-[#D2D2D233] border border-[#606060] rounded-md text-sm outline-none"
            placeholder="Additional Notes"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-medium text-gray-100 bg-gray-500 rounded-sm hover:bg-gray-600 outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-medium text-white bg-[#702DFF] rounded-sm outline-none"
          >
            Submit Payment
          </button>
        </div>
      </div>
    </div>
  );
}
