interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const TimePicker: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="time"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border rounded-md px-2 py-1"
      />
    </div>
  );
};

export default TimePicker;
