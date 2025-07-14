"use client"

import { useState } from "react"
import { Minus, Plus, RotateCcw, Download } from "lucide-react"

interface ImageViewerProps {
  imageUrl: string
  fileName: string
}

export default function ImageViewer({ imageUrl, fileName }: ImageViewerProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.2, 3))
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.2, 0.2))
  const handleRotate = () => setRotation((r) => (r + 90) % 360)

  return (
    <div className="bg-white rounded shadow border w-full">
      {/* Header */}
    

    {/* Header Toolbar */}
<div className="bg-[#1f1f1f] text-white px-4 py-2 flex justify-between items-center border-b border-[#333]">
  <h2 className="font-medium text-sm truncate">{fileName}</h2>

  <div className="flex gap-2">
    <button onClick={handleZoomOut} className="p-1 hover:bg-[#333] rounded" title="Zoom Out">
      <Minus size={18} />
    </button>
    <button onClick={handleZoomIn} className="p-1 hover:bg-[#333] rounded" title="Zoom In">
      <Plus size={18} />
    </button>
    <button onClick={handleRotate} className="p-1 hover:bg-[#333] rounded" title="Rotate">
      <RotateCcw size={18} />
    </button>
    <a
      href={imageUrl}
      download={fileName}
      className="p-1 hover:bg-[#333] rounded"
      title="Download"
    >
      <Download size={18} />
    </a>
  </div>
</div>

      {/* Image Display */}
      <div className="rounded-none overflow-auto flex justify-center items-center bg-[#2a2a2a] py-4 min-h-[500px]">
        <img
          src={imageUrl}
          alt={fileName}
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transition: "transform 0.3s ease"
          }}
          className="max-h-[80vh] max-w-full rounded shadow"
        />
      </div>
    </div>
  )
}
