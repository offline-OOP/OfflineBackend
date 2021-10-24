import { IsDateString, ValidateNested, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';
import { CoordinatesDto } from '@src/generic.dto';

export class CreateLineupDto {
  @IsDateString()
  @ApiProperty({ example: DateTime.local() })
  datetime: DateTime;

  @ValidateNested()
  @ApiProperty({ example: { x: -26.13315249871467, y: 28.06471524455919 } })
  coordinates: CoordinatesDto;

  @ApiProperty({ example: 'Madison Square Garden' })
  @IsString()
  address: string;
}
