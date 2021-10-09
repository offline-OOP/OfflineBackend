import { Min, Max, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Max(10000)
  @Type(() => Number)
  limit: number;
}
