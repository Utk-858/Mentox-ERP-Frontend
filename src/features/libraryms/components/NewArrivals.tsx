import React, { useState, useEffect } from 'react';
import { FaHeart, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Book = {
  id: number;
  title: string;
  author: string;
  image: string;
  rating: number;
  category: string;
  reviews: number;
};

const NewArrival: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setItemsPerPage(2); // tablets and below
      } else {
        setItemsPerPage(5); // large screens
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load books (mock or API) -->
  useEffect(() => {
    fetch('/library/student/newarrival')
      .then((res) => res.json())
      .then((data: Book[]) => {
        setBooks(data);
      })
      .catch(() => {
        // fallback
        setBooks([
          {
            id: 1,
            title: "Sample Book 1",
            author: "Author",
            image: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.5,
            reviews: 120,
            category: "Fiction"
          },
          {
            id: 2,
            title: "Sample Book 2",
            author: "Author",
            image: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.6,
            reviews: 85,
            category: "Fiction"
          },
          {
            id: 3,
            title: "Sample Book 3",
            author: "Author",
            image: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.7,
            reviews: 140,
            category: "Fiction"
          },
          {
            id: 4,
            title: "Sample Book 4",
            author: "Author",
            image: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.8,
            reviews: 100,
            category: "Fiction"
          },
          {
            id: 5,
            title: "Sample Book 5",
            author: "Author",
            image: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.9,
            reviews: 90,
            category: "Fiction"
          },
          {
            id: 6,
            title: "Sample Book 6",
            author: "Author",
            image: "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
            rating: 4.2,
            reviews: 60,
            category: "Fiction"
          },
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
              startIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200'
            }`}
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= books.length}
            className={`rounded-full p-2 ${
              startIndex + itemsPerPage >= books.length
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#702DFF]'
            }`}
          >
            <FaArrowRight
              className={`${
                startIndex + itemsPerPage >= books.length
                  ? 'text-gray-400'
                  : 'text-white'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-10">
        {visibleBooks.map((book) => (
          <div key={book.id} className="relative overflow-hidden w-36 xl:w-46">
            <img
              src={book.image}
              alt={book.title}
              className="w-full xl:h-70 rounded-2xl object-cover"
            />
            <button className="absolute top-2 right-2 bg-white rounded-full p-1">
              <FaHeart className="text-gray-400 hover:text-red-500" />
            </button>
            <div className="p-3">
              <div className="flex items-center mb-1">
                <span className="bg-[#702DFF] text-white text-xs px-2 py-1 rounded-full mr-9">
                  <div className="flex items-center gap-1">
                    <FaStar className="fill-white" />
                    {book.rating}
                  </div>
                </span>
                <span className="text-sm text-gray-500">{book.reviews} Reviews</span>
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
