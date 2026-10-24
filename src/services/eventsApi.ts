import { seedEvents } from '../data/events';
import type { CityEvent } from '../types';

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

export async function fetchEvents(): Promise<CityEvent[]> {
  await delay(450);
  if (Math.random() < 0.06) {
    throw new Error('Не удалось загрузить события');
  }
  return seedEvents.map((event) => ({ ...event, tags: [...event.tags] }));
}
