import react from 'react';
import { useEffect } from 'react';

const Dashboard: react.FC = () => {
  useEffect(() => {
    document.title = 'Classroom Dashboard';
  }, []);

  return (
    <div className="p-4">
      Classroom Dashbboard
    </div>
  );
}
export default Dashboard;