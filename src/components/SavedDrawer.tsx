import { BookmarkX, X } from 'lucide-react';
import type { CityEvent } from '../types';
import { formatEventDate } from '../utils/events';

type SavedDrawerProps = {
  isOpen: boolean;
  events: CityEvent[];
  onOpenEvent: (event: CityEvent) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
};

export function SavedDrawer({ isOpen, events, onOpenEvent, onRemove, onClose }: SavedDrawerProps) {
  return (
    <aside className={`saved-drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <div className="drawer-heading">
        <div>
          <p className="eyebrow">Ваш список</p>
          <h2>Сохранённые события</h2>
        </div>
        <button
          className="icon-button"
          type="button"
          aria-label="Закрыть сохранённые"
          onClick={onClose}
        >
          <X size={21} />
        </button>
      </div>

      {events.length === 0 ? (
        <p className="drawer-empty">Здесь появятся события, которые вы захотите не потерять.</p>
      ) : (
        <ul className="saved-list">
          {events.map((event) => (
            <li key={event.id}>
              <button className="saved-event" type="button" onClick={() => onOpenEvent(event)}>
                <span>{event.title}</span>
                <small>{formatEventDate(event.startsAt)}</small>
              </button>
              <button
                className="remove-saved"
                type="button"
                aria-label={`Убрать ${event.title} из сохранённых`}
                onClick={() => onRemove(event.id)}
              >
                <BookmarkX size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
