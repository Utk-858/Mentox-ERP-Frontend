// A reusable interface for address fields.
export interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

// Data structure for the "Personal Details" tab.
export interface TeacherPersonalDetails {
  dateOfBirth: Date | null;
  gender: string;
  bloodGroup: string;
  nationality: string;
  email: string;
  mobile: string;
  alternateMobile: string;
  maritalStatus: string;
  religion: string;
  fatherName: string;
  fatherMobile: string;
  fatherOccupation: string;
  motherName: string;
  motherMobile: string;
  motherOccupation: string;
  spouseName: string;
  spouseMobile: string;
  spouseOccupation: string;
  currentAddress: Address;
  permanentAddress: Address;
  isPermanentSameAsCurrent: boolean;
}

// Data structure for the "Education" tab.
export interface TeacherEducationDetails {
  highestQualification: string;
  university: string;
  yearOfPassing: string;
  percentage: string;
  specialization: string;
  additionalDegrees: string;
  professionalQualifications: string;
  researchQualifications: string;
  certificateFile: File | null;
  certificateUrl: string | null;
}

// Data structure for the "Documents" tab.
export interface TeacherDocumentDetails {
    aadhaarNumber: string;
    aadhaarFile: File | null;
    aadhaarUrl: string | null;
    panNumber: string;
    panFile: File | null;
    panUrl: string | null;
}

// Data structure for the "Banking" tab.
export interface TeacherBankingDetails {
    bankName: string;
    bankBranch: string;
    accountNumber: string;
    accountHolderName: string;
    ifscCode: string;
    accountType: string;
    pfNumber: string;
    pfUanNumber: string;
}

// Data structure for the "Teaching Details" tab.
export interface TeacherTeachingDetails {
    department: string;
    designation: string;
    employmentType: string;
    joiningDate: Date | null;
    subjects: string;
    classes: string;
}

// The main data structure for the entire teacher profile.
export interface TeacherProfileData {
  personalDetails: TeacherPersonalDetails;
  educationDetails: TeacherEducationDetails;
  documentDetails: TeacherDocumentDetails;
  bankingDetails: TeacherBankingDetails;
  teachingDetails: TeacherTeachingDetails; // Added this line
}