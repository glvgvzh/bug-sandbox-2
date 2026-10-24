import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar } from './FilterBar';

describe('FilterBar', () => {
  it('нажатия на подписи фильтров активируют их соответствующие поля', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar
        filters={{ query: '', category: 'all', date: 'all', onlyFree: false }}
        onChange={vi.fn()}
      />,
    );

    await user.click(screen.getByText('Поиск'));
    expect(screen.getByPlaceholderText('Событие или площадка')).toHaveFocus();

    await user.click(screen.getByText('Категория'));
    expect(screen.getByRole('combobox', { name: 'Категория' })).toHaveFocus();

    await user.click(screen.getByText('Когда'));
    expect(screen.getByRole('combobox', { name: 'Когда' })).toHaveFocus();
  });
});
