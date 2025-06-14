import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

interface LeaveCategory {
  id: number;
  name: string;
  allowedDays: string; // Could be a number or string ("Unlimited", etc.)
}

const initialCategories: LeaveCategory[] = [
  { id: 1, name: "Casual", allowedDays: "10" },
  { id: 2, name: "Medical", allowedDays: "8" },
  { id: 3, name: "Earned", allowedDays: "15" },
  { id: 4, name: "Half Day", allowedDays: "Unlimited" },
  { id: 5, name: "Maternity/Paternity", allowedDays: "60" },
  { id: 6, name: "Special", allowedDays: "Conditional" },
  { id: 7, name: "Leave without Pay", allowedDays: "N/A" },
];

const LeaveCategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<LeaveCategory[]>(initialCategories);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<LeaveCategory>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    const categoryToEdit = categories.find((cat) => cat.id === id);
    setNewCategory({ ...categoryToEdit });
  };

  const handleSave = () => {
    if (editingId !== null && newCategory.name && newCategory.allowedDays !== undefined) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId ? { ...cat, ...newCategory } as LeaveCategory : cat
        )
      );
      setEditingId(null);
      setNewCategory({});
    }
  };

  const handleAdd = () => {
    if (newCategory.name && newCategory.allowedDays !== undefined) {
      const newId = Math.max(...categories.map((c) => c.id)) + 1;
      setCategories([
        ...categories,
        { id: newId, name: newCategory.name, allowedDays: newCategory.allowedDays } as LeaveCategory,
      ]);
      setNewCategory({});
      setIsAdding(false);
    }
  };

  return (
    <div className="p-6 bg-[#F5F5F7] rounded-xl min-w-[37rem] max-w-[40rem]">
      <h2 className="text-[1.5rem] font-[600] text-black">Configure Leave Categories</h2>
      <p className="text-[0.9rem] text-[#363636] font-[400] mb-4">
        View your all previous leave categories
      </p>

      <div className="w-full">
        <div className="grid grid-cols-3 font-semibold text-[#616188] border-b text-center border-[#E7E8EE] py-2">
          <div>Leave Category</div>
          <div>Allowed Days</div>
          <div>Actions</div>
        </div>

        {categories.map((cat) => (
          <div
            key={cat.id}
            className="grid grid-cols-3 items-center gap-5 text-center rounded-[0.5rem] bg-white border-gray-200 p-2 mb-3"
          >
            {editingId === cat.id ? (
              <>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="px-2 py-1 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={newCategory.allowedDays}
                  onChange={(e) => setNewCategory({ ...newCategory, allowedDays: e.target.value })}
                  className="px-2 py-1 rounded border border-gray-300"
                />
                <button
                  onClick={handleSave}
                  className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <div>{cat.name}</div>
                <div>{cat.allowedDays}</div>
                <div className="flex gap-4 text-xl text-center items-center ml-8">
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500">
                    <RiDeleteBin5Line/>
                  </button>
                  <button onClick={() => handleEdit(cat.id)} className="text-black">
                    <FaEdit />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add Category Input Toggle */}
      {isAdding ? (
        <div className="mt-6 flex items-center gap-4">
          <input
            type="text"
            placeholder="Category"
            value={newCategory.name || ""}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md w-1/3"
          />
          <input
            type="text"
            placeholder="Allowed Days"
            value={newCategory.allowedDays || ""}
            onChange={(e) => setNewCategory({ ...newCategory, allowedDays: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md w-1/3"
          />
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white px-4 py-2 rounded-md font-medium"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewCategory({});
            }}
            className="text-gray-500 px-4 py-2 rounded-md border border-gray-300"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-6 bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white px-4 py-2 rounded-md font-medium"
        >
          + Add Category
        </button>
      )}
    </div>
  );
};

export default LeaveCategoryManager;
