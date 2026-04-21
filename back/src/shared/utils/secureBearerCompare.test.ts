import { timingSafeEqualToken } from "./secureBearerCompare";

describe("timingSafeEqualToken", () => {
  it("returns true for identical tokens", () => {
    expect(timingSafeEqualToken("same-secret", "same-secret")).toBe(true);
  });

  it("returns false for different tokens", () => {
    expect(timingSafeEqualToken("a", "b")).toBe(false);
  });

  it("returns false when lengths differ", () => {
    expect(timingSafeEqualToken("short", "longer-value")).toBe(false);
  });
});
