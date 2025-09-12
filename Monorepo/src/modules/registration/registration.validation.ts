import { z } from 'zod';

// Helper for required string fields to provide consistent error messages
const requiredString = (message: string) => z.string().min(1, { message });

// --- Application Schemas ---
export const createApplicationSchema = z.object({
  body: z.object({
    studentName: requiredString('Student name is required'),
    email: requiredString('Email is required').email('Invalid email format'),
    parentNumber: requiredString('Parent number is required').regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
    aadharNumber: requiredString('Aadhar number is required').regex(/^\d{12}$/, 'Enter a valid 12-digit Aadhar number'),
    category: z.enum(['General', 'OBC', 'SC', 'ST', 'Other']),
    gender: z.enum(['Male', 'Female', 'Other']),
  }),
});

// --- Admission Schemas ---
export const createAdmissionSchema = z.object({
  body: z.object({
    application: requiredString('Application ID is required'),
    classEnrolled: requiredString('Class is required').regex(/^[1-9][0-2]?(st|nd|rd|th)$/, 'Enter class like 1st, 10th'),
    academicYear: requiredString('Academic year is required').regex(/^\d{4}-\d{2}$/, 'Format must be YYYY-YY'),
  }),
});

export const updateAdmissionSchema = z.object({
  body: z.object({
    classEnrolled: z.string().regex(/^[1-9][0-2]?(st|nd|rd|th)$/, 'Enter class like 1st, 10th').optional(),
    academicYear: z.string().regex(/^\d{4}-\d{2}$/, 'Format must be YYYY-YY').optional(),
    section: z.string().optional(),
    house: z.string().optional(),
  }),
});


// --- House Schemas ---
export const createHouseSchema = z.object({
  body: z.object({
    name: requiredString('House name is required'),
    colorAssociated: z.string().optional(),
  }),
});

export const updateHouseSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'House name is required').optional(),
    colorAssociated: z.string().min(1, 'Color is required').optional(),
  }),
});

export const assignHousesToSectionSchema = z.object({
  body: z.object({
    section: requiredString('Section ID is required'),
    classEnrolled: z.string().optional(),
    academicYear: z.string().regex(/^\d{4}-\d{2}$/, 'Format must be YYYY-YY').optional(),
  }),
});


// --- Section Schemas ---
export const createSectionSchema = z.object({
  body: z.object({
    class: z.number().min(1),
    name: requiredString('Section name/grade is required'),
    academicYear: requiredString('Academic year is required').regex(/^\d{4}-\d{2}$/, 'Format must be YYYY-YY'),
    capacity: z.number().min(1).optional(),
  }),
});

export const manualAssignSectionSchema = z.object({
  body: z.object({
    studentId: requiredString('Student ID is required'),
    sectionId: requiredString('Section ID is required'),
  }),
});

export const autoAssignSectionSchema = z.object({
  body: z.object({
    academicYear: requiredString('Academic year must be in format YYYY-YY').regex(/^\d{4}-\d{2}$/),
    classNumber: z.number().min(1),
  }),
});


// --- TC Schemas ---
export const createTcApplicationSchema = z.object({
  body: z.object({
    admission: requiredString('Admission ID is required'),
    reasonForLeaving: requiredString('Reason for leaving is required'),
  }),
});

export const updateTcApplicationStatusSchema = z.object({
  body: z.object({
    status: z.enum(['Pending', 'Approved', 'Rejected']),
  }),
});

export const generateTcSchema = z.object({
  body: z.object({
    tcApplication: requiredString('TC Application ID is required'),
    examResultStatus: z.enum(['Passed', 'Failed', 'Promoted', 'Not Applicable']),
    generalConduct: z.enum(['Excellent', 'Good', 'Average', 'Poor']),
    duesPaid: z.boolean(),
    academicYear: requiredString('Academic year is required').regex(/^\d{4}-\d{2}$/),
    lastClassAttended: requiredString('Last class attended is required'),
    rollNumber: requiredString('Roll number is required'),
    remarks: z.string().optional(),
  }),
});

