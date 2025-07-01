import React, { useState } from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";
import BookCard2 from "../components/Librarian/BookCard2";
import SuccessModal from "../components/SuccessModal";
import PayFineModal from "../components/PayFineModal";

const mockBooks = [
  {
    id: "23456789",
    title: "Harry Potter and the Philosopher's Stone",
    author: "JK Rowling",
    isbn: "978-0-321-14653-0",
    price: "INR 1500",
    issueDate: "2025-10-25",
    Publisher: "Mac Graw Hill",
    Category: "Fictional",
    fine: "\u20B9 50",
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
    fine: "\u20B9 20",
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
    fine: "\u20B9 0",
    returned: false,
    coverImage: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
  },
];

const UpdateBook: React.FC = () => {
  const [search, setSearch] = useState("");
  const [books] = useState(mockBooks);
  const [filter, setFilter] = useState<"toReturn" | "returned" | "all">("all");

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
    <div className="flex min-h-screen w-full max-w-screen relative">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <SearchBar />
        </div>

        {/* Hero Image Section */}
        <div className="relative w-full">
          <img
            src="/sparkles.png"
            alt="sparkles"
            className="w-full px-6 mt-[-4rem] md:px-10 py-10"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
            <h1 className="text-3xl mt-10 xl:mt-[-9rem] xl:text-5xl leading-tight font-bold text-gray-900">
              Update Book in the <span className="flex flex-col">Library</span>
            </h1>
            <p className="mt-4 text-gray-600 text-sm xl:text-lg max-w-2xl">
              Modify book details such as title, author, category, quantity, or availability status.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 z-20 space-y-10 py-6">
          <div className="flex flex-wrap  justify-center items-center mb-6 px-2 gap-4">
            <div className="flex items-center mt-0 xl:mt-[-30rem] w-full md:w-auto border border-gray-300 rounded-lg overflow-hidden bg-white">
              <input
                type="text"
                placeholder="Pending & Returned Books Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-1 xl:px-4 xl:py-3 text-sm w-full md:w-80 outline-none"
              />
              <button className="bg-black text-white text-sm px-4 py-3">
                Search
              </button>
            </div>
          </div>

          <section className="bg-[#F5F5F7] mt-0 xl:mt-[-5rem] rounded-lg max-w-screen p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                All Books in the Library
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                View and edit all books in the Library
              </p>

              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-2 bg-black rounded p-1">
                  <button
                    className={`text-sm px-4 py-2 rounded ${filter === "all" ? "bg-[#702DFF] text-white" : "bg-black text-white"}`}
                    onClick={() => setFilter("all")}
                  >
                    All Books
                  </button>
                </div>

                <div className="flex items-center bg-black text-white rounded-lg overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent text-white placeholder-gray-400 px-2 py-2 text-sm outline-none w-48"
                  />
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
                    publisher={book.Publisher || "Unknown"}
                    category={book.Category || "N/A"}
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

export default UpdateBook;
