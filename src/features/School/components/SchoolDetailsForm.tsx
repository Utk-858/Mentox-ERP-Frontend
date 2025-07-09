import React, { useState, useEffect,useRef } from "react";

import RequestPermissionModal from "../../Exam Management/components/RequestPermissionModal";
import {  State, City} from "country-state-city";
import type { IState, ICity} from "country-state-city"
interface FormData {
  schoolName: string;
  schoolType: string;
  managementType: string;
  udiseCode: string;
  affiliationNumber: string;
  establishmentDate: string;
  schoolLogo: File | null;
  address: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  officialEmail: string;
  website: string;
  primaryPhone: string;
  secondaryPhone: string;
  panNumber: string;
  gstin: string;
  registrationNumber: string;
  recognizedBy: string;
}
const SchoolDetailsForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
    schoolName: "",
    schoolType: "",
    managementType: "",
    udiseCode: "",
    affiliationNumber: "",
    establishmentDate: "",
    schoolLogo: null,
    address: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    officialEmail: "",
    website: "",
    primaryPhone: "",
    secondaryPhone: "",
    panNumber: "",
    gstin: "",
    registrationNumber: "",
    recognizedBy: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const panFileRef = useRef<HTMLInputElement>(null);
  const gstFileRef = useRef<HTMLInputElement>(null);

  const [stateList, setStateList] = useState<IState[]>([]);
