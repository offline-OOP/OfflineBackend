import { CategoriesEnum } from '@src/events/interfaces/categories.interface';
import { UserEntity } from '@src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class EventEntity {
  @ApiProperty({ example: 'Example event' })
  name: string;

  @ApiProperty({ example: CategoriesEnum.OFFLINE_EVENT })
  category: CategoriesEnum;

  @ApiProperty({ example: 100 })
  price: number;

  @ApiProperty({ example: 'https://event.com' })
  purchaseLink: string;

  @ApiProperty({ example: 'Some event description' })
  description: string;

  @ApiProperty({ example: 'https://event.com' })
  link: string;

  @ApiProperty({ example: 18 })
  age: number;

  @ApiProperty({ example: 5 })
  maxPerson: number;

  @ApiProperty()
  owner: UserEntity;

  @ApiProperty({ type: [UserEntity] })
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
