import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendConfirmationMessageDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
