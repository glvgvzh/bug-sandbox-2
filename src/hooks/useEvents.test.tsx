import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { seedEvents } from '../data/events';
import { fetchEvents } from '../services/eventsApi';
import { useEvents } from './useEvents';

vi.mock('../services/eventsApi', () => ({ fetchEvents: vi.fn() }));

describe('useEvents', () => {
  beforeEach(() => {
    vi.mocked(fetchEvents).mockResolvedValue(seedEvents);
  });

  it('загружает события', async () => {
    const { result } = renderHook(() => useEvents());

    await waitFor(() => expect(result.current.loadState).toBe('success'));

    expect(result.current.visibleEvents).toHaveLength(seedEvents.length);
  });

  it('добавляет и удаляет событие из сохранённых', async () => {
    const { result } = renderHook(() => useEvents());
    await waitFor(() => expect(result.current.loadState).toBe('success'));

    act(() => result.current.toggleSaved(seedEvents[0].id));
    expect(result.current.savedIds).toContain(seedEvents[0].id);

    act(() => result.current.toggleSaved(seedEvents[0].id));
    expect(result.current.savedIds).not.toContain(seedEvents[0].id);
  });

  it('показывает ошибку загрузки', async () => {
    vi.mocked(fetchEvents).mockRejectedValueOnce(new Error('Сервис недоступен'));

    const { result } = renderHook(() => useEvents());

    await waitFor(() => expect(result.current.loadState).toBe('error'));
    expect(result.current.error).toBe('Сервис недоступен');
  });
});
