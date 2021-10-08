import { IsEnum } from 'class-validator';
import { DirectionEnum } from '@src/friends/interfaces/frineds.service.interfaces';
import { PaginationDto } from '@src/generic.dto';

export class GetFriendsDto extends PaginationDto {
  @IsEnum(DirectionEnum)
  direction: DirectionEnum;
}
