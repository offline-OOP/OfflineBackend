import { UserInterface } from '@src/users/interfaces/users.interface';
import { GenericLineupInterface } from '@src/lineups/interfaces/lineup.interface';

export interface CreateLineupInterface {
  eventId: string;
  user: UserInterface;
  lineup: GenericLineupInterface;
}

export interface UpdateLineupInterface {
  eventId: string;
  user: UserInterface;
  lineup: Partial<GenericLineupInterface>;
  lineupId: string;
}

export interface RemoveLineupInterface {
  user: UserInterface;
  eventId: string;
  lineupId: string;
}
