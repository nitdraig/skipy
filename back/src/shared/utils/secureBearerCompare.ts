import crypto from "crypto";

/**
 * Comparación resistente a timing para tokens Bearer de longitud variable
 * (compara el digest SHA-256 de cada valor).
 */
export function timingSafeEqualToken(provided: string, expected: string): boolean {
  const hashProvided = crypto
    .createHash("sha256")
    .update(provided, "utf8")
    .digest();
  const hashExpected = crypto
    .createHash("sha256")
    .update(expected, "utf8")
    .digest();
  try {
    return crypto.timingSafeEqual(hashProvided, hashExpected);
  } catch {
    return false;
  }
}
