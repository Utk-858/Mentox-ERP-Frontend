import type React from "react";
import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [books, setBooks] = useState<any[]>([]); // adjust the type as needed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    console.log("Searching for:", searchQuery);
    setIsSearchFocused(false);

    if (!searchQuery.trim()) {
      // prevent searching with empty input
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/library/student/bookSearch?title=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data); // Store fetched books in state
      console.log("Search results:", data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 100);
  };

  const handleOverlayClick = () => {
    setIsSearchFocused(false);
  };

  return (
    <>
      {isSearchFocused && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          onClick={handleOverlayClick}
        />
      )}

      <div
        className={`w-full mt-4 max-w-xl lg:max-w-5xl mx-auto relative ${
          isSearchFocused ? "z-50" : ""
        }`}
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="What books are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4 h-12 w-full rounded-xl bg-gray-100 border border-gray-100 focus:border-violet-600 focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </div>
          <button
            onClick={handleSearch}
            className="h-12 px-6 rounded-xl bg-[#702DFF] text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Search
          </button>
        </div>

        {/* loading and error messages */}
        {loading && (
          <p className="mt-4 text-center text-gray-500">Loading...</p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}

        {/* Results */}
        <div className="mt-4">
          {books.length > 0 && (
            <ul className="space-y-2">
              {books.map((book, index) => (
                <li
                  key={index}
                  className="p-4 bg-white shadow rounded-xl border"
                >
                  <p className="font-semibold">{book.title}</p>
                
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
