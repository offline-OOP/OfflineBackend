import { Injectable } from '@nestjs/common';
import { UsersService } from '#Services/Users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user) {
      const isMatch = await bcrypt.compare(user.password, pass);

      if (isMatch) return { ...user, password: undefined };
    }

    return null;
  }
}
