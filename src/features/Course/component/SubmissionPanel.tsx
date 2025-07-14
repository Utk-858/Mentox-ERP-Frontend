import {
  UsersRound,
  Send,
  FileText,
  Link,
  Folder,
  X
} from "lucide-react";
import React, {
  useState,
  type ChangeEvent,
  useRef,
  useEffect
} from "react";

interface SubmissionPanelProps {
  dueDate: string; // ISO format: e.g., "2025-06-18T23:59:59"
}

const SubmissionPanel: React.FC<SubmissionPanelProps> = ({ dueDate }) => {
  const [comment, setComment] = useState<string>("");
  const [submittedFile, setSubmittedFile] = useState<File | null>(null);
  const [submittedLink, setSubmittedLink] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showFileModal, setShowFileModal] = useState<boolean>(false);
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [linkInput, setLinkInput] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSubmittedFile(file);
    }
  };

  const handleFileSubmit = () => {
    if (submittedFile) {
      setShowFileModal(false);
    }
  };

  const handleLinkSubmit = () => {
    if (linkInput.trim()) {
      setSubmittedLink(linkInput.trim());
      setLinkInput("");
      setShowLinkModal(false);
    }
  };

  const handleUnsubmit = () => {
    setSubmittedFile(null);
    setSubmittedLink(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const now = new Date();
  const due = new Date(dueDate);
  let renderStatus = "";

  if (submittedFile || submittedLink) {
    renderStatus = "Turned in";
  } else if (now > due) {
    renderStatus = "Missing";
  } else {
    renderStatus = "Assigned";
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg  relative">
     
      {/* File/Link Submission Box */}

      <div className="border border-gray-300 rounded-lg bg-gray-50 px-2 py-5 xl:px-4 xl:py-10">
         <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Your work</h3>
        <span
          className={`font-semibold text-sm ${
            renderStatus === "Missing"
              ? "text-red-600"
              : renderStatus === "Assigned"
              ? "text-green-600"
              : "text-gray-500"
          }`}
        >
          {renderStatus}
        </span>
      </div>

        {submittedFile && (
          <>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-white border rounded overflow-hidden">
                {submittedFile.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(submittedFile)}
                    alt="Uploaded"
                    className="object-cover w-full h-full"
                  />
                ) : submittedFile.type === "application/pdf" ? (
                  <span className="text-2xl">📄</span>
                ) : submittedFile.name.endsWith(".doc") || submittedFile.name.endsWith(".docx") ? (
                  <span className="text-2xl text-blue-700">📘</span>
                ) : (
                  <span className="text-sm">📁</span>
                )}
              </div>
              <div className="flex flex-col text-sm text-gray-700">
                <span className="font-medium truncate max-w-[200px]">{submittedFile.name}</span>
                <span className="text-xs text-gray-500 mt-1">
                  {submittedFile.type.startsWith("image/") ? "Image"
                    : submittedFile.type === "application/pdf" ? "PDF Document"
                    : submittedFile.name.endsWith(".doc") || submittedFile.name.endsWith(".docx") ? "Word Document"
                    : "File"}
                </span>
              </div>
            </div>
            <button
              onClick={handleUnsubmit}
              className="mt-3 w-full bg-[#00000075] text-white rounded-full py-2 font-semibold transition"
              title="Unsubmit work"
            >
              Unsubmit
            </button>
          </>
        )}

        {!submittedFile && submittedLink && (
          <>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative flex items-center justify-center bg-gray-200 border rounded overflow-hidden">
                <img
                  src={submittedLink}
                  alt="Link Preview"
                  className="object-cover w-full h-full"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <div className="flex flex-col text-sm text-gray-700">
                <span className="font-medium truncate max-w-[200px] capitalize">
                  {submittedLink
                    .replace("https://", "")
                    .replace("http://", "")
                    .split("/")[0]
                    .split(".")
                    .filter((p) => p !== "www")[0]}
                </span>
                <a
                  href={submittedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs break-all mt-1"
                >
                  {submittedLink}
                </a>
              </div>
            </div>
            <button
              onClick={handleUnsubmit}
              className="mt-3 w-full bg-[#00000075] text-white rounded-full py-2 font-semibold transition"
              title="Unsubmit work"
            >
              Unsubmit
            </button>
          </>
        )}

        {!submittedFile && !submittedLink && (
          <>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full border border-gray-300 rounded-full py-2 text-[#702DFF] font-medium hover:bg-gray-100 transition"
                title="Add or create work"
              >
                + Add or create
              </button>

              {dropdownOpen && (
                <div
                  className="absolute left-0 top-14 w-full z-10 backdrop-blur-md border border-gray-600/40 rounded-lg shadow-md overflow-hidden"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                >
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-white/10 text-white flex items-center gap-2 text-sm"
                    onClick={() => window.open("https://drive.google.com/drive/my-drive", "_blank")}
                    title="Open Google Drive"
                  >
                    <Folder size={16} /> Google Drive
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-white/10 text-white flex items-center gap-2 text-sm"
                    onClick={() => {
                      setShowLinkModal(true);
                      setDropdownOpen(false);
                    }}
                    title="Add link"
                  >
                    <Link size={16} /> Link
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-white/10 text-white flex items-center gap-2 text-sm"
                    onClick={() => {
                      setShowFileModal(true);
                      setDropdownOpen(false);
                    }}
                    title="Upload file"
                  >
                    <FileText size={16} /> File
                  </button>
                </div>
              )}
            </div>
            <button 
              className="mt-4 w-full bg-[#702DFF] text-white rounded-full py-2 font-semibold  transition"
              title="Mark assignment as done"
            >
              Mark as done
            </button>
          </>
        )}
      </div>
        {/* Private Comments Box */}
<div className="mt-4 border border-gray-300 rounded-lg bg-gray-50 p-4">
  <div className="flex items-center text-[#702DFF] font-medium mb-3">
    <UsersRound className="mr-2 h-5 w-5" />
    <span>Add Private Comments</span>
  </div>

  <div className="relative flex justify-end">
    <div className="w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring">
 <input
      type="text"
      placeholder="Add class comment..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="mb-6"
    />
     <div className="flex items-center space-x-3 mt-2 text-gray-400 text-sm">
    <button className="hover:text-gray-600 font-bold" title="Bold">B</button>
    <button className="hover:text-gray-600 italic" title="Italic">I</button>
    <button className="hover:text-gray-600 underline" title="Underline">U</button>
  </div>
    </div>
   

    <div className="mt-17 ml-2">
      <button
        onClick={() => {
          if (comment.trim()) {
            alert(`Comment submitted: ${comment}`);
            setComment("");
          }
        }}
        className="text-gray-400"
        title="Send comment"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  </div>

 
</div>


      {/* File Modal */}
      {showFileModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-3 rounded-lg mx-1 w-full max-w-md space-y-3">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Upload File</h2>
              <button className="cursor-pointer" onClick={() => setShowFileModal(false)} title="Close modal">
                <X />
              </button>
            </div>
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="No file selected"
                readOnly
                value={submittedFile?.name || ""}
                className="w-full border rounded px-3 py-1 text-sm bg-gray-100"
              />
              <input
                id="hiddenFileInput"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
              {!submittedFile ? (
                <label
                  htmlFor="hiddenFileInput"
                  className="bg-[#702DFF] text-white px-4 py-2 text-xs rounded whitespace-nowrap cursor-pointer"
                >
                  Select File
                </label>
              ) : (
                <button
                  onClick={handleFileSubmit}
                  className="bg-[#702DFF] text-white px-4 py-1 text-xs rounded whitespace-nowrap"
                  title="Submit file"
                >
                  Submit
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Note: This file is going to be seen by your teacher. Make sure everything is legible and the file size is less than 1GiB.
            </p>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white p-3 rounded-lg mx-1 w-full max-w-md space-y-3">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-semibold">Add Link</h2>
              <button className="cursor-pointer" onClick={() => setShowLinkModal(false)} title="Close modal">
                <X />
              </button>
            </div>
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="Add link here"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                className="w-full border rounded px-3 py-1 text-sm bg-gray-100"
              />
              <button
                onClick={handleLinkSubmit}
                className="bg-[#702DFF]  0 text-white px-4 py-1 rounded text-sm"
                title="Submit link"
              >
                Submit
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Note: This link is going to be seen by your teacher. Make sure it's legible and working.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default SubmissionPanel;
