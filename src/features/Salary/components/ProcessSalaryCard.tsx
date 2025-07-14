import React from 'react';
import { Link } from 'react-router-dom';

const ProcessSalaryCard: React.FC = () => {
  // FIX: I've carefully adjusted the x/y positions, scale, and opacity of each
  // star group to create a more aesthetically pleasing, non-overlapping pattern.
  const starPatternUrl = "data:image/svg+xml,%3csvg width='250' height='160' viewBox='0 0 250 160' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg transform='translate(175, 8) scale(1.1)' opacity='0.7'%3e%3cpath d='M35.5 0C35.5 0 37.4587 17.2523 45.0882 24.452C52.7177 31.6516 71 33.5 71 33.5C71 33.5 52.7177 35.3484 45.0882 42.548C37.4587 49.7477 35.5 67 35.5 67C35.5 67 33.5413 49.7477 25.9118 42.548C18.2823 35.3484 0 33.5 0 33.5C0 33.5 18.2823 31.6516 25.9118 24.452C33.5413 17.2523 35.5 0 35.5 0Z' fill='%23A0A0A0'/%3e%3c/g%3e%3cg transform='translate(115, 60) scale(0.9)' opacity='0.5'%3e%3cpath d='M28.5 0C28.5 0 30.0725 14.4198 36.1976 20.4375C42.3227 26.4551 57 28 57 28C57 28 42.3227 29.5449 36.1976 35.5625C30.0725 41.5802 28.5 56 28.5 56C28.5 56 26.9275 41.5802 20.8024 35.5625C14.6773 29.5449 0 28 0 28C0 28 14.6773 26.4551 20.8024 20.4375C26.9275 14.4198 28.5 0 28.5 0Z' fill='%23A0A0A0'/%3e%3c/g%3e%3cg transform='translate(205, 110) scale(0.7)' opacity='0.4'%3e%3cpath d='M20.5 0C20.5 0 21.6311 10.2999 26.0369 14.5982C30.4426 18.8965 41 20 41 20C41 20 30.4426 21.1035 26.0369 25.4018C21.6311 29.7001 20.5 40 20.5 40C20.5 40 19.3689 29.7001 14.9631 25.4018C10.5574 21.1035 0 20 0 20C0 20 10.5574 18.8965 14.9631 14.5982C19.3689 10.2999 20.5 0 20.5 0Z' fill='%23A0A0A0'/%3e%3c/g%3e%3cg transform='translate(90, 15) scale(0.8)' opacity='0.4'%3e%3cpath d='M20 0C20 0 21.1035 10.0424 25.4018 14.2332C29.7001 18.4241 40 19.5 40 19.5C40 19.5 29.7001 20.5759 25.4018 24.7668C21.1035 28.9576 20 39 20 39C20 39 18.8965 28.9576 14.5982 24.7668C10.2999 20.5759 0 19.5 0 19.5C0 19.5 10.2999 18.4241 14.5982 14.2332C18.8965 10.0424 20 0 20 0Z' fill='%23A0A0A0'/%3e%3c/g%3e%3cg transform='translate(140, 115) scale(1)' opacity='0.6'%3e%3cpath d='M24 0C24 0 25.3242 23.6897 30.4822 33.5758C35.6402 43.4619 48 46 48 46C48 46 35.6402 48.5381 30.4822 58.4242C25.3242 68.3103 24 92 24 92C24 92 22.6758 68.3103 17.5178 58.4242C12.3598 48.5381 0 46 0 46C0 46 12.3598 43.4619 17.5178 33.5758C22.6758 23.6897 24 0 24 0Z' fill='%23A0A0A0'/%3e%3c/g%3e%3cg transform='translate(220, 65) scale(0.8)' opacity='0.5'%3e%3cpath d='M20.5 0C20.5 0 21.6311 10.2999 26.0369 14.5982C30.4426 18.8965 41 20 41 20C41 20 30.4426 21.1035 26.0369 25.4018C21.6311 29.7001 20.5 40 20.5 40C20.5 40 19.3689 29.7001 14.9631 25.4018C10.5574 21.1035 0 20 0 20C0 20 10.5574 18.8965 14.9631 14.5982C19.3689 10.2999 20.5 0 20.5 0Z' fill='%23A0A0A0'/%3e%3c/g%3e%3cg transform='translate(80, 95) scale(0.7)' opacity='0.3'%3e%3cpath d='M20 0C20 0 21.1035 10.0424 25.4018 14.2332C29.7001 18.4241 40 19.5 40 19.5C40 19.5 29.7001 20.5759 25.4018 24.7668C21.1035 28.9576 20 39 20 39C20 39 18.8965 28.9576 14.5982 24.7668C10.2999 20.5759 0 19.5 0 19.5C0 19.5 10.2999 18.4241 14.5982 14.2332C18.8965 10.0424 20 0 20 0Z' fill='%23A0A0A0'/%3e%3c/g%3e%3cg transform='translate(125, 10) scale(0.6)' opacity='0.2'%3e%3cpath d='M28.5 0C28.5 0 30.0725 14.4198 36.1976 20.4375C42.3227 26.4551 57 28 57 28C57 28 42.3227 29.5449 36.1976 35.5625C30.0725 41.5802 28.5 56 28.5 56C28.5 56 26.9275 41.5802 20.8024 35.5625C14.6773 29.5449 0 28 0 28C0 28 14.6773 26.4551 20.8024 20.4375C26.9275 14.4198 28.5 0 28.5 0Z' fill='%23A0A0A0'/%3e%3c/g%3e%3c/svg%3e";

  return (
    <div 
      className="relative p-6 rounded-xl shadow-lg bg-[#F5F5F7] text-[#18181A] overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${starPatternUrl}")`,
          backgroundSize: 'auto 100%', 
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '100% 50%',
          opacity: 0.6
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#18181A]">
            Salary Management
          </p>
          <h3 className="text-2xl font-bold mt-1 text-[#702DFF]">Process Salary</h3>
          <p className="text-sm mt-2 text-[#7A7A7B] max-w-xs uppercase">
            Manage and process monthly salaries for all employees.
          </p>
        </div>
        
        <Link
          to="/salary/process"
          className="mt-8 bg-[#18181A] text-white font-semibold py-2.5 px-5 rounded-md self-start hover:bg-opacity-90 transition-all flex items-center gap-3 text-sm"
        >
          <span>PAY SALARY</span>
        </Link>
      </div>
    </div>
  );
};

export default ProcessSalaryCard;