import React from 'react';
import { Trash2, Edit, UserX } from 'lucide-react';
import { type Beneficiary } from '../types/scholarship';

interface BeneficiaryTableProps {
  beneficiaries: Beneficiary[];
  onDelete: (beneficiaryId: string) => void;
}

const BeneficiaryTable: React.FC<BeneficiaryTableProps> = ({ beneficiaries, onDelete }) => {
  // If there are no beneficiaries, display a helpful message instead of an empty table.
  if (beneficiaries.length === 0) {
    return (
      <div className="text-center bg-gray-50 p-8 rounded-lg">
        <UserX className="mx-auto text-gray-400" size={40} />
        <h4 className="mt-4 text-lg font-semibold text-gray-700">No Beneficiaries Found</h4>
        <p className="mt-1 text-sm text-gray-500">Add a student to this program to see them listed here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg">
      <table className="w-full text-left text-sm">
        <thead className="text-gray-600">
          <tr>
            <th className="p-3 font-semibold">Admission No.</th>
            <th className="p-3 font-semibold">Student Name</th>
            <th className="p-3 font-semibold">Class</th>
            <th className="p-3 font-semibold">Section</th>
            <th className="p-3 font-semibold">Date Added</th>
            <th className="p-3 font-semibold text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((student) => (
            <tr key={student.id} className="border-t border-gray-200">
              <td className="p-3">{student.admissionNo}</td>
              <td className="p-3">{student.studentName}</td>
              <td className="p-3">{student.class}</td>
              <td className="p-3">{student.section}</td>
              <td className="p-3">{student.dateAdded}</td>
              <td className="p-3">
                <div className="flex items-center justify-center gap-4">
                    <button className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                    <button onClick={() => onDelete(student.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BeneficiaryTable;