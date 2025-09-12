import { Document } from 'mongoose';

// Interface for the Counter model
export interface ICounter extends Document {
  _id: string;
  seq: number;
}

// Interface for the House model
export interface IHouse extends Document {
  name: string;
  colorAssociated?: string;
}

// Interface for the Section model
export interface ISection extends Document {
  class: number;
  name: string;
  capacity?: number;
  assignmentStatus?: 'Not Started' | 'In progress' | 'Complete';
  academicYear: string;
  roomNo?: string;
  classTeacher?: Document['_id'];
  subjects?: Document['_id'][];
}

// Interface for the Student Application model
export interface IStudentApplication extends Document {
  studentName: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  nationality?: string;
  email: string;
  parentNumber: string;
  alternateNumber?: string;
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  guardianName?: string;
  address?: string;
  weight?: number;
  height?: number;
  aadharNumber: string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'Other';
  minorityGroup?: 'Muslim' | 'Christian' | 'Sikh' | 'Buddhist' | 'Parsi' | 'None';
  isBPL?: boolean;
  isEWS?: boolean;
  isCWSN?: boolean;
  gender: 'Male' | 'Female' | 'Other';
  applicationDate: Date;
  applicationStatus: 'Pending' | 'Approved' | 'Rejected';
  photo?: string;
  aadharphoto?: string;
  casteCertificate?: string;
  parentID?: Document['_id'];
}

// Interface for the Admission model
export interface IAdmission extends Document {
  application: Document['_id'];
  admissionNumber: string;
  classEnrolled: string;
  section?: Document['_id'];
  academicYear: string;
  admissionDate: Date;
  house?: Document['_id'];
}

// Interface for the TC Application model
export interface ITCApplication extends Document {
  admission: Document['_id'];
  reasonForLeaving: string;
  dateOfApplication: Date;
  status: 'Pending' | 'Approved' | 'Rejected';
}

// Interface for the TC Format model
export interface ITCFormat extends Document {
  content?: string;
  public_id?: string;
}

// Interface for the Generated TC model
export interface ITCGenerated extends Document {
  tcApplication: Document['_id'];
  lastClassAttended: string;
  rollNumber: string;
  examResultStatus: 'Passed' | 'Failed' | 'Promoted' | 'Not Applicable';
  duesPaid: boolean;
  generalConduct: 'Excellent' | 'Good' | 'Average' | 'Poor';
  remarks?: string;
  dateOfIssue: Date;
  academicYear: string;
}
