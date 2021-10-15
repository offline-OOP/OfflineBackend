import { EventInterface } from '@src/events/interfaces/events.interface';

export interface CreateEventInterface {
  event: EventInterface;
  ownerId: string;
}
