import { Coordinates } from '@src/generic.interface';
import { DateTime } from 'luxon';
import { UserInterface } from '@src/users/interfaces/users.interface';

export interface GenericLineupInterface {
  datetime: DateTime;
  coordinates: Coordinates;
  address: string;
}

export interface FullLineupInterface extends GenericLineupInterface {
  id: string;
  participants: UserInterface[];
}
