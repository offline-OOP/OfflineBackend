import { Min, Max, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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

export class CreatedDto {
  @ApiProperty({ example: '3f428a5a-3a9b-41eb-aa21-87bce6408b98' })
  id: string;
}

export class CoordinatesDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: -26.13315249871467 })
  x: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: 28.06471524455919 })
  y: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ example: 25.06471524455919 })
  z?: number;
}
