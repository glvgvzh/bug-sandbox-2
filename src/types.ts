export type EventCategory = 'music' | 'theatre' | 'lecture' | 'workshop' | 'outdoors';

export type CityEvent = {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  venue: string;
  address: string;
  startsAt: string;
  price: number | null;
  ageRating: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
};

export type EventFilters = {
  query: string;
  category: EventCategory | 'all';
  date: 'all' | 'today' | 'weekend';
  onlyFree: boolean;
};

export type LoadState = 'idle' | 'loading' | 'success' | 'error';
