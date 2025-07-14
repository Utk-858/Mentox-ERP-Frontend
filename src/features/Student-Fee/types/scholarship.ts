// This file defines the "shape" of all our data for this feature.

export type ScholarshipProgram = {
  id: string;
  title: string;
  description: string;
  type: 'Merit-Based' | 'Need-Based' | 'General';
  feeReduction: number;
  couponCode: string;
  criteria: string;
  beneficiaries: Beneficiary[];
};

export type Beneficiary = {
  id: string;
  admissionNo: string;
  studentName: string;
  class: string;
  section: string;
  dateAdded: string;
};

export type IssuedCoupon = {
  id: string;
  // studentId and studentName are optional because general discounts won't have them
  studentId?: string; 
  studentName?: string;
  couponCode: string;
  waiverPercentage: number;
  expiryDate: string;
  isGeneral: boolean;
};