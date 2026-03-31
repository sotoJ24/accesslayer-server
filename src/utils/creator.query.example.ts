/**
 * creator.query.example.ts
 *
 * Example showing how to integrate parseBoolean into creator endpoints.
 * This is NOT a new file to add — it illustrates the pattern to apply
 * to your existing creator controllers/services.
 *
 * Remove this file before merging; it exists for reviewer reference only.
 */

import { Request, Response, NextFunction } from "express";
import {
  parseBoolean,
  parseBooleanWithDefault,
  ParseBooleanError,
} from "./parseBoolean.utils";

// ---------------------------------------------------------------------------
// Option A — Parse in the controller directly
// ---------------------------------------------------------------------------

export async function getCreators(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // ?isVerified=true | false | 1 | 0 | yes | no ...
    const isVerified = parseBoolean("isVerified", req.query.isVerified as string | undefined);

    // ?isActive defaults to true when absent
    const isActive = parseBooleanWithDefault("isActive", req.query.isActive as string | undefined, true);

    // Pass parsed booleans to your service/prisma query
    const creators = await prisma.creator.findMany({
      where: {
        ...(isVerified !== null && { isVerified }),
        isActive,
      },
    });

    return res.status(200).json({ data: creators });
  } catch (error) {
    next(error);
  }
}

// ---------------------------------------------------------------------------
// Option B — Centralised error handling middleware
//
// Add this once in your Express error handler so ParseBooleanError always
// maps to a 400 response with a clean message.
// ---------------------------------------------------------------------------

export function parseBooleanErrorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ParseBooleanError) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
  next(error);
}