import { useEffect, useMemo, useState } from 'react';
import { fetchEvents } from '../services/eventsApi';
import type { CityEvent, EventFilters, LoadState } from '../types';
import { filterEvents } from '../utils/events';
import { useLocalStorage } from './useLocalStorage';

const defaultFilters: EventFilters = {
  query: '',
  category: 'all',
  date: 'all',
  onlyFree: false,
};

export function useEvents() {
  const [events, setEvents] = useState<CityEvent[]>([]);
  const [savedIds, setSavedIds] = useLocalStorage<string[]>('city-pulse:saved', []);
  const [filters, setFilters] = useState(defaultFilters);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoadState('loading');
    try {
      const result = await fetchEvents();
      setEvents(result);
      setError(null);
      setLoadState('success');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Не удалось загрузить события');
      setLoadState('error');
    }
  }

  useEffect(() => {
    let isActive = true;
    void fetchEvents()
      .then((result) => {
        if (!isActive) return;
        setEvents(result);
        setError(null);
        setLoadState('success');
      })
      .catch((loadError: unknown) => {
        if (!isActive) return;
        setError(loadError instanceof Error ? loadError.message : 'Не удалось загрузить события');
        setLoadState('error');
      });
    return () => {
      isActive = false;
    };
  }, []);

  const visibleEvents = useMemo(() => filterEvents(events, filters), [events, filters]);
  const savedEvents = useMemo(
    () => events.filter((event) => savedIds.includes(event.id)),
    [events, savedIds],
  );

  function toggleSaved(id: string) {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    );
  }

  return {
    filters,
    setFilters,
    visibleEvents,
    savedEvents,
    savedIds,
    toggleSaved,
    loadState,
    error,
    reload: load,
  };
}
