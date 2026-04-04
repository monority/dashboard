import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('retarde l execution du callback', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 200);

    debounced('alpha');

    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalledWith('alpha');
  });

  it('annule l appel precedent si une nouvelle invocation arrive', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 200);

    debounced('alpha');
    vi.advanceTimersByTime(100);
    debounced('beta');
    vi.advanceTimersByTime(199);

    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('beta');
  });

  it('propage plusieurs arguments', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 50);

    debounced('alpha', 42, true);
    vi.runAllTimers();

    expect(callback).toHaveBeenCalledWith('alpha', 42, true);
  });
});
