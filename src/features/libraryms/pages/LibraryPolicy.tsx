import React, { useState } from 'react';
import Sidebar from '@/components/SidebarTeacher';
import SearchBar from '@/components/SearchBar';
// TimePicker is imported but not used in the provided JSX.
// If you intend to use it, ensure its usage aligns with its documentation.
// import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

// Define a type for your form data to ensure type safety
interface FormData {
  maxBooksStudent: string;
  maxBooksEmployee: string;
  loanPeriodStudent: string;
  loanPeriodEmployee: string;
  finePerDay: string;
  gracePeriodDays: string;
  reservationHoldDuration: string;
  daysReminderBefore: string;
  channels: string;
  openingHour: string;
  openingMinute: string;
  closingHour: string;
  closingMinute: string;
  fineCap: string;
  lostDamagedBookPolicy: string;
  stolenBookPolicy: string;
  maxReservation: string;
  // Added for the AM/PM functionality, initialized as empty string
  openingPeriod?: 'AM' | 'PM';
  closingPeriod?: 'AM' | 'PM';
}

const LibraryPolicySetup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    maxBooksStudent: '3',
    maxBooksEmployee: '5',
    loanPeriodStudent: '7',
    loanPeriodEmployee: '14',
    finePerDay: '',
    gracePeriodDays: '',
    reservationHoldDuration: '',
    daysReminderBefore: '2',
    channels: 'sms/email/in-app',
    openingHour: '7',
    openingMinute: '00',
    closingHour: '7',
    closingMinute: '00',
    fineCap: '',
    lostDamagedBookPolicy: 'Select',
    stolenBookPolicy: 'Select',
    maxReservation: '2',
    openingPeriod: 'AM', // Default to AM
    closingPeriod: 'PM', // Default to PM
  });

  const [toggles, setToggles] = useState({
    allowReservation: true,
    dueDateReminder: true
  });

  // Event handler for input and select changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Event handler for toggle switches
  const handleToggle = (toggleName: 'allowReservation' | 'dueDateReminder') => {
    setToggles(prev => ({
      ...prev,
      [toggleName]: !prev[toggleName]
    }));
  };

  // Generic handler for incrementing numeric fields
  const handleIncrement = (field: keyof FormData) => {
    setFormData(prev => {
      // Ensure the value is treated as a number; default to 0 if empty or not a number
      const current = Number(prev[field] || '0');
      return {
        ...prev,
        [field]: String(current + 1)
      };
    });
  };

  // Generic handler for decrementing numeric fields
  const handleDecrement = (field: keyof FormData) => {
    setFormData(prev => {
      // Ensure the value is treated as a number; default to 0 if empty or not a number
      const current = Number(prev[field] || '0');
      return {
        ...prev,
        [field]: String(current > 0 ? current - 1 : 0)
      };
    });
  };

  const handleApplyChanges = () => {
    console.log('Applying changes:', { formData, toggles });
    // In a real application, you'd typically send this data to a backend API
    // e.g., axios.post('/api/library-policy', { formData, toggles });
    alert('Changes Applied! Check console for data.');
  };

  const handleEdit = () => {
    console.log('Edit mode activated');
    // In a real application, you might enable/disable input fields based on an 'edit' state
    alert('Edit mode activated! (Functionality to enable editing inputs can be added)');
  };

  return (
    <div className="flex lg:flex-row h-auto min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col mt-4">
        <div className="relative flex w-full justify-center z-10 text-center mt-8">
          <SearchBar />
        </div>
        

        <div className="flex-1 p-4 sm:p-6">
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-2 md:space-y-0">
              <h1 className="text-2xl font-semibold text-gray-900">Library Policy Setup</h1>
              <span className="text-sm text-black">
                Library → <span className='text-gray-500'>Library Policy Setup</span>
              </span>
            </div>

            <div className="rounded-lg p-4 sm:p-6 space-y-6 ">
              <div className='grid grid-cols-2 gap-4'>
                {[
                  { label: 'Max Books/ Student', name: 'maxBooksStudent' },
                  { label: 'Max Books/ Employee', name: 'maxBooksEmployee' },
                  { label: 'Loan Period/ Student', name: 'loanPeriodStudent' },
                  { label: 'Loan Period/ Employee', name: 'loanPeriodEmployee' },
                ].map(({ label, name }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <div className="flex items-center bg-[#D2D2D233] border border-[#606060] rounded-md px-3 py-2">
                      <input
                        type="text" // Changed to text to allow empty string input if needed, but consider number type for strict numeric input
                        id={name} // Added id for accessibility
                        name={name}
                        value={formData[name as keyof FormData]} // Type assertion here
                        onChange={handleInputChange}
                        className="flex-1 bg-transparent border-0 outline-none"
                      />
                      <div className="flex items-center ml-2">
                        <button
                          type="button"
                          onClick={() => handleDecrement(name as keyof FormData)} // Type assertion here
                          className="bg-[#702DFF] text-white w-6 h-6 flex items-center justify-center text-sm rounded"
                        >
                          -
                        </button>
                        <div className="bg-[#702DFF] text-white px-3 py-1 mx-1 rounded text-sm font-medium">
                          {formData[name as keyof FormData]} {/* Type assertion here */}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleIncrement(name as keyof FormData)} // Type assertion here
                          className="bg-[#702DFF] text-white w-6 h-6 flex items-center justify-center text-sm rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fine per Day */}
              <div>
                <label htmlFor="finePerDay" className="block text-sm font-medium text-gray-700 mb-2">Fine per Day(₹)</label>
                <input
                  type="number" // Changed to number for monetary values
                  id="finePerDay"
                  name="finePerDay"
                  value={formData.finePerDay}
                  onChange={handleInputChange}
                  placeholder="Fine"
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md"
                />
              </div>

              {/* Grace Period */}
              <div>
                <label htmlFor="gracePeriodDays" className="block text-sm font-medium text-gray-700 mb-2">Grace Period(Days)</label>
                <input
                  type="number" // Changed to number for days
                  id="gracePeriodDays"
                  name="gracePeriodDays"
                  value={formData.gracePeriodDays}
                  onChange={handleInputChange}
                  placeholder="No. of Days"
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md"
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {/* Allow Reservation Toggle */}
                <div className="flex justify-between items-center bg-[#D2D2D233] border border-[#606060] h-11 mt-7 p-2 rounded-md">
                  <span className="text-sm font-medium text-gray-700">Allow Reservation</span>
                  <div
                    className={`relative inline-flex h-6 w-11 rounded-full cursor-pointer transition-colors ${
                      toggles.allowReservation ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    onClick={() => handleToggle('allowReservation')}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform bg-white rounded-full shadow transition ${
                        toggles.allowReservation ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
                {[
                  { label: 'Max Reservation', name: 'maxReservation' },
                ].map(({ label, name }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <div className="flex items-center bg-[#D2D2D233] border border-[#606060] rounded-md px-3 py-2">
                      <input
                        type="text" // Changed to text
                        id={name} // Added id for accessibility
                        name={name}
                        value={formData[name as keyof FormData]} // Type assertion here
                        onChange={handleInputChange}
                        className="flex-1 bg-transparent border-0 outline-none"
                      />
                      <div className="flex items-center ml-2">
                        <button
                          type="button"
                          onClick={() => handleDecrement(name as keyof FormData)} // Type assertion here
                          className="bg-[#702DFF] text-white w-6 h-6 flex items-center justify-center text-sm rounded"
                        >
                          -
                        </button>
                        <div className="bg-[#702DFF] text-white px-3 py-1 mx-1 rounded text-sm font-medium">
                          {formData[name as keyof FormData]} {/* Type assertion here */}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleIncrement(name as keyof FormData)} // Type assertion here
                          className="bg-[#702DFF] text-white w-6 h-6 flex items-center justify-center text-sm rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reservation Hold Duration */}
              <div>
                <label htmlFor="reservationHoldDuration" className="block text-sm font-medium text-gray-700 mb-2">Reservation Hold Duration(Days)</label>
                <input
                  type="number" // Changed to number for days
                  id="reservationHoldDuration"
                  name="reservationHoldDuration"
                  value={formData.reservationHoldDuration}
                  onChange={handleInputChange}
                  placeholder="No. of Days"
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md"
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                {/* Due Date Reminder Toggle */}
                <div className="flex justify-between items-center bg-[#D2D2D233] h-11 mt-7 border border-[#606060] p-3 rounded-md">
                  <span className="text-sm font-medium text-gray-700">Due Date Reminder</span>
                  <div
                    className={`relative inline-flex h-6 w-11 rounded-full cursor-pointer transition-colors ${
                      toggles.dueDateReminder ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    onClick={() => handleToggle('dueDateReminder')}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform bg-white rounded-full shadow transition ${
                        toggles.dueDateReminder ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
                {[
                  { label: 'Days to send Reminder', name: 'daysReminderBefore' },
                ].map(({ label, name }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <div className="flex items-center bg-[#D2D2D233] border border-[#606060] rounded-md px-3 py-2">
                      <input
                        type="text" // Changed to text
                        id={name} // Added id for accessibility
                        name={name}
                        value={formData[name as keyof FormData]} // Type assertion here
                        onChange={handleInputChange}
                        className="flex-1 bg-transparent border-0 outline-none"
                      />
                      <div className="flex items-center ml-2">
                        <button
                          type="button"
                          onClick={() => handleDecrement(name as keyof FormData)} // Type assertion here
                          className="bg-[#702DFF] text-white w-6 h-6 flex items-center justify-center text-sm rounded"
                        >
                          -
                        </button>
                        <div className="bg-[#702DFF] text-white px-3 py-1 mx-1 rounded text-sm font-medium">
                          {formData[name as keyof FormData]} {/* Type assertion here */}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleIncrement(name as keyof FormData)} // Type assertion here
                          className="bg-[#702DFF] text-white w-6 h-6 flex items-center justify-center text-sm rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Channels */}
              <div>
                <label htmlFor="channels" className="block text-sm font-medium text-gray-700 mb-2">Channels</label>
                <input
                  type="text"
                  id="channels" // Added id for accessibility
                  name="channels"
                  value={formData.channels}
                  onChange={handleInputChange}
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Opening Time */}
                <div>
                  <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700 mb-2">Opening Time</label>
                  <div className="flex items-center bg-[#D2D2D233] border border-[#606060] rounded-md px-3 py-2">
                    <div className="flex items-center">
                      <input
                        type="number"
                        id="openingHour"
                        min="1"
                        max="12"
                        value={formData.openingHour}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          openingHour: e.target.value
                        }))}
                        className="w-10 relative ml-[20vw] rounded-sm text-center text-purple-600 font-semibold text-lg bg-[#922dff2d] border-none outline-none"
                      />
                      <span className="text-gray-500 mx-1">:</span>
                      <input
                        type="number"
                        id="openingMinute"
                        min="0"
                        max="59"
                        value={formData.openingMinute}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          openingMinute: e.target.value
                        }))}
                        className="w-10 text-center text-black rounded-sm font-semibold text-lg bg-gray-300 border-none outline-none"
                      />
                    </div>
                    {/* AM/PM */}
                    <div className="flex flex-col ml-2">
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({
                          ...prev,
                          openingPeriod: 'AM'
                        }))}
                        className={`px-2 py-0.5 text-xs border rounded-sm ml-1 ${formData.openingPeriod === 'AM' ? 'bg-[#EEE6FF] text-[#702DFF]' : 'bg-transparent text-gray-500'}`}
                      >
                        AM
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({
                          ...prev,
                          openingPeriod: 'PM'
                        }))}
                        className={`px-2 py-0.5 text-xs border rounded-sm ml-1 ${formData.openingPeriod === 'PM' ? 'bg-[#EEE6FF] text-[#702DFF]' : 'bg-transparent text-gray-500'}`}
                      >
                        PM
                      </button>
                    </div>
                  </div>
                </div>

                {/* Closing Time */}
                <div>
                  <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700 mb-2">Closing Time</label>
                  <div className="flex items-center bg-[#D2D2D233] border border-[#606060] rounded-md px-3 py-2">
                    <div className="flex items-center">
                      <input
                        type="number"
                        id="closingHour"
                        min="1"
                        max="12"
                        value={formData.closingHour}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          closingHour: e.target.value
                        }))}
                        className="w-10 text-center ml-[20vw] rounded-sm text-purple-600 font-semibold text-lg bg-[#922dff2d] border-none outline-none"
                      />
                      <span className="text-gray-500 mx-1">:</span>
                      <input
                        type="number"
                        id="closingMinute"
                        min="0"
                        max="59"
                        value={formData.closingMinute}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          closingMinute: e.target.value
                        }))}
                        className="w-10 text-center text-black rounded-sm font-semibold text-lg bg-gray-300 border-none outline-none"
                      />
                    </div>
                    {/* AM/PM */}
                    <div className="flex flex-col ml-2">
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({
                          ...prev,
                          closingPeriod: 'AM'
                        }))}
                        className={`px-2 py-0.5 text-xs border rounded-sm ml-1 ${formData.closingPeriod === 'AM' ? 'bg-[#EEE6FF] text-[#702DFF]' : 'bg-transparent text-gray-500'}`}
                      >
                        AM
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({
                          ...prev,
                          closingPeriod: 'PM'
                        }))}
                        className={`px-2 py-0.5 text-xs border rounded-sm ml-1 ${formData.closingPeriod === 'PM' ? 'bg-[#EEE6FF] text-[#702DFF]' : 'bg-transparent text-gray-500'}`}
                      >
                        PM
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fine Cap */}
              <div>
                <label htmlFor="fineCap" className="block text-sm font-medium text-gray-700 mb-2">Fine Cap (₹)</label>
                <input
                  type="number" // Changed to number
                  id="fineCap"
                  name="fineCap"
                  value={formData.fineCap}
                  onChange={handleInputChange}
                  placeholder="Maximum Fine"
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md"
                />
              </div>

              {/* Lost/Damaged Book Policy */}
              <div>
                <label htmlFor="lostDamagedBookPolicy" className="block text-sm font-medium text-gray-700 mb-2">Lost/Damaged Book Policy</label>
                <select
                  id="lostDamagedBookPolicy"
                  name="lostDamagedBookPolicy"
                  value={formData.lostDamagedBookPolicy}
                  onChange={handleInputChange}
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md"
                >
                  <option value="Select" disabled>Select</option>
                  <option value="Charge current market price">Charge current market price</option>
                  <option value="Replacement with same edition">Replacement with same edition</option>
                  <option value="Penalty + Replacement">Penalty + Replacement</option>
                </select>
              </div>

              {/* Stolen Book Policy */}
              <div>
                <label htmlFor="stolenBookPolicy" className="block text-sm font-medium text-gray-700 mb-2">Stolen Book Policy</label>
                <select
                  id="stolenBookPolicy"
                  name="stolenBookPolicy"
                  value={formData.stolenBookPolicy}
                  onChange={handleInputChange}
                  className="w-full bg-[#D2D2D233] px-3 py-2 border border-[#606060] rounded-md"
                >
                  <option value="Select" disabled>Select</option>
                  <option value="Report & fine">Report & fine</option>
                  <option value="Police verification required">Police verification required</option>
                  <option value="Ban library access">Ban library access</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between space-x-4 mt-6">
                <button
                  onClick={handleApplyChanges}
                  className="px-10 py-3 rounded-md bg-[#702DFF] hover:bg-[#5a1fd9] text-white text-base font-medium"
                >
                  Apply Changes
                </button>
                <button
                  onClick={handleEdit}
                  className="px-10 py-3 rounded-md bg-[#702DFF] hover:bg-[#5a1fd9] text-white text-base font-medium"
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

export default LibraryPolicySetup;