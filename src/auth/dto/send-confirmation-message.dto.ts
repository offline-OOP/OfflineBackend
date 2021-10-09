import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendConfirmationMessageDto {
  @ApiProperty({ example: 'first@mail.ru' })
  @IsEmail()
  email: string;
}
