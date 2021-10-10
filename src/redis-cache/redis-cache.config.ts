import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import * as fs from 'fs';

export function cachesConfigFactory(config: ConfigService) {
  return {
    store: redisStore,
    host: config.get('REDIS_HOST', 'localhost'),
    port: config.get('REDIS_PORT', 6379),
    auth_pass:
      config.get('NODE_ENV') === 'production'
        ? fs
            .readFileSync('/run/secrets/redis_password')
            .toString()
            .replace(/\n/g, '')
        : config.get('REDIS_PASSWORD'),
  };
}
