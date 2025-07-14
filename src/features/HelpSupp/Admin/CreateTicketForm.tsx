import React, { useState, type DragEvent, type ChangeEvent } from "react";

export interface FilePreview {
  url: string;
  name: string;
  type: "image" | "pdf" | "doc" | "other";
  file: File;
  previewUrl?: string;
}

interface CreateTicketFormProps {
  onSubmit: (ticket: {
    subject: string;
    category: string;
    priority: "Low" | "Medium" | "High";
    to: string;
    description: string;
    attachments?: FilePreview[];
  }) => void;
  onCancel: () => void;
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ onSubmit, onCancel }) => {
  const [category, setCategory] = useState("");
  const [to, setTo] = useState("Admin");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      subject,
      category,
      to,
      priority: "Low",
      description,
      attachments: files,
    });
  };

  const handleFiles = (selectedFiles: FileList) => {
    Array.from(selectedFiles).forEach((file) => {
      const url = URL.createObjectURL(file);
      const ext = file.name.split(".").pop()?.toLowerCase();
      let type: FilePreview["type"] = "other";
      if (file.type.startsWith("image/")) type = "image";
      else if (ext === "pdf") type = "pdf";
      else if (["doc", "docx"].includes(ext || "")) type = "doc";
      const preview: FilePreview = {
        file,
        name: file.name,
        url,
        type,
      };
      if (type === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          preview.previewUrl = reader.result as string;
          setFiles((prev) => [...prev, preview]);
        };
        reader.readAsDataURL(file);
      } else {
        setFiles((prev) => [...prev, preview]);
      }
    });
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Create Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            >
              <option value="">Select Category</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Billing">Billing</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To *</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            >
              <option value="Admin">Admin</option>
              <option value="Support">Support</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Enter Subject"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Please provide detailed information about your issue.."
            required
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Attachments (Optional)</label>
          <label
            htmlFor="fileInput"
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`w-full rounded px-3 py-6 text-center text-sm cursor-pointer transition ${
              dragOver ? "border-blue-400 bg-blue-50" : "text-gray-500"
            }`}
          >
            <div className="text-center border-2 border-dashed py-2">
              <div className="text-3xl mb-2 text-purple-500">🔗</div>
              <p className="text-sm text-gray-600">Drop files here or click to browse</p>
              <span className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</span>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                multiple
                className="hidden"
                id="fileInput"
                onChange={handleFileInputChange}
              />
            </div>
          </label>
        </div>

        {files.length > 0 && (
          <div className="grid gap-3 mt-3">
            {files.map((fp, idx) => (
              <div
                key={idx}
                className="border rounded p-2 bg-gray-100 shadow flex items-center gap-3"
              >
                {fp.previewUrl ? (
                  <img
                    src={fp.previewUrl}
                    alt={fp.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="text-sm">📄 {fp.name}</div>
                )}
                <div className="text-xs text-gray-600">
                  {(fp.file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-black text-white px-4 py-2 rounded text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 cursor-pointer"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicketForm;
