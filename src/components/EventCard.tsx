import { Bookmark, CalendarDays, MapPin, Share2 } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import type { CityEvent } from '../types';
import { categoryLabels, formatEventDate, formatPrice } from '../utils/events';

type EventCardProps = {
  event: CityEvent;
  isSaved: boolean;
  onOpen: (event: CityEvent) => void;
  onToggleSaved: (id: string) => void;
  onShare: (event: CityEvent) => void;
};

export function EventCard({ event, isSaved, onOpen, onToggleSaved, onShare }: EventCardProps) {
  function handleKeyDown(keyboardEvent: KeyboardEvent<HTMLElement>) {
    if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
      onOpen(event);
    }
  }

  return (
    <article
      className="event-card"
      tabIndex={0}
      onClick={() => onOpen(event)}
      onKeyDown={handleKeyDown}
    >
      <div className="event-image-wrap">
        <img className="event-image" src={event.imageUrl} alt={event.imageAlt} />
        <span className="category-badge">{categoryLabels[event.category]}</span>
        <div className="card-actions">
          <button
            className={`icon-button ${isSaved ? 'is-active' : ''}`}
            type="button"
            aria-label={
              isSaved ? `Убрать ${event.title} из сохранённых` : `Сохранить ${event.title}`
            }
            onClick={(e) => {
              e.stopPropagation();
              onToggleSaved(event.id);
            }}
          >
            <Bookmark size={19} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label={`Поделиться событием ${event.title}`}
            onClick={(e) => {
              e.stopPropagation();
              onShare(event);
            }}
          >
            <Share2 size={19} />
          </button>
        </div>
      </div>

      <div className="event-card-body">
        <p className="event-date">
          <CalendarDays size={17} />
          {formatEventDate(event.startsAt)}
        </p>
        <h2 className="text-clamp-2">{event.title}</h2>
        <p className="event-venue">
          <MapPin size={17} />
          <span>{event.venue}</span>
        </p>
        <div className="event-card-footer">
          <strong>{formatPrice(event.price)}</strong>
          <span>{event.ageRating}</span>
        </div>
      </div>
    </article>
  );
}
