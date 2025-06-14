import React, { useState, useRef, useEffect } from "react";
import { Search, Upload, X } from "lucide-react";

const AddBookForm = () => {
  const [bookISBN, setBookISBN] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [numAuthors, setNumAuthors] = useState(1);
  const [firstAuthor, setFirstAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [edition, setEdition] = useState("");
  const [year, setYear] = useState("");
  const [numPages, setNumPages] = useState("");
  const [numCopies, setNumCopies] = useState("");
  const [shelfNumber, setShelfNumber] = useState("");
  const [language, setLanguage] = useState("English");
  const [category, setCategory] = useState("Fictional");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("Sc-Fi");
  const [description, setDescription] = useState("");
  type BookData = {
    title: string;
    author: string;
    publisher: string;
    year: string;
    price: string;
    rating: string;
    cover: string;
  };
  const [searchResult, setSearchResult] = useState<BookData | null>(null);
  const [showCard, setShowCard] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Mock data for demonstration
  const mockBookData = {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K Rowling",
    publisher: "mat-graw",
    year: "2019",
    price: "INR 1500",
    rating: "4.5/5 (20,567 ratings)",
    cover: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=200&h=300&fit=crop"
  };

  // Handle clicks outside the card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && event.target instanceof Node && !cardRef.current.contains(event.target)) {
        setShowCard(false);
        setSearchResult(null);
      }
    };

    if (showCard) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCard]);

  const handleSearchByISBN = async () => {
    if (!bookISBN) return;
    
    // Simulate API call with mock data
    setTimeout(() => {
      setSearchResult(mockBookData);
      setShowCard(true);
    }, 500);
  };

  const handleCoverImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadCoverImage = async () => {
    if (!coverImage) {
      alert("Please select an image first");
      return;
    }
    alert("Cover image uploaded successfully!");
  };

  return (
    <div className="bg-white p-4 md:p-8 w-full max-w-6xl mx-auto relative">
      {/* Search Result Card - Same width as input field, positioned below */}
      {showCard && searchResult && (
        <div className="absolute top-30 left-8 right-8 z-50">
          <div 
            ref={cardRef}
            className="bg-white/40 w-full backdrop-blur-sm border border-gray-300 rounded-lg shadow-xl"
          >
            <div className="p-4">
              <div className="flex  gap-3">
                <div className="flex-shrink-0">
                  <img
                    src="https://res.cloudinary.com/dikylfimn/image/upload/v1749026822/book1_z45nas.png"
                    alt="Book cover"
                    className="w-24 h-30 mr-5 object-cover rounded border"
                  />
                </div>
                <div className="w-max-sm grid grid-cols-2 gap-0">
                  <div className="space-y-1">
                    <h4 className="text-sm lg:text-lg font-medium text-gray-700 mb-2 col-span-2">
                      Harry Potter and the Philosopher's Stone
                    </h4>
                    <div className="text-sm lg:text-base">
                      <span className="font-medium text-black">Author: </span>
                      <span className="text-gray-600">J.K Rowling</span>
                    </div>
                    <div className="text-sm lg:text-base">
                      <span className="font-medium text-black">Publisher: </span>
                      <span className="text-gray-600">mat-graw</span>
                    </div>
                    <div className="text-sm lg:text-base">
                      <span className="font-medium text-black">Year of Publication: </span>
                      <span className="text-gray-600">2019</span>
                    </div>
                  </div>
                  <div className="space-y-1 mt-10 lg:mt-0 ml-2">
                    <div className="text-sm lg:text-base mb-2 opacity-0">.</div>
                    <div className="text-sm lg:text-base">
                      <span className="font-medium text-black">Price: </span>
                      <span className="text-gray-600">INR 1500</span>
                    </div>
                    <div className="text-sm lg:text-base">
                      <span className="font-medium text-black">Pages: </span>
                      <span className="text-gray-600">320</span>
                    </div>
                    <div className="text-sm lg:text-base">
                      <span className="font-medium text-black">ISBN: </span>
                      <span className="text-gray-600">isbn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-2 font-medium">Book ISBN</label>
        <div className="flex gap-2 bg-gray-100 border border-gray-400 rounded-sm">
          <input
            type="text"
            value={bookISBN}
            onChange={(e) => setBookISBN(e.target.value)}
            placeholder="Search book by ISBN"
            className="bg-gray-100 rounded-sm flex-1 p-2 outline-none"
          />
          <button
            onClick={handleSearchByISBN}
            className="px-4 bg-gray-100 rounded-sm hover:bg-gray-200 transition-colors"
            title="Search by ISBN"
            aria-label="Search by ISBN"
          >
            <Search size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 mb-6">
        <div>
          <label className="block mb-2 font-medium">Cover Image</label>
          
          <div 
            onClick={handleCoverImageClick}
            className="w-32 h-32 border-2 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors mb-2"
          >
            {coverImagePreview ? (
              <img 
                src={typeof coverImagePreview === "string" ? coverImagePreview : undefined} 
                alt="Cover preview" 
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <>
                <Upload className="text-gray-400 mb-2" size={20} />
                <span className="text-xs text-gray-500">Click to select image</span>
              </>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <button 
            onClick={handleUploadCoverImage}
            disabled={!coverImage}
            className="bg-purple-600 text-white px-4 py-2 rounded-md w-32 disabled:bg-gray-200 disabled:border disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          >
            Upload
          </button>
        </div>
        
        <div className="flex flex-col gap-6 col-span-1 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col ml-0 xl:ml-[-100px] w-full">
              <label className="mb-2 font-medium">Book ID</label>
              <div className="flex items-center border border-gray-400 rounded-sm overflow-hidden">
                <input
                  type="text"
                  value={bookId}
                  onChange={(e) => setBookId(e.target.value)}
                  placeholder="Book ID"
                  className="p-2 bg-gray-100 flex-1 outline-none"
                />
                <button className="bg-[#702DFF] text-white px-2 lg:px-5 py-1.5 text-sm h-9 ml-[-100px] xl:ml-0 lg:mr-1 rounded hover:bg-purple-700 transition-colors">
                  Generate
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label className="mb-2 font-medium">Book Title</label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Book Title"
                className="border border-gray-400 bg-gray-50 rounded-md p-2 w-full outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex ml-0 xl:ml-[-100px] flex-col w-full">
              <label className="mb-2 font-medium">No. of Authors</label>
              <input
                type="number"
                value={numAuthors}
                onChange={(e) => setNumAuthors(parseInt(e.target.value))}
                className="border border-gray-400 bg-gray-50 rounded-md p-2 w-full outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="mb-2 font-medium">1st Author's Name</label>
              <input
                type="text"
                value={firstAuthor}
                onChange={(e) => setFirstAuthor(e.target.value)}
                placeholder="Name"
                className="border bg-gray-50 border-gray-400 rounded-md p-2 w-full outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="ml-0 xl:ml-[-100px]">
              <label className="block mb-2 font-medium">Name of Publisher</label>
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Name"
                className="border bg-gray-50 border-gray-400 rounded-md p-2 w-full outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Edition</label>
              <input
                type="text"
                value={edition}
                placeholder="Edition"
                onChange={(e) => setEdition(e.target.value)}
                className="border bg-gray-50 border-gray-400 rounded-md p-2 w-full outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2 font-medium">Year of Publication</label>
          <input
            type="text"
            value={year}
            placeholder="YYYY"
            onChange={(e) => setYear(e.target.value)}
            className="border bg-gray-50 border-gray-400 rounded-md p-2 w-full outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Number of Pages</label>
          <input
            type="text"
            value={numPages}
            placeholder="No. of Pages"
            onChange={(e) => setNumPages(e.target.value)}
            className="border bg-gray-50 border-gray-400 rounded-md p-2 w-full outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2 font-medium">Number of Copies</label>
          <input
            type="text"
            value={numCopies}
            placeholder="No. of Copies"
            onChange={(e) => setNumCopies(e.target.value)}
            className="border bg-gray-50 border-gray-400 rounded-md p-2 w-full outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Shelf Number</label>
          <input
            type="text"
            value={shelfNumber}
            placeholder="Shelf No."
            onChange={(e) => setShelfNumber(e.target.value)}
            className="border bg-gray-50 border-gray-400 rounded-md p-2 w-full outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2 font-medium">Language</label>
          <label htmlFor="language" className="block mb-2 font-medium">Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border bg-gray-50 border-gray-400 rounded-md p-2 w-full outline-none focus:border-purple-500"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>French</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-400 bg-gray-50 rounded-md p-2 w-full outline-none focus:border-purple-500"
          >
            <option>Fictional</option>
            <option>Non-Fictional</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2 font-medium">Price</label>
          <input
            type="text"
            value={price}
            placeholder="INR"
            onChange={(e) => setPrice(e.target.value)}
            className="border bg-gray-50 border-gray-400 rounded-md p-2 w-full outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label htmlFor="subCategory" className="block mb-2 font-medium">Sub-Category</label>
          <select
            id="subCategory"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="border border-gray-400 bg-gray-50 rounded-md p-2 w-full outline-none focus:border-purple-500"
          >
            <option>Sc-Fi</option>
            <option>Romance</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description/ short summary/ short note"
          className="border bg-gray-50 border-gray-400 rounded-md p-2 w-full h-24 outline-none focus:border-purple-500 resize-none"
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button className="bg-[#702DFF] text-white px-8 sm:px-20 py-3 rounded-md hover:bg-purple-700 transition-colors">
          Add Book
        </button>
        <button className="bg-[#702DFF] text-white px-8 sm:px-20 py-3 rounded-md hover:bg-purple-700 transition-colors">
          Reset
        </button>
      </div>
    </div>
  );
};

export default AddBookForm;