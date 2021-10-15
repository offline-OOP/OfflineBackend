import { CategoriesEnum } from '@src/events/interfaces/categories.interface';

export interface EventInterface {
  name: string;
  category: CategoriesEnum;
  price: number;
  purchaseLink: string;
  description: string;
  link: string;
  age: number;
  maxPerson: number;
}
