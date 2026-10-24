import { Bookmark, MapPin } from 'lucide-react';

type AppHeaderProps = {
  savedCount: number;
  onOpenSaved: () => void;
};

export function AppHeader({ savedCount, onOpenSaved }: AppHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Пульс города — на главную">
        <span className="brand-mark" aria-hidden="true">
          <MapPin size={22} />
        </span>
        <span>
          <strong>Пульс города</strong>
          <small>Идеи для свободного вечера</small>
        </span>
      </a>

      <nav className="main-nav" aria-label="Основная навигация">
        <a href="#events">События</a>
        <a href="#about">О проекте</a>
      </nav>

      <button className="saved-button" type="button" onClick={onOpenSaved}>
        <Bookmark size={18} />
        Сохранённые
        <span className="saved-count" aria-label={`${savedCount} сохранённых событий`}>
          {savedCount}
        </span>
      </button>
    </header>
  );
}
