import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  rfc: z.string({ message: 'RFC is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format' })
    .optional(),
  address: z.string().min(1, { message: 'Address must be defined' }).optional()
})

export function validateClientSchema(data: any) {
  clientSchema.parse(data);
}
