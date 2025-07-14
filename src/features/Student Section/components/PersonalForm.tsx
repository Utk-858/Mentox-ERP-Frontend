"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import StudentHeader from "./StudentHeader";
import Select, { type SingleValue, type StylesConfig } from "react-select";

// Types
interface ForxlataState {
  studentName: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  email: string;
  parentsNumber: string;
  alternateNumber: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  guardianName: string;
  address: string;
  aadharNumber: string;
}

interface OptionType {
  value: string;
  label: string;
}

// Styles for react-select
const selectStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    backgroundColor: "#D2D2D233",
    borderColor: "#606060",
    borderRadius: "4px",
    minHeight: "41px",
    boxShadow: "none",
    "&:hover": { borderColor: "#606060" },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111827",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "rgba(51, 51, 51, 0.9)",
    color: "#ffffff",
    zIndex: 9999,
    borderRadius: "8px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "rgba(68, 68, 68, 0.8)"
      : "rgba(51, 51, 51, 0.9)",
    color: "#ffffff",
    cursor: "pointer",
    borderBottom: "1px solid #606060",
    "&:last-child": {
      borderBottom: "none",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#606060",
    "&:hover": { color: "#333333" },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

export default function StudentRegComp() {
  const [activeTab, setActiveTab] = useState<string>("Personal Details");

  const [forxlata, setForxlata] = useState<ForxlataState>({
    studentName: "Student name",
    gender: "Gender",
    bloodGroup: "Blood group",
    nationality: "Nationality",
    email: "Email address",
    parentsNumber: "Parents number",
    alternateNumber: "Alternate number",
    fatherName: "Father's name",
    fatherOccupation: "Father's occupation",
    motherName: "Mother's name",
    motherOccupation: "Mother's occupation",
    guardianName: "Guardian name",
    address: "Address",
    aadharNumber: "8554-5625-8561",
  });

  const genderOptions: OptionType[] = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const bloodGroupOptions: OptionType[] = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ].map((bg) => ({
    value: bg,
    label: bg,
  }));

  return (
    <div className="min-h-screen p-4 xl:p-6">
      <div className="max-w-screen mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4 xl:mb-0">
            New Student Registration
          </h1>
          <button className="bg-[#702DFF] text-white px-4 xl:px-6 py-2 rounded w-full xl:w-auto">
            Back
          </button>
        </div>

        {/* Tab Navigation */}
        <StudentHeader />

        {/* Form */}
        <form className="rounded-lg">
          {/* Row 1 */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
            {/* Student Name */}
            <div className="space-y-2">
              <label
                htmlFor="studentName"
                className="text-gray-700 font-medium"
              >
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                id="studentName"
                value={forxlata.studentName}
                onChange={(e) =>
                  setForxlata({ ...forxlata, studentName: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label htmlFor="gender" className="text-gray-700 font-medium">
                Gender <span className="text-red-500">*</span>
              </label>
              <Select
                id="gender"
                value={genderOptions.find(
                  (opt) => opt.value === forxlata.gender
                )}
                onChange={(opt: SingleValue<OptionType>) =>
                  setForxlata({ ...forxlata, gender: opt?.value || "" })
                }
                options={genderOptions}
                styles={selectStyles}
              />
            </div>

            {/* Blood Group */}
            <div className="space-y-2">
              <label htmlFor="bloodGroup" className="text-gray-700 font-medium">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <Select
                id="bloodGroup"
                value={bloodGroupOptions.find(
                  (opt) => opt.value === forxlata.bloodGroup
                )}
                onChange={(opt: SingleValue<OptionType>) =>
                  setForxlata({ ...forxlata, bloodGroup: opt?.value || "" })
                }
                options={bloodGroupOptions}
                styles={selectStyles}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label
                htmlFor="nationality"
                className="text-gray-700 font-medium"
              >
                Nationality <span className="text-red-500">*</span>
              </label>
              <input
                id="nationality"
                value={forxlata.nationality}
                onChange={(e) =>
                  setForxlata({ ...forxlata, nationality: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={forxlata.email}
                onChange={(e) =>
                  setForxlata({ ...forxlata, email: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="parentsNumber" className="text-gray-700 font-medium">
                Parents Number <span className="text-red-500">*</span>
              </label>
              <input
                id="parentsNumber"
                value={forxlata.parentsNumber}
                onChange={(e) =>
                  setForxlata({ ...forxlata, parentsNumber: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label htmlFor="alternateNumber" className="text-gray-700 font-medium">
                Alternate Number <span className="text-red-500">*</span>
              </label>
              <input
                id="alternateNumber"
                value={forxlata.alternateNumber}
                onChange={(e) =>
                  setForxlata({ ...forxlata, alternateNumber: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="fatherName" className="text-gray-700 font-medium">
                Father's Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fatherName"
                value={forxlata.fatherName}
                onChange={(e) =>
                  setForxlata({ ...forxlata, fatherName: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="fatherOccupation" className="text-gray-700 font-medium">
                Father's Occupation <span className="text-red-500">*</span>
              </label>
              <input
                id="fatherOccupation"
                value={forxlata.fatherOccupation}
                onChange={(e) =>
                  setForxlata({ ...forxlata, fatherOccupation: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label htmlFor="motherName" className="text-gray-700 font-medium">
                Mother's Name <span className="text-red-500">*</span>
              </label>
              <input
                id="motherName"
                value={forxlata.motherName}
                onChange={(e) =>
                  setForxlata({ ...forxlata, motherName: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="motherOccupation" className="text-gray-700 font-medium">
                Mother's Occupation <span className="text-red-500">*</span>
              </label>
              <input
                id="motherOccupation"
                value={forxlata.motherOccupation}
                onChange={(e) =>
                  setForxlata({ ...forxlata, motherOccupation: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="guardianName" className="text-gray-700 font-medium">
                Guardian Name
              </label>
              <input
                id="guardianName"
                value={forxlata.guardianName}
                onChange={(e) =>
                  setForxlata({ ...forxlata, guardianName: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mb-8">
            <div className="xl:col-span-7 space-y-2">
              <label htmlFor="address" className="text-gray-700 font-medium">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                value={forxlata.address}
                onChange={(e) =>
                  setForxlata({ ...forxlata, address: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full min-h-[130px] resize-none"
              />
            </div>

            <div className="xl:col-span-5 space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">
                  Upload Profile Photo
                </label>
                <button
                  type="button"
                  className="w-full flex items-center justify-start gap-2 h-12 bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </button>
              </div>

              <div className="space-y-2">
                <label htmlFor="aadharNumber" className="text-gray-700 font-medium">
                  Aadhar Card Number
                </label>
                <input
                  id="aadharNumber"
                  value={forxlata.aadharNumber}
                  onChange={(e) =>
                    setForxlata({ ...forxlata, aadharNumber: e.target.value })
                  }
                  className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-[#702DFF] text-white w-full xl:w-auto px-8 py-2 rounded"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
