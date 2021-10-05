import {
  IsEmail,
  IsString,
  MaxLength,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '#Interfaces/User';

export class CreateUserDto implements Partial<UserInterface> {
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
  name: string;
}
