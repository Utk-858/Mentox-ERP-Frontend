import { useState, type ChangeEvent } from "react";
import Select, { type StylesConfig, type SingleValue } from "react-select";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";
import StudentHeader from "./StudentHeader";

interface OptionType {
  value: string;
  label: string;
}

interface InfoState {
  category: string;
  bloodGroup: string;
  bplBeneficiary: string;
  ews: string;
  specialNeeds: string;
  weight: string;
  height: string;
  aadharNumber: string;
  profilePhoto: File | null;
  casteCertificate: File | null;
}

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

export default function AdditionalInfoForm() {
  const [info, setInfo] = useState<InfoState>({
    category: "",
    bloodGroup: "",
    bplBeneficiary: "",
    ews: "",
    specialNeeds: "",
    weight: "",
    height: "",
    aadharNumber: "",
    profilePhoto: null,
    casteCertificate: null,
  });

  const categoryOptions: OptionType[] = [
    { value: "GEN", label: "General" },
    { value: "OBC", label: "OBC" },
    { value: "SC", label: "SC" },
    { value: "ST", label: "ST" },
  ];

  const bloodGroupOptions: OptionType[] = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
  ].map((bg) => ({ value: bg, label: bg }));

  const yesNoOptions: OptionType[] = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  function handleFileChange(field: keyof InfoState, file: File | null) {
    setInfo((prev) => ({ ...prev, [field]: file }));
  }

  return (
    <form className="mt-8 max-w-screen mx-auto p-1 xl:p-6" aria-label="Additional Information Form">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 mb-4 xl:mb-0">
          New Student Registration
        </h1>
        <button type="button" className="bg-[#702DFF] text-white px-4 xl:px-6 py-2 rounded w-full xl:w-auto" aria-label="Back">
          Back
        </button>
      </div>

      {/* Tab Navigation */}
      <StudentHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        {/* Category */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium" id="category-label">
            Category <span className="text-red-500">*</span>
          </label>
          <Select<OptionType>
            value={categoryOptions.find(opt => opt.value === info.category) || null}
            onChange={(opt: SingleValue<OptionType>) =>
              setInfo((prev) => ({ ...prev, category: opt?.value || "" }))
            }
            options={categoryOptions}
            styles={selectStyles}
            aria-labelledby="category-label"
          />
        </div>

        {/* Blood Group */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium" id="blood-group-label">
            Blood Group <span className="text-red-500">*</span>
          </label>
          <Select<OptionType>
            value={bloodGroupOptions.find(opt => opt.value === info.bloodGroup) || null}
            onChange={(opt: SingleValue<OptionType>) =>
              setInfo((prev) => ({ ...prev, bloodGroup: opt?.value || "" }))
            }
            options={bloodGroupOptions}
            styles={selectStyles}
            aria-labelledby="blood-group-label"
          />
        </div>

        {/* BPL Beneficiary */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium" id="bpl-label">
            BPL Beneficiary <span className="text-red-500">*</span>
          </label>
          <Select<OptionType>
            value={yesNoOptions.find(opt => opt.value === info.bplBeneficiary) || null}
            onChange={(opt: SingleValue<OptionType>) =>
              setInfo((prev) => ({ ...prev, bplBeneficiary: opt?.value || "" }))
            }
            options={yesNoOptions}
            styles={selectStyles}
            aria-labelledby="bpl-label"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        {/* EWS */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium" id="ews-label">
            EWS / Disadvantages <span className="text-red-500">*</span>
          </label>
          <Select<OptionType>
            value={yesNoOptions.find(opt => opt.value === info.ews) || null}
            onChange={(opt: SingleValue<OptionType>) =>
              setInfo((prev) => ({ ...prev, ews: opt?.value || "" }))
            }
            options={yesNoOptions}
            styles={selectStyles}
            aria-labelledby="ews-label"
          />
        </div>

        {/* Special Needs */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium" id="special-needs-label">
            Special Needs (CWSN) <span className="text-red-500">*</span>
          </label>
          <Select<OptionType>
            value={yesNoOptions.find(opt => opt.value === info.specialNeeds) || null}
            onChange={(opt: SingleValue<OptionType>) =>
              setInfo((prev) => ({ ...prev, specialNeeds: opt?.value || "" }))
            }
            options={yesNoOptions}
            styles={selectStyles}
            aria-labelledby="special-needs-label"
          />
        </div>

        {/* Weight and Height */}
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-gray-700 font-medium" id="weight-label">Weight</label>
            <div className="relative">
              <input
                type="number"
                value={info.weight}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInfo({ ...info, weight: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full pr-10"
                placeholder="Enter weight"
                aria-labelledby="weight-label"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 text-sm pointer-events-none">
                Kg
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <label className="text-gray-700 font-medium" id="height-label">Height</label>
            <div className="relative">
              <input
                type="number"
                value={info.height}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setInfo({ ...info, height: e.target.value })
                }
                className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full pr-10"
                placeholder="Enter height"
                aria-labelledby="height-label"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 text-sm pointer-events-none">
                Cm
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        {/* Aadhar Number */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium" id="aadhar-label">
            Enter Aadhar Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={info.aadharNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInfo({ ...info, aadharNumber: e.target.value })
            }
            className="bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 w-full"
            placeholder="Enter Aadhar number"
            aria-labelledby="aadhar-label"
          />
        </div>

        {/* Profile Photo */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium" id="profile-photo-label">Upload Profile Photo</label>
          <label className="w-full flex items-center justify-between h-12 bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 cursor-pointer" htmlFor="profile-photo-input">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>{info.profilePhoto?.name || "Upload Photo"}</span>
            </div>
            <input
              id="profile-photo-input"
              type="file"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFileChange("profilePhoto", e.target.files?.[0] || null)
              }
              aria-labelledby="profile-photo-label"
            />
          </label>
        </div>

        {/* Caste Certificate */}
        <div className="space-y-2">
          <label className="text-gray-700 font-medium" id="caste-certificate-label">Upload Caste Certificate</label>
          <label className="w-full flex items-center justify-between h-12 bg-[#D2D2D233] border border-[#606060] rounded px-3 py-2 cursor-pointer" htmlFor="caste-certificate-input">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>{info.casteCertificate?.name || "Upload Photo"}</span>
            </div>
            <input
              id="caste-certificate-input"
              type="file"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleFileChange("casteCertificate", e.target.files?.[0] || null)
              }
              aria-labelledby="caste-certificate-label"
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-6">
          <button type="button" className="bg-[#606060] text-white w-full px-6 py-2 rounded" aria-label="Upload Documents">
            Upload Documents
          </button>
          <button type="button" className="bg-[#702DFF] text-white w-full px-6 py-2 rounded" aria-label="Download Documents">
            Download Documents
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Link to={"/Student/academic-info"}>
          <button type="button" className="bg-black text-white px-8 py-2 rounded" aria-label="Previous">
            Previous
          </button>
        </Link>
        <button type="button" className="bg-[#702DFF] text-white px-8 py-2 rounded" aria-label="Create">
          Create
        </button>
      </div>
    </form>
  );
}
