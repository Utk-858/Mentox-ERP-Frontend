import { useState } from "react";
import Select, { type SingleValue, type StylesConfig } from "react-select";
import { Link } from "react-router-dom";
import StudentHeader from "./StudentHeader";

type OptionType = {
  value: string;
  label: string;
};

// Form state type
interface AcademicInfo {
  class: string;
  section: string;
  academicYear: string;
  admissionNumber: string;
  dateOfApplication: string;
}

// react-select styles
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

export default function AcademicInfoForm() {
  const [academicInfo, setAcademicInfo] = useState<AcademicInfo>({
    class: "",
    section: "",
    academicYear: "",
    admissionNumber: "",
    dateOfApplication: "",
  });

  const classOptions: OptionType[] = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }));

  const sectionOptions: OptionType[] = ["A", "B", "C", "D"].map((sec) => ({
    value: sec,
    label: sec,
  }));

  const academicYearOptions: OptionType[] = [
    { value: "2024-25", label: "2024-25" },
    { value: "2025-26", label: "2025-26" },
    { value: "2026-27", label: "2026-27" },
  ];

  const handleGenerateNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    setAcademicInfo({
      ...academicInfo,
      admissionNumber: `STU${randomNumber}`,
    });
  };

  return (
    <form className="mt-8 max-w-screen mx-auto p-1 xl:p-6" aria-label="Academic Information Form">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4 xl:mb-0">
          New Student Registration
        </h1>
        <button
          type="button"
          className="bg-[#702DFF] text-white px-4 xl:px-6 py-2 rounded w-full xl:w-auto"
          aria-label="Back button"
        >
          Back
        </button>
      </div>

      {/* Tab Navigation */}
      <StudentHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label htmlFor="class" className="text-gray-700 font-medium">
            Class <span className="text-red-500">*</span>
          </label>
          <Select
            id="class"
            aria-label="Select class"
            value={classOptions.find(
              (opt) => opt.value === academicInfo.class
            )}
            onChange={(opt: SingleValue<OptionType>) =>
              setAcademicInfo({ ...academicInfo, class: opt?.value || "" })
            }
            options={classOptions}
            styles={selectStyles}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="section" className="text-gray-700 font-medium">
            Section <span className="text-red-500">*</span>
          </label>
          <Select
            id="section"
            aria-label="Select section"
            value={sectionOptions.find(
              (opt) => opt.value === academicInfo.section
            )}
            onChange={(opt: SingleValue<OptionType>) =>
              setAcademicInfo({ ...academicInfo, section: opt?.value || "" })
            }
            options={sectionOptions}
            styles={selectStyles}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="academicYear" className="text-gray-700 font-medium">
            Academic Year <span className="text-red-500">*</span>
          </label>
          <Select
            id="academicYear"
            aria-label="Select academic year"
            value={academicYearOptions.find(
              (opt) => opt.value === academicInfo.academicYear
            )}
            onChange={(opt: SingleValue<OptionType>) =>
              setAcademicInfo({
                ...academicInfo,
                academicYear: opt?.value || "",
              })
            }
            options={academicYearOptions}
            styles={selectStyles}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2 xl:col-span-2 flex gap-2">
          <div className="flex-1">
            <label htmlFor="admissionNumber" className="text-gray-700 font-medium">
              Admission Number <span className="text-red-500">*</span>
            </label>
            <input
              id="admissionNumber"
              type="text"
              value={academicInfo.admissionNumber}
              onChange={(e) =>
                setAcademicInfo({
                  ...academicInfo,
                  admissionNumber: e.target.value,
                })
              }
              className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
              placeholder="Enter admission number"
              aria-label="Admission number input"
            />
          </div>
          <button
            type="button"
            onClick={handleGenerateNumber}
            className="bg-[#702DFF] text-white px-4 rounded mt-6 h-10"
            aria-label="Generate admission number"
          >
            Generate Number
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor="dateOfApplication" className="text-gray-700 font-medium">
            Date of Application
          </label>
          <input
            id="dateOfApplication"
            type="date"
            value={academicInfo.dateOfApplication}
            onChange={(e) =>
              setAcademicInfo({
                ...academicInfo,
                dateOfApplication: e.target.value,
              })
            }
            className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
            aria-label="Date of application"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Link to="/Student/personal-details">
          <button type="button" className="bg-black text-white px-8 py-2 rounded" aria-label="Go to previous page">
            Previous
          </button>
        </Link>
        <Link to="/Student/additional-info">
          <button type="button" className="bg-[#702DFF] text-white px-8 py-2 rounded" aria-label="Go to next page">
            Next
          </button>
        </Link>
      </div>
    </form>
  );
}
