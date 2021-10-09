import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendConfirmationMessageDto } from '@src/auth/dto/send-confirmation-message.dto';
import { UserLoginDto } from '@src/auth/dto/user-login.dto';
import { CreateUserDto } from '@src/auth/dto/create-user.dto';
import { ConfirmEmailDto } from '@src/auth/dto/confirm-email.dto';
import { AuthService } from '@src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() userLogin: UserLoginDto, @Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUser: CreateUserDto) {
    await this.authService.register(createUser);
  }

  @Post('send-confirmation-message')
  async sendConfirmationMessage(
    @Body() sendConfirmationMessageDto: SendConfirmationMessageDto,
  ) {
    await this.authService.sendConfirmationEmail(
      sendConfirmationMessageDto.email,
    );
  }

  @Post('confirm-email')
  async confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    await this.authService.confirmEmail(
      confirmEmailDto.email,
      confirmEmailDto.code,
    );
  }
}
