import { z } from 'zod';

const listContractsFiltersSchema = z.object({
  clientId: z.string().regex(/^[0-9]+$/, { message: 'Client ID must be a positive integer' }).optional(),
  status: z.string().optional(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date',
  }).optional(),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date',
  }).optional(),
  page: z.string().regex(/^[0-9]+$/, { message: 'Page must be a positive integer' }).optional(),
  pageSize: z.string().regex(/^[0-9]+$/, { message: 'Page size must be a positive integer' }).optional(),
});

export function validateListContractsFilters(data: any) {
  listContractsFiltersSchema.parse(data);
}
