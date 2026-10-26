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

  it('быстрые действия не открывают подробности события', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onToggleSaved = vi.fn();
    const onShare = vi.fn();
    render(
      <EventCard
        event={seedEvents[0]}
        isSaved={false}
        onOpen={onOpen}
        onToggleSaved={onToggleSaved}
        onShare={onShare}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Сохранить/ }));
    expect(onToggleSaved).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole('button', { name: /Поделиться событием/ }));
    expect(onShare).toHaveBeenCalledTimes(1);
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('нажатия Enter/Space на кнопках действий с клавиатуры не открывают подробности события', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onToggleSaved = vi.fn();
    const onShare = vi.fn();
    render(
      <EventCard
        event={seedEvents[0]}
        isSaved={false}
        onOpen={onOpen}
        onToggleSaved={onToggleSaved}
        onShare={onShare}
      />,
    );

    screen.getByRole('article').focus();
    await user.tab();
    expect(screen.getByRole('button', { name: /Сохранить/ })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onToggleSaved).toHaveBeenCalledTimes(1);
    expect(onOpen).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /Сохранить/ })).toHaveFocus();
    await user.keyboard(' ');
    expect(onToggleSaved).toHaveBeenCalledTimes(2);
    expect(onOpen).not.toHaveBeenCalled();

    screen.getByRole('button', { name: /Сохранить/ }).focus();
    await user.tab();
    expect(screen.getByRole('button', { name: /Поделиться событием/ })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onShare).toHaveBeenCalledTimes(1);
    expect(onOpen).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /Поделиться событием/ })).toHaveFocus();
    await user.keyboard(' ');
    expect(onShare).toHaveBeenCalledTimes(2);
    expect(onOpen).not.toHaveBeenCalled();
  });
});
