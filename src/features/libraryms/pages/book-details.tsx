import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/search-bar";
import Categories from "../components/categories";
import { FaStar, FaRegStar, FaDownload } from "react-icons/fa";
import type {Book} from "../types";
import RelatedBooks from "../components/relatedBooks";

const mockBook: Book = {
  title: "Harry Potter and the Philosopher's Stone",
  author: "JK Rowling",
  category: "Fictional, Fantasy",
  ISBN: "1234567891234",
  description: `First of J.K. Rowling's popular children's novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents' mysterious deaths.`,
  rating: 4.5,
  coverImage:
    "https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png",
  availability: "Not Available",
  descdown: `Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road. Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering with a leather strap that enables easy and stylish travel.`,
  additionalInfo: `Language: English\nPages: 352\nPublisher: Bloomsbury\nPublication Date: June 26, 1997`,
  reviews: [
    "Magical story and writing style!",
    "Amazing world-building and characters.",
    "Perfect book to start a fantasy journey.",
    "Loved it as a kid and still do!",
    "Iconic beginning to a classic series.",
  ],
  downloadUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
};

const BookDetails: React.FC = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"description" | "additional" | "reviews">("description");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`/library/student/fetchbook?ISBN=${isbn}`);  
        if (!response.ok) throw new Error("Failed to fetch book details.");
        const data = await response.json();
        setBook(!data || Object.keys(data).length === 0 ? mockBook : data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setBook(mockBook);   // Fallback to mock data in case of error
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [isbn]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`emptystar-${i}`} className="text-yellow-500" />);
    }
    return stars;
  };

  const renderTabContent = () => {
    if (!book) return null;
    switch (activeTab) {
      case "description":
        return <p className="text-sm text-gray-700 leading-relaxed">{book.descdown}</p>;
      case "additional":
        return (
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
            {book.additionalInfo}
          </pre>
        );
      case "reviews":
        return (
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
            {book.reviews?.map((review: string, i: number) => (
              <li key={i}>{review}</li>
            ))}
          </ul>
        );
    }
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <SearchBar />
        <div className="ml-20">
          <Categories />
        </div>
        <div><h1 className="text-3xl mt-6 ml-12 font-semibold">Book Details</h1></div>
        {loading ? (
          <div className="mt-8 text-center text-lg font-semibold">
            Loading book details...
          </div>
        ) : !book ? (
          <div className="mt-8 text-center text-lg font-semibold">
            Book details not found.
          </div>
        ) : (
          <div className="mt-2 ml-20 mr-20 bg-white p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-35  h-40 lg:w-60 lg:h-auto rounded shadow-md"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold mb-2 max-w-xl">{book.title}</h1>
                  {book.availability !== "Available" && (
                    <span className="bg-red-500 text-white text-xs lg:text-sm px-3 py-1 rounded-full">
                      {book.availability}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-1">
                  {renderStars(book.rating || 0)}
                  <span className="text-gray-600 text-sm ml-1">{book.reviews?.length || 0} Student Reviews</span>
                </div>

                <p className="ml-[-10rem] lg:ml-0 mt-10 lg:mt-4 text-sm text-black">{book.description}</p>

                <div className="ml-[-10rem] lg:ml-0 grid grid-cols-2 gap-x-8 gap-y-1 mt-6 text-sm text-gray-700">
                  <p><span className="font-semibold">Author</span>: {book.author}</p>
                  <p><span className="font-semibold">Category</span>: {book.category}</p>
                  <p><span className="font-semibold">Book ID</span>: 2345678</p>
                  <p><span className="font-semibold">Edition</span>: 2nd Edition</p>
                  <p><span className="font-semibold">ISBN No.</span>: {book.ISBN}</p>
                </div>

                <div className="ml-[-10rem] lg:ml-0 mt-6 flex gap-4">
                  <button
                    className="bg-[#702DFF] text-white px-5 py-3 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                    onClick={() => alert("Book reserved successfully!")} //will replace with actual reserve logic 
                  >
                    Reserve
                  </button>
                  <a
                    href={book.downloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#702DFF] text-white px-5 py-3 rounded-lg hover:bg-purple-700 flex items-center gap-2"
                  >
                    eBook Download <FaDownload />
                  </a>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-10 border-b border-gray-200">
              <div className="flex gap-10 text-gray-600 text-sm font-medium">
                <button
                  className={`pb-2 ${activeTab === "description" ? "border-b-2 border-black text-black" : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`pb-2 ${activeTab === "additional" ? "border-b-2 border-black text-black" : ""}`}
                  onClick={() => setActiveTab("additional")}
                >
                  Additional Information
                </button>
                <button
                  className={`pb-2 ${activeTab === "reviews" ? "border-b-2 border-black text-black" : ""}`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews [{book.reviews?.length || 0}]
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-4">{renderTabContent()}</div>
                  <div className="mt-10 border-b border-gray-200"></div>
            {/* Related books */}
                 <div className="ml-[-4rem]"><RelatedBooks></RelatedBooks></div> 
          </div>
        )}
      </div>
    </div>
  );
};export default BookDetails;
