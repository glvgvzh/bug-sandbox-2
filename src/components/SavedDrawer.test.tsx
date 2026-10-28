import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { SavedDrawer } from './SavedDrawer';
import { seedEvents } from '../data/events';

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
});
