import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type TimeRange = 'Daily' | 'Weekly' | 'Monthly' | 'Annually';

interface CategoryDemand {
  category: string;
  demand: number; // percentage (0–100)
}

const MOCK_DATA: CategoryDemand[] = [
  { category: 'Fiction', demand: 60 },
  { category: 'Non-Fiction', demand: 30 },
  { category: 'Science & Technology', demand: 80 },
  { category: 'Academic & Reference', demand: 50 },
  { category: 'History', demand: 65 },
  { category: 'Arts', demand: 85 },
  { category: 'Moral Education', demand: 25 },
];

const BarChartCard: React.FC = () => {
  const [range, setRange] = useState<TimeRange>('Weekly');
  const [data, setData] = useState<CategoryDemand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/library/book-demand?range=${range.toLowerCase()}`) // Example endpoint
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        console.error(err);
        setData(MOCK_DATA); // fallback
      })
      .finally(() => setLoading(false));
  }, [range]);

  return (
    <div className="bg-gray-100 rounded-xl p-4 shadow-md w-full w-max-sm h-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Book Demand by Category</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value as TimeRange)}
          className="bg-indigo-500 text-white text-sm font-medium rounded-md px-3 py-1 focus:outline-none"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Annually">Annually</option>
        </select>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400 text-center py-10">Loading chart...</div>
      ) : (
        <div className="overflow-x-auto">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={data}
              height={300}
              margin={{ top: 10, right: 30, left: 10, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="category"
                scale="band"
                interval={0}
                angle={-25}
                textAnchor="end"
                fontSize={10}
                tickFormatter={(label) =>
                  label.length > 12 ? label.slice(0, 12) + '....' : label
                }
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip formatter={(value: any) => `${value}%`} />
              <Bar
                dataKey="demand"
                fill="#7c3aed"
                barSize={20}
                radius={[30, 28, 38, 58]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BarChartCard;
