import { IsOptional } from 'class-validator';
import { CategoriesEnum } from '@src/events/interfaces/categories.interface';
import { CreateEventDto } from '@src/events/dto/create-event.dto';

export class UpdateEventDto extends CreateEventDto {
  @IsOptional()
  name: string;

  @IsOptional()
  category: CategoriesEnum;

  @IsOptional()
  price: number;

  @IsOptional()
  purchaseLink: string;

  @IsOptional()
  description: string;

  @IsOptional()
  link: string;

  @IsOptional()
  age: number;

  @IsOptional()
  maxPerson: number;
}
