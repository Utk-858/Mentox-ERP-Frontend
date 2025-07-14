import type { ScholarshipProgram, IssuedCoupon, Beneficiary } from '../types/scholarship';

// Mock students to be added as beneficiaries
export const mockStudents = [
    { id: 'STU003', name: 'Rohan Mehta' },
    { id: 'STU004', name: 'Sonia Rao' },
    { id: 'STU005', name: 'Vikram Singh' },
];

const initialBeneficiaries: Beneficiary[] = [
    { id: '1', admissionNo: 'STU001', studentName: 'Aarav Sharma', class: '10', section: 'A', dateAdded: '06/12/2025' },
    { id: '2', admissionNo: 'STU002', studentName: 'Priya Patel', class: '9', section: 'B', dateAdded: '06/11/2025' },
];

export const initialScholarships: ScholarshipProgram[] = [
  { 
    id: 'bpl', 
    title: 'BPL Scholarship Program',
    description: 'Provides financial assistance to students from families living below the poverty line.',
    type: 'Need-Based',
    feeReduction: 25,
    couponCode: 'BPL25',
    criteria: 'Family income must be below the poverty line.',
    beneficiaries: initialBeneficiaries
  },
  { 
    id: 'sgc', 
    title: 'Single Girl Child Scholarship',
    description: 'Encourages education for single girl children.',
    type: 'General',
    feeReduction: 15,
    couponCode: 'SGC15',
    criteria: 'Must be the only child and a girl.',
    beneficiaries: []
  },
  { 
    id: 'sps', 
    title: 'Sports Merit Scholarship',
    description: 'For students with outstanding achievements in sports.',
    type: 'Merit-Based',
    feeReduction: 50,
    couponCode: 'SPORT50',
    criteria: 'Must have won a state or national level sports competition.',
    beneficiaries: []
  },
];


export const initialCoupons: IssuedCoupon[] = [
    { id: 'c1', studentId: 'STU001', studentName: 'Aarav Sharma', couponCode: 'SCHA202456', waiverPercentage: 50, expiryDate: '2025-12-06', isGeneral: false },
    { id: 'd1', couponCode: 'NEWYEAR25', waiverPercentage: 25, expiryDate: '2026-01-15', isGeneral: true },
];