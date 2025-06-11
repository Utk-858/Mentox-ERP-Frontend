import React, { useState, useEffect } from "react";
import type { Book } from "../../types";

interface IssuedBook extends Book {
  userId: string;
  bookId: string;
  issueDate: string;
  returnDate: string;
}

const BooksIssued: React.FC = () => {
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data fallback
  const mockIssuedBooks: IssuedBook[] = [
    {
      userId: "10021",
      bookId: "#B-10021-30",
      title: "Ancestor Trouble",
      author: "Maud Newton",
      issueDate: "20 Dec,2022",
      returnDate: "21 Dec,2022",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      ISBN: "978-1234567890"
    },
    {
      userId: "31234",
      bookId: "#S-99021-97",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      issueDate: "03 Mar,2023",
      returnDate: "13 Mar,2023",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      ISBN: "978-2345678901"
    },
    {
      userId: "35678",
      bookId: "#T-10121-08",
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      issueDate: "10 Mar,2023",
      returnDate: "20 Mar,2023",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      ISBN: "978-3456789012"
    },
     {
      userId: "10021",
      bookId: "#B-10021-30",
      title: "Ancestor Trouble",
      author: "Maud Newton",
      issueDate: "20 Dec,2022",
      returnDate: "21 Dec,2022",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      ISBN: "978-1234567890"
    },
    {
      userId: "31234",
      bookId: "#S-99021-97",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      issueDate: "03 Mar,2023",
      returnDate: "13 Mar,2023",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      ISBN: "978-2345678901"
    },
    {
      userId: "35678",
      bookId: "#T-10121-08",
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      issueDate: "10 Mar,2023",
      returnDate: "20 Mar,2023",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      ISBN: "978-3456789012"
    },
     {
      userId: "10021",
      bookId: "#B-10021-30",
      title: "Ancestor Trouble",
      author: "Maud Newton",
      issueDate: "20 Dec,2022",
      returnDate: "21 Dec,2022",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      ISBN: "978-1234567890"
    },
    {
      userId: "31234",
      bookId: "#S-99021-97",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      issueDate: "03 Mar,2023",
      returnDate: "13 Mar,2023",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      ISBN: "978-2345678901"
    },
    {
      userId: "35678",
      bookId: "#T-10121-08",
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      issueDate: "10 Mar,2023",
      returnDate: "20 Mar,2023",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      ISBN: "978-3456789012"
    },
  ];

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/issued-books");
        if (response.ok) {
          const data = await response.json();
          setIssuedBooks(data);
        } else {
          throw new Error("Issued books API failed");
        }
      } catch (error) {
        console.log("Using mock issued books data:", error);
        setIssuedBooks(mockIssuedBooks);
      } finally {
        setLoading(false);
      }
    };

    fetchIssuedBooks();
  }, []);

  const handleViewDetails = (userId: string, bookId: string) => {
    console.log(`View details clicked for user: ${userId}, book: ${bookId}`);
    // Add your view details logic here
  };

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-lg shadow-md border border-gray-200">
        <div className="px-1 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Books Issued
          </h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-md border border-gray-200">
      <div className="px-1 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Books Issued</h2>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-90 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Date
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return Date
                </th>
                <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-200">
              {issuedBooks.map((issuedBook, index) => (
                <tr
                  key={`${issuedBook.userId}-${index}`}
                  className="hover:bg-gray-200"
                >
                  <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                    {issuedBook.userId}
                  </td>
                  <td className="px-1 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          src={issuedBook.coverImage}
                          alt={issuedBook.title}
                          className="h-10 w-10 object-cover rounded"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {issuedBook.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {issuedBook.author}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                    {issuedBook.issueDate}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                    {issuedBook.returnDate}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        handleViewDetails(issuedBook.userId, issuedBook.bookId)
                      }
                      className="text-sm text-red-600 hover:text-red-800 cursor-pointer font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BooksIssued;
