import { useState } from "react";
import { Upload } from "lucide-react";

// Sample data for demonstration
const sampleRecord = {
  studentName: "Hemish Jain",
  gender: "Male",
  bloodGroup: "B+",
  nationality: "Indian",
  email: "hemish.jain@gmail.com",
  parentsNumber: "+91 7985548374",
  alternateNumber: "+91 7985548374",
  fatherName: "Hemish Jain",
  fatherOccupation: "Business",
  motherName: "Hemish Jain",
  motherOccupation: "Business",
  guardianName: "Business",
  address: "Home",
  category: "General",
  bplBeneficiary: "No",
  disadvantage: "No",
  specialNeeds: "No",
  weight: 65,
  height: 170,
  aadharNumber: "4868 6693 2898"
};

export default function AdmissionRequestForm() {
  const [record] = useState(sampleRecord);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 mb-10 gap-2">
        <h1 className="text-2xl xl:text-3xl font-bold text-gray-900">
          Admission Application
        </h1>
        <button aria-label="Go back" className="bg-[#702DFF] text-white px-4 xl:px-6 py-2 rounded hover:bg-[#5a24cc]">
          Back
        </button>
      </div>
      <div className="text-center">
        <h1>Hemish Morgan School</h1>
        <p>Mr. John Doe, 123 Main Street, Anytown, 123456, India</p>
      </div>

      <div className="bg-gray-50 rounded-md p-4 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold">Submitted Information</h2>
        <p className="text-gray-500 text-sm mb-10 mt-[-1rem]">
          This is the information provided by the parent. It cannot be edited here.
        </p>

        <div className="grid gap-4 mb-4 md:grid-cols-2 xl:grid-cols-3">
          <div><label htmlFor="studentName">Student's Name<span className="text-red-500">*</span></label>
            <input id="studentName" disabled value={record.studentName} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Student's Name" />
          </div>
          <div><label htmlFor="gender">Gender<span className="text-red-500">*</span></label>
            <input id="gender" disabled value={record.gender} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Gender" />
          </div>
          <div><label htmlFor="bloodGroup">Blood Group<span className="text-red-500">*</span></label>
            <input id="bloodGroup" disabled value={record.bloodGroup} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Blood Group" />
          </div>
          <div><label htmlFor="nationality">Nationality<span className="text-red-500">*</span></label>
            <input id="nationality" disabled value={record.nationality} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Nationality" />
          </div>
          <div><label htmlFor="email">Email Address<span className="text-red-500">*</span></label>
            <input id="email" disabled value={record.email} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Email Address" />
          </div>
          <div><label htmlFor="parentsNumber">Parent's Number<span className="text-red-500">*</span></label>
            <input id="parentsNumber" disabled value={record.parentsNumber} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Parent's Number" />
          </div>
          <div><label htmlFor="alternateNumber">Alternate Number<span className="text-red-500">*</span></label>
            <input id="alternateNumber" disabled value={record.alternateNumber} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Alternate Number" />
          </div>
          <div><label htmlFor="fatherName">Father's Name<span className="text-red-500">*</span></label>
            <input id="fatherName" disabled value={record.fatherName} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Father's Name" />
          </div>
          <div><label htmlFor="fatherOccupation">Father's Occupation<span className="text-red-500">*</span></label>
            <input id="fatherOccupation" disabled value={record.fatherOccupation} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Father's Occupation" />
          </div>
          <div><label htmlFor="motherName">Mother's Name<span className="text-red-500">*</span></label>
            <input id="motherName" disabled value={record.motherName} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Mother's Name" />
          </div>
          <div><label htmlFor="motherOccupation">Mother's Occupation<span className="text-red-500">*</span></label>
            <input id="motherOccupation" disabled value={record.motherOccupation} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Mother's Occupation" />
          </div>
          <div><label htmlFor="guardianName">Guardian Name</label>
            <input id="guardianName" disabled value={record.guardianName} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Guardian Name" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label htmlFor="address">Address<span className="text-red-500">*</span></label>
            <textarea id="address" disabled value={record.address} className="bg-[#D2D2D233] border border-[#606060] p-3 rounded w-full h-24 resize-none" placeholder="Address" />
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="profilePhoto">Upload Profile Photo</label>
            <div className="flex items-center gap-3 border border-[#606060] rounded-md px-4 py-3 bg-[#D2D2D233]">
              <Upload className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">photo.jpg</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            aria-label={isSaved ? "Saved" : "Save"}
            onClick={() => setIsSaved(true)}
            className="bg-[#702DFF] text-white px-4 py-2 rounded hover:bg-[#5a24cc]"
          >
            {isSaved ? "Saved ✓" : "Save"}
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md p-4 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold">Additional Details</h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div><label htmlFor="category">Category</label>
            <input id="category" disabled value={record.category || "-"} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Category" />
          </div>
          <div><label htmlFor="bloodGroupAdd">Blood Group</label>
            <input id="bloodGroupAdd" disabled value={record.bloodGroup || "-"} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Blood Group" />
          </div>
          <div><label htmlFor="bplBeneficiary">BPL Beneficiary</label>
            <input id="bplBeneficiary" disabled value={record.bplBeneficiary || "-"} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="BPL Beneficiary" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div><label htmlFor="disadvantage">EWS / Disadvantage</label>
            <input id="disadvantage" disabled value={record.disadvantage || "-"} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="EWS / Disadvantage" />
          </div>
          <div><label htmlFor="specialNeeds">Special Needs (CWSN)</label>
            <input id="specialNeeds" disabled value={record.specialNeeds || "-"} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Special Needs" />
          </div>
          <div><label htmlFor="weight">Weight</label>
            <input id="weight" disabled value={record.weight ? `${record.weight} Kg` : "-"} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Weight" />
          </div>
          <div><label htmlFor="height">Height</label>
            <input id="height" disabled value={record.height ? `${record.height} Cm` : "-"} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Height" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div><label htmlFor="aadharNumber">Enter Aadhar Number</label>
            <input id="aadharNumber" disabled value={record.aadharNumber || "-"} className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Aadhar Number" />
          </div>
          <div><label htmlFor="uploadPhoto">Upload Profile Photo</label>
            <input id="uploadPhoto" disabled value="photo.png" className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full xl:w-[400px]" placeholder="Profile Photo" />
          </div>
          <div className="flex items-end">
            <button aria-label="Download" className="text-sm xl:ml-[100px] xl:w-[200px] px-4 py-2.5 rounded bg-[#702DFF] text-white hover:bg-[#5a24cc]">
              Download
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 w-full">
            <div className="w-full">
              <label htmlFor="casteCertificate">Upload Caste Certificate</label>
              <input id="casteCertificate" disabled value="XYZ.png" className="bg-[#D2D2D233] border border-[#606060] p-2 rounded w-full" placeholder="Caste Certificate" />
            </div>
            <div className="flex gap-2">
              <button aria-label="Upload Documents" className="text-sm w-[200px] py-3 rounded bg-gray-500 text-white">
                Upload Documents
              </button>
              <button aria-label="Download Documents" className="text-sm w-[200px] px-4 py-3 rounded bg-[#702DFF] text-white hover:bg-[#5a24cc]">
                Download Documents
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button aria-label="Submit" className="bg-[#702DFF] text-white px-4 py-2 rounded hover:bg-[#5a24cc]">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}