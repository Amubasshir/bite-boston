import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: 'Full name is required' })
      .min(2, { message: 'Full name must be at least 2 characters' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    phone: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .regex(
        /^(\+1|1)?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        {
          message:
            'Please enter a valid US phone number (e.g., (123) 456-7890 or 1234567890)',
        }
      ),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
    is_harvard_grad: z.boolean({
      required_error: "Please select whether you're a Harvard graduate",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
