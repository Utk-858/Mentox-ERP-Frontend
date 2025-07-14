import { useState } from "react"

interface House {
  id: string
  name: string
  color: string
}

interface HouseConfigurationModalProps {
  isOpen: boolean
  onClose: () => void
  houses: House[]
  setHouses: (houses: House[]) => void
}

export default function HouseConfigurationModal({
  isOpen,
  onClose,
  houses,
  setHouses,
}: HouseConfigurationModalProps) {
  const [newHouseName, setNewHouseName] = useState("")
  const [newHouseColor, setNewHouseColor] = useState("#f59e0b")
  const [equallyDivide, setEquallyDivide] = useState(true)

  const handleAddHouse = () => {
    if (newHouseName.trim()) {
      const newHouse: House = {
        id: Date.now().toString(),
        name: newHouseName.trim(),
        color: newHouseColor,
      }
      setHouses([...houses, newHouse])
      setNewHouseName("")
      setNewHouseColor("#f59e0b")
    }
  }

  const handleDeleteHouse = (id: string) => {
    setHouses(houses.filter((house) => house.id !== id))
  }

  const handleEditHouse = (id: string) => {
    console.log("Edit house:", id)
    // Implement edit logic if needed
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              House Configuration
            </h2>
            <p className="text-sm text-gray-600">
              Add, edit, or delete school houses.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Table */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4 mb-3 text-sm font-medium text-gray-600">
            <div>House Name</div>
            <div>Color Associated</div>
            <div>Actions</div>
          </div>

          {houses.map((house) => (
            <div
              key={house.id}
              className="grid grid-cols-3 gap-4 items-center py-2 border-b border-gray-100"
            >
              <div className="text-gray-900">{house.name}</div>
              <div className="flex items-center">
                <div
                  className="w-6 h-6 rounded border border-gray-200"
                  style={{ backgroundColor: house.color }}
                ></div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-xs px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200 rounded"
                  onClick={() => handleEditHouse(house.id)}
                >
                  Edit
                </button>
                <button
                  className="text-xs px-3 py-1 bg-red-100 text-red-800 border border-red-200 hover:bg-red-200 rounded"
                  onClick={() => handleDeleteHouse(house.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add new house */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <label className="flex-1">
              <span className="sr-only">House Name</span>
              <input
                type="text"
                placeholder="Enter house name (e.g. Yellow)"
                value={newHouseName}
                onChange={(e) => setNewHouseName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </label>
            <label>
              <span className="sr-only">House Color</span>
              <input
                type="color"
                value={newHouseColor}
                onChange={(e) => setNewHouseColor(e.target.value)}
                className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                title="Choose house color"
              />
            </label>
          </div>
          <button
            onClick={handleAddHouse}
            className={`w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded ${
              !newHouseName.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!newHouseName.trim()}
          >
            Add House
          </button>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Equally Divide students in a class for each House
            </span>
            <input
              type="checkbox"
              checked={equallyDivide}
              onChange={(e) => setEquallyDivide(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  )
}
