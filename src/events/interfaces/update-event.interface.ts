import { EventInterface } from '@src/events/interfaces/events.interface';
import { UserInterface } from '@src/users/interfaces/users.interface';

export interface UpdateEventInterface {
  event: Partial<EventInterface>;
  user: UserInterface;
  eventId: string;
}
