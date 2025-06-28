import React, { useState } from 'react';
import { Search, Plus, Bell, MessageCircle } from 'lucide-react';

interface ActionButtonProps {
  children: React.ReactNode;
}
const ActionButton: React.FC<ActionButtonProps> = ({ children }) => {

  return (
    <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5F5F7] transition-colors hover:bg-gray-200">
      {children}
    </button>
  );
};

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const isActive = inputValue.length > 0;

  return (
    <header className="flex w-full items-center gap-2">
     
      <div className="relative h-10 flex-grow rounded-lg bg-[#F5F5F7]">
        <Search 
          size={18} 
          className={`
            absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-opacity duration-300
            ${isActive ? 'opacity-100' : 'opacity-0'}
          `}
        />

        <div 
          className={`
            pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-gray-500 transition-opacity duration-300
            ${isActive ? 'opacity-0' : 'opacity-100'}
          `}
        >
          <Search size={18} />
          <span className="text-sm md:text-base">What are you looking for?</span>
        </div>
      
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`
            h-full w-full bg-transparent focus:outline-none transition-all duration-300
            ${isActive ? 'pl-12 text-left' : 'text-center'}
          `}
        />
      </div>

      <div className="flex items-center gap-2">
        <ActionButton><Plus className="h-5 w-5 text-black" /></ActionButton>
        <ActionButton><Bell className="h-5 w-5 text-black" /></ActionButton>
        <ActionButton><MessageCircle className="h-5 w-5 text-black" /></ActionButton>
      </div>
    </header>
  );
};

export default SearchBar;