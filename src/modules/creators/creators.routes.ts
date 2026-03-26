import { Router } from 'express';
import { httpListCreators } from './creators.controllers';
import {
   cacheControl,
   CachePresets,
} from '../../middlewares/cache-control.middleware';

const creatorsRouter = Router();

/**
 * GET /api/v1/creators
 *
 * List all creators with pagination and filtering.
 * Public endpoint with 5-minute cache.
 */
creatorsRouter.get(
   '/',
   cacheControl(CachePresets.publicShort),
   httpListCreators
);

export default creatorsRouter;
