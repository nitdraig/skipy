import { collectPulse } from "./buildPulse";
import type { PulseProbe } from "./types";

describe("collectPulse", () => {
  it("runs custom probes and derives status", async () => {
    const probes: PulseProbe[] = [
      {
        id: "cache",
        name: "Redis",
        kind: "cache",
        async check() {
          return { status: "up", latency_ms: 1 };
        },
      },
    ];

    const payload = await collectPulse({ probes });
    expect(payload.pulse_version).toBe("1");
    expect(payload.infrastructure).toHaveLength(1);
    expect(payload.infrastructure[0].id).toBe("cache");
    expect(payload.status).toBe("ok");
  });

  it("marks infrastructure as unknown when probe exceeds timeout", async () => {
    const slowProbe: PulseProbe = {
      id: "slow",
      name: "Slow integration",
      kind: "integration",
      check: () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ status: "up" }), 400);
        }),
    };

    const payload = await collectPulse({ probes: [slowProbe] });
    expect(payload.infrastructure[0].status).toBe("unknown");
    expect(payload.infrastructure[0].detail).toBe("timeout_or_error");
    expect(payload.status).toBe("degraded");
  });
});
