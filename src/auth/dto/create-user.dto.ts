import {
  IsEmail,
  IsString,
  MaxLength,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '@src/users/interfaces/users.interface';

export class CreateUserDto implements Partial<UserInterface> {
  @ApiProperty({ example: 'first@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'F^U3Lk0QU5' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @MinLength(2)
  @MaxLength(50)
  @ApiProperty({ example: 'example' })
  name: string;
}
