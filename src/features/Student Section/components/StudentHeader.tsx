import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { label: "Personal Details", path: "/Student/personal-details" },
  { label: "Academic Info", path: "/Student/academic-info" },
  { label: "Additional Info", path: "/Student/additional-info" },
];

export default function StudentHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2 bg-black p-1 w-full xl:w-[33vw] rounded-lg mb-6">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-center transition-colors ${
              isActive ? "bg-[#702DFF] text-white" : "text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
