import { CategoriesEnum } from '@src/events/interfaces/categories.interface';

export const firstEvent = {
  name: 'fistEvent',
  category: CategoriesEnum.OFFLINE_EVENT,
  price: 100,
  purchaseLink: 'https://localhost',
  description: 'Some event',
  link: 'https://localhost',
  age: 18,
  maxPerson: 45,
};
export const secondEvent = {
  name: 'second',
  category: CategoriesEnum.OFFLINE_EVENT,
  price: 2,
  purchaseLink: 'https://123',
  description: 'Second',
  link: 'https://234',
  age: 0,
  maxPerson: 0,
};
