import mongoose from "mongoose";
import type { PulseProbe, PulseProbeCheckResult } from "../types";

/** Mongoose: disconnected */
const RS_DISCONNECTED = 0;
/** Mongoose: connected */
const RS_CONNECTED = 1;
/** Mongoose: connecting */
const RS_CONNECTING = 2;
/** Mongoose: disconnecting */
const RS_DISCONNECTING = 3;

async function pingDb(db: NonNullable<typeof mongoose.connection.db>) {
  await db.admin().command({ ping: 1 });
}

/**
 * Probe de base de datos usando la conexión Mongoose activa (`ping`).
 * - Estados transitorios (`connecting` / `disconnecting`) → `degraded` (evita `down` global por falso positivo).
 * - `ping` con un reintento corto ante fallos esporádicos de red.
 * Para otros motores, añade probes distintos y regístralos en {@link getDefaultPulseProbes}.
 */
export function createMongooseDatabaseProbe(): PulseProbe {
  return {
    id: "mongodb",
    name: "MongoDB",
    kind: "database",
    async check(): Promise<PulseProbeCheckResult> {
      const started = Date.now();
      const rs = mongoose.connection.readyState;
      const db = mongoose.connection.db;

      if (rs === RS_CONNECTING) {
        return {
          status: "degraded",
          latency_ms: Date.now() - started,
          detail: "connecting",
        };
      }
      if (rs === RS_DISCONNECTING) {
        return {
          status: "degraded",
          latency_ms: Date.now() - started,
          detail: "disconnecting",
        };
      }
      if (rs !== RS_CONNECTED || !db) {
        return {
          status: "down",
          latency_ms: Date.now() - started,
          detail: "not_connected",
        };
      }

      try {
        await pingDb(db);
        return {
          status: "up",
          latency_ms: Date.now() - started,
        };
      } catch {
        try {
          await new Promise<void>((resolve) => {
            setTimeout(resolve, 75);
          });
          if (mongoose.connection.readyState !== RS_CONNECTED) {
            return {
              status: "down",
              latency_ms: Date.now() - started,
              detail: "ping_failed",
            };
          }
          await pingDb(mongoose.connection.db!);
          return {
            status: "up",
            latency_ms: Date.now() - started,
            detail: "recovered_after_retry",
          };
        } catch {
          return {
            status: "down",
            latency_ms: Date.now() - started,
            detail: "ping_failed",
          };
        }
      }
    },
  };
}
