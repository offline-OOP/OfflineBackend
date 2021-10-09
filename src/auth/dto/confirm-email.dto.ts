import { IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailDto {
  @ApiProperty({ example: 'first@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNumber()
  code: string;
}
