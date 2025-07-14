import React from 'react';
import { Upload, Download } from 'lucide-react';

interface FileUploadProps {
  label: string;
  fileStatus: string;
  onFileSelect: (file: File) => void;
  onDownloadClick: () => void;
  hasExistingFile: boolean;
  required?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  fileStatus,
  onFileSelect,
  onDownloadClick,
  hasExistingFile,
  required = false,
}) => {
  // Safeguard to prevent crashes if the label prop is missing.
  if (!label) {
    console.error("FileUpload component requires a 'label' prop but it was not provided.");
    return null; // Return null to prevent rendering a broken component.
  }

  // Create a unique ID for the input for accessibility.
  const inputId = `file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="lg:col-span-2"> 
      <label className="block text-sm font-medium text-gray-500 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white">
        <span className="text-base text-gray-700 truncate pr-2">{fileStatus}</span>
        <div className="flex items-center gap-2">
          <label
            htmlFor={inputId}
            className="bg-gray-200 text-gray-800 font-semibold rounded-md px-4 py-2 text-sm cursor-pointer hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            <Upload size={16} />
            <span>Upload</span>
          </label>
          <input
            id={inputId}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={onDownloadClick}
            disabled={!hasExistingFile}
            className="bg-gray-600 text-white font-semibold rounded-md px-4 py-2 text-sm hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;