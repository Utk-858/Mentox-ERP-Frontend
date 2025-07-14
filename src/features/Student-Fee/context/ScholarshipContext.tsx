import React, { createContext, useState, useContext, type ReactNode } from 'react';
import { initialScholarships, initialCoupons, mockStudents } from '../data/mockData';
import type { ScholarshipProgram, Beneficiary, IssuedCoupon } from '../types/scholarship';
import { format } from 'date-fns';

interface ScholarshipContextType {
  scholarships: ScholarshipProgram[];
  coupons: IssuedCoupon[];
  addScholarship: (program: Omit<ScholarshipProgram, 'id' | 'beneficiaries'>) => void;
  addBeneficiary: (programId: string, studentId: string) => void;
  createCoupon: (couponData: Omit<IssuedCoupon, 'id'>) => void;
  deleteBeneficiary: (programId: string, beneficiaryId: string) => void;
  deleteCoupon: (couponId: string) => void;
}

const ScholarshipContext = createContext<ScholarshipContextType | undefined>(undefined);

export const ScholarshipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scholarships, setScholarships] = useState<ScholarshipProgram[]>(initialScholarships);
  const [coupons, setCoupons] = useState<IssuedCoupon[]>(initialCoupons);

  const addScholarship = (programData: Omit<ScholarshipProgram, 'id' | 'beneficiaries'>) => {
    const newProgram: ScholarshipProgram = { ...programData, id: `sch_${new Date().getTime()}`, beneficiaries: [] };
    setScholarships(prev => [...prev, newProgram]);
  };
  
  const addBeneficiary = (programId: string, studentId: string) => {
    const studentToAdd = mockStudents.find(s => s.id === studentId);
    if (!studentToAdd) return;

    // This logic ensures React detects a state change by creating new objects and arrays
    setScholarships(prevScholarships => 
      prevScholarships.map(program => {
        if (program.id === programId) {
          const newBeneficiary: Beneficiary = {
            id: `ben_${new Date().getTime()}`,
            admissionNo: studentToAdd.id, studentName: studentToAdd.name,
            class: '10', section: 'C', dateAdded: format(new Date(), 'dd/MM/yyyy'),
          };
          // Return a new program object with a new beneficiaries array
          return { ...program, beneficiaries: [...program.beneficiaries, newBeneficiary] };
        }
        // Return the unchanged program
        return program;
      })
    );
  };

  const createCoupon = (couponData: Omit<IssuedCoupon, 'id'>) => {
    const newCoupon: IssuedCoupon = { ...couponData, id: `coupon_${new Date().getTime()}` };
    setCoupons(prev => [...prev, newCoupon]);
  };

  const deleteBeneficiary = (programId: string, beneficiaryId: string) => {
    setScholarships(prev => prev.map(program => {
        if (program.id === programId) {
          return {
            ...program,
            beneficiaries: program.beneficiaries.filter(b => b.id !== beneficiaryId),
          };
        }
        return program;
      })
    );
  };

  const deleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(c => c.id !== couponId));
  };

  const value = { scholarships, coupons, addScholarship, addBeneficiary, createCoupon, deleteBeneficiary, deleteCoupon };

  return (
    <ScholarshipContext.Provider value={value}>
      {children}
    </ScholarshipContext.Provider>
  );
};

export const useScholarships = (): ScholarshipContextType => {
  const context = useContext(ScholarshipContext);
  if (context === undefined) {
    throw new Error('useScholarships must be used within a ScholarshipProvider');
  }
  return context;
};