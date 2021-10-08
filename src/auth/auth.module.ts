import { Module } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { AuthController } from '@src/auth/auth.controller';
import { UsersModule } from '@src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@src/auth/strategy/local-strategy';
import { RedisCacheModule } from '@src/redis-cache/redis-cache.module';

@Module({
  imports: [UsersModule, PassportModule, RedisCacheModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