const [cityList, setCityList] = useState<ICity[]>([]);
  

  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    setStateList(indianStates);
  }, []);

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, schoolLogo: e.target.files?.[0] || null });
  };

  

  

  
  const handlePanUploadClick = () => {
    panFileRef.current?.click();
  };

  const handlePanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("PAN file selected:", file.name);
    }
  };

  const handleGstUploadClick = () => {
    gstFileRef.current?.click();
  };

  const handleGstFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("GST file selected:", file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div className="p-8 w-full  mx-auto rounded-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[2rem] font-[600]">School Details</h1>
          <p className="text-[1rem] font-[400] text-[#363636]">
            View and edit school information
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
  className="text-[#702DFF] font-[500] text-[1rem] cursor-pointer"
  onClick={() => setShowPopup(true)}
>
  Request Permission from Admin
</a>
          <button className="bg-black text-white text-[1.25rem] font-[400] px-8 py-1 cursor-pointer rounded-md">
            Edit
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <h2 className="text-[1.5rem] text-[#606060] text-center font-[600] mb-4">
          Basic School Information
        </h2>
        <div className=" gap-4 mb-6">
          <div className="flex flex-col w-full">
            <label className="text-[1.25rem] text-[#60606099] font-[500]">
              School Name<span className="text-red-500">*</span>
            </label>
            <input
              className="border w-full border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
              placeholder="XYZ ABC Public Schools"
              value={formData.schoolName}
              onChange={handleChange("schoolName")}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col w-1/2">
              <label className="text-[1.25rem] text-[#60606099] font-[500]">
                School Type<span className="text-red-500">*</span>
              </label>
              <select
                className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
                value={formData.schoolType}
                onChange={handleChange("schoolType")}
              >
                <option value="">Select</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="Aided">Aided</option>
                <option value="Unaided">Unaided</option>
              </select>
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-[1.25rem] text-[#60606099] font-[500]">
                Management Type<span className="text-red-500">*</span>
              </label>
              <select
                className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
                value={formData.managementType}
                onChange={handleChange("managementType")}
              >
                <option value="">Select</option>
                <option value="Trust">Trust</option>
                <option value="Private Limited">Private Limited</option>
                <option value="Society">Society</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col w-1/3">
              <label className="text-[1.25rem] text-[#60606099] font-[500]">
                UDISE Code
              </label>
              <input
                className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
                placeholder="Enter UDISE Code"
                value={formData.udiseCode}
                onChange={handleChange("udiseCode")}
              />
            </div>
            <div className="flex flex-col w-1/3">
              <label className="text-[1.25rem] text-[#60606099] font-[500]">
                Affiliation Number
              </label>
              <input
                className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
                placeholder="Board affiliation number"
                value={formData.affiliationNumber}
                onChange={handleChange("affiliationNumber")}
              />
            </div>
            <div className="flex flex-col w-1/3">
              <label className="text-[1.25rem] text-[#60606099] font-[500]">
                Establishment Date
              </label>
              <input
                className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
                type="date"
                value={formData.establishmentDate}
                onChange={handleChange("establishmentDate")}
              />
            </div>
          </div>
          <div className="col-span-3 flex flex-col mt-4">
  <label className="text-[1.25rem] text-[#60606099] font-[500] mb-2">
    School Logo
  </label>
  <div className="flex items-center gap-4">
    <div className="w-[70px] h-[70px] rounded-full overflow-hidden bg-[#D9D9D9] flex items-center justify-center">
      {formData.schoolLogo ? (
        <img
          src={URL.createObjectURL(formData.schoolLogo)}
          alt="Logo Preview"
          className="object-cover w-full h-full"
        />
      ) : (
        <img
          src="/school 1.png"
          alt="Logo Preview"
          className="object-cover w-full h-full"
        />
      )}
    </div>

    <div className="flex-1">
      <label
        htmlFor="schoolLogo"
        className="block w-fit bg-[#D2D2D233] border border-[#60606099] text-[#0000004D] text-[1rem] px-4 py-2 rounded cursor-pointer overflow-hidden truncate"
      >
        {formData.schoolLogo
          ? formData.schoolLogo.name
          : "Upload school logo"}
      </label>
      <input
        type="file"
        id="schoolLogo"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  </div>
</div>

        </div>

        {/* Address Info */}
        <h2 className="text-[1.5rem] text-[#606060] text-center font-[600] mb-4">
          Address and Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
         {/* State Selector */}
<div className="flex flex-col">
  <label className="text-[1.25rem] text-[#60606099] font-[500]">
    State<span className="text-red-500">*</span>
  </label>
  <select
    value={stateList.find((s) => s.name === formData.state)?.isoCode || ""}
    onChange={(e) => {
      const selectedStateCode = e.target.value;
      const selectedState = stateList.find((s) => s.isoCode === selectedStateCode);

      const stateCities = City.getCitiesOfState("IN", selectedStateCode);

      setFormData({
        ...formData,
        state: selectedState?.name || "",
        district: "",
        city: ""
      });
      setCityList(stateCities);
    }}
    className="border bg-[#D2D2D233] p-2 rounded text-[#0000004D] text-[1.25rem] font-[500]"
  >
    <option value="">Select State</option>
    {stateList.map((state) => (
      <option key={state.isoCode} value={state.isoCode}>
        {state.name}
      </option>
    ))}
  </select>
</div>

{/* District (City Options) */}
<div className="flex flex-col">
  <label className="text-[1.25rem] text-[#60606099] font-[500]">
    District<span className="text-red-500">*</span>
  </label>
  <select
    value={formData.district}
    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
    disabled={!cityList.length}
    className="border bg-[#D2D2D233] p-2 rounded text-[#0000004D] text-[1.25rem] font-[500]"
  >
    <option value="">Select District</option>
    {cityList.map((city) => (
      <option key={city.name} value={city.name}>
        {city.name}
      </option>
    ))}
  </select>
</div>

{/* City (City Options) */}
<div className="flex flex-col">
  <label className="text-[1.25rem] text-[#60606099] font-[500]">
    City<span className="text-red-500">*</span>
  </label>
  <select
    value={formData.city}
    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
    disabled={!cityList.length}
    className="border bg-[#D2D2D233] p-2 rounded text-[#0000004D] text-[1.25rem] font-[500]"
  >
    <option value="">Select City</option>
    {cityList.map((city) => (
      <option key={city.name} value={city.name}>
        {city.name}
      </option>
    ))}
  </select>
</div>

          <div className="flex flex-col">
            <label className="text-[1.25rem] text-[#60606099] font-[500]">
              Pincode<span className="text-red-500">*</span>
            </label>
            <input
              className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
              value={formData.pincode}
              onChange={handleChange("pincode")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[1.25rem] text-[#60606099] font-[500]">
              Official Email
            </label>
            <input
              className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
              type="email"
              value={formData.officialEmail}
              onChange={handleChange("officialEmail")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[1.25rem] text-[#60606099] font-[500]">
              Website
            </label>
            <input
              className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
              type="url"
              value={formData.website}
              onChange={handleChange("website")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[1.25rem] text-[#60606099] font-[500]">
              Primary Phone
            </label>
            <input
              className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
              value={formData.primaryPhone}
              onChange={handleChange("primaryPhone")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[1.25rem] text-[#60606099] font-[500]">
              Secondary Phone
            </label>
            <input
              className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
              value={formData.secondaryPhone}
              onChange={handleChange("secondaryPhone")}
            />
          </div>
        </div>

        {/* Compliance Info */}
        <h2 className="text-[1.5rem] text-[#606060] text-center font-[600] mb-4">
          Compliance Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="flex flex-col ">
              <label className="text-[1.25rem] text-[#60606099] font-[500]">
                PAN Number
              </label>
              <input
                className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
                value={formData.panNumber}
                onChange={handleChange("panNumber")}
              />
            </div>
             <div className="flex gap-2 justify-end mt-2">
    <input
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      style={{ display: "none" }}
      ref={panFileRef}
      onChange={handlePanFileChange}
    />
    <button
      type="button"
      className="bg-[#606060] text-white border p-2 rounded-[0.3rem]"
      onClick={handlePanUploadClick}
    >
      Upload Document
    </button>
    <button
      type="button"
      className="bg-[#702DFF] text-white border p-2 rounded-[0.3rem]"
    >
      Download Document
    </button>
  </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col ">
              <label className="text-[1.25rem] text-[#60606099] font-[500]">
                GSTIN
              </label>
              <input
                className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
                value={formData.gstin}
                onChange={handleChange("gstin")}
              />
            </div>
              <div className="flex gap-2 justify-end mt-2">
    {/* Hidden input for GST file */}
    <input
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      style={{ display: "none" }}
      ref={gstFileRef}
      onChange={handleGstFileChange}
    />
    <button
      type="button"
      className="bg-[#606060] text-white border p-2 rounded-[0.3rem]"
      onClick={handleGstUploadClick}
    >
      Upload Document
    </button>
    <button
      type="button"
      className="bg-[#702DFF] text-white border p-2 rounded-[0.3rem]"
    >
      Download Document
    </button>
  </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[1.25rem] text-[#60606099] font-[500]">
              Registration Number
            </label>
            <input
              className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
              value={formData.registrationNumber}
              onChange={handleChange("registrationNumber")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[1.25rem] text-[#60606099] font-[500]">
                Recognized By
              </label>
              <select
                className="border border-[#60606099] bg-[#D2D2D233] text-[#0000004D] text-[1.25rem] font-[500] p-2 rounded"
                value={formData.recognizedBy}
                onChange={handleChange("recognizedBy")}
              >
                <option value="">Select</option>
                <option value="Education department/board">Education department/board</option>
                <option value="Private">Private</option>
                <option value="Aided">Aided</option>
                <option value="Unaided">Unaided</option>
              </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="bg-[#702DFF] text-white px-6 py-2 rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-[#702DFF] text-white px-6 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
      {showPopup && (
        <RequestPermissionModal
          onClose={() => {
            setShowPopup(false);
            // Enable editing again
          }}
        />
      )}
    </div>
  );
};

export default SchoolDetailsForm;
