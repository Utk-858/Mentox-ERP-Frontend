import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  type: 'meeting' | 'class' | 'lunch';
  room: string;
  duration: string;
  avatar: string;
  date: string;
}

interface CalendarDay {
  date: Date;
  dayName: string;
  isToday: boolean;
  isSelected: boolean;
}

const CalenderSchedule: React.FC = () => {
  const [baseDate, setBaseDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(false);

  const mockScheduleData: ScheduleItem[] = [
    {
      id: '1',
      time: '10:45 AM',
      title: 'Parent Meeting - Sarah Thompson',
      subtitle: 'Class 1B',
      type: 'meeting',
      room: 'Room Counseling Room',
      duration: 'Duration: 30 mins',
      avatar: 'SA',
      date: '2025-06-16'
    },
    {
      id: '2',
      time: '11:30 AM',
      title: 'Chemistry Class',
      subtitle: 'Class 1B',
      type: 'class',
      room: 'Room 3/4',
      duration: 'Duration: 50 mins',
      avatar: 'CH',
      date: '2025-06-16'
    },
    {
      id: '3',
      time: '12:45 PM',
      title: 'Lunch Break',
      subtitle: 'Class 1B',
      type: 'lunch',
      room: 'Room 3/4',
      duration: 'Duration: 30 mins',
      avatar: 'LU',
      date: '2025-06-16'
    },
    {
      id: '4',
      time: '4:30 PM',
      title: 'Student Counseling - Alex Johnson',
      subtitle: 'Class 1B',
      type: 'meeting',
      room: 'Room Counseling Room',
      duration: 'Duration: 30 mins',
      avatar: 'AJ',
      date: '2025-06-16'
    },
    {
      id: '5',
      time: '2:15 PM',
      title: 'Maths Class',
      subtitle: 'Class 1B',
      type: 'class',
      room: 'Room 3/4',
      duration: 'Duration: 50 mins',
      avatar: 'MA',
      date: '2025-06-16'
    }
  ];

  const fetchScheduleData = async (date: Date): Promise<ScheduleItem[]> => {
    const dateString = date.toISOString().split('T')[0];
    try {
      setLoading(true);
      const response = await fetch(`/api/schedule/${dateString}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      if (data.success) return data.data;
      throw new Error('API response error');
    } catch (err) {
      return mockScheduleData.filter((item) => item.date === dateString);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleData(selectedDate).then((data) => {
      const dateStr = selectedDate.toISOString().split('T')[0];
      setScheduleItems(data.filter((item) => item.date === dateStr));
    });
  }, [selectedDate]);

  const getWeekDays = (date: Date): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const start = new Date(date);
    const dayOffset = start.getDay();
    start.setDate(start.getDate() - dayOffset);

    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const today = new Date();
      days.push({
        date: d,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: d.toDateString() === today.toDateString(),
        isSelected: d.toDateString() === selectedDate.toDateString()
      });
    }
    return days;
  };

  const changeWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + (direction === 'next' ? 7 : -7));
    setBaseDate(newDate);
  };

  const formatSelectedDate = () =>
    selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

  const getItemColors = (type: string) => {
    switch (type) {
      case 'meeting':
        return {
          background: 'bg-green-100',
          avatar: 'bg-green-600',
          badge: 'bg-green-500'
        };
      case 'class':
        return {
          background: 'bg-blue-100',
          avatar: 'bg-blue-600',
          badge: 'bg-blue-500'
        };
      case 'lunch':
        return {
          background: 'bg-yellow-100',
          avatar: 'bg-yellow-600',
          badge: 'bg-yellow-500'
        };
      default:
        return {
          background: 'bg-gray-100',
          avatar: 'bg-gray-600',
          badge: 'bg-gray-500'
        };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'Meeting';
      case 'class':
        return 'Class';
      case 'lunch':
        return 'Break';
      default:
        return 'Event';
    }
  };

  return (
    <div className="w-lg h-[83vh] xl:h-[120vh] ml-10 rounded-xl bg-[#F5F5F7] px-10 pb-3 pt-0 overflow-y-auto scrollbar-hide ">
      {/* Header */}
      <div className="flex items-center mt-5 justify-between px-4 py-3  bg-[#F5F5F7]">
        <ChevronLeft
          className="cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={() => changeWeek('prev')}
          size={20}
        />
        <h2 className="text-2xl font-bold text-gray-800">
          {baseDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
          })}
        </h2>
        <ChevronRight
          className="cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={() => changeWeek('next')}
          size={20}
        />
      </div>

      {/* Week Days */}
      <div className="flex justify-between px-4 py-3 bg-[#F5F5F7]">
        {getWeekDays(baseDate).map((day, i) => (
          <div
            key={i}
            onClick={() => setSelectedDate(day.date)}
            className={`text-center cursor-pointer p-1 rounded transition-colors ${
              day.isSelected
                ? 'bg-purple-100 text-purple-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="text-xs font-medium text-gray-600">{day.dayName}</div>
            <div
              className={`text-sm font-semibold ${
                day.isToday ? 'text-purple-600' : 'text-gray-800'
              }`}
            >
              {day.date.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Header */}
      <div className="px-4 py-3 bg-[#F5F5F7] flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Today's Schedule</h3>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      {/* Schedule Items */}
      <div className="bg-[#F5F5F7] px-4 py-3 overflow-y-auto scrollbar-hide max-h-[40vh] xl:max-h-[90vh]">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        ) : scheduleItems.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-8">No events today</p>
        ) : (
          <div className="space-y-3">
            {scheduleItems.map((item) => {
              const colors = getItemColors(item.type);
              return (
                <div
                  key={item.id}
                  className={`${colors.background} p-4 rounded-lg border-l-4 border-${colors.badge.replace('bg-', '').replace('-500', '-600')}`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`${colors.avatar} w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}
                    >
                      {item.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-gray-800">{item.time}</span>
                        <span
                          className={`${colors.badge} text-white text-xs px-2 py-1 rounded-full font-medium`}
                        >
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>{item.subtitle}</div>
                        <div>
                          {item.room} • {item.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderSchedule;
