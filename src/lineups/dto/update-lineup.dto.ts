import { CreateLineupDto } from '@src/lineups/dto/create-lineup.dto';
import { IsOptional } from 'class-validator';
import { DateTime } from 'luxon';
import { CoordinatesDto } from '@src/generic.dto';
import { UserEntity } from '@src/users/user.entity';

export class UpdateLineupDto extends CreateLineupDto {
  @IsOptional()
  datetime: DateTime;

  @IsOptional()
  coordinates: CoordinatesDto;

  @IsOptional()
  address: string;

  @IsOptional()
  participants: UserEntity[];
}
