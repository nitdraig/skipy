import { derivePulseStatus } from "./derivePulseStatus";
import type { InfrastructureItem } from "./types";

describe("derivePulseStatus", () => {
  it("returns ok when all probes are up", () => {
    const infra: InfrastructureItem[] = [
      {
        id: "mongodb",
        name: "MongoDB",
        kind: "database",
        status: "up",
        latency_ms: 2,
      },
    ];
    expect(derivePulseStatus(infra)).toBe("ok");
  });

  it("returns down when a database probe is down", () => {
    const infra: InfrastructureItem[] = [
      {
        id: "mongodb",
        name: "MongoDB",
        kind: "database",
        status: "down",
        detail: "ping_failed",
      },
    ];
    expect(derivePulseStatus(infra)).toBe("down");
  });

  it("returns degraded when a non-database probe is down", () => {
    const infra: InfrastructureItem[] = [
      {
        id: "mongodb",
        name: "MongoDB",
        kind: "database",
        status: "up",
      },
      {
        id: "weather",
        name: "Weather API",
        kind: "integration",
        status: "down",
      },
    ];
    expect(derivePulseStatus(infra)).toBe("degraded");
  });

  it("returns degraded on unknown", () => {
    const infra: InfrastructureItem[] = [
      {
        id: "mongodb",
        name: "MongoDB",
        kind: "database",
        status: "unknown",
        detail: "timeout_or_error",
      },
    ];
    expect(derivePulseStatus(infra)).toBe("degraded");
  });
});
