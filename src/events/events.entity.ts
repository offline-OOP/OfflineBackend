import { CategoriesEnum } from '@src/events/interfaces/categories.interface';
import { UserEntity } from '@src/users/user.entity';

export class EventEntity {
  name: string;
  category: CategoriesEnum;
  price: number;
  purchaseLink: string;
  description: string;
  link: string;
  age: number;
  maxPerson: number;
  owner: UserEntity;
  participants: UserEntity[];

  constructor(partial: Partial<EventEntity>) {
    this.name = partial.name;
    this.category = partial.category;
    this.price = partial.price;
    this.purchaseLink = partial.purchaseLink;
    this.description = partial.description;
    this.link = partial.link;
    this.age = partial.age;
    this.maxPerson = partial.maxPerson;
    this.owner = new UserEntity(partial.owner);
    this.participants = partial.participants.map((user) => {
      return new UserEntity(user);
    });
  }
}
