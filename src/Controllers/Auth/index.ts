import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendConfirmationMessageDto } from '#Dto/SendConfirmationMessage';
import { ConfirmEmailDto } from '#Dto/ConfirmEmail';
import { AuthService } from '#Services/Auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
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
