import { UIUpdateBatcher } from '../types';

/**
 * Batches UI updates to minimize E Ink screen refreshes
 * Collects updates and executes them together after a delay
 */
export function createUIBatcher(delayMs: number = 2000): UIUpdateBatcher {
  let pendingCallbacks: Set<() => void> = new Set();
  let timeoutId: NodeJS.Timeout | null = null;

  const flush = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    const callbacks = Array.from(pendingCallbacks);
    pendingCallbacks.clear();

    // Execute all pending updates in a single batch
    callbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Error executing batched update:', error);
      }
    });
  };

  const schedule = (callback: () => void) => {
    pendingCallbacks.add(callback);

    // Reset the timer - we'll wait for more updates
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(flush, delayMs);
  };

  return { schedule, flush };
}

/**
 * Debounces a function call - useful for typing indicators and search
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, waitMs);
  };
}
