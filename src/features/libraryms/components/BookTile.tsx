import React from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "../types";

interface BookTileProps {
  book: Book;
}

const BookTile: React.FC<BookTileProps> = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/library/book-details/${book.ISBN}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-32 sm:w-35 lg:w-46 "
    >
      <img
        src={book.coverImage}
        alt={book.title ?? "Book Cover"}
        className="rounded shadow-md w-full h-auto object-cover"
      />
    </div>
    
  );
};

export default BookTile;
