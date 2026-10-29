import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SavedDrawer } from './SavedDrawer';
import { seedEvents } from '../data/events';
import userEvent from '@testing-library/user-event';

describe('SavedDrawer', () => {
  it('блокирует фоновый скролл при открытии сайдбара и восстанавливает при закрытии', () => {
    const { rerender } = render(
      <SavedDrawer
        isOpen={true}
        events={seedEvents}
        onOpenEvent={vi.fn()}
        onRemove={vi.fn()}
        onClose={vi.fn()}
      />,
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <SavedDrawer
        isOpen={false}
        events={seedEvents}
        onOpenEvent={vi.fn()}
        onRemove={vi.fn()}
        onClose={vi.fn()}
      />,
    );
    expect(document.body.style.overflow).toBe('auto');
  });

  it('закрывает панель при нажатии Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <SavedDrawer
        isOpen={true}
        events={seedEvents}
        onOpenEvent={vi.fn()}
        onRemove={vi.fn()}
        onClose={onClose}
      />,
    );

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('устанавливает фокус на кнопку закрытия сразу после открытия сайдбара', () => {
    render(
      <SavedDrawer
        isOpen={true}
        events={seedEvents}
        onOpenEvent={vi.fn()}
        onRemove={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Закрыть сохранённые' })).toHaveFocus();
  });

  it('перемещает фокус вперед и назад только по элементам внутри сайдбара', async () => {
    const user = userEvent.setup();
    render(
      <SavedDrawer
        isOpen={true}
        events={[seedEvents[0]]}
        onOpenEvent={vi.fn()}
        onRemove={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    await user.tab();
    const title = screen.getByText(seedEvents[0].title);
    const button = title.closest('button');
    expect(button).toHaveFocus();
    await user.tab();
    expect(
      screen.getByRole('button', { name: `Убрать ${seedEvents[0].title} из сохранённых` }),
    ).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Закрыть сохранённые' })).toHaveFocus();

    await user.tab({ shift: true });
    expect(
      screen.getByRole('button', { name: `Убрать ${seedEvents[0].title} из сохранённых` }),
    ).toHaveFocus();
    await user.tab({ shift: true });
    expect(button).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Закрыть сохранённые' })).toHaveFocus();
  });

  it('при удалении единственного элемента перемещает фокус на кнопку закрытия и сохраняет границы фокуса', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onClose = vi.fn();
    const { rerender } = render(
      <SavedDrawer
        isOpen={true}
        events={[seedEvents[0]]}
        onOpenEvent={vi.fn()}
        onRemove={onRemove}
        onClose={onClose}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: `Убрать ${seedEvents[0].title} из сохранённых` }),
    );

    rerender(
      <SavedDrawer
        isOpen={true}
        events={[]}
        onOpenEvent={vi.fn()}
        onRemove={onRemove}
        onClose={onClose}
      />,
    );
    expect(onRemove).toHaveBeenCalledWith(seedEvents[0].id);
    expect(screen.getByRole('button', { name: 'Закрыть сохранённые' })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Закрыть сохранённые' })).toHaveFocus();
  });

  it('при удалении последнего в списке (не единственного) элемента перемещает фокус на кнопку удаления предыдущего элемента и сохраняет границы фокуса', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onClose = vi.fn();
    const { rerender } = render(
      <SavedDrawer
        isOpen={true}
        events={[seedEvents[0], seedEvents[1]]}
        onOpenEvent={vi.fn()}
        onRemove={onRemove}
        onClose={onClose}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: `Убрать ${seedEvents[1].title} из сохранённых` }),
    );

    rerender(
      <SavedDrawer
        isOpen={true}
        events={[seedEvents[0]]}
        onOpenEvent={vi.fn()}
        onRemove={onRemove}
        onClose={onClose}
      />,
    );

    expect(
      screen.getByRole('button', { name: `Убрать ${seedEvents[0].title} из сохранённых` }),
    ).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Закрыть сохранённые' })).toHaveFocus();
    await user.tab();
    const title = screen.getByText(seedEvents[0].title);
    const button = title.closest('button');
    expect(button).toHaveFocus();
    await user.tab();
    expect(
      screen.getByRole('button', { name: `Убрать ${seedEvents[0].title} из сохранённых` }),
    ).toHaveFocus();

    await user.tab({ shift: true });
    expect(button).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Закрыть сохранённые' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(
      screen.getByRole('button', { name: `Убрать ${seedEvents[0].title} из сохранённых` }),
    ).toHaveFocus();
  });

  it('при удалении любого не последнего (не единственного) элемента в списке перемещает фокус на кнопку удаления следующего элемента', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onClose = vi.fn();
    const { rerender } = render(
      <SavedDrawer
        isOpen={true}
        events={[seedEvents[0], seedEvents[1]]}
        onOpenEvent={vi.fn()}
        onRemove={onRemove}
        onClose={onClose}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: `Убрать ${seedEvents[0].title} из сохранённых` }),
    );

    rerender(
      <SavedDrawer
        isOpen={true}
        events={[seedEvents[1]]}
        onOpenEvent={vi.fn()}
        onRemove={onRemove}
        onClose={onClose}
      />,
    );

    expect(
      screen.getByRole('button', { name: `Убрать ${seedEvents[1].title} из сохранённых` }),
    ).toHaveFocus();
  });
});
