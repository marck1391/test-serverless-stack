import { z } from 'zod';

const listPaymentsFiltersSchema = z.object({
  contractId: z.string().regex(/^\d+$/, 'Contract ID must be a numeric string').nonempty('Contract ID is required'),
  page: z.string().regex(/^\d+$/, 'Page must be a numeric string').optional(),
  pageSize: z.string().regex(/^\d+$/, 'Page size must be a numeric string').optional(),
});

export function validateListPaymentsFilters(data: any) {
  listPaymentsFiltersSchema.parse(data);
}
