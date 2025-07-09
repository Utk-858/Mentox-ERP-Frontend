import React, { useState } from "react";
import PopupModal from "../components/PopupModal"; // Adjust the path if needed

type DesignationItem = {
  name: string;
  description: string;
  category: "Teaching" | "Non-Teaching";
};

const DesignationTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [designations, setDesignations] = useState<DesignationItem[]>([
    { name: "Principal", description: "School Principal", category: "Non-Teaching" },
    { name: "PGT", description: "Post Graduate Teacher", category: "Teaching" },
    { name: "TGT", description: "Trained Graduate Teacher", category: "Teaching" },
    { name: "Accountant", description: "Handles budgeting and Expenses", category: "Non-Teaching" },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newDesig, setNewDesig] = useState<Partial<DesignationItem>>({
    name: "",
    description: "",
    category: "Teaching",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<DesignationItem | null>(null);

  const handleAddDesignation = () => {
    if (!newDesig.name || !newDesig.description || !newDesig.category) return;
    setDesignations((prev) => [...prev, newDesig as DesignationItem]);
    setNewDesig({ name: "", description: "", category: "Teaching" });
    setIsPopupOpen(false);
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setEditedItem({ ...designations[idx] });
  };

  const handleSave = (idx: number) => {
    if (!editedItem) return;
    const updated = [...designations];
    updated[idx] = editedItem;
    setDesignations(updated);
    setEditIndex(null);
    setEditedItem(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedItem(null);
  };

  const handleDelete = (idx: number) => {
    setDesignations(designations.filter((_, i) => i !== idx));
  };

  const filteredDesignations = designations.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-[#F5F5F7] rounded-lg shadow mr-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[1.5rem] font-[600]">Designations</h2>
          <p className="text-[0.9rem] font-[400] text-[#363636]">Add Designations</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search designations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-2 rounded-md border w-[280px] bg-black text-white text-sm"
          />
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-[#702DFF] text-white px-8 py-2 rounded-md hover:bg-purple-700 text-[1rem] font-[600]"
          >
            Create Designation
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[327px] overflow-y-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-100 text-[#616188] text-[1rem] font-[600] sticky top-0 z-10">
              <tr>
                <th className="p-2">Designation Name</th>
                <th className="p-2">Description</th>
                <th className="p-2">Category</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDesignations.map((item, idx) => {
                const isEditing = editIndex === idx;
                return (
                  <tr key={idx} className="bg-white text-[0.9rem] font-[400]">
                    <td className="p-2 rounded-l-lg">
                      {isEditing && editedItem ? (
                        <input
                          value={editedItem.name}
                          onChange={(e) =>
                            setEditedItem({ ...editedItem, name: e.target.value })
                          }
                          className="border px-2 py-1 w-full rounded"
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className="p-2">
                      {isEditing && editedItem ? (
                        <input
                          value={editedItem.description}
                          onChange={(e) =>
                            setEditedItem({ ...editedItem, description: e.target.value })
                          }
                          className="border px-2 py-1 w-full rounded"
                        />
                      ) : (
                        item.description
                      )}
                    </td>
                    <td className="p-2">
                      {isEditing && editedItem ? (
                        <select
                          value={editedItem.category}
                          onChange={(e) =>
                            setEditedItem({
                              ...editedItem,
                              category: e.target.value as "Teaching" | "Non-Teaching",
                            })
                          }
                          className="border px-2 py-1 w-full rounded"
                        >
                          <option value="Teaching">Teaching</option>
                          <option value="Non-Teaching">Non-Teaching</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                            item.category === "Teaching" ? "bg-green-500" : "bg-gray-500"
                          }`}
                        >
                          {item.category}
                        </span>
                      )}
                    </td>
                    <td className="p-2 space-x-2 rounded-r-lg">
                      {isEditing ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() => handleSave(idx)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-300 px-3 py-1 rounded"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-[#FFE493] px-3 py-1 rounded"
                            onClick={() => handleEdit(idx)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-[#FFE3E3] px-3 py-1 rounded"
                            onClick={() => handleDelete(idx)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create Designation */}
      <PopupModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Add Designation"
        subtitle="Add designation and its information"
        onAdd={handleAddDesignation}
        fields={[
          {
            label: "Designation Name",
            name: "name",
            type: "input",
            placeholder: "e.g., Principal, PGT, TGT",
            value: newDesig.name || "",
            onChange: (value) => setNewDesig({ ...newDesig, name: value }),
            required: true,
          },
          {
            label: "Category",
            name: "category",
            type: "select",
            placeholder: "Select category",
            value: newDesig.category || "Teaching",
            options: ["Teaching", "Non-Teaching"],
            onChange: (value) =>
              setNewDesig({
                ...newDesig,
                category: value as "Teaching" | "Non-Teaching",
              }),
            required: true,
          },
          {
            label: "Description",
            name: "description",
            type: "textarea",
            placeholder: "Brief description",
            value: newDesig.description || "",
            onChange: (value) =>
              setNewDesig({ ...newDesig, description: value }),
            required: true,
          },
        ]}
      />
    </div>
  );
};

export default DesignationTable;
