import { GenericEventInterface } from '@src/events/interfaces/events.interface';

export interface CreateEventInterface {
  event: GenericEventInterface;
  ownerId: string;
}
