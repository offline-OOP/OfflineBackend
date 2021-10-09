import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  name: string;
  email: string;
  emailConfirmed: boolean;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
