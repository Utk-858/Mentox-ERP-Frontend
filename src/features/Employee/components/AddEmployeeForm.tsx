import type React from "react";
import { useState } from "react";

type EmployeeFormData = {
  employeeCode: string;
  employeeName: string;
  phoneNumber: string;
  email: string;
  department: string;
  role: string;
  designation: string;
  document: File | null;
};

const AddEmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    employeeCode: "",
    employeeName: "",
    phoneNumber: "",
    email: "",
    department: "",
    role: "",
    designation: "",
    document: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      document: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

  const handleCancel = () => {
    setFormData({
      employeeCode: "",
      employeeName: "",
      phoneNumber: "",
      email: "",
      department: "",
      role: "",
      designation: "",
      document: null,
    });
  };

  const handleDocumentUpload = () => {
    if (formData.document) {
      alert(`Document "${formData.document.name}" uploaded!`);
    } else {
      alert("Please select a document first");
    }
  };

  return (
    <div className="w-full h-[100px] max-w-4xl mx-auto rounded-lg p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 mt-[-20px] text-black">
        Add Employee
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="grid  grid-cols-3 gap-3 md:gap-4">
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">
              Employee code
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="employeeCode"
              value={formData.employeeCode}
              onChange={handleChange}
              placeholder="Enter"
              className="w-full bg-[#d2d2d230] min-w-0 border border-[#232222a2] rounded-sm px-3 py-2 xl:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">
              Employee Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              placeholder="Enter"
              className="w-full min-w-0 bg-[#d2d2d230] rounded-sm border border-[#232222a2] px-3 py-2 xl:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">
              Phone Number
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter"
              className="w-full bg-[#d2d2d230] rounded-sm border border-[#232222a2] px-3 py-2 xl:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter"
              className="w-full bg-[#d2d2d230] rounded-sm border border-[#232222a2] px-3 py-2 xl:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-base font-medium mb-2 text-gray-700" htmlFor="document-upload">
              Upload Document
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="document-upload"
                type="file"
                name="document"
                onChange={handleFileChange}
                className="flex-1 bg-[#d2d2d230] rounded-sm border border-[#232222a2] px-3 py-2 xl:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                title="Choose a document to upload"
                placeholder="Select a document"
              />
              <button
                type="button"
                className="bg-[#702DFF] text-white text-base px-4 py-2 xl:py-3 rounded hover:bg-purple-700 transition-colors whitespace-nowrap"
                onClick={handleDocumentUpload}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700" id="department-label">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full min-w-0 bg-[#d2d2d230] rounded-sm border border-[#232222a2] px-3 py-2 xl:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-labelledby="department-label"
              title="Department selection"
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700" id="role-label">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full min-w-0 bg-[#d2d2d230] rounded-sm border border-[#232222a2] px-3 py-2 xl:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-labelledby="role-label"
              title="Role selection"
            >
              <option value="">Select</option>
              <option value="Manager">Manager</option>
              <option value="Engineer">Engineer</option>
              <option value="Analyst">Analyst</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-medium mb-2 text-gray-700" id="designation-label">
              Designation
            </label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full min-w-0 bg-[#d2d2d230] rounded-sm border border-[#232222a2] px-3 py-2 xl:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-labelledby="designation-label"
              title="Designation selection"
            >
              <option value="">Select</option>
              <option value="Senior">Senior</option>
              <option value="Junior">Junior</option>
              <option value="Lead">Lead</option>
              <option value="Principal">Principal</option>
              <option value="Associate">Associate</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="submit"
            className="bg-[#702DFF] text-white text-sm px-8 py-2 xl:py-3 rounded-sm transition-colors font-medium"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-[#702DFF] text-white text-sm px-8 py-2 xl:py-3 rounded-sm transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
