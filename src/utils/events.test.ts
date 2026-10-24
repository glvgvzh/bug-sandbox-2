import { describe, expect, it } from 'vitest';
import { seedEvents } from '../data/events';
import type { EventFilters } from '../types';
import { filterEvents, formatPrice } from './events';

const defaultFilters: EventFilters = {
  query: '',
  category: 'all',
  date: 'all',
  onlyFree: false,
};

describe('утилиты событий', () => {
  it('фильтрует события по категории', () => {
    const result = filterEvents(seedEvents, { ...defaultFilters, category: 'music' });

    expect(result).toHaveLength(2);
    expect(result.every((event) => event.category === 'music')).toBe(true);
  });

  it('ищет без учёта регистра и внешних пробелов', () => {
    const result = filterEvents(seedEvents, { ...defaultFilters, query: '  ТИПОГРАФИЯ  ' });

    expect(result).toEqual([seedEvents[0]]);
  });

  it('показывает только бесплатные события', () => {
    const result = filterEvents(seedEvents, { ...defaultFilters, onlyFree: true });

    expect(result).toHaveLength(3);
    expect(result.every((event) => event.price === 0)).toBe(true);
  });

  it('форматирует бесплатный вход отдельно от неизвестной цены', () => {
    expect(formatPrice(0)).toBe('Бесплатно');
    expect(formatPrice(null)).toBe('Цена уточняется');
  });
});
