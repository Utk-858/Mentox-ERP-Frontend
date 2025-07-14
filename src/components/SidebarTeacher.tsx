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
  { icon: <Home size={16} />, label: "Dashboard", path: "/" },
  { icon: <BookOpen size={16} />, label: "Courses", path: "/Courses" },
  { icon: <ClipboardList size={16} />, label: "To-Do", path: "/To-Do" },
  { icon: <FileText size={16} />, label: "Quiz", path: "/Quiz" },
  { icon: <Play size={16} />, label: "Lectures", path: "/Lectures" },
  { icon: <BarChart size={16} />, label: "Progress", path: "/Progress" },
  { icon: <File size={16} />, label: "Grade", path: "/Grade" },
  { icon: <BookOpen size={16} />, label: "Library", path: "/Library" },
  { icon: <User size={16} />, label: "Profile", path: "/Profile" },
  { icon: <Settings size={16} />, label: "Settings", path: "/Settings" },
  { icon: <HelpCircle size={16} />, label: "Help & Support", path: "/Help/teacher" },
  { icon: <LogOut size={16} />, label: "Sign Out", path: "/SignOut" },
];

interface SidebarTeacherProps {
  activeLabel?: string; 
}

const SidebarTeacher: React.FC<SidebarTeacherProps> = ({ activeLabel }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentItem = navItems.find((item) => item.path === currentPath);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(currentItem?.label || "Lectures");

  const forceCollapsed = location.pathname === "/attempt"; // 👈 Add condition

  useEffect(() => {
    if (forceCollapsed) {
      setSidebarOpen(false);
    }
  }, [forceCollapsed]);

  const toggleSidebar = () => {
    if (!forceCollapsed) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <div className="flex flex-col max-h-screen">
      <aside
        className={`${
          sidebarOpen
            ? "w-64 ml-0 rounded-lg mt-3"
            : "w-16 ml-14 mt-7 rounded-lg h-[650px] bg-[#702DFF]"
        } transition-all duration-300 p-4 drop-shadow-lg hidden md:flex flex-col relative`}
      >
        {/* Logo and Toggle */}
        <div
          onClick={toggleSidebar}
          className={`flex items-center gap-4 mb-6 ${
            forceCollapsed ? "cursor-default" : "cursor-pointer"
          }`}
        >
          <div
            className={`flex flex-row items-center ${
              sidebarOpen ? "ml-7 mt-1 gap-3" : "gap-0"
            }`}
          >
            <img src="/dummy.png" alt="logo" className="w-8 h-8" />
            {sidebarOpen && !forceCollapsed && (
              <span className="text-2xl font-semibold text-center text-[#1F1F1F]">
                MENTOX
              </span>
            )}
          </div>
        </div>

        {/* Nav Items */}
        {sidebarOpen ? (
          <nav className="ml-6 flex flex-col mt-4 gap-3.5 text-[15px] overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.label}
                onClick={() => setActiveItem(item.label)}
              >
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  active={activeItem === item.label}
                />
              </NavLink>
            ))}
          </nav>
        ) : (
          <nav className="flex flex-col justify-between items-center h-full overflow-y-auto">
            <div className="flex flex-col gap-6 mt-4">
              {navItems.slice(0, navItems.length - 5).map((item) => (
                <NavLink
                  to={item.path}
                  key={item.label}
                  onClick={() => setActiveItem(item.label)}
                >
                  <button
                    className={`${
                      activeItem === item.label
                        ? "bg-white/20"
                        : "hover:bg-white/10"
                    } text-white p-2 rounded-lg transition cursor-pointer`}
                  >
                    {item.icon}
                  </button>
                </NavLink>
              ))}
            </div>

            {/* Logout at bottom */}
            <div className="mt-20">
              <NavLink
                to="/SignOut"
                onClick={() => setActiveItem("Sign Out")}
              >
                <button
                  className={`${
                    activeItem === "Sign Out"
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  } text-white p-2 rounded-lg transition`}
                >
                  {navItems.find((item) => item.label === "Sign Out")?.icon}
                </button>
              </NavLink>
            </div>
          </nav>
        )}
      </aside>
    </div>
  );
};

const NavItem = ({ icon, label, active }: any) => (
  <div
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
      active
        ? "bg-[#702DFF] text-white font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default SidebarTeacher;
