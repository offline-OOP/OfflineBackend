import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendConfirmationMessageDto } from '@src/auth/dto/send-confirmation-message.dto';
import { UserLoginDto } from '@src/auth/dto/user-login.dto';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { ConfirmEmailDto } from '@src/auth/dto/confirm-email.dto';
import { AuthService } from '@src/auth/auth.service';
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthenticatedUserRequest } from '@src/generic.interface';
import { AccessTokenDto } from '@src/auth/dto/access-token.dto';
import { CreatedDto } from '@src/generic.dto';

@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@ApiResponse({
  status: 400,
  description: 'Bad request',
})
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiCreatedResponse({
    description: 'Successfully logged in',
    type: AccessTokenDto,
  })
  @ApiOperation({ summary: 'Login to the system' })
  async login(
    @Body() userLogin: UserLoginDto,
    @Req() req: AuthenticatedUserRequest,
  ) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Successfully registered',
    type: CreatedDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Backend error',
  })
  @ApiOperation({ summary: 'Register user' })
  async register(@Body() createUser: CreateUserDto) {
    return await this.authService.register(createUser);
  }

  @Post('send-confirmation-message')
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  @ApiOperation({ summary: 'Send confirmation message to email' })
  async sendConfirmationMessage(
    @Body() sendConfirmationMessageDto: SendConfirmationMessageDto,
  ) {
    await this.authService.sendConfirmationEmail(
      sendConfirmationMessageDto.email,
    );
  }

  @Post('confirm-email')
  @ApiResponse({
    status: 422,
    description: 'Backend error',
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  @ApiOperation({ summary: 'Confirm email' })
  async confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    await this.authService.confirmEmail(
      confirmEmailDto.email,
      confirmEmailDto.code,
    );
  }
}
