import React from "react";

interface BookCardProps {
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

const BookCard: React.FC<BookCardProps> = ({
  title,
  bookId,
  author,
  issueDate,
  dueDate,
  reservationDate,
  expiryOfReservation,
  fine,
  coverImage,
  showButtons = false,
  cardType = "issued",
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-gray-100 rounded-xl p-4 mb-4 items-start">
      {/* Book Cover */}
      <img
        src={coverImage}
        alt={title}
        className="w-24 h-32 object-cover rounded-2xl"
      />
      
      {/* Book Info */}
      <div className="flex-1">
        <h2 className="font-bold text-gray-700 text-xs lg:text-lg mb-2">
          {title}
        </h2>
        <p className="text-gray-700 font-bold text-xs lg:text-base">
          <span className="text-black">Book ID:</span> {bookId}
        </p>
        <p className="text-gray-700 font-bold text-xs lg:text-base">
          <span className="text-black">Author:</span> {author}
        </p>
        {cardType === "reserved" ? (
          <p className="text-gray-700 font-bold text-xs lg:text-base">
            <span className="text-black">Reservation date:</span> {reservationDate}
            <span className="text-black ml-4">Expiry of Reservation:</span> {expiryOfReservation}
          </p>
        ) : (
          <p className="text-gray-700 font-bold text-xs lg:text-base">
            <span className="text-black">Issue date:</span> {issueDate}
            <span className="text-black ml-4">Due Date:</span> {dueDate}
          </p>
        )}
        {fine && (
          <p className="font-bold text-gray-700 text-xs lg:text-base">
            <span className="text-black">Fine:</span> {fine}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      {showButtons && (
        <div className="flex flex-col gap-2 mt-2 sm:items-end">
          <span className="bg-[#00B67F] text-white text-xs lg:text-lg font-semibold px-2 lg:px-5 py-1 rounded-full">
            Available
          </span>
          <button className="bg-[#702DFF] text-white text-xs lg:text-lg font-semibold px-2 lg:px-8 py-1 lg:py-2 rounded-full">
            Cancel reservation
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
