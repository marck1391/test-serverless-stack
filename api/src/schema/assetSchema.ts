import { z } from 'zod';

const assetSchema = z.object({
  code: z.string().min(1, { message: 'Invalid Code' }),
  description: z.string().optional(),
  available: z.boolean({ message: 'Available must be a boolean value' }),
});

export function validateAssetSchema(data: any) {
  assetSchema.parse(data);
}

const assetUpdateSchema = z.object({
  code: z.string().optional(),
  description: z.string().optional(),
  available: z.boolean({ message: 'Available must be a boolean value' }).optional(),
});

export function validateAssetUpdateSchema(data: any) {
  assetUpdateSchema.parse(data);
}
