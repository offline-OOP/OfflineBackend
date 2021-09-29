import { Injectable } from '@nestjs/common';
import { UsersService } from '#Services/Users';
import * as bcrypt from 'bcrypt';
import { User } from '#Entities/User';
import { HttpException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { RedisCacheService } from '#Services/RedisCache';
import { UserRegisterDto } from '#Dto/UserRegister';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly redisCacheService: RedisCacheService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) return { ...user, password: undefined };
    }

    return null;
  }

  async sendConfirmationEmail(email: string) {
    const user = await this.getUserAndValidate(email);

    const code = Math.floor(100000 + Math.random() * 900000);
    await this.redisCacheService.set(`confirmEmailCode:${email}`, code, {
      ttl: 1800,
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Offline App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.firstName,
        code,
      },
    });
  }

  async confirmEmail(email: string, code: string) {
    const user = await this.getUserAndValidate(email);

    const confirmEmailCodeKey = `confirmEmailCode:${email}`;
    const codeRedis = await this.redisCacheService.get(confirmEmailCodeKey);

    if (code !== codeRedis) {
      throw new HttpException('Not valid confirmation code', 422);
    }

    await this.redisCacheService.del(confirmEmailCodeKey);
    user.emailConfirmed = true;
    await this.usersService.save(user);
  }

  private async getUserAndValidate(email: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new HttpException('User does not exists', 422);
    }

    if (user.emailConfirmed) {
      throw new HttpException('Email is already confirmed', 422);
    }

    return user;
  }

  async register(params: UserRegisterDto) {
    const existingUser = await this.usersService.findOne(params.email);

    if (existingUser) {
      throw new HttpException('User with such email already exists', 422);
    }

    const newUser = new User();
    newUser.email = params.email;
    newUser.firstName = params.firstName;
    newUser.lastName = params.lastName;
    newUser.password = params.password;

    await this.usersService.save(newUser);
  }
}
