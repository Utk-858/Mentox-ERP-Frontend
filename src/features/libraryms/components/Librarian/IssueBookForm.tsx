import React, { useState } from 'react';
import { Search } from 'lucide-react';

type UserSearchField = {
  key: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
};

type UserField = {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
};

type IssueBookFormProps = {
  userType: string;
  studentClass: string;
  setStudentClass: (value: string) => void;
  userDetails: Record<string, string>;
  setUserDetails: (value: Record<string, string>) => void;
  bookSearch: BookSearch;
  setBookSearch: (value: BookSearch) => void;
  bookDetails: Record<string, string>;
  setBookDetails: (value: Record<string, string>) => void;
  issueDetails: Record<string, string>;
  setIssueDetails: (value: Record<string, string>) => void;
  onSearchUser: () => void;
  onSearchBook: () => void;
  onReset: () => void;
  onIssueBook: () => void;
  userFields: UserField[];
  userSearchFields: UserSearchField[];
};

type BookSearch = {
  bookId: string;
  bookName: string;
};

const IssueBookForm: React.FC<IssueBookFormProps> = ({
  userType,
  studentClass,
  setStudentClass,
  userDetails,
  setUserDetails,
  bookSearch,
  setBookSearch,
  bookDetails,
  setBookDetails,
  issueDetails,
  setIssueDetails,
  onSearchUser,
  onSearchBook,
  onReset,
  onIssueBook,
  userFields,
  userSearchFields
}) => {
  // 🩺 Add selectedClass state and handler
  const [selectedClass, setSelectedClassState] = useState(studentClass || '');

  const handleClassClick = (num: number) => {
    const selected = selectedClass === num.toString() ? '' : num.toString();
    setSelectedClassState(selected);
    setStudentClass(selected);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Issue Book - {userType}</h1>
        <div className="text-sm text-gray-600">
          <span className="text-[#702DFF]">Library</span> / Issue Book - {userType.toLowerCase()}
        </div>
      </div>

      {/* Conditionally Render Student Class & Section */}
      {userType === 'Student' && (
        <>
          {/* Class */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Student's Class:</label>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handleClassClick(num)}
                  className={`w-10 h-10 text-sm  bg-[#D2D2D233] border border-[#606060]rounded 
                    ${selectedClass === num.toString() 
                      ? 'bg-[#702DFF] text-white border-[#702DFF]' 
                      : 'border-gray-300 hover:bg-gray-100'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Section */}
          <div className="mb-4">
            <label htmlFor="student-section-select" className="block text-sm font-medium mb-1">Student's Section:</label>
            <select
              id="student-section-select"
              value={userDetails.studentSection}
              onChange={(e) =>
                setUserDetails({ ...userDetails, studentSection: e.target.value })
              }
              className="w-full p-2 bg-[#D2D2D233] border border-[#606060] rounded"
            >
              <option value="">Select Section</option>
              {['A', 'B', 'C', 'D'].map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {/* Rest of the code remains unchanged */}
      {/* Search User */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Search {userType}</h2>
        {userSearchFields && (
          <div className="flex flex-wrap gap-4">
            {userSearchFields.map((field) => (
              <div key={field.key} className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium mb-1">{field.label}:</label>
                <div className="relative">
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full p-2 bg-[#D2D2D233] border border-[#606060] pr-8 rounded"
                  />
                  {field.searchable && (
                    <Search
                      className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
                      onClick={onSearchUser}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{userType} Details</h2>
        <div className="flex flex-wrap gap-4">
          {userFields.map((field) => (
            <div key={field.key} className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">{field.label}:</label>
              {field.type === 'dropdown' ? (
                <select
                  value={userDetails[field.key]}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, [field.key]: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  aria-label={field.label}
                >
                  <option value="">Select {field.label}</option>
                  {field.options &&
                    field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={userDetails[field.key]}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, [field.key]: e.target.value })
                  }
                  placeholder={field.placeholder}
                  className="w-full bg-[#D2D2D233] border border-[#606060] p-2  rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Book Search */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Book Search</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Book ID:</label>
            <div className="relative">
              <input
                type="text"
                value={bookSearch.bookId}
                onChange={(e) =>
                  setBookSearch({ ...bookSearch, bookId: e.target.value })
                }
                placeholder="Search book by ID"
                className="w-full p-2 pr-8 bg-[#D2D2D233] border border-[#606060] rounded"
              />
              <Search
                className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
                onClick={onSearchBook}
              />
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">Book Name:</label>
            <div className="relative">
              <input
                type="text"
                value={bookSearch.bookName}
                onChange={(e) =>
                  setBookSearch({ ...bookSearch, bookName: e.target.value })
                }
                placeholder="Search book by Name"
                className="w-full p-2 pr-8 bg-[#D2D2D233] border border-[#606060] rounded"
              />
              <Search
                className="absolute  right-2 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
                onClick={onSearchBook}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Book Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Book Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(bookDetails).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}:
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  setBookDetails({ ...bookDetails, [key]: e.target.value })
                }
                placeholder={key}
                className="w-full p-2 bg-[#D2D2D233] border border-[#606060] rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Issue Details */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Issue Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(issueDetails).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}:
              </label>
              <input
                type="date"
                value={value}
                onChange={(e) =>
                  setIssueDetails({ ...issueDetails, [key]: e.target.value })
                }
                className="w-50 lg:w-80 p-2 bg-[#D2D2D233] border border-[#606060] rounded"
                placeholder={`Select ${key.replace(/([A-Z])/g, ' $1')}`}
                title={`Select ${key.replace(/([A-Z])/g, ' $1')}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between flex-col sm:flex-row gap-4">
        <button
          onClick={onIssueBook}
          className="bg-[#702DFF] text-white px-20 py-2 xl:py-3 rounded-md w-full sm:w-auto"
          type="button"
        >
          Issue Book
        </button>
        <button
          onClick={onReset}
          className="bg-[#702DFF] text-white px-20 py-2 xl:py-3 rounded-md w-full sm:w-auto"
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default IssueBookForm;
