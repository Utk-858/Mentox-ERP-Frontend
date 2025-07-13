export default function Component() {
  const stats = [
    {
      title: "Total Students",
      value: "35",
      subtitle: "In Class 10",
      imgSrc: "/icons/Icon.png",
    },
    {
      title: "Sections",
      value: "4",
      subtitle: "",
      imgSrc: "/icons/Frame 1171275857.png",
    },
    {
      title: "Class Capacity",
      value: "130",
      subtitle: "Students",
      imgSrc: "/icons/Frame 1171275858.png",
    },
    {
      title: "Gender Ratio",
      value: "2:1",
      subtitle: "Male : Female",
      imgSrc: "/icons/Frame 1171275858 (1).png",
    },
  ];

  return (
    <div className="w-full max-w-screen mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100 flex flex-row-reverse items-center justify-between"
          >
            <div className="flex-shrink-0 ml-4">
              <img
                src={stat.imgSrc}
                alt={stat.title}
                className="w-14 h-14 object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              {stat.subtitle && (
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
