import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendConfirmationMessageDto } from './Dto/send-confirmation-message.dto';
import { UserLoginDto } from './Dto/user-login.dto';
import { CreateUserDto } from './Dto/create-user.dto';
import { ConfirmEmailDto } from './Dto/confirm-email.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() userLogin: UserLoginDto) {
    return { email: userLogin.email };
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
