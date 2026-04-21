import { ENV } from "../config/env";
import { derivePulseStatus } from "./derivePulseStatus";
import { getDefaultPulseProbes } from "./getDefaultPulseProbes";
import type {
  InfrastructureItem,
  PulsePayload,
  PulseProbe,
} from "./types";
import { withTimeout } from "./withTimeout";

function parseBusinessMetrics(): Record<string, unknown> {
  const raw = ENV.PULSE_BUSINESS_METRICS_JSON;
  if (!raw?.trim()) {
    return {};
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    /* métricas inválidas: se omite */
  }
  return {};
}

async function runSingleProbe(
  probe: PulseProbe,
  timeoutMs: number,
  signal: AbortSignal
): Promise<InfrastructureItem> {
  const started = Date.now();
  try {
    const result = await withTimeout(probe.check(), timeoutMs, signal);
    return {
      id: probe.id,
      name: probe.name,
      kind: probe.kind,
      status: result.status,
      latency_ms: result.latency_ms ?? Date.now() - started,
      detail: result.detail,
    };
  } catch (err: unknown) {
    const aborted =
      err instanceof DOMException && err.name === "AbortError";
    const detail = aborted ? "aborted" : "timeout_or_error";
    return {
      id: probe.id,
      name: probe.name,
      kind: probe.kind,
      status: "unknown",
      latency_ms: Date.now() - started,
      detail,
    };
  }
}

/**
 * Construye el payload del Pulse ejecutando probes en paralelo con timeouts.
 */
export async function collectPulse(options?: {
  probes?: PulseProbe[];
}): Promise<PulsePayload> {
  const collectionStarted = Date.now();
  const probes = options?.probes ?? getDefaultPulseProbes();
  const probeTimeout = ENV.PULSE_PROBE_TIMEOUT_MS;
  const collectionTimeout = Math.max(
    ENV.PULSE_COLLECTION_TIMEOUT_MS,
    probeTimeout + 50
  );

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), collectionTimeout);

  try {
    const infrastructure = await Promise.all(
      probes.map((p) => runSingleProbe(p, probeTimeout, controller.signal))
    );
    const status = derivePulseStatus(infrastructure);
    const mem = process.memoryUsage();

    return {
      pulse_version: "1",
      status,
      context: {
        product_name: ENV.PULSE_PRODUCT_NAME,
        environment: ENV.NODE_ENV,
        generated_at: new Date().toISOString(),
        collection_duration_ms: Date.now() - collectionStarted,
      },
      ai_context: ENV.PULSE_AI_CONTEXT,
      metrics: {
        technical: {
          uptime_s: Math.round(process.uptime() * 10) / 10,
          node_version: process.version,
          memory: {
            heap_used_mb: Math.round(mem.heapUsed / 1024 / 1024),
            heap_total_mb: Math.round(mem.heapTotal / 1024 / 1024),
            external_mb: Math.round(mem.external / 1024 / 1024),
          },
        },
        business: parseBusinessMetrics(),
      },
      infrastructure,
    };
  } finally {
    clearTimeout(timer);
  }
}
