import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import type { EventFilters } from '../types';
import { categoryLabels } from '../utils/events';

type FilterBarProps = {
  filters: EventFilters;
  onChange: (filters: EventFilters) => void;
};

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="filters" aria-label="Фильтры событий">
      <div className="search-field">
        <span>Поиск</span>
        <input
          type="search"
          placeholder="Событие или площадка"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
        />
      </div>

      <button
        className="filter-toggle"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={18} /> : <SlidersHorizontal size={18} />}
        Фильтры
      </button>

      <div className={`filter-controls ${isOpen ? 'is-open' : ''}`}>
        <div className="select-field">
          <span>Категория</span>
          <select
            value={filters.category}
            onChange={(event) =>
              onChange({ ...filters, category: event.target.value as EventFilters['category'] })
            }
          >
            <option value="all">Все категории</option>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="select-field">
          <span>Когда</span>
          <select
            value={filters.date}
            onChange={(event) =>
              onChange({ ...filters, date: event.target.value as EventFilters['date'] })
            }
          >
            <option value="all">В любое время</option>
            <option value="today">Сегодня</option>
            <option value="weekend">На выходных</option>
          </select>
        </div>

        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={filters.onlyFree}
            onChange={(event) => onChange({ ...filters, onlyFree: event.target.checked })}
          />
          Только бесплатные
        </label>
      </div>
    </section>
  );
}
