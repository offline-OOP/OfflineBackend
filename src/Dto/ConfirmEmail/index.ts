import { IsEmail, IsNumber } from 'class-validator';

export class ConfirmEmailDto {
  @IsEmail()
  email: string;

  @IsNumber()
  code: string;
}
