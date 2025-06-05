import React, { useState } from "react";
import type { Category,Book } from "../types.ts";

// all categories --->

const categories: Category[] = [
  {
    label: "All",
    icon: (
      <img
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749019799/all_qpkqwd.png"
        alt="All"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
    ),
  },
  {
    label: "eBooks",
    icon: (
      <img
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749019800/ebooks_qt8fk2.png"
        alt="eBooks"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
    ),
  },
  {
    label: "New",
    icon: (
      <img
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749019800/New_xzj01t.png"
        alt="New"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
    ),
  },
  {
    label: "Bestsellers",
    icon: (
      <img
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749019800/Bestsellers_s4jad7.png"
        alt="Bestsellers"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
    ),
  },
  {
    label: "Audiobooks",
    icon: (
      <img
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749019800/audiobooks_wqpejr.png"
        alt="Audiobooks"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
    ),
  },
  {
    label: "Fiction",
    icon: (
      <img
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749021431/Fiction_elgrt6.png"
        alt="Fiction"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
    ),
  },
  {
    label: "Romance",
    icon: (
      <img
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749019800/Romance_udjdwd.png"
        alt="Romance"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
    ),
  },
  {
    label: "Fantasy",
    icon: (
      <img
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749019800/Fantasy_suzfro.png"
        alt="Fantasy"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
    ),
  },
  {
    label: "Manga",
    icon: (
      <img
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749019800/Manga_us7h4i.png"
        alt="Manga"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
    ),
  },
  {
    label: "Crime",
    icon: (
      <img
        src="https://res.cloudinary.com/dikylfimn/image/upload/v1749019800/Crime_i3gxpp.png"
        alt="Crime"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
    ),
  },
];


const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  
  // api fetch -->

  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);
    try {
      const response = await fetch(
        `/library/student/bookcategory?category=${encodeURIComponent(category)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };

  return (
    <div className="p-2">
      <div className="flex flex-wrap gap-2 lg:gap-0 xl:gap-2">
        {categories.map((category) => (
          <div
            key={category.label}
            className="flex flex-col items-center bg-white cursor-pointer hover:bg-gray-100 transition p-2 rounded-lg"
            onClick={() => handleCategoryClick(category.label)}
          >
            <div>{category.icon}</div>
            <span className="text-sm font-medium mt-2 text-center">
              {category.label}
            </span>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">
            Books in "{selectedCategory}"
          </h2>
          {books.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white p-2 rounded-lg shadow hover:shadow-md transition"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="mt-2 text-sm font-semibold">{book.title}</h3>
                  <p className="text-xs text-gray-600">{book.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No books found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;