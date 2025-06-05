import {  useState } from "react";

import {
  Home,
  BookOpen,
  ClipboardList,
  HelpCircle,
  LogOut,
  Play,
  User,
  BarChart,
  Settings,
  FileText,
  File,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: <Home size={16} />, label: "Dashboard" },
  { icon: <BookOpen size={16} />, label: "Courses" },
  { icon: <ClipboardList size={16} />, label: "To-Do" },
  { icon: <FileText size={16} />, label: "Quiz" },
  { icon: <Play size={16} />, label: "Lectures" },
  { icon: <BarChart size={16} />, label: "Progress" },
  { icon: <File size={16} />, label: "Grade" },
  { icon: <BookOpen size={16} />, label: "Library" },
  { icon: <User size={16} />, label: "Profile" },
  { icon: <Settings size={16} />, label: "Settings" },
  { icon: <HelpCircle size={16} />, label: "Help & Support" },
  { icon: <LogOut size={16} />, label: "Sign-Out" },
];
const Sidebar = () => {


     const [sidebarOpen, setSidebarOpen] = useState(true);
      const [activeItem, setActiveItem] = useState("Lectures");
    
      const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    
  return (
    <div className="flex flex-col">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen
              ? "w-64 ml-0 rounded-lg"
              : "w-16 ml-8 mt-7 rounded-lg h-[500px] bg-[#702DFF] shadow-[0_10px_30px_rgba(112,45,255,0.8)]"
          } transition-all duration-300 p-4 drop-shadow-lg shadow-2xl hidden md:flex flex-col relative `}
        >
          {/* Logo and Toggle */}
          <div
            onClick={toggleSidebar}
            className="flex items-center gap-4 cursor-pointer mb-6"
          >
            <div
              className={`flex flex-row items-center ${
                sidebarOpen ? "ml-7 mt-10 gap-6" : "gap-0"
              }`}
            >
              <img src="/dummy.png" alt="logo" className="w-8 h-8" />
              {sidebarOpen && (
                <span className="text-2xl font-semibold text-[#1F1F1F]">
                  MENTOX
                </span>
              )}
            </div>
          </div>

          {/* Nav Items */}
          {sidebarOpen ? (
            <nav className="ml-6 flex flex-col gap-3 overflow-y-auto">
              {navItems.map((item) => (
                <NavLink to={`/${item.label}`}>
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={activeItem === item.label}
                  onClick={() => setActiveItem(item.label)}
                />
                </NavLink>
              ))}
            </nav>
          ) : (
            <nav className="flex flex-col justify-between items-center h-full">
              <div className="flex flex-col gap-6 mt-4">
                 {navItems.slice(0, navItems.length - 7).map((item, index) => (
      <NavLink
        to={`/${item.label.toLowerCase().replace(/\s+/g, '-')}`}
        key={index}
        className={({ isActive }) =>
          `p-2 rounded-lg transition text-white hover:bg-white/10 ${
            isActive ? "bg-white/20" : ""
          }`
        }
        onClick={() => setActiveItem(item.label)}
      >
        {item.icon}
      </NavLink>
    ))}
              </div>

              {/* Logout at bottom */}
              <div className="mb-4">

                <NavLink to={`/Sign-Out`}>
                <button
                  className="text-white hover:bg-white/10 p-2 rounded-lg transition"
                  onClick={() => setActiveItem("Sign-Out")}
                >
                  {navItems.find((item) => item.label === "Sign-Out")?.icon}
                </button>
                </NavLink>
              </div>
            </nav>
          )}
        </aside>

        {/* Promo Section */}
        {sidebarOpen && (
          <div className="w-64 mt-7 p-4 bg-[#702DFF] rounded-xl text-white text-center space-y-2 mx-1 flex flex-col items-center">
            <img src="/dummy.png" alt="promo" />
            <div className="font-bold text-lg">MENTOX</div>
            <p className="text-xs">Get access to all features on Mentox</p>
            <button className="bg-white text-[#702DFF] font-semibold text-sm py-1 px-3 rounded-full">
              Get Pro
            </button>
          </div>
        )}
      </div>
  )
}


const NavItem = ({ icon, label, active, onClick }: any) => (
  <a
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
      active
        ? "bg-[#702DFF] text-white font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </a>
);

export default Sidebar