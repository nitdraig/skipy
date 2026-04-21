import type { PulseProbe } from "./types";
import { createMongooseDatabaseProbe } from "./probes/mongooseDatabaseProbe";

/**
 * Lista por defecto de probes para esta plantilla.
 * Los forks pueden exponer su propia fábrica y registrar Postgres, Redis, etc.
 */
export function getDefaultPulseProbes(): PulseProbe[] {
  return [createMongooseDatabaseProbe()];
}
