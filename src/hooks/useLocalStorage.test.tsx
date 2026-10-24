import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => window.localStorage.clear());

  it('читает сохранённое значение', () => {
    window.localStorage.setItem('test-key', JSON.stringify(['one']));

    const { result } = renderHook(() => useLocalStorage('test-key', [] as string[]));

    expect(result.current[0]).toEqual(['one']);
  });

  it('использует начальное значение при повреждённом JSON', () => {
    window.localStorage.setItem('test-key', '{broken');

    const { result } = renderHook(() => useLocalStorage('test-key', ['fallback']));

    expect(result.current[0]).toEqual(['fallback']);
  });

  it('сохраняет новое значение', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', [] as string[]));

    act(() => result.current[1](['one', 'two']));

    expect(JSON.parse(window.localStorage.getItem('test-key') ?? '[]')).toEqual(['one', 'two']);
  });
});
