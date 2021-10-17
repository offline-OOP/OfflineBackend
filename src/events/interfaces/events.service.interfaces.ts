import { GenericEventInterface } from '@src/events/interfaces/events.interface';
import { UserInterface } from '@src/users/interfaces/users.interface';

export interface CreateEventInterface {
  event: GenericEventInterface;
  ownerId: string;
}

export interface FindOneInterface {
  eventId: string;
}

export interface RemoveEventInterface {
  user: UserInterface;
  eventId: string;
}

export interface UpdateEventInterface {
  event: Partial<GenericEventInterface>;
  user: UserInterface;
  eventId: string;
}
