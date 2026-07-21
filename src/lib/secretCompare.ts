import { createHash, timingSafeEqual } from "crypto";

/**
 * Constant-time comparison of a request-supplied secret against the expected
 * value. Using `===`/`!==` on a secret leaks its length and, in principle,
 * a byte-by-byte timing signal; `timingSafeEqual` removes that side channel.
 *
 * `timingSafeEqual` throws if the two buffers differ in length, which would
 * itself leak length, so we hash both inputs to a fixed 32-byte digest first
 * and compare those. Returns false for any missing/empty input.
 */

export function secretsMatch(
  provided: string | null | undefined,
  expected: string | null | undefined,
): boolean {
  if (!provided || !expected) return false;
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
