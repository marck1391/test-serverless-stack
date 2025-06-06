import { z } from 'zod';

const contractSchema = z.object({
  clientId: z.number().positive({ message: 'Client ID must be a positive number' }),
  assetId: z.number().positive({ message: 'Asset ID must be a positive number' }),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date',
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date',
  }),
  monthlyRent: z.number().positive({ message: 'Monthly rent must be a positive number' }),
  warrantyAmount: z.number().positive({ message: 'Warranty amount must be a positive number' }),
  totalPayments: z.number().int().positive({ message: 'Total payments must be a positive integer' }),
});

export function validateContractSchema(data: any) {
  contractSchema.parse(data);
}

const contractUpdateSchema = z.object({
  newEndDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date',
  }).optional(),
  newMonthlyRent: z.number().positive({ message: 'Monthly rent must be a positive number' }).optional(),
});

export function validateContractUpdateSchema(data: any) {
  contractUpdateSchema.parse(data);
}
