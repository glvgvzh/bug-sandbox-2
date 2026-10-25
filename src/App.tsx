import { ArrowRight, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { AppHeader } from './components/AppHeader';
import { EventDetailsDialog } from './components/EventDetailsDialog';
import { EventGrid } from './components/EventGrid';
import { FilterBar } from './components/FilterBar';
import { SavedDrawer } from './components/SavedDrawer';
import { Toast } from './components/Toast';
import { useEvents } from './hooks/useEvents';
import type { CityEvent } from './types';

export function App() {
  const events = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<CityEvent | null>(null);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function shareEvent(event: CityEvent) {
    await navigator.clipboard.writeText(`${event.title} — ${window.location.href}`);
    setToast('Ссылка скопирована');
  }

  return (
    <div id="top" className="app-shell">
      <AppHeader savedCount={events.savedIds.length} onOpenSaved={() => setIsSavedOpen(true)} />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow">Афиша без лишнего шума</p>
            <h1 id="hero-title">Выберите, куда выбраться на этой неделе</h1>
            <p className="hero-copy">
              Небольшие концерты, лекции, спектакли и прогулки рядом с вами.
            </p>
            <a className="hero-link" href="#events">
              Смотреть события <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-note" aria-label="Редакторская подборка">
            <span>6</span>
            <p>событий в свежей подборке редакции</p>
          </div>
        </section>

        <section className="events-section" aria-labelledby="events-title">
          <div className="section-heading">
            <div>
              <p id="events" className="eyebrow">Ближайшие события</p>
              <h2 id="events-title">Есть планы?</h2>
            </div>
            <p>Выбирайте по настроению и сохраняйте интересное на потом.</p>
          </div>

          <FilterBar filters={events.filters} onChange={events.setFilters} />

          {events.loadState === 'loading' && (
            <div className="loading-state" role="status">
              <span className="spinner" /> Загружаем афишу…
            </div>
          )}

          {events.loadState === 'error' && (
            <div className="error-state" role="alert">
              <p>{events.error}</p>
              <button type="button" onClick={() => void events.reload()}>
                <RefreshCw size={17} /> Попробовать снова
              </button>
            </div>
          )}

          {events.loadState === 'success' && (
            <EventGrid
              events={events.visibleEvents}
              savedIds={events.savedIds}
              onOpen={setSelectedEvent}
              onToggleSaved={events.toggleSaved}
              onShare={(event) => void shareEvent(event)}
            />
          )}
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <p className="eyebrow">О проекте</p>
          <h2 id="about-title">Город интереснее, когда знаешь, что происходит рядом</h2>
          <p>Мы собираем небольшие независимые события и обновляем подборку каждую неделю.</p>
        </section>
      </main>

      <footer>
        <strong>Пульс города</strong>
        <span>Демо-проект городской афиши</span>
      </footer>

      <SavedDrawer
        isOpen={isSavedOpen}
        events={events.savedEvents}
        onOpenEvent={(event) => {
          setSelectedEvent(event);
          setIsSavedOpen(false);
        }}
        onRemove={events.toggleSaved}
        onClose={() => setIsSavedOpen(false)}
      />

      {isSavedOpen && <div className="drawer-backdrop" onClick={() => setIsSavedOpen(false)} />}

      {selectedEvent && (
        <EventDetailsDialog
          event={selectedEvent}
          isSaved={events.savedIds.includes(selectedEvent.id)}
          onToggleSaved={events.toggleSaved}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
