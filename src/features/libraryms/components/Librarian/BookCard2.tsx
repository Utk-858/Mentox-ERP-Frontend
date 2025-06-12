import React from 'react';

interface BookCardProps {
  title?: string;
  author?: string;
  id?: string;
  isbn?: string;
  price?: string;
  issueDate?: string;
  dueDate?: string;
  daysOverdue?: string;
  fine?: string;
  coverImage?: string;
  onReportMissing?: () => void;
  onPayFine?: () => void;
  onReturnBook?: () => void;
  showEditButton?: boolean;
  hideActionButtons?: boolean;
}

const BookCard2: React.FC<BookCardProps> = ({
  title = "Title",
  author = "Author",
  id = "12345678",
  isbn = "978-0-321-14653-0",
  price = "INR 1500",
  issueDate = "25/10/2025",
  dueDate = "2/11/2025",
  daysOverdue = "",
  fine = "",
  coverImage = "/api/placeholder/80/120",
  onReportMissing,
  onPayFine,
  onReturnBook,
  showEditButton = false,
  hideActionButtons = false
}) => {
  const isOverdue = daysOverdue && parseInt(daysOverdue) > 0;
  const hasFine = fine && parseFloat(fine.replace('₹ ', '')) > 0;

  return (
    <div className="bg-white rounded-lg  border border-gray-200 p-4 flex gap-4 w-full max-w-screen">
      {/* Book Cover */}
      <div className="flex-">
        <img
          src={coverImage}
          alt={title}
          className="w-20 h-28 object-cover rounded-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgODAgMTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCA0OEg1NlY1Mkg0NlY3Mkg1NlY3Nkg1NlY0OFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+Cg==';
          }}
        />
      </div>

      {/* Book Details */}
      <div className="flex-1 space-y-2 text-base">
        <div className="flex flex-wrap gap-x-20">
          <div>
            <span className="font-semibold text-black">Title: </span>
            <span className="text-gray-900">{title}</span>
          </div>
          <div>
            <span className="font-semibold text-black">Author: </span>
            <span className="text-gray-900">{author}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-20">
          <div>
            <span className="font-semibold text-black">ID: </span>
            <span className="text-gray-900">{id}</span>
          </div>
          <div>
            <span className="font-semibold text-black">ISBN: </span>
            <span className="text-gray-900">{isbn}</span>
          </div>
          <div>
            <span className="font-semibold text-black">Price: </span>
            <span className="text-gray-900">{price}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-20">
          <div>
            <span className="font-semibold text-black">Issue date: </span>
            <span className="text-gray-900">{issueDate}</span>
          </div>
          <div>
            <span className="font-semibold text-black">Due Date: </span>
            <span className="text-gray-900">{dueDate}</span>
          </div>
          <div>
            <span className="font-semibold text-black">Days Overdue: </span>
            <span className={`font-semibold ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
              {daysOverdue || '0'} Days
            </span>
          </div>
        </div>

        {hasFine && (
          <div>
            <span className="font-semibold text-black">Fine(calculated): </span>
            <span className="text-gray-900">{fine}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col justify-center items-start gap-2">
        {!hideActionButtons && (
          <>
            <button
              onClick={onReportMissing}
              className="bg-transparent text-[#702DFF] text-base font-medium px-4 py-2 rounded-sm whitespace-nowrap"
            >
              Report Missing
            </button>

            {hasFine ? (
              <button
                onClick={onPayFine}
                className="bg-[#702DFF] text-white text-base font-medium px-4 py-2 h-10 ml-10 rounded-sm hover:bg-[#5A23CC] transition-colors whitespace-nowrap"
              >
                Pay Fine
              </button>
            ) : (
              <button
                onClick={onReturnBook}
                className="bg-[#702DFF] ml-5 text-white text-base font-medium px-4 py-2 h-10 rounded-sm transition-colors whitespace-nowrap"
              >
                Return Book
              </button>
            )}
          </>
        )}

        {showEditButton && (
          <button
            onClick={() =>
              window.location.href = `/library/librarian/edit-details/isbn=${encodeURIComponent(isbn)}`
            }
            className="bg-[#702DFF] text-white text-base font-medium px-4 py-2 h-10 rounded-sm hover:bg-[#5A23CC] transition-colors whitespace-nowrap"
          >
            Edit Book Details
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard2;
