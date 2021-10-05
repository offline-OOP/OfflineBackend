import { Module } from '@nestjs/common';
import { AuthService } from 'src/Auth/auth.service';
import { AuthController } from 'src/Auth/auth.controller';
import { UsersModule } from 'src/User/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/Auth/local-strategy';
import { RedisCacheModule } from 'src/RedisCache/redisCache.module';

@Module({
  imports: [UsersModule, PassportModule, RedisCacheModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
