import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendConfirmationMessageDto } from '#Dto/SendConfirmationMessage';
import { UserLoginDto } from '#Dto/UserLogin';
import { UserRegisterDto } from '#Dto/UserRegister';
import { ConfirmEmailDto } from '#Dto/ConfirmEmail';
import { AuthService } from '#Services/Auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() userLogin: UserLoginDto) {
    return;
  }

  @Post('register')
  async register(@Body() userRegister: UserRegisterDto) {
    await this.authService.register(userRegister);
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
