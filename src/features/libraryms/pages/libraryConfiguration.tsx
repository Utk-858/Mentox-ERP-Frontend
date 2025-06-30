import React, { useState } from 'react';
import Sidebar from '@/components/SidebarStudent';
import SearchBar from '@/components/SearchBar';

const LibraryConfiguration: React.FC = () => {
  const [formData, setFormData] = useState({
    libraryName: '',
    libraryEmail: '',
    contactNumber: '',
    address: ''
  });

  const [syncSettings, setSyncSettings] = useState({
    syncWithStudentDatabase: true,
    syncWithEmployeeDatabase: false,
    syncFrequency: 'weekly'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSyncToggle = (setting: 'syncWithStudentDatabase' | 'syncWithEmployeeDatabase') => {
    setSyncSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleFrequencyChange = (frequency: string) => {
    setSyncSettings(prev => ({
      ...prev,
      syncFrequency: frequency
    }));
  };

  const handleApplyChanges = () => {
    console.log('Applying changes:', { formData, syncSettings });
  };

  const handleEdit = () => {
    console.log('Edit mode activated');
  };

  return (
    <div className="flex lg:flex-row h-auto min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col mt-4">
        <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-2">
            <SearchBar />
          </div>

        <div className="flex-1 p-4 sm:p-6">
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-2 md:space-y-0">
              <h1 className="text-2xl font-semibold text-gray-900">Library Configuration</h1>
              <span className="text-sm text-black">Library → <span className='text-gray-500'>Library Configuration</span></span>
            </div>

            <div className="rounded-lg p-4 sm:p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Library's Name
                </label>
                <input
                  type="text"
                  name="libraryName"
                  value={formData.libraryName}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Library's Email
                </label>
                <input
                  type="email"
                  name="libraryEmail"
                  placeholder="Email"
                  value={formData.libraryEmail}
                  onChange={handleInputChange}
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Library's Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Contact Number"
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm  font-medium text-gray-700 mb-2">
                  Library's Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  rows={3}
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md resize-none"
                />
              </div>

              <div>
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                  <label className="flex justify-between items-center bg-[#D2D2D233] border border-[#606060] p-2 w-full lg:w-[48%] rounded-md">
                    <span className="text-sm font-medium text-gray-700">
                      Sync with Student Database
                    </span>
                    <div
                      className={`relative inline-flex h-6 w-11 rounded-full cursor-pointer transition-colors ${
                        syncSettings.syncWithStudentDatabase ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      onClick={() => handleSyncToggle('syncWithStudentDatabase')}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform bg-white rounded-full shadow transition ${
                          syncSettings.syncWithStudentDatabase ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </label>

                  <label className="flex justify-between items-center bg-[#D2D2D233] border border-[#606060] p-2 w-full lg:w-[48%] rounded-md">
                    <span className="text-sm font-medium text-gray-700">
                      Sync with Employee Database
                    </span>
                    <div
                      className={`relative inline-flex h-6 w-11 rounded-full cursor-pointer transition-colors ${
                        syncSettings.syncWithEmployeeDatabase ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      onClick={() => handleSyncToggle('syncWithEmployeeDatabase')}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform bg-white rounded-full shadow transition ${
                          syncSettings.syncWithEmployeeDatabase ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </label>
                </div>

                <div className="flex bg-[#D2D2D233] flex-col justify-between sm:flex-row sm:items-center sm:space-x-6 mb-6 border border-[#606060] p-4 rounded-md">
                  <span className="text-sm font-medium text-gray-700 mb-2 sm:mb-0">
                    Sync Frequency
                  </span>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {['real-time', 'daily', 'weekly'].map((freq) => (
                      <label key={freq} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="syncFrequency"
                          value={freq}
                          checked={syncSettings.syncFrequency === freq}
                          onChange={() => handleFrequencyChange(freq)}
                          className="form-radio accent-[#702DFF] h-4 w-4"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {freq.replace('-', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  onClick={handleApplyChanges}
                  className="flex-1 bg-[#702DFF] text-white py-3 px-4 rounded-lg font-medium"
                >
                  Apply Changes
                </button>
                <button
                  onClick={handleEdit}
                  className="flex-1 bg-[#702DFF] text-white py-3 px-4 rounded-lg font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryConfiguration;
