import { IsEnum } from 'class-validator';
import { DirectionEnum } from '@src/generic.interface';
import { PaginationDto } from '@src/generic.dto';

export class GetFriendsDto extends PaginationDto {
  @IsEnum(DirectionEnum)
  direction: DirectionEnum;
}
