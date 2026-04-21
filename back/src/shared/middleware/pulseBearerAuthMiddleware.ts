import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env";
import { timingSafeEqualToken } from "../utils/secureBearerCompare";

export function pulseBearerAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const expected = ENV.PULSE_BEARER_TOKEN;
  if (!expected?.length) {
    res.status(503).json({ error: "pulse_not_configured" });
    return;
  }

  const auth = req.get("authorization");
  if (!auth?.toLowerCase().startsWith("bearer ")) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  const token = auth.slice(7).trim();
  if (!token.length || !timingSafeEqualToken(token, expected)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  next();
}
