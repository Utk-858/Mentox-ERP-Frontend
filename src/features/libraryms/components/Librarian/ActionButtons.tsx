import React from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Undo2,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';

const ActionButtons: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 w-full max-w-md">
      {/* Top Row - Issue Buttons */}
      <div className="flex gap-2">
        <Link to="/library/librarian/issue-book-student" className="flex-1">
          <button className="w-full bg-[#868688] text-white py-5 rounded-md font-medium hover:bg-gray-500 transition">
            + Issue Book - Student
          </button>
        </Link>
        <Link to="/library/librarian/issue-book-employee" className="flex-1">
          <button className="w-full bg-[#868688] text-white py-5 rounded-md font-medium hover:bg-gray-500 transition">
            + Issue Book - Faculty
          </button>
        </Link>
      </div>

      {/* Add Book */}
      <Link to="/library/librarian/add-book" >
      <button className="w-full flex justify-center items-center gap-2 bg-[#868688] text-white py-5 rounded-md font-medium hover:bg-gray-500 transition">
        <Plus className="w-5 h-5" />
        Add Book
      </button>
      </Link>
      

      {/* Return Book */}
      <Link to="/library/librarian/return-book" >
      <button className="w-full flex items-center justify-center gap-2 bg-[#868688] text-white py-5 rounded-md font-medium hover:bg-gray-500 transition">
        <Undo2 className="w-5 h-5" />
        Return Book
      </button>
      </Link>
      

      {/* Update Book Details */}
      <Link to="/library/librarian/update-book" >
      <button className="w-full flex items-center justify-center gap-2 bg-[#868688] text-white py-5 rounded-md font-medium hover:bg-gray-500 transition">
        <RotateCcw className="w-5 h-5" />
        Update Book Details
      </button>
      </Link>
      

      {/* Report Stolen/Missing Book */}
      <button className="flex items-center justify-center gap-2 bg-[#868688] text-white py-5 rounded-md font-medium hover:bg-gray-500 transition">
        <AlertTriangle className="w-5 h-5" />
        Report Stolen/Missing Book
      </button>
    </div>
  );
};

export default ActionButtons;
