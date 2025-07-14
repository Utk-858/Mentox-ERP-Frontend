import React, { useState } from 'react';
import { ChevronDown, BookUser, FileText, PlusCircle } from 'lucide-react';
import { type ScholarshipProgram } from '../types/scholarship';
import BeneficiaryTable from './BeneficiaryTable';
import AddBeneficiaryModal from './AddBeneficiaryModal';
import { useScholarships } from '../context/ScholarshipContext';

interface ScholarshipAccordionProps {
  program: ScholarshipProgram;
}

const ScholarshipAccordion: React.FC<ScholarshipAccordionProps> = ({ program }) => {
  const [isOpen, setIsOpen] = useState(program.id === 'bpl');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteBeneficiary } = useScholarships();

  return (
    <>
      <AddBeneficiaryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programTitle={program.title}
        programId={program.id}
      />

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Accordion Header - This part is correct */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
        >
          <div className="flex items-center gap-4">
            <BookUser className="text-[#702DFF]" size={20} />
            <span className="font-semibold text-gray-800">{program.title}</span>
            <div className="flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
              <FileText size={12} />
              <span>{program.beneficiaries.length}</span>
            </div>
          </div>
          <ChevronDown
            size={20}
            className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Accordion Content - This section is now updated */}
        {isOpen && (
          <div className="p-6 border-t border-gray-200 space-y-6">
            
            {/* --- NEW: Program Details Section --- */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Program Details</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Type</p>
                        <p className="font-medium text-gray-900">{program.type}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Fee Reduction</p>
                        <p className="font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full inline-block">{program.feeReduction}%</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Coupon Code</p>
                        <p className="font-medium text-[#702DFF]">{program.couponCode}</p>
                    </div>
                </div>
            </div>
            
            {/* --- NEW: Benefits Section --- */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Benefits</h4>
                <p className="text-sm text-gray-600">{program.description}</p>
            </div>

            {/* Beneficiaries Section - This part was already correct */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-800">Beneficiaries</h4>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-[#702DFF] text-white font-semibold py-2 px-4 rounded-lg text-sm transition-opacity hover:opacity-90"
                >
                  <PlusCircle size={16} />
                  <span>Add Beneficiaries</span>
                </button>
              </div>
              <BeneficiaryTable 
                beneficiaries={program.beneficiaries} 
                onDelete={(beneficiaryId) => deleteBeneficiary(program.id, beneficiaryId)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ScholarshipAccordion;