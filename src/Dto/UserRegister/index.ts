import {
  IsEmail,
  IsString,
  MaxLength,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @MinLength(2)
  @MaxLength(50)
  @ApiProperty()
  firstName: string;

  @MinLength(2)
  @MaxLength(50)
  @ApiProperty()
  lastName: string;
}
