import { Router } from "express";
import rateLimit from "express-rate-limit";
import { pulseBearerAuthMiddleware } from "../middleware/pulseBearerAuthMiddleware";
import { collectPulse } from "../pulse/buildPulse";
import { asyncHandler } from "../utils/asyncHandler";
import { ENV } from "../config/env";

/**
 * Rutas internas del Pulse. Solo se montan si `PULSE_BEARER_TOKEN` está definido.
 */
export function createPulseRouter(): Router | null {
  if (!ENV.PULSE_BEARER_TOKEN?.length) {
    return null;
  }

  const router = Router();

  router.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 60,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: "too_many_pulse_requests" },
    }),
  );

  router.get(
    "/pulse",
    pulseBearerAuthMiddleware,
    asyncHandler(async (_req, res) => {
      const payload = await collectPulse();
      console.log("pulse_collected", {
        status: payload.status,
        duration_ms: payload.context.collection_duration_ms,
      });
      res.status(200).json(payload);
    }),
  );

  return router;
}
