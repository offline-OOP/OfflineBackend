import {
  Injectable,
  ExecutionContext,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { validateSync } from 'class-validator';
import { UserLoginDto } from '#Dto/UserLogin';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  @UsePipes(new ValidationPipe())
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requestBody = context.switchToHttp().getRequest().body;
    const user = new UserLoginDto();
    user.email = requestBody.email;
    user.password = requestBody.password;
    const errors = validateSync(user);

    if (errors.length) {
      throw new HttpException(
        {
          statusCode: 422,
          error: 'Bad Request',
          message: errors
            .map((error) => Object.values(error.constraints))
            .flat(),
        },
        422,
      );
    }

    return super.canActivate(context);
  }
}
