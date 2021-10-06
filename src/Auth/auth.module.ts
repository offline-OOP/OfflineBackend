import { Module } from '@nestjs/common';
import { AuthService } from '../Auth/auth.service';
import { AuthController } from '../Auth/auth.controller';
import { UsersModule } from '../User/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../Auth/local-strategy';
import { RedisCacheModule } from '../RedisCache/redisCache.module';

@Module({
  imports: [UsersModule, PassportModule, RedisCacheModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
