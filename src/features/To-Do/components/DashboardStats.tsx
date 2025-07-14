interface StatCardProps {
  number: number
  title: string
  subtitle: string
  bgColor: string
  textColor?: string
}

function StatCard({ number, title, subtitle, bgColor, textColor = "#000000" }: StatCardProps) {
  const isHexBg = bgColor.startsWith("#");
  const isHexText = textColor.startsWith("#");

  const style: React.CSSProperties = {
    ...(isHexBg ? { backgroundColor: bgColor } : {}),
    ...(isHexText ? { color: textColor } : {}),
  };

  return (
    <div className=" bg-[#F5F5F7] rounded-lg border border-gray-200 p-4 flex items-center gap-4 min-w-0 flex-1">
      <div
        className={`rounded w-12 h-12 flex items-center justify-center font-bold text-xl ${
          isHexBg ? "" : bgColor
        } ${isHexText ? "" : textColor}`}
        style={style}
      >
        {number}
      </div>
      <div className="flex-1">
        <div className="text-gray-800 font-medium text-sm">{title}</div>
        <div className="text-gray-600 text-sm">{subtitle}</div>
      </div>
    </div>
  );
}

function DashboardStats() {
  const stats = [
    {
      number: 5,
      title: "Classes",
      subtitle: "Today",
      bgColor: "#D7F5E4",
      textColor: "#063123",
    },
    {
      number: 3,
      title: "Meetings",
      subtitle: "Today",
      bgColor: "#D7F5E4",
      textColor: "#063123",
    },
    {
      number: 5,
      title: "Pending",
      subtitle: "Tasks",
      bgColor: "#FFE3E3",
      textColor: "#7B0909",
    },
    {
      number: 2,
      title: "Assignments",
      subtitle: "to Grade",
      bgColor: "#FFE493",
      textColor: "#222222",
    },
  ];

  return (
    <div className="p-8  ">
      <div className="flex gap-8 ">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            number={stat.number}
            title={stat.title}
            subtitle={stat.subtitle}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardStats;
