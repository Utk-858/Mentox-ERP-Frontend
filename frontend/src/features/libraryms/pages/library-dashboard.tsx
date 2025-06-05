import React from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/search-bar";
import Categories from "../components/categories";
import NewArrival from "../components/NewArrivals";
import PageFooter from "../components/page-footer";
import NCERT from "../components/NCERT";
import DashboardCard from "../components/dashboard-card";

const LibraryDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <SearchBar />
        <div className="mt-2 ml-20">
          <Categories />
        </div>
        <div className="ml-20 ">
          <NewArrival />
        </div>
            <div className=" flex mr-10">
            <div className="ml-10"><NCERT /></div>
            <div ><DashboardCard /></div>
            </div>
        <PageFooter />
      </div>
    </div>
  );
};

export default LibraryDashboard;
