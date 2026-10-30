import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('новое уведомление не исчезает по истечении времени существования старого', () => {
    const onClose = vi.fn();
    const { rerender } = render(<Toast message="test toast 1" onClose={onClose} />);
    expect(screen.getByText('test toast 1')).toBeInTheDocument();
    vi.advanceTimersByTime(1800);
    rerender(<Toast message="test toast 2" onClose={onClose} />);
    vi.advanceTimersByTime(1000);
    expect(screen.queryByText('test toast 1')).not.toBeInTheDocument();
    expect(screen.getByText('test toast 2')).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1800);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('после размонтирования компонент не вызывает onClose', () => {
    const onClose = vi.fn();
    const { unmount } = render(<Toast message="test toast 1" onClose={onClose} />);
    unmount();
    vi.advanceTimersByTime(2800);
    expect(onClose).not.toHaveBeenCalled();
  });
});
