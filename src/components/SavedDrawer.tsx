import { useEffect, useRef } from 'react';
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
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const previouslyFocusedElement = document.activeElement;
      closeButtonRef.current?.focus({ preventScroll: true });
      return () => {
        if (previouslyFocusedElement instanceof HTMLElement)
          previouslyFocusedElement.focus({ preventScroll: true });
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const allFocusableElements = document
      .querySelector('#saved-drawer')!
      .querySelectorAll('button');
    const lastFocusableElement = allFocusableElements[allFocusableElements.length - 1];

    function handleKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === 'Escape') onClose();
      if (keyboardEvent.key === 'Tab') {
        if (!keyboardEvent.shiftKey && keyboardEvent.target === lastFocusableElement) {
          keyboardEvent.preventDefault();
          closeButtonRef.current?.focus();
        }
        if (keyboardEvent.shiftKey && keyboardEvent.target === closeButtonRef.current) {
          keyboardEvent.preventDefault();
          lastFocusableElement.focus();
        }
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, events]);
  return (
    <aside
      aria-labelledby="saved-drawer-title"
      className={`saved-drawer ${isOpen ? 'is-open' : ''}`}
      id="saved-drawer"
      ref={drawerRef}
    >
      <div className="drawer-heading">
        <div>
          <p className="eyebrow">Ваш список</p>
          <h2 id="saved-drawer-title">Сохранённые события</h2>
        </div>
        <button
          ref={closeButtonRef}
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
          {events.map((event, index) => (
            <li key={event.id}>
              <button className="saved-event" type="button" onClick={() => onOpenEvent(event)}>
                <span>{event.title}</span>
                <small>{formatEventDate(event.startsAt)}</small>
              </button>
              <button
                className="remove-saved"
                type="button"
                aria-label={`Убрать ${event.title} из сохранённых`}
                onClick={() => {
                  let nextFocus: HTMLButtonElement;
                  const removeButtons =
                    drawerRef.current!.querySelectorAll<HTMLButtonElement>('button.remove-saved');
                  if (events.length === 1) {
                    nextFocus = closeButtonRef.current!;
                  } else if (events[events.length - 1].id === event.id) {
                    nextFocus = removeButtons[index - 1];
                  } else {
                    nextFocus = removeButtons[index + 1];
                  }
                  onRemove(event.id);
                  nextFocus.focus();
                }}
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
