/**
 * API pública del módulo Pulse para forks: tipos, recolección y probes por defecto.
 */
export type {
  InfrastructureItem,
  InfrastructureKind,
  InfrastructureStatus,
  PulseOverallStatus,
  PulsePayload,
  PulseProbe,
  PulseProbeCheckResult,
} from "./types";
export { collectPulse } from "./buildPulse";
export { derivePulseStatus } from "./derivePulseStatus";
export { getDefaultPulseProbes } from "./getDefaultPulseProbes";
