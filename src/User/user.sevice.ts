import { Injectable, Inject } from '@nestjs/common';
import Neode from 'neode';
import { UserInterface } from 'src/User/Interfaces/user.interface';
import { CreateUserDto } from '#Dto/CreateUser';
import { uuid } from 'uuidv4';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('Connection') private readonly neode: Neode) {}

  async findOne(email: string): Promise<UserInterface | undefined> {
    const response = await this.neode.first<UserInterface>(
      'User',
      'email',
      email,
    );

    return response ? response.toJson() : undefined;
  }

  async save(user: CreateUserDto) {
    const id: string = uuid();
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(user.password, salt);

    await this.neode.create<UserInterface>('User', { ...user, id, password });
  }
}
