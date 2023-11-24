import { z } from 'zod';

export const GetByUsername = z.object({
  username: z.string(),
});

export const UserOnboarding = z.object({
  username: z
    .string({ required_error: 'Username is required to continue' })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),

  isPublic: z
    .boolean()
    .optional()
    .default(true)
    .describe('Make account visible to everyone!'),

  sendEmails: z
    .boolean()
    .optional()
    .default(false)
    .describe('Send emails about app usage.'),
});
