import { z } from 'zod';

const listClientsFiltersSchema = z.object({
  name: z.string().optional(),
  rfc: z.string().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Start date must be in YYYY-MM-DD format' }).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'End date must be in YYYY-MM-DD format' }).optional(),
  page: z.string().regex(/^[0-9]+$/, { message: 'Page must be a positive integer' }).optional(),
  pageSize: z.string().regex(/^[0-9]+$/, { message: 'Page size must be a positive integer' }).optional(),
});

export function validateListClientsFilters(data: any) {
  listClientsFiltersSchema.parse(data);
}
