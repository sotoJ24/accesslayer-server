import { z } from 'zod';
import {
   CREATOR_LIST_SORT_OPTIONS,
   CREATOR_LIST_SORT_ORDERS,
} from './creators.sort';

/**
 * Validation schema for creator list query parameters.
 *
 * Validates pagination and filter params for GET /api/v1/creators endpoint.
 * Keeps query validation centralized and reusable across creator list handlers.
 *
 * @example
 * GET /api/v1/creators?limit=20&offset=0&sort=createdAt&order=desc&verified=true
 */
export const CreatorListQuerySchema = z.object({
   // Pagination
   limit: z
      .string()
      .optional()
      .default('20')
      .transform(val => parseInt(val, 10))
      .refine(val => val > 0 && val <= 100, {
         message: 'Limit must be between 1 and 100',
      }),
   offset: z
      .string()
      .optional()
      .default('0')
      .transform(val => parseInt(val, 10))
      .refine(val => val >= 0, {
         message: 'Offset must be non-negative',
      }),

   // Sorting
   sort: z.enum(CREATOR_LIST_SORT_OPTIONS).optional().default('createdAt'),
   order: z.enum(CREATOR_LIST_SORT_ORDERS).optional().default('desc'),

   // Filters
   verified: z
      .string()
      .optional()
      .transform(val => {
         if (val === undefined) return undefined;
         return val === 'true';
      }),
   search: z.string().optional(),
});

export type CreatorListQueryType = z.infer<typeof CreatorListQuerySchema>;
