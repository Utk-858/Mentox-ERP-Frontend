interface Props {
  selected: string[];
  onChange: (days: string[]) => void;
}

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DayToggle: React.FC<Props> = ({ selected, onChange }) => {
  const toggleDay = (day: string) => {
    const updated = selected.includes(day)
      ? selected.filter(d => d !== day)
      : [...selected, day];
    onChange(updated);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {weekdays.map(day => (
        <button
          key={day}
          onClick={() => toggleDay(day)}
          className={`px-3 py-1 text-sm rounded-full border 
            ${selected.includes(day) ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DayToggle;
