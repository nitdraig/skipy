import type { InfrastructureItem, PulseOverallStatus } from "./types";

/**
 * Reglas: DB en `down` ⇒ pulso `down`. Otros fallos ⇒ `degraded`. `unknown` ⇒ `degraded`.
 */
export function derivePulseStatus(
  infrastructure: InfrastructureItem[]
): PulseOverallStatus {
  let databaseDown = false;
  let anyDown = false;
  let anyDegraded = false;
  let anyUnknown = false;

  for (const item of infrastructure) {
    if (item.status === "down") {
      anyDown = true;
      if (item.kind === "database") {
        databaseDown = true;
      }
    }
    if (item.status === "degraded") {
      anyDegraded = true;
    }
    if (item.status === "unknown") {
      anyUnknown = true;
    }
  }

  if (databaseDown) {
    return "down";
  }
  if (anyDown || anyDegraded || anyUnknown) {
    return "degraded";
  }
  return "ok";
}
