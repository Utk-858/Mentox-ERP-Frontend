import React from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import AddBookForm from "../components/Librarian/AddBookForm";

const AddBook: React.FC = () => {
  return (
    <div className="flex font-poppins">
      <Sidebar />
      <div className="flex flex-col flex-1 p-8">
        <SearchBar />
        <h2 className="text-2xl font-semibold mt-5 ml-10 ">Add Book</h2>
        <h2 className="text-[#606060] text-center text-2xl font-semibold">Book Details</h2>
        <AddBookForm />
      </div>
    </div>
  );
};

export default AddBook;
