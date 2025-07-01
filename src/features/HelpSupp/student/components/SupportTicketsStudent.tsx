import React, { useState } from "react";
import { Filter, Search } from "lucide-react";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import type { FilePreview } from "./CreateTicketForm";
import CreateTicketForm from "./CreateTicketForm";


export interface attachment {
  name: string;
  type: "image" | "pdf" | "doc" | "other";
  url: string;
}

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: string;
  createdOn: string;
  to?: string;
  description?: string;
  attachments?: FilePreview[];
  createdBy?: string;
  rollNumber?: number;
  class?: number;
  section?: string;
  remarks?: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "admin";
  name: string;
  text: string;
  timestamp: string;
}

export const TicketDetailView: React.FC<{
  ticket: Ticket;
  onBack: () => void;
  onUpdate: (updatedTicket: Ticket) => void;
}> = ({ ticket, onBack, onUpdate }) => {
  const [remarks, setRemarks] = useState(ticket.remarks || "");
  const [status, setStatus] = useState(ticket.status);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const getAttachmentTypeLabel = (type: string) => {
    switch (type) {
      case "image":
        return "Image";
      case "pdf":
        return "PDF";
      case "doc":
        return "Documents";
      default:
        return "File";
    }
  };

  const getPreview = (attachment: FilePreview) => {
    if (attachment.type === "image") {
      return (
        <img
          src={attachment.url}
          alt={attachment.name}
          className="w-full h-16 object-cover rounded"
        />
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full h-16 bg-gray-200 rounded">
          <span className="text-sm font-medium text-gray-600">
            {attachment.type.toUpperCase()}
          </span>
        </div>
      );
    }
  };

  const [date, time, meridian] = ticket.createdOn?.split(" ") || [];

  // Unified update handler for both status and remarks
  const handleUpdate = () => {
    onUpdate({ ...ticket, status, remarks });
    setIsStatusDropdownOpen(false);
    onBack();
  };

  // When status is selected from dropdown, update local state and call handleUpdate
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setIsStatusDropdownOpen(false);
    // Immediately save status change and current remarks
    onUpdate({ ...ticket, status: newStatus, remarks });
  };

  return (
    <div className="bg-[#F5F5F7] p-6 rounded-lg shadow-md w-full max-w-6xl mx-auto my-8">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {ticket.id}
          </h1>
          <p className="text-gray-600 text-lg">{ticket.subject}</p>
        </div>

        <div className="relative flex">
          <button
            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            className="flex items-center bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {status}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isStatusDropdownOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
    <div className="py-1">
      <button
        onClick={() => {
          setStatus("In-Progress");
          setIsStatusDropdownOpen(false);
          onUpdate({ ...ticket, status: "In-Progress", remarks });
        }}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        In Progress
      </button>
      <button
        onClick={() => {
          setStatus("Closed");
          setIsStatusDropdownOpen(false);
          onUpdate({ ...ticket, status: "Closed", remarks });
        }}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        Closed
      </button>
      <button
        onClick={() => {
          setStatus("Open");
          setIsStatusDropdownOpen(false);
          onUpdate({ ...ticket, status: "Open", remarks });
        }}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        Open
      </button>
    </div>
  </div>
)}

          <button
            className="ml-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            onClick={handleUpdate}
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Ticket Information */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Ticket Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-700 text-sm mb-6">
        <p>
          <strong className="font-semibold">Category :</strong>{" "}
          {ticket.category}
        </p>
        <p className="flex items-center">
          <strong className="font-semibold">Priority :</strong>
          <span className="ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">
            {ticket.priority}
          </span>
        </p>
        <p>
          <strong className="font-semibold">Created Date :</strong>{" "}
          {date || "-"}
        </p>
        <p>
          <strong className="font-semibold">Created Time :</strong>{" "}
          {`${time || "-"} ${meridian || ""}`}
        </p>
        {ticket.createdBy && (
          <p className="col-span-1 md:col-span-2">
            <strong className="font-semibold">Created By :</strong>{" "}
            {ticket.createdBy}{" "}
            <strong className="ml-4 font-semibold">Roll Number :</strong>{" "}
            {ticket.rollNumber}{" "}
            <strong className="ml-4 font-semibold">Class :</strong>{" "}
            {ticket.class}{" "}
            <strong className="ml-4 font-semibold">Section :</strong>{" "}
            {ticket.section}
          </p>
        )}
      </div>

      {/* Attachments Section */}
      {ticket.attachments && ticket.attachments.length > 0 && (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Attachments
          </h3>
          <div className="flex flex-wrap gap-4 mb-6">
            {ticket.attachments.map((att, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between p-3 border border-gray-200 rounded-lg shadow-sm bg-white w-32 h-36 overflow-hidden"
              >
                <div className="flex-shrink-0 w-full h-20 flex items-center justify-center mb-2">
                  {getPreview(att)}
                </div>
                <p className="text-xs font-medium text-gray-800 truncate w-full text-center">
                  {att.name}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {getAttachmentTypeLabel(att.type)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
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

  // Store messages per user id or name
  const [messagesByUser, setMessagesByUser] = useState<Record<string, ChatMessage[]>>({});
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);

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
      createdBy: "Hemish",
      rollNumber: 3,
      class: 10,
      section: "A",
      remarks: "",
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
      createdBy: "Hemish",
      rollNumber: 3,
      class: 10,
      section: "A",
      remarks: "",
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

  // Handle updating ticket status/remarks
  const handleUpdateTicket = (updatedTicket: Ticket) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
    );
    setSelectedTicket(updatedTicket);
  };

  // Chat message handling per user
  React.useEffect(() => {
    if (selectedUser) {
      const key = selectedUser.id || selectedUser.name;
      setCurrentMessages(messagesByUser[key] || []);
    }
  }, [selectedUser, messagesByUser]);

  const handleSendMessage = () => {
    if (!input.trim() || !selectedUser) return;
    const key = selectedUser.id || selectedUser.name;
    const newMessage: ChatMessage = {
      id: uuidv4(),
      sender: "user",
      name: "You",
      text: input,
      timestamp: new Date().toLocaleString("en-IN"),
    };
    setMessagesByUser((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newMessage],
    }));
    setCurrentMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleAddTicket = (ticketData: {
    subject: string;
    category: string;
    priority: "Low" | "Medium" | "High";
    to: string;
    description: string;
    attachments?: FilePreview[];
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
      attachments: ticketData.attachments,
      remarks: "",
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
              activeTab === tab
                ? "bg-[#702DFF] text-white"
                : "bg-black text-white"
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
          <TicketDetailView
            ticket={selectedTicket}
            onBack={() => setSelectedTicket(null)}
            onUpdate={handleUpdateTicket}
          />
        ) : (
          <>
            <div className="bg-[#F5F5F7] p-6 rounded-lg">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-4">
                  Support Tickets
                </h2>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-3 text-sm rounded-lg bg-[#702DFF] text-white cursor-pointer"
                >
                  +Create Ticket
                </button>
              </div>

              <div className="flex flex-row justify-between mt-4">
                <div className="flex bg-black rounded-lg overflow-hidden w-fit p-1 mb-6">
                  {["All Status", "Open", "In-Progress", "Closed"].map((tab) => (
                    <button
                      key={tab}
                      className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${
                        statusTab === tab
                          ? "bg-[#702DFF] text-white"
                          : "text-white"
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
                        <td className="py-4 px-4 text-gray-700">
                          {ticket.status}
                        </td>
                        <td className="py-4 px-4 text-gray-500">
                          {ticket.createdOn}
                        </td>
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
            <h2 className="text-xl font-semibold">
              Chat with {selectedUser.name}
            </h2>
            <button
              className="text-red-500 text-sm"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
          <div className="bg-[#F5F5F7] p-4 rounded mb-4 max-h-64 overflow-y-auto space-y-3">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded w-fit text-sm ${
                  msg.sender === "user"
                    ? "bg-purple-200 ml-auto"
                    : "bg-purple-100"
                }`}
              >
                <p className="font-medium">{msg.name}</p>
                <p>{msg.text}</p>
                <p className="text-xs text-gray-500 text-right mt-1">
                  {msg.timestamp}
                </p>
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
          <p className="text-sm text-gray-500 mb-4">
            Connect with Teachers and Staff
          </p>
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
              .filter((u) =>
                u.name.toLowerCase().includes(search.toLowerCase())
              )
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
                          <span className="font-medium">Employee ID:</span>{" "}
                          {user.id}{" "}
                          <span className="font-medium ml-4">Department:</span>{" "}
                          {user.department}{" "}
                          <span className="font-medium ml-4">Designation:</span>{" "}
                          {user.designation}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Roll Number:</span>{" "}
                          {user.rollNumber}{" "}
                          <span className="font-medium ml-4">Class:</span>{" "}
                          {user.class}{" "}
                          <span className="font-medium ml-4">Section:</span>{" "}
                          {user.section}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-4 sm:mt-0 sm:ml-auto">
                    <div className="text-right text-sm text-gray-500">
                      <p className="font-semibold">Last Message</p>
                      <p>Date: {user.lastMessageDate}</p>
                    </div>
                    <div
                      className="flex gap-2"
                      onClick={() => setSelectedUser(user)}
                    >
                      <button className="text-purple-600 font-medium cursor-pointer">
                        View
                      </button>
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
