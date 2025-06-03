import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Card 1</h2>
          <p className="text-gray-600">This is a dashboard card.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Card 2</h2>
          <p className="text-gray-600">This is another dashboard card.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Card 3</h2>
          <p className="text-gray-600">Yet another dashboard card.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
