import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

export async function jwtConfigFactory(configService: ConfigService) {
  return {
    secret:
      configService.get('NODE_ENV') === 'production'
        ? fs.readFileSync('/run/secrets/jwt_key').toString().replace(/\n/g, '')
        : configService.get('JWT_KEY'),
  };
}
