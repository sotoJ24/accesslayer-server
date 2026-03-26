import { CreatorProfile } from '../../types/profile.types';

/**
 * Creator summary shape for list responses.
 *
 * Keeps full profile fields out of the list serializer to reduce payload size.
 * Only includes essential information needed for creator listings.
 */
export interface CreatorSummary {
   id: string;
   handle: string;
   displayName: string;
   avatarUrl?: string;
   isVerified: boolean;
}

/**
 * Serializes a full CreatorProfile into a CreatorSummary for list responses.
 *
 * Centralizes list serialization logic and keeps it reusable across endpoints.
 *
 * @param profile - Full creator profile from database
 * @returns Creator summary suitable for list responses
 *
 * @example
 * const summary = serializeCreatorSummary(creatorProfile);
 * // Returns: { id, handle, displayName, avatarUrl, isVerified }
 */
export function serializeCreatorSummary(
   profile: CreatorProfile
): CreatorSummary {
   return {
      id: profile.id,
      handle: profile.handle,
      displayName: profile.displayName,
      avatarUrl: profile.avatarUrl,
      isVerified: profile.isVerified,
   };
}

/**
 * Serializes multiple creator profiles for list responses.
 *
 * @param profiles - Array of full creator profiles
 * @returns Array of creator summaries
 */
export function serializeCreatorList(
   profiles: CreatorProfile[]
): CreatorSummary[] {
   return profiles.map(serializeCreatorSummary);
}

/**
 * Paginated creator list response shape.
 */
export interface CreatorListResponse {
   creators: CreatorSummary[];
   pagination: {
      limit: number;
      offset: number;
      total: number;
      hasMore: boolean;
   };
}
