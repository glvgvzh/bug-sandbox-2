import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { seedEvents } from '../data/events';
import { EventCard } from './EventCard';

describe('EventCard', () => {
  it('показывает основную информацию о событии', () => {
    render(
      <EventCard
        event={seedEvents[0]}
        isSaved={false}
        onOpen={vi.fn()}
        onToggleSaved={vi.fn()}
        onShare={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: seedEvents[0].title })).toBeInTheDocument();
    expect(screen.getByText(seedEvents[0].venue)).toBeInTheDocument();
  });

  it('открывает подробности по нажатию на карточку', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    render(
      <EventCard
        event={seedEvents[0]}
        isSaved={false}
        onOpen={onOpen}
        onToggleSaved={vi.fn()}
        onShare={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('heading', { name: seedEvents[0].title }));

    expect(onOpen).toHaveBeenCalledWith(seedEvents[0]);
  });

  it('передаёт идентификатор при сохранении', async () => {
    const user = userEvent.setup();
    const onToggleSaved = vi.fn();
    render(
      <EventCard
        event={seedEvents[0]}
        isSaved={false}
        onOpen={vi.fn()}
        onToggleSaved={onToggleSaved}
        onShare={vi.fn()}
      />,
    );

    await user.click(screen.getByRole('button', { name: `Сохранить ${seedEvents[0].title}` }));

    expect(onToggleSaved).toHaveBeenCalledWith(seedEvents[0].id);
  });
});
