import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '#Services/Auth/local-auth-guard';
import { UserLoginDto } from '#Dto/UserLogin';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return userLoginDto;
  }
}
