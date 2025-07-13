import React, { useState, useEffect, type ChangeEvent } from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";
import QRCode from "qrcode";
import { Upload } from "lucide-react";

export default function AdmissionQRCode() {
  const [startDate, setStartDate] = useState<string>("2028-07-15");
  const [endDate, setEndDate] = useState<string>("2028-07-15");
  const [acceptingResponses, setAcceptingResponses] = useState<boolean>(true);
  const [formLink, setFormLink] = useState<string>(
    "https://6000-firebase-studio-1791202341934-cluster-htdqsbmfllkdmov5vqrjthcelbm.cloudtubecdn.cloudworkstations.dev/admission-form"
  );
  const [tempFormLink, setTempFormLink] = useState<string>(formLink);
  const [isEditingLink, setIsEditingLink] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const dataURL = await QRCode.toDataURL(formLink, {
          width: 200,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        setQrCodeDataURL(dataURL);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    if (formLink) {
      generateQRCode();
    }
  }, [formLink]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDownloadQR = () => {
    if (qrCodeDataURL) {
      const link = document.createElement("a");
      link.href = qrCodeDataURL;
      link.download = "admission-qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleGenerateNewQR = async () => {
    try {
      const dataURL = await QRCode.toDataURL(formLink, {
        width: 200,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCodeDataURL(dataURL);
      console.log("New QR code generated!");
    } catch (error) {
      console.error("Error generating new QR code:", error);
    }
  };

  const handleViewForm = () => {
    window.open(formLink, "_blank");
  };

  const handleEditLink = () => {
    setTempFormLink(formLink);
    setIsEditingLink(true);
  };

  const handleSaveLink = () => {
    setFormLink(tempFormLink);
    setIsEditingLink(false);
  };

  const handleCancelEdit = () => {
    setTempFormLink(formLink);
    setIsEditingLink(false);
  };

  const handleSave = () => {
    console.log("Saving configuration...");
  };

  return (
    <div className="flex w-full max-w-screen relative p-4 md:p-6 lg:p-10">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="relative flex w-full justify-center z-10 text-center mt-2">
          <SearchBar />
        </div>
        <main>
          <div className="max-w-screen mx-auto px-4 sm:px-6 md:px-8 lg:px-10 mt-5 min-h-screen">
            <div className="rounded-lg p-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
                {/* Left Column - QR Code */}
                <div className="flex bg-gray-50 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 flex-col items-center">
                  <div className="mb-6 ">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                      Admission QR Code
                    </h1>
                    <p className="text-base text-gray-600">
                      Parents can scan this QR code to open the online admission form.
                    </p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                    {qrCodeDataURL ? (
                      <img
                        src={qrCodeDataURL}
                        alt="QR Code"
                        className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-68 lg:h-68"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Generating QR Code...</p>
                      </div>
                    )}
                  </div>
                  <p className="text-base text-gray-700 break-all max-w-sm mt-2">
                    Points to: <span className="underline">{formLink}</span>
                  </p>
                  <button
                    onClick={handleDownloadQR}
                    className="bg-[#702DFF] text-white px-6 font-medium py-3 rounded-md text-lg mt-8 w-full sm:w-auto sm:ml-[230px]"
                  >
                    Download QR
                  </button>
                </div>

                {/* Right Column - Form Controls */}
                <div className="space-y-6 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="start-date"
                        className="text-sm font-medium text-gray-700 mb-1 block"
                      >
                        Application Start Date
                      </label>
                      <input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="end-date"
                        className="text-sm font-medium text-gray-700 mb-1 block"
                      >
                        Application End Date
                      </label>
                      <input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <label
                      htmlFor="accepting-responses"
                      className="text-sm font-medium text-gray-700"
                    >
                      Start Accepting Admission Response
                    </label>
                    <button
                      onClick={() => setAcceptingResponses(!acceptingResponses)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        acceptingResponses ? "bg-[#702DFF]" : "bg-gray-300"
                      }`}
                      title={acceptingResponses ? "Disable responses" : "Enable responses"}
                      aria-label={acceptingResponses ? "Disable responses" : "Enable responses"}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
                          acceptingResponses ? "translate-x-6" : "translate-x-0"
                        }`}
                      ></span>
                    </button>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Add Form Link<span className="text-red-500">*</span>
                    </label>
                    {isEditingLink ? (
                      <div className="space-y-3">
                        <textarea
                          value={tempFormLink}
                          onChange={(e) => setTempFormLink(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm min-h-[80px] resize-none"
                          placeholder="Enter form link..."
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveLink}
                            className="bg-[#702DFF] hover:bg-purple-700 text-white px-4 py-2 text-sm rounded"
                          >
                            Save & Generate QR
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-gray-50 break-all overflow-x-auto scrollbar-hide border border-gray-200 rounded-md p-3 text-sm text-gray-700">
                          {formLink}
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={handleEditLink}
                            className="bg-[#702DFF] hover:bg-purple-700 text-white px-6 py-2 text-sm rounded"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Admission QR Code
                    </h3>
                    <div className="flex flex-col xl:flex-row gap-4 items-start">
                      <div className="flex-1 w-full">
                        <label className="text-sm text-gray-600 mb-2 block">
                          Upload QR Code
                        </label>
                        <div className="border-2 border-[#606060] rounded-lg p-2.5 hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex text-sm text-gray-600 block"
                          >
                            <Upload className="w-4 h-4 mt-0.5 mr-1" />
                            {uploadedFile ? uploadedFile.name : "Upload Photo"}
                          </label>
                        </div>
                      </div>

                      <button
                        onClick={handleSave}
                        className="bg-[#702DFF] hover:bg-purple-700 mt-4 sm:mt-7 text-white py-2.5 px-4 text-sm rounded w-full sm:w-auto"
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleGenerateNewQR}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-sm font-medium rounded"
                    >
                      GENERATE NEW QR CODE
                    </button>
                    <button
                      onClick={handleViewForm}
                      className="w-full bg-[#702DFF] hover:bg-purple-700 text-white py-3 text-sm font-medium rounded"
                    >
                      View Admission Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
