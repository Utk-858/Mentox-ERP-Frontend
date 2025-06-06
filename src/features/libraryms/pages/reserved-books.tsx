import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/search-bar";
import CategoryHeader from "../components/CategoryHeader";
import BookCard from "../components/BookCard";
import {FaArrowRight} from "react-icons/fa";

// Define the Book type
interface Book {
  id: string;
  title: string;
  bookId: string;
  author: string;
  issueDate?: string;
  dueDate?: string;
  reservationDate?: string;
  expiryOfReservation?: string;
  fine?: string;
  coverImage: string;
  showButtons?: boolean;
  cardType?: "issued" | "reserved";
}

// Fallback mock data
const fallbackBooks: Book[] = [
  {
      id: "12345678",
      title: "Sample Book One",
      author: "Author A",
      issueDate: "01.06.25",
      dueDate: "15.06.25",
      reservationDate: "02.06.25",
      expiryOfReservation: "16.06.25",
      coverImage: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      bookId: ""
  },
  {
      id: "87654321",
      title: "Sample Book Two",
      author: "Author B",
      issueDate: "02.06.25",
      dueDate: "16.06.25",
      reservationDate: "02.06.25",
      expiryOfReservation: "16.06.25",
      coverImage: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      bookId: ""
  },
  {
      id: "87654321",
      title: "Sample Book Two",
      author: "Author B",
      issueDate: "02.06.25",
      dueDate: "16.06.25",
      reservationDate: "02.06.25",
      expiryOfReservation: "16.06.25",
      coverImage: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      bookId: ""
  }
];

const ReservedBooks: React.FC = () => {
  const [issuedBooks, setIssuedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await fetch("/library/student/reservedbook");  
        if (!response.ok) {
          throw new Error("Failed to fetch issued books");
        }
        const data: Book[] = await response.json();

        // If API doesnt work, use fallback -->
        if (data.length === 0) {
          console.warn("API returned no books, using fallback data");
          setIssuedBooks(fallbackBooks);
          setIsUsingFallback(true);
        } else {
          setIssuedBooks(data);
          setIsUsingFallback(false);
        }
      } catch (error: any) {
        console.error("Error fetching issued books:", error);
        setError(error.message);
        // fallback
        setIssuedBooks(fallbackBooks);
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIssuedBooks();
  }, []);

  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <SearchBar />
          <CategoryHeader />
          <div className="ml-10 mr-10 mt-10 flex justify-between">
            <h1 className="font-semibold text-2xl text-gray-700">Reserved Books</h1>
            <h1 className="text-sm font-semibold mt-2">
            <span className="text-gray-500 ">Library →</span> Reserved Books
            </h1>
          </div>
          <div className="ml-10 mr-10 mt-3">
            {loading && <p>Loading issued books...</p>}
            {error && !isUsingFallback && (
              <p className="text-red-500">
                {error} 
              </p>
            )}
            {issuedBooks.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                bookId={book.id}
                author={book.author}
                issueDate={book.issueDate}
                dueDate={book.dueDate}
                fine={book.fine}
                coverImage={book.coverImage}
                showButtons={true}
                reservationDate={book.reservationDate}
                expiryOfReservation={book.expiryOfReservation}
                cardType="reserved"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservedBooks;
