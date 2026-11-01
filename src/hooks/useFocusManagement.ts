import { type RefObject, useEffect } from 'react';

export function useFocusManagement(
  containerRef: RefObject<HTMLElement>,
  targetRef: RefObject<HTMLElement>,
  onClose: () => void,
  isOpen: boolean = true,
) {
  useEffect(() => {
    function handleKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.key === 'Escape') onClose();
      if (keyboardEvent.key === 'Tab') {
        const allFocusableElements = containerRef.current!.querySelectorAll('button');
        const lastFocusableElement = allFocusableElements[allFocusableElements.length - 1];
        const firstFocusableElement = allFocusableElements[0];
        if (!keyboardEvent.shiftKey && keyboardEvent.target === lastFocusableElement) {
          keyboardEvent.preventDefault();
          firstFocusableElement.focus();
        }
        if (keyboardEvent.shiftKey && keyboardEvent.target === firstFocusableElement) {
          keyboardEvent.preventDefault();
          lastFocusableElement.focus();
        }
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, containerRef]);

  useEffect(() => {
    if (isOpen) {
      const previouslyFocusedElement = document.activeElement;
      targetRef.current?.focus({ preventScroll: true });
      return () => {
        if (previouslyFocusedElement instanceof HTMLElement) {
          previouslyFocusedElement.focus({ preventScroll: true });
        }
      };
    }
  }, [isOpen, targetRef]);
}
