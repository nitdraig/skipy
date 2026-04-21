/**
 * Ejecuta una promesa con tope de tiempo. No cancela el trabajo subyacente.
 */
export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  signal?: AbortSignal
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }

    const t = setTimeout(() => {
      reject(new Error("timeout"));
    }, ms);

    const onAbort = () => {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    };

    if (signal) {
      signal.addEventListener("abort", onAbort, { once: true });
    }

    promise
      .then((value) => {
        clearTimeout(t);
        if (signal) {
          signal.removeEventListener("abort", onAbort);
        }
        resolve(value);
      })
      .catch((err: unknown) => {
        clearTimeout(t);
        if (signal) {
          signal.removeEventListener("abort", onAbort);
        }
        reject(err);
      });
  });
}
