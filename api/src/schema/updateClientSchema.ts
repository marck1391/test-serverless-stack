import { z } from 'zod';

const updateClientSchema = z.object({
  name: z.string().optional(),
  rfc: z.string().optional(),
  email: z.string().email({ message: 'Invalid email format' }).optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format' }).optional(),
  address: z.string().optional(),
});

export function validateUpdateClient(data: any) {
  updateClientSchema.parse(data);
}
