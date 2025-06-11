import React, { useState, useEffect } from 'react';
import type Book from "../../types"; // Adjust the import path as necessary


const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data fallback with more entries for scrolling
  const mockBooks: Book[] = [
    { id: '#B-10021-30', title: 'Ancestor Trouble', author: 'Maud Newton', available: 30 },
    { id: '#B-32521-31', title: 'Life Is Everywhere', author: 'Lucy Ives', available: 23 },
    { id: '#G-95501-31', title: 'Stroller', author: 'Amanda Parrish', available: 90 },
    { id: '#R-773521-67', title: 'The Secret Syllabus', author: 'Terence C.Burnham', available: 6 },
    { id: '#B-44521-42', title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', available: 15 },
    { id: '#F-55621-53', title: 'Educated', author: 'Tara Westover', available: 42 },
    { id: '#H-66721-64', title: 'Becoming', author: 'Michelle Obama', available: 38 },
    { id: '#M-77821-75', title: 'The Midnight Library', author: 'Matt Haig', available: 27 },
    { id: '#P-88921-86', title: 'Project Hail Mary', author: 'Andy Weir', available: 19 },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          throw new Error('Books API failed');
        }
      } catch (error) {
        console.log('Using mock books data:', error);
        setBooks(mockBooks);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleAction = (bookId: string) => {
    console.log(`Action clicked for book: ${bookId}`);
    // Add your action logic here
  };

  if (loading) {
    return (
      <div className="w-max-xs w-full bg-gray-100 rounded-lg shadow-md border border-gray-200">
        <div className="px-2 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Books List</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-md border border-gray-200">
      <div className="px-2 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Books List</h2>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-90 overflow-y-auto">
          <table className="w-max-sm w-full bg-gray-100">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-1 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Book ID
                </th>
                <th className="px-1 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-1 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-1 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Available
                </th>
                <th className="px-1 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-200">
                  <td className="px-1 py-3 whitespace-nowrap text-sm text-gray-700">
                    {book.id}
                  </td>
                  <td className="px-1 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {book.title}
                  </td>
                  <td className="px-1 py-3 whitespace-nowrap text-sm text-gray-700">
                    {book.author}
                  </td>
                  <td className="px-1 py-3 whitespace-nowrap text-sm text-gray-700">
                    {book.available}
                  </td>
                  <td className="px-1 py-3 whitespace-nowrap">
                    <button
                      onClick={() => handleAction(book.id)}
                      className="text-sm text-gray-800 cursor-pointer font-medium"
                    >
                      Action
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

export default BooksList;
