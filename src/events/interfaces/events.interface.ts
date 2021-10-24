import { CategoriesEnum } from '@src/events/interfaces/categories.interface';
import { UserInterface } from '@src/users/interfaces/users.interface';
import { FullLineupInterface } from '@src/events/lineups/interfaces/lineup.interface';

export interface GenericEventInterface {
  name: string;
  category: CategoriesEnum;
  price: number;
  purchaseLink: string;
  description: string;
  link: string;
  age: number;
  maxPerson: number;
}

export interface FullEventInterface extends GenericEventInterface {
  id: string;
  owner: UserInterface;
  lineups: FullLineupInterface[];
}
