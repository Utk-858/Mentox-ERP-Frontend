import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import ScholarshipAccordion from '../components/ScholarshipAccordion';
import AddNewProgramModal from '../components/AddNewProgramModal';
import IssuedCodesTable from '../components/IssuedCodesTable';
import CreateCouponForm from '../components/CreateCouponForm';
import IssuedDiscountsTable from '../components/IssuedDiscountsTable';
import { useScholarships } from '../context/ScholarshipContext';

const ScholarshipsPage: React.FC = () => {
  const { scholarships } = useScholarships();
  const [activeTab, setActiveTab] = useState<'programs' | 'coupons'>('programs');
  const [couponSubTab, setCouponSubTab] = useState<'student' | 'discount'>('student');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AddNewProgramModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="p-4 sm:p-6 bg-gray-50 min-h-full font-poppins">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Scholarships & Coupons</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage scholarship programs, student-specific coupons, and general discounts.
          </p>
        </header>

        <div className="flex items-center gap-2 bg-black rounded-lg p-1 max-w-md mb-6">
          <button
            onClick={() => setActiveTab('programs')}
            className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'programs' ? 'bg-[#702DFF] text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            Scholarship Programs
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'coupons' ? 'bg-[#702DFF] text-white' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            Coupons & Discounts
          </button>
        </div>

        {activeTab === 'programs' && (
          // ... Scholarship programs section is unchanged ...
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Government & Other Scholarship Programs</h2>
                <p className="text-sm text-gray-500">Manage scholarship programs and their beneficiaries.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-[#702DFF] text-white font-semibold py-2 px-4 rounded-lg transition-opacity hover:opacity-90"
              >
                <PlusCircle size={18} />
                <span>Add New Program</span>
              </button>
            </div>
            <div className="space-y-4">
              {scholarships.map((program) => (
                <ScholarshipAccordion key={program.id} program={program} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'coupons' && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                    {/* --- The classes for the buttons are updated here --- */}
                    <div className="flex items-center gap-1 bg-black rounded-lg p-1 max-w-sm mb-6">
                        <button
                            onClick={() => setCouponSubTab('student')}
                            className={`w-full px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                couponSubTab === 'student' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'
                            }`}
                        >
                            Student Coupons
                        </button>
                        <button
                            onClick={() => setCouponSubTab('discount')}
                            className={`w-full px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                couponSubTab === 'discount' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'
                            }`}
                        >
                            Discounts
                        </button>
                    </div>
                    {couponSubTab === 'student' ? <IssuedCodesTable /> : <IssuedDiscountsTable />}
                </div>
                <div className="lg:col-span-2">
                    <CreateCouponForm />
                </div>
            </div>
        )}
      </div>
    </>
  );
};

export default ScholarshipsPage;