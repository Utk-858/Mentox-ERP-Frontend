import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaStar, FaHeart } from "react-icons/fa";
import BookTile from "../BookTile"; // your BookTile component
import type { Book } from "../../types";

const NewArrival: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/library/student/newarrival")
      .then((res) => res.json())
      .then((data: Book[]) => {
        setBooks(data);
      })
      .catch(() => {
        setBooks([    //fallback -->
          {
            ISBN: "1",
            title: "Sample Book 1",
            author: "Author",
            coverImage:
              "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.5,
            reviews: ["Great book!", "Loved it"],
            category: "Fiction",
          },
           {
            ISBN: "2",
            title: "Sample Book 2",
            author: "Author",
            coverImage:
              "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.6,
            reviews: [],
            category: "Fiction",
          },
          {
            ISBN: "3",
            title: "Sample Book 3",
            author: "Author",
            coverImage:
              "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.7,
            reviews: [],
            category: "Fiction",
          },
          {
            ISBN: "4",
            title: "Sample Book 4",
            author: "Author",
            coverImage:
              "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.8,
            reviews: [],
            category: "Fiction",
          },
          {
            ISBN: "5",
            title: "Sample Book 5",
            author: "Author",
            coverImage:
              "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.9,
            reviews: [],
            category: "Fiction",
          },
          {
            ISBN: "6",
            title: "Sample Book 6",
            author: "Author",
            coverImage:
              "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.2,
            reviews: [],
            category: "Fiction",
          }
        ]);
      });
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + itemsPerPage, books.length - itemsPerPage)
    );
  };

  const visibleBooks = books.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="py-8">
      <div className="flex mr-8">
        <h2 className="text-2xl font-semibold mb-6 ml-2">New Arrivals</h2>
        <div className="flex items-center ml-[50rem]">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`rounded-full p-2 mr-2 ${
              startIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
            }`}
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= books.length}
            className={`rounded-full p-2 ${
              startIndex + itemsPerPage >= books.length
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#702DFF]"
            }`}
          >
            <FaArrowRight
              className={`${
                startIndex + itemsPerPage >= books.length
                  ? "text-gray-400"
                  : "text-white"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-10">
        {visibleBooks.map((book) => (
          <div
            key={book.ISBN}
            className="relative overflow-hidden w-36 xl:w-46"
          >
            
            <BookTile book={book} />

            {/* Heart icon on top right */}
            <button className="absolute top-2 right-2 bg-white rounded-full p-1">
              <FaHeart className="text-gray-400 hover:text-red-500" />
            </button>

            {/* Rating and reviews */}
            <div className="p-3">
              <div className="flex items-center mb-1">
                <span className="bg-[#702DFF] text-white text-xs px-2 py-1 rounded-full mr-9">
                  <div className="flex items-center gap-1">
                    <FaStar className="fill-white" />
                    {book.rating ?? "N/A"}
                  </div>
                </span>
                <span className="text-sm text-gray-500">
                  {book.reviews?.length ?? 0} Reviews
                </span>
              </div>
              <p className="text-xs text-gray-500">By {book.author}</p>
              <p className="text-sm font-bold">{book.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
