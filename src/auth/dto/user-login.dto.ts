import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ example: 'first@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'F^U3Lk0QU5' })
  @IsString()
  password: string;
}
