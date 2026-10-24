import type { CityEvent } from '../types';
import { EventCard } from './EventCard';

type EventGridProps = {
  events: CityEvent[];
  savedIds: string[];
  onOpen: (event: CityEvent) => void;
  onToggleSaved: (id: string) => void;
  onShare: (event: CityEvent) => void;
};

export function EventGrid({ events, savedIds, onOpen, onToggleSaved, onShare }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="empty-state">
        <p>Ничего не нашли</p>
        <span>Попробуйте изменить запрос или фильтры.</span>
      </div>
    );
  }

  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isSaved={savedIds.includes(event.id)}
          onOpen={onOpen}
          onToggleSaved={onToggleSaved}
          onShare={onShare}
        />
      ))}
    </div>
  );
}
