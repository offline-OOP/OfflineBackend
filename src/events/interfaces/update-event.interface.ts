import { GenericEventInterface } from '@src/events/interfaces/events.interface';
import { UserInterface } from '@src/users/interfaces/users.interface';

export interface UpdateEventInterface {
  event: Partial<GenericEventInterface>;
  user: UserInterface;
  eventId: string;
}
