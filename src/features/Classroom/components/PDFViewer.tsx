import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  Download
} from "lucide-react"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"

interface PDFViewerProps {
  fileUrl: string
  fileName: string
}

export default function PDFViewer({ fileUrl, fileName }: PDFViewerProps) {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.2)
  const [rotation, setRotation] = useState(0)

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 3))
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5))
  const handleRotate = () => setRotation((r) => (r + 90) % 360)

  return (
    <div className="bg-white rounded shadow border w-full">
   
      {/* Toolbar */}
      <div className="bg-[#1f1f1f] text-white px-3 py-2 flex items-center justify-between">
        {/* Page Controls */}
        <h2 className="font-semibold text-white">{fileName}</h2>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber <= 1}
            className="p-1 hover:bg-gray-700 rounded"
            title="Previous Page"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
            disabled={pageNumber >= numPages}
            className="p-1 hover:bg-gray-700 rounded"
            title="Next Page"
          >
            <ChevronRight size={20} />
          </button>
          <span className="text-sm ml-2">
            Page {pageNumber} of {numPages}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2 items-center">
          <button onClick={handleZoomOut} className="p-1 hover:bg-gray-700 rounded" title="Zoom Out">
            <Minus size={18} />
          </button>
          <button onClick={handleZoomIn} className="p-1 hover:bg-gray-700 rounded" title="Zoom In">
            <Plus size={18} />
          </button>
          <button onClick={handleRotate} className="p-1 hover:bg-gray-700 rounded" title="Rotate">
            <RotateCcw size={18} />
          </button>
          <a href={fileUrl} download className="p-1 hover:bg-gray-700 rounded" title="Download">
            <Download size={18} />
          </a>
        </div>
      </div>

      {/* PDF Content */}
      <div className="overflow-auto flex justify-center items-center bg-[#2a2a2a] py-4 min-h-[500px]">
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p className="p-4 text-white">Loading PDF...</p>}
          error={<p className="p-4 text-red-500">Failed to load PDF</p>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            rotate={rotation}
            renderAnnotationLayer={false}
            renderTextLayer={true}
          />
        </Document>
      </div>
    </div>
  )
}
