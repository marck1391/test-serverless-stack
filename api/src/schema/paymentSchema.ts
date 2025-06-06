import { z } from 'zod';

const paymentSchema = z.object({
  contractId: z.number().positive({ message: 'Contract ID must be a positive number' }),
  paymentDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid payment date',
  }),
  amountPaid: z.number().positive({ message: 'Amount paid must be a positive number' }),
  paymentMethod: z.enum(['transfer', 'cash', 'card'], {
    message: 'Payment method must be one of: transfer, cash, or card',
  }),
});

export function validatePaymentSchema(data: any) {
  paymentSchema.parse(data);
}
