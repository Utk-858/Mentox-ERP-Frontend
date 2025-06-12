import { Bell, MessageCircle, Plus, Search } from 'lucide-react'
import React, { useState } from 'react'

const SearchBar= () => {

    const [search, setSearch] = useState("");
  return (

    <>
    <div className="flex items-center flex-grow px-4 max-w-[900px]">

        <button className="px-3 py-2 rounded-lg bg-[#F5F5F7] hover:bg-gray-200 mr-2">
                <Search className="w-4 h-4 text-black" />
              </button>
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

export default SearchBar