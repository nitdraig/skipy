import mongoose from "mongoose";
import type { PulseProbe, PulseProbeCheckResult } from "../types";

/**
 * Probe de base de datos usando la conexión Mongoose activa (`ping`).
 * Para otros motores, añade probes distintos y regístralos en {@link getDefaultPulseProbes}.
 */
export function createMongooseDatabaseProbe(): PulseProbe {
  return {
    id: "mongodb",
    name: "MongoDB",
    kind: "database",
    async check(): Promise<PulseProbeCheckResult> {
      const started = Date.now();
      const db = mongoose.connection.db;
      if (!db || mongoose.connection.readyState !== 1) {
        return {
          status: "down",
          latency_ms: Date.now() - started,
          detail: "not_connected",
        };
      }
      try {
        await db.admin().command({ ping: 1 });
        return {
          status: "up",
          latency_ms: Date.now() - started,
        };
      } catch {
        return {
          status: "down",
          latency_ms: Date.now() - started,
          detail: "ping_failed",
        };
      }
    },
  };
}
