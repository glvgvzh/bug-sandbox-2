import { Bookmark, CalendarDays, MapPin, X } from 'lucide-react';
import { useRef } from 'react';
import type { CityEvent } from '../types';
import { categoryLabels, formatEventDate, formatPrice } from '../utils/events';
import { useFocusManagement } from '../hooks/useFocusManagement';

type EventDetailsDialogProps = {
  event: CityEvent;
  isSaved: boolean;
  onToggleSaved: (id: string) => void;
  onClose: () => void;
};

export function EventDetailsDialog({
  event,
  isSaved,
  onToggleSaved,
  onClose,
}: EventDetailsDialogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  useFocusManagement(sectionRef, saveButtonRef, onClose);

  return (
    <div data-testid="dialog-backdrop" className="dialog-backdrop" onClick={onClose}>
      <section
        className="event-dialog"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        ref={sectionRef}
      >
        <button
          className="dialog-close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          ref={closeButtonRef}
        >
          <X size={21} />
        </button>
        <img className="dialog-image" src={event.imageUrl} alt={event.imageAlt} />
        <div className="dialog-content">
          <span className="category-label">{categoryLabels[event.category]}</span>
          <h2>{event.title}</h2>
          <div className="dialog-meta">
            <p>
              <CalendarDays size={18} /> {formatEventDate(event.startsAt)}
            </p>
            <p>
              <MapPin size={18} /> {event.venue}, {event.address}
            </p>
          </div>
          <p className="dialog-description">{event.description}</p>
          <ul className="tag-list" aria-label="Особенности события">
            {event.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="dialog-footer">
            <strong>{formatPrice(event.price)}</strong>
            <button type="button" onClick={() => onToggleSaved(event.id)} ref={saveButtonRef}>
              <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'Сохранено' : 'Сохранить'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
