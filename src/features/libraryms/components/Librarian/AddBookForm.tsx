
import React, { useState, useRef } from "react";
import { FaSearch, FaUpload } from "react-icons/fa";

const AddBookForm: React.FC = () => {
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearchByISBN = async () => {
    if (!bookISBN) return;
    try {
      const response = await fetch(`/api/books?isbn=${bookISBN}`);
      const data = await response.json();
      // Populate fields with fetched data (example)
      setBookId(data.bookId || "");
      setBookTitle(data.bookTitle || "");
      setFirstAuthor(data.firstAuthor || "");
      setPublisher(data.publisher || "");
    } catch (error) {
      console.error("Error fetching book by ISBN:", error);
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

  return (
<div className="bg-white p-4 md:p-8 w-full max-w-6xl mx-auto">
  <div className="mb-6">
    <label className="block mb-2 font-medium">Book ISBN</label>
    <div className="flex gap-2 bg-gray-100 border border-[#606060] rounded-sm">
      <input
        type="text"
        value={bookISBN}
        onChange={(e) => setBookISBN(e.target.value)}
        placeholder="Search book by ISBN"
        className="bg-gray-100 rounded-sm flex-1 p-2"
      />
      <button
        onClick={handleSearchByISBN}
        className="px-4 bg-gray-100 rounded-sm"
      >
        <FaSearch className="bg-gray-100"/>
      </button>
    </div>
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
    {/* Book ID with Generate Button */}
    <div className="flex flex-col ml-0 xl:ml-[-100px]  w-full">
      <label className="mb-2 font-medium">Book ID</label>
     <div className="flex items-center border border-[#606060] rounded-sm overflow-hidden">
  <input
    type="text"
    value={bookId}
    onChange={(e) => setBookId(e.target.value)}
    placeholder="Book ID"
    className="p-2 bg-gray-100 flex-1 outline-none"
  />
  <button className="bg-[#702DFF] rounded-sm text-white border rounded-sm px-5 py-1.5 text-sm h-9 mr-1">
    Generate
  </button>
</div>

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
        onChange={(e) => setNumAuthors(parseInt(e.target.value))}
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
        title="Language"
        aria-label="Language"
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
        aria-label="Category"
        title="Category"
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
        aria-label="Sub-Category"
        title="Sub-Category"
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
    <button className="bg-[#702DFF] text-white px-8 sm:px-20 py-3 rounded-md">
      Add Book
    </button>
    <button className="bg-[#702DFF] text-white px-8 sm:px-20 py-3 rounded-md">
      Reset
    </button>
  </div>
</div>

  );
};

export default AddBookForm;