import { Module } from '@nestjs/common';
import { AuthService } from '#Services/Auth';
import { AuthController } from '#Controllers/Auth';
import { UsersModule } from '#Modules/User';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '#Services/Auth/local-strategy';
import { RedisCacheModule } from '#Modules/RedisCache';

@Module({
  imports: [UsersModule, PassportModule, RedisCacheModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
