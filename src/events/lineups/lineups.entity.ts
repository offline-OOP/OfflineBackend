import { DateTime } from 'luxon';
import { UserEntity } from '@src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Coordinates } from '@src/generic.interface';

export class LineupsEntity {
  @ApiProperty({ example: DateTime.local() })
  datetime: DateTime;

  @ApiProperty({ example: { x: -26.13315249871467, y: 28.06471524455919 } })
  coordinates: Coordinates;

  @ApiProperty({ example: 'Madison Square Garden' })
  address: string;

  @ApiProperty({ type: [UserEntity] })
  participants: UserEntity[];
}
