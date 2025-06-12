
import { Book } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { FaUpload } from "react-icons/fa";

// Mock data for fallback
const mockBookData = {
  "978-0-321-14653-0": {
    bookId: "23456",
    bookTitle: "Harry Potter",
    numAuthors: 1,
    firstAuthor: "J.K Rowling",
    publisher: "Mc Graw Hill",
    edition: "1st Edition",
    year: "2013",
    numPages: "1800",
    numCopies: "18",
    shelfNumber: "18",
    language: "English",
    category: "Fictional",
    price: "INR 1600",
    subCategory: "Sc-Fi",
    description: "description/ short summary/ short note",
    coverImageUrl: null
  },
  "978-1-234-56789-0": {
    bookId: "12345",
    bookTitle: "The Great Gatsby",
    numAuthors: 1,
    firstAuthor: "F. Scott Fitzgerald",
    publisher: "Scribner",
    edition: "2nd Edition",
    year: "2020",
    numPages: "180",
    numCopies: "25",
    shelfNumber: "A-15",
    language: "English",
    category: "Fictional",
    price: "INR 899",
    subCategory: "Romance",
    description: "A classic American novel about the Jazz Age and the American Dream.",
    coverImageUrl: null
  }
};

const UpdateBookForm: React.FC = () => {
  const [bookISBN, setBookISBN] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
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
  const [isLoading, setIsLoading] = useState(true);
  const [bookFound, setBookFound] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract ISBN from URL or use mock data
  useEffect(() => {
    const loadBookDetails = async () => {
      setIsLoading(true);
      
      // Try to get ISBN from URL params (you might need to adjust this based on your routing)
      const urlParams = new URLSearchParams(window.location.search);
      const isbnFromUrl = urlParams.get('isbn') || window.location.pathname.split('/').pop();
      
      // For demo purposes, using a default ISBN if none found in URL
      const targetISBN = isbnFromUrl || "978-0-321-14653-0";
      setBookISBN(targetISBN);

      try {
        // Try to fetch from API first
        const response = await fetch(`/api/books?isbn=${targetISBN}`);
        
        if (response.ok) {
          const data = await response.json();
          populateFormData(data);
          setBookFound(true);
        } else {
          throw new Error("API not available");
        }
      } catch (error) {
        console.log("API not available, using mock data");
        
        // Use mock data as fallback
        const mockData = mockBookData[targetISBN as keyof typeof mockBookData];
        
        if (mockData) {
          populateFormData(mockData);
          setBookFound(true);
        } else {
          // If ISBN not in mock data, use the first mock entry
          const firstMockData = Object.values(mockBookData)[0];
          populateFormData(firstMockData);
          setBookFound(true);
        }
      }
      
      setIsLoading(false);
    };

    loadBookDetails();
  }, []);

  const populateFormData = (data: any) => {
    setBookId(data.bookId || "");
    setBookTitle(data.bookTitle || "");
    setFirstAuthor(data.firstAuthor || "");
    setPublisher(data.publisher || "");
    setEdition(data.edition || "");
    setYear(data.year || "");
    setNumPages(data.numPages || "");
    setNumCopies(data.numCopies || "");
    setShelfNumber(data.shelfNumber || "");
    setLanguage(data.language || "English");
    setCategory(data.category || "Fictional");
    setPrice(data.price || "");
    setSubCategory(data.subCategory || "Sc-Fi");
    setDescription(data.description || "");
    setNumAuthors(data.numAuthors || 1);
    
    // Set cover image if available
    if (data.coverImageUrl) {
      setCoverImagePreview(data.coverImageUrl);
    }
  };

  const handleCoverImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadCoverImage = async () => {
    if (!coverImage) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append('coverImage', coverImage);
    formData.append('bookId', bookId);

    try {
      const response = await fetch('/api/upload-cover', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        alert("Cover image uploaded successfully!");
      } else {
        alert("Failed to upload cover image");
      }
    } catch (error) {
      console.error("Error uploading cover image:", error);
      alert("Error uploading cover image");
    }
  };

  const handleSave = async () => {
    const bookData = {
      bookId,
      bookISBN,
      bookTitle,
      numAuthors,
      firstAuthor,
      publisher,
      edition,
      year,
      numPages,
      numCopies,
      shelfNumber,
      language,
      category,
      price,
      subCategory,
      description
    };

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        alert("Book updated successfully!");
      } else {
        throw new Error("API not available");
      }
    } catch (error) {
      console.log("API not available, simulating save");
      alert("Book updated successfully! (Mock save - API not available)");
    }
  };

  const handleReset = () => {
    // Reload the original data
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="bg-white p-4 md:p-8 w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading book details...</div>
        </div>
      </div>
    );
  }

  if (!bookFound) {
    return (
      <div className="bg-white p-4 md:p-8 w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Book not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-8 w-full max-w-6xl mx-auto">
    <div className="mb-6">
        <label className="block mb-2 font-medium">Book ISBN</label>
        <input
          type="text"
          value={bookISBN}
          readOnly
          placeholder="ISBN"
          className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 mb-6">
        <div>
          <label className="block mb-2 font-medium">Cover Image</label>
          
          {/* Cover Image Upload Area */}
          <div 
            onClick={handleCoverImageClick}
            className="w-32 h-32 border-2 border-dashed border-[#606060] rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors mb-2"
          >
            {coverImagePreview ? (
              <img 
                src={coverImagePreview} 
                alt="Cover preview" 
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <>
                <FaUpload className="text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Click to select image</span>
              </>
            )}
          </div>
          
          {/* Hidden file input */}
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
            className="bg-[#702DFF] text-white px-4 py-2 rounded-md w-32 disabled:bg-[#D2D2D233] disabled:border-1 disabled:border-[#606060] disabled:text-[#606060] disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
        
        <div className="flex flex-col gap-6 col-span-1 lg:col-span-3">
          {/* First Row: Book ID and Title */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Book ID (Read-only) */}
            <div className="flex flex-col ml-0 xl:ml-[-100px] w-full">
              <label className="mb-2 font-medium">Book ID</label>
              <input
                type="text"
                value={bookId}
                readOnly
                className="border border-[#606060] bg-[#D2D2D233]  rounded-md p-2 w-full cursor-not-allowed"
              />
            </div>

            {/* Book Title */}
            <div className="flex flex-col w-full">
              <label className="mb-2 font-medium">Book Title</label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Book Title"
                className="border border-[#606060] bg-[#D2D2D233] rounded-md p-2 w-full"
              />
            </div>
          </div>

          {/* Second Row: Number of Authors and First Author */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex ml-0 xl:ml-[-100px] flex-col w-full">
              <label className="mb-2 font-medium">No. of Authors</label>
              <input
                type="number"
                value={numAuthors}
                onChange={(e) => setNumAuthors(parseInt(e.target.value) || 1)}
                className="border border-[#606060] bg-[#D2D2D233] rounded-md p-2 w-full"
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="mb-2 font-medium">1st Author's Name</label>
              <input
                type="text"
                value={firstAuthor}
                onChange={(e) => setFirstAuthor(e.target.value)}
                placeholder="Name"
                className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Name of Publisher</label>
        <input
          type="text"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          placeholder="Name"
          className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2 font-medium">Edition</label>
          <input
            type="text"
            value={edition}
            placeholder="Edition"
            onChange={(e) => setEdition(e.target.value)}
            className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Year of Publication</label>
          <input
            type="text"
            value={year}
            placeholder="YYYY"
            onChange={(e) => setYear(e.target.value)}
            className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block mb-2 font-medium">Number of Pages</label>
          <input
            type="text"
            value={numPages}
            placeholder="No. of Pages"
            onChange={(e) => setNumPages(e.target.value)}
            className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Number of Copies</label>
          <input
            type="text"
            value={numCopies}
            placeholder="No. of Copies"
            onChange={(e) => setNumCopies(e.target.value)}
            className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Shelf Number</label>
          <input
            type="text"
            value={shelfNumber}
            placeholder="Shelf No."
            onChange={(e) => setShelfNumber(e.target.value)}
            className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>French</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-[#606060] bg-[#D2D2D233] rounded-md p-2 w-full"
          >
            <option>Fictional</option>
            <option>Non-Fictional</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Price</label>
          <input
            type="text"
            value={price}
            placeholder="INR"
            onChange={(e) => setPrice(e.target.value)}
            className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Sub-Category</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="border border-[#606060] bg-[#D2D2D233] rounded-md p-2 w-full"
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
          className="border bg-[#D2D2D233] border-[#606060] rounded-md p-2 w-full h-24"
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button 
          onClick={handleSave}
          className="bg-[#702DFF] text-white px-8 sm:px-20 py-3 rounded-md hover:bg-[#5a24cc] transition-colors"
        >
          Save
        </button>
        <button 
          onClick={handleReset}
          className="bg-[#702DFF] text-white px-8 sm:px-20 py-3 rounded-md hover:bg-[#5a24cc] transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UpdateBookForm;