import React, { useState } from "react";
import PopupModal from "../components/PopupModal";

type DepartmentItem = {
  name: string;
  description: string;
  createdOn: string;
};

const DepartmentTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departments, setDepartments] = useState<DepartmentItem[]>([
    {
      name: "Academics",
      description: "Manages curriculum, teaching, and student performance.",
      createdOn: "01-June-2024",
    },
    {
      name: "Administration",
      description: "Oversees daily operations and institutional coordination.",
      createdOn: "01-June-2024",
    },
    {
      name: "Librarian",
      description: "Provides access to books, resources, and research support.",
      createdOn: "01-June-2024",
    },
    {
      name: "Finance",
      description: "Handles budgeting, expenses, and financial planning.",
      createdOn: "01-June-2024",
    },
    {
      name: "HR",
      description: "Manages hiring, payroll, and employee wellbeing.",
      createdOn: "01-June-2024",
    },
    {
      name: "IT",
      description: "Handles infrastructure, networking, and support.",
      createdOn: "01-June-2024",
    },
  ]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<DepartmentItem | null>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptDesc, setNewDeptDesc] = useState("");

  const handleAdd = () => {
    if (!newDeptName || !newDeptDesc) return;
    const newDept: DepartmentItem = {
      name: newDeptName,
      description: newDeptDesc,
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
    setDepartments([...departments, newDept]);
    setNewDeptName("");
    setNewDeptDesc("");
    setIsPopupOpen(false);
  };

  const handleDelete = (index: number) => {
    const updated = departments.filter((_, i) => i !== index);
    setDepartments(updated);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedItem(departments[index]);
  };

  const handleSaveEdit = (index: number) => {
    if (!editedItem) return;
    const updated = [...departments];
    updated[index] = editedItem;
    setDepartments(updated);
    setEditIndex(null);
    setEditedItem(null);
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-[#F5F5F7] rounded-lg mr-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-[1.5rem] font-[600]">Departments</h2>
          <p className="text-[0.9rem] font-[400] text-[#363636]">
            Add Departments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-2 rounded-md border w-[280px] bg-black text-white text-sm"
          />
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-[#702DFF] text-white px-8 py-2 rounded-md hover:bg-purple-700 text-[1rem] font-[600]"
          >
            Create Department
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[327px] overflow-y-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-100 text-[#616188] text-[1rem] font-[600] sticky top-0 z-10">
              <tr>
                <th className="p-2">Departments Name</th>
                <th className="p-2">Description</th>
                <th className="p-2">Created On</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((item, idx) => {
                const isEditing = editIndex === idx;
                return (
                  <tr key={idx} className="bg-white text-[0.9rem] font-[400]">
                    <td className="p-2 rounded-l-lg">
                      {isEditing && editedItem ? (
                        <input
                          className="w-full border rounded px-2 py-1"
                          value={editedItem.name}
                          onChange={(e) =>
                            setEditedItem({ ...editedItem, name: e.target.value })
                          }
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className="p-2">
                      {isEditing && editedItem ? (
                        <input
                          className="w-full border rounded px-2 py-1"
                          value={editedItem.description}
                          onChange={(e) =>
                            setEditedItem({
                              ...editedItem,
                              description: e.target.value,
                            })
                          }
                        />
                      ) : (
                        item.description
                      )}
                    </td>
                    <td className="p-2">{item.createdOn}</td>
                    <td className="p-2 space-x-2 rounded-r-lg">
                      {isEditing ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() => handleSaveEdit(idx)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-300 px-3 py-1 rounded"
                            onClick={() => {
                              setEditIndex(null);
                              setEditedItem(null);
                            }}
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

      <PopupModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Add Department"
        subtitle="Add Department and it’s description"
        onAdd={handleAdd}
        fields={[
          {
            label: "Department Name",
            placeholder: "eg:, Academics, Administration",
            type: "input",
            required: true,
            name: "name",
            value: newDeptName,
            onChange: setNewDeptName,
          },
          {
            label: "Description",
            placeholder: "Brief description of the department",
            type: "textarea",
            required: true,
            name: "description",
            value: newDeptDesc,
            onChange: setNewDeptDesc,
          },
        ]}
      />
    </div>
  );
};

export default DepartmentTable;