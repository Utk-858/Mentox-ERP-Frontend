import React, { useState } from "react";
import { Filter, Search } from "lucide-react";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import CreateTicketForm from "./CreateTicketForm";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: string;
  createdOn: string;
   to?: string;
  description?: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "admin";
  name: string;
  text: string;
  timestamp: string;
}

const TicketDetailView: React.FC<{
  ticket: Ticket;
  onBack: () => void;
}> = ({ ticket, onBack }) => {
  const [remarks, setRemarks] = useState("");

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <button onClick={onBack} className="bg-[#702DFF] text-white px-4 py-2 rounded mb-4">
        Back
      </button>

      <h2 className="text-xl font-bold mb-1">{ticket.id}</h2>
      <p className="text-gray-700 mb-4">{ticket.subject}</p>

      <div className="text-sm space-y-2 mb-6">
        <p><strong>Category:</strong> {ticket.category}</p>
        <p>
          <strong>Priority:</strong>{" "}
          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">
            {ticket.priority}
          </span>
        </p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Created On:</strong> {ticket.createdOn}</p>
      </div>

      <textarea
        className="w-full h-28 border p-3 rounded mb-4"
        placeholder="Add remarks..."
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
      <button className="bg-black text-white px-6 py-2 rounded hover:opacity-90">
        Save Response
      </button>
    </div>
  );
};

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tickets" | "chat">("tickets");
  const [statusTab, setStatusTab] = useState<string>("All Status");
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState("All Category");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

 
  const [showCreateForm, setShowCreateForm] = useState(false);


  const initialTickets: Ticket[] = [
   {
    id: "TKT-001",
    subject: "Unable to Access Lecture Materials",
    category: "Technical Issue",
    priority: "Low",
    status: "In-Progress",
    createdOn: "6/15/25 10:15 AM",
    to: "Admin",
    description: "I can't access the lecture materials for Module 3.",
  },
  {
    id: "TKT-002",
    subject: "Incorrect Billing Amount",
    category: "Billing",
    priority: "Medium",
    status: "Open",
    createdOn: "6/16/25 2:45 PM",
    to: "Support",
    description: "My invoice is showing the wrong amount.",
  },
  ];

  const users = [
    {
      name: "Dr. Johnson",
      role: "Teacher",
      id: "Emp234",
      department: "Chemistry",
      designation: "PGT",
      lastMessageDate: "6/20/25",
    },
    {
      name: "Hemish Morgan",
      role: "Student",
      rollNumber: 4,
      class: 6,
      section: "A",
      lastMessageDate: "6/20/25",
    },
  ];

  const getPriorityColor = (priority: Ticket["priority"]): string => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "High":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };
 const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const filteredTickets = tickets.filter(
  (ticket) =>
    ticket.subject.toLowerCase().includes(search.toLowerCase()) &&
    (statusTab === "All Status" || ticket.status === statusTab) &&
    (category === "All Category" || ticket.category === category)
);


  const handleSendMessage = () => {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: uuidv4(),
      sender: "user",
      name: "You",
      text: input,
      timestamp: new Date().toLocaleString("en-IN"),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };



  
  const handleAddTicket = (ticketData: {
    subject: string;
    category: string;
    priority: "Low" | "Medium" | "High";
    to: string;
    description: string;
  }) => {
    const newTicket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: ticketData.subject,
      category: ticketData.category,
      priority: ticketData.priority,
      status: "Open",
      createdOn: new Date().toLocaleString("en-IN"),
      to: ticketData.to,
      description: ticketData.description,
    };
    setTickets([newTicket, ...tickets]);
    setShowCreateForm(false);
  };


  return (
    <div className="p-6 w-full max-w-6xl">
      <h1 className="text-2xl font-bold mb-2">Help & Support</h1>

      {/* Tabs */}
      <div className="flex bg-black rounded-md overflow-hidden w-fit p-1 mb-6">
        {["tickets", "chat"].map((tab) => (
          <button
            key={tab}
            className={`px-5 py-2 text-sm font-semibold rounded-md transition-colors duration-200 cursor-pointer ${
              activeTab === tab ? "bg-[#702DFF] text-white" : "bg-black text-white"
            }`}
            onClick={() => {
              setActiveTab(tab as any);
              setSelectedTicket(null);
              setSelectedUser(null);
            }}
          >
            {tab === "tickets" ? "Support Tickets" : "Chat Support"}
          </button>
        ))}
      </div>


      {showCreateForm && (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-none">
    <div className="relative max-h-[90vh] overflow-y-auto">
          <CreateTicketForm
              onSubmit={handleAddTicket}
              onCancel={() => setShowCreateForm(false)}
            />
    </div>
  </div>
)}


      {/* Tickets Section */}
      {activeTab === "tickets" ? (
        selectedTicket ? (
          <TicketDetailView ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />
        ) : (
          <>
            <div className="bg-[#F5F5F7] p-6 rounded-lg">

                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-4">Support Tickets</h2>
                    <button
                    onClick={() => setShowCreateForm(true)}
                     className="px-3 text-sm rounded-lg bg-[#702DFF] text-white cursor-pointer">+Create Ticket</button>
                </div>
              
              <div className="flex flex-row justify-between mt-4">
                <div className="flex bg-black rounded-lg overflow-hidden w-fit p-1 mb-6">
                  {["All Status", "Open", "In-Progress", "Closed"].map((tab) => (
                    <button
                      key={tab}
                      className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${
                        statusTab === tab ? "bg-[#702DFF] text-white" : "text-white"
                      }`}
                      onClick={() => setStatusTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-white" />
                    <input
                      type="text"
                      placeholder="Search User"
                      className="pl-10 pr-4 py-1.5 bg-black text-white rounded-md border focus:outline-none"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-6">
                    <Filter className="absolute left-3 top-3 h-4 w-4 text-white" />
                    <select
                      className="pl-10 pr-4 py-2 bg-black text-gray-50 rounded-md border border-gray-300 focus:outline-none"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>All Category</option>
                      <option>Technical Issue</option>
                      <option>Billing</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tickets Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left bg-white rounded-lg">
                  <thead className="text-gray-500 border-b">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Ticket ID</th>
                      <th className="py-3 px-4 font-semibold">Subject</th>
                      <th className="py-3 px-4 font-semibold">Category</th>
                      <th className="py-3 px-4 font-semibold">Priority</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold">Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-none hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <td className="py-4 px-4 font-bold">{ticket.id}</td>
                        <td className="py-4 px-4">{ticket.subject}</td>
                        <td className="py-4 px-4">{ticket.category}</td>
                        <td className="py-4 px-4">
                          <span
                            className={classNames(
                              "text-xs px-3 py-1 rounded-full font-semibold",
                              getPriorityColor(ticket.priority)
                            )}
                          >
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{ticket.status}</td>
                        <td className="py-4 px-4 text-gray-500">{ticket.createdOn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )
      ) : selectedUser ? (
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Chat with {selectedUser.name}</h2>
            <button className="text-red-500 text-sm" onClick={() => setSelectedUser(null)}>
              Close
            </button>
          </div>
          <div className="bg-[#F5F5F7] p-4 rounded mb-4 max-h-64 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded w-fit text-sm ${
                  msg.sender === "user" ? "bg-purple-200 ml-auto" : "bg-purple-100"
                }`}
              >
                <p className="font-medium">{msg.name}</p>
                <p>{msg.text}</p>
                <p className="text-xs text-gray-500 text-right mt-1">{msg.timestamp}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="w-full border rounded px-3 py-2 text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#F5F5F7] p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Chat Support</h2>
          <p className="text-sm text-gray-500 mb-4">Connect with Teachers and Staff</p>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white" />
            <input
              type="text"
              placeholder="Search User"
              className="pl-10 pr-4 py-2 bg-black text-white rounded-md border border-gray-300 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            {users
              .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
              .map((user, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-md p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                      👤
                    </div>
                    <div>
                      <p className="font-semibold flex items-center gap-2">
                        {user.name}
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            user.role === "Teacher"
                              ? "bg-yellow-400 text-white"
                              : "bg-purple-600 text-white"
                          }`}
                        >
                          {user.role}
                        </span>
                      </p>
                      {user.role === "Teacher" ? (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Employee ID:</span> {user.id}{" "}
                          <span className="font-medium ml-4">Department:</span> {user.department}{" "}
                          <span className="font-medium ml-4">Designation:</span> {user.designation}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Roll Number:</span> {user.rollNumber}{" "}
                          <span className="font-medium ml-4">Class:</span> {user.class}{" "}
                          <span className="font-medium ml-4">Section:</span> {user.section}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 sm:mt-0 sm:ml-auto">
                    <div className="text-right text-sm text-gray-500">
                      <p className="font-semibold">Last Message</p>
                      <p>Date: {user.lastMessageDate}</p>
                    </div>
                    <div className="flex gap-2" onClick={() => setSelectedUser(user)}>
                      <button className="text-purple-600 font-medium cursor-pointer">View</button>
                      <button className="px-3 py-1 bg-gray-400 text-white text-sm rounded cursor-pointer">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
