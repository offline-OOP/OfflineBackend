import { IsEmail, IsString } from 'class-validator';

export class SendConfirmationMessageDto {
  @IsEmail()
  email: string;
}
