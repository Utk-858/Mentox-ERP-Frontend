"use client"

import React, { useState } from "react"
import PDFViewer from "./PDFViewer"
import ImageViewer from "./ImageViewer"

interface FileItem {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadDate: Date
}

export default function FileViewer() {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "Hello.pdf",
      type: "application/pdf",
      size: 2048000,
      url: "/Hello.pdf",
      uploadDate: new Date(),
    },
    {
      id: "2",
      name: "bg_1.png",
      type: "image/",
      size: 2048000,
      url: "/bg_1.png",
      uploadDate: new Date(),
    },
  ])

  const [selectedFile, setSelectedFile] = useState<FileItem | null>(files[0])
  const [marks, setMarks] = useState("")
  const [totalPoints, setTotalPoints] = useState(100)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newTotalPoints, setNewTotalPoints] = useState(totalPoints)

  const handleMarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarks(e.target.value)
  }

  return (
    <div className="flex flex-col xl:flex-row min-h-screen max-w-screen bg-white font-sans gap-4 md:gap-[30px]  ">
      {/* Left preview panel */}
      <div className="w-full md:flex-1 p-4 md:p-6 overflow-y-auto scrollbar-hide rounded-2xl bg-[#F5F5F7]">
        {selectedFile ? (
          selectedFile.type === "application/pdf" ? (
            <PDFViewer fileUrl={selectedFile.url} fileName={selectedFile.name} />
          ) : selectedFile.type.startsWith("image/") ? (
            <ImageViewer imageUrl={selectedFile.url} fileName={selectedFile.name} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
              Unsupported file type
            </div>
          )
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            No file selected
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <div className="flex flex-col items-center w-full md:w-[340px] ">
        <div className="w-full bg-[#F5F5F7] rounded-2xl p-4 shadow-md h-[70vh] max-h-[80vh] md:max-h-none overflow-auto">
          <h2 className="font-semibold text-gray-800 text-sm md:text-base">File</h2>
          <p className="text-xs text-gray-500 mt-1 mb-1.5">Handed in on 22 Jun, 15:59</p>
          <a href="#" className="text-xs text-[#702DF6] font-medium">See History</a>

          {/* File list */}
          <div className="space-y-2 mt-4">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className={`flex items-center gap-3 p-2 border border-gray-200 rounded cursor-pointer ${
                  selectedFile?.id === file.id ? "border-[#702DF6]" : "hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10 bg-gray-200 rounded shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-gray-800 truncate">{file.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{file.type.split("/")[1]}</p>
                </div>
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm">
                  ↗
                </a>
              </div>
            ))}
          </div>

          {/* Marks input and total points */}
          <div className="mt-4 relative">
            <label htmlFor="marks" className="text-sm text-gray-700 font-medium flex items-center gap-1">
              Marks <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <input
                id="marks"
                type="number"
                value={marks}
                onChange={handleMarksChange}
                max={totalPoints}
                className="w-full border border-gray-300 px-3 py-1.5 text-sm rounded  appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder={`/${totalPoints}`}
              />

              <div
                className="absolute right-2 top-1.5 text-gray-400 text-lg cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                ⋮
              </div>

              {showDropdown && (
                <div className="absolute top-8 right-0 z-10 bg-[#070707f1] border rounded shadow-md text-sm">
                  <button
                    className="px-4 py-2w-full text-left text-white"
                    onClick={() => {
                      setShowDropdown(false)
                      setShowModal(true)
                    }}
                  >
                    Change total points
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Comments */}
          <div className="mt-3">
            <div className="flex items-center gap-2 text-sm text-[#702DF6] font-medium cursor-pointer">
              <span className="text-base">👤</span> Add Private Comments
            </div>
            <textarea
              className="w-full mt-2 border border-gray-300 p-2 text-sm rounded"
              rows={2}
              placeholder="Add comment..."
            ></textarea>
          </div>
        </div>

        {/* Save button aligned to right */}
        <div className="pt-4 md:pt-6 w-full flex justify-end">
          <button className="w-[100px] py-2 bg-[#702DF6] text-white text-sm rounded shadow">
            Save
          </button>
        </div>
      </div>

      {/* Modal for changing total points */}
      {showModal && (
        <div className="fixed inset-0 bg-[#03031910] flex items-center justify-center z-50">
          <div className="bg-white shadow-2xl rounded-xl p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Change total points</h2>
            <label className="block text-sm text-gray-600 mb-1">Total Points For assignment</label>
            <input
              type="number"
              value={newTotalPoints}
              onChange={(e) => setNewTotalPoints(parseInt(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded text-sm mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                className="text-gray-600 text-sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#702DF6] text-white text-sm px-4 py-1.5 rounded"
                onClick={() => {
                  setTotalPoints(newTotalPoints)
                  setShowModal(false)
                }}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
