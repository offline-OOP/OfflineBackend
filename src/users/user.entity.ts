import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  name: string;
  email: string;
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
