import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required')
});

export function validateEmail(data: any) {
  emailSchema.parse(data)
}
