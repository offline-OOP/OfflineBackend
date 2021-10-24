import { DateTime } from 'luxon';
import { UserEntity } from '@src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Coordinates } from '@src/generic.interface';

export class LineupsEntity {
  @ApiProperty({ example: '3f428a5a-3a9b-41eb-aa21-87bce6408b98' })
  id: string;

  @ApiProperty({ example: DateTime.local() })
  datetime: DateTime;

  @ApiProperty({ example: { x: -26.13315249871467, y: 28.06471524455919 } })
  coordinates: Coordinates;

  @ApiProperty({ example: 'Madison Square Garden' })
  address: string;

  @ApiProperty({ type: [UserEntity] })
  participants: UserEntity[];

  constructor(partial: Partial<LineupsEntity>) {
    this.id = partial.id;
    this.datetime = partial.datetime;
    this.coordinates = partial.coordinates;
    this.address = partial.address;
    this.participants = partial.participants.map(
      (participant) => new UserEntity(participant),
    );
  }
}
