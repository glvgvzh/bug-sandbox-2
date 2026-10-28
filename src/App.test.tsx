import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { seedEvents } from './data/events';
import { fetchEvents } from './services/eventsApi';

vi.mock('./services/eventsApi', () => ({
  fetchEvents: vi.fn(),
}));

describe('App', () => {
  it('возвращает фокус на карточку после закрытия окна подробностей события', async () => {
    vi.mocked(fetchEvents).mockResolvedValue(
      seedEvents.map((event) => ({ ...event, tags: [...event.tags] })),
    );
    const user = userEvent.setup();
    render(<App />);

    const title = await screen.findByText(seedEvents[0].title);
    const firstCard = title.closest('article');
    expect(firstCard).not.toBeNull();
    firstCard!.focus();
    expect(firstCard).toHaveFocus();

    await user.keyboard('{Enter}');

    const dialog = screen.getByRole('dialog');
    const saveButton = within(dialog).getByRole('button', { name: /Сохран/ });
    expect(saveButton).toHaveFocus();

    await user.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(firstCard).toHaveFocus();
  });
});
