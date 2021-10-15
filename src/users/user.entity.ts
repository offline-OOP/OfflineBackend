import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ example: '3f428a5a-3a9b-41eb-aa21-87bce6408b98' })
  id: string;

  @ApiProperty({ example: 'exampleUser' })
  name: string;

  @ApiProperty({ example: 'example@mail.ru' })
  email: string;

  @ApiProperty({ example: true })
  emailConfirmed: boolean;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    this.id = partial.id;
    this.name = partial.name;
    this.email = partial.email;
    this.emailConfirmed = partial.emailConfirmed;
    this.password = partial.password;
  }
}
