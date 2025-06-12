import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import BookCard2 from "../components/Librarian/BookCard2";
import { ContainerTextFlip } from "../../Lectures/components/ui/container-text-flip";
import SuccessModal from "../components/SuccessModal";
import PayFineModal from "../components/PayFineModal"; // ✅ Import PayFineModal

// Mock data
const mockBooks = [
  {
    id: "23456789",
    title: "Harry Potter and the Philosopher's Stone",
    author: "JK Rowling",
    isbn: "978-0-321-14653-0",
    price: "INR 1500",
    issueDate: "2025-10-25",
    dueDate: "2025-11-02",
    daysOverdue: "3",
    fine: "₹ 50",
    returned: false,
    coverImage:
      "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
  },
  {
    id: "23456790",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    isbn: "978-0-547-92822-7",
    price: "INR 2000",
    daysOverdue: "1",
    dueDate: "2025-11-02",
    fine: "₹ 20",
    issueDate: "2025-10-20",
    returned: true,
    coverImage:
      "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
  },
  {
    id: "23456791",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    price: "INR 1200",
    issueDate: "2025-10-15",
    daysOverdue: "0",
    dueDate: "2025-11-02",
    fine: "₹ 0",
    returned: false,
    coverImage:
      "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
  },
];

const ReturnBook: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [search, setSearch] = useState("");
  const [books] = useState(mockBooks);
  const [filter, setFilter] = useState<"toReturn" | "returned" | "all">("all");

  // ✅ PayFine Modal state
  const [showPayFineModal, setShowPayFineModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleReturnBook = () => {
    setShowSuccessModal(true);
  };

  const handlePayFine = (bookId: string) => {
    setSelectedBookId(bookId);
    setShowPayFineModal(true);
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.id.includes(search)
    )
    .filter((book) => {
      if (filter === "toReturn") return !book.returned;
      if (filter === "returned") return book.returned;
      return true;
    });

  return (
    <div className="flex min-h-screen w-full relative">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <SearchBar />
        </div>

        <img
          src="/sparkles.png"
          alt="sparkles"
          className="w-full px-6 mt-[-4rem] md:px-10 py-10"
        />

        <main className="flex-1 w-full absolute max-w-6xl mx-auto px-4 top-20 z-10 space-y-10 py-6">
          <div className="text-center">
            <h1 className="text-3xl mt-10 md:text-5xl font-bold text-gray-900">
              Update Book in the <span className="flex flex-col">Library</span>
            </h1>
            <p className="mt-4 text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
              Modify book details such as title, author, category, quantity, or availability status.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center mb-6 px-2 gap-4">
            <div className="flex items-center w-full md:w-auto border border-gray-300 rounded-lg overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Pending & Returned Books Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-3 text-sm w-full md:w-80 outline-none"
              />
              <button className="bg-black text-white text-sm px-4 py-3">
                Search
              </button>
            </div>

          </div>

          <section className="bg-[#F5F5F7] rounded-lg max-w-5xl ml-20 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                All Books in the Library
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                View and edit all books in the Library
              </p>

              <div className="flex justify-between items-center">
                <div className="flex gap-2  bg-black rounded p-1">
                  <button
                    className={`text-sm px-20 py-2 rounded ${filter === "toReturn" ? "bg-[#702DFF] text-white" : "bg-black text-white"}`}
                    onClick={() => setFilter("toReturn")}
                  >
                    All Books
                  </button>
                
                </div>
                <div className="flex flex-wrap  justify-end items-center gap-4">
                  <div className="flex items-center bg-black text-white rounded-lg overflow-hidden">
                    <div className="px-2 py-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-transparent text-white placeholder-gray-400 px-2 py-2 text-sm outline-none w-48"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="bg-black text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                      <span>Overdue</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
             
              </div>

            </div>
             

            {/* Book Cards */}
            <div className="space-y-4">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <BookCard2
   key={book.id}
                    title={book.title}
                    author={book.author}
                    id={book.id}
                    isbn={book.isbn}
                    price={book.price}
                    issueDate={book.issueDate}
                    
  coverImage={book.coverImage}
  showEditButton={true}
  hideActionButtons={true} 
/>

                ))
              ) : (
                <p>No books found matching your search.</p>
              )}

           
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ReturnBook;
