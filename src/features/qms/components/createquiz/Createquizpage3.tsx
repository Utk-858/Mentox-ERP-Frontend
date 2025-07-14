import React from 'react';


const Createquizpage3: React.FC = () => {
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full ">
      <h2 className="text-[1.85rem] font-[600] ">Quiz Schedule</h2>
      <p className="text-[1.25rem] font-[400] text-[#363636] mb-6">Basic information about your quiz</p>

      {/* Quiz Start */}
      <div className="mb-5">
        <label className="block text-[1.25rem] font-[500] mb-1">
          Quiz Start Date and Time
        </label>
        <input
          type="datetime-local"
          className="w-[35rem] px-3 py-2 rounded-lg text-[1.2rem] font-medium text-[#555] bg-gray-100 outline-none"
        />
      </div>

      {/* Quiz End */}
      <div className="mb-5">
        <label className="block text-[1.25rem] font-[500] mb-1">
          Quiz End Date and Time
        </label>
        <input
          type="datetime-local"
          className="w-[35rem] px-3 py-2 rounded-lg text-[1.2rem] font-medium text-[#555] bg-gray-100 outline-none"
        />
      </div>

      
      
    </div>
  );
};

export default Createquizpage3;
