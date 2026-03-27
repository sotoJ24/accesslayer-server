import { Prisma } from '@prisma/client';

/**
 * Public sort options accepted by creator list endpoints.
 * These remain stable even if the internal query implementation changes.
 */
export const CREATOR_LIST_SORT_OPTIONS = [
   'createdAt',
   'updatedAt',
   'displayName',
   'handle',
] as const;

export const CREATOR_LIST_SORT_ORDERS = ['asc', 'desc'] as const;

export type CreatorListSortOption = (typeof CREATOR_LIST_SORT_OPTIONS)[number];
export type CreatorListSortOrder = (typeof CREATOR_LIST_SORT_ORDERS)[number];

const CREATOR_LIST_SORT_FIELD_MAP: Record<
   CreatorListSortOption,
   keyof Prisma.CreatorProfileOrderByWithRelationInput
> = {
   createdAt: 'createdAt',
   updatedAt: 'updatedAt',
   displayName: 'displayName',
   handle: 'handle',
};

/**
 * Map a public sort option into an internal Prisma orderBy object.
 * Throws for unsupported values so invalid sort input is never passed through silently.
 */
export function mapCreatorListSort(
   sort: string,
   order: CreatorListSortOrder
): Prisma.CreatorProfileOrderByWithRelationInput {
   const field = CREATOR_LIST_SORT_FIELD_MAP[sort as CreatorListSortOption];

   if (!field) {
      throw new Error(`Unsupported creator sort option: ${sort}`);
   }

   return {
      [field]: order,
   } as Prisma.CreatorProfileOrderByWithRelationInput;
}
