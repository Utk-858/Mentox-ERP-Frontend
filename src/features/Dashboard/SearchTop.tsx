import { Bell, MessageCircle, Plus } from 'lucide-react'
import React, { useState } from 'react'

const SearchTop = () => {

    const [search, setSearch] = useState("");
  return (

    <>
    <div className="flex items-center flex-grow px-4 max-w-[900px]">
              <svg
                className="w-4 h-4 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="z-10 bg-[#F5F5F7] outline-none w-full text-center text-sm text-gray-700 px-4 py-2 rounded-lg"
                placeholder="What assignment are you looking for"
              />
            </div>
            <div className="flex items-center space-x-3 pr-2 z-10">
              <button className="p-2 rounded-lg bg-[#F5F5F7] hover:bg-gray-200">
                <Plus className="w-4 h-4 text-black" />
              </button>
              <button className="p-2 rounded-lg bg-[#F5F5F7] hover:bg-gray-200">
                <Bell className="w-4 h-4 text-black" />
              </button>
              <button className="p-2 rounded-lg bg-[#F5F5F7] hover:bg-gray-200">
                <MessageCircle className="w-4 h-4 text-black" />
              </button>
            </div>

            </>
  )
}

export default SearchTop