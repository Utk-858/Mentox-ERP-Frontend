import React from "react";
import Sidebar from "@/components/SidebarTeacher";
import SearchBar from "@/components/SearchBar";
import UpdateBookDetailsForm from "../components/Librarian/UpdateBookDetailsForm";

const UpdateBookDetails: React.FC = () => {
  return (
    <div className="flex font-poppins">
      <Sidebar />
      <div className="flex flex-col flex-1 p-8">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <SearchBar />
        </div>
        <h2 className="text-[#606060] mt-10 text-center text-2xl font-semibold">Book Details</h2>
        <UpdateBookDetailsForm/>
      </div>
    </div>
  );
};

export default UpdateBookDetails;