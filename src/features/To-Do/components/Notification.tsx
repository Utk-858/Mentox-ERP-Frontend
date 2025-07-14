import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  time: string;
}

const fallbackData: Notification[] = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  message: `Complete the <strong>UI design</strong> of Landing Page for <strong>FoodVentures</strong>.`,
  time: '2h',
}));

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('https://api.example.com/notifications');
        if (!res.ok) throw new Error('API error');
        const data: Notification[] = await res.json();
        setNotifications(data);
      } catch (err) {
        setNotifications(fallbackData);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="w-full max-w-md max-h-dvh bg-[#F5F5F7] rounded-xl p-4 font-sans shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Notifications</h2>
      <p className="text-sm text-gray-400 mb-3">Today</p>
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="bg-white p-4 rounded-lg shadow-sm flex items-start space-x-3"
          >
            <Bell className="w-5 h-5 text-gray-500 mt-1" />
            <div className="text-sm text-gray-700">
              <span dangerouslySetInnerHTML={{ __html: notif.message }} />
              <span className="text-gray-400 ml-1">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
