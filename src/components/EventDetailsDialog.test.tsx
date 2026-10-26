import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventDetailsDialog } from './EventDetailsDialog';
import { seedEvents } from '../data/events';

describe('EventDetailsDialog', () => {
  it('не закрывает окно при кликах по элементам внутри него', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onToggleSaved = vi.fn();
    render(
      <EventDetailsDialog
        event={seedEvents[1]}
        isSaved={false}
        onToggleSaved={onToggleSaved}
        onClose={onClose}
      />,
    );

    await user.click(screen.getByRole('dialog'));
    await user.click(screen.getByRole('img'));
    await user.click(screen.getByText(`${seedEvents[1].title}`));
    await user.click(screen.getByText(`${seedEvents[1].description}`));
    await user.click(screen.getByText(`${seedEvents[1].price} ₽`));
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(onToggleSaved).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('закрывает окно по клику снаружи него', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <EventDetailsDialog
        event={seedEvents[1]}
        isSaved={false}
        onToggleSaved={vi.fn()}
        onClose={onClose}
      />,
    );

    await user.click(screen.getByTestId('dialog-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('закрывает окно по клику на кнопку закрытия', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <EventDetailsDialog
        event={seedEvents[1]}
        isSaved={false}
        onToggleSaved={vi.fn()}
        onClose={onClose}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
