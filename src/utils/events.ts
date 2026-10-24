import type { CityEvent, EventFilters } from '../types';

export const categoryLabels: Record<CityEvent['category'], string> = {
  music: 'Музыка',
  theatre: 'Театр',
  lecture: 'Лекции',
  workshop: 'Мастер-классы',
  outdoors: 'На улице',
};

export function filterEvents(events: CityEvent[], filters: EventFilters, now = new Date()) {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(endOfToday.getDate() + 1);

  const saturday = new Date(startOfToday);
  saturday.setDate(saturday.getDate() + ((6 - saturday.getDay() + 7) % 7));
  const monday = new Date(saturday);
  monday.setDate(monday.getDate() + 2);

  return events.filter((event) => {
    const startsAt = new Date(event.startsAt);
    const matchesQuery = `${event.title} ${event.venue}`
      .toLowerCase()
      .includes(filters.query.toLowerCase().trim());
    const matchesCategory = filters.category === 'all' || event.category === filters.category;
    const matchesPrice = !filters.onlyFree || event.price === 0;
    const matchesDate =
      filters.date === 'all' ||
      (filters.date === 'today' && startsAt >= startOfToday && startsAt < endOfToday) ||
      (filters.date === 'weekend' && startsAt >= saturday && startsAt < monday);

    return matchesQuery && matchesCategory && matchesPrice && matchesDate;
  });
}

export function formatEventDate(value: string) {
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export function formatPrice(price: number | null) {
  if (price === 0) return 'Бесплатно';
  if (price === null) return 'Цена уточняется';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}
