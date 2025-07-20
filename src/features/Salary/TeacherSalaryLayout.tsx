import React from 'react';
import { Outlet } from 'react-router-dom';
// Make sure this path is correct for your project structure
import SidebarTeacher from '../../components/SidebarTeacher'; 

const TeacherSalaryLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen"> 
      <aside className="h-screen sticky top-0">
        <SidebarTeacher activeLabel="Dashboard"/>
      </aside>
      <div className="flex-1 flex flex-col"> 
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherSalaryLayout;