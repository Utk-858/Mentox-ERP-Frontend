import React, { useState } from 'react';

interface BookRecord {
  userId: string;
  userName: string;
  bookId: string;
  title: string;
  author: string;
  overdue: string;
  status: string;
  fine: string;
}

export default function OverdueBooksListComponent() {
  const bookRecords: BookRecord[] = [
    {
      userId: "10021",
      userName: "Alex Ray",
      bookId: "#B-10021-30",
      title: "Ancestor Trouble",
      author: "Maud Newton",
      overdue: "3 days",
      status: "Returned (late)",
      fine: "BDT 150",
    },
    {
      userId: "10022",
      userName: "John Doe",
      bookId: "#B-10022-31",
      title: "Library Wars",
      author: "Hiro Arikawa",
      overdue: "5 days",
      status: "Returned (late)",
      fine: "BDT 200",
    },
    {
      userId: "10023",
      userName: "Jane Smith",
      bookId: "#B-10023-32",
      title: "Code Complete",
      author: "Steve McConnell",
      overdue: "1 day",
      status: "Returned (late)",
      fine: "BDT 100",
    },
    {
      userId: "10024",
      userName: "Michael Johnson",
      bookId: "#B-10024-33",
      title: "Clean Code",
      author: "Robert C. Martin",
      overdue: "7 days",
      status: "Returned (late)",
      fine: "BDT 350",
    },
    {
      userId: "10025",
      userName: "Emily Brown",
      bookId: "#B-10025-34",
      title: "Refactoring",
      author: "Martin Fowler",
      overdue: "2 days",
      status: "Returned (late)",
      fine: "BDT 120",
    },
    {
      userId: "10026",
      userName: "Chris Wilson",
      bookId: "#B-10026-35",
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      overdue: "4 days",
      status: "Returned (late)",
      fine: "BDT 180",
    },
    {
      userId: "10027",
      userName: "Laura Clark",
      bookId: "#B-10027-36",
      title: "The Mythical Man-Month",
      author: "Fred Brooks",
      overdue: "6 days",
      status: "Returned (late)",
      fine: "BDT 220",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(bookRecords.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = bookRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-gray-100 w-full rounded-xl p-4">
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">Overdue Books List</h1>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4 font-medium text-gray-700">User ID</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">User Name</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Book ID</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Title</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Author</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Overdue</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-2 px-4 font-medium text-gray-700">Fine</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((record, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-600">{record.userId}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {record.userName.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-900">{record.userName}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-gray-600">{record.bookId}</td>
                  <td className="py-2 px-4 text-gray-900">{record.title}</td>
                  <td className="py-2 px-4 text-gray-600">{record.author}</td>
                  <td className="py-2 px-4 text-gray-600">{record.overdue}</td>
                  <td className="py-2 px-4">
                    <span className="text-green-600">{record.status}</span>
                  </td>
                  <td className="py-2 px-4">
                    <span className="text-red-600 font-medium">{record.fine}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`p-2 ${currentPage === 1 ? 'text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
            title="Previous Page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
                currentPage === i + 1
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`p-2 ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
            title="Next Page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
