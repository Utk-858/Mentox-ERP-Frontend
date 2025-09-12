import { Permissions } from './permissions.config';

// The map of roles to their default permissions remains the same.
export const RolePermissionsMap: Record<string, string[]> = {
  SuperAdmin: Object.values(Permissions),
  Director: [
    Permissions.VIEW_STUDENT_PROFILE,
    Permissions.VIEW_ATTENDANCE,
  ],
  Registrar: [
    Permissions.CREATE_USER,
    Permissions.EDIT_STUDENT_PROFILE,
  ],
  Admin: [
    Permissions.CREATE_USER,
    Permissions.DELETE_USER,
    Permissions.MANAGE_ROLES,
  ],
  HOD: [
    Permissions.VIEW_STUDENT_PROFILE,
    Permissions.MANAGE_RESULTS,
  ],
  Faculty: [
    Permissions.MANAGE_ATTENDANCE,
    Permissions.VIEW_RESULTS,
  ],
  Student: [
    Permissions.VIEW_RESULTS,
    Permissions.VIEW_ATTENDANCE,
  ],
  Librarian: [
    Permissions.ISSUE_BOOK,
    Permissions.MANAGE_LIBRARY,
  ],
  Parents: [
    Permissions.FILL_STUDENT_APPLICATION,
  ]
};

// DEFINITIVE FIX: Define AllRoles as a readonly tuple using 'as const'.
// This provides the specific, literal type that z.enum requires for compile-time validation,
// making workarounds in the validation file unnecessary.
export const AllRoles = [
  'SuperAdmin',
  'Director',
  'Registrar',
  'Admin',
  'HOD',
  'Faculty',
  'Student',
  'Librarian',
  'Parents',
] as const;

