export const ERROR_MESSAGES = {
  STUDENT_SUSPEND: 'Student is already suspended.',
  NO_TEACHER_PROVIDED: 'No teacher provided.',
  STUDENT_NOT_FOUND: 'Student not found.',
  UNPROCESSABLE_ENTITY: 'Unprocessable entity.',
  STUDENT_ALREADY_REGISTERED: 'Student already registered.',
} as const;

export const DATABASE_CONNECTED_MESSAGE = {
  CONNECTED: 'Database connected',
  FAILED: 'Database connection failed',
  AFTER_MUNUAL_INITILIZATION:
    'Database connection established after manual initialization!',
} as const;
