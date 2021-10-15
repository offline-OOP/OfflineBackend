import {
  IsString,
  Length,
  IsEnum,
  IsOptional,
  IsNumber,
  IsPositive,
  IsUrl,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CategoriesEnum } from '@src/events/interfaces/categories.interface';

export class CreateEventDto {
  @ApiProperty({ example: 'Example event' })
  @IsString()
  @Length(2, 200)
  name: string;

  @ApiProperty({ example: CategoriesEnum.OFFLINE_EVENT })
  @IsEnum(CategoriesEnum)
  @IsOptional()
  category: CategoriesEnum;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 'https://event.com' })
  @IsOptional()
  @IsUrl({ protocols: ['https'] })
  purchaseLink: string;

  @ApiProperty({ example: 'Some example event' })
  @IsOptional()
  @Length(0, 5000)
  description: string;

  @ApiProperty({ example: 'https://event.com' })
  @IsOptional()
  @IsUrl({ protocols: ['https'] })
  link: string;

  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  age: number;

  @ApiProperty({ example: 50 })
  @IsOptional()
  @IsPositive()
  maxPerson: number;
}
