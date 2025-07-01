import React, { useState } from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";
import BookCard2 from "../components/Librarian/BookCard2";
import { ContainerTextFlip } from "../../Lectures/components/ui/container-text-flip";
import SuccessModal from "../components/SuccessModal";
import PayFineModal from "../components/PayFineModal";

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
    coverImage: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
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
    coverImage: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
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
    coverImage: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
  },
];

const ReturnBook: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [search, setSearch] = useState("");
  const [books] = useState(mockBooks);
  const [filter, setFilter] = useState<"toReturn" | "returned" | "all">("all");
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
    <div className="flex w-full max-w-screen relative p-4 md:p-10">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="relative flex w-full justify-center z-10 text-center mt-2">
          <SearchBar />
        </div>

        {/* Background image + overlaid heading */}
        <div className="relative w-full">
          <img
            src="/sparkles.png"
            alt="sparkles"
            className="w-full px-6 md:px-10 "
          />
          <div className="absolute inset-0 flex flex-col mt-20 xl:mt-[-10rem] items-center justify-center px-4 md:px-10 py-10 z-10">
            <div className="text-center">
              <h1 className="text-3xl mt-10 xl:text-5xl leading-tight font-bold text-gray-900">
                Search Books to Be <span className="flex flex-col">Returned</span>
              </h1>
              <p className="mt-4 text-gray-600 text-sm xl:text-lg max-w-2xl mx-auto">
                Easily search for books that are due for return by students and employees.
                Filter results by name, ID, book title, or return date to manage returns efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Main content below sparkles */}
        <main className="flex-1 w-full xl:px-4 mt-20 xl:mt-[-10rem]  md:px-10 space-y-10">
          <div className="flex flex-wrap justify-center items-center mb-6 px-2 gap-4">
            <div className="flex items-center w-full md:w-auto border border-gray-300 rounded-lg overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Pending & Returned Books Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-1 xl:px-4 xl:py-3 text-sm w-full md:w-80 outline-none"
              />
              <button className="bg-black text-white text-sm px-4 py-3">
                Search
              </button>
            </div>

            <button className="bg-[#702DFF] text-white text-lg px-3 py-1  xl:px-6 xl:py-2 rounded-sm w-55">
              Fines Collected
            </button>
          </div>

          <section className="bg-[#F5F5F7] mt-10 lg:mt-0 xl:mt-30 rounded-lg max-w-screen p-6">
            <div className="mb-6"> 
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                All Books in the Library
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                View and edit all books in the Library
              </p>

              <div className="flex justify-between flex-wrap items-center gap-4">
                <div className="flex gap-2 mb-4 bg-black rounded p-1">
                  <button
                    className={`text-sm px-4 py-2 rounded ${filter === "toReturn" ? "bg-[#702DFF] text-white" : "bg-black text-white"}`}
                    onClick={() => setFilter("toReturn")}
                  >
                    Books to be Returned
                  </button>
                  <button
                    className={`text-sm px-4 py-2 rounded ${filter === "returned" ? "bg-[#702DFF] text-white" : "bg-black text-white"}`}
                    onClick={() => setFilter("returned")}
                  >
                    Returned Books
                  </button>
                  <button
                    className={`text-sm px-4 py-2 rounded ${filter === "all" ? "bg-[#702DFF] text-white" : "bg-black text-white"}`}
                    onClick={() => setFilter("all")}
                  >
                    All Books
                  </button>
                </div>

                <div className="flex items-center gap-2">
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

                  <button className="bg-black text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                    <span>Overdue</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
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
                    dueDate={book.dueDate}
                    daysOverdue={book.daysOverdue}
                    fine={book.fine}
                    coverImage={book.coverImage}
                    onReportMissing={() => console.log("Missing: " + book.id)}
                    onPayFine={() => handlePayFine(book.id)}
                    onReturnBook={handleReturnBook}
                  />
                ))
              ) : (
                <p>No books found matching your search.</p>
              )}

              <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Thank You!"
                message="Book has been successfully returned."
                buttonText="Back to Return page"
                onButtonClick={() => setShowSuccessModal(false)}
              />

              <PayFineModal
                isOpen={showPayFineModal}
                onClose={() => setShowPayFineModal(false)}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ReturnBook;
