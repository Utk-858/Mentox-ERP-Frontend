import { useState, useEffect } from "react";
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
import { NavLink, useLocation } from "react-router-dom";

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
  { icon: <LogOut size={16} />, label: "Sign Out" },
];

const Sidebar = () => {
  const location = useLocation();

  // Pages where sidebar must be collapsed
  const forceCollapsePaths = [
    "/attempt",
    
  ];

  const shouldForceCollapse = forceCollapsePaths.includes(location.pathname.toLowerCase());

  const [sidebarOpen, setSidebarOpen] = useState(!shouldForceCollapse);
  const [activeItem, setActiveItem] = useState("Lectures");

  useEffect(() => {
    // Auto-collapse sidebar on route change
    if (shouldForceCollapse) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (!shouldForceCollapse) {
      setSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <aside
        className={`${
          sidebarOpen
            ? "w-64 ml-0 rounded-lg"
            : "w-16 ml-8 mt-7 rounded-lg h-[500px] bg-[#702DFF] shadow-[0_10px_30px_rgba(112,45,255,0.8)]"
        } transition-all duration-300 p-4 hidden md:flex flex-col relative`}
      >
        {/* Logo and Toggle */}
        <div
          onClick={toggleSidebar}
          className={`flex items-center gap-4 cursor-pointer mb-6 ${
            shouldForceCollapse ? "pointer-events-none opacity-50" : ""
          }`}
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
          <nav className="ml-6 flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
            {navItems.map((item) => (
              <NavLink to={`/${item.label}`} key={item.label}>
                <NavItem
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
              {navItems.slice(0, navItems.length - 7).map((item) => (
                <button
                  key={item.label}
                  className="text-white hover:bg-white/10 p-2 rounded-lg transition"
                  onClick={() => setActiveItem(item.label)}
                >
                  {item.icon}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <button
                className="text-white hover:bg-white/10 p-2 rounded-lg transition"
                onClick={() => setActiveItem("Sign Out")}
              >
                {navItems.find((item) => item.label === "Sign Out")?.icon}
              </button>
            </div>
          </nav>
        )}
      </aside>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: any) => (
  <div
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
      active
        ? "bg-[#702DFF] text-white font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
