import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../../../components/SearchBar';
import AttendanceCard from '../components/Librarian/AttendanceCard';
import StatsCard from '../components/Librarian/StatsCard';
import { Book, IndianRupee, Cloud } from 'lucide-react';
import DateTimeCard from '../components/Librarian/DateTimeCard';
import ActionButtons from '../components/Librarian/ActionButtons';
import DailyBookActivityChart from '../components/Librarian/DailyBookActivityChart';
import BarChartCard from '../components/Librarian/BarChartCard';
import BookList from '../components/Librarian/BookList';
import BooksIssued from '../components/Librarian/BookIssued';
import OverdueBookList from '../components/Librarian/OverdueBookList';


interface StatData {
  title: string;
  value: number;
  statLabel: string;
  statChange: string;
  isPositive: boolean;
  icon: React.ReactElement;
}

const MOCK_STATS: StatData[] = [
  {
    title: 'Total Book Issued',
    value: 352,
    statLabel: 'new books added!',
    statChange: '+2',
    isPositive: true,
    icon: <Book size={20} />,
  },
  {
    title: 'Total Fine Collected',
    value: 360,
    statLabel: 'Less than yesterday',
    statChange: '-10%',
    isPositive: false,
    icon: <IndianRupee size={20} />,
  },
  {
    title: 'Pending Fines',
    value: 30,
    statLabel: 'Increase than yesterday',
    statChange: '+3%',
    isPositive: false,
    icon: <Cloud size={20} />,
  },
];

const LibraryLibrarian: React.FC = () => {
  const [stats, setStats] = useState<StatData[]>([]);

  useEffect(() => {
    fetch('/api/library-stats') // Replace with actual API
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        // Transform if needed — e.g., add icon mapping
        interface ApiStatData {
          title: string;
          value: number;
          statLabel: string;
          statChange: string;
          isPositive: boolean;
          icon: string;
        }

        const withIcons = (data as ApiStatData[]).map((item) => {
          let icon: React.ReactElement;
          switch (item.icon) {
            case 'book':
              icon = <Book size={20} />;
              break;
            case 'rupee':
              icon = <IndianRupee size={20} />;
              break;
            case 'cloud':
              icon = <Cloud size={20} />;
              break;
            default:
              icon = <Book size={20} />;
          }
          return { ...item, icon };
        });
        setStats(withIcons);
      })
      .catch(() => setStats(MOCK_STATS));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mt-4">
        <SearchBar />
        <div className="flex ml-10 mt-10 flex-wrap gap-6 px-4 py-2">
          <AttendanceCard />
          <div className='flex  w-[70%] h-40 gap-5'>
            {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              statLabel={stat.statLabel}
              statChange={stat.statChange}
              isPositive={stat.isPositive}
              icon={stat.icon}
            />
          ))}
            </div>
            
            <DateTimeCard/>
            <div className='flex mt-[-2rem] w-full max-w-3xl gap-5'>
              <ActionButtons/>
              <BarChartCard></BarChartCard>
            </div>
            <div className='w-[70%] '><DailyBookActivityChart></DailyBookActivityChart></div>
            <div className='flex gap-4'>
            <BookList></BookList>
            <BooksIssued></BooksIssued>
            </div>
            <OverdueBookList></OverdueBookList>
            
        </div>
      </div>
    </div>
  );
};

export default LibraryLibrarian;
