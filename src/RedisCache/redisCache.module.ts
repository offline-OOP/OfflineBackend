import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from 'src/RedisCache/redisCache.service';
import { cachesConfigFactory } from 'src/RedisCache/Configs/redisCache.config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: cachesConfigFactory,
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
