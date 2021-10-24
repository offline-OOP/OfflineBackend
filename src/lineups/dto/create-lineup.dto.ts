import { IsDate, ValidateNested, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';
import { CoordinatesDto } from '@src/generic.dto';
import { UserEntity } from '@src/users/user.entity';

export class CreateLineupDto {
  @IsDate()
  @ApiProperty({ example: DateTime.local() })
  datetime: DateTime;

  @ValidateNested()
  @ApiProperty({ example: { x: -26.13315249871467, y: 28.06471524455919 } })
  coordinates: CoordinatesDto;

  @ApiProperty({ example: 'Madison Square Garden' })
  address: string;

  @ApiProperty({ type: [UserEntity] })
  participants: UserEntity[];
}
