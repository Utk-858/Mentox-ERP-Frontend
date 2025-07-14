import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookTile from "../BookTile";
import type { Book } from "../../types"; 

const NCERT: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("Social Studies");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const navigate = useNavigate();

  // Mock data -->
  const mockBooks: Book[] = [
    {
      ISBN: "9781234567890",
      title: "Achilles",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      downloadUrl: "#",
    },
    {
      ISBN: "9781234567891",
      title: "Harry Potter",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      downloadUrl: "#",
    },
    {
      ISBN: "9781234567892",
      title: "History Book",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      downloadUrl: "#",
    },
    {
      ISBN: "9781234567893",
      title: "Mathematics",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      downloadUrl: "#",
    },
    {
      ISBN: "9781234567894",
      title: "Geography",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      downloadUrl: "#",
    },
    {
      ISBN: "9781234567895",
      title: "Physics",
      coverImage:
        "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
      downloadUrl: "#",
    },
  ];

  const subjects = ["Home", "Social Studies", "Science", "English", "Hindi"];

  const getVisibleBookCount = () => {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    setVisibleCount(getVisibleBookCount());
    const handleResize = () => setVisibleCount(getVisibleBookCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/library/student/ncert?subject=${encodeURIComponent(selectedSubject)}`
        );
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();


        setBooks(data); 
      } catch (error) {
        console.warn("API not available, falling back to mock data.");
        setBooks(mockBooks);
      } finally {
        setLoading(false);
        setCurrentIndex(0);
      }
    };

    fetchBooks();
  }, [selectedSubject]);

  const nextSlide = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % Math.max(1, books.length - visibleCount + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, books.length - visibleCount + 1)) %
        Math.max(1, books.length - visibleCount + 1)
    );
  };

  const handleDownload = (book: Book) => {
    console.log("Downloading:", book.title);
  };

  const visibleBooks = books.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-[1400px] mx-auto min-h-[500px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">NCERT eBooks</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-gray-200 hover:bg-[#702DFF] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= books.length - visibleCount}
            className="p-2 rounded-full bg-gray-200 hover:bg-[#702DFF] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-24 lg:w-40 flex-shrink-0">
          <nav className="space-y-2">
            {subjects.map((subject) => (
              <div key={subject} className="flex items-center">
                <button
                  onClick={() => setSelectedSubject(subject)}
                  className={`w-full flex text-left px-4 py-3 rounded-3xl text-xs lg:text-sm font-medium transition-colors ${
                    selectedSubject === subject
                      ? "bg-gray-800 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {subject}
                  <FaArrowRight
                    className={`ml-5 mt-1 text-gray-600 ${
                      selectedSubject === subject ? "block" : "hidden"
                    }`}
                  />
                </button>
              </div>
            ))}
          </nav>
        </div>

        {/* Book Grid */}
        <div
          className="flex-1 min-h-[400px] relative grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
          }}
        >
          {loading ? (
            <div className="flex justify-center items-center h-full col-span-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            visibleBooks.map((book) => (
              <div key={book.ISBN} className="flex flex-col justify-between p-2 w-full mx-auto h-[320px] md:h-[360px] lg:h-[400px]">
                <BookTile book={book} />

                <div className="flex flex-col items-center gap-3 text-center h-[120px]">
                  <p
                    className="text-sm text-gray-700 font-medium"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={book.title}
                  >
                    {book.title}
                  </p>
                  <button
                    onClick={() => handleDownload(book)}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-3xl text-sm font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NCERT;
