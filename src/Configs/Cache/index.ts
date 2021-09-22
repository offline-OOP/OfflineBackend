import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export function cachesConfigFactory(config: ConfigService) {
  return {
    store: redisStore,
    host: config.get('REDIS_HOST', 'localhost'),
    port: config.get('REDIS_PORT', 6379),
  };
}
