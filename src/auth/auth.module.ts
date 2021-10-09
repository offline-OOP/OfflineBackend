import { Module } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { AuthController } from '@src/auth/auth.controller';
import { UsersModule } from '@src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@src/auth/strategy/local-strategy';
import { RedisCacheModule } from '@src/redis-cache/redis-cache.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@src/auth/constants';
import { JwtStrategy } from '@src/auth/strategy/jwt-strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    RedisCacheModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
