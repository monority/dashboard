/**
 * Creates a debounced version of a function that delays execution.
 * Multiple calls within the wait period reset the delay timer.
 *
 * @template TArgs - Type of arguments passed to the callback
 * @param callback - Function to debounce
 * @param waitMs - Milliseconds to wait before executing callback
 * @returns Debounced function that accepts the same arguments
 */
export const debounce = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  waitMs: number,
) => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: TArgs) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback(...args);
    }, waitMs);
  };
};
