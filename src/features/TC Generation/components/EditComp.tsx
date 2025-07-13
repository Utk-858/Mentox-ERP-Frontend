import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function TCTemplateEditor() {
  const [templateHTML, setTemplateHTML] = useState(`<html>
<head>
  <style>
    body { font-family: 'Times New Roman', serif; border: 2px solid black; padding: 20px; }
    header { text-align: center; }
    .logo { max-height: 80px; margin-bottom: 10px; }
    .school-name { font-size: 24px; margin: 0; }
    .school-address { font-size: 14px; }
    .title { font-size: 20px; text-decoration: underline; margin-top: 20px; }
    .content { margin-top: 20px; line-height: 1.8; font-size: 14px; }
    ol { list-style-type: decimal; padding-left: 25px; }
    li { margin-bottom: 8px; }
  </style>
</head>
<body>
  <header>
    <img src="logo.png" class="logo" alt="School Logo" />
    <div class="school-info">
      <h1 class="school-name">School Name</h1>
      <p class="school-address">School Address</p>
    </div>
    <h2 class="title">Terms and Conditions</h2>
  </header>
  <div class="content">
    <p>These terms and conditions govern your use of our services.</p>
    <ol>
      <li>All students must follow the school policies.</li>
      <li>Fees must be paid on time.</li>
      <li>Regular attendance is mandatory.</li>
    </ol>
  </div>
</body>
</html>`)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/html") {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setTemplateHTML(content)
      }
      reader.readAsText(file)
    } else {
      alert("Please select a valid HTML file")
    }
  }

  const handleSaveTemplate = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Saving template:", templateHTML)
      alert("Template saved successfully!")
    } catch (error) {
      alert("Error saving template. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

const navigate = useNavigate();

const handleBack = () => {
  navigate(-1);
};


  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <div className="p-6 ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-semibold">Edit TC Template</h2>
            <button
              onClick={handleBack}
              className="bg-[#702DFF] text-white px-6 py-2 rounded transition"
              title="Go back to previous page"
            >
              Back
            </button>
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label htmlFor="fileUpload" className="block mb-1 font-medium">Upload Template File (.html)</label>
            <input
              id="fileUpload"
              type="file"
              accept=".html"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="block w-full text-sm bg-gray-50 border border-gray-300 rounded px-2 py-2"
              title="Upload HTML template file"
            />
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-1">{selectedFile.name}</p>
            )}
          </div>

          {/* HTML Template Textarea */}
          <div className="mb-4">
            <label htmlFor="templateHTML" className="block mb-1 font-medium">Template HTML</label>
            <textarea
              id="templateHTML"
              value={templateHTML}
              onChange={(e) => setTemplateHTML(e.target.value)}
              className="w-full min-h-[400px] text-sm font-mono p-3 bg-gray-50 border border-gray-300 rounded resize-none"
              placeholder="Enter your HTML template here..."
              title="HTML template editor"
            />
          </div>

          {/* Save Button */}
          <div className="text-right">
            <button
              onClick={handleSaveTemplate}
              disabled={isLoading || !templateHTML.trim()}
              className={`px-10 py-2 rounded text-white bg-[#702DFF] transition ${
                (isLoading || !templateHTML.trim()) && "opacity-60 cursor-not-allowed"
              }`}
              title="Save template changes"
            >
              {isLoading ? "Saving..." : "Save The Template"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
