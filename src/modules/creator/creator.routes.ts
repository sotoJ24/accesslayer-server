// src/modules/creator/creator.routes.ts
import { Router } from 'express';
import { listCreators } from './creator.controller';

const router = Router();

/**
 * @deprecated
 * Legacy creators list route.
 * This router is no longer mounted from `src/modules/index.ts` because
 * `src/modules/creators/creators.routes.ts` is the active public endpoint.
 *
 * @route GET /api/v1/creators
 * @desc Get a paginated list of creators
 * @access Public
 */
router.get('/', listCreators);

export default router;
