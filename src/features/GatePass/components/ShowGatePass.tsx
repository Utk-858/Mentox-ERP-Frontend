import React, { useState } from 'react';
import { Search, User, Calendar, Clock, MapPin, Users, ChevronDown } from 'lucide-react';

interface GatePassEntry {
  id: string;
  name: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  section: string;
  date: string;
  rollNumber: string;
  parentContact: string;
  reason: string;
}

interface VisitorEntry {
  id: string;
  name: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Entered' | 'Exited';
  phoneNumber: string;
  numberOfMembers: number;
  vehicleNumber: string;
  whomToMeet: string;
  reason: string;
}
const visitorStatuses = ['All', 'Entered', 'Rejected', 'Requested', 'Approved'] as const;
type VisitorStatus = typeof visitorStatuses[number];

const GatePassVisitorSystem: React.FC = () => {
  const [gatePassFilter, setGatePassFilter] = useState<'All' | 'Pending' | 'Approved'>('All');
  const [gatePassSearch, setGatePassSearch] = useState('');
  const [visitorFilter, setVisitorFilter] = useState<VisitorStatus>('All');
  const [visitorSearch, setVisitorSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('25 July 2023');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const gatePassData: GatePassEntry[] = [
    {
      id: '1',
      name: 'Navya Jain',
      status: 'Pending',
      section: 'A',
      date: '09/07/2016',
      rollNumber: '24',
      parentContact: '9611093585',
      reason: 'Personal reason/Approved'
    },
    {
      id: '2',
      name: 'Navya Jain',
      status: 'Approved',
      section: 'A',
      date: '24/11/2016',
      rollNumber: '24',
      parentContact: '9611093585',
      reason: 'Personal Approved Approved'
    },
    {
      id: '3',
      name: 'Navya Jain',
      status: 'Approved',
      section: 'A',
      date: '24/11/2016',
      rollNumber: '24',
      parentContact: '9611093585',
      reason: 'Personal Reason/Approved'
    },
    {
      id: '4',
      name: 'Navya Jain',
      status: 'Approved',
      section: 'A',
      date: '24/11/2016',
      rollNumber: '24',
      parentContact: '9611093585',
      reason: 'Personal Reason/Approved'
    }
  ];

  const visitorData: VisitorEntry[] = [
    {
      id: '1',
      name: 'Navya Jain',
      status: 'Pending',
      phoneNumber: '9611093585',
      numberOfMembers: 0,
      vehicleNumber: 'UP78-7919',
      whomToMeet: 'Hemraj Meangiri',
      reason: 'Take a student back to home'
    },
    {
      id: '2',
      name: 'Navya Jain',
      status: 'Approved',
      phoneNumber: '9611093585',
      numberOfMembers: 0,
      vehicleNumber: 'UP78-7919',
      whomToMeet: 'Hemraj Meangiri',
      reason: 'Take a student back to home'
    },
    {
      id: '3',
      name: 'Navya Jain',
      status: 'Entered',
      phoneNumber: '9611093585',
      numberOfMembers: 0,
      vehicleNumber: 'UP78-7919',
      whomToMeet: 'Hemraj Meangiri',
      reason: 'Take a student back to home'
    },
    {
      id: '4',
      name: 'Navya Jain',
      status: 'Rejected',
      phoneNumber: '9611093585',
      numberOfMembers: 0,
      vehicleNumber: 'UP78-7919',
      whomToMeet: 'Hemraj Meangiri',
      reason: 'Take a student back to home'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-purple-500 text-white';
      case 'approved':
        return 'bg-gray-500 text-white';
      case 'rejected':
        return 'bg-red-500 text-white';
      case 'entered':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const getActionButtonColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'approved':
        return 'bg-gray-600 hover:bg-gray-700';
      case 'rejected':
        return 'bg-red-600 hover:bg-red-700';
      case 'entered':
        return 'bg-green-600 hover:bg-green-700';
      default:
        return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  const filteredGatePassData = gatePassData.filter(item => {
    const matchesFilter = gatePassFilter === 'All' || item.status === gatePassFilter;
    const matchesSearch = item.name.toLowerCase().includes(gatePassSearch.toLowerCase()) ||
                         item.rollNumber.includes(gatePassSearch);
    return matchesFilter && matchesSearch;
  });

  const filteredVisitorData = visitorData.filter(item => {
    const matchesFilter = visitorFilter === 'All' || item.status === visitorFilter;
    const matchesSearch = item.name.toLowerCase().includes(visitorSearch.toLowerCase()) ||
                         item.phoneNumber.includes(visitorSearch);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Gate Pass History Section */}
       {/* Gate Pass History and Create Button */}
<div className="max-w-6xl mx-auto px-4 py-6 mt-10 bg-[#F5F5F7] p-6 rounded-lg">
  <div className="flex justify-between items-center mb-4">
    <div>
      <h2 className="text-2xl font-semibold">Gate Pass History and Create Gate Pass</h2>
      <p className="text-gray-500 text-sm">View and create Gate pass</p>
    </div>
    <button
      onClick={() => alert("Create Gate Pass Form Triggered")}
      className="bg-[#702DFF] text-white px-4 py-2 rounded-md text-sm font-medium"
    >
      Create Gate Pass
    </button>
  </div>

  {/* Filters and Search */}
  <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
    <div className="flex bg-black rounded-md overflow-hidden w-fit p-1 mb-6">
      {(['All', 'Pending', 'Approved'] as typeof gatePassFilter[]).map((tab) => (
        <button
          key={tab}
          className={`px-5 py-2 text-sm font-semibold rounded-md transition-colors duration-200 cursor-pointer ${
            gatePassFilter === tab ? "bg-[#702DFF] text-white" : "bg-black text-white"
          }`}
          onClick={() => setGatePassFilter(tab)}
        >
          {tab}
        </button>
      ))}
    </div>

    <div className="relative w-64">
      <input
        type="text"
        placeholder="Search Student..."
        value={gatePassSearch}
        onChange={(e) => setGatePassSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
    </div>
  </div>

  {/* Gate Pass List */}
 <div className="space-y-4">
  {filteredGatePassData.map((pass) => (
    <div
      key={pass.id}
      className="bg-white p-4 rounded-lg shadow-sm flex items-start justify-between"
    >
      {/* Avatar + Info */}
      <div className="flex gap-4">
        {/* Icon */}
       <div className="bg-gray-200 rounded-full p-3 w-fit">
        <img
          src="https://img.icons8.com/ios-filled/50/user.png"
          alt="avatar"
          className="w-6 h-6"
        />
      </div>

        {/* Text Content */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-bold text-base">{pass.name}</h3>
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                pass.status === "Approved"
                  ? "bg-purple-100 text-purple-700"
                  : pass.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {pass.status}
            </span>
          </div>

          <div className="text-sm text-[#1e1e1e] leading-5">
            <div className="flex flex-wrap gap-x-6">
              {/* <p><strong>Adm No:</strong> {pass.admNo}</p>
              <p><strong>Class:</strong> {pass.class}</p> */}
              <p><strong>Section:</strong> {pass.section}</p>
              <p><strong>Date:</strong> {pass.date}</p>
              <p><strong>Roll Number:</strong> {pass.rollNumber}</p>
            </div>

            <div className="flex flex-wrap gap-x-6 mt-1">
              {/* <p><strong>Parent's Name:</strong> {pass.parentName}</p> */}
              <p><strong>Parents Contact:</strong> {pass.parentContact}</p>
              {/* <p><strong>Parent Approval:</strong> {pass.parentApproval}</p> */}
            </div>

            <p className="mt-1">
              <strong>Reason:</strong> {pass.reason}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      {pass.status === "Approved" && (
        <div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-1.5 rounded-md">
            Exit
          </button>
        </div>
      )}
    </div>
  ))}
</div>


</div>


        {/* Visitor Approval and History Section */}
        <div className="max-w-6xl mx-auto px-4 py-6 mt-10 bg-[#F5F5F7] p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Visitor Approval and History</h2>
              <p className="text-gray-500 text-sm">Approve Visitor and View Visitor History</p>
            </div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-900">
              Manual Visitor Check-In
            </button>
          </div>

          {/* Date Picker */}
          <div className="relative mb-6">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
            >
              <Calendar className="w-4 h-4" />
              <span>{selectedDate}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showDatePicker && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-3">
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      const formattedDate = date.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      });
                      setSelectedDate(formattedDate);
                      setShowDatePicker(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Filters and Search */}
          <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
            <div className="flex bg-black rounded-md overflow-hidden w-fit p-1">
              {(['All', 'Entered', 'Rejected', 'Requested', 'Approved'] as VisitorStatus[]).map((tab) => (
                <button
                  key={tab}
                  className={`px-5 py-2 text-sm font-semibold rounded-md transition-colors duration-200 cursor-pointer ${
                    visitorFilter === tab ? "bg-[#702DFF] text-white" : "bg-black text-white"
                  }`}
                  onClick={() => setVisitorFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search Student..."
                value={visitorSearch}
                onChange={(e) => setVisitorSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Visitor List */}
          <div className="space-y-4">
            {filteredVisitorData.map((entry) => (
              <div
                key={entry.id}
                className="bg-white p-4 rounded-lg shadow-sm flex items-start justify-between"
              >
                <div className="flex gap-4">
                  <div className="bg-gray-200 rounded-full p-3 w-fit">
                    <img
                      src="https://img.icons8.com/ios-filled/50/user.png"
                      alt="avatar"
                      className="w-6 h-6"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-base">{entry.name}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </span>
                    </div>

                    <div className="text-sm text-[#1e1e1e] leading-5">
                      <div className="flex flex-wrap gap-x-6">
                        <p><strong>Phone:</strong> {entry.phoneNumber}</p>
                        <p><strong>Members:</strong> {entry.numberOfMembers}</p>
                        <p><strong>Vehicle:</strong> {entry.vehicleNumber}</p>
                      </div>
                      <div className="flex flex-wrap gap-x-6 mt-1">
                        <p><strong>Whom to Meet:</strong> {entry.whomToMeet}</p>
                        <p><strong>Reason:</strong> {entry.reason}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {entry.status === 'Pending' && (
                    <>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-1.5 rounded-md">
                        Approve
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-1.5 rounded-md">
                        Reject
                      </button>
                    </>
                  )}
                  {entry.status === 'Entered' && (
                    <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-1.5 rounded-md">
                      Edit
                    </button>
                  )}
                  {entry.status === 'Rejected' && (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-1.5 rounded-md">
                      Re-Approve
                    </button>
                  )}
                  {entry.status === 'Approved' && (
                    <button className="bg-gray-600 text-white text-sm font-semibold px-5 py-1.5 rounded-md cursor-not-allowed">
                      Approved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GatePassVisitorSystem;