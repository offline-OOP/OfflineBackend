import { CategoriesEnum } from '@src/events/interfaces/categories.interface';
import { UserEntity } from '@src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LineupsEntity } from '@src/events/lineups/lineups.entity';

export class EventEntity {
  @ApiProperty({ example: '3f428a5a-3a9b-41eb-aa21-87bce6408b98' })
  id: string;

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

  @ApiProperty({ example: UserEntity })
  owner: UserEntity;

  @ApiProperty({ type: [LineupsEntity] })
  lineups: LineupsEntity[];

  constructor(partial: Partial<EventEntity>) {
    this.id = partial.id;
    this.name = partial.name;
    this.category = partial.category;
    this.price = partial.price;
    this.purchaseLink = partial.purchaseLink;
    this.description = partial.description;
    this.link = partial.link;
    this.age = partial.age;
    this.maxPerson = partial.maxPerson;
    this.owner = new UserEntity(partial.owner);
    this.lineups = partial.lineups.map((lineup) => new LineupsEntity(lineup));
  }
}
